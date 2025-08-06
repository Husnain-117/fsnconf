import React, { useEffect, useState } from "react";
import { useSpeakerStore, type Speaker } from "@/store/speakerStore"; // Update the path as needed
import { Button } from "@/Components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, Linkedin, Twitter, Globe } from 'lucide-react';

const BASE_API_URL = 'https://fsnconference-backend.vercel.app'; // Production API URL

// Helper function to construct proper image URL
const getImageUrl = (imagePath?: string): string | undefined => {
  if (!imagePath) return undefined;
  
  // If it's already a full URL or a data URI, return as is
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
  
  // Clean the path and construct full URL
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

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold text-slate-800 mb-2">About</h3>
            <p className="text-slate-600 whitespace-pre-wrap">{speaker.bio}</p>

            <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">Talk Description</h3>
            <p className="text-slate-600 whitespace-pre-wrap">{speaker.talkDescription}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Speakers: React.FC = () => {
  // Use individual selectors for state and actions. This is the standard pattern
  // and ensures the component re-renders only when the selected state changes.
  const speakers = useSpeakerStore((state) => state.speakers);
  const isLoading = useSpeakerStore((state) => state.isLoading);
  const fetchSpeakers = useSpeakerStore((state) => state.fetchSpeakers);

  const [expanded, setExpanded] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Fetch speakers only once when the component mounts.
  // The component will then rely on the store for any further updates.
  useEffect(() => {
    fetchSpeakers();
  }, [fetchSpeakers]);

  const visibleSpeakers = expanded ? speakers : speakers.slice(0, 3);


  return (
    <section id="speakers" className="min-h-screen py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Our <span className="text-yellow-600">Speakers</span>
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
              {visibleSpeakers.map((sp: Speaker, idx: number) => (
                <motion.div
                  key={sp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white border rounded-2xl shadow hover:shadow-xl transition-all cursor-pointer group" onClick={() => setSelectedSpeaker(sp)}
                >
                  <SpeakerImage
                    src={sp.image}
                    alt={sp.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="p-4 text-center space-y-2">
                    <h4 className="font-bold text-slate-800 text-lg group-hover:text-yellow-600 transition-colors">
                      {sp.name}
                    </h4>
                    <p className="text-sm text-slate-600">{sp.title}</p>
                    <p className="text-xs text-slate-500 font-medium mt-2 italic">{sp.talkTitle}</p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                        sp.featured
                          ? "bg-yellow-100 text-yellow-800"
                          : sp.type === "Session Chair"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {sp.featured ? "Keynote" : sp.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Toggle Button */}
        {!isLoading && speakers.length > 3 && (
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
  );
};

export default Speakers;
