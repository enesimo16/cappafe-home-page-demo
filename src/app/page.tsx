import Navbar from "@/components/layout/Navbar";
import SectionDots from "@/components/layout/SectionDots";
import ToTopButton from "@/components/layout/ToTopButton";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CatalogTab from "@/components/layout/CatalogTab";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Products from "@/components/sections/Products";
import Story from "@/components/sections/Story";
import ProductionFlow from "@/components/sections/ProductionFlow";
import GroupCompanies from "@/components/sections/GroupCompanies";
import Partnership from "@/components/sections/Partnership";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <Navbar />
      <SectionDots />
      <ToTopButton />
      <WhatsAppButton />
      <CatalogTab />

      <main className="relative z-[1]">
        <Hero />
        <Stats />
        <Products />
        <Story />
        <ProductionFlow />
        <GroupCompanies />
        <Partnership />
        <BlogPreview />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
