import Footer from "@src/component/commoncomponents/FooterComponent";
import Header from "@src/component/commoncomponents/header";
import MobileBottomNav from "@src/component/commoncomponents/MobileFooterComponent";
import MobileHeader from "@src/component/commoncomponents/mobileheader";
import MainLayout from "@src/Layout/MainLayout";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Toaster toastOptions={{ duration: 3000 }} />

      <div className="hidden md:block sticky top-0 z-50">
        <Header cartCount={3} wishlistCount={5} notificationCount={2} />
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden">
        <MobileHeader wishlistCount={5} notificationCount={2} />
      </div>

      {children}

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
