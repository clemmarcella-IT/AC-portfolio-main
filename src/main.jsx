import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Gamepad2,
  Globe,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Monitor,
  Phone,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  X
} from 'lucide-react';
import './styles.css';
import { BooksShowcase } from '@/components/ui/books-showcase';
import { ModernCarousel } from '@/components/ui/modern-carousel';
import { BackgroundBoxes } from '@/components/ui/background-boxes';

// --- DATA DEFINITIONS ---

const projectsData = [
  {
    id: 1,
    title: 'Arduino-Based Barcode Scanner with Facial Recognition System',
    category: 'Embedded AI & Hardware',
    shortDesc: 'Automated student/employee attendance & access control utilizing embedded camera hardware, OpenCV biometric facial recognition, and barcode verification.',
    image: './images/barcode-system.jpg',
    gallery: [
      './images/barcode-system-1.png',
      './images/barcode-system-2.png',
      './images/barcode-system-3.png',
      './images/barcode-system-4.png',
      './images/barcode-system-5.png',
      './images/barcode-system-6.png',
      './images/barcode-system-7.png',
      './images/barcode-system-8.png',
    ],
    tech: ['Arduino', 'Python', 'OpenCV', 'Raspberry Pi', 'Biometrics'],
    lead: 'Ken',
    facebookUrl: 'https://www.facebook.com/share/p/19KRBGUcJ5/',
    contributors: ['KF', 'NM', 'RL'],
    accentColor: '#10b981',
  },
  {
    id: 2,
    title: 'ASD Learning Application',
    category: 'Assistive EdTech & Mobile',
    shortDesc: 'Visual-based, interactive assistive mobile app crafted specifically for children and learners with Autism Spectrum Disorder to enhance communication and memory.',
    image: './images/asd-learning-app.png',
    gallery: ['./images/ar-1.png', './images/ar-2.png', './images/ar-3.png'],
    tech: ['Flutter', 'Firebase', 'Dart', 'Tailwind', 'UI/UX'],
    contributors: ['KF', 'JT', 'JB'],
    accentColor: '#38bdf8',
  },
  {
    id: 3,
    title: 'GenSpe Mobile Game',
    category: 'Interactive 2D Game Design',
    shortDesc: 'Playable gamified educational experience teaching biological and scientific concepts through interactive puzzles, quests, and retention mechanics.',
    image: './images/genspe-game.jpg',
    gallery: ['./images/genspe-1.png', './images/genspe-2.png', './images/genspe-3.png'],
    tech: ['Unity', 'C#', 'Game Design', '2D Physics', 'Mobile'],
    contributors: ['KF', 'JM', 'RL'],
    accentColor: '#fbbf24',
  },
  {
    id: 4,
    title: 'Speak-App for Non-Verbal Students',
    category: 'AAC & Assistive Speech',
    shortDesc: 'Augmentative and Alternative Communication (AAC) soundboard tool empowering speech-impaired students with vocal synthesis, tap-to-speak, and picture cards.',
    image: './images/speak-app.png',
    gallery: ['./images/speaksmart-1.png', './images/speaksmart-2.png', './images/speaksmart-3.png'],
    tech: ['Flutter', 'Speech AI', 'Firebase', 'Audio Synth', 'Android'],
    contributors: ['KF', 'NM', 'JT'],
    accentColor: '#a855f7',
  },
  {
    id: 5,
    title: 'IGLA Cognitive Training App',
    category: 'Gamified EdTech',
    shortDesc: 'Attention-training and memory enhancement tool featuring specialized pedagogical mini-games designed for cognitive skill development.',
    image: './images/igla.png',
    gallery: ['./images/igla-gallery-1.png', './images/igla-gallery-2.png', './images/igla-gallery-3.png'],
    tech: ['Flutter', 'Dart', 'UX Research', 'Gamification'],
    contributors: ['KF', 'JB', 'RL'],
    accentColor: '#f43f5e',
  },
  {
    id: 6,
    title: 'Digital RSVP & Invitation Platform',
    category: 'Full-Stack Web Experience',
    shortDesc: 'High-conversion interactive event invitation system featuring live guestbook RSVP, countdown timers, Google Maps integration, and photo galleries.',
    image: './images/birthday-invitation.png',
    gallery: ['./images/birthday-gallery-1.png', './images/birthday-gallery-2.png', './images/wedding-gallery-1.png'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'PostgreSQL'],
    contributors: ['KF', 'JM', 'JT'],
    accentColor: '#f97316',
  },
];

const techStack = [
  { name: 'React', icon: './images/react.png' },
  { name: 'Flutter', icon: './images/flutter.png' },
  { name: 'Python', icon: './images/python.png' },
  { name: 'Arduino', icon: './images/arduino.png' },
  { name: 'ESP32 IoT', icon: './images/ESP32.png' },
  { name: 'C# .NET', icon: './images/csharp.png' },
  { name: 'C++', icon: './images/cpp.png' },
  { name: 'PHP', icon: './images/php.png' },
  { name: 'Laravel', icon: './images/laravel.png' },
  { name: 'MySQL', icon: './images/mysql.png' },
  { name: 'PostgreSQL', icon: './images/PostgreSQL.png' },
  { name: 'MongoDB', icon: './images/MongoDB.png' },
  { name: 'Firebase', icon: './images/firebase.png' },
  { name: 'Unity', icon: './images/unity.png' },
  { name: 'Figma', icon: './images/figma.svg' },
  { name: 'Android Studio', icon: './images/android-studio.svg' },
  { name: 'Postman', icon: './images/postman.svg' },
  { name: 'VS Code', icon: './images/vscode.svg' },
  { name: 'Vite', icon: './images/vite.svg' },
  { name: 'Bootstrap', icon: './images/bootstrap.svg' },
];

