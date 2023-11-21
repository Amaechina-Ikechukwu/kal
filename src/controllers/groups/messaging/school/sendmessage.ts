import { FieldValue, getFirestore } from "firebase-admin/firestore";
import GetUserProfileInformation from "../../../profile/getuserprofileinformation";

export default async function SendMessageToSchoolGroup(
  uid: string,
  message: string
): Promise<any> {
  const firestore = getFirestore();

  try {
    const { school, faculty, department, level } =
      await GetUserProfileInformation(uid);

    // Create a reference to the 'groups' collection
    const groupsRef = firestore.collection("groups");

    // send message to school group
    await groupsRef
      .doc("schoolGroups")
      .collection(school)
      .doc("chats")
      .collection("chats")
      .doc()
      .set({ from: uid, message, sent: FieldValue.serverTimestamp() });

    return "sent";
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
