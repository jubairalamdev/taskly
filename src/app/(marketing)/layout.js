import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MarketingLayout({ children }) {
  return (
    <>
      <main className="flex-1 flex flex-col">{children}</main>
    </>
  );
}
