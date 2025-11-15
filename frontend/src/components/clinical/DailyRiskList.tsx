/**
 * DailyRiskList - Redesigned Clinical Component
 * Enhanced history view with data visualization and clinical insights
 */

'use client';

import React, { useState } from 'react';

interface DailyRisk {
  date: string;
  dayLabel: string;
  riskLevel: 'low' | 'moderate' | 'high';
  riskPercentage: number;
  mainFactor?: string;
  secondaryFactor?: string;
}

interface DailyRiskListProps {
  data: DailyRisk[];
}

export default function DailyRiskList({ data }: DailyRiskListProps) {
  const [selectedDay, setSelectedDay] = useState<DailyRisk | null>(null);
  const [view, setView] = useState<'list' | 'chart'>('list');

  // Calculate average and trend
  const averageRisk = Math.round(data.reduce((sum, day) => sum + day.riskPercentage, 0) / data.length);
  const trend = data[0].riskPercentage < data[1].riskPercentage ? 'improving' : 
                data[0].riskPercentage > data[1].riskPercentage ? 'worsening' : 'stable';

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return '#2B9C57';
      case 'moderate': return '#E4A620';
      case 'high': return '#D64545';
      default: return '#90949E';
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'low': return 'Low Risk';
      case 'moderate': return 'Moderate Risk';
      case 'high': return 'High Risk';
      default: return 'Unknown';
    }
  };

  return (
    <>
      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '12px', 
        marginBottom: '24px' 
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E4EA',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 600,
            color: getRiskColor(averageRisk < 35 ? 'low' : averageRisk < 65 ? 'moderate' : 'high'),
            marginBottom: '4px'
          }}>
            {averageRisk}%
          </div>
          <div style={{
            fontSize: '13px',
            color: '#90949E',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            7-Day Average
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E4EA',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: trend === 'improving' ? '#2B9C57' : trend === 'worsening' ? '#D64545' : '#90949E',
            marginBottom: '4px',
            textTransform: 'capitalize'
          }}>
            {trend === 'improving' ? '↓ Improving' : trend === 'worsening' ? '↑ Worsening' : '→ Stable'}
          </div>
          <div style={{
            fontSize: '13px',
            color: '#90949E',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Trend
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div style={{
        display: 'flex',
        backgroundColor: '#F0F2F5',
        borderRadius: '8px',
        padding: '4px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setView('list')}
          style={{
            flex: 1,
            padding: '8px 16px',
            backgroundColor: view === 'list' ? '#FFFFFF' : 'transparent',
            color: view === 'list' ? '#1A1A1A' : '#90949E',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: view === 'list' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
          }}
        >
          List View
        </button>
        <button
          onClick={() => setView('chart')}
          style={{
            flex: 1,
            padding: '8px 16px',
            backgroundColor: view === 'chart' ? '#FFFFFF' : 'transparent',
            color: view === 'chart' ? '#1A1A1A' : '#90949E',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: view === 'chart' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
          }}
        >
          Chart View
        </button>
      </div>

      {/* Chart View */}
      {view === 'chart' && (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E4EA',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'end',
            height: '120px',
            gap: '8px',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            {data.slice().reverse().map((day, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1 
              }}>
                <div
                  style={{
                    width: '20px',
                    height: `${(day.riskPercentage / 100) * 80 + 20}px`,
                    backgroundColor: getRiskColor(day.riskLevel),
                    borderRadius: '4px 4px 0 0',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedDay(day)}
                />
                <div style={{
                  fontSize: '10px',
                  color: '#90949E',
                  textAlign: 'center',
                  lineHeight: '12px'
                }}>
                  {day.dayLabel.slice(0, 3)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chart Legend */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #E1E4EA'
          }}>
            {['low', 'moderate', 'high'].map((level) => (
              <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: getRiskColor(level)
                }} />
                <span style={{
                  fontSize: '12px',
                  color: '#4A4E57',
                  textTransform: 'capitalize'
                }}>
                  {level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div>
          {data.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(day)}
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E1E4EA',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 6px 0 rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Left: Date Info */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1A1A1A',
                  marginBottom: '4px'
                }}>
                  {day.dayLabel}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#90949E'
                }}>
                  {day.date}
                </div>
                {day.mainFactor && (
                  <div style={{
                    fontSize: '13px',
                    color: '#4A4E57',
                    marginTop: '4px',
                    maxWidth: '200px'
                  }}>
                    {day.mainFactor}
                  </div>
                )}
              </div>

              {/* Right: Risk Indicator */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                gap: '8px',
                minWidth: '80px'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: getRiskColor(day.riskLevel)
                }}>
                  {day.riskPercentage}%
                </div>
                <div style={{
                  fontSize: '11px',
                  color: getRiskColor(day.riskLevel),
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  {day.riskLevel}
                </div>
                <div 
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: getRiskColor(day.riskLevel)
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Enhanced Bottom Sheet Modal */}
      {selectedDay && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 999
            }}
            onClick={() => setSelectedDay(null)}
          />
          
          {/* Bottom Sheet */}
          <div 
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '24px',
              zIndex: 1000,
              maxWidth: '600px',
              margin: '0 auto',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            {/* Handle */}
            <div 
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: '#D7DCE3',
                borderRadius: '2px',
                margin: '0 auto 24px'
              }}
            />

            {/* Content */}
            <div style={{ textAlign: 'center' }}>
              {/* Risk Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: `${getRiskColor(selectedDay.riskLevel)}15`,
                color: getRiskColor(selectedDay.riskLevel),
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 500,
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: getRiskColor(selectedDay.riskLevel)
                }} />
                {getRiskLabel(selectedDay.riskLevel)}
              </div>

              {/* Large Colored Percentage */}
              <div style={{
                fontSize: '48px',
                fontWeight: 600,
                color: getRiskColor(selectedDay.riskLevel),
                marginBottom: '8px'
              }}>
                {selectedDay.riskPercentage}%
              </div>
              
              <div style={{
                fontSize: '16px',
                color: '#4A4E57',
                marginBottom: '24px'
              }}>
                {selectedDay.dayLabel} • {selectedDay.date}
              </div>

              {/* Factors Section */}
              <div style={{ textAlign: 'left' }}>
                {selectedDay.mainFactor && (
                  <div style={{
                    backgroundColor: '#F8F9FB',
                    border: '1px solid #E1E4EA',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: getRiskColor(selectedDay.riskLevel),
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: '#FFFFFF',
                        fontWeight: 600
                      }}>
                        1
                      </div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#90949E',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Primary Factor
                      </div>
                    </div>
                    <div style={{
                      fontSize: '15px',
                      color: '#1A1A1A',
                      lineHeight: '1.4'
                    }}>
                      {selectedDay.mainFactor}
                    </div>
                  </div>
                )}

                {selectedDay.secondaryFactor && (
                  <div style={{
                    backgroundColor: '#F8F9FB',
                    border: '1px solid #E1E4EA',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#90949E',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: '#FFFFFF',
                        fontWeight: 600
                      }}>
                        2
                      </div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#90949E',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Secondary Factor
                      </div>
                    </div>
                    <div style={{
                      fontSize: '15px',
                      color: '#1A1A1A',
                      lineHeight: '1.4'
                    }}>
                      {selectedDay.secondaryFactor}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '24px'
              }}>
                <button
                  onClick={() => setSelectedDay(null)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#F0F2F5',
                    color: '#4A4E57',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E1E4EA';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F0F2F5';
                  }}
                >
                  Close
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#3566E0',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#5B82EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3566E0';
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
