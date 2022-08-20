// import {Follow} from "../db/models/Follow";

class FollowService {
    static async followUser({ userId, kurlyencerId }) {
        const newFollow = { user_id: userId, follower_id: kurlyencerId };
        const createdNewFollow = newFollow;

        return createdNewFollow;
    }
}

export { FollowService };
