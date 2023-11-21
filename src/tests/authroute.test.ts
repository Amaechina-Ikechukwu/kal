import request from "supertest";
import app from "../index"; // Check the path to your app file

let authToken = ""; // Store the token globally

describe("Authentication API Tests", () => {
  it("should respond with status 200 for /auth/signup and get token", async () => {
    const response = await request(app).post("/auth/signup").send({
      username: "testuser",
      password: "password123",
      fullName: "jfjfj fjfj",
      email: "kfkffff@gmail.com",
    });

    expect(response.status).toBe(200);
    // Extract token from the signup response
    authToken = response.body.userToken; // Adjust the token extraction based on your response structure
    console.log(
      "Use this token before for other test, || example set TOKEN=your_token_here && npm test profileroute.test.ts ||"
    );
    console.log(authToken);
  }, 20000);

  it("should respond with status 200 for /auth/deleteuser using the token", async () => {
    // Check if a token exists from the signup test
    if (!authToken) {
      throw new Error("Token not available. Run the signup test first.");
    }

    const response = await request(app)
      .delete("/auth/deleteuser")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  }, 10000);

  // Add more test cases for other routes if needed
});
