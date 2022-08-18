import config from ".";
const postgre = {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.db,
  dialect: "postgres",
};
console.log("===========================postgre", postgre);

export default postgre;
