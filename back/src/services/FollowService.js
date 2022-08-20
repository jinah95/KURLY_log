import { Follow } from "../db/models/Follow";
import { v4 as uuidv4 } from "uuid";

class FollowService {
    static async followUser({ userId, kurlyencerId }) {
        const newFollow = {
            user_id: userId,
            follower_id: kurlyencerId,
        };

        const followOrNot = await Follow.findByFilter(newFollow);

        if (followOrNot) {
            throw new Error("이미 팔로우한 유저입니다.");
        }
        const createdNewFollow = await Follow.create({ newFollow });

        return createdNewFollow;
    }

    static async unfollowUser({ userId, kurlyencerId }) {
        const unfollow = { user_id: userId, follower_id: kurlyencerId };
        const newUnfollow = unfollow;

        return newUnfollow;
    }
}

export { FollowService };
