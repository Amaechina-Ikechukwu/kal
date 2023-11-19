import { FirebaseError, auth } from "firebase-admin";
import { User } from "../../interfaces/userinterface";
export async function CreateUser(user: User) {
  try {
    return auth()
      .createUser({
        email: user.email,
        // phoneNumber: user.phoneNumber,
        password: user.password,
        displayName: user.fullName,
        photoURL: user.photoURL,
        disabled: false,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        return userRecord.uid;
      })
      .catch((error: FirebaseError) => {
        throw new Error(error.message);
      });
  } catch (err: any) {
    throw new Error("Error creating new user");
  }
}
