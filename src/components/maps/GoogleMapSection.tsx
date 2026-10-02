import React from 'react';
import { MapPin, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';
import { CONTACT_DETAILS } from '../../data/contact';

interface GoogleMapSectionProps {
  className?: string;
  showTitle?: boolean;
}

export const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({
  className = '',
}) => {
  const embedUrl =
    'https://maps.google.com/maps?q=Chinmaya+Vidyalaya+Tarapur,+Boisar&t=&z=16&ie=UTF8&iwloc=B&output=embed';
  const directMapUrl =
    'https://www.google.com/maps/search/?api=1&query=Chinmaya+Vidyalaya+Tarapur+Boisar';
  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Chinmaya+Vidyalaya+Tarapur+Boisar';

  return (
    <div
      id="google-map-section"
      className={`w-full bg-[#0B1E34] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#1b3452] ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left Column: Institutional Information & Contacts */}
        <div className="lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-between space-y-6">
          {/* Header Title */}
          <div className="space-y-1 border-b border-white/10 pb-5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#DF711B] font-bold">
              Saravali • Boisar Campus
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Campus Location & Access
            </h3>
            <p className="text-xs text-slate-300 font-sans">
              CBSE Affiliation No. {CONTACT_DETAILS.affiliationNo} • School Code: {CONTACT_DETAILS.schoolCode}
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-5">
            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#DF711B]/15 border border-[#DF711B]/25 text-[#DF711B] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#DF711B]" />
              </div>
              <div className="space-y-1">
                <div className="font-sans font-bold text-xs uppercase tracking-wider text-[#DF711B]">
                  Address
                </div>
                <p className="font-sans text-sm text-slate-200 leading-relaxed font-normal">
                  <strong className="text-white font-semibold block">{CONTACT_DETAILS.schoolName}</strong>
                  {CONTACT_DETAILS.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#DF711B]/15 border border-[#DF711B]/25 text-[#DF711B] flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-[#DF711B]" />
              </div>
              <div className="space-y-1.5">
                <div className="font-sans font-bold text-xs uppercase tracking-wider text-[#DF711B]">
                  Phone
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${CONTACT_DETAILS.phones[0].number}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#DF711B]/20 border border-white/10 hover:border-[#DF711B]/40 text-white hover:text-[#DF711B] text-xs font-mono font-medium transition-all"
                  >
                    +91 {CONTACT_DETAILS.phones[0].number}
                  </a>
                  <a
                    href={`tel:${CONTACT_DETAILS.principal.phone}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#DF711B]/20 border border-white/10 hover:border-[#DF711B]/40 text-white hover:text-[#DF711B] text-xs font-mono font-medium transition-all"
                  >
                    +91 {CONTACT_DETAILS.principal.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#DF711B]/15 border border-[#DF711B]/25 text-[#DF711B] flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-4 h-4 text-[#DF711B]" />
              </div>
              <div className="space-y-1">
                <div className="font-sans font-bold text-xs uppercase tracking-wider text-[#DF711B]">
                  Email Address
                </div>
                <a
                  href={`mailto:${CONTACT_DETAILS.emails[1].email}`}
                  className="font-sans text-sm text-slate-200 hover:text-[#DF711B] transition-colors block font-medium"
                >
                  {CONTACT_DETAILS.emails[1].email}
                </a>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DF711B] hover:bg-[#c96213] text-white font-sans text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-white" />
              <span>Get Directions</span>
            </a>

            <a
              href={directMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#DF711B]/40 text-slate-200 hover:text-[#DF711B] font-sans text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#DF711B]" />
            </a>
          </div>
        </div>

        {/* Right Column: Google Map Embedded Viewport */}
        <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[440px] lg:min-h-full bg-slate-900 border-t lg:border-t-0 lg:border-l border-white/10">
          <iframe
            title="Chinmaya Vidyalaya Tarapur Boisar Campus Location"
            src={embedUrl}
            className="w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleMapSection;
