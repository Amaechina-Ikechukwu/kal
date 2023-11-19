import { FirebaseError, auth } from "firebase-admin";
export async function DeleteUser(uid: string) {
  try {
    return auth()
      .deleteUser(uid)
      .then(() => {
        return "deleted";
      })
      .catch((error: FirebaseError) => {
        throw new Error(error.message);
      });
  } catch (err: any) {
    throw new Error("Error deleting user");
  }
}