const technicalExpertiseGroups = [
  {
    title: 'Code Languages',
    description: 'Programming languages used to build app logic, backend features, scripts, and system functionality.',
    items: [
      { name: 'PHP', icon: './images/php.png', description: 'Server-side Development' },
      { name: 'JavaScript', icon: './images/javascript.png', description: 'Web Interactivity' },
      { name: 'Python', icon: './images/python.png', description: 'Programming Language' },
      { name: 'C#', icon: './images/csharp.png', description: 'Software Development' },
      { name: 'Java', icon: './images/java.png', description: 'Software Development' },
      { name: 'C++', icon: './images/cpp.png', description: 'Systems Programming' },
      { name: 'Kotlin', icon: './images/kotlin.png', description: 'Android Development' },
      { name: 'Dart', icon: './images/dart.svg', description: 'Flutter App Logic' },
    ],
  },
  {
    title: 'Frameworks & Development',
    description: 'Frameworks and engines used for mobile apps, websites, dashboards, and interactive learning systems.',
    items: [
      { name: 'Flutter', icon: './images/flutter.png', description: 'Cross-platform Development' },
      { name: 'Laravel', icon: './images/laravel.png', description: 'Backend Development' },
      { name: 'React', icon: './images/react.png', description: 'Frontend Development' },
      { name: 'Bootstrap', icon: './images/bootstrap.svg', description: 'Responsive UI' },
      { name: 'Vite', icon: './images/vite.svg', description: 'Frontend Build Tool' },
      { name: 'Flame Engine', icon: './images/flame.png', description: 'Game Engine' },
      { name: 'Unity', icon: './images/unity.png', description: 'Game Development' },
    ],
  },
  {
    title: 'Database & Backend',
    description: 'Storage, authentication, APIs, and backend services that keep systems connected and reliable.',
    items: [
      { name: 'Firebase', icon: './images/firebase.png', description: 'Backend Services' },
      { name: 'MySQL', icon: './images/mysql.png', description: 'Database Systems' },
      { name: 'PostgreSQL', icon: './images/PostgreSQL.png', description: 'Relational Database' },
      { name: 'MongoDB', icon: './images/MongoDB.png', description: 'NoSQL Database' },
      { name: 'SQLite', icon: './images/sqlite.svg', description: 'Local App Storage' },
      { name: 'REST API', icon: './images/rest-api.svg', description: 'System Integration' },
    ],
  },
  {
    title: 'Hardware & Embedded',
    description: 'Physical computing and connected-device tools for prototypes, automation, IoT, and engineering projects.',
    items: [
      { name: 'Arduino', icon: './images/arduino.png', description: 'Embedded Systems' },
      { name: 'Raspberry Pi', icon: './images/raspberry-pi.svg', description: 'Single-board Computing' },
      { name: 'ESP32', icon: './images/ESP32.png', description: 'IoT Microcontroller' },
      { name: 'IoT', icon: './images/iot.svg', description: 'Connected Devices' },
      { name: 'Sensors & Automation', icon: './images/sensors-automation.svg', description: 'Monitoring & Control' },
    ],
  },
  {
    title: 'Design & Development Tools',
    description: 'Creative, coding, testing, and collaboration tools used to design, build, document, and deliver projects.',
    items: [
      { name: 'Canva', icon: './images/canva.svg', description: 'Graphic Design' },
      { name: 'Adobe Illustrator', icon: './images/Adobe illustrator.png', description: 'Vector Design' },
      { name: 'Photoshop', icon: './images/Photoshop.png', description: 'Image Editing' },
      { name: 'VS Code', icon: './images/vscode.svg', description: 'Code Editor' },
      { name: 'Android Studio', icon: './images/android-studio.svg', description: 'Android Tooling' },
      { name: 'GitHub', icon: './images/github.png', description: 'Version Control' },
      { name: 'Postman', icon: './images/postman.svg', description: 'API Testing' },
      { name: 'Figma', icon: './images/figma.svg', description: 'UI/UX Prototyping' },
    ],
  },
];

const teamMembers = [
  {
    name: 'Engr. Nonito Molijon Jr.',
    role: 'Founder / CEO',
    image: './images/nonito.jpg',
    description: 'Founder / CEO, Computer Engineer, Researcher, Designer, Programmer, and Virtual Assistant. Leads the company and team, guides project direction, manages client collaboration, supervises research and planning, and drives business growth and innovation.',
  },
  {
    name: 'Ken Chester Felongco',
    role: 'CTO / Lead Developer',
    image: './images/ken.png',
    description: 'Chief Technology Officer and Lead Developer specializing in full-stack systems, backend development, databases, REST APIs, Firebase, UI/UX implementation, scalable architecture, technical direction, project planning, and code quality.',
  },
  {
    name: 'Clem Marcella',
    role: 'Backend Developer',
    image: './images/clem.png',
    description: 'Clem Marcella is a backend developer on the team, building and maintaining server-side systems and APIs.',
  },
  {
    name: 'JannLemor Malakad',
    role: 'Web Developer',
    image: './images/jannlemor.png',
    description: 'Senior Web Developer specializing in web systems, backend development, database management, API integration, system functionality, performance, security, and reliable software implementation.',
  },
  {
    name: 'John Paul Terania',
    role: 'UI/UX Designer',
    image: './images/john-paul-terania.png',
    description: 'UI/UX and Graphic Designer specializing in user-friendly app and system interfaces, wireframes, prototypes, visual branding, icons, layouts, and digital graphics that strengthen the team\'s visual identity.',
  },
  {
    name: 'Eljay',
    role: 'Frontend Developer',
    image: './images/eljay.png',
    description: 'Junior Developer specializing in responsive interfaces with React/Vite, Bootstrap, and JavaScript. Focuses on component-based UI, UI/UX implementation, API integration, state management, and cross-browser experiences.',
  },
  {
    name: 'Madel',
    role: 'Quality Assurance',
    image: './images/madel.png',
    description: 'Junior Developer supporting frontend development, responsive web design, UI implementation, feature testing, documentation, clean interfaces, and collaborative software development with detail-oriented execution.',
  },
];

const workflowSteps = [
  {
    step: '01',
    side: 'right',
    badge: 'INQUIRY',
    title: 'Chat',
    desc: "Free consultation. Tell us what you need — we'll tell you exactly what it takes. No pressure, no sales pitch, just straight answers.",
  },
  {
    step: '02',
    side: 'left',
    badge: 'WITHIN 24 HOURS',
    title: 'Plan & quote',
    desc: 'Within 24 hours, you get a written scope, timeline, and fixed price. What we agree on is what you pay — no surprise fees later.',
  },
  {
    step: '03',
    side: 'right',
    badge: 'AT LEAST 25%',
    title: 'Downpayment',
    desc: 'A minimum 25% downpayment locks in your timeline and reserves our team. Development begins the moment payment clears — no waiting, no delays.',
  },
  {
    step: '04',
    side: 'left',
    badge: '2 - 6 WEEKS TYPICAL',
    title: 'Build',
    desc: 'Real progress in days, not months. We work in 2–4 stages with a live preview link — you see every update as it happens, with quick check-ins by chat or email.',
  },
  {
    step: '05',
    side: 'right',
    badge: 'IMPROVE TOGETHER',
    title: 'Review & refine',
    desc: 'Test the preview, share feedback, watch us improve it. Changes inside the agreed scope are always included — never billed as extras.',
  },
  {
    step: '06',
    side: 'left',
    badge: '30 DAYS FREE FIXES',
    title: 'Launch & support',
    desc: 'We set it up on your hosting, hand over full docs and logins, and stay on call for 30 days of free fixes. Optional monthly plan for ongoing support afterward.',
  },
];

const pricingPlans = [
  {
    name: 'Basic',
    subtitle: 'Basic Starter',
    price: '₱1K',
    priceRange: '– ₱30K',
    desc: 'Best for students, startups, and simple projects on a budget.',
    highlight: false,
    cta: 'Get Started',
    features: [
      'Free Web Hosting Setup',
      'Minor Changes (within agreed scope)',
      'Automatic Email Setup',
      'Standard delivery time',
      'Flexible down payment terms',
      'Basic support after handover',
    ],
  },
  {
    name: 'Pro',
    subtitle: 'Business Growth',
    badge: '★ Most Popular',
    price: '₱31K',
    priceRange: '– ₱100K',
    desc: 'Best for businesses that need advanced features and room to grow.',
    highlight: true,
    cta: 'Choose Pro',
    features: [
      'Everything in Basic',
      'Free 1-Year Domain Registration',
      'Free 2 Months Web Hosting',
      'Major Revisions (per agreed scope)',
      'Payment Gateway Integration',
      '5 Months Free Maintenance & Support',
      'Priority Project Handling',
      'AI Automation Features',
      'NDA Contract Provided',
    ],
  },
  {
    name: 'Premium',
    subtitle: 'Enterprise Solution',
    price: 'Custom',
    priceRange: 'pricing',
    desc: 'For large businesses, enterprise systems, and high-level automation.',
    highlight: false,
    cta: 'Request Quote',
    features: [
      'Everything in Basic & Pro',
      'Complete Project Documentation',
      'Multiple Payment Gateways',
      'Extended Maintenance (Up to 5 Years)',
      'Free 1-Year VPS Subscription',
      'Advanced Security Setup',
      'Priority Support & Consultation',
      'And more...',
    ],
  },
];

// --- SPLASH SCREEN LOADER (Matching Padilla HelpDesk) ---
function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1900);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#09090b] animate-splash-out pointer-events-none"
    >
      <div className="loader-wrapper">
        <span className="loader-letter">L</span>
        <span className="loader-letter">o</span>
        <span className="loader-letter">a</span>
        <span className="loader-letter">d</span>
        <span className="loader-letter">i</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">g</span>

        <div className="loader-bg-1" />
        <div className="loader-bg-2" />
        <div className="loader" />
      </div>
    </div>
  );
}

