import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}