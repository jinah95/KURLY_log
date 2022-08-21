import { Like } from "../db/models/Like";
import { Review } from "../db/models/Review";

const LikeService = {
  likeReview: async ({ userId, reviewId }) => {
    const review = await Review.findById({ reviewId });

    if (!review || userId === review.user_id) {
      throw new Error("유효하지 않은 게시글입니다.");
    }

    let like = { user_id: userId, review_id: reviewId };

    const likeOrNot = await Like.findByFilter(like);

    if (likeOrNot) {
      throw new Error("이미 좋아요를 누른 게시글입니다.");
    }

    const createdAt = new Date();

    like = { ...like, created_at: createdAt };

    const newLike = await Like.create({ like });

    return { message: "success", data: newLike };
  },

  unlikeReview: async ({ userId, reviewId }) => {
    const review = await Review.findById({ reviewId });

    if (!review || userId === review.user_id) {
      throw new Error("유효하지 않은 게시글입니다.");
    }

    const like = { user_id: userId, review_id: reviewId };

    const likeOrNot = await Like.findByFilter(like);

    if (!likeOrNot) {
      throw new Error(
        "좋아요를 누르지 않았거나 이미 좋아요를 취소한 게시글입니다."
      );
    }

    await Like.delete({ like });

    return { message: "success", data: "좋아요가 취소되었습니다." };
  },
};

export { LikeService };
