import { User } from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Follow } from "../db/models/Follow";
import { Review } from "../db/models/Review";
import { Like } from "../db/models/Like";
import setUtil from "../utils/setUtil";

const UserService = {
  // 사용자 정보 조회
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

    const { user_id, ...rest } = user.dataValues;

    const data = { userId, ...rest, followers, reviews, likes };

    return { message: "success", data };
  },

  // 로그인
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

    // 마지막 로그인 날짜 업데이트
    const today = new Date();
    let toUpdate = { last_login: today };

    // 컬리언서 승급 가능 여부 확인
    if (user.grade === "샛별") {
      const [followers, likes] = await Promise.all([
        Follow.countByFilter({ follower_id: user.user_id }),
        Like.countByFilter({ user_id: user.user_id }),
      ]);

      // 승급 조건 만족 시 등급을 컬리언서로 업데이트
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

  // 상위 3명의 컬리언서 조회
  getBestUsers: async () => {
    const bestUsers = await User.getBestUsers();
    return { message: "success", data: bestUsers };
  },

  // 상위 15명의 컬리언서 조회
  getMoreUsers: async () => {
    const moreUsers = await User.getMoreUsers();
    return { message: "success", data: moreUsers };
  },

  // 사용자 정보 업데이트
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
