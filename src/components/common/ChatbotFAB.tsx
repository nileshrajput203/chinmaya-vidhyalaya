import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Phone, 
  RotateCcw, ExternalLink, Download 
} from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';
import { OFFICIAL_FAQS } from '../../data/faq';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionButtons?: Array<{
    label: string;
    url?: string;
    download?: boolean;
    isModalTrigger?: boolean;
    onClick?: () => void;
  }>;
}

const FAQ_KNOWLEDGE_BASE: Record<string, { answer: string; actions?: Array<{ label: string; url?: string; download?: boolean; isModalTrigger?: boolean }> }> = {
  'admission': {
    answer: "Admissions for Academic Session 2026-27 are currently OPEN for Nursery, Jr. KG, Sr. KG, and Classes I to XII (Science, Commerce, Arts).\n\nKey Steps:\n1. Download and fill out the official Admission Registration form.\n2. Submit along with Child's Birth Certificate, Aadhaar Card, 3 passport photos, and previous report card/TC.\n3. Visit the Administrative Campus Office for document verification.\n\nOffice Hours: Mon-Sat: 8:00 AM - 5:00 PM.",
    actions: [
      { label: 'Request Admission Callback', isModalTrigger: true },
      { label: 'Download Nursery Form (PDF)', url: '/images/nursery.pdf', download: true },
      { label: 'Admission Guidelines', url: '/admissions/guidelines' }
    ]
  },
  'fee': {
    answer: "Chinmaya Vidyalaya Tarapur follows a transparent, CBSE-regulated fee structure with term-wise installments:\n\n• Term 1 (June) & Term 2 (November) flexible installments.\n• Admission / Prospectus form fee: ₹500.\n• Tuition and development fees are structured according to Pre-Primary, Primary, Middle, and Secondary sections.\n• Detailed fee schedules for each standard can be collected directly from the school accounts desk or confirmed via phone.",
    actions: [
      { label: '🧮 Interactive Fee Estimator', url: '/admissions/guidelines' },
      { label: 'CBSE Mandatory Public Disclosures', url: '/about/mandatory-information' },
      { label: 'Call Accounts: 9322054713', url: 'tel:9322054713' }
    ]
  },
  'campus': {
    answer: "Chinmaya Vidyalaya Tarapur Campus & Timings Details:\n\n• Address: P-201 MIDC Area, Saravali, Boisar / Tarapur, District Palghar, Maharashtra - 401501.\n• School Timings:\n  - Jr. KG: 1:00 PM - 5:00 PM\n  - Senior KG: 8:00 AM - 12:30 PM\n  - Primary: 1:00 PM - 5:00 PM\n  - Secondary: 7:30 AM - 12:55 PM\n• Office Working Hours: Mon to Sat, 8:00 AM - 5:00 PM.\n• Campus Features: Modern Science (Physics, Chemistry, Biology) and Maths Laboratories, Scratch & Python, Sports Playground, Mallakhamb, Daily Yoga & Assemblies.",
    actions: [
      { label: 'Call Campus Office', url: 'tel:9322054713' },
      { label: 'View Facilities', url: '/about/infrastructure' },
      { label: 'Contact Details', url: '/contact' }
    ]
  },
  'forms': {
    answer: "You can download all official documents and application forms directly:\n\n• Nursery & Kindergarten Registration Form (PDF)\n• CBSE SARAS Mandatory Public Disclosures\n• Classes 9 to 12 CBSE Sample Papers (Commerce, Arts, Science)\n• Transfer Certificate (TC) Request Format\n\n📌 Important Note for Parents: For admission, parents have to fill the registration form and submit the hard copy in school to get the admission form and proceed with the further admission process.",
    actions: [
      { label: 'Nursery Admission Form (PDF)', url: '/images/nursery.pdf', download: true },
      { label: 'CBSE Sample Papers', url: '/downloads/sample-papers' },
      { label: 'Browse All Documents', url: '/downloads/documents' }
    ]
  },
  'curriculum': {
    answer: "Academic Framework & CBSE Scholastic Curriculum:\n\n• Affiliation: Central Board of Secondary Education (CBSE), New Delhi (Affiliation No. 1130058, School Code: 30040, U-DISE: 27361116004).\n• Academic Stages:\n  1. Foundational Stage (Nursery & KG): Play-way learning, phonics, joyful numeracy.\n  2. Primary Stage (Classes I to V): Activity-oriented discovery and bilingual reading.\n  3. Middle Stage (Classes VI to VIII): Specialized sciences, trilingual formula (English, Hindi, Sanskrit/Marathi) & coding.\n  4. Secondary Stage (Classes IX & X): NCERT/CBSE curriculum for AISSE board exams with consistent 100% first-class pass results.\n  5. Senior Secondary (Classes XI & XII): Science, Commerce, and Humanities/Arts streams.\n• Value Core: Chinmaya Vision Programme (CVP) with 4 Pillars.",
    actions: [
      { label: 'Explore Curriculum', url: '/academics/curriculum' },
      { label: 'Senior Streams (XI & XII)', url: '/academics/curriculum' },
      { label: 'CBSE Sample Papers', url: '/downloads/sample-papers' }
    ]
  },
  'contact': {
    answer: "Direct Contact Information:\n\n• Campus Front Desk: +91 9322054713\n• General Email: cv.info@chinmayamission.com\n• Principal Email: cv.principal@chinmayamission.com\n• Location: P-201 MIDC Area, Saravali, Boisar, Maharashtra 401501\n• Office Timings: Mon - Sat, 8:00 AM - 5:00 PM\n• School Timings:\n  - Jr. KG: 1:00 PM - 5:00 PM\n  - Senior KG: 8:00 AM - 12:30 PM\n  - Primary: 1:00 PM - 5:00 PM\n  - Secondary: 7:30 AM - 12:55 PM",
    actions: [
      { label: 'Call Now: 9322054713', url: 'tel:9322054713' },
      { label: 'Visit Contact Page', url: '/contact' }
    ]
  },
  'facilities': {
    answer: "World-Class Educational Infrastructure:\n\n• Advanced Science Laboratories (Physics, Chemistry, Biology) with individual workstations.\n• High-speed Computer & Technology Lab with Scratch and Python coding.\n• Dedicated Lift (Elevator) facility for teachers and children with special needs (CWSN).\n• Dedicated sports arena for athletics, volleyball, cricket, Mallakhamb, and indoor games.\n• Daily Yoga, fitness & meditation assemblies.",
    actions: [
      { label: 'View Facilities', url: '/about/infrastructure' },
      { label: 'Photo Gallery', url: '/gallery' }
    ]
  },
  'transport': {
    answer: "Transportation & Commute:\n\n• Dedicated school buses and authorized transport services operate across Boisar, Tarapur, MIDC, and nearby residential zones.\n• GPS tracking and female attendants on designated routes for complete child safety.\n• Contact the school administrative office during morning hours to check specific route stops and timings.",
    actions: [
      { label: 'Call Transport Helpdesk', url: 'tel:9322054713' }
    ]
  }
};

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'is', 'what', 'where', 'how', 'which', 'who', 
  'when', 'why', 'can', 'one', 'school', 'vidyalaya', 'tarapur', 'chinmaya', 
  'does', 'have', 'all', 'any', 'about', 'with', 'from', 'our'
]);

function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getBotResponse(userText: string): { 
  answer: string; 
  actions?: Array<{ label: string; url?: string; download?: boolean; isModalTrigger?: boolean }> 
} {
  const query = userText.toLowerCase().trim();

  // 1. Admission Guidance Desk Modal Request
  if (query.includes('guidance') || query.includes('call back') || query.includes('callback') || query.includes('counsellor') || query.includes('counselor') || query.includes('form modal')) {
    return {
      answer: "I can open our Admission Guidance Desk right now! You can submit your mobile number and child's standard for an immediate callback from our academic coordinator.",
      actions: [
        { label: 'Open Admission Guidance Form', isModalTrigger: true },
        { label: 'View Fee Calculator', url: '/admissions/guidelines' }
      ]
    };
  }

  // 2. Pure Greetings ("hi", "hello", "hey", "namaste", "hari om", "good morning", etc.)
  const pureGreetingRegex = /^(hi+|he+y+|hello+|namaste+|namaskar+|hari\s*om+|pranam+|good\s*(morning|afternoon|evening|day)|greetings+|hola+|yo)[\s!.,?]*$/i;
  if (pureGreetingRegex.test(query)) {
    const greeting = getTimeOfDayGreeting();
    return {
      answer: `Hari Om! 🙏 ${greeting}! Welcome to Chinmaya Vidyalaya Tarapur.\n\nI am your AI Campus Guide. I can help you with:\n• Admissions 2026-27 & Registration Process\n• Official School & Administrative Timings\n• Fee Structure & Term Installments\n• CBSE Sample Question Papers (Class 9–12)\n• Campus Facilities, Laboratories & Transport\n\nHow may I help you today? You can choose a quick topic below or type your question directly!`,
      actions: [
        { label: '📋 Admission Enquiry' },
        { label: '⏰ School Timings' },
        { label: '💰 Fee Structure' },
        { label: '📄 CBSE Sample Papers', url: '/downloads/sample-papers' },
        { label: '📞 Call Front Desk: 9322054713', url: 'tel:9322054713' }
      ]
    };
  }

  // 3. Conversational / Pleasantries: "How are you?"
  if (/^(how\s+are\s+you|how\s+r\s+u|how\s+do\s+you\s+do|how\s+is\s+it\s+going|how\s+are\s+things)/i.test(query)) {
    return {
      answer: "Hari Om! 🙏 I am doing wonderful, thank you for asking!\n\nI am always ready to help parents, students, and visitors with anything regarding Chinmaya Vidyalaya Tarapur. What information can I share with you today?",
      actions: [
        { label: '📋 Admission Enquiry' },
        { label: '⏰ School Timings' },
        { label: '💰 Fee Structure' },
        { label: '📞 Direct Contact', url: '/contact' }
      ]
    };
  }

  // 4. Conversational: "Who are you?" / "What can you do?" / "Help"
  if (/^(who\s+are\s+you|what\s+is\s+your\s+name|what\s+can\s+you\s+do|what\s+do\s+you\s+do|help|what\s+help|features)/i.test(query)) {
    return {
      answer: "I am the Chinmaya Vidyalaya Campus Assistant! 🏫\n\nI am available 24/7 to help you with:\n1. Admissions 2026-27: Age criteria, forms & registration procedure.\n2. School Timings: Jr. KG, Sr. KG, Primary, Secondary & Office hours.\n3. Fee Structure: Term installments & interactive fee calculator.\n4. Downloads: CBSE sample papers (Class 9–12), syllabus & certificates.\n5. Campus Life: Laboratories, sports, library, and transport services.\n\nWhat would you like to know?",
      actions: [
        { label: '📋 Admission Enquiry' },
        { label: '⏰ School Timings' },
        { label: '💰 Fee Structure' },
        { label: '📄 CBSE Sample Papers', url: '/downloads/sample-papers' }
      ]
    };
  }

  // 5. Conversational: "Thank you" / "Thanks"
  if (/^(thanks|thank\s+you|thank\s+u|dhanyawad|dhanyavad|shukriya|much\s+appreciated|thx)[\s!.,]*$/i.test(query) || query.includes('thank you') || query.includes('thanks a lot')) {
    return {
      answer: "You are most welcome! 🙏\n\nIt is our pleasure to assist you. If you have any further questions or plan to visit our campus, please feel free to drop by or reach out at +91 9322054713.\n\nHari Om and have a blessed, fruitful day ahead!",
      actions: [
        { label: '📞 Call School: 9322054713', url: 'tel:9322054713' },
        { label: 'Campus Facilities', url: '/about/infrastructure' },
        { label: 'Contact Page', url: '/contact' }
      ]
    };
  }

  // 6. Conversational: "Bye" / "Goodbye"
  if (/^(bye|goodbye|good\s*bye|see\s+you|cya|tata|good\s*night)[\s!.,]*$/i.test(query)) {
    return {
      answer: "Goodbye and Hari Om! 🙏\n\nThank you for connecting with Chinmaya Vidyalaya Tarapur. Wishing you and your family success, good health, and happiness!",
      actions: [
        { label: 'Visit Website Home', url: '/' },
        { label: 'Call Helpline', url: 'tel:9322054713' }
      ]
    };
  }

  // 7. Conversational: "Ok" / "Okay" / "Sure"
  if (/^(ok|okay|alright|got\s+it|fine|understood|sure)[\s!.,]*$/i.test(query)) {
    return {
      answer: "Great! Let me know if you need any other information. You can choose a topic below or ask any question anytime. Hari Om! 🙏",
      actions: [
        { label: '📋 Admission Enquiry' },
        { label: '⏰ School Timings' },
        { label: '💰 Fee Structure' },
        { label: '📞 Contact Us', url: '/contact' }
      ]
    };
  }

  // 8. Timings Specific Inquiry (Jr KG, Sr KG, Primary, Secondary, Office)
  if (
    query.includes('timing') || 
    query.includes('timings') || 
    query.includes('school time') || 
    query.includes('office time') || 
    query.includes('office hour') || 
    query.includes('when does school') || 
    query.includes('open time') || 
    query.includes('close time') ||
    query.includes('schedule') ||
    query.includes('working hour')
  ) {
    return {
      answer: "Official School & Office Timings:\n\n• Jr. KG: 1:00 PM – 5:00 PM\n• Senior KG: 8:00 AM – 12:30 PM\n• Primary (Classes I to V): 1:00 PM – 5:00 PM\n• Secondary (Classes VI to X): 7:30 AM – 12:55 PM\n• Administrative Office: Monday to Saturday, 8:00 AM – 5:00 PM.\n\nThe administrative front desk is available Monday through Saturday during office hours for admissions, fee queries, and general inquiries.",
      actions: [
        { label: 'Request Admission Callback', isModalTrigger: true },
        { label: 'Academic Calendar', url: '/admissions/calendar' },
        { label: 'Call Front Desk: 9322054713', url: 'tel:9322054713' }
      ]
    };
  }

  // 9. Age Criteria / Eligibility for Admission
  if (
    query.includes('age') || 
    query.includes('eligib') || 
    query.includes('criteria') || 
    query.includes('how old') || 
    query.includes('cut off') || 
    query.includes('cutoff')
  ) {
    return {
      answer: "Age Eligibility Norms (As of July 31st of the academic year):\n\n• Nursery: Minimum 3 Years\n• Junior KG: Minimum 4 Years\n• Senior KG: Minimum 5 Years\n• Class 1: Minimum 6 Years\n\n📌 Note for Parents: For admission, parents have to fill the registration form and submit the hard copy in school to get the admission form and proceed with the further admission process.",
      actions: [
        { label: 'Fill Registration Form', url: '/admissions/forms' },
        { label: 'Download Nursery Form (PDF)', url: '/images/nursery.pdf', download: true },
        { label: 'Admission Guidelines', url: '/admissions/guidelines' }
      ]
    };
  }

  // 10. CBSE Sample Question Papers (Class 9 to 12)
  if (
    query.includes('sample paper') || 
    query.includes('question paper') || 
    query.includes('past paper') || 
    query.includes('model paper') || 
    query.includes('board paper') || 
    query.includes('evaluation paper')
  ) {
    return {
      answer: "CBSE Sample Question Papers (Classes 9 to 12):\n\nAll official sample question papers are consolidated by class/stream into single merged PDFs for easy downloading:\n\n• Class 10 Board Papers: Full merged PDF (6.3 MB) with English, Hindi, Mathematics, Science & Social Science.\n• Class 12 Senior Secondary: Dedicated stream PDFs for Commerce (6.4 MB), Science (4.8 MB), and Arts (2.3 MB).\n• Classes 9 & 11: Coming soon for the upcoming session.\n\nYou can view and download all PDFs directly from our CBSE Sample Papers page.",
      actions: [
        { label: 'Download CBSE Sample Papers', url: '/downloads/sample-papers' },
        { label: 'Browse All Documents', url: '/downloads/documents' }
      ]
    };
  }

  // 11. Transfer Certificates & Mandatory Disclosures
  if (
    query.includes('transfer certificate') || 
    query.includes(' tc ') || 
    query.endsWith(' tc') || 
    query.startsWith('tc ') || 
    query === 'tc' ||
    query.includes('mandatory disclosure') || 
    query.includes('public disclosure') || 
    query.includes('disclosures') ||
    query.includes('saras') || 
    query.includes('building safety') || 
    query.includes('fire clearance') || 
    query.includes('drinking water certificate')
  ) {
    return {
      answer: "Under CBSE SARAS norms and school transparency guidelines, all Mandatory Public Disclosures as well as official Transfer Certificates (TC 2020, 2021, and 2023 records) are available online:\n\n• Certificates: Society Registration, RTE Recognition, Fire Clearance, Building Safety, Sanitation & Safe Drinking Water.\n• Transfer Certificates (TC): Public serial logs for 2020, 2021, and 2023.",
      actions: [
        { label: 'View Mandatory Disclosures', url: '/about/mandatory-information' },
        { label: 'Transfer Certificates (TC)', url: '/downloads/transfer-certificates' }
      ]
    };
  }

  // 12. CBSE & Curriculum / Academics / Syllabi / Subjects / Stages / Streams
  if (
    query.includes('curriculum') || 
    query.includes('syllabus') || 
    query.includes('syllabi') || 
    query.includes('academic') || 
    query.includes('stream') || 
    query.includes('subject') || 
    query.includes('course') || 
    query.includes('class 10') || 
    query.includes('class 12') || 
    query.includes('std 10') || 
    query.includes('std 12') ||
    query.includes('board exam') ||
    query.includes('pedagogy') ||
    query.includes('cbse')
  ) {
    return FAQ_KNOWLEDGE_BASE['curriculum'];
  }

  // 13. Admission Enquiry & Application
  if (
    query.includes('admiss') || 
    query.includes('apply') || 
    query.includes('seat') || 
    query.includes('join') || 
    query.includes('nursery') || 
    query.includes('std 1') || 
    query.includes('class 1') || 
    query.includes('enquiry') || 
    query.includes('register') || 
    query.includes('registration')
  ) {
    return FAQ_KNOWLEDGE_BASE['admission'];
  }

  // 14. Fee Structure & Calculator
  if (
    query.includes('fee') || 
    query.includes('cost') || 
    query.includes('charge') || 
    query.includes('payment') || 
    query.includes('installment') || 
    query.includes('calculator') ||
    query.includes('tuition')
  ) {
    return FAQ_KNOWLEDGE_BASE['fee'];
  }

  // 15. Download Forms & Documents
  if (
    query.includes('form') || 
    query.includes('download') || 
    query.includes('paper') || 
    query.includes('sample') || 
    query.includes('pdf') || 
    query.includes('question') ||
    query.includes('evaluation')
  ) {
    return FAQ_KNOWLEDGE_BASE['forms'];
  }

  // 16. Campus & Location / Address
  if (
    query.includes('campus') || 
    query.includes('where') || 
    query.includes('location') || 
    query.includes('address') || 
    query.includes('visit') ||
    query.includes('reach') ||
    query.includes('map') ||
    query.includes('direction')
  ) {
    return FAQ_KNOWLEDGE_BASE['campus'];
  }

  // 17. Contact & Helplines
  if (
    query.includes('contact') || 
    query.includes('phone') || 
    query.includes('call') || 
    query.includes('email') || 
    query.includes('number') || 
    query.includes('principal') || 
    query.includes('office') ||
    query.includes('front desk') ||
    query.includes('helpline')
  ) {
    return FAQ_KNOWLEDGE_BASE['contact'];
  }

  // 18. Facilities & Labs & Sports & Lift
  if (
    query.includes('facility') || 
    query.includes('facilities') || 
    query.includes('lab') || 
    query.includes('library') || 
    query.includes('sport') || 
    query.includes('ground') || 
    query.includes('yoga') ||
    query.includes('lift') ||
    query.includes('elevator') ||
    query.includes('cwsn') ||
    query.includes('mallakhamb')
  ) {
    return FAQ_KNOWLEDGE_BASE['facilities'];
  }

  // 19. Bus & Transportation
  if (
    query.includes('bus') || 
    query.includes('transport') || 
    query.includes('van') || 
    query.includes('commute') || 
    query.includes('pick') ||
    query.includes('route')
  ) {
    return FAQ_KNOWLEDGE_BASE['transport'];
  }

  // 20. 4 Pillars / CVP / Philosophy / Spiritual
  if (
    query.includes('pillar') || 
    query.includes('cvp') || 
    query.includes('philosophy') || 
    query.includes('vision programme') || 
    query.includes('gurudev') || 
    query.includes('spiritual') || 
    query.includes('pooja') || 
    query.includes('bhajan') || 
    query.includes('gita chanting') ||
    query.includes('kargil') ||
    query.includes('maharashtra divas') ||
    query.includes('nasha mukt') ||
    query.includes('council')
  ) {
    return {
      answer: "The Chinmaya Vision Programme (CVP) integrates 4 Core Pillars:\n\n1. Integrated Development: Physical fitness through yoga, mental development via Bhagavad Gita chanting, intellectual development with AI & Coding, and spiritual grounding.\n2. Indian Culture & Heritage: Vedic values, daily Guru Paduka Pooja, Gita chanting, and festival celebrations.\n3. Patriotism: Student Council Elections, Kargil Vijay Diwas tributes, Maharashtra Divas, Nasha Mukt Bharat Abhiyaan campaigns, and civic service.\n4. Universal Outlook: Vasudhaiva Kutumbakam - the world as one family.",
      actions: [
        { label: 'Explore 4 Pillars', url: '/features/four-pillars' },
        { label: 'Our Philosophy (CVP)', url: '/about/philosophy' }
      ]
    };
  }

  // 21. Score against OFFICIAL_FAQS for other questions
  const tokens = query.split(/\s+/).filter(t => t.length > 2 && !STOP_WORDS.has(t));
  let bestFaqMatch: { faq: typeof OFFICIAL_FAQS[0]; score: number } | null = null;
  
  if (tokens.length > 0) {
    for (const faq of OFFICIAL_FAQS) {
      const qLower = faq.question.toLowerCase();
      const aLower = faq.answer.toLowerCase();
      let score = 0;

      for (const token of tokens) {
        if (qLower.includes(token)) score += 3;
        if (aLower.includes(token)) score += 1;
      }

      if (score > 0 && (!bestFaqMatch || score > bestFaqMatch.score)) {
        bestFaqMatch = { faq, score };
      }
    }
  }

  // If high-confidence FAQ match found
  if (bestFaqMatch && bestFaqMatch.score >= 3) {
    const matchedFaq = bestFaqMatch.faq;
    const actions: Array<{ label: string; url?: string; download?: boolean; isModalTrigger?: boolean }> = [];
    
    if (matchedFaq.category === 'admissions') {
      actions.push({ label: 'Request Admission Callback', isModalTrigger: true });
      actions.push({ label: 'Download Nursery Form (PDF)', url: '/images/nursery.pdf', download: true });
    } else if (matchedFaq.category === 'disclosures') {
      actions.push({ label: 'View Mandatory Disclosures', url: '/about/mandatory-information' });
    } else if (matchedFaq.category === 'cvp') {
      actions.push({ label: 'Explore 4 Pillars', url: '/features/four-pillars' });
    } else {
      actions.push({ label: 'Explore Curriculum', url: '/academics/curriculum' });
    }

    return {
      answer: `${matchedFaq.question}\n\n${matchedFaq.answer}`,
      actions
    };
  }

  // Default intelligent fallback
  return {
    answer: "Thank you for reaching out! Chinmaya Vidyalaya Tarapur is here to help.\n\n• Admissions 2026-27: Open for Nursery through Class XII (Science, Commerce, Arts).\n• School Timings:\n  - Jr. KG: 1:00 PM – 5:00 PM\n  - Senior KG: 8:00 AM – 12:30 PM\n  - Primary: 1:00 PM – 5:00 PM\n  - Secondary: 7:30 AM – 12:55 PM\n• Office Timings: Mon-Sat, 8:00 AM – 5:00 PM.\n• Call our helpline directly at +91 9322054713 or choose an option below.",
    actions: [
      { label: 'Request Admission Callback', isModalTrigger: true },
      { label: '⏰ School Timings' },
      { label: '💰 Fee Estimator', url: '/admissions/guidelines' },
      { label: '📄 CBSE Sample Papers', url: '/downloads/sample-papers' }
    ]
  };
}

export const ChatbotFAB: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Ensure Lenis resumes when chat panel is closed or unmounted
  useEffect(() => {
    return () => {
      (window as any).__lenis?.start();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      (window as any).__lenis?.start();
    }
  }, [isOpen]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Hari Om! 🙏 Welcome to Chinmaya Vidyalaya Tarapur Helpdesk.\n\nI can assist you with Admissions 2026-27, official school & office timings, fee structure, CBSE sample question papers, and campus facilities. How may I help you today?",
      time: 'Just now',
      actionButtons: [
        { label: '📋 Admission Enquiry' },
        { label: '⏰ School Timings' },
        { label: '💰 Fee Structure' },
        { label: '📄 CBSE Sample Papers', url: '/downloads/sample-papers' },
        { label: '🏫 Campus & Facilities', url: '/about/infrastructure' },
        { label: '📞 Direct Contact', url: '/contact' }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMessageId,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulate smart, instant response in the chat
    setTimeout(() => {
      const response = getBotResponse(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButtons: response.actions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: "Hari Om! 🙏 Chat refreshed. How can I help you today? Select a topic below or type any question.",
        time: 'Just now',
        actionButtons: [
          { label: '📋 Admission Enquiry' },
          { label: '⏰ School Timings' },
          { label: '💰 Fee Structure' },
          { label: '📄 CBSE Sample Papers', url: '/downloads/sample-papers' },
          { label: '🏫 Campus & Facilities', url: '/about/infrastructure' },
          { label: '📞 Direct Contact', url: '/contact' }
        ]
      }
    ]);
  };

  return (
    <div className="fixed bottom-[74px] sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end gap-2.5 sm:gap-3 font-sans">
      
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            data-lenis-prevent="true"
            onMouseEnter={() => {
              (window as any).__lenis?.stop();
            }}
            onMouseLeave={() => {
              (window as any).__lenis?.start();
            }}
            onWheel={(e) => {
              e.stopPropagation();
              if (chatBodyRef.current && !chatBodyRef.current.contains(e.target as Node)) {
                chatBodyRef.current.scrollTop += e.deltaY;
              }
            }}
            className="w-[calc(100vw-24px)] sm:w-[380px] max-w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col overscroll-contain"
            style={{ maxHeight: 'min(580px, calc(100vh - 160px))', overscrollBehavior: 'contain' }}
          >
            {/* Chat Header */}
            <div className="bg-[#0B1D30] text-white px-4 sm:px-5 py-3.5 flex items-center justify-between border-b border-[#182C44] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#DF711B] shadow-sm bg-white shrink-0">
                    <img
                      src="/images/bot-avatar.png"
                      alt="Chinmaya Assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0B1D30]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-black text-sm tracking-wide leading-tight text-white">
                      Chinmaya Assistant
                    </h3>
                  </div>
                  <p className="text-[10px] font-mono text-[#DF711B] tracking-wider uppercase m-0">
                    Online • AI Campus Guide
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                  aria-label="Reset chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div 
              ref={chatBodyRef}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 p-4 space-y-3.5 overflow-y-auto bg-[#F7F3EB]/60 scrollbar-thin overscroll-contain"
              style={{ overscrollBehavior: 'contain' }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[92%]">
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-1 border border-[#DF711B]/40 shadow-xs bg-[#0B1D30]">
                        <img
                          src="/images/bot-avatar.png"
                          alt="Bot Assistant"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#DF711B] text-white rounded-br-xs shadow-xs font-medium'
                          : 'bg-white text-[#181C20] rounded-bl-xs border border-[#E7E2D8] shadow-xs'
                      }`}
                    >
                      <p className="whitespace-pre-line m-0 font-normal">{msg.text}</p>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono text-[#888888] mt-1 px-1">
                    {msg.time}
                  </span>

                  {/* Action Buttons inside message (if bot) */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div className="mt-2 pl-8 flex flex-wrap gap-1.5 max-w-full">
                      {msg.actionButtons.map((btn, idx) => {
                        if ((btn as any).isModalTrigger) {
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('open-admission-modal'));
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#DF711B] to-[#FF8C38] hover:from-[#C86012] hover:to-[#DF711B] text-white border border-[#DF711B] rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer text-left"
                            >
                              <span>{btn.label}</span>
                            </button>
                          );
                        }

                        if (btn.url) {
                          const isExternal = btn.url.startsWith('http') || btn.url.startsWith('tel:') || btn.url.startsWith('mailto:');
                          const isDownloadable = Boolean(btn.download) || btn.url.endsWith('.pdf');

                          if (isExternal || isDownloadable) {
                            return (
                              <a
                                key={idx}
                                href={btn.url}
                                download={btn.download}
                                target={isExternal || isDownloadable ? '_blank' : undefined}
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-[#DF711B] text-[#181818] hover:text-white border border-[#D5CEC2] rounded-lg text-[11px] font-medium transition-all shadow-2xs"
                              >
                                {btn.download ? <Download className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                                <span>{btn.label}</span>
                              </a>
                            );
                          }

                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                navigate(btn.url!);
                                if (window.innerWidth < 640) {
                                  setIsOpen(false);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-[#DF711B] text-[#181818] hover:text-white border border-[#D5CEC2] rounded-lg text-[11px] font-medium transition-all shadow-2xs cursor-pointer text-left"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>{btn.label}</span>
                            </button>
                          );
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(btn.label)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-[#DF711B] text-[#181818] hover:text-white border border-[#D5CEC2] rounded-lg text-[11px] font-medium transition-all shadow-2xs cursor-pointer text-left"
                          >
                            <span>{btn.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#666666]">
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#DF711B]/40 shadow-xs bg-[#0B1D30]">
                    <img
                      src="/images/bot-avatar.png"
                      alt="Bot Assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white px-3 py-2 rounded-2xl rounded-bl-xs border border-[#E7E2D8] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DF711B] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DF711B] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DF711B] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Strip */}
            <div className="bg-slate-50 border-t border-slate-200 px-3 py-2 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0">
              <span className="text-[10px] font-mono text-[#888888] shrink-0 uppercase tracking-wider font-bold">Quick:</span>
              <button
                onClick={() => handleSendMessage('Admission enquiry')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-slate-200 rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Admission
              </button>
              <button
                onClick={() => handleSendMessage('School timings')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-slate-200 rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Timings
              </button>
              <button
                onClick={() => handleSendMessage('Fee structure')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-slate-200 rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Fee Info
              </button>
              <button
                onClick={() => handleSendMessage('CBSE sample papers')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-slate-200 rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Sample Papers
              </button>
              <button
                onClick={() => handleSendMessage('Contact front desk')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-slate-200 rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Helpline
              </button>
            </div>

            {/* In-Chat Input Form (Never redirects) */}
            <div className="p-3 border-t border-slate-200 bg-white shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask any question..."
                  className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#181C20] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DF711B]/40 focus:border-[#DF711B] transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 bg-[#DF711B] hover:bg-[#C45B0E] disabled:opacity-40 disabled:hover:bg-[#DF711B] text-white rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[10px] text-[#777777] font-mono mt-2 px-1">
                <span>Direct in-chat answers</span>
                <a
                  href={`tel:${OFFICIAL_SCHOOL_INFO.contact.phone[0]}`}
                  className="text-[#DF711B] hover:underline font-bold flex items-center gap-1"
                >
                  <Phone className="w-2.5 h-2.5" />
                  <span>Call: 9322054713</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center transition-colors duration-300 ${
          isOpen
            ? 'bg-[#0B1D30] shadow-lg'
            : 'bg-[#DF711B] hover:bg-[#C45B0E] shadow-xl chatbot-breathe'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Online Pulse Indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Hover Tooltip (When Closed) */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="absolute bottom-2 right-[72px] bg-[#0B1D30] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none hidden sm:block border border-white/10"
        >
          Ask questions here
          <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-[#0B1D30] rotate-45 -translate-y-1/2" />
        </motion.div>
      )}
    </div>
  );
};

