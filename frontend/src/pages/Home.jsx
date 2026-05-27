import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Education from '../components/sections/Education';
import Experience from '../components/sections/Experience';
import GitHubStats from '../components/sections/GitHubStats';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
