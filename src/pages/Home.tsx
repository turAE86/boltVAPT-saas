import Hero from '../components/Hero';
import ContactWidget from '../components/ContactWidget';
import ServicesSection from '../components/ServicesSection';
import MethodologySection from '../components/MethodologySection';

const Home = () => {
  return (
    <div className="pt-20">
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 pb-20 text-center">
        <Hero />
        <ContactWidget />
      </main>

      <ServicesSection />
      <MethodologySection />
    </div>
  );
};

export default Home;
