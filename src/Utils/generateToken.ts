import Jwt from "jsonwebtoken";
import { JwtPayload } from "./types";
import { serialize } from "cookie";

// generate jwt token
export function generateToken(jwtPayload: JwtPayload): string {
    const privateKey = process.env.JWT_SECRET! // هنا عرفنا في ملف الإنف سكرت كي واستوردناه هنا من خلال الأبجكت بروسيس
    const token = Jwt.sign(jwtPayload, privateKey, { expiresIn: '30d' }); // (دالة ال sign تستخدم لتشفير التوكن) (30 يوم صلاحية التوكن) (3h يعني ثلاث ساعات) (3m يعني ثلاث دقايق)

    return token

}


// Set Cookie with JWT Token

export function setCookie(JWTPayload: JwtPayload): string {
    const token = generateToken(JWTPayload);
    const cookie = serialize('jwtToken', token, {
        httpOnly: true, // يعني الكوكيز لا يمكن الوصول لها من الجافاسكريبت
        secure: process.env.NODE_ENV === 'production', // يعني لا يمكن الوصول لها من الويب
        sameSite: 'strict', // يعني لا يمكن الوصول لها من مواقع اخرى
        maxAge: 60 * 60 * 24 * 30, // يعني صلاحية التوكن 30 يوم
        path: '/', // يعني لا يمكن الوصول لها من مواقع اخرى
    });
    return cookie;
}