import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutStory from "@/components/about/AboutStory";


export const metadata = {
  title: 'About IAHS | Leadership in Global Security',
  description: 'Learn about the International Academy for Homeland Security and our mission to empower professionals worldwide.',
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen  overflow-hidden">
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,#D4AF3703,transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />

      <div className="relative z-10">
        <AboutHero />
        <AboutStats />
        <AboutStory />
      </div>
    </main>
  );
}