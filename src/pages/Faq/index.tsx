import React from 'react';
import { PageHero } from '../../components/common/PageHero';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { FaqSection } from '../../components/common/FaqSection';
import { Users, Award, ShieldCheck, HeartHandshake, Phone, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  return (
    <div className="bg-[#FCFBF7] text-[#181C20] pb-24">
      {/* Editorial Page Hero */}
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Comprehensive answers regarding admissions 2026-27, CBSE academic curriculum, the Chinmaya Vision Program, campus infrastructure, and official disclosures."
        badge="Official Knowledge Base"
      />
      
      <Breadcrumb items={[{ label: "FAQs & School Policies" }]} />

      {/* Institutional Highlights Bento (Double-Bezel Architecture) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="p-1 rounded-3xl bg-black/[0.03] border border-[#E7E2D8] shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-white p-6 rounded-[calc(1.5rem-0.25rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                  Batch Norms
                </span>
                <h3 className="font-cinzel font-bold text-lg text-[#0B1D30]">
                  Max 40 Students / Class
                </h3>
              </div>
              <p className="text-xs text-slate-600/90 leading-relaxed">
                Strict classroom cap ensuring individualized guidance, personalized care, and active student participation.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-1 rounded-3xl bg-black/[0.03] border border-[#E7E2D8] shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-white p-6 rounded-[calc(1.5rem-0.25rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                  Board Rigor
                </span>
                <h3 className="font-cinzel font-bold text-lg text-[#0B1D30]">
                  100% CBSE Class X Pass
                </h3>
              </div>
              <p className="text-xs text-slate-600/90 leading-relaxed">
                Consistent unbroken first-class performance and distinction in AISSE board examinations.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-1 rounded-3xl bg-black/[0.03] border border-[#E7E2D8] shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-white p-6 rounded-[calc(1.5rem-0.25rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                  Vedic Legacy
                </span>
                <h3 className="font-cinzel font-bold text-lg text-[#0B1D30]">
                  4 Pillars of CVP
                </h3>
              </div>
              <p className="text-xs text-slate-600/90 leading-relaxed">
                Integrated development, Indian cultural grounding, active patriotism, and universal compassion.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-1 rounded-3xl bg-black/[0.03] border border-[#E7E2D8] shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-white p-6 rounded-[calc(1.5rem-0.25rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#DF711B] uppercase tracking-wider block">
                  Statutory Trust
                </span>
                <h3 className="font-cinzel font-bold text-lg text-[#0B1D30]">
                  CBSE Affiliated 1130058
                </h3>
              </div>
              <p className="text-xs text-slate-600/90 leading-relaxed">
                Complete SARAS mandatory disclosures, safety compliance, and verified public certificates.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Primary FAQ Section Component */}
      <FaqSection
        title="School Inquiries & Policies"
        subtitle="Explore detailed responses organized by category or use the search bar above to locate specific policies."
      />

      {/* Quick Access Action Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Download Forms Callout */}
          <div className="p-1 rounded-3xl bg-black/[0.03] border border-[#E7E2D8]">
            <div className="bg-white p-8 rounded-[calc(1.5rem-0.25rem)] space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-widest block">
                  Admissions Documentation
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-[#0B1D30]">
                  Download Official Registration Forms
                </h3>
                <p className="text-sm text-slate-600/90 leading-relaxed">
                  Application forms for Nursery, Junior & Senior KG, and Classes I through IX are readily available in PDF format.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/downloads/admissions"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-[#0B1D30] hover:bg-[#DF711B] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <span>Access Admission Downloads</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Download className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Office Callout */}
          <div className="p-1 rounded-3xl bg-black/[0.03] border border-[#E7E2D8]">
            <div className="bg-white p-8 rounded-[calc(1.5rem-0.25rem)] space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#DF711B] uppercase tracking-widest block">
                  Campus Administration
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-[#0B1D30]">
                  Schedule a Campus Tour or Meeting
                </h3>
                <p className="text-sm text-slate-600/90 leading-relaxed">
                  Meet our faculty, explore our laboratories, library, and botanical grounds in Vidyanagar, Boisar / Tarapur.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-[#DF711B] hover:bg-[#C8652D] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Connect With Campus Office</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
