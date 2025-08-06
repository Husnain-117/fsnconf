"use client"

import React, { useState, useEffect, type FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Key, User, Trash2, Upload, Loader,  XCircle } from 'lucide-react';

interface Speaker {
  id: number;
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
  type: string;
}

const ADMIN_KEY = 'systoid';
const API_URL = 'http://localhost:5000/api'; // This should ideally be an environment variable

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [key, setKey] = useState('');
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    bio: '',
    expertise: '',
    talkTitle: '',
    talkDescription: '',
    type: 'Invited',
    featured: false,
    linkedin: '',
    twitter: '',
    website: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  const fetchSpeakers = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(`${API_URL}/speakers`);
      if (!response.ok) {
        throw new Error('Failed to fetch speakers.');
      }
      const data = await response.json();
      setSpeakers(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while fetching speakers.');
      }
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSpeakers();
    }
  }, [isAuthenticated]);

  const handleKeySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (key === ADMIN_KEY) {
      setIsAuthenticated(true);
      toast.success('Authentication successful!');
    } else {
      toast.error('Invalid admin key.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPhotoPreviewUrl(URL.createObjectURL(file));
    } else {
      setPhoto(null);
      setPhotoPreviewUrl(null);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreviewUrl(null);
    const photoInput = document.getElementById('photo-input') as HTMLInputElement;
    if (photoInput) photoInput.value = '';
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.warn('Speaker Name is a required field.');
      return;
    }
    setIsLoading(true);
    const submission = new FormData();
    submission.append('name', formData.name);
    submission.append('title', formData.title);
    submission.append('company', formData.company);
    submission.append('bio', formData.bio);
    submission.append('expertise', formData.expertise);
    submission.append('talkTitle', formData.talkTitle);
    submission.append('talkDescription', formData.talkDescription);
    submission.append('type', formData.type);
    submission.append('featured', String(formData.featured));

    const social = {
      linkedin: formData.linkedin,
      twitter: formData.twitter,
      website: formData.website,
    };
    submission.append('social', JSON.stringify(social));

    if (photo) {
      submission.append('photo', photo);
    }

    try {
      const response = await fetch(`${API_URL}/speakers`, {
        method: 'POST',
        body: submission,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add speaker.');
      }
      toast.success('Speaker added successfully!');
      fetchSpeakers(); // Refresh the list
      // Reset form
      setFormData({
        name: '', title: '', company: '', bio: '', expertise: '',
        talkTitle: '', talkDescription: '', type: 'Invited', featured: false,
        linkedin: '', twitter: '', website: ''
      });
      removePhoto(); // Reset photo and preview
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSpeaker = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this speaker?')) return;
    try {
      const response = await fetch(`${API_URL}/speakers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete speaker.');
      }
      toast.success('Speaker deleted successfully!');
      fetchSpeakers(); // Refresh the list
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while deleting.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 flex items-center justify-center p-4">
        <ToastContainer position="bottom-right" theme="colored" />
        <div className="w-full max-w-md">
          <form onSubmit={handleKeySubmit} className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Access</h1>
              <p className="text-slate-500">Enter your private key to continue.</p>
            </div>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Private Key"
                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400"
              />
            </div>
            <button type="submit" className="w-full h-14 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <ToastContainer position="bottom-right" theme="colored" />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-slate-800 mb-8">Speaker Management Dashboard</h1>

        {/* Add Speaker Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
            <User className="mr-3 text-purple-500" size={24} />
            Add New Speaker
          </h2>
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Company / Affiliation</label>
                <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white resize-y"></textarea>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Expertise (comma-separated)</label>
                <input type="text" name="expertise" value={formData.expertise} onChange={handleInputChange} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Talk Title</label>
                <input type="text" name="talkTitle" value={formData.talkTitle} onChange={handleInputChange} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Talk Description</label>
                <textarea name="talkDescription" value={formData.talkDescription} onChange={handleInputChange} rows={3} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white resize-y"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white">
                    <option value="Invited">Invited</option>
                    <option value="Keynote">Keynote</option>
                    <option value="Session Chair">Session Chair</option>
                  </select>
                </div>
                <div className="flex items-center mt-6">
                  <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="h-5 w-5 rounded text-purple-600 focus:ring-purple-500 border-slate-300" />
                  <label htmlFor="featured" className="ml-2 text-sm font-semibold text-slate-700">Featured Speaker?</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Photo</label>
                <input type="file" id="photo-input" onChange={handlePhotoChange} className="w-full p-2 border border-slate-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all duration-200" accept="image/*" />
                {photoPreviewUrl && (
                  <div className="mt-4 relative w-32 h-32 rounded-lg overflow-hidden border-2 border-purple-300 shadow-md">
                    <img src={photoPreviewUrl || "/placeholder.svg"} alt="Photo Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      aria-label="Remove photo"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-2 border-t border-slate-200 pt-6 mt-6">
              <h3 className="text-xl font-bold text-slate-700 mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">LinkedIn URL</label>
                  <input type="text" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Twitter URL</label>
                  <input type="text" name="twitter" value={formData.twitter} onChange={handleInputChange} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white" placeholder="https://twitter.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Website URL</label>
                  <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-800 placeholder:text-slate-400 focus:bg-slate-800 focus:text-white" placeholder="https://yourwebsite.com" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-end pt-4">
              <button type="submit" disabled={isLoading} className="h-12 px-8 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed">
                {isLoading ? <><Loader className="animate-spin mr-2" size={20} /> Processing...</> : <><Upload className="mr-2" size={20} /> Add Speaker</>}
              </button>
            </div>
          </form>
        </div>

        {/* Speaker List */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-slate-700 mb-6">Current Speakers</h2>
          {isFetching ? (
            <div className="text-center py-8">
              <Loader className="animate-spin mx-auto text-purple-500" size={40} />
              <p className="text-slate-600 mt-3">Loading speakers...</p>
            </div>
          ) : speakers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map(speaker => (
                <div key={speaker.id} className="flex flex-col bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center mb-4">
                    <img
                      src={`${API_URL}${speaker.image}`}
                      alt={speaker.name}
                      className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-purple-300 shadow-sm"
                      onError={(e) => e.currentTarget.src = '/placeholder.svg?height=80&width=80&text=No+Image'}
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl text-slate-800">{speaker.name}</h3>
                      <p className="text-slate-600 text-sm">{speaker.title}</p>
                      <p className="text-slate-500 text-xs">{speaker.company}</p>
                      <span className={`mt-1 inline-block text-xs font-bold py-1 px-2 rounded-full ${speaker.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>
                        {speaker.type} {speaker.featured && '(Featured)'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-slate-700 text-sm line-clamp-3 mb-3">{speaker.bio}</p>
                    <p className="text-slate-600 text-xs font-medium">Expertise: {speaker.expertise.join(', ')}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
                    <button
                      onClick={() => handleDeleteSpeaker(speaker.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">No speakers have been added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
