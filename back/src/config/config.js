import config from ".";
const postgre = {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.db,
  dialect: "postgres",
  logging: false,
};

export default postgre;
