import { BlogPost } from '../types/blog';
import { SCHOOL_IMAGES } from './images';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'living-legacy-chinmaya-vision-program',
    title: 'Nurturing Mind, Intellect & Spirit: The Living Legacy of Chinmaya Vision Program',
    subtitle: 'How the 4 foundational pillars of CVP bridge timeless Indian values with contemporary CBSE excellence.',
    excerpt: 'True education is not merely the accumulation of facts or the mastery of test papers. Under the Chinmaya Vision Program (CVP), we cultivate integrated personalities anchored in Indian heritage and global outlook.',
    content: [
      'Education today often faces a profound dilemma: the paradox of advancing technology alongside receding inner calm. At Chinmaya Vidyalaya Tarapur, our answer to this modern challenge was envisioned decades ago by our revered founder, Pujya Gurudev Swami Chinmayananda.',
      'The Chinmaya Vision Program (CVP) rests upon four interconnected pillars: Integrated Development (physical, mental, intellectual, and spiritual), Indian Culture, Patriotism, and Universal Outlook. In our classrooms, these are not abstract slogans framed on walls—they form the daily rhythm of school life.',
      'Physical vitality is nurtured through yoga, Surya Namaskars, and athletic competition. Mental equilibrium is cultivated during morning prayers and Gita chanting, giving children the poise to navigate academic stress. Intellectual sharpness is forged through rational inquiry and experimental science.',
      'Most importantly, Universal Outlook instills in our students the profound Vedic conviction of "Vasudhaiva Kutumbakam"—the world is one family. When our alumni step into prestigious universities and global boardrooms, it is this quiet inner compass that sets them apart.'
    ],
    keyTakeaways: [
      'Character building and academic rigour are complementary, not competing goals.',
      'Daily morning chanting and prayer develop proven neural focus and emotional resilience.',
      'Universal outlook equips children to thrive in a multicultural global ecosystem without losing cultural roots.'
    ],
    quote: {
      text: 'Children are not vessels to be filled, but lamps to be lit. When you ignite the noble flame within a child, you illuminate generations.',
      source: 'Pujya Gurudev Swami Chinmayananda'
    },
    category: 'Chinmaya Heritage',
    tags: ['CVP', 'Values', 'Holistic Education', 'Spiritual Growth', 'Chinmaya Mission'],
    author: {
      name: 'Dr. K. R. Sharma',
      role: 'Director of Value Education & CVP Coordinator',
      avatar: SCHOOL_IMAGES.SWAMIJI,
      qualification: 'Ph.D. in Indian Philosophy, 22 yrs in Educational Leadership'
    },
    publishDate: 'February 28, 2025',
    readTime: '5 min read',
    coverImage: SCHOOL_IMAGES.POOJA_CEREMONY,
    featured: true
  },
  {
    id: 'blog-2',
    slug: 'experiential-stem-science-learning-tarapur',
    title: 'Beyond Textbooks: Igniting Scientific Curiosity Through Experiential STEM Labs',
    subtitle: 'How inquiry-driven laboratories and robotics turn abstract CBSE physics, chemistry, and biology into living wonders.',
    excerpt: 'When students observe refraction through a prism with their own hands or synthesize copper sulphate crystals in our chemistry labs, wonder replaces rote memorization.',
    content: [
      'Science education is often reduced to memorizing balanced equations and reproducing diagrams under examination conditions. But real science is an adventure of questioning, observing, failing, and discovering.',
      'At Chinmaya Vidyalaya Tarapur, our composite and senior laboratories are designed as investigative spaces rather than static demonstration halls. Every student from Class VI onwards engages in direct experimentation.',
      'In our Physics lab, concepts like electromagnetic induction and optics transition from 2D diagrams to tactile calibration benches. In Chemistry, micro-scale titrations teach precision, chemical safety, and analytical patience.',
      'In alignment with the National Education Policy (NEP 2020), we have introduced integrated computational thinking and robotics modules. Students learn to map mathematical functions to real-world code and sensors, preparing them for future frontiers in engineering and artificial intelligence.'
    ],
    keyTakeaways: [
      'Hands-on lab work increases conceptual retention by over 60% compared to textbook-only teaching.',
      'Safety protocols and investigative methods instill scientific discipline early in childhood.',
      'Integration of coding and sensors equips students for 21st-century technological literacy.'
    ],
    quote: {
      text: 'The mind is not a vessel to be filled with information, but an instrument to be trained for rigorous independent thought.',
      source: 'Academic Council, Chinmaya Tarapur'
    },
    category: 'STEM & Innovation',
    tags: ['STEM', 'Science Labs', 'Physics', 'Chemistry', 'Experiential Learning'],
    author: {
      name: 'Mrs. Sunita Deshmukh',
      role: 'Head of Department (Science) & STEM Coordinator',
      avatar: SCHOOL_IMAGES.CHEMISTRY_LAB,
      qualification: 'M.Sc., B.Ed., CBSE Master Trainer'
    },
    publishDate: 'March 10, 2025',
    readTime: '6 min read',
    coverImage: SCHOOL_IMAGES.PHYSICS_LAB,
    featured: false
  },
  {
    id: 'blog-3',
    slug: 'mastering-cbse-board-exams-without-stress',
    title: 'Mastering Board Examinations with Calmness: A Compass for Class X & XII Students',
    subtitle: 'Proven strategies combining targeted revision cycles, sleep hygiene, and Pranayama for peak cognitive endurance.',
    excerpt: 'Board examinations need not be accompanied by anxiety and burnout. With systematic time management and mental grounding, they become milestones of self-confidence.',
    content: [
      'Every February and March, the air around high schools grows dense with anticipation. The pressure on Class X and XII students is palpable. Yet, peak intellectual performance is fundamentally impossible in a state of chronic anxiety.',
      'At Chinmaya Vidyalaya, our Counseling Cell works alongside subject educators to teach "Sattvic Preparation"—a balanced, mindful approach to exam readiness.',
      'First, replace haphazard marathon study sessions with the 50/10 Pomodoro rhythm: 50 minutes of deep focus followed by 10 minutes of complete detachment without digital screens. Second, never sacrifice the 7 hours of REM sleep before crucial papers; memories are consolidated during sleep cycles.',
      'Third, integrate 5 minutes of Nadi Shodhana (alternate nostril breathing) before opening question papers. This simple yogic technique oxygenates both cerebral hemispheres, regulating the autonomic nervous system and eliminating exam panic.'
    ],
    keyTakeaways: [
      'Consistent daily revision of 3 hours beats panic-driven 12-hour last-minute cramming.',
      'Sleep deprivation directly impairs memory recall and mathematical reasoning.',
      'Mindful breathing switches the nervous system from fight-or-flight into calm analytical focus.'
    ],
    quote: {
      text: 'Do your best and surrender the rest to the divine intelligence that sustains the universe.',
      source: 'Swami Chinmayananda on Right Action'
    },
    category: 'Student Wellness',
    tags: ['Board Exams', 'Mental Health', 'CBSE Tips', 'Mindfulness', 'Study Habits'],
    author: {
      name: 'Senior Mentorship & Counseling Cell',
      role: 'Student Academic Well-being Team',
      avatar: SCHOOL_IMAGES.CLASSROOM_LEARNING,
      qualification: 'Certified School Counselors & CBSE Evaluators'
    },
    publishDate: 'March 18, 2025',
    readTime: '4 min read',
    coverImage: SCHOOL_IMAGES.CLASSROOM_LEARNING,
    featured: true
  },
  {
    id: 'blog-4',
    slug: 'the-transformative-power-of-daily-morning-assemblies',
    title: 'The Sacred Rhythm: Why Daily Morning Assembly Sets the Tone for Character',
    subtitle: 'Unpacking the profound significance of Guru Paduka Pooja, Vedic chanting, and student-led moral discourse.',
    excerpt: 'Before any blackboard is written upon or computer powered on, our campus gathers in collective reverence. Here is why this 25-minute assembly is the cornerstone of our school.',
    content: [
      'In a world dominated by instant notifications and sensory fragmentation, the morning assembly at Chinmaya Vidyalaya is an oasis of collective stillness and purposeful alignment.',
      'Each morning begins with the reverent chanting of the Guru Stotram and Chinmaya Pledge, followed by the recitation of selected Bhagavad Gita verses. Even to a neutral observer, the sonic reverberation of hundreds of voices chanting in synchronized cadence produces palpable serenity.',
      'Student speakers then present "Thought for the Day" and brief news analysis, developing extempore oratory confidence in front of a thousand peers.',
      'This daily habit bridges ancient tradition with modern social-emotional learning, reinforcing that intellectual brilliance without humility and gratitude is fundamentally hollow.'
    ],
    keyTakeaways: [
      'Group chanting instills a sense of equality, discipline, and communal belonging.',
      'Daily public speaking on stage eradicates stage fright from early primary grades.',
      'Starting the day with gratitude calms hyperactivity and prepares students for focused learning.'
    ],
    quote: {
      text: 'Stand up, be bold, be strong. Take the whole responsibility on your own shoulders, and know that you are the creator of your own destiny.',
      source: 'Swami Vivekananda'
    },
    category: 'Campus Life',
    tags: ['Assemblies', 'Gita Chanting', 'Balvihar', 'Character Building', 'Tradition'],
    author: {
      name: 'Acharya Rajeshwar Ji',
      role: 'Head of Sanskrit & Cultural Activities',
      avatar: SCHOOL_IMAGES.SWAMIJI,
      qualification: 'Acharya, Vedanta Course (Sandeepany Sadhanalaya)'
    },
    publishDate: 'January 22, 2025',
    readTime: '5 min read',
    coverImage: SCHOOL_IMAGES.CAMPUS_WIDE,
    featured: false
  },
  {
    id: 'blog-5',
    slug: 'nep-2020-art-integration-pedagogy',
    title: 'NEP 2020 in the Classroom: Integrating Arts, Culture, and Experiential Inquiry',
    subtitle: 'Translating the National Education Policy into vibrant classroom dynamics across languages, mathematics, and social sciences.',
    excerpt: 'The National Education Policy (NEP 2020) advocates breaking disciplinary silos. Discover how Chinmaya Vidyalaya seamlessly intertwines art, theater, and regional culture with foundational curricula.',
    content: [
      'When the National Education Policy 2020 was unveiled, the vision of holistic, multidisciplinary, and value-based education was celebrated across India. For Chinmaya Vidyalaya, however, this blueprint felt naturally familiar.',
      'For over three decades, our pedagogical framework has treated fine arts, classical music, drama, and environmental stewardship not as extracurricular accessories, but as core cognitive catalysts.',
      'In our junior school, mathematical concepts of geometry and symmetry are explored through traditional Indian Rangoli and origami patterns. History lessons come alive as students script street plays depicting India’s freedom movement and civic responsibilities.',
      'Furthermore, our language pedagogy integrates Sanskrit, Marathi, Hindi, and English with classical literature and storytelling. This multilingual approach enriches neuroplasticity while grounding children in cultural self-respect.'
    ],
    keyTakeaways: [
      'Art-integrated learning transforms passive listeners into active conceptual creators.',
      'Multidisciplinary projects teach students how real-world challenges cross subject boundaries.',
      'Multilingual grounding strengthens cognitive flexibility and analytical aptitude.'
    ],
    quote: {
      text: 'Education is the manifestation of the perfection already in man.',
      source: 'National Education Framework Inspiration'
    },
    category: 'Academic Pedagogy',
    tags: ['NEP 2020', 'Curriculum', 'Art Integration', 'Pedagogy', 'Holistic Education'],
    author: {
      name: 'Principal’s Desk',
      role: 'Principal, Chinmaya Vidyalaya Tarapur',
      avatar: SCHOOL_IMAGES.PRINCIPAL,
      qualification: 'M.Sc., M.Ed., Recipient of National CBSE Excellence in Leadership'
    },
    publishDate: 'February 14, 2025',
    readTime: '7 min read',
    coverImage: SCHOOL_IMAGES.CULTURAL_EVENT,
    featured: false
  },
  {
    id: 'blog-6',
    slug: 'sports-as-a-crucible-for-life-skills',
    title: 'The Playing Field as a Classroom: Sports, Grit & Unbreakable House Spirit',
    subtitle: 'Why track athletics, kho-kho, football, and yoga build emotional fortitude that no classroom lecture can match.',
    excerpt: 'In an era where screens command young attention, the athletic track remains the ultimate crucible where children learn humility in victory and unyielding dignity in defeat.',
    content: [
      'Walk across our sprawling sports grounds during house games, and you will witness true character in action. The four institutional houses—Shivaji, Tagore, Ashoka, and Raman—compete with fierce zeal and deep mutual respect.',
      'Sports teach what cannot be memorized: how to push past physical fatigue, how to trust a teammate when the scoreboard is against you, and how to applaud an opponent who outplayed you with skill.',
      'Our physical education program balances high-energy athletics with classical yogasanas and pranayama, ensuring cardiorespiratory endurance as well as inner composure.',
      'We celebrate every podium finish in inter-school CBSE clusters, but we celebrate even more the student who fell on the track, stood up, dusted the cinder from their knees, and sprinted with pride to the finish line.'
    ],
    keyTakeaways: [
      'House leagues forge lifelong bonds of teamwork and leadership under pressure.',
      'Resilience learned on the sports ground directly translates into emotional stability in examinations.',
      'Balancing athletics with yogic breathing ensures both stamina and emotional tranquility.'
    ],
    quote: {
      text: 'Champions are made from something deep inside them: a desire, a dream, a vision.',
      source: 'Chinmaya Sports Council'
    },
    category: 'Campus Life',
    tags: ['Sports', 'Physical Education', 'House System', 'Resilience', 'Athletics'],
    author: {
      name: 'Coach Vikram Patil',
      role: 'Head of Physical Education & Sports',
      avatar: SCHOOL_IMAGES.SPORTS_DAY,
      qualification: 'M.P.Ed., Certified National Athletic Official'
    },
    publishDate: 'January 10, 2025',
    readTime: '4 min read',
    coverImage: SCHOOL_IMAGES.SPORTS_DAY,
    featured: false
  }
];

export const BLOG_CATEGORIES = [
  'All',
  'Chinmaya Heritage',
  'Academic Pedagogy',
  'Student Wellness',
  'STEM & Innovation',
  'Campus Life'
] as const;
