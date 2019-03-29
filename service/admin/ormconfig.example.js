const debug = process.env.NODE_ENV === "development";
const dirModel = debug ? "src/model/*.ts" : "model/*.js";

module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  synchronize: debug,
  entities: [dirModel]
};
