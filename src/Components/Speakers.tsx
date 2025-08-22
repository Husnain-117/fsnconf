import React, { useEffect, useState } from "react";
import { useSpeakerStore, type Speaker } from "@/store/speakerStore"; // Update the path as needed
import { Button } from "@/Components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, Linkedin, Twitter, Globe } from 'lucide-react';
import Header from "./header";
import Footer from "./Footer";

// Local fallback speakers; used when API/store has no data
const HARDCODED_SPEAKERS: Speaker[] = [
  {
    _id: "local-1",
    name: "Prof. Dr. Sanaullah Iqbal",
    title: "Chairman",
    company: "Department of Food Science and Human Nutrition, University of Veterinary and Animal Sciences (UVAS), Lahore",
    image: "",
    bio: "Prof. Dr. Sanaullah Iqbal is a tenured professor and chairman at UVAS, Lahore with extensive academic, research, and administrative experience in food science and nutrition.",
    expertise: ["Food Science", "Nutrition", "Food Safety", "Public Health"],
    social: { website: "https://www.uvas.edu.pk/" },
    featured: false,
    talkTitle: "Front-of-Pack Labelling (FOPL) as a Public Health Priority for Pakistan: Bridging the Gap Between Nutrition Literacy and Non-Communicable Disease Prevention",
    talkDescription: "An overview of FOPL, its relevance for Pakistan, and strategies to improve nutrition literacy and reduce NCDs.",
    type: "session",
  },
  {
    _id: "local-2",
    name: "Dr. Jane Doe",
    title: "Associate Professor",
    company: "Institute of Food and Nutrition Sciences",
    image: "",
    bio: "Researcher focusing on functional foods and community nutrition programs.",
    expertise: ["Functional Foods", "Community Nutrition"],
    social: {},
    featured: true,
    talkTitle: "Innovations in Functional Foods for Metabolic Health",
    talkDescription: "Translating lab discoveries into public health impact via functional foods.",
    type: "keynote",
  },
  {
    _id: "local-3",
    name: "Mr. John Smith",
    title: "Industry Expert",
    company: "FoodTech Labs",
    image: "",
    bio: "Advisor on food safety systems and quality assurance.",
    expertise: ["Food Safety", "Quality Assurance"],
    social: {},
    featured: false,
    talkTitle: "Digital QA Systems for Safer Supply Chains",
    talkDescription: "Modernizing QA with traceability and digital tooling.",
    type: "invited",
  },
  {
    _id: "local-4",
    name: "Prof. Dr. Umar Farooq",
    title: "Dean",
    company: "Faculty of Food and Home Sciences, MNS University of Agriculture, Multan, Pakistan",
    image: "",
    bio: "Focuses on food product development, value addition, and processing technologies with broad academic leadership.",
    expertise: ["Food Science", "Product Development", "Processing"],
    social: {},
    featured: false,
    talkTitle: "Management of Hypomagnesemia in Patients Through Pumpkin Seeds",
    talkDescription: "Exploring nutritional interventions using pumpkin seeds.",
    type: "session",
  },
  {
    _id: "local-5",
    name: "Dr. Muhammad Farhan Jahangir Chughtai",
    title: "Chairman",
    company: "Khwaja Fareed University of Engineering and Information Technology (KFUEIT), Rahim Yar Khan, Pakistan",
    image: "",
    bio: "Dr. Muhammad Farhan Jahangir Chughtai is an accomplished academic and administrator with expertise in Food Science, Nutrition, and Halal Food Management. He serves as Additional Director and Assistant Professor at KFUEIT, Rahim Yar Khan. Purdue University (USA), he has led numerous accredited programs, supervised MS/PhD research, and published extensively. His leadership in academia, research, industry collaboration, and curriculum development reflects a strong commitment to innovation and public health impact through sustainable food.",
    expertise: ["Food Science", "Nutrition", "Halal Food Management", "Packaging"],
    social: {},
    featured: false,
    talkTitle: "Sustainable Edible Packaging: Advances in Materials, Manufacturing, and Applications",
    talkDescription: "Recent advances and real-world applications of edible packaging for sustainability.",
    type: "session",
  },
];


const BASE_API_URL =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://fsnconference-backend.vercel.app'; // Production API URL

// Helper function to construct proper image URL
const getImageUrl = (imagePath?: string): string | undefined => {
  if (!imagePath || imagePath.trim() === '' || imagePath.includes('/undefined')) return undefined;
  // If it's already a full URL (http/https) or a data URI, return as is
  if (/^(http|https):\/\//.test(imagePath) || imagePath.startsWith('data:')) return imagePath;
  // Otherwise, treat as legacy local path
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${BASE_API_URL}${cleanPath}`;
};

// A robust component to handle image loading with a fallback placeholder icon
const SpeakerImage: React.FC<{ src?: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [src]);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const imageUrl = getImageUrl(src);

  if (imageError || !imageUrl) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-dashed border-slate-300`}>
        <User className="w-1/3 h-1/3 text-slate-400" />
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse">
          <User className="w-1/3 h-1/3 text-slate-300" />
        </div>
      )}
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

// Modal component to display detailed speaker information
const SpeakerDetailModal: React.FC<{ speaker: Speaker; onClose: () => void }> = ({ speaker, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 z-10">
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <SpeakerImage 
                src={speaker.image}
                alt={speaker.name} 
                className="w-full h-auto aspect-square object-cover rounded-2xl shadow-md"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-black text-slate-800">{speaker.name}</h2>
              <p className="text-lg text-yellow-600 font-semibold">{speaker.title}</p>
              <p className="text-md text-slate-600 mb-4">{speaker.company}</p>
              
              <div className="flex items-center gap-4 mb-6">
                {speaker.social?.linkedin && <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600"><Linkedin /></a>}
                {speaker.social?.twitter && <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-500"><Twitter /></a>}
                {speaker.social?.website && <a href={speaker.social.website} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-green-600"><Globe /></a>}
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-700">Talk: <span className="font-normal">{speaker.talkTitle}</span></h4>
              </div>
            </div>
          </div>

          {/* Removed About and Talk Description sections as per request */}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Speakers: React.FC = () => {
  // Use reactive Zustand selectors for automatic updates
  const speakers = useSpeakerStore(state => state.speakers);
  const isLoading = useSpeakerStore(state => state.isLoading);
  const fetchSpeakers = useSpeakerStore(state => state.fetchSpeakers);
  
  const [expanded, setExpanded] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  useEffect(() => {
    // Only fetch if we don't have speakers yet
    if (speakers.length === 0) {
      fetchSpeakers();
    }
  }, [speakers.length, fetchSpeakers]);

  // Use API/store speakers when available, otherwise local fallback
  const allSpeakers = speakers.length > 0 ? speakers : HARDCODED_SPEAKERS;
  const visibleSpeakers = expanded ? allSpeakers : allSpeakers.slice(0, 3);


  return (
    <>
    <Header />
    <section id="speakers" className="min-h-screen py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-yellow-500 mb-4">
            Our <span className="text-yellow-500">Speakers</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            <i>Learn from global experts, innovators, and researchers.</i>
          </p>
        </div>

        {/* Speaker Grid */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading speakers...</p>
        ) : (
          <AnimatePresence>
            <motion.div
              layout
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {visibleSpeakers.map((sp, idx) => (
                <motion.div
                  key={sp._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border rounded-2xl shadow hover:shadow-xl transition-all cursor-pointer group" onClick={() => setSelectedSpeaker(sp)}
                >
                  <div className="relative">
                  <SpeakerImage
                    src={sp.image}
                    alt={sp.name}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-2xl" />
                </div>
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-lg group-hover:text-yellow-600 transition-colors line-clamp-1" title={sp.name}>
                        {sp.name}
                      </h4>
                      <p className="text-sm text-slate-600 font-medium">{sp.company || sp.title}</p>
                    </div>
                    
                    {sp.expertise && sp.expertise.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-slate-500 font-medium mb-1">Expertise:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {sp.expertise.slice(0, 3).map((exp, idx) => (
                            <span 
                              key={idx} 
                              className="inline-block px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-full"
                            >
                              {exp}
                            </span>
                          ))}
                          {sp.expertise.length > 3 && (
                            <span className="inline-block px-2 py-0.5 text-xs font-medium text-slate-400">
                              +{sp.expertise.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          sp.featured
                            ? "bg-yellow-100 text-yellow-800"
                            : sp.type === "Session Chair"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {sp.featured ? "Keynote" : sp.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Toggle Button */}
        {!isLoading && allSpeakers.length > 3 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setExpanded((prev) => !prev)}
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              {expanded ? "Show Less" : "View More"}
            </Button>
          </div>
        )}

       
      </div>

      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerDetailModal 
            speaker={selectedSpeaker} 
            onClose={() => setSelectedSpeaker(null)} 
          />
        )}
      </AnimatePresence>
    </section>
    <Footer />
    </>
  );
};

export default Speakers;
