import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Loader2, Send, AlertTriangle, MapPin } from 'lucide-react';
import { LoadingState, WellnessResponse } from '../types';
import { analyzeSkinCondition } from '../services/geminiService';
import AnalysisDisplay from './AnalysisDisplay';

const SkinAnalyzer: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<WellnessResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!textInput.trim() && !selectedImage) {
      setErrorMsg("Please provide an image or describe your symptoms.");
      return;
    }

    setLoadingState(LoadingState.ANALYZING);
    setErrorMsg(null);
    setResult(null);

    try {
      const data = await analyzeSkinCondition(textInput, selectedImage);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      setLoadingState(LoadingState.ERROR);
      setErrorMsg("Unable to analyze. Please check your connection and try again.");
    }
  };

  useEffect(() => {
    if (loadingState === LoadingState.SUCCESS && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loadingState]);

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">Daily Skin Check-in</h2>
        <p className="text-slate-600 text-lg">Your private space to log and analyze symptoms.</p>
      </div>

      {/* Input Card - Enhanced 3D Look */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden ring-1 ring-slate-900/5">
        
        {/* Image Upload Area with 3D Effect */}
        <div className={`relative transition-all duration-300 ${selectedImage ? 'bg-slate-900' : 'p-6 sm:p-8'}`}>
          
          {selectedImage ? (
            <div className="relative h-64 sm:h-80 w-full group">
              <img 
                src={selectedImage} 
                alt="Skin condition preview for analysis" 
                className="w-full h-full object-contain bg-slate-900" 
              />
              <button 
                onClick={handleRemoveImage}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-rose-500 p-2.5 rounded-xl shadow-lg backdrop-blur-sm transition-all transform hover:scale-105 border border-rose-100 z-10"
                title="Remove image"
                aria-label="Remove uploaded image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="
                relative h-64 sm:h-80 w-full rounded-2xl 
                border-3 border-dashed border-slate-200 hover:border-teal-400 
                bg-slate-50 hover:bg-teal-50/30 
                flex flex-col items-center justify-center 
                cursor-pointer transition-all duration-300 group
                overflow-hidden
              "
              style={{ borderStyle: 'dashed', borderWidth: '3px' }}
              role="button"
              tabIndex={0}
              aria-label="Upload photo of skin condition"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  fileInputRef.current?.click();
                }
              }}
            >
              {/* Decorative background blobs */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 rounded-full bg-teal-100/50 blur-3xl group-hover:bg-teal-200/50 transition-colors"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-blue-100/50 blur-3xl group-hover:bg-blue-200/50 transition-colors"></div>

              {/* 3D Icon Container */}
              <div className="relative z-10 bg-white p-6 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] border border-slate-100 group-hover:-translate-y-2 group-hover:shadow-[0_20px_30px_-5px_rgba(20,184,166,0.2)] transition-all duration-300">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 w-16 h-16 rounded-xl flex items-center justify-center">
                  <Camera className="w-8 h-8 text-teal-600" />
                </div>
                {/* Floating plus icon */}
                <div className="absolute -right-3 -top-3 bg-teal-500 text-white p-1.5 rounded-lg shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                    <Upload className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="relative z-10 mt-6 text-center space-y-2 px-4">
                <h3 className="text-xl font-bold text-slate-700 group-hover:text-teal-700 transition-colors">
                  Upload Photo
                </h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                  Click to select or drag & drop
                  <span className="block text-xs mt-1.5 text-slate-400 font-medium bg-white/60 py-1 px-3 rounded-full inline-block">Supports JPG, PNG</span>
                </p>
              </div>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden" 
            aria-hidden="true"
          />
        </div>

        {/* Text Input Area */}
        <div className="p-6 sm:p-10 border-t border-slate-100 bg-white">
          <div className="mb-8">
            <label htmlFor="symptoms" className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
              How are you feeling today?
            </label>
            <textarea 
              id="symptoms"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 resize-none transition-all shadow-inner"
              rows={4}
              placeholder="E.g., Itching increased after swimming, redness is fading..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-slate-600 hover:text-teal-600 transition text-sm font-semibold py-3 px-6 rounded-xl border border-slate-200 hover:border-teal-200 hover:bg-teal-50/50 bg-white shadow-sm hover:shadow"
              aria-label="Upload or replace photo"
            >
              <Upload className="w-4 h-4" />
              {selectedImage ? 'Replace Photo' : 'Upload Photo'}
            </button>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a 
                href="https://www.google.com/maps/search/dermatologists+near+me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-indigo-200 font-semibold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow"
                aria-label="Find dermatologists near you on Google Maps"
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden lg:inline">Find</span> Dermatologist
              </a>

              <button 
                onClick={handleSubmit}
                disabled={loadingState === LoadingState.ANALYZING}
                className={`
                  w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all transform active:scale-95
                  ${loadingState === LoadingState.ANALYZING 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-teal-500/30'}
                `}
                aria-busy={loadingState === LoadingState.ANALYZING}
                aria-label="Submit for AI analysis"
              >
                {loadingState === LoadingState.ANALYZING ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span>Check In Now</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          {errorMsg && (
            <div className="mt-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm flex items-start gap-3 animate-fadeIn" role="alert">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div ref={resultRef} className="max-w-3xl mx-auto mt-12" aria-live="polite">
        {result && loadingState === LoadingState.SUCCESS && (
          <AnalysisDisplay data={result} />
        )}
      </div>
    </>
  );
};

export default SkinAnalyzer;