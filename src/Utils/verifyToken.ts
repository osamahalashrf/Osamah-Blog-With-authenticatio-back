import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";
import { JwtPayload } from "./types";

// Verify a JWT token For API End Point
export function verifyToken(request: NextRequest) : JwtPayload | null {
    try {
        const jwtToken = request.cookies.get("jwtToken")?.value as string; // نحصل على التوكن من الكوكيز
        if (!jwtToken) return null; // إذا لم يكن هناك توكن نعيد null

        const privatekey = process.env.JWT_SECRET as string; // نحصل على المفتاح السري من البيئة
        const userPayload = jwt.verify(jwtToken, privatekey) as JwtPayload; // نتحقق من صحة التوكن
        return userPayload; // إذا كان التوكن صحيح، نعيد البيانات الموجودة فيه
    } catch {
        return null; // في حالة حدوث خطأ نعيد null
    }
}

// Verify a JWT token For Page
export function verifyTokenForPage(token: string) : JwtPayload | null {
    try {
        const privatekey = process.env.JWT_SECRET as string; // نحصل على المفتاح السري من البيئة
        const userPayload = jwt.verify(token, privatekey) as JwtPayload; // نتحقق من صحة التوكن
        
        if (!userPayload) return null; // إذا لم يكن هناك توكن نعيد null

        return userPayload; // إذا كان التوكن صحيح، نعيد البيانات الموجودة فيه
    } catch {
        return null; // في حالة حدوث خطأ نعيد null
    }
}