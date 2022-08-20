// import {Follow} from "../db/models/Follow";

class FollowService {
    static async followUser({ userId, kurlyencerId }) {
        const newFollow = { user_id: userId, followerId: kurlyencerId };
        const createdNewFollow = newFollow;

        return createdNewFollow;
    }
}

export { FollowService };