// --- MOUSE TRAIL EFFECT (Code Tokens) ---
function MouseTokenTrail() {
  const tokens = ['const', '<div>', '=>', 'async', 'return', 'state', '01', 'true', '<AC />', 'npm dev', 'function', '{...}', 'class', 'await'];
  const colors = [
    ['#34d399', 'rgba(52, 211, 153, 0.6)'],
    ['#38bdf8', 'rgba(56, 189, 248, 0.6)'],
    ['#fbbf24', 'rgba(251, 191, 36, 0.6)'],
    ['#fb7185', 'rgba(251, 113, 133, 0.6)'],
    ['#c084fc', 'rgba(192, 132, 252, 0.6)'],
  ];
  const lastSpawn = useRef(0);

  useEffect(() => {
    function handleMouseMove(e) {
      const now = Date.now();
      if (now - lastSpawn.current < 90) return;
      lastSpawn.current = now;

      const span = document.createElement('span');
      span.className = 'mt-token';
      span.innerText = tokens[Math.floor(Math.random() * tokens.length)];
      const [tokenColor, tokenGlow] = colors[Math.floor(Math.random() * colors.length)];
      span.style.left = `${e.clientX}px`;
      span.style.top = `${e.clientY}px`;
      span.style.setProperty('--token-color', tokenColor);
      span.style.setProperty('--token-glow', tokenGlow);
      span.style.setProperty('--dx', `${(Math.random() - 0.5) * 40}px`);
      span.style.setProperty('--dy', `${-25 - Math.random() * 30}px`);

      document.body.appendChild(span);
      setTimeout(() => {
        span.remove();
      }, 800);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const savedTheme = window.localStorage.getItem('ac-theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    const root = document.body;
    root.classList.toggle('light-theme', !isDark);
    window.localStorage.setItem('ac-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <label className="theme-switch" aria-label="Toggle dark mode">
      <input
        type="checkbox"
        className="theme-switch__checkbox"
        checked={!isDark}
        onChange={() => setIsDark((prev) => !prev)}
      />
      <div className="theme-switch__container">
        <div className="theme-switch__clouds" />
        <div className="theme-switch__stars-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor" />
          </svg>
        </div>
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            <div className="theme-switch__moon">
              <div className="theme-switch__spot" />
              <div className="theme-switch__spot" />
              <div className="theme-switch__spot" />
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}

// --- NAVBAR ---
function Navbar({ onOpenChat, onOpenBrandSummary }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#team' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3.5 transition-all duration-300 ${scrolled ? 'header-shell-scrolled' : ''}`}>
      <div className={`mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 transition-all duration-500 ${scrolled ? 'header-scrolled glass-nav shadow-2xl rounded-none' : 'max-w-6xl rounded-full bg-transparent'}`}>
        
        {/* Brand Logo */}
        <button
          type="button"
          onClick={onOpenBrandSummary}
          className="nav-logo-button"
          aria-label="Read about AC: Apex of Champions"
          aria-haspopup="dialog"
          aria-controls="brandSummaryModal"
        >
          <span className="nav-brand-logo" aria-hidden="true">
            <video
              className="nav-brand-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="./images/animation/animation.mp4" type="video/mp4" />
            </video>
            <span className="nav-brand-core">
              <span className="nav-brand-ac">AC</span>
              <span className="nav-brand-title">APEX OF<br />CHAMPIONS</span>
            </span>
          </span>
        </button>

        {/* Desktop Nav Pills */}
        <nav className="hidden md:flex items-center gap-1 nav-pill rounded-full px-3 py-1">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="hidden sm:inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-zinc-950 transition-all duration-200 hover:opacity-90 hover:scale-105"
          >
            Get Started
          </a>

          <button
            type="button"
            className="md:hidden text-zinc-400 hover:text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-18 glass-nav rounded-2xl p-6 border border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-emerald-400 py-2 border-b border-zinc-800/50"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="mt-2 w-full text-center py-2.5 rounded-full bg-emerald-500 font-semibold text-zinc-950 text-xs"
            >
              Ask Our Team
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// --- HERO SECTION ---
function HeroSection({ onOpenChat, onSelectProject }) {
  const heroRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frameId = 0;

    const updateHero = () => {
      if (!heroRef.current) return;
      const scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      const shift = Math.min(window.scrollY * 0.08, 36);
      heroRef.current.style.setProperty('--hero-shift', `${shift}px`);
      heroRef.current.style.setProperty('--hero-fade', `${scrollProgress * 0.65}`);
      heroRef.current.style.setProperty('--hero-blur', `${scrollProgress * 10}px`);
      heroRef.current.style.setProperty('--hero-scale', `${1 - scrollProgress * 0.05}`);
      heroRef.current.style.setProperty('--hero-opacity', `${1 - scrollProgress * 0.5}`);
      heroRef.current.style.setProperty('--hero-content-opacity', `${Math.max(0.1, 1 - window.scrollY / 420)}`);
      heroRef.current.style.setProperty('--hero-content-shift', `${Math.min(window.scrollY * -0.12, -42)}px`);
      frameId = requestAnimationFrame(updateHero);
    };

    frameId = requestAnimationFrame(updateHero);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section ref={heroRef} id="top" className="home-layer hero-section relative pt-36 sm:pt-44 pb-20 lg:pb-32 overflow-hidden">
      <div className="hero-gallery-layer">
        <HomeLogoCard />
      </div>
      {/* Background Ambient Lights */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] glow-emerald opacity-60 blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-40 right-10 w-[400px] h-[400px] glow-subtle opacity-50 blur-2xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full hero-content-layer">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Actions */}
          <div className="hero-copy lg:col-span-7 space-y-6">
            
            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-light text-white tracking-tight leading-[1.06]">
                AC: Apex of<br />Champions
              </h1>
              <p className="accent-serif text-4xl sm:text-5xl lg:text-[62px] leading-[1.06] text-white">
                <span className="text-emerald-400">Your Solution</span>
              </p>
            </div>

            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              A Multidisciplinary Technology Development Team
            </h2>

            {/* Team Identity Meta Line */}
            <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-zinc-400">
              <span className="font-semibold text-zinc-200">Joshua Anderson Padilla</span>
              <span>·</span>
              <span>Full Stack Developer</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <MapPin size={13} className="text-emerald-400" />
                svgBulacan, Philippines
              </span>
            </div>

            {/* Paragraph Summary */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              AC: Apex of Champions is a collaborative group of developers, researchers, and innovators focused on creating modern technology solutions in software development, embedded systems, mobile applications, and web technologies.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="btn-emerald text-xs sm:text-sm inline-flex items-center gap-2"
              >
                View Projects
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-4 text-zinc-400">
              <a
                href="mailto:apexofchampions@gmail.com"
                aria-label="Email AC"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/40 hover:scale-110 transition-all"
              >
                <Mail size={15} />
              </a>
              <a
                href="https://wa.me/639553983149"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp AC"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/40 hover:scale-110 transition-all"
              >
                <Phone size={15} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587213903017"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Page"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/40 hover:scale-110 transition-all"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/40 hover:scale-110 transition-all"
              >
                <Code2 size={15} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function HomeLogoCard() {
  const faceRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!faceRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width;
    const vertical = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (horizontal - 0.5) * 20;
    const rotateX = (0.5 - vertical) * 20;
    faceRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = () => {
    if (faceRef.current) faceRef.current.style.transform = '';
  };

  return (
    <div className="home-logo-card-container">
      <div
        className="home-logo-card-canvas"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className="home-logo-card-face" ref={faceRef}>
          <img src="./images/favicon.png" alt="AC: Apex of Champions" />
        </div>
      </div>
    </div>
  );
}

// --- VENETIAN BLIND IMAGE COMPONENT ---
const SLAT_COUNT = 10;

function BlindImage({ src, alt, activeIndex }) {
  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover filter contrast-[1.05] brightness-90"
    />
  );
}

// --- 3D BOOKS SHOWCASE FEATURED PROJECTS ---
const projectBooks = projectsData.map((project) => ({
  id: String(project.id),
  title: project.title,
  author: `Lead by ${project.lead || 'Ken'}`,
  year: '2024',
  stars: 5,
  desc: project.shortDesc,
  category: project.category,
  lead: project.lead || 'Ken',
  facebookUrl: project.facebookUrl || 'https://www.facebook.com/share/p/19KRBGUcJ5/',
  tech: project.tech,
  gallery: project.gallery,
  accentColor: project.accentColor || '#10b981',
  chapters: project.tech,
  edge: project.accentColor || '#10b981',
  spineBg: '#111726',
  spineInk: '#ffffff',
  spineFont: '700 36px sans-serif',
  backBg: '#0f1420',
  backInk: '230,230,230',
  images: {
    front: project.image,
    back: project.gallery?.[0] || project.image,
  },
  front: (ctx, w, h) => {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#162033');
    bgGrad.addColorStop(0.5, '#0d1422');
    bgGrad.addColorStop(1, '#080c16');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Accent top banner
    ctx.fillStyle = project.accentColor || '#10b981';
    ctx.fillRect(0, 0, w, 20);

    // Category tag pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(80, 80, w - 160, 64, 32);
    else ctx.fillRect(80, 80, w - 160, 64);
    ctx.fill();
    ctx.fillStyle = project.accentColor || '#10b981';
    ctx.font = '700 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(project.category.toUpperCase(), w / 2, 122);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px sans-serif';
    const words = project.title.split(' ');
    let line = '';
    const lines = [];
    words.forEach((word) => {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > w * 0.82 && line) {
        lines.push(line);
        line = word;
      } else line = test;
    });
    if (line) lines.push(line);
    const startY = 320;
    lines.forEach((l, i) => ctx.fillText(l, w / 2, startY + i * 68));

    // Accent divider
    ctx.strokeStyle = project.accentColor || '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 100, startY + lines.length * 68 + 24);
    ctx.lineTo(w / 2 + 100, startY + lines.length * 68 + 24);
    ctx.stroke();

    // Lead
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 32px sans-serif';
    ctx.fillText(`Lead by ${project.lead || 'Ken'}`, w / 2, startY + lines.length * 68 + 84);

    // Tech tags
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '500 24px monospace';
    ctx.fillText(project.tech.slice(0, 4).join(' • '), w / 2, h - 140);

    // Brand footer
    ctx.fillStyle = project.accentColor || '#10b981';
    ctx.font = '800 26px sans-serif';
    ctx.fillText('AC: APEX OF CHAMPIONS', w / 2, h - 80);
  },
  project: project,
}));

function FeaturedProjectsShowcase({ onSelectProject }) {
  const [activeProject, setActiveProject] = useState(projectsData[0]);

  return (
    <section id="projects" className="projects-layer py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Portfolio</p>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
              A few systems, apps, and experiences we have built from first sketch to launch. Click any 3D book to open its interactive detail view, tech stack, and full modal specs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectProject(activeProject || projectsData[0])}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900/90 px-4 py-2.5 text-xs font-medium text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/15 hover:border-emerald-500/60 transition-all shadow-lg cursor-pointer"
            >
              View project details modal <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Books Showcase Perspective Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[660px] sm:h-[720px] lg:h-[780px] w-full rounded-3xl overflow-hidden border border-zinc-800/80 bg-[#090d16]/95 shadow-[0_30px_100px_rgba(0,0,0,0.85)]">
          <BooksShowcase
            books={projectBooks}
            heroTitle="PORTFOLIO"
            navTitle="AC APEX • FEATURED PROJECTS"
            showNav={true}
            showDetailPanel={true}
            showCarousel={true}
            onBookSelect={(book) => {
              if (book?.project) setActiveProject(book.project);
            }}
            onOpenModal={(project) => {
              onSelectProject(project);
            }}
            themeColors={{
              navy: '#090d16',
              pink: '#10b981',
              cream: '#ffffff',
              lav: '#94a3b8',
              peri: '#059669',
              bgDark: '#090d16',
              bgLight: '#090d16',
              foregroundDark: '#fafafa',
              foregroundLight: '#fafafa',
            }}
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}

const ProjectsCoverflow = FeaturedProjectsShowcase;

// --- SKILLS & TECHNOLOGIES INFINITE MARQUEE ---
function SkillsMarquee() {
  return (
    <section id="skills" className="py-16 border-y border-zinc-900 bg-zinc-950/40 relative">
      <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
        <h2 className="text-xl sm:text-2xl font-light text-zinc-300 tracking-tight">
          Skills & Technologies
        </h2>
      </div>

      <div className="w-full overflow-hidden relative">
        {/* Subtle Edge Gradients */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#09090b] to-transparent z-10" />

        {/* Marquee Track */}
        <div className="marquee-content gap-8 sm:gap-12 py-2">
          {[...techStack, ...techStack].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/40 hover:bg-zinc-800/50 transition-all cursor-default shrink-0 group"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- WHAT WE CAN BUILD ---
function WhatWeCanBuild({ onOpenChat }) {
  const swingRef = useRef({ angle: 0, velocity: 0, dragging: false, startX: 0, startAngle: 0, lastAngle: 0 });
  const [swingAngle, setSwingAngle] = useState(0);

  useEffect(() => {
    let frameId = 0;
    let lastTime = performance.now();

    const animateSwing = (time) => {
      const elapsed = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const swing = swingRef.current;

      if (!swing.dragging) {
        swing.velocity += (-18 * swing.angle - 4.5 * swing.velocity) * elapsed;
        swing.angle += swing.velocity * elapsed;
        if (Math.abs(swing.angle) < 0.0005 && Math.abs(swing.velocity) < 0.0005) {
          swing.angle = 0;
          swing.velocity = 0;
        }
        setSwingAngle(swing.angle);
      }

      frameId = requestAnimationFrame(animateSwing);
    };

    frameId = requestAnimationFrame(animateSwing);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleCardPointerDown = (event) => {
    const swing = swingRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
    swing.dragging = true;
    swing.startX = event.clientX;
    swing.startAngle = swing.angle;
    swing.lastAngle = swing.angle;
  };

  const handleCardPointerMove = (event) => {
    const swing = swingRef.current;
    if (!swing.dragging) return;
    const nextAngle = Math.max(-0.65, Math.min(0.65, swing.startAngle - (event.clientX - swing.startX) / 240));
    swing.velocity = (nextAngle - swing.lastAngle) * 12;
    swing.lastAngle = nextAngle;
    swing.angle = nextAngle;
    setSwingAngle(nextAngle);
  };

  const handleCardPointerUp = (event) => {
    const swing = swingRef.current;
    if (swing.dragging) event.currentTarget.releasePointerCapture(event.pointerId);
    swing.dragging = false;
  };

  const capabilities = [
    {
      icon: Monitor,
      title: 'Web Development',
      desc: 'Websites and web apps built for how your business actually runs — from a simple first version to a full system. Secure, and fully yours to own.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      desc: 'Apps that feel native on both iOS and Android from a single build, so you reach your customers wherever they are.',
    },
    {
      icon: Gamepad2,
      title: 'Game Development',
      desc: 'Playable 2D and 3D games for web and mobile — from prototype and art through to release.',
    },
    {
      icon: Cpu,
      title: 'Custom Systems & AI Integration',
      desc: 'POS, HR, inventory and school systems shaped around your workflow, with AI assistants and automation built in.',
    },
  ];

  return (
    <section id="services" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-14">
        <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Capabilities</p>
        <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
          What We Can Build
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Lead Portrait with Floating Badges & Stats */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[440px] aspect-[4/5] overflow-visible flex flex-col items-center justify-end">
            
            <div
              className="absolute inset-x-5 top-3 bottom-3 z-10 flex flex-col items-center cursor-grab active:cursor-grabbing"
              onPointerDown={handleCardPointerDown}
              onPointerMove={handleCardPointerMove}
              onPointerUp={handleCardPointerUp}
              onPointerCancel={handleCardPointerUp}
              style={{
                touchAction: 'none',
                transform: `rotate(${swingAngle * (180 / Math.PI)}deg)`,
                transformOrigin: 'top center',
                willChange: 'transform'
              }}
            >
              <span className="hanging-card-flare hanging-card-flare-left" aria-hidden="true" />
              <span className="hanging-card-flare hanging-card-flare-right" aria-hidden="true" />
              <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600 shadow-lg" />
              <div className="w-1 h-9 bg-zinc-800 rounded-full shadow-inner" />

              <div className="relative w-full max-w-[300px] h-[460px] flex-none rounded-[1.6rem] overflow-hidden bg-zinc-950 border border-white/20 shadow-2xl">
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 w-8 h-2 rounded-full bg-black/80 border border-white/30" />
                <div className="h-[62%] relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-500 to-zinc-950">
                  <img src="./images/favicon.png" alt="AC: Apex of Champions" className="w-full h-full object-contain p-8" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-emerald-500/10 to-transparent" />
                  {capabilities.map(({ icon: ServiceIcon, title }, index) => (
                    <div
                      key={title}
                      title={title}
                      className={`absolute z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/60 bg-sky-500/20 text-sky-300 shadow-[0_0_18px_rgba(14,165,233,0.35)] ${[
                        'left-4 top-8',
                        'right-4 top-8',
                        'right-12 top-32',
                        'left-4 bottom-8'
                      ][index]}`}
                    >
                      <ServiceIcon size={19} />
                    </div>
                  ))}
                </div>
                <div className="h-[38%] bg-zinc-950 px-4 py-3 flex flex-col gap-2">
                  <div className="grid grid-cols-4 gap-2 border-t border-zinc-800 pt-3 text-center">
                    <div className="min-w-0 h-20 rounded-xl border border-zinc-800 bg-zinc-900/70 px-1.5 py-2 flex flex-col items-center justify-center shadow-inner">
                      <p className="text-xl font-bold leading-none text-white">30+</p>
                      <p className="mt-2 text-[8px] leading-tight text-zinc-400">Projects Completed</p>
                    </div>
                    <div className="min-w-0 h-20 rounded-xl border border-zinc-800 bg-zinc-900/70 px-1.5 py-2 flex flex-col items-center justify-center shadow-inner">
                      <p className="text-xl font-bold leading-none text-white">30</p>
                      <p className="mt-2 text-[8px] leading-tight text-zinc-400">Total Reviews</p>
                    </div>
                    <div className="min-w-0 h-20 rounded-xl border border-zinc-800 bg-zinc-900/70 px-1.5 py-2 flex flex-col items-center justify-center shadow-inner">
                      <p className="text-xl font-bold leading-none text-white">4+</p>
                      <p className="mt-2 text-[8px] leading-tight text-zinc-400">Years Experience</p>
                    </div>
                    <div className="min-w-0 h-20 rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-1.5 py-2 flex flex-col items-center justify-center shadow-inner">
                      <p className="text-xl font-bold leading-none text-emerald-400">99%</p>
                      <p className="mt-2 text-[8px] leading-tight text-emerald-200/70">Client Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
              <span className="hanging-card-flare hanging-card-flare-bottom-left" aria-hidden="true" />
              <span className="hanging-card-flare hanging-card-flare-bottom-right" aria-hidden="true" />
            </div>

          </div>
        </div>

        {/* Right Column: 2x2 Feature Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                className="dark-card p-6 flex flex-col justify-between group hover:border-emerald-500/40"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {cap.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="text-xs font-semibold text-zinc-300 hover:text-emerald-400 flex items-center gap-1.5 transition-colors self-start"
                >
                  Learn more <ArrowUpRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// --- HOW WE'LL WORK TOGETHER (ROADMAP TIMELINE) ---
function WorkRoadmap() {
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const progressMarkerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    let frameId = 0;

    const updateTimelineProgress = () => {
      const timeline = timelineRef.current;
      const progressLine = progressLineRef.current;
      const progressMarker = progressMarkerRef.current;
      if (!timeline || !progressLine || !progressMarker) return;

      const bounds = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.84;
      const progress = Math.min(
        Math.max((start - bounds.top) / Math.max(bounds.height + window.innerHeight * 0.6, 1), 0),
        1
      );
      const pathLength = progressLine.getTotalLength();
      progressLine.style.strokeDasharray = '1';
      progressLine.style.strokeDashoffset = `${1 - progress}`;
      const point = progressLine.getPointAtLength(pathLength * progress);
      progressMarker.setAttribute('cx', `${point.x}`);
      progressMarker.setAttribute('cy', `${point.y}`);
      const nextActiveStep = progress <= 0
        ? -1
        : Math.min(workflowSteps.length - 1, Math.floor(progress * workflowSteps.length));
      setActiveStep((currentStep) => currentStep === nextActiveStep ? currentStep : nextActiveStep);
      frameId = requestAnimationFrame(updateTimelineProgress);
    };

    frameId = requestAnimationFrame(updateTimelineProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section id="roadmap" className="py-24 bg-zinc-950/50 border-t border-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Career</p>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            Career Journey
          </h2>
          <p className="mt-3 text-sm text-zinc-400">An evolving path of leadership, innovation, and impact</p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Thick hand-drawn progress path */}
          <svg
            className="absolute inset-0 z-0 h-full w-full overflow-visible pointer-events-none"
            viewBox="0 0 200 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M100 0 C100 65 135 65 135 125 C135 185 70 165 70 245 C70 315 135 285 135 370 C135 455 70 430 70 520 C70 610 135 580 135 680 C135 775 70 750 70 835 C70 915 100 950 100 1000"
              fill="none"
              stroke="#27272a"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              ref={progressLineRef}
              d="M100 0 C100 65 135 65 135 125 C135 185 70 165 70 245 C70 315 135 285 135 370 C135 455 70 430 70 520 C70 610 135 580 135 680 C135 775 70 750 70 835 C70 915 100 950 100 1000"
              pathLength="1"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="9"
              strokeLinecap="round"
              style={{ strokeDasharray: 1, strokeDashoffset: 1, filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.65))' }}
            />
            <circle
              ref={progressMarkerRef}
              cx="100"
              cy="0"
              r="9"
              fill="#3b82f6"
              stroke="#dbeafe"
              strokeWidth="3"
              style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.9))' }}
            />
          </svg>

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {workflowSteps.map((step, idx) => {
              const isRight = step.side === 'right';
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isRight ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Dot */}
                  <div className={`absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-zinc-950 border-2 flex items-center justify-center text-xs font-bold z-30 shadow-lg font-mono-code transition-all duration-300 ${
                    idx <= activeStep ? 'border-emerald-300 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.5)]' : 'border-zinc-700 text-zinc-500'
                  }`}>
                    {step.step}
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Card Content */}
                  <div
                    className={`pl-12 sm:pl-0 sm:w-1/2 ${
                      isRight ? 'sm:pl-10' : 'sm:pr-10'
                    }`}
                  >
                    <div className={`relative z-10 dark-card p-6 border-zinc-800/90 hover:border-emerald-500/40 transition-all duration-500 ${
                      idx <= activeStep
                        ? 'border-emerald-500/50 shadow-[0_0_24px_rgba(16,185,129,0.12)] opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          {step.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MEET OUR TEAM ---
function TeamSection() {
  return (
    <ModernCarousel
      items={teamMembers}
      watermarkTitle="OUR TEAM"
      badge=""
      heading=""
      subtitle=""
    />
  );
}

// --- TECHNICAL EXPERTISE ---
function TechnicalExpertiseSection() {
  return (
    <section id="technical-expertise" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center lg:text-left">
        <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Technical Expertise</p>
        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
          Technologies & Expertise
        </h2>
        <p className="mt-4 max-w-3xl text-sm sm:text-base text-zinc-400 leading-relaxed">
          A multidisciplinary stack of technologies used in mobile development, embedded systems, software engineering, and modern web solutions.
        </p>
      </div>

      <div className="space-y-8">
        {technicalExpertiseGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">{group.title}</h3>
            <p className="max-w-3xl text-xs sm:text-sm text-zinc-400 leading-relaxed">{group.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {group.items.map((item) => (
                <div key={`${group.title}-${item.name}`} className="tech-card-wrapper noselect">
                  <div className="tech-card-canvas" aria-label={item.name}>
                    {Array.from({ length: 25 }).map((_, index) => (
                      <div key={`${item.name}-tracker-${index}`} className={`tech-tracker tr-${index + 1}`} />
                    ))}
                    <div className="tech-card-shell">
                      <div className="tech-card-content">
                        <div className="tech-card-glare" />
                        <div className="tech-card-lines">
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>

                        <div className="tech-card-icon-wrap">
                          <img src={item.icon} alt={item.name} className="tech-card-icon" />
                        </div>

                        <div className="tech-card-title-wrap">
                          <div className="tech-card-title">{item.name}</div>
                        </div>

                        <div className="tech-card-glowing-elements">
                          <div className="tech-glow-1" />
                          <div className="tech-glow-2" />
                          <div className="tech-glow-3" />
                        </div>

                        <div className="tech-card-subtitle">
                          <span>{item.description}</span>
                        </div>

                        <div className="tech-card-particles">
                          <span /><span /><span /><span /><span /><span />
                        </div>

                        <div className="tech-card-corner-elements">
                          <span /><span /><span /><span />
                        </div>

                        <div className="tech-card-scan-line" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- FREQUENTLY ASKED QUESTIONS ---
function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const questions = [
    ['How long does a project take?', 'Most projects take 2 to 6 weeks depending on scope, feedback, and integrations.'],
    ['What services do you provide?', 'We build websites, web systems, mobile apps, games, custom software, and AI-powered workflows.'],
    ['How much does a website cost?', 'Projects start at the Basic package range. We provide a written scope and fixed quote after the initial consultation.'],
    ['Can you redesign an existing website?', 'Yes. We can improve the visual design, content structure, performance, and mobile experience of an existing site.'],
    ['Do you provide maintenance?', 'Yes. Every launch includes 30 days of free fixes, with optional ongoing maintenance afterward.'],
  ];

  return (
    <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">FAQ</p>
        <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">Questions, answered.</h2>
      </div>
      <div className="border-t border-zinc-800">
        {questions.map(([question, answer], index) => {
          const isOpen = openQuestion === index;
          return (
            <div key={question} className="border-b border-zinc-800">
              <button
                type="button"
                onClick={() => setOpenQuestion(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
                aria-expanded={isOpen}
              >
                <span>{question}</span>
                <span className={`faq-icon text-emerald-400 text-xl font-light ${isOpen ? 'is-open' : ''}`}>+</span>
              </button>
              <div className={`faq-answer ${isOpen ? 'is-open' : ''}`}>
                <p className="pb-5 pr-10 text-sm leading-relaxed text-zinc-400">{answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// --- PROMOTIONAL SHOWCASE BANNER ---
function PromoBanner({ onOpenChat }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
        
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 glow-emerald opacity-30 blur-2xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-xs font-bold text-amber-400 tracking-wider flex items-center gap-2">
              <span>&gt;&gt;&gt;</span> NOW ACCEPTING <span>&gt;&gt;&gt;</span>
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              SOFTWARE DEVELOPMENT PROJECTS!
            </h2>

            {/* Platforms pills */}
            <div className="flex flex-wrap gap-2 pt-2 text-xs font-medium text-zinc-300">
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60">📱 Mobile Apps</span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60">🖥 Desktop Software</span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60">🌐 Web Applications</span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60">⚡ AI Systems</span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60">🎮 Game Dev</span>
            </div>

            <p className="text-xs text-zinc-400 pt-1 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              We have completed many successful projects with satisfied clients.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
            <button
              type="button"
              onClick={onOpenChat}
              className="btn-emerald text-xs sm:text-sm inline-flex items-center gap-2"
            >
              Start Your Project <ArrowUpRight size={16} />
            </button>
            <span className="text-[11px] text-zinc-400 font-mono-code">
              apexofchampions.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- READY TO BUILD SOMETHING GREAT? CTA ---
function CtaSection({ onOpenChat }) {
  return (
    <section className="py-24 max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-8">
        Ready to build something<br />great?
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <button
          type="button"
          onClick={onOpenChat}
          className="btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
        >
          <Mail size={15} /> Get In Touch
        </button>
        <a
          href="#projects"
          className="btn-outline text-xs sm:text-sm inline-flex items-center gap-2"
        >
          <Layers size={15} /> View My Work
        </a>
      </div>

      <p className="text-xs text-zinc-400">
        Scope and quote in 24 hours · No surprise fees later · 30 days of free fixes
      </p>
    </section>
  );
}

// --- RECOGNITION & AWARDS ---
const achievements = [
  { icon: '✓', title: 'Thesis Project Award - Outstanding Capstone Innovation in Mobile and Embedded Systems', description: 'Recognized for building a research-driven system that combines mobile application development, embedded hardware, and practical technology deployment.' },
  { icon: '✓', title: 'Successfully Defended Capstone Thesis (With High Distinction)', description: 'Completed the capstone defense with strong technical presentation, research explanation, and system demonstration before an academic panel.' },
  { icon: '⚙', title: 'Regional Robotics Competition Champion (Division Level)', description: 'Earned champion recognition through robotics design, automation logic, hardware control, and real-time problem solving during competition.' },
  { icon: '◆', title: 'Most Innovative Product Award - Capstone Project Showcase', description: 'Awarded for presenting a technology product with practical value, strong system concept, and a clear connection between research and implementation.' },
  { icon: '●', title: "Customer's Choice Award - Mobile Application Development Exhibit", description: 'Selected through exhibit engagement and audience interest, showing that the application concept was understandable, useful, and appealing to users.' },
  { icon: '▣', title: 'Best Capstone Research Presentation Award', description: 'Recognized for communicating the research problem, methodology, system design, results, and recommendations in a clear and professional way.' },
  { icon: '⌁', title: 'Outstanding Performance in Software Engineering and Embedded Systems Development', description: 'Acknowledged for consistent technical execution across software architecture, hardware integration, testing, and prototype improvement.' },
  { icon: '◇', title: 'University Innovation Expo Finalist - Mobile & IoT Solutions Category', description: 'Reached finalist status by presenting a project concept with innovation potential, technical feasibility, and relevance to mobile and IoT applications.' },
  { icon: '✦', title: "President's List Award for Academic Excellence in Information Technology", description: 'Recognized for strong academic performance, discipline, and consistency in information technology coursework and project requirements.' },
  { icon: '✧', title: 'Best Team Leadership Recognition in Capstone Development Project', description: 'Recognized for guiding planning, task coordination, technical decisions, and team communication throughout the development process.' },
];

const achievementPhotos = [
  { src: './images/1st.jpg', alt: 'AC recognition portrait' },
  { src: './images/1st1.jpg', alt: 'AC achievement event' },
  { src: './images/ac-team.png', alt: 'AC team achievement' },
  { src: './images/barcode-system.jpg', alt: 'Barcode and facial recognition system' },
  { src: './images/genspe-game.jpg', alt: 'GenSpe educational game project' },
];

function AchievementsSection() {
  const [activeAchievement, setActiveAchievement] = useState(0);
  const visibleAwardCount = Math.min(achievements.length, achievementPhotos.length);
  const activePhoto = activeAchievement;

  const showNextPhoto = () => {
    setActiveAchievement((currentAchievement) => (currentAchievement + 1) % visibleAwardCount);
  };

  return (
    <section id="achievements" className="py-24 bg-zinc-950/50 border-y border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">Achievements</p>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">Recognition &amp; Awards</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
            Recognition earned through innovation, research excellence, leadership in development projects, and participation in competitive technology and engineering events.
          </p>
        </div>

        <div className="awards-feature-layout grid grid-cols-1 gap-8 items-start">
          <figure
            className="relative mx-auto w-full max-w-[460px] rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl lg:sticky lg:top-28"
            role="button"
            tabIndex="0"
            onClick={showNextPhoto}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showNextPhoto();
              }
            }}
            aria-label={`Show next achievement photo: ${achievements[activeAchievement].title}`}
          >
            <div className="relative h-[340px] w-full sm:h-[400px] lg:h-[460px]">
              {achievementPhotos.map((photo, index) => {
                if (index === activePhoto) return null;
                const layerOffset = index > activePhoto ? index - activePhoto : index - activePhoto + achievementPhotos.length;
                return (
                  <img
                    key={`back-${photo.src}`}
                    src={photo.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full rounded-2xl border border-white/15 object-cover object-center opacity-65 shadow-xl transition-all duration-500"
                    style={{
                      zIndex: layerOffset,
                      transform: `translate(${(layerOffset % 2 ? 1 : -1) * layerOffset * 18}px, ${(layerOffset % 2 ? -1 : 1) * layerOffset * 14}px) scale(${1 - layerOffset * 0.035})`,
                      filter: `brightness(${1 - layerOffset * 0.08})`,
                    }}
                  />
                );
              })}
              <img
                src={achievementPhotos[activePhoto].src}
                alt={achievementPhotos[activePhoto].alt}
                className="relative z-10 m-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-2xl object-cover object-center transition-opacity duration-300 sm:m-6 sm:h-[calc(100%-3rem)] sm:w-[calc(100%-3rem)]"
                loading="lazy"
              />
              <span className="absolute right-3 bottom-20 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                Click for next photo
              </span>
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-5 pb-5 pt-16">
              <p className="text-xs uppercase tracking-widest text-emerald-400">{achievements[activeAchievement].icon} Achievement {activeAchievement + 1}</p>
              <p className="mt-1 text-sm font-semibold text-white">{achievements[activeAchievement].title}</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300">{achievements[activeAchievement].description}</p>
            </figcaption>
          </figure>

        </div>
      </div>
    </section>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer id="page-bottom" className="border-t border-zinc-900 bg-zinc-950 py-16 text-xs text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-zinc-900 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-lg border border-emerald-500/30 bg-zinc-900 shadow-[0_0_18px_rgba(16,185,129,0.18)]">
                <img src="./images/logo.jpg" alt="AC Logo" className="h-full w-full object-cover" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-display">
                AC: Apex of Champions
              </span>
            </div>
            <p className="font-semibold tracking-wide text-emerald-400">COMPANY REG NO. 2026070255753-17</p>
            <p className="max-w-md text-sm italic leading-relaxed text-zinc-300">
              Philippians 4:13 — &quot;I can do all things through Christ who strengthens me.&quot;
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Navigation</p>
            <ul className="space-y-2">
              <li><a href="#top" className="hover:text-white">About</a></li>
              <li><a href="#skills" className="hover:text-white">Technologies</a></li>
              <li><a href="#team" className="hover:text-white">Team</a></li>
              <li><a href="#projects" className="hover:text-white">Projects</a></li>
              <li><a href="#achievements" className="hover:text-white">Achievements</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Contact</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-emerald-400" />
                <span>apexofchampions@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-emerald-400" />
                <span>09975096733 / 09553983149</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={13} className="text-emerald-400" />
                <span>Isulan, Sultan Kudarat, Philippines</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© 2026 AC: Apex of Champions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// --- PROJECT DETAIL MODAL ---
function ProjectModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(project?.id === 1 ? 1 : 0);

  useEffect(() => {
    setActiveImageIndex(project?.id === 1 ? 1 : 0);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const projectImages = project.gallery?.length ? project.gallery : [project.image];
  const activeImage = projectImages[activeImageIndex] || projectImages[0];
  const projectLead = project.lead || 'Ken';
  const projectFacebookUrl = project.facebookUrl || 'https://www.facebook.com/share/p/19KRBGUcJ5/';
  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex - 1 + projectImages.length) % projectImages.length);
  };
  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % projectImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div className="relative w-full max-w-4xl rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="group absolute right-4 top-4 z-10 flex h-14 w-48 items-center justify-center rounded-2xl bg-white text-center text-xl font-semibold text-black shadow-lg transition duration-500 hover:brightness-105"
          aria-label="Close project viewer"
        >
          <div className="absolute left-1 top-[4px] z-10 flex h-12 w-1/4 items-center justify-center rounded-xl bg-green-400 duration-500 group-hover:w-[184px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px" aria-hidden="true">
              <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
              <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>

        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
            {project.category}
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {project.title}
          </h2>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-emerald-400">Lead by {projectLead}</p>
            <a
                href={projectFacebookUrl}
                target="_blank"
                rel="noreferrer"
                className="facebook-proof-link"
              >
                <img src="./images/facebook.png" alt="" className="h-5 w-5 object-contain" />
                View Facebook Post
                <ExternalLink size={13} />
            </a>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.shortDesc}
          </p>

          <div className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              <BlindImage src={activeImage} alt={`${project.title} image ${activeImageIndex + 1}`} activeIndex={activeImageIndex} />

              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-lg backdrop-blur-sm transition hover:border-emerald-400/60 hover:bg-emerald-500/15"
                aria-label="Previous project image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-lg backdrop-blur-sm transition hover:border-emerald-400/60 hover:bg-emerald-500/15"
                aria-label="Next project image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {projectImages.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-video overflow-hidden rounded-lg border transition ${index === activeImageIndex ? 'border-emerald-400 ring-1 ring-emerald-400/70' : 'border-zinc-800 opacity-70 hover:border-zinc-500 hover:opacity-100'}`}
                  aria-label={`Show project image ${index + 1}`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Technologies Used</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function PageScrollControls() {
  return (
    <div className="page-scroll-controls" aria-label="Page navigation">
      <a href="#top" className="unique-button page-scroll-button page-scroll-button-up" aria-label="Go to Home" title="Home">
        <Send size={19} />
      </a>
      <a href="#page-bottom" className="unique-button page-scroll-button page-scroll-button-down" aria-label="Go to bottom of page" title="Contact">
        <Send size={19} />
      </a>
    </div>
  );
}

// --- FLOATING "ASK OUR TEAM!" ASSISTANT ---
function ChatAssistant({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Floating speech bubble and avatar */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <div className="chat-speech-bubble" aria-hidden="true">
          Ask our team!
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="chat-avatar group"
          aria-label="Ask our team"
        >
          <span className="chat-avatar-mark">
            <video
              className="chat-avatar-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="./images/animation/animation.mp4" type="video/mp4" />
            </video>
            <span className="chat-avatar-core">
              <img src="./images/logo.jpg" alt="AC Logo" className="chat-avatar-logo" />
            </span>
          </span>
          <span className="chat-online-dot" aria-label="Online" />
        </button>
      </div>

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[320px] rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-full border border-cyan-400/70 bg-zinc-900 shadow-[0_0_18px_rgba(34,211,238,0.2)]">
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                >
                  <source src="./images/animation/animation.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-zinc-950/90">
                  <span className="text-[0.5rem] font-black tracking-[-0.14em] text-white">AC</span>
                </div>
              </div>
              <strong className="text-sm font-bold text-white">Inquiry</strong>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-zinc-300 py-3 leading-relaxed">
            Tell us about your digital project or thesis system, and our team will get back to you within 24 hours with a scope & quote!
          </p>

          <div className="space-y-2 pt-2">
            <a
              href="https://wa.me/639553983149"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-white hover:bg-zinc-800 hover:border-emerald-500/40 transition-all"
            >
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400" /> WhatsApp
              </span>
              <ArrowUpRight size={14} className="text-zinc-400" />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61587213903017"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-white hover:bg-zinc-800 hover:border-emerald-500/40 transition-all"
            >
              <span className="flex items-center gap-2">
                <MessageSquare size={14} className="text-sky-400" /> Facebook Messenger
              </span>
              <ArrowUpRight size={14} className="text-zinc-400" />
            </a>

            <a
              href="mailto:apexofchampions@gmail.com"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold hover:bg-emerald-400 transition-all"
            >
              <span className="flex items-center gap-2">
                <Mail size={14} /> Direct Email Inquiry
              </span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// --- BRAND SUMMARY MODAL ---
function BrandSummaryModal({ isOpen, onClose, onOpenChat }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div id="brandSummaryModal" role="dialog" aria-modal="true" className="brand-summary-panel">
        <div className="brand-summary-topbar">
          <button
            type="button"
            onClick={onClose}
            className="brand-back-button"
            aria-label="Back to portfolio"
          >
            <ChevronLeft size={15} />
            Back
          </button>

          <button
            type="button"
            onClick={onClose}
            className="brand-close-button"
            aria-label="Close company summary"
          >
            <X size={16} />
          </button>
        </div>

        <div className="brand-summary-layout">
          <div className="brand-summary-content">
            <div className="brand-summary-section">
              <p className="brand-summary-kicker">About us</p>
              <h3 className="brand-summary-title">AC: Apex of Champions</h3>
              <p className="brand-summary-intro">
                AC helps clients turn ideas into useful digital solutions through web systems, mobile applications, embedded projects, UI/UX design, graphics, documentation, and technology support.
              </p>
            </div>

            <div className="brand-summary-grid">
              <article className="brand-summary-card">
                <p className="brand-summary-label">AC</p>
                <h4>Flexible Like Alternating Current</h4>
                <p>AC is inspired by Alternating Current — a symbol of flexibility, adaptability, and the ability to move through multiple paths and solutions.</p>
              </article>

              <article className="brand-summary-card">
                <p className="brand-summary-label">Apex</p>
                <h4>Reaching The Highest Peak</h4>
                <p>Apex means the highest point. We keep improving, learning, and building stronger systems so every project rises toward its best version.</p>
              </article>

              <article className="brand-summary-card">
                <p className="brand-summary-label">Champions</p>
                <h4>Learning To Become Better</h4>
                <p>Champions keep learning, practicing, and growing. AC carries that mindset through teamwork, research, creativity, and commitment.</p>
              </article>
            </div>

            <div className="brand-summary-section">
              <p className="brand-summary-kicker">How we help</p>
              <h4 className="brand-summary-subheading">Built for real-world impact</h4>
              <ul className="brand-summary-list">
                <li>Clarifies project goals, features, workflows, and user needs.</li>
                <li>Helps businesses improve digital presence through websites, systems, dashboards, branding, and customer-friendly platforms.</li>
                <li>Designs clean UI/UX flows, prototypes, graphics, and visual materials.</li>
                <li>Develops web systems, mobile applications, embedded projects, portfolios, and academic technology systems.</li>
                <li>Supports students, startups, professionals, and organizations in turning ideas into polished, launch-ready solutions.</li>
              </ul>
            </div>

            <p className="brand-summary-footer">
              AC is built to rise with purpose, innovate with excellence, and grow with a champion spirit — crowned by God’s grace and committed to His glory.
            </p>
          </div>

          <div className="brand-summary-visual" aria-label="AC Apex of Champions logo panel">
            <div className="brand-summary-logo">
              <video
                className="brand-summary-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src="./images/animation/animation.mp4" type="video/mp4" />
              </video>
              <span className="brand-summary-core">
                <span className="brand-summary-ac">AC</span>
                <span className="brand-summary-subtitle">APEX OF<br />CHAMPIONS</span>
              </span>
            </div>
          </div>
        </div>

        <div className="brand-summary-actions">
          <a href="#contact" className="btn-emerald flex-1 text-center text-xs sm:text-sm" onClick={onClose}>
            Work With AC
          </a>
          <a href="mailto:apexofchampions@gmail.com" className="btn-outline flex-1 text-center text-xs sm:text-sm" onClick={onClose}>
            Email AC
          </a>
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ROOT ---
export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [brandSummaryOpen, setBrandSummaryOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('main > section, footer');
    const popTargets = document.querySelectorAll(
      'main > section h1, main > section h2, main > section h3, main > section h4, main > section p, main > section button, main > section a, main > section img, main > section .dark-card, main > section .project-index'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((section) => {
      section.classList.add('reveal-on-scroll');
      observer.observe(section);
    });

    popTargets.forEach((target, index) => {
      target.classList.add('pop-up-on-scroll');
      target.style.setProperty('--pop-delay', `${(index % 8) * 55}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-zinc-100 relative isolate font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      <BackgroundBoxes />
      {/* Splash Screen on load */}
      <SplashScreen />

      {/* Code Token Cursor Trail */}
      <MouseTokenTrail />
      <Navbar
        onOpenChat={() => setChatOpen(true)}
        onOpenBrandSummary={() => setBrandSummaryOpen(true)}
      />
      <PageScrollControls />
      
      <main>
        <div className="hero-project-stage">
          <HeroSection
            onOpenChat={() => setChatOpen(true)}
            onSelectProject={(p) => setSelectedProject(p)}
          />
          <ProjectsCoverflow
            onSelectProject={(p) => setSelectedProject(p)}
          />
        </div>
        <SkillsMarquee />
        <TechnicalExpertiseSection />
        <WhatWeCanBuild
          onOpenChat={() => setChatOpen(true)}
        />
        <WorkRoadmap />
        <TeamSection />
        <AchievementsSection />
        <FaqSection />
        <PromoBanner
          onOpenChat={() => setChatOpen(true)}
        />
        <CtaSection
          onOpenChat={() => setChatOpen(true)}
        />
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <BrandSummaryModal
        isOpen={brandSummaryOpen}
        onClose={() => setBrandSummaryOpen(false)}
        onOpenChat={() => {
          setBrandSummaryOpen(false);
          setChatOpen(true);
        }}
      />
      <ChatAssistant
        isOpen={chatOpen}
        setIsOpen={setChatOpen}
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Missing React root element');

const root = import.meta.hot?.data.root ?? createRoot(rootElement);
root.render(<App />);
if (import.meta.hot) import.meta.hot.data.root = root;
