// Source: Google Maps Platform Code Assist
import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Train, Car, Clock } from 'lucide-react';
import { CONTACT_DETAILS } from '../../data/contact';

interface GoogleMapSectionProps {
  className?: string;
  showTitle?: boolean;
}

export const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({
  className = '',
  showTitle = true,
}) => {
  // Standard public Google Maps embed - does not require an API key
  const embedUrl = `https://maps.google.com/maps?q=Chinmaya+Vidyalaya+P-201+MIDC+Vidyanagar+Saravali+Boisar+401501&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const directMapUrl = `https://www.google.com/maps/search/?api=1&query=Chinmaya+Vidyalaya+Vidyanagar+Saravali+Boisar`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Chinmaya+Vidyalaya+Vidyanagar+Saravali+Boisar`;

  return (
    <div id="google-map-section" className={`bg-white border border-[#E7E2D8] rounded-3xl shadow-card overflow-hidden ${className}`}>
      {showTitle && (
        <div className="p-6 sm:p-8 border-b border-[#E7E2D8] bg-[#FAF8F5]/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DF711B] animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#DF711B]">
                Campus Location
              </span>
            </div>
            <h3 className="font-cinzel font-extrabold text-2xl sm:text-3xl text-[#0B1D30]">
              Google Maps & Campus Access
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Located in Vidyanagar, Saravali, Boisar — easily accessible via Western Railway and MIDC road networks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B1D30] hover:bg-[#DF711B] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              title="Get driving directions in Google Maps"
            >
              <Navigation className="w-4 h-4 text-[#DF711B]" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href={directMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E7E2D8] hover:border-[#DF711B] text-[#0B1D30] text-xs font-bold rounded-xl transition-colors shadow-sm"
              title="Open campus location in Google Maps"
            >
              <Compass className="w-4 h-4 text-[#DF711B]" />
              <span>Open in Maps</span>
            </a>
          </div>
        </div>
      )}

      {/* Map Display Viewport */}
      <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-slate-100">
        <iframe
          title="Chinmaya Vidyalaya Boisar Google Map Location"
          src={embedUrl}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Coordinates Tag */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-[#E7E2D8] px-3.5 py-1.5 rounded-xl shadow-md text-[11px] font-mono text-[#0B1D30] hidden sm:flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#DF711B]" />
          <span>{CONTACT_DETAILS.locationMap.lat}° N, {CONTACT_DETAILS.locationMap.lng}° E</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 truncate max-w-xs">{CONTACT_DETAILS.address}</span>
        </div>
      </div>

      {/* Transportation & Transit Details Footer */}
      <div className="p-6 sm:p-8 bg-[#FAF8F5] border-t border-[#E7E2D8] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-white border border-[#E7E2D8] flex items-center justify-center shrink-0 shadow-xs">
            <Train className="w-4 h-4 text-[#DF711B]" />
          </div>
          <div>
            <strong className="block font-bold text-[#0B1D30] mb-0.5">By Railway</strong>
            <p className="text-slate-600 leading-relaxed">
              Boisar Railway Station (Western Railway) is approx. 3.5 km from campus. Auto-rickshaws are readily available.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-white border border-[#E7E2D8] flex items-center justify-center shrink-0 shadow-xs">
            <Car className="w-4 h-4 text-[#DF711B]" />
          </div>
          <div>
            <strong className="block font-bold text-[#0B1D30] mb-0.5">By Road</strong>
            <p className="text-slate-600 leading-relaxed">
              Accessible via Palghar-Tarapur Road and Boisar MIDC link road. Landmark: P-201, Vidyanagar, Saravali.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-white border border-[#E7E2D8] flex items-center justify-center shrink-0 shadow-xs">
            <Clock className="w-4 h-4 text-[#DF711B]" />
          </div>
          <div>
            <strong className="block font-bold text-[#0B1D30] mb-0.5">Visiting Hours</strong>
            <p className="text-slate-600 leading-relaxed">
              School Office: Mon–Fri (8:30 AM – 3:30 PM), Sat (8:30 AM – 12:30 PM). Prior appointment recommended.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
