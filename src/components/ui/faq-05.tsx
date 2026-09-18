// FAQ 5 from Hirael <https://hirael.com/blocks/faqs/faq-05>
// Adapted for Chinmaya Vidyalaya Tarapur with school knowledgebase & scrollable container

"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OFFICIAL_FAQS } from "@/data/faq";
import { ArrowRight, HelpCircle } from "lucide-react";

export interface FaqItemLike {
  id: string;
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
  category?: string;
}

interface Faq05Props {
  items?: readonly FaqItemLike[];
  title?: string;
  badge?: string;
  description?: string;
  defaultValue?: string;
}

const Faq05: React.FC<Faq05Props> = ({
  items = OFFICIAL_FAQS as readonly FaqItemLike[],
  title = "QUESTIONS, ANSWERED.",
  badge = "GUIDANCE & POLICIES",
  description = "Essential information regarding admissions 2026-27, CBSE curriculum, Chinmaya Vision Programme, and campus governance.",
  defaultValue = "faq-1",
}) => {
  return (
    <section data-slot="faq" className="bg-[#FAF8F5] py-14 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 border border-[#E7E2D8] bg-white shadow-sm md:grid-cols-12">
        
        {/* Left column: Intro */}
        <div
          data-slot="faq-intro"
          className="flex flex-col justify-between gap-6 border-b border-[#E7E2D8] p-6 sm:p-8 md:border-b-0 md:border-r md:p-10 md:col-span-5 bg-[#FAF8F5]/60"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF3E8] border border-[#E7E2D8] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#DF711B] font-bold">
              <HelpCircle className="w-3.5 h-3.5 text-[#DF711B]" />
              <span>{badge}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#181818] uppercase tracking-tight leading-[1.05] m-0">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-[#555555] font-sans leading-relaxed m-0">
              {description}
            </p>

            {/* Thinking Student Cutout */}
            <div className="flex justify-center pt-2">
              <img 
                src="/images/faq-student-thinking.png" 
                alt="Student thinking about questions" 
                className="w-28 sm:w-36 md:w-40 h-auto object-contain drop-shadow-md"
                draggable={false}
              />
            </div>

          </div>

          <div className="pt-2 border-t border-[#E7E2D8]/80 flex flex-col gap-2">
            <p className="text-xs text-[#777777] font-mono uppercase tracking-wider m-0">
              Need direct assistance?
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/faq"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#DF711B] hover:text-[#C45B0E] uppercase tracking-wider transition-colors"
              >
                <span>View Full Knowledge Base</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[#D5CEC2]">•</span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#181818] hover:text-[#DF711B] uppercase tracking-wider transition-colors"
              >
                <span>Contact Office</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right column: Scrollable Accordion List */}
        <div
          data-slot="faq-list"
          className="flex flex-col justify-start p-6 sm:p-8 md:col-span-7 bg-white"
        >
          <div 
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="max-h-[460px] md:max-h-[520px] overflow-y-auto overscroll-contain pr-3 sm:pr-4 space-y-1 scrollbar-thin scrollbar-thumb-[#DF711B]/30 hover:scrollbar-thumb-[#DF711B]/60 scrollbar-track-transparent"
          >
            <Accordion type="single" collapsible defaultValue={defaultValue} className="w-full">
              {items.map((item) => {
                const questionText = item.question || item.q || '';
                const answerText = item.answer || item.a || '';

                return (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="border-b border-[#E7E2D8] py-1 transition-colors"
                  >
                    <AccordionTrigger className="font-sans font-bold text-sm sm:text-[15px] text-[#181818] hover:text-[#DF711B] transition-colors leading-snug tracking-tight text-left py-3.5 hover:no-underline [&[data-state=open]>svg]:text-[#DF711B]">
                      {questionText}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-xs sm:text-[13px] text-[#555555] leading-relaxed pt-1 pb-4">
                      {answerText}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>

      </div>
    </section>
  );
};

export { Faq05 };
export default Faq05;
