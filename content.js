/*
  ALL PORTFOLIO CONTENT LIVES IN THIS FILE.
  Edit this file, commit, push. Vercel redeploys the site on its own.
  See README.md for step-by-step examples.
*/
window.PORTFOLIO = {
  // true = also show categories and sections that have no content yet (useful while you work).
  // false = hide anything empty, so the live site never looks unfinished.
  showEmptySections: false,

  profile: {
    name: "Md. Hasibul Hasan",
    role: "Product content · AI video · Motion graphics",
    location: "Dhaka, Bangladesh",
    photo: "images/hasib.jpg",
    lede: "Software engineer moving into product content. I make AI video, motion graphics and short-form reels. I am at entry level in video, and every piece here says how it was made.",
    about: [
      "I am a full-time Software Engineer at Red Data (Pvt.) Ltd. and I run a small digital agency, CTSBD. I build the products, and now I make the videos that explain them.",
      "I work with AI tools every day: Gemini for video, Claude for scripts, captions and animation code. I have not done professional shooting yet. Phone-shot product clips are the next thing I will add here."
    ]
  },

  // 1. SHOWREEL: the most important video on the page.
  showreel: {
    src: "videos/showreel.mp4",
    poster: "images/showreel.jpg",
    duration: 30, // seconds
    note: "30 seconds. AI video and motion graphics, cut to the beat. Every clip in it is listed below with how it was made.",
    // Each chapter is one cut. "t" is the second it starts. "cat" colours it like its category.
    chapters: [
      { t: 0,    label: "AI commercial · finished building", cat: "ads" },
      { t: 3.0,  label: "Intro reel · close-up",             cat: "short" },
      { t: 5.4,  label: "AI commercial · warehouse",          cat: "ads" },
      { t: 8.4,  label: "Motion graphics · kinetic headline", cat: "ads" },
      { t: 11.4, label: "Intro reel · editing timeline",      cat: "short" },
      { t: 14.4, label: "AI commercial · site engineer",      cat: "ads" },
      { t: 17.4, label: "Motion graphics · vertical type",    cat: "short" },
      { t: 20.4, label: "Motion graphics · skyline",          cat: "ads" },
      { t: 23.4, label: "Intro reel · at the desk",           cat: "short" },
      { t: 26.4, label: "Name and contact",                   cat: null }
    ]
  },

  // 2. CATEGORIES: the tracks your work is sorted into. Order here = order on the page.
  categories: [
    { id: "short",   track: "V1", label: "Short-form",           color: "#2fc6b4", blurb: "Reels, Shorts and TikTok. Fast cuts and text animation." },
    { id: "youtube", track: "V2", label: "YouTube videos",       color: "#f5c84c", blurb: "Vlogs, tech reviews, infographic and documentary style." },
    { id: "ads",     track: "V3", label: "Commercials and ads",  color: "#f08a4b", blurb: "Promo videos made for Facebook and YouTube ads." },
    { id: "events",  track: "V4", label: "Corporate and events", color: "#a08cff", blurb: "Seminars, company events and weddings." }
  ],

  // Every video. Use "src" for a file in /videos, or "youtube" for a YouTube video ID.
  work: [
    {
      category: "short",
      title: "Personal intro reel",
      src: "videos/ai-intro-reel.mp4",
      poster: "images/ai-intro-reel.jpg",
      ratio: "9:16",
      duration: 10,
      badge: "AI-generated",
      description: "A vertical intro for Reels and Shorts: at the desk, a move around to the editing timeline, then a close-up to camera.",
      made: "Generated with Google Gemini from my portrait photo and my written prompt. The office scene is AI-generated. It was not filmed."
    },
    {
      category: "short",
      title: "Kinetic type intro",
      src: "videos/intro-reel.mp4",
      poster: "images/intro-reel.jpg",
      ratio: "9:16",
      duration: 16,
      badge: "Motion graphics",
      description: "Large type fills the frame so it reads on a phone with the sound off. The numbers count up to hold attention in the first seconds.",
      made: "Animated in code with AI tools. Claude wrote the animation and the music synthesis under my direction; Python and FFmpeg rendered it. No stock footage or licensed music."
    },
    {
      category: "ads",
      title: "Building materials commercial",
      src: "videos/ai-brand-promo.mp4",
      poster: "images/ai-brand-promo.jpg",
      ratio: "16:9",
      duration: 10,
      badge: "AI-generated",
      description: "Three shots that tell one story: materials in a warehouse at sunrise, an engineer checking a blueprint on site, and the finished building at golden hour.",
      made: "Spec concept for my application to DJBM Building Materials, generated with Google Gemini from my written shot list. Not commissioned by DJBM. It does not show DJBM's real products, people or sites."
    },
    {
      category: "ads",
      title: "Brand promo, motion graphics",
      src: "videos/brand-promo.mp4",
      poster: "images/brand-promo.jpg",
      ratio: "16:9",
      duration: 20,
      badge: "Motion graphics",
      description: "Five scenes cut to a 100 BPM beat: logo reveal, kinetic headline, three value cards, a skyline that builds itself, and an end card.",
      made: "Spec concept using the name and tagline from DJBM's public hiring post. Not an official DJBM video. Animated in code with AI tools, rendered with Python and FFmpeg."
    }
  ],

  // 3. BEFORE / AFTER: empty for now. Add items like the examples in README.md.
  // type: "image" (two stills), "video" (two clips, same length) or "audio" (two sound files).
  beforeAfter: [
    // { type: "image", skill: "Color grading", title: "Street interview", before: "before-after/street-raw.jpg", after: "before-after/street-graded.jpg", note: "Shot flat on a phone, graded in DaVinci Resolve." },
    // { type: "audio", skill: "Audio clean-up", title: "Noisy voice-over", before: "before-after/vo-raw.mp3", after: "before-after/vo-clean.mp3", note: "Fan noise removed, voice levelled." }
  ],

  levels: [
    { level: "Working level", title: "AI content and motion graphics", text: "AI video from written prompts, scripts, captions and title animation produced with AI tools and code." },
    { level: "Learning",      title: "Timeline editing",               text: "Cuts, pacing to music, captions and export for each social format. I learn new software quickly." },
    { level: "Beginner",      title: "Shooting",                       text: "I have not shot professionally yet. Phone-shot product clips are next." }
  ],

  tools: ["Google Gemini (video)", "Claude", "Python", "FFmpeg", "Prompt writing", "React", "Next.js", "Tailwind CSS"],

  projects: [
    { title: "HairHub ERP System",   text: "Nine-module ERP for a multi-factory business.",                      url: "https://hasibul-hasan-portfolio-main.vercel.app/projects/hairhub-erp-system" },
    { title: "Internship Hub",       text: "Job platform with a Bengali and English interface.",                 url: "https://hasibul-hasan-portfolio-main.vercel.app/projects/internship-hub" },
    { title: "TrendHaus E-Commerce", text: "Storefront with cart, checkout, order tracking and coupons.",        url: "https://hasibul-hasan-portfolio-main.vercel.app/projects/trendhaus-e-commerce" },
    { title: "IMAP Service Platform", text: "Service marketplace with live GPS tracking and chat.",              url: "https://hasibul-hasan-portfolio-main.vercel.app/projects/imap-service-platform" }
  ],

  contact: [
    { label: "Email",              value: "mh.hasan14200@gmail.com",                 url: "mailto:mh.hasan14200@gmail.com" },
    { label: "Phone / WhatsApp",   value: "+880 1794-517497",                        url: "https://wa.me/8801794517497" },
    { label: "LinkedIn",           value: "md-hasibul-hasan-software-engineer97",    url: "https://www.linkedin.com/in/md-hasibul-hasan-software-engineer97" },
    { label: "Software portfolio", value: "hasibul-hasan-portfolio-main.vercel.app", url: "https://hasibul-hasan-portfolio-main.vercel.app/" },
    { label: "GitHub",             value: "github.com/hasib61714",                   url: "https://github.com/hasib61714" }
  ]
};
