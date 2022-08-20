import { Review } from "../db/models/Review";
import { Product } from "../db/models/Product";

class ReviewService {
  static async getReviews(productId) {
    const product = await Product.findById(productId);

    if (!product) {
      const errorMessage = "해당하는 상품이 없습니다.";
      throw new Error(errorMessage);
    }

    const reviews = await Review.findAll(productId);

    if (!reviews || !reviews.length) {
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
