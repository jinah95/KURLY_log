import { Follow } from "../db/models/Follow";
import { User } from "../db/models/User";
import { v4 as uuidv4 } from "uuid";

const FollowService = {
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

  checkFollow: async ({ userId, kurlyencerId }) => {
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
