export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  emailVerified: boolean;
  isAnonymous: boolean;
}
