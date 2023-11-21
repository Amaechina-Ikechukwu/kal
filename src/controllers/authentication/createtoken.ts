import jwt from "jsonwebtoken";
import "dotenv/config";
export async function CreateToken(uid: string) {
  try {
    const secretKey = process.env.KALLUM; // Replace with your actual secret key
    if (!secretKey) {
      throw new Error("Secret key is missing or undefined");
    }

    const jwtPayload = {
      uid: uid,
      // Add other necessary payload data here if needed
    };

    const options = {
      expiresIn: "1h", // Set your desired expiration time
    };

    const token = jwt.sign(jwtPayload, secretKey);
    return token;
  } catch (err) {
    console.log(err);
    throw new Error("Error creating token");
  }
}
