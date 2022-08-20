import { Follow } from "../db/models/Follow";
import { v4 as uuidv4 } from "uuid";

class FollowService {
    static async followUser({ userId, kurlyencerId }) {
        const follow = {
            user_id: userId,
            follower_id: kurlyencerId,
        };

        const followOrNot = await Follow.findByFilter(follow);

        if (followOrNot) {
            throw new Error("이미 팔로우한 유저입니다.");
        }
        const newFollow = await Follow.create({ follow });

        return newFollow;
    }

    static async unfollowUser({ userId, kurlyencerId }) {
        const follow = { user_id: userId, follower_id: kurlyencerId };

        const followOrNot = await Follow.findByFilter(follow);

        if (!followOrNot) {
            throw new Error("이미 언팔로우한 유저입니다.");
        }

        const newUnfollow = await Follow.delete({ follow });

        return newUnfollow;
    }
}

export { FollowService };
