// Onboarding state management
export const ONBOARDING_KEY = 'aurora_onboarding_completed';

export const isOnboardingCompleted = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
};

export const markOnboardingCompleted = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ONBOARDING_KEY, 'true');
};

export const resetOnboarding = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ONBOARDING_KEY);
};
