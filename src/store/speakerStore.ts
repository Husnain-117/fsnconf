import { create } from 'zustand';
import { toast } from 'react-toastify';


const API_URL = 'https://fsnconference-backend.vercel.app/api';

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  bio: string;
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  featured: boolean;
  talkTitle: string;
  talkDescription: string;
  type: 'keynote' | 'session' | 'invited' | 'Session Chair';
}

interface SpeakerState {
  speakers: Speaker[];
  isLoading: boolean;
  error: string | null;
  fetchSpeakers: () => Promise<void>;
  addSpeaker: (speakerData: FormData) => Promise<void>;
  deleteSpeaker: (id: string) => Promise<void>;
  getSpeakerById: (id: string) => Speaker | undefined;
  getSpeakersByType: (type: 'keynote' | 'session' | 'invited' | 'Session Chair') => Speaker[];
  getFeaturedSpeakers: () => Speaker[];
}

export const useSpeakerStore = create<SpeakerState>((set, get) => ({
  speakers: [], // Will be populated via fetchSpeakers()
  isLoading: false,
  error: null,

  fetchSpeakers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/speakers`);
      if (!response.ok) {
        throw new Error('Failed to fetch speakers');
      }
      const data = await response.json();
      set({ speakers: data, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch speakers';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  addSpeaker: async (speakerData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/speakers`, {
        method: 'POST',
        body: speakerData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add speaker');
      }

      toast.success('Speaker added successfully!');
      get().fetchSpeakers(); // Re-fetch to sync the list
      const newSpeaker = await response.json();
      return newSpeaker;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add speaker';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  deleteSpeaker: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/speakers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete speaker');
      }

      toast.success('Speaker deleted successfully!');
      get().fetchSpeakers(); // Re-fetch to sync the list
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete speaker';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  getSpeakerById: (id) => {
    return get().speakers.find((speaker) => speaker.id === id);
  },

  getSpeakersByType: (type) => {
    return get().speakers.filter((speaker) => speaker.type === type);
  },

  getFeaturedSpeakers: () => {
    return get().speakers.filter((speaker) => speaker.featured);
  },
}));
