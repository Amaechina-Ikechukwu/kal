import { getFirestore } from "firebase-admin/firestore";

export default async function InitializeStudent(
  uid: string,
  user: any
): Promise<any> {
  const firestore = getFirestore();

  try {
    const schoolId = user.school;
    const facultyId = user.faculty;
    const departmentId = user.department;
    const levelId = user.level;

    // Create a reference to the 'groups' collection
    const groupsRef = firestore.collection("groups");

    // Add user to school group
    await groupsRef
      .doc("schoolGroups")
      .collection(schoolId)
      .doc("groupMembers")
      .set({ [uid]: true }, { merge: true });

    // Add user to faculty group
    await groupsRef
      .doc("schoolGroups")
      .collection(schoolId)
      .doc("facultyGroups")
      .collection(facultyId)
      .doc("groupMembers")
      .set({ [uid]: true }, { merge: true });

    // Add user to department group
    await groupsRef
      .doc("schoolGroups")
      .collection(schoolId)
      .doc("departmentGroups")
      .collection(departmentId)
      .doc("groupMembers")
      .set({ [uid]: true }, { merge: true });

    // Add user to level group
    await groupsRef
      .doc("schoolGroups")
      .collection(schoolId)
      .doc("facultyGroups")
      .collection(facultyId)
      .doc("departmentGroups")
      .collection(departmentId)
      .doc("levelGroups")
      .collection(levelId)
      .doc("groupMembers")
      .set({ [uid]: true }, { merge: true });
    // Add user to level group no matter the department or faculty
    await groupsRef
      .doc("schoolGroups")
      .collection(schoolId)
      .doc("SpeciallevelGroups")
      .collection(levelId)
      .doc("groupMembers")
      .set({ [uid]: true }, { merge: true });

    return "done";
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
