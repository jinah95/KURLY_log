import { body, validationResult } from "express-validator";

const reviewValidator = {};
reviewValidator.postReviewValidator = [
  body("score")
    .notEmpty()
    .withMessage("점수를 입력해주세요")
    .isInt({ min: 0, max: 5 })
    .bail(),
  body("good")
    .trim()
    .isLength({ min: 4 })
    .withMessage("장점을 더 입력해주세요")
    .bail(),
  body("bad")
    .trim()
    .isLength({ min: 4 })
    .withMessage("단점을 더 입력해주세요")
    .bail(),
];
reviewValidator.setReviewValidator = [
  body("score")
    .notEmpty()
    .withMessage("점수를 입력해주세요")
    .isInt({ min: 0, max: 5 })
    .bail(),
  body("good")
    .trim()
    .isLength({ min: 4 })
    .withMessage("장점을 더 입력해주세요")
    .bail(),
  body("bad")
    .trim()
    .isLength({ min: 4 })
    .withMessage("단점을 더 입력해주세요")
    .bail(),
];

const validationErrorCatcher = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const error = new Error(errors.array()[0].msg);
  error.status = 400;
  throw error;
};

export { reviewValidator, validationErrorCatcher };
