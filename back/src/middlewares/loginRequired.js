import jwt from "jsonwebtoken";
const { development, JWT_SECRET_KEY } = process.env;

const loginRequired = (req, res, next) => {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? null;

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
  // 토큰이 "null" 일 경우, loginRequired 가 필요한 서비스 사용을 제한함.
  if (!userToken) {
    if (!development) {
      console.log(
        "서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음"
      );
    }
    res.status(400).json("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY가 존재하지 않습니다.");
    }
    const jwtDecoded = jwt.verify(userToken, JWT_SECRET_KEY);
    const userId = jwtDecoded.userId;
    req.currentUserId = userId;
    next();
  } catch (error) {
    res.status(400).json("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
};

export default loginRequired;
