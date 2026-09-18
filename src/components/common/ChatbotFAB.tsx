import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Phone, 
  RotateCcw, ExternalLink, Download, Sparkles 
} from 'lucide-react';
import { OFFICIAL_SCHOOL_INFO } from '../../data/school';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionButtons?: Array<{
    label: string;
    url?: string;
    download?: boolean;
    onClick?: () => void;
  }>;
}

const FAQ_KNOWLEDGE_BASE: Record<string, { answer: string; actions?: Array<{ label: string; url?: string; download?: boolean }> }> = {
  'admission': {
    answer: "Admissions for Academic Session 2026-27 are currently OPEN for Nursery, Jr. KG, Sr. KG, and Classes I to IX.\n\nKey Steps:\n1. Download and fill out the official Admission Registration form.\n2. Submit along with Child's Birth Certificate, Aadhaar Card, 3 passport photos, and previous report card/TC.\n3. Visit the Administrative Campus Office for document verification.\n\nOffice Hours: Mon–Sat: 8:30 AM – 3:30 PM.",
    actions: [
      { label: 'Download Nursery Form (PDF)', url: '/images/nursery.pdf', download: true },
      { label: 'Standard 1-10 Papers', url: '/downloads/sample-papers' }
    ]
  },
  'fee': {
    answer: "Chinmaya Vidyalaya Tarapur follows a transparent, CBSE-regulated fee structure:\n\n• Term-wise / quarterly flexible payment installments.\n• Admission / Prospectus form fee: ₹500.\n• Tuition and development fees are structured according to Pre-Primary, Primary, Middle, and Secondary sections.\n• Detailed fee schedules for each standard can be collected directly from the school accounts desk or confirmed via phone.",
    actions: [
      { label: 'Call Accounts: 9322054713', url: 'tel:9322054713' },
      { label: 'Contact Office', url: '/contact' }
    ]
  },
  'campus': {
    answer: "Chinmaya Vidyalaya Tarapur Campus Details:\n\n• Address: P-201 MIDC Area, Saravali, Boisar / Tarapur, District Palghar, Maharashtra - 401501.\n• Campus Features: Modern STEM Laboratories (Physics, Chemistry, Biology), Robotics, Central Digital Library, Sports Playground, Daily Yoga & Meditation Courtyard.\n• School Timings:\n  - Pre-Primary: 8:30 AM – 12:30 PM\n  - Primary & Secondary: 7:45 AM – 2:00 PM\n• Office Visiting Hours: Mon to Sat, 8:30 AM – 3:30 PM.",
    actions: [
      { label: 'Call Campus Office', url: 'tel:9322054713' },
      { label: 'View Contact Page', url: '/contact' }
    ]
  },
  'forms': {
    answer: "You can download all official documents and application forms directly:\n\n• Nursery & Kindergarten Admission Form (PDF)\n• CBSE SARAS Mandatory Public Disclosures\n• Classes I to V Evaluation III Question Papers\n• Classes VI to X CBSE Sample Papers & Revision Modules\n• Transfer Certificate (TC) Request Format",
    actions: [
      { label: 'Nursery Admission Form (PDF)', url: '/images/nursery.pdf', download: true },
      { label: 'Browse All Documents', url: '/downloads/documents' },
      { label: 'Mandatory Disclosures', url: '/about/mandatory-information' }
    ]
  },
  'curriculum': {
    answer: "Academic Excellence & Pedagogy:\n\n• Affiliation: Central Board of Secondary Education (CBSE), New Delhi (Affiliation No. 1130058, School Code: 30040).\n• Chinmaya Vision Programme (CVP):\n  1. Integrated Development (Sharirik, Bauddhik & Manasik Vikas)\n  2. Indian Culture & Heritage (Bhartiya Sanskriti)\n  3. Patriotism & Civic Responsibility (Rashtra Prem)\n  4. Universal Outlook (Vasudhaiva Kutumbakam)\n• High academic record with 100% first-class pass results in CBSE Class X Board examinations.",
    actions: [
      { label: 'Explore Curriculum', url: '/academics/curriculum' },
      { label: 'Our Philosophy (CVP)', url: '/about/philosophy' }
    ]
  },
  'contact': {
    answer: "Direct Contact Information:\n\n• Campus Front Desk: +91 9322054713 / +91 9823517700\n• Principal Desk: +91 7775872266\n• General Email: cvtarapur@chinmayamission.com\n• Principal Email: cv.principal@chinmayamission.com\n• Location: P-201 MIDC Area, Saravali, Boisar, Maharashtra 401501\n• Office Timings: Mon – Sat, 8:30 AM – 3:30 PM",
    actions: [
      { label: 'Call Now: 9322054713', url: 'tel:9322054713' },
      { label: 'Visit Contact Page', url: '/contact' }
    ]
  },
  'facilities': {
    answer: "World-Class Educational Infrastructure:\n\n• Advanced Science Laboratories (Physics, Chemistry, Biology) with individual workstations.\n• High-speed Computer & Technology Lab with robotics kits.\n• Central Research Library with thousands of reference books, encyclopedias, and periodicals.\n• Dedicated sports arena for athletics, basketball, volleyball, cricket, and indoor games.\n• Daily Yoga, Pranayama & Surya Namaskar assemblies.",
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

function getBotResponse(userText: string): { answer: string; actions?: Array<{ label: string; url?: string; download?: boolean }> } {
  const query = userText.toLowerCase();

  if (query.includes('fee') || query.includes('cost') || query.includes('charge') || query.includes('payment') || query.includes('installment')) {
    return FAQ_KNOWLEDGE_BASE['fee'];
  }
  if (query.includes('admiss') || query.includes('apply') || query.includes('seat') || query.includes('join') || query.includes('nursery') || query.includes('std 1') || query.includes('class 1')) {
    return FAQ_KNOWLEDGE_BASE['admission'];
  }
  if (query.includes('form') || query.includes('download') || query.includes('paper') || query.includes('pdf') || query.includes('sample') || query.includes('tc') || query.includes('certificate')) {
    return FAQ_KNOWLEDGE_BASE['forms'];
  }
  if (query.includes('campus') || query.includes('timing') || query.includes('hour') || query.includes('where') || query.includes('location') || query.includes('address') || query.includes('visit')) {
    return FAQ_KNOWLEDGE_BASE['campus'];
  }
  if (query.includes('cbse') || query.includes('curriculum') || query.includes('cvp') || query.includes('syllabus') || query.includes('board') || query.includes('study') || query.includes('subject')) {
    return FAQ_KNOWLEDGE_BASE['curriculum'];
  }
  if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('email') || query.includes('number') || query.includes('principal') || query.includes('office')) {
    return FAQ_KNOWLEDGE_BASE['contact'];
  }
  if (query.includes('facility') || query.includes('lab') || query.includes('library') || query.includes('sport') || query.includes('ground') || query.includes('yoga')) {
    return FAQ_KNOWLEDGE_BASE['facilities'];
  }
  if (query.includes('bus') || query.includes('transport') || query.includes('van') || query.includes('commute') || query.includes('pick')) {
    return FAQ_KNOWLEDGE_BASE['transport'];
  }

  // Default intelligent fallback
  return {
    answer: "Thank you for reaching out! Chinmaya Vidyalaya Tarapur is here to help.\n\n• For Admissions (Nursery to Class IX): Session 2026-27 is open.\n• For Fees & Receipts: Term-wise payment schedule available.\n• For Campus Timings: Mon–Sat 8:30 AM to 3:30 PM.\n• Call our helpline directly at +91 9322054713 for instant personal guidance.",
    actions: [
      { label: 'Admission Enquiry', url: '/admissions' },
      { label: 'Download Forms', url: '/downloads/documents' },
      { label: 'Call Office: 9322054713', url: 'tel:9322054713' }
    ]
  };
}

export const ChatbotFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Namaste! 🙏 Welcome to Chinmaya Vidyalaya Tarapur Helpdesk.\n\nI can answer questions about admissions, fees, downloadable forms, campus timings, and academics right here. What would you like to know?",
      time: 'Just now',
      actionButtons: [
        { label: '📋 Admission Enquiry' },
        { label: '💰 Fee Structure' },
        { label: '📄 Download Forms' },
        { label: '🏫 Campus & Timings' },
        { label: '📚 CBSE & Curriculum' },
        { label: '📞 Direct Contact' }
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
        text: "Namaste! 🙏 Chat refreshed. How can I help you today? Select a topic below or type any question.",
        time: 'Just now',
        actionButtons: [
          { label: '📋 Admission Enquiry' },
          { label: '💰 Fee Structure' },
          { label: '📄 Download Forms' },
          { label: '🏫 Campus & Timings' },
          { label: '📚 CBSE & Curriculum' },
          { label: '📞 Direct Contact' }
        ]
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="w-[92vw] sm:w-[380px] max-w-[420px] bg-[#FCFBF7] rounded-2xl shadow-2xl border border-[#D5CEC2] overflow-hidden flex flex-col"
            style={{ maxHeight: 'min(580px, 85vh)' }}
          >
            {/* Chat Header */}
            <div className="bg-[#0B1D30] text-white px-4 sm:px-5 py-3.5 flex items-center justify-between border-b border-[#182C44] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/15 shrink-0">
                  <img
                    src="/images/Chinmaya_Logo.webp"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-black text-sm tracking-wide leading-tight text-white">
                      Chinmaya Vidyalaya
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-mono text-[#DF711B] tracking-wider uppercase m-0">
                    Instant AI Assistant • Live
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
            <div className="flex-1 p-4 space-y-3.5 overflow-y-auto bg-[#F7F3EB]/60 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[92%]">
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-[#0B1D30] text-[#DF711B] flex items-center justify-center shrink-0 mb-1 border border-[#DF711B]/40">
                        <Sparkles className="w-3 h-3" />
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
                        if (btn.url) {
                          return (
                            <a
                              key={idx}
                              href={btn.url}
                              download={btn.download}
                              target={btn.url.startsWith('http') || btn.url.endsWith('.pdf') ? '_blank' : undefined}
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
                  <div className="w-6 h-6 rounded-full bg-[#0B1D30] text-[#DF711B] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3 h-3 animate-spin" />
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
            <div className="bg-[#FAF8F5] border-t border-[#E7E2D8] px-3 py-2 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0">
              <span className="text-[10px] font-mono text-[#888888] shrink-0 uppercase tracking-wider font-bold">Quick:</span>
              <button
                onClick={() => handleSendMessage('Admission enquiry')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-[#D5CEC2] rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0"
              >
                Admission
              </button>
              <button
                onClick={() => handleSendMessage('Fee structure')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-[#D5CEC2] rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0"
              >
                Fee Info
              </button>
              <button
                onClick={() => handleSendMessage('Download forms')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-[#D5CEC2] rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0"
              >
                Forms
              </button>
              <button
                onClick={() => handleSendMessage('Campus & Timings')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-[#D5CEC2] rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0"
              >
                Timings
              </button>
              <button
                onClick={() => handleSendMessage('CBSE & Curriculum')}
                className="px-2.5 py-1 bg-white hover:bg-[#DF711B] hover:text-white border border-[#D5CEC2] rounded-full text-[10px] font-medium text-[#444444] transition-colors whitespace-nowrap shrink-0"
              >
                Curriculum
              </button>
            </div>

            {/* In-Chat Input Form (Never redirects) */}
            <div className="p-3 border-t border-[#E7E2D8] bg-white shrink-0">
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
                  className="flex-1 px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CEC2] rounded-xl text-xs text-[#181C20] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DF711B]/40 focus:border-[#DF711B] transition-all"
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
        className={`relative w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center transition-colors duration-300 ${
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
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
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

