import { FieldValue, getFirestore } from "firebase-admin/firestore";
import InitializeStudent from "./initializestudent";

export default async function UpdateUserProfileInformation(
  uid: string,
  data: any
): Promise<any> {
  try {
    const userData: any = {
      ...data,
      lastUpdated: FieldValue.serverTimestamp(),
    };
    const res = await getFirestore()
      .collection("profile")
      .doc(uid)
      .update(userData);
    await InitializeStudent(uid, userData)
      .then(() => {})
      .catch((err) => {
        throw new Error(err);
      });
    return res;
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string; message: string };

      throw new Error(firebaseError.message || "Firebase error occurred");
    } else {
      throw new Error("Error adding user to database" + error);
    }
  }
}
