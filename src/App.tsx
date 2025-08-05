import './App.css'
import CallForPapers from "@/Components/CallForPapers"
import Speakers from "@/Components/Speakers"
import Header from './Components/header'
import Hero from './Components/hero'
import Program from './Components/Program'
import Registration from './Components/Registration'
import Organizers from './Components/Organizers'
import AbstractGuidelines from './Components/AbstractGuidelines'
import ContactUs from './Components/ContactUs'
import Footer from './Components/Footer'
import Gallery from './Components/Gallery'
// import AccommodationTravel from './Components/AccommodationTravel'
import  Sponsors  from './Components/Sponsors'


function App() {

  return (
    <>
      <Header/> 
      <Hero/>
      <CallForPapers />
      <div className="relative py-16">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-transparent bg-gradient-to-r from-transparent via-yellow-400 to-purple-500 h-0.5 opacity-70"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-6 py-1 text-sm font-medium text-slate-600 rounded-full border border-slate-200 shadow-sm">
            Our Valued Speakers
          </span>
        </div>
      </div>
      <Speakers />
      <Program />
      <Registration />
      <AbstractGuidelines />
      <Organizers />
      <Gallery />
      {/* Gradient Divider */}
      <div className="relative py-16">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-transparent bg-gradient-to-r from-transparent via-yellow-400 to-purple-500 h-0.5 opacity-70"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-6 py-1 text-sm font-medium text-slate-600 rounded-full border border-slate-200 shadow-sm">
            Our Valued Sponsors & Partners
          </span>
        </div>
      </div>
      <Sponsors />
      {/* <AccommodationTravel /> */}
      <ContactUs />
      <Footer />
    </>
  ) 
}

export default App
