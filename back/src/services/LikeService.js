class LikeService {
    static async likeReview({ userId, reviewId }) {
        const like = { user_id: userId, review_id: reviewId };

        const newLike = "like";

        return newLike;
    }
}

export { LikeService };
