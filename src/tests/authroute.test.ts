import request from "supertest";
import app from "../index"; // Check the path to your app file

describe("Authentication API Tests", () => {
  it("should respond with status 200 for /auth/signup", async () => {
    const response = await request(app).post("/auth/signup").send({
      username: "testuser",
      password: "password123",
      fullName: "jfjfj fjfj",
      email: "kfkfffkfkf@gmail.com",
    });

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  }, 10000);

  it("should respond with status 200 for /auth/deleteuser", async () => {
    // Assuming your delete user functionality requires authentication token in headers
    // Replace 'YOUR_TOKEN_HERE' with an actual token or implement your authentication mechanism
    const token = "YOUR_TOKEN_HERE";

    const response = await request(app)
      .post("/auth/deleteuser")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  }, 10000);

  // Add more test cases for other routes if needed
});
