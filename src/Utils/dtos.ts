export interface CreateArticleDto { // ال Dto تعني داتا ترانزفير أوبكجت
    title: string;
    description: string;
}

export interface UpdateArticleDto {
    title?: string;
    description?: string;
}

export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean; // هذا الخيار اختياري
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
}

export interface CreateCommentDto {
    text: string;
    articleId: number; // هذا هو ال ID الخاص بالمقال الذي نريد التعليق عليه
}

export interface UpdateCommentDto {
    text: string;
}