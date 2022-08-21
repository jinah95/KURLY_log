import { User } from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Follow } from "../db/models/Follow";
import { Review } from "../db/models/Review";
import { Like } from "../db/models/Like";
import setUtil from "../utils/setUtil";

const UserService = {
  getUsers: async () => {
    const users = await User.findAll();
    if (!users) {
      const errorMessage = "유저가 없습니다.";
      throw new Error(errorMessage);
    }
    return { message: "success", data: users };
  },

  getUserInfo: async (userId) => {
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

    return { message: "success", data };
  },

  getUser: async ({ nickname, password }) => {
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
    const today = new Date();
    let toUpdate = { last_login: today };

    if (user.grade === "샛별") {
      const [followers, likes] = await Promise.all([
        Follow.countByFilter({ follower_id: user.user_id }),
        Like.countByFilter({ user_id: user.user_id }),
      ]);

      if (followers >= 5 && likes >= 10) {
        toUpdate = { ...toUpdate, grade: "컬리언서" };
      }
    }

    await User.update({ user_id: user.user_id, toUpdate });

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
  },

  updateProfile: async ({ userId, updateData }) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(
        "이미 탈퇴했거나 존재하지 않는 사용자입니다. 다시 한 번 확인해 주세요."
      );
    }

    const toUpdate = setUtil.compareValues(updateData, user);

    const updatedUser = await User.update({ user_id: userId, toUpdate });

    return { message: "success", data: updatedUser };
  },
};

export { UserService };
