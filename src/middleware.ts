import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('jwtToken')?.value;

  // إعادة توجيه '/' إلى '/en' أو حسب اللغة الافتراضية
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url);
  }

//   هذا تعبير منتظم (RegEx) يتحقق: هل الصفحة هي /en/profile أو /ar/profile أو شيء تحتها مثل /ar/profile/settings؟
// إذا كان نعم، نُخزّن النتيجة في متغير isProfilePage.
  const isProfilePage = /^\/(en|ar)\/profile(\/.*)?$/.test(pathname);

//   نحدد الصفحات التي لا يجب أن يدخلها المستخدم إذا كان مسجّل دخول.
// .includes(pathname) تعني: هل المسار الحالي موجود ضمن هذه القائمة؟ تعطي true أو false.
  const isLoginOrRegisterPage = [
    '/en/login',
    '/ar/login',
    '/en/register',
    '/ar/register'
  ].includes(pathname);

  // حماية صفحة profile للمستخدمين غير المسجلين
  if (isProfilePage && !token) {
    return NextResponse.json(
      { message: 'No token provided, access denied, message from middleware' },
      { status: 401 }
    );
  }

  // منع المستخدم المسجل من الدخول لصفحات login و register
  if (isLoginOrRegisterPage && token) {
    const locale = pathname.split('/')[1];
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/:locale(en|ar)/:path*']
};
