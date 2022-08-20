import { User } from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  static async getUsers() {
    const users = await User.findAll();
    if (!users) {
      const errorMessage = "유저가 없습니다.";
      throw new Error(errorMessage);
    }
    return users;
  }

  static async getUserInfo(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const errorMessage = "해당 유저가 없습니다.";
      throw new Error(errorMessage);
    }
    return user;
  }

  static async getUser({ nickname, password }) {
    const user = await User.findByNickname(nickname);
    if (!user) {
      const errorMessage = "해당 유저가 없습니다.";
      throw new Error(errorMessage);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      const errorMessage = "잘못입력하셨습니다.";
      throw new Error(errorMessage);
    }

    // last login update 추가

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user.user_id }, secretKey);

    const { user_id, picture, grade, intro } = user;
    const loginUser = {
      token,
      userId: user_id,
      nickname,
      picture,
      grade,
      intro,
    };
    return { message: "success", data: loginUser };
  }
}

export { UserService };