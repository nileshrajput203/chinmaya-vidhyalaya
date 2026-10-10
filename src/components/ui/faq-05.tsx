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
import { ArrowRight } from "lucide-react";

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
  description = "Essential information regarding admissions 2026-27, CBSE curriculum, Chinmaya Vision Programme, and campus governance.",
  defaultValue = "faq-1",
}) => {
  return (
    <section data-slot="faq" className="bg-white py-14 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 border border-slate-200 bg-white shadow-sm md:grid-cols-12">
        
        {/* Left column: Intro */}
        <div
          data-slot="faq-intro"
          className="flex flex-col justify-between gap-6 border-b border-slate-200 p-6 sm:p-8 md:border-b-0 md:border-r md:p-10 md:col-span-5 bg-white"
        >
          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#181818] uppercase tracking-tight leading-[1.05] m-0">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-[#555555] font-sans leading-relaxed m-0">
              {description}
            </p>
          </div>

          {/* Thinking Student Cutout - Prominent, balanced size */}
          <div className="flex-1 flex justify-center items-center py-4 my-auto">
            <img 
              src="/images/faq-student-thinking.png" 
              alt="Student thinking about questions" 
              className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 max-w-full max-h-[360px] h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300 select-none"
              draggable={false}
            />
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
            className="pr-3 sm:pr-4 space-y-1"
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
