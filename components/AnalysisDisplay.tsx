import React from 'react';
import { WellnessResponse } from '../types';
import { Eye, Activity, Sparkles, ClipboardCheck, AlertCircle, ExternalLink, BookOpen, MapPin } from 'lucide-react';

interface AnalysisDisplayProps {
  data: WellnessResponse;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Visual Interpretation */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Eye className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-slate-800">Visual Observations</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          {data.visualInterpretation}
        </p>
      </div>

      {/* Symptom Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-5 h-5 text-rose-500" />
          <h3 className="font-semibold text-slate-800">Symptom Summary</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          {data.symptomSummary}
        </p>
      </div>

      {/* Wellness Suggestions */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border border-teal-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <h3 className="font-semibold text-teal-900">Wellness Suggestions</h3>
        </div>
        <ul className="space-y-3">
          {data.wellnessSuggestions.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                {idx + 1}
              </span>
              <p className="text-teal-800 text-sm">{tip}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Trusted Resources (Grounding) */}
      {data.trustedResources && data.trustedResources.length > 0 && (
        <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Trusted Resources</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.trustedResources.map((res, idx) => (
              <a 
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex-shrink-0 p-2 bg-blue-50 text-blue-500 rounded-md group-hover:bg-blue-100 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-700 transition-colors">
                    {res.title}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {new URL(res.url).hostname}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Professional Care Recommendation */}
      <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-indigo-900">Need Professional Advice?</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Our AI is a support tool. For medical diagnosis and prescription treatment, please consult a specialist.
            </p>
          </div>
          <a 
            href="https://www.google.com/maps/search/dermatologists+near+me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200"
          >
            <MapPin className="w-4 h-4" />
            Find Dermatologist
          </a>
        </div>
      </div>

      {/* Trackable Summary */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-3">
          <ClipboardCheck className="w-5 h-5 text-slate-500" />
          <h3 className="font-semibold text-slate-700">Daily Log Summary</h3>
        </div>
        <p className="text-slate-500 text-sm italic border-l-4 border-slate-300 pl-4 py-1">
          "{data.trackableSummary}"
        </p>
      </div>

      {/* Inline Disclaimer */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 text-amber-800 rounded-lg text-xs">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>{data.disclaimer || "Remember: DermAI Coach is a support tool, not a doctor. Please consult a dermatologist for any medical concerns."}</p>
      </div>
    </div>
  );
};

export default AnalysisDisplay;