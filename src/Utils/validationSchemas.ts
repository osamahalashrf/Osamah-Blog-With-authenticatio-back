import { z } from "zod";

//Create Articles Schema
export const createArticleSchema = z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title should be of type string"
    })
        .min(2, { message: "title must be more than 2 characters long!" })
        .max(200, { message: "title must be less than 200 characters!" }),//لازم يكون نص واقل شيء حرفين واكثر شيء مئتين حرف
    description: z.string().min(10, "بيانات غير صالحه! أقل شيء عشره احرف"),
});

//Register Schema
export const registerSchema = z.object({
    username: z.string().min(2).max(100), //.optional(),
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
});

//Login Schema
export const loginSchema = z.object({
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
});

// Create Comment Schema
export const createCommentSchema = z.object({
    text: z.string().min(2 , {
        message: "text must be more than 2 characters long!"
    })
    .max(500, {
        message: "text must be less than 500 characters!"
    }),
    articleId: z.number(),
});

// Update User Profile Schema

export const updateUserSchema = z.object({
    username: z.string().min(2).max(100).optional(), //.optional(),
    email: z.string().min(3).max(200).email().optional(),
    password: z.string().min(6).optional(),
});