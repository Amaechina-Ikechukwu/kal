export interface User {
  email: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  password: string;
  fullName: string;
  photoURL?: string;
  disabled?: boolean;
}
