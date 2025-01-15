import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Highlights } from "./components/Highlights"
import { Model } from "./components/Model"
import { Features } from "./components/Features"
import { Monster } from "./components/Monster"
import Footer from "./components/Footer"
import * as Sentry from '@sentry/react'

const App = () => {
  
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <Monster />
      <Footer />
    </main>
  )
}

export default Sentry.withProfiler(App);
