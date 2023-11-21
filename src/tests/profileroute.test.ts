import request from "supertest";
import app from "../index"; // Check the path to your app file

describe("Profile API Tests", () => {
  it("should respond with status 200 for /profile/update", async () => {
    const token = process.env.TOKEN || "";

    const response = await request(app)
      .post("/profile/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        department: "Agricultural Economics and Extension",
        faculty: "Agriculture",
        level: "600",
        school: "Nnamdi Azikiwe University",
      });

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  }, 10000);

  it("should respond with status 200 for /profile", async () => {
    // Assuming your delete user functionality requires authentication token in headers
    // Replace 'YOUR_TOKEN_HERE' with an actual token or implement your authentication mechanism
    const token = process.env.TOKEN || "";

    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  }, 10000);

  // Add more test cases for other routes if needed
});
