import Footer from '@/components/Common/Footer';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Footer />
      {children}
    </>
  );
}
