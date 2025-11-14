"""
Simple ML prediction engine for migraine risk assessment.
"""

import numpy as np
from datetime import datetime, timedelta
from django.db.models import Avg, Count
from logs.models import DailyLog
from biometrics.models import Biometrics
from migraine.models import MigraineEvent


class MigrainePredictionEngine:
    """Simple rule-based prediction engine with scoring."""
    
    def __init__(self, user):
        self.user = user
        self.model_version = "1.0-simple"
    
    def predict_risk(self, target_date=None):
        """
        Predict migraine risk for a given date.
        Returns: dict with risk_score, risk_level, top_factors, confidence, recommendations
        """
        if target_date is None:
            target_date = datetime.now().date()
        
        # Collect recent data (last 7 days)
        lookback_date = target_date - timedelta(days=7)
        
        # Get recent logs
        recent_logs = DailyLog.objects.filter(
            user=self.user,
            date__gte=lookback_date,
            date__lt=target_date
        )
        
        # Get recent biometrics
        recent_biometrics = Biometrics.objects.filter(
            user=self.user,
            timestamp__gte=lookback_date,
            timestamp__lt=target_date
        )
        
        # Calculate risk factors
        factors = self._calculate_risk_factors(recent_logs, recent_biometrics)
        
        # Calculate overall risk score (0-100)
        risk_score = self._calculate_risk_score(factors)
        
        # Determine risk level
        if risk_score < 30:
            risk_level = 'low'
        elif risk_score < 70:
            risk_level = 'moderate'
        else:
            risk_level = 'high'
        
        # Get top 3 contributing factors
        top_factors = self._get_top_factors(factors)
        
        # Calculate confidence based on data availability
        confidence = self._calculate_confidence(recent_logs, recent_biometrics)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(factors, risk_level)
        
        return {
            'risk_score': int(risk_score),
            'risk_level': risk_level,
            'top_factors': top_factors,
            'confidence': round(confidence, 2),
            'recommendations': recommendations,
            'model_version': self.model_version
        }
    
    def _calculate_risk_factors(self, logs, biometrics):
        """Calculate individual risk factors."""
        factors = {
            'poor_sleep': 0,
            'high_stress': 0,
            'low_hydration': 0,
            'high_hrv_variation': 0,
            'weather_sensitivity': 0,
            'low_activity': 0,
            'irregular_patterns': 0
        }
        
        if not logs.exists():
            return factors
        
        # Sleep analysis
        avg_sleep = logs.aggregate(Avg('sleep_hours'))['sleep_hours__avg'] or 7
        if avg_sleep < 6:
            factors['poor_sleep'] = 40
        elif avg_sleep < 7:
            factors['poor_sleep'] = 25
        
        # Stress analysis
        avg_stress = logs.aggregate(Avg('stress_level'))['stress_level__avg'] or 5
        if avg_stress > 7:
            factors['high_stress'] = 45
        elif avg_stress > 5:
            factors['high_stress'] = 25
        
        # Hydration analysis
        avg_water = logs.aggregate(Avg('water_intake'))['water_intake__avg'] or 6
        if avg_water < 4:
            factors['low_hydration'] = 30
        elif avg_water < 6:
            factors['low_hydration'] = 15
        
        # Activity analysis
        avg_exercise = logs.aggregate(Avg('exercise_duration'))['exercise_duration__avg'] or 0
        if avg_exercise < 15:
            factors['low_activity'] = 20
        
        # HRV analysis (if available)
        if biometrics.exists():
            avg_hrv = biometrics.aggregate(Avg('hrv'))['hrv__avg']
            if avg_hrv and avg_hrv < 30:
                factors['high_hrv_variation'] = 35
        
        # Pattern irregularity (check consistency)
        if logs.count() < 5:  # Less than 5 days of data
            factors['irregular_patterns'] = 20
        
        return factors
    
    def _calculate_risk_score(self, factors):
        """Calculate overall risk score from individual factors."""
        # Weighted sum of factors
        weights = {
            'poor_sleep': 0.25,
            'high_stress': 0.25,
            'low_hydration': 0.15,
            'high_hrv_variation': 0.15,
            'weather_sensitivity': 0.05,
            'low_activity': 0.10,
            'irregular_patterns': 0.05
        }
        
        risk_score = sum(factors[k] * weights[k] for k in factors)
        return min(100, max(0, risk_score))
    
    def _get_top_factors(self, factors):
        """Get top 3 contributing factors."""
        sorted_factors = sorted(factors.items(), key=lambda x: x[1], reverse=True)
        
        factor_labels = {
            'poor_sleep': 'Insufficient Sleep',
            'high_stress': 'High Stress Level',
            'low_hydration': 'Low Water Intake',
            'high_hrv_variation': 'Irregular Heart Rate',
            'weather_sensitivity': 'Weather Changes',
            'low_activity': 'Low Physical Activity',
            'irregular_patterns': 'Irregular Sleep/Wake Pattern'
        }
        
        top_factors = []
        for factor, score in sorted_factors[:3]:
            if score > 5:  # Only include significant factors
                top_factors.append({
                    'factor': factor_labels.get(factor, factor),
                    'impact': int(score)
                })
        
        return top_factors
    
    def _calculate_confidence(self, logs, biometrics):
        """Calculate prediction confidence based on data availability."""
        log_count = logs.count()
        bio_count = biometrics.count()
        
        # More data = higher confidence
        log_confidence = min(100, (log_count / 7) * 70)  # Max 70% from logs
        bio_confidence = min(30, (bio_count / 7) * 30)  # Max 30% from biometrics
        
        return log_confidence + bio_confidence
    
    def _generate_recommendations(self, factors, risk_level):
        """Generate personalized recommendations."""
        recommendations = []
        
        if factors['poor_sleep'] > 20:
            recommendations.append("Try to get 7-8 hours of quality sleep tonight")
        
        if factors['high_stress'] > 20:
            recommendations.append("Practice stress-reduction techniques (meditation, deep breathing)")
        
        if factors['low_hydration'] > 15:
            recommendations.append("Drink at least 8 glasses of water today")
        
        if factors['low_activity'] > 15:
            recommendations.append("Aim for 30 minutes of light exercise")
        
        if risk_level == 'high':
            recommendations.append("Keep your rescue medication handy")
            recommendations.append("Avoid known triggers today")
        
        if not recommendations:
            recommendations.append("Continue your healthy habits!")
        
        return recommendations[:5]  # Return max 5 recommendations
    
    def predict_next_7_days(self):
        """Generate predictions for the next 7 days."""
        today = datetime.now().date()
        predictions = []
        
        for i in range(7):
            target_date = today + timedelta(days=i)
            prediction = self.predict_risk(target_date)
            prediction['date'] = target_date.isoformat()
            predictions.append(prediction)
        
        return predictions
