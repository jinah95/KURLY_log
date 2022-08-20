import { Like } from "../db/models/Like";

class LikeService {
    static async likeReview({ userId, reviewId }) {
        const like = { user_id: userId, review_id: reviewId };

        const newLike = "like";

        return newLike;
    }

    static async unlikeReview({ userId, reviewId }) {
        const like = { user_id: userId, review_id: reviewId };

        const newUnlike = "unlike";

        return newUnlike;
    }
}

export { LikeService };
