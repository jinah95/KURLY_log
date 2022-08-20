import { Like } from "../db/models/Like";

class LikeService {
    static async likeReview({ userId, reviewId }) {
        let like = { user_id: userId, review_id: reviewId };

        const likeOrNot = await Like.findByFilter(like);

        if (likeOrNot) {
            throw new Error("이미 좋아요를 누른 게시글입니다.");
        }

        const createdAt = new Date();

        like = { ...like, created_at: createdAt };

        const newLike = await Like.create({ like });

        return newLike;
    }

    static async unlikeReview({ userId, reviewId }) {
        const like = { user_id: userId, review_id: reviewId };

        const likeOrNot = await Like.findByFilter(like);

        if (!likeOrNot) {
            throw new Error(
                "좋아요를 누르지 않았거나 이미 좋아요를 취소한 게시글입니다."
            );
        }

        const newUnlike = await Like.delete({ like });

        return newUnlike;
    }
}

export { LikeService };
