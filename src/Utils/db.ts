// import { PrismaClient } from "@prisma/client"; (from "@/generated/prisma"; هذا الاستيراد الصحيح)
// const prisma = new PrismaClient();
// export default prisma;

// الكود الذي فوق صحيح غير أنه يفضل استخدامه عند رفع المشروع للجلوبل
//والكود الذي الاسفل صحيح ويفضل استخدامه اثناء التطوير للوكل
//بسبب الريفريش التلقائي الذي يعمله النكست عند التحديث على الكود والاضافه 
//عليه أثناء عملية التطوير والبناء فكل مره يعمل رفريش يحفظ البريزما
//في المومري مما يسبب مشاكل من خلال تخزين البريزما في كل مره في المومري
//  لكن في الجلوبل سيرفر لا تتم هذه العمليه 

// lib/prisma.ts

//import { PrismaClient } from "@prisma/client"; هذا الاستيراد هو السبب في المشكله

import { PrismaClient } from "@/generated/prisma"; // هذا الاستيراد الصحيح

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;