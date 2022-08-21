import { User } from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Follow } from "../db/models/Follow";
import { Review } from "../db/models/Review";
import { Like } from "../db/models/Like";
import setUtil from "../utils/setUtil";

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
      throw new Error("해당 유저가 없습니다.");
    }

    const [followers, reviews, likes] = await Promise.all([
      Follow.countByFilter({ follower_id: userId }),
      Review.countByFilter({ user_id: userId }),
      Like.countByFilter({ user_id: userId }),
    ]);

    const data = { ...user.dataValues, followers, reviews, likes };

    return data;
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

  static async updateProfile({ userId, updateData }) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(
        "이미 탈퇴했거나 존재하지 않는 사용자입니다. 다시 한 번 확인해 주세요."
      );
    }

    const toUpdate = await setUtil.compareValues(updateData, user);

    const updatedUser = await User.update({ user_id: userId, toUpdate });

    return updatedUser;
  }
}

export { UserService };
