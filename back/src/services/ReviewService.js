import { Review } from "../db/models/Review";

class ReviewService {
  static async getReviews(productId) {
    const reviews = await Review.findAll(productId);

    if (!reviews) {
      const errorMessage = "해당 상품에 리뷰가 없습니다.";
      throw new Error(errorMessage);
    }

    return reviews;
  }

  static async postReviews({ newReview }) {
    const createdReview = await Review.create({ newReview });

    return { message: "success", data: createdReview };
  }
}

export { ReviewService };
