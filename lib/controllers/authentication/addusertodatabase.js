"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase-admin/firestore");
function AddUserToDatabase(uid, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = {
                uid: data.uid,
                email: data.email,
                emailVerified: data.emailVerified,
                displayName: data.displayName,
                disabled: data.disabled,
                tokensValidAfterTime: data.tokensValidAfterTime,
                providerData: data.providerData.map((provider) => ({
                    uid: provider.uid,
                    displayName: provider.displayName,
                    email: provider.email,
                    providerId: provider.providerId,
                })),
                // Additional fields
                phoneNumber: data.phoneNumber,
                photoURL: data.photoURL,
                // Metadata fields
                metadata: {
                    creationTime: data.metadata.creationTime,
                    lastSignInTime: data.metadata.lastSignInTime,
                    // Add other relevant metadata fields
                },
            };
            const res = yield (0, firestore_1.getFirestore)()
                .collection("profile")
                .doc(uid)
                .set(userData);
            return res;
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error && "code" in error) {
                const firebaseError = error;
                throw new Error(firebaseError.message || "Firebase error occurred");
            }
            else {
                throw new Error("Error adding user to database" + error);
            }
        }
    });
}
exports.default = AddUserToDatabase;
