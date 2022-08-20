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
}

export { ReviewService };
