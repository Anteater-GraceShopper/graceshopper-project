const Sequelize = require("sequelize");
//PC users - comment out lines 2-6
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

////https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

//PC users - comment out lines 26-29
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);

//PC users db configuration
// const db = new Sequelize(
//   process.env.DATABASE_URL || {
//     host: "localhost",
//     port: 5432,
//     database: "everything_honey",
//     dialect: "postgres",
//     username: "postgres",
//     password: "admin",
//     config,
//   }
// );

module.exports = db;
