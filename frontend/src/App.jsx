import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage"
import OurStoryPage from "./pages/OurStoryPage"

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="page-main">
        <LandingPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
