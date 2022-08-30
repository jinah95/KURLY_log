import { Follow } from "../db/models/Follow";
import { User } from "../db/models/User";

const FollowService = {
  // 팔로우
  followUser: async ({ userId, kurlyencerId }) => {
    const user = await User.findById(kurlyencerId);

    if (!user) {
      throw new Error("존재하지 않는 사용자입니다.");
    }

    const follow = {
      user_id: userId,
      follower_id: kurlyencerId,
    };

    const followOrNot = await Follow.findByFilter(follow);

    if (followOrNot) {
      throw new Error("이미 팔로우한 유저입니다.");
    }
    const newFollow = await Follow.create({ follow });

    return { message: "success", data: newFollow };
  },

  // 팔로우 여부 확인
  checkFollow: async ({ userId, kurlyencerId }) => {
    if (userId === kurlyencerId) {
      const errorMessage = "스스로를 팔로우할 수 없습니다.";
      return { message: "fail", data: errorMessage };
    }

    const user = await User.findById(kurlyencerId);

    if (!user) {
      throw new Error("존재하지 않는 사용자입니다.");
    }

    const follow = {
      user_id: userId,
      follower_id: kurlyencerId,
    };

    const followOrNot = await Follow.findByFilter(follow);

    if (followOrNot) {
      return { message: "success", data: true };
    } else {
      return { message: "success", data: false };
    }
  },

  // 팔로우 취소
  unfollowUser: async ({ userId, kurlyencerId }) => {
    const user = await User.findById(kurlyencerId);

    if (!user) {
      throw new Error("존재하지 않는 사용자입니다.");
    }

    const follow = { user_id: userId, follower_id: kurlyencerId };

    const followOrNot = await Follow.findByFilter(follow);

    if (!followOrNot) {
      throw new Error("이미 언팔로우한 유저입니다.");
    }

    await Follow.delete({ follow });

    return { message: "success", data: "언팔로우 되었습니다." };
  },
};

export { FollowService };
