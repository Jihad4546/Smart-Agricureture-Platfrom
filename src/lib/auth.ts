export interface User {
  name: string;
  email: string;
  role: "Farmer" | "Admin" | "Expert";
}

// Default mock users for testing out-of-the-box
export const DEFAULT_USERS: Record<string, User & { password?: string }> = {
  "farmer@agritech.com": {
    name: "Abdul Rahman",
    email: "farmer@agritech.com",
    role: "Farmer",
    password: "password",
  },
  "admin@agritech.com": {
    name: "Administrator",
    email: "admin@agritech.com",
    role: "Admin",
    password: "password",
  },
};

// Safe function to parse cookies on the client side
export function getAuthUserClient(): User | null {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(/(^| )session=([^;]+)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[2])) as User;
  } catch {
    return null;
  }
}

// Client-side helper to check if a user is logged in
export function isAuthenticatedClient(): boolean {
  return getAuthUserClient() !== null;
}

// Client-side helper to log in a user
export function loginUserClient(user: User): void {
  if (typeof window === "undefined") return;
  // Set cookie for 1 day
  document.cookie = `session=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400; SameSite=Lax`;
}

// Client-side helper to log out a user
export function logoutUserClient(): void {
  if (typeof window === "undefined") return;
  document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
