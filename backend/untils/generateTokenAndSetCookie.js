const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Đảm bảo cookie chỉ được gửi qua kênh an toàn HTTPS
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return token;
};

module.exports = generateTokenAndSetCookie;