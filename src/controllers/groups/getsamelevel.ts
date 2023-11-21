import { getFirestore } from "firebase-admin/firestore";
import GetUserProfileInformation from "../profile/getuserprofileinformation";

function removeFieldsFromUserProfile(userProfile: any) {
  delete userProfile.metadata;
  delete userProfile.providerData;
  delete userProfile.lastUpdated;
  delete userProfile.tokensValidAfterTime;
  delete userProfile.disabled;
  return userProfile;
}

export default async function GetSameLevel(uid: string): Promise<any[]> {
  try {
    const { school, faculty, department, level } =
      await GetUserProfileInformation(uid);
    const firestore = getFirestore();
    const snapshot = await firestore
      .collection("profile")
      .where("level", "==", level)
      .where("school", "==", school)
      .where("department", "==", department)
      .where("uid", "!=", uid)
      .get();

    if (snapshot.empty) {
      return [];
    }

    const profiles: any[] = [];
    snapshot.forEach((doc) => {
      const userProfile = removeFieldsFromUserProfile(doc.data());
      profiles.push(userProfile);
    });

    return profiles;
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string; message: string };
      throw new Error(firebaseError.message || "Firebase error occurred");
    } else {
      throw new Error("Error fetching user profiles: " + error);
    }
  }
}
