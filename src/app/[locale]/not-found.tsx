import Link from 'next/link';
export default function NotFound() {
  return (
    <div>
      <h2>الصفحة غير موجودة</h2>
      <p>تعذر العثور على الصفحة المطلوبة</p>
      <Link href="/">العودة للصفحة الرئيسية</Link>
    </div>
  );
}