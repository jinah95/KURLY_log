import { Review } from "../db/models/Review";
import { Product } from "../db/models/Product";
import { User } from "../db/models/User";
import { Like } from "../db/models/Like";
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
    await Like.deleteByReview({ reviewId });
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

  // 리뷰데이터에 좋아요수 추가하기
  addLikeCounts: async ({ logs, countLikes }) => {
    console.log(logs);
    let result = logs.map((review) => {
      const count = countLikes.filter(
        (obj) => review.review_id === obj.review_id
      );

      try {
        review.dataValues.countLikes = count[0].dataValues.count;
      } catch {
        review.dataValues.countLikes = 0;
      }
      return review;
    });

    result = result.sort((a, b) => {
      return b.dataValues.countLikes - a.dataValues.countLikes;
    });
    return result;
  },

  // best 컬리언서 리뷰 조회하기
  getBestLogs: async () => {
    const grade = "컬리언서";
    const page = 1;
    const perPage = 5;
    const countLikes = await Like.countByReview();
    const logs = await Review.getBestLogs({ grade, countLikes, page, perPage });

    const result = await ReviewService.addLikeCounts({ logs, countLikes });
    return { message: "success", data: result };
  },

  // best 컬리언서 리뷰 더보기
  getMoreLogs: async () => {
    const grade = "컬리언서";
    const page = 1;
    const perPage = 15;
    const countLikes = await Like.countByReview();
    const logs = await Review.getBestLogs({ grade, countLikes, page, perPage });
    const result = await ReviewService.addLikeCounts({ logs, countLikes });
    return { message: "success", data: result };
  },

  // 샛별 리뷰 목록 조회하기
  getPopularLogs: async ({ page, perPage }) => {
    const grade = "샛별";
    const countLikes = await Like.countByReview();
    const logs = await Review.getBestLogs({ grade, countLikes, page, perPage });

    return { message: "success", data: logs };
  },
};

export { ReviewService };
