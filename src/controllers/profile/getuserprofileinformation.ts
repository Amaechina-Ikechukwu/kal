import { getFirestore } from "firebase-admin/firestore";
function removeFieldsFromUserProfile(userProfile: any) {
  delete userProfile.metadata;
  delete userProfile.providerData;
  delete userProfile.lastUpdated;
  delete userProfile.tokensValidAfterTime;
  delete userProfile.disabled;
  return userProfile;
}
export default async function GetUserProfileInformation(
  uid: string
): Promise<any> {
  try {
    const doc = await getFirestore().collection("profile").doc(uid).get();

    if (!doc.exists) {
      return "No such document!";
    } else {
      const user = doc.data();
      return removeFieldsFromUserProfile(user);
    }
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
