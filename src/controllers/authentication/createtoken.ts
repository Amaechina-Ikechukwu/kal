import { FirebaseError, auth } from "firebase-admin";
export async function CreateToken(uid: string) {
  try {
    return auth()
      .createCustomToken(uid)
      .then((customToken) => {
        return customToken;
      })
      .catch((error: FirebaseError) => {
        throw new Error(error.message);
      });
  } catch (err: any) {
    throw new Error("Error creating token");
  }
}
