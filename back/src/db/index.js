import Sequelize from "sequelize";
import postgre from "../config/config";

import User from "./schemas/users";
import Reveiw from "./schemas/reviews";
import Product from "./schemas/products";
import Like from "./schemas/like";
import Follow from "./schemas/follow";

const sequelize = new Sequelize(postgre);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User(sequelize, Sequelize);
db.review = Reveiw(sequelize, Sequelize);
db.product = Product(sequelize, Sequelize);
db.like = Like(sequelize, Sequelize);
db.follow = Follow(sequelize, Sequelize);

export default db;
