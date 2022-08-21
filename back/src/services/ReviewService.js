import { Review } from "../db/models/Review";
import { Product } from "../db/models/Product";
import { User } from "../db/models/User";
import setUtil from "../utils/setUtil";

const ReviewService = {
  // 상품의 리뷰전체 가져오기
  getReviews: async (productId) => {
    const product = await Product.findById(productId);

    if (!product) {
      const errorMessage = "해당하는 상품이 없습니다.";
      return { message: "fail", data: errorMessage };
    }

    const reviews = await Review.findByProduct(productId);

    if (!reviews || !reviews.length) {
      const errorMessage = "해당 상품에 리뷰가 없습니다.";

      return { message: "fail", data: errorMessage };
    }

    return { message: "success", data: reviews };
  },

  // 컬리로그 작성하기
  postReviews: async ({ newReview }) => {
    const createdReview = await Review.create({ newReview });

    return { message: "success", data: createdReview };
  },

  // 컬리로그 수정하기
  setReview: async ({ reviewId, userId, updateData }) => {
    const review = await Review.findById(reviewId);

    if (!review) {
      const errorMessage = "해당하는 리뷰가 없습니다.";
      return { message: "fail", data: errorMessage };
    }

    if (review.user_id !== userId) {
      const errorMessage = "권한이 없습니다.";
      return { message: "fail", data: errorMessage };
    }

    const toUpdate = setUtil.compareValues(updateData, review);

    const result = await Review.update({ reviewId, toUpdate });

    return { message: "success", data: result };
  },

  // 컬리로그 삭제하기
  deleteLog: async ({ reviewId, userId }) => {
    const review = await Review.findById(reviewId);

    if (!review) {
      const errorMessage = "해당하는 리뷰가 없습니다.";
      return { message: "fail", data: errorMessage };
    }

    if (review.user_id !== userId) {
      const errorMessage = "권한이 없습니다.";
      return { message: "fail", data: errorMessage };
    }

    const result = await Review.delete({ reviewId });
    return { message: "success", data: result };
  },

  // 유저의 컬리로그 조회하기
  getLogs: async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
      const errorMessage = "해당하는 유저가 없습니다.";
      return { message: "fail", data: errorMessage };
    }

    const logs = await Review.findByUser(userId);

    if (!logs || !logs.length) {
      const errorMessage = "아직 로그를 작성하지 않았습니다.";
      return { message: "fail", data: errorMessage };
    }

    return { message: "success", data: logs };
  },

  // best 컬리언서 리뷰 조회하기
  getBestLogs: async () => {
    const grade = "컬리언서";
    const logs = await Review.getBestLogs({ grade });

    return { message: "success", data: logs.slice(0, 3) };
  },

  // best 컬리언서 리뷰 더보기
  getMoreLogs: async () => {
    const grade = "컬리언서";
    const logs = await Review.getBestLogs({ grade });

    return { message: "success", data: logs };
  },

  // 샛별 리뷰 목록 조회하기
  getPopularLogs: async () => {
    const grade = "샛별";
    const logs = await Review.getBestLogs({ grade });

    return { message: "success", data: logs };
  },
};

export { ReviewService };
