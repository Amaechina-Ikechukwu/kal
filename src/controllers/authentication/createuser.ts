import { auth, FirebaseError } from "firebase-admin";
import { User } from "../../interfaces/userinterface";
import AddUserToDatabase from "./addusertodatabase";

export async function CreateUser(user: User) {
  try {
    const userRecord = await auth().createUser({
      email: user.email,
      // phoneNumber: user.phoneNumber,
      password: user.password,
      displayName: user.fullName,
      photoURL: user.photoURL,
      disabled: false,
    });

    await AddUserToDatabase(userRecord.uid, userRecord)
      .then(() => {})
      .catch((error) => {
        if (error instanceof Error && "code" in error) {
          const firebaseError = error as { code: string; message: string };

          throw new Error(firebaseError.message || "Firebase error occurred");
        } else {
          throw new Error("Error adding user to database");
        }
      });
    return userRecord.uid;
  } catch (error: any) {
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string; message: string };

      throw new Error(firebaseError.message || "Firebase error occurred");
    } else {
      throw new Error("Error adding user to database");
    }
  }
}
