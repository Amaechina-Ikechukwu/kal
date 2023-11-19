import { FirebaseError, auth } from "firebase-admin";
import { User } from "../../interfaces/userinterface";
export async function VerifyEmail(redirectUri: string, email: string) {
  try {
    return auth()
      .generateEmailVerificationLink(email)
      .then((link) => {
        // Send the link to the user via email or use it as needed
        return link;
      })
      .catch((error: FirebaseError) => {
        throw new Error(error.message);
      });
  } catch (err: any) {
    throw new Error("Error creating email verification link");
  }
}
