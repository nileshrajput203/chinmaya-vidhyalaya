import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  breadcrumb?: Array<{ name: string; path: string }>;
}

const BASE_URL = 'https://chinmayatarapur.edu.in';

const ROUTE_SEO: Record<string, PageMetadata> = {
  '/': {
    title: 'Chinmaya Vidyalaya, Tarapur | Premier CBSE School (Nursery to XII)',
    description: 'Premier CBSE co-educational institution in Boisar-Tarapur, Palghar. Holistic academics, STEM laboratories, sports arena, and value-based Chinmaya Vision Programme from Nursery to Class XII.',
    keywords: 'Chinmaya Vidyalaya Tarapur, CBSE school Boisar, best school in Palghar, Chinmaya Mission school, admissions 2026-27, CBSE affiliation 1130058, senior secondary school Boisar, Nursery to Class 12 Boisar, Chinmaya Vision Programme',
    breadcrumb: [{ name: 'Home', path: '/' }],
  },
  '/academics': {
    title: 'CBSE Scholastic Framework & Pedagogy | Chinmaya Vidyalaya Tarapur',
    description: 'Comprehensive CBSE scholastic framework, NEP 2020 alignment, and stage-wise academic disciplines at Chinmaya Vidyalaya Tarapur.',
    keywords: 'CBSE curriculum Boisar, school syllabus Tarapur, NEP 2020 school Palghar, academic pedagogy',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Academics', path: '/academics' }],
  },
  '/academics/curriculum': {
    title: 'CBSE Scholastic Curriculum & Syllabi | Chinmaya Vidyalaya Tarapur',
    description: 'Explore the NEP 2020-aligned CBSE curriculum from Nursery to Class XII. Graded stages, STEM lab practicals, trilingual learning, and senior secondary Science, Commerce, and Arts streams.',
    keywords: 'CBSE curriculum, Class 10 syllabus, Class 12 streams, science commerce arts Boisar, CBSE 1130058',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Academics', path: '/academics' }, { name: 'Curriculum & Syllabi', path: '/academics/curriculum' }],
  },
  '/academics/co-curricular': {
    title: 'Sports, Athletics & Co-Curricular Life | Chinmaya Vidyalaya Tarapur',
    description: 'Comprehensive physical education, inter-house athletic meets, cricket, volleyball, yoga, classical dance, choir, and visual arts nurturing well-rounded student talent.',
    keywords: 'school sports Boisar, athletic meet Tarapur, yoga in school, co-curricular activities, cultural competitions',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Academics', path: '/academics' }, { name: 'Co-Curricular & Sports', path: '/academics/co-curricular' }],
  },
  '/academics/infrastructure': {
    title: 'World-Class Infrastructure & Science Labs | Chinmaya Vidyalaya Tarapur',
    description: 'Advanced Physics, Chemistry, Biology, and Computer Labs, high-speed robotics kits, smart classrooms, and expansive sports grounds in Boisar, Maharashtra.',
    keywords: 'school infrastructure, science labs Boisar, computer lab Tarapur, robotics lab school, sports ground',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Academics', path: '/academics' }, { name: 'Infrastructure & Labs', path: '/academics/infrastructure' }],
  },
  '/admissions': {
    title: 'Admissions 2026-27 & Guidelines | Chinmaya Vidyalaya Tarapur',
    description: 'Admissions open for Academic Session 2026-27 from Nursery to Class XII. Review eligibility criteria, document verification, fee guidelines, and download forms.',
    keywords: 'school admissions 2026-27, nursery admission Boisar, class 1 admission Tarapur, CBSE school registration Palghar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Admissions', path: '/admissions' }],
  },
  '/admissions/guidelines': {
    title: 'Admissions 2026-27 Guidelines & Process | Chinmaya Vidyalaya Tarapur',
    description: 'Official admission guidelines, standard-wise age criteria, required verification documents, interactive fee estimator, and enrollment procedure.',
    keywords: 'admission guidelines, admission procedure, school application 2026, fee estimator Boisar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Admissions', path: '/admissions' }, { name: 'Guidelines', path: '/admissions/guidelines' }],
  },
  '/admissions/fee-structure': {
    title: 'Annual Fee Structure & Installments 2026-27 | Chinmaya Vidyalaya Tarapur',
    description: 'Transparent, CBSE-regulated fee schedule for Nursery, Primary, Middle, Secondary, and Senior Secondary classes at Chinmaya Vidyalaya Tarapur. Term-wise flexible installments.',
    keywords: 'school fee structure Boisar, annual school fees Tarapur, CBSE school fees Palghar, fee installments',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Admissions', path: '/admissions' }, { name: 'Fee Structure', path: '/admissions/fee-structure' }],
  },
  '/admissions/calendar': {
    title: 'Academic Calendar 2026-27 & School Schedule | Chinmaya Vidyalaya Tarapur',
    description: 'Academic calendar, term examinations, vacation schedules, national holidays, and celebration dates for the 2026-27 session at Chinmaya Vidyalaya Tarapur.',
    keywords: 'school academic calendar, term exam dates, school holidays Boisar, vacation schedule 2026',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Admissions', path: '/admissions' }, { name: 'Calendar', path: '/admissions/calendar' }],
  },
  '/admissions/forms': {
    title: 'Admission Registration Forms Download | Chinmaya Vidyalaya Tarapur',
    description: 'Download official admission registration forms for Nursery, Junior KG, Senior KG, and Classes I to XII in PDF format for administrative desk submission.',
    keywords: 'admission form pdf, nursery registration form, download school admission form Boisar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Admissions', path: '/admissions' }, { name: 'Forms', path: '/admissions/forms' }],
  },
  '/about': {
    title: 'About Chinmaya Vidyalaya Tarapur | Heritage, Vision & Leadership',
    description: 'Discover the heritage of Chinmaya Vidyalaya Tarapur, an undertaking of Central Chinmaya Mission Trust, Mumbai offering three decades of academic distinction.',
    keywords: 'about Chinmaya Vidyalaya, history of school Boisar, Chinmaya Mission Mumbai',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }],
  },
  '/about/history': {
    title: 'Our Heritage & School History | Chinmaya Vidyalaya Tarapur',
    description: 'Established in 1995 under Central Chinmaya Mission Trust, Mumbai. Explore thirty years of educational distinction and noble character formation in Boisar-Tarapur.',
    keywords: 'school history, 1995 foundation, Chinmaya Vidyalaya heritage, Boisar history',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'History', path: '/about/history' }],
  },
  '/about/mission-vision': {
    title: 'Vision & Mission Statements | Chinmaya Vidyalaya Tarapur',
    description: 'Our vision is to offer holistic education that fosters intellectual clarity, moral integrity, national devotion, and universal spiritual oneness in every student.',
    keywords: 'school vision, school mission statement, value education, holistic development vision',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Vision & Mission', path: '/about/mission-vision' }],
  },
  '/about/management': {
    title: 'Board of Management & Governance | Chinmaya Vidyalaya Tarapur',
    description: 'Meet the governing council and Local Managing Committee under Central Chinmaya Mission Trust, Mumbai overseeing educational leadership at Chinmaya Vidyalaya Tarapur.',
    keywords: 'school management committee, LMC Boisar, Chinmaya Mission Trust governance',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Management', path: '/about/management' }],
  },
  '/about/mandatory-information': {
    title: 'CBSE Mandatory Disclosures & Transfer Certificates (TC) | Chinmaya Vidyalaya',
    description: 'Official CBSE SARAS mandatory public disclosures, school affiliation certificates, fire safety, building safety, hygiene clearances, and official Transfer Certificates (TC).',
    keywords: 'CBSE mandatory disclosures, SARAS compliance, fire safety certificate school, building safety certificate, Transfer Certificate TC Boisar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Mandatory Information & TC', path: '/about/mandatory-information' }],
  },
  '/about/swami-chinmayananda': {
    title: 'Pujya Gurudev Swami Chinmayananda | Chinmaya Vidyalaya Tarapur',
    description: 'Learn about the life, teachings, and spiritual legacy of Swami Chinmayananda, visionary founder of Chinmaya Mission and inspiration behind the Chinmaya Vision Programme.',
    keywords: 'Swami Chinmayananda, Gurudev, Chinmaya Mission founder, spiritual master, Gita exponent',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Swami Chinmayananda', path: '/about/swami-chinmayananda' }],
  },
  '/about/philosophy': {
    title: 'Chinmaya Vision Programme (CVP) & 4 Pillars | Chinmaya Vidyalaya Tarapur',
    description: 'The four core pillars of CVP: Integrated Development, Indian Culture & Heritage, Patriotism, and Universal Outlook fostering enlightened, compassionate global citizens.',
    keywords: 'Chinmaya Vision Programme, CVP 4 pillars, value-based education, moral curriculum',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }, { name: 'Philosophy (CVP)', path: '/about/philosophy' }],
  },
  '/features/four-pillars': {
    title: 'The 4 Pillars of CVP Explained | Chinmaya Vidyalaya Tarapur',
    description: 'Deep dive into the 4 Pillars of the Chinmaya Vision Programme: Physical, Mental, Intellectual & Spiritual development for balanced childhood growth.',
    keywords: '4 pillars of education, CVP pillars, character building school, child psychology',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Features', path: '/features' }, { name: 'Four Pillars', path: '/features/four-pillars' }],
  },
  '/features/spiritual-activities': {
    title: 'Spiritual & Cultural Activities | Chinmaya Vidyalaya Tarapur',
    description: 'Daily Guru Paduka Pooja, monthly devotional Bhajans, Annual Gita Chanting competitions, and festive celebrations nurturing deep cultural and moral grounding.',
    keywords: 'Guru Paduka Pooja, Gita chanting competition, school bhajans, cultural activities Boisar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Features', path: '/features' }, { name: 'Spiritual Activities', path: '/features/spiritual-activities' }],
  },
  '/features/career-counselling': {
    title: 'Career Guidance & Aptitude Assessment | Chinmaya Vidyalaya Tarapur',
    description: 'ASSET diagnostic skill testing and professional career counselling by Young Buzz to guide students through stream selection and future university pathways.',
    keywords: 'career counselling school, ASSET test Boisar, student aptitude assessment, Young Buzz career workshop',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Features', path: '/features' }, { name: 'Career Counselling', path: '/features/career-counselling' }],
  },
  '/features/library': {
    title: 'Central Research Library & Knowledge Archive | Chinmaya Vidyalaya Tarapur',
    description: 'Over 10,000 reference titles, encyclopedias, journals, and dedicated quiet reading cubicles cultivating lifelong literacy and research habits.',
    keywords: 'school library, reading lounge, reference books, student library Boisar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Features', path: '/features' }, { name: 'Library', path: '/features/library' }],
  },
  '/downloads': {
    title: 'Downloads Portal & Academic Resources | Chinmaya Vidyalaya Tarapur',
    description: 'Download official CBSE sample papers, Evaluation III papers, admission forms, fee schedules, and public disclosure documents in PDF format.',
    keywords: 'school downloads, sample question papers, admission forms download, syllabus pdf',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Downloads', path: '/downloads' }],
  },
  '/downloads/sample-papers': {
    title: 'CBSE Sample Question Papers (Class 1 to 10) | Chinmaya Vidyalaya Tarapur',
    description: 'Free download of term-wise CBSE sample question papers, revision question banks, and marking schemes for Classes I through X.',
    keywords: 'CBSE sample papers, Class 10 board papers, Class 9 question paper, term exam papers Boisar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Downloads', path: '/downloads' }, { name: 'Sample Papers', path: '/downloads/sample-papers' }],
  },
  '/downloads/transfer-certificates': {
    title: 'Transfer Certificates (TC Records) | Chinmaya Vidyalaya Tarapur',
    description: 'Access verified school Transfer Certificate (TC) records compliant with CBSE transparency and public inspection guidelines.',
    keywords: 'transfer certificates, TC records school, CBSE TC verification Boisar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Downloads', path: '/downloads' }, { name: 'Transfer Certificates', path: '/downloads/transfer-certificates' }],
  },
  '/downloads/documents': {
    title: 'Official School Documents & Certificates | Chinmaya Vidyalaya Tarapur',
    description: 'Browse all official institutional certificates, public disclosures, and governance documents for public viewing.',
    keywords: 'school documents, compliance certificates, CBSE affiliation letters',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Downloads', path: '/downloads' }, { name: 'Documents', path: '/downloads/documents' }],
  },
  '/gallery': {
    title: 'Photo Gallery & Campus Memories | Chinmaya Vidyalaya Tarapur',
    description: 'Browse photos of annual days, athletic sports meets, science exhibitions, classroom labs, and festive celebrations at Chinmaya Vidyalaya Tarapur.',
    keywords: 'school photo gallery, campus pictures Boisar, annual day photos, sports meet gallery',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }],
  },
  '/news': {
    title: 'News, Updates & School Circulars | Chinmaya Vidyalaya Tarapur',
    description: 'Stay updated with official school notices, academic circulars, celebration highlights, and upcoming campus events.',
    keywords: 'school news, circulars Boisar, school updates, parent notices Tarapur',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'News & Events', path: '/news' }],
  },
  '/faq': {
    title: 'Frequently Asked Questions (FAQ) | Chinmaya Vidyalaya Tarapur',
    description: 'Authoritative answers to frequently asked questions about admissions, fees, timings, CBSE affiliation, bus transportation, and campus guidelines.',
    keywords: 'school FAQ, admission questions, school timings Boisar, fee FAQs',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }],
  },
  '/contact': {
    title: 'Contact Us & Campus Location | Chinmaya Vidyalaya Tarapur',
    description: 'Get in touch with Chinmaya Vidyalaya Tarapur. Campus address at P-201 MIDC Area, Saravali, Boisar, phone numbers +91 9322054713 / +91 9823517700, and online enquiry desk.',
    keywords: 'contact Chinmaya Vidyalaya, school phone number, school address Boisar, MIDC Saravali school',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }],
  },
  '/alumni': {
    title: 'Alumni Association & Global Network | Chinmaya Vidyalaya Tarapur',
    description: 'Connect with former students, celebrate alumni accomplishments across industries, and stay involved with your alma mater.',
    keywords: 'school alumni network, Chinmaya alumni, past students Boisar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Alumni', path: '/alumni' }],
  },
  '/careers': {
    title: 'Careers & Faculty Recruitment | Chinmaya Vidyalaya Tarapur',
    description: 'Join our dedicated team of CBSE educators. Download the teacher application form and explore open teaching positions in Boisar, Palghar.',
    keywords: 'teaching jobs Boisar, teacher vacancy school, CBSE teacher recruitment Palghar',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }],
  },
  '/blog': {
    title: 'School Blog & Educational Insights | Chinmaya Vidyalaya Tarapur',
    description: 'Articles, educational guidance, parenting tips, and student achievements from the educators at Chinmaya Vidyalaya Tarapur.',
    keywords: 'education blog, parenting tips, school articles, CBSE education insights',
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }],
  },
};

