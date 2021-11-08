require("dotenv").config();

module.exports = {
  development: {
    username: "gt",
    password: process.env.MYSQL_PASSWORD,
    database: "database_development",
    host: "custodian-db",
    dialect: "mysql",
  },
  test: {
    username: "gt",
    password: process.env.MYSQL_PASSWORD,
    database: "database_development",
    host: "custodian-db",
    dialect: "mysql",
  },
  production: {
    username: "gt",
    password: process.env.MYSQL_PASSWORD,
    database: "database_development",
    host: "custodian-db",
    dialect: "mysql",
  },
};
