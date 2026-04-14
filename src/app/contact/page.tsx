import ContactHero from '@/components/contact/ContactHero';
import ContactGrid from '@/components/contact/ContactGrid';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Mission Control | IAHS Academy',
  description: 'Connect with our strategic security experts in Dubai.',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[oklch(98%_0.01_260)] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-multiply" />
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[oklch(45%_0.12_255)]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <ContactHero />
        
        <section className="max-w-7xl mx-auto px-6 pb-20 mt-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <aside className="lg:col-span-5 order-2 lg:order-1">
              <div className="lg:sticky lg:top-32 space-y-8">
                <ContactGrid />
        
              </div>
            </aside>
            
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}