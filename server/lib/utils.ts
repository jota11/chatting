import jwt from "jsonwebtoken";

export const generateToken = (userId: string, res: any) => {

    const JWTTOKEN: any = process.env.JWT_TOKEN;
    const token = jwt.sign({ userId }, JWTTOKEN, {
        expiresIn: "1d"
    });

    res.cookie("chattingJwt", token, {
        // one day
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}
