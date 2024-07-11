const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");
const User = require("../models/user");
const bcrypt = require("bcrypt");

describe("GET /patient", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await User.create({
      name: "Test User",
      email: "Mikey1234@gmail.com",
      password: bcrypt.hashSync("Mikey1234", 10),
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("應返回 302 重定向當未認證時", async () => {
    const response = await request(app).get("/patient");
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/auth/login");
  });

  test("應返回 200 OK 當認證通過時", async () => {
    // 進行登入
    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ email: "Mikey1234@gmail.com", password: "Mikey1234" });

    const cookies = loginResponse.headers["set-cookie"];

    console.log("當認證通過時的cookies : ", cookies);
    // 使用登入後的 cookies 進行請求
    const response = await request(app).get("/patient").set("Cookie", cookies);
    console.log("當認證通過時的response.status : ", response);
    expect(response.status).toBe(200);
  });
});
