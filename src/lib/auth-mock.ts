export const PROFILE_COMPLETE_KEY = "marga_profile_complete";
export const PROFILE_DATA_KEY = "marga_profile_data";

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  lifeStage: string;
  city: string;
  education: string;
}

export function isProfileComplete(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(PROFILE_COMPLETE_KEY) === "true";
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_COMPLETE_KEY, "true");
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(profile));
}

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_DATA_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function resetOnboardingForTesting(): void {
  localStorage.removeItem(PROFILE_COMPLETE_KEY);
  localStorage.removeItem(PROFILE_DATA_KEY);
}
