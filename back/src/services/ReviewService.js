import { Review } from "../db/models/Review";
import { Product } from "../db/models/Product";
import { User } from "../db/models/User";

class ReviewService {
  // 상품의 리뷰전체 가져오기
  static async getReviews(productId) {
    const product = await Product.findById(productId);

    if (!product) {
      const errorMessage = "해당하는 상품이 없습니다.";
      return { errorMessage };
    }

    const reviews = await Review.findByProduct(productId);

    if (!reviews || !reviews.length) {
      const errorMessage = "해당 상품에 리뷰가 없습니다.";

      return { errorMessage };
    }

    return reviews;
  }

  // 컬리로그 작성하기
  static async postReviews({ newReview }) {
    const createdReview = await Review.create({ newReview });

    return { message: "success", data: createdReview };
  }

  // 컬리로그 수정하기
  static async setReview({ reviewId, userId, toUpdate }) {
    const review = await Review.findById(reviewId);

    if (!review) {
      const errorMessage = "해당하는 리뷰가 없습니다.";
      return { errorMessage };
    }

    if (review.user_id !== userId) {
      const errorMessage = "권한이 없습니다.";
      return { errorMessage };
    }

    const fieldsToUpdate = Object.keys(toUpdate);

    fieldsToUpdate.forEach((key) => {
      if (JSON.stringify(review[key]) === JSON.stringify(toUpdate[key]))
        delete toUpdate[key];
    });

    const result = await Review.update({ reviewId, toUpdate });

    return { message: "success", data: result };
  }

  // 컬리로그 삭제하기
  static async deleteLog({ reviewId, userId }) {
    const review = await Review.findById(reviewId);

    if (!review) {
      const errorMessage = "해당하는 리뷰가 없습니다.";
      return { errorMessage };
    }

    if (review.user_id !== userId) {
      const errorMessage = "권한이 없습니다.";
      return { errorMessage };
    }

    const result = await Review.delete({ reviewId });
    return { message: "success", data: result };
  }

  // 유저의 컬리로그 조회하기
  static async getLogs(userId) {
    const user = await User.findById(userId);

    if (!user) {
      const errorMessage = "해당하는 유저가 없습니다.";
      return { errorMessage };
    }

    const logs = await Review.findByUser(userId);

    if (!logs || !logs.length) {
      const errorMessage = "아직 로그를 작성하지 않았습니다.";
      return { errorMessage };
    }

    return { message: "success", data: logs };
  }

  // best 컬리언서 리뷰 조회하기
  static async getBestLogs() {
    const grade = "컬리언서";
    const logs = await Review.getBestLogs({ grade });

    return { message: "success", data: logs.slice(0, 3) };
  }

  // best 컬리언서 리뷰 더보기
  static async getMoreLogs() {
    const grade = "컬리언서";
    const logs = await Review.getBestLogs({ grade });

    return { message: "success", data: logs };
  }

  // 샛별 리뷰 목록 조회하기
  static async getPopularLogs() {
    const grade = "샛별";
    const logs = await Review.getBestLogs({ grade });

    return { message: "success", data: logs };
  }
}

export { ReviewService };
