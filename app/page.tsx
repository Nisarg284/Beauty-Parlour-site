import Navbar from "@/components/Navbar";
import HeroSimpleVideo from "@/components/HeroSimpleVideo";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-ink">
      <Navbar />
      <HeroSimpleVideo />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <InstagramFeed />
      <Booking />
      <Footer />
    </main>
  );
}
