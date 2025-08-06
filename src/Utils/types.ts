import { Article, User, Comment } from "@/generated/prisma"

export type JwtPayload = {
      id: number,
      isAdmin: boolean,
      username: string,
      email: string
  }
  
  export type CommentWithUser = Comment & { user: User };
  export type SingleArticle = Article & { comments: CommentWithUser[] };