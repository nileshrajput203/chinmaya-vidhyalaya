import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Train, Car, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { CONTACT_DETAILS } from '../../data/contact';

interface GoogleMapSectionProps {
  className?: string;
  showTitle?: boolean;
}

export const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({
  className = '',
  showTitle = true,
}) => {
  // 'map' = standard crisp vector roadmap with clear labels & pin
  // 'satellite' = hybrid satellite with roads & landmark overlays
  const [mapMode, setMapMode] = useState<'map' | 'satellite'>('map');

  const embedUrl = mapMode === 'satellite'
    ? 'https://maps.google.com/maps?q=Chinmaya+Vidyalaya+Tarapur,+Boisar&t=h&z=17&ie=UTF8&iwloc=B&output=embed'
    : 'https://maps.google.com/maps?q=Chinmaya+Vidyalaya+Tarapur,+Boisar&t=&z=16&ie=UTF8&iwloc=B&output=embed';

  const directMapUrl = 'https://www.google.com/maps/search/?api=1&query=Chinmaya+Vidyalaya+Tarapur+Boisar';
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Chinmaya+Vidyalaya+Tarapur+Boisar';

  return (
    <div id="google-map-section" className={`bg-white border border-[#E7E2D8] rounded-3xl shadow-card overflow-hidden ${className}`}>
      {showTitle && (
        <div className="p-5 sm:p-6 border-b border-[#E7E2D8] bg-[#FAF8F5] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0B1D30] text-[#DF711B] flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="w-5 h-5 text-[#DF711B]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0B1D30]">
                  Campus Location & Access
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Campus Open
                </span>
              </div>
              <p className="text-xs text-[#555555] font-sans mt-0.5">
                Chinmaya Vidyalaya • P-201, MIDC Area, Vidyanagar, Saravali, Boisar 401501
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Map Mode Switcher */}
            <div className="flex items-center bg-white border border-[#E7E2D8] p-1 rounded-xl text-xs font-sans shadow-xs">
              <button
                type="button"
                onClick={() => setMapMode('map')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  mapMode === 'map'
                    ? 'bg-[#0B1D30] text-white shadow-xs'
                    : 'text-[#555555] hover:text-[#0B1D30] hover:bg-[#FAF8F5]'
                }`}
              >
                Roadmap
              </button>
              <button
                type="button"
                onClick={() => setMapMode('satellite')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  mapMode === 'satellite'
                    ? 'bg-[#0B1D30] text-white shadow-xs'
                    : 'text-[#555555] hover:text-[#0B1D30] hover:bg-[#FAF8F5]'
                }`}
              >
                Satellite
              </button>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#DF711B] hover:bg-[#c96213] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              title="Get driving directions in Google Maps"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <a
              href={directMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E7E2D8] hover:border-[#DF711B] text-[#0B1D30] text-xs font-semibold rounded-xl transition-colors shadow-xs"
              title="Open campus location in Google Maps"
            >
              <span>Open in Maps</span>
              <ExternalLink className="w-3 h-3 text-[#777777]" />
            </a>
          </div>
        </div>
      )}

      {/* Map Display Viewport with Floating Institutional Campus Badge */}
      <div className="relative w-full h-80 sm:h-96 md:h-[460px] bg-[#EFECE6] overflow-hidden">
        <iframe
          key={mapMode}
          title="Chinmaya Vidyalaya Tarapur Boisar Location"
          src={embedUrl}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Institutional Pin Card */}
        <div className="absolute top-4 left-4 z-10 hidden sm:block max-w-xs bg-white/95 backdrop-blur-md border border-[#E7E2D8] rounded-2xl p-4 shadow-lg text-xs pointer-events-auto">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E7E2D8] flex items-center justify-center shrink-0 p-1">
              <img
                src="/images/Chinmaya_Logo.png"
                alt="Chinmaya Vidyalaya Crest"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0B1D30] text-sm truncate">
                  Chinmaya Vidyalaya
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </div>
              <p className="text-[11px] text-[#777777] font-sans mt-0.5">
                CBSE Affil. No. {CONTACT_DETAILS.affiliationNo} • Code: {CONTACT_DETAILS.schoolCode}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#EFECE6] text-[11px] text-[#555555] space-y-1 font-sans">
            <p className="leading-snug">
              P-201, MIDC Area, Vidyanagar, Saravali, Boisar 401501
            </p>
            <div className="flex items-center justify-between pt-1">
              <a
                href="tel:9322054713"
                className="inline-flex items-center gap-1 font-semibold text-[#DF711B] hover:underline"
              >
                <Phone className="w-3 h-3" />
                <span>9322054713</span>
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#0B1D30] hover:text-[#DF711B]"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Transit Details Footer */}
      <div className="p-6 sm:p-7 bg-[#FAF8F5] border-t border-[#E7E2D8] grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
        <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#E7E2D8]/80 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E8] border border-[#E7E2D8] flex items-center justify-center shrink-0">
            <Train className="w-4 h-4 text-[#DF711B]" />
          </div>
          <div>
            <strong className="block font-bold text-[#0B1D30] text-xs mb-1">
              By Western Railway
            </strong>
            <p className="text-[#555555] leading-relaxed">
              Boisar Railway Station is ~3.5 km away. Frequent auto-rickshaws available directly to school gate (approx. 10 mins).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#E7E2D8]/80 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E8] border border-[#E7E2D8] flex items-center justify-center shrink-0">
            <Car className="w-4 h-4 text-[#DF711B]" />
          </div>
          <div>
            <strong className="block font-bold text-[#0B1D30] text-xs mb-1">
              By Road & Highway
            </strong>
            <p className="text-[#555555] leading-relaxed">
              Accessible via Palghar-Tarapur Highway and Boisar MIDC Link Road. Landmark: P-201, Vidyanagar, Saravali.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#E7E2D8]/80 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E8] border border-[#E7E2D8] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-[#DF711B]" />
          </div>
          <div>
            <strong className="block font-bold text-[#0B1D30] text-xs mb-1">
              Administrative Timings
            </strong>
            <p className="text-[#555555] leading-relaxed">
              Mon–Fri: 8:30 AM – 3:30 PM, Sat: 8:30 AM – 12:30 PM. Visitor registration at main entrance reception.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