export const SEOHead: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.replace(/\/+$/, '') || '/';
    const seoData = ROUTE_SEO[pathname] || {
      title: 'Chinmaya Vidyalaya, Tarapur | CBSE Affiliated School',
      description: 'Premier CBSE co-educational senior secondary institution in Boisar-Tarapur, Palghar. Holistic education and values from Nursery to Class XII.',
      keywords: 'Chinmaya Vidyalaya Tarapur, CBSE school Boisar, Palghar school',
      breadcrumb: [{ name: 'Home', path: '/' }],
    };

    // 1. Update Document Title
    document.title = seoData.title;

    // Helper to safely set or create a meta tag
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let meta = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 2. Update Meta Description & Keywords
    setMetaTag('name', 'description', seoData.description);
    if (seoData.keywords) {
      setMetaTag('name', 'keywords', seoData.keywords);
    }
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Update Canonical Link
    const currentCanonicalUrl = `${BASE_URL}${pathname === '/' ? '' : pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentCanonicalUrl;

    // 4. Update OpenGraph Tags
    setMetaTag('property', 'og:title', seoData.title);
    setMetaTag('property', 'og:description', seoData.description);
    setMetaTag('property', 'og:url', currentCanonicalUrl);

    // 5. Update Twitter Card Tags
    setMetaTag('name', 'twitter:title', seoData.title);
    setMetaTag('name', 'twitter:description', seoData.description);

    // 6. Inject or Update Dynamic BreadcrumbList JSON-LD Schema
    const breadcrumbList = seoData.breadcrumb || [{ name: 'Home', path: '/' }];
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbList.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${BASE_URL}${item.path === '/' ? '' : item.path}`,
      })),
    };

    const breadcrumbScriptId = 'dynamic-breadcrumb-schema';
    let breadcrumbScript = document.getElementById(breadcrumbScriptId) as HTMLScriptElement | null;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = breadcrumbScriptId;
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);

  }, [location.pathname]);

  return null;
};

export default SEOHead;
