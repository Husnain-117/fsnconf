import '../App.css';
// import CallForPapers from "./CallForPapers";
// import Speakers from "./Speakers";
import Header from './header';
import Hero from './hero';
// import Program from './Program';
// import Registration from './Registration';
// import Organizers from './Organizers';
// import AbstractGuidelines from './AbstractGuidelines';
// import ContactUs from './ContactUs';
import Footer from './Footer';
// import Gallery from './Gallery';
// import Sponsors from './Sponsors';

export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      {/* <CallForPapers /> */}
      {/* <div className="relative py-16">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-transparent bg-gradient-to-r from-transparent via-yellow-400 to-purple-500 h-0.5 opacity-70"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-6 py-1 text-sm font-medium text-slate-600 rounded-full border border-slate-200 shadow-sm">
            Our Valued Speakers
          </span>
        </div>
      </div> */}
      {/* <Speakers />
      <Program />
      <Registration />
      <AbstractGuidelines />
      <Organizers />
      <Gallery /> */}
      {/* Gradient Divider */}
      {/* <div className="relative py-16">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-transparent bg-gradient-to-r from-transparent via-yellow-400 to-purple-500 h-0.5 opacity-70"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-6 py-1 text-sm font-medium text-slate-600 rounded-full border border-slate-200 shadow-sm">
            Our Valued Sponsors & Partners
          </span>
        </div>
      </div> */}
      {/* <Sponsors /> */}
      {/* <AccommodationTravel /> */}
      {/* <ContactUs /> */}
      <Footer />
    </>
  );
}
