import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ['en', 'ar'], // اللغات المدعومة
  //   defaultLocale: 'en',   // اللغة الافتراضية
  // },
};

export default withNextIntl(nextConfig);