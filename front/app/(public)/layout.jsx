import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <main className="max-w-[1200px] mx-auto px-4 md:px-8 pb-8">{children}</main>
      <PublicFooter />
    </div>
  );
}