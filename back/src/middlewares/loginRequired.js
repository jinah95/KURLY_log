import jwt from "jsonwebtoken";

const loginRequired = (req, res, next) => {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? null;
    if (!userToken) {
        res.status(400).json("로그인 해주세요.");
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const userId = jwtDecoded.userId;
        req.currentUserId = userId;
        next();
    } catch (error) {
        res.status(400).json(
            "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요."
        );
        return;
    }
};

export default loginRequired;
