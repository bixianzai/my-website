import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import ProjectSection from '../components/ProjectSection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'

export default function Landing() {
  return (
    <div className="landing-layout">
      <NavBar />
      <div id="home"><Hero /></div>
      <div className="ticks" />
      <ProjectSection />
      <div className="ticks" />
      <AboutSection />
      <div className="ticks" />
      <ContactSection />
      <div className="ticks" />
      <section id="spacer" />
    </div>
  )
}
