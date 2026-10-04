import { Link } from "react-router-dom"
import { FolderOpen } from "lucide-react"
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path"

// The path starts off-screen left (-150), flows across the viewport in a dynamic loop,
// and swoops straight into the open mouth of the 3D tilted "View Gallery" folder on the right (~1090, 172).
// Crests are calibrated with generous top clearance so cards and hover states never get clipped.
const path =
  "M-150 210C-50 280 150 340 350 230C480 150 420 68 350 110C280 155 310 270 480 285C620 300 800 225 930 180C980 162 1035 166 1090 172"

export default function MarqueeAlongSvgPathDemo() {
  return (
    <div className="w-full bg-white overflow-hidden border-y border-slate-200 relative select-none py-4 sm:py-6">
      
      {/* ----------------------------------------------------
          LAYER 1 (z-[5]): Tilted Folder BACK PANEL
          Rendered behind marquee images so they slide OVER it
         ---------------------------------------------------- */}
      <div
        className="absolute right-2 sm:right-6 md:right-10 lg:right-14 top-1/2 -translate-y-1/2 z-[5] pointer-events-none"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="relative w-[160px] sm:w-[190px] md:w-[220px] lg:w-[245px] h-[200px] sm:h-[230px] md:h-[255px] lg:h-[275px]"
          style={{
            transform: "rotateY(-28deg) rotateX(5deg) rotateZ(-3deg)",
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Back Cover Body */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#732902] via-[#8C3403] to-[#541B00] shadow-[0_20px_45px_rgba(0,0,0,0.38)] border border-[#DF711B]/40 overflow-hidden">
            {/* Top Tab (Sticking out top right) */}
            <div className="absolute -top-[1px] right-5 h-7 px-3.5 bg-[#993A04] rounded-t-lg border-t-2 border-x border-[#FFD285]/40 flex items-center justify-center -translate-y-[100%] shadow-md">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFD285] font-extrabold">
                ARCHIVE
              </span>
            </div>

            {/* Folder Interior Depth (Dark shadow cavity where images slide in) */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/35 to-transparent" />

            {/* Subtle paper index lines inside */}
            <div className="absolute top-8 left-4 right-4 h-[1px] bg-white/10" />
            <div className="absolute top-14 left-4 right-4 h-[1px] bg-white/5" />
            <div className="absolute top-20 left-4 right-4 h-[1px] bg-white/5" />
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          LAYER 2 (z-[10]): MARQUEE STREAM
          Images enter from off-screen left and glide straight
          into the folder pocket on the right
         ---------------------------------------------------- */}
      <div className="relative z-10">
        <MarqueeAlongSvgPath
          path={path}
          viewBox="-150 0 1350 400"
          baseVelocity={6}
          slowdownOnHover={true}
          draggable={true}
          repeat={1}
          dragSensitivity={0.1}
          className="w-full h-[360px] sm:h-[420px] md:h-[460px] lg:h-[510px]"
          responsive
          grabCursor
          preserveAspectRatio="none"
        >
          {imgs.map((img, i) => (
            <Link
              to="/gallery"
              key={i}
              className="group block relative w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-2xl overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.22)] border-2 border-white/90 bg-neutral-900 hover:scale-125 hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)] hover:border-amber-300 duration-300 ease-out transition-all shrink-0 cursor-pointer"
              title={img.alt}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + "/images/banner-1.jpg") {
                    target.src = "/images/banner-1.jpg";
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none select-none"
                draggable={false}
              />
              {/* Subtle hover caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-end p-1.5">
                <span className="text-[9px] sm:text-[10px] font-sans font-semibold text-white leading-tight line-clamp-1 drop-shadow">
                  {img.alt}
                </span>
              </div>
            </Link>
          ))}
        </MarqueeAlongSvgPath>
      </div>

      {/* ----------------------------------------------------
          LAYER 3 (z-[20]): Tilted Folder FRONT POCKET FLAP
          Rendered IN FRONT of marquee images so they slide UNDER
          the lip and look like they are physically going INSIDE!
         ---------------------------------------------------- */}
      <Link
        to="/gallery"
        className="absolute right-2 sm:right-6 md:right-10 lg:right-14 top-1/2 -translate-y-1/2 z-20 group no-underline cursor-pointer"
        style={{
          perspective: "1000px",
        }}
        aria-label="View Full Gallery"
      >
        <div
          className="relative w-[160px] sm:w-[190px] md:w-[220px] lg:w-[245px] h-[200px] sm:h-[230px] md:h-[255px] lg:h-[275px] transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            transform: "rotateY(-28deg) rotateX(5deg) rotateZ(-3deg)",
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front Pocket Lip & Cover:
              Leaves the top ~25% open so the mouth and back panel are visible */}
          <div className="absolute bottom-0 inset-x-0 h-[75%] sm:h-[77%] rounded-b-2xl rounded-tr-2xl rounded-tl-lg bg-gradient-to-br from-[#E2731D] via-[#CD610D] to-[#9C3E08] shadow-[0_14px_35px_rgba(0,0,0,0.35),-10px_0_24px_rgba(0,0,0,0.25)] border-t-2 border-l border-r border-[#FFD285]/80 flex flex-col justify-between p-3.5 sm:p-5 overflow-hidden">
            
            {/* Illuminated Pocket Lip with shadow underneath */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#FFE7B8] via-[#FFB740] to-[#CD610D] shadow-[0_3px_10px_rgba(255,183,64,0.4)]" />

            {/* Diagonal cutout highlight on mouth entrance (left side) */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-white/25 to-transparent rounded-br-2xl pointer-events-none" />

            {/* Folder texture lines */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-full border-b border-white"
                  style={{ marginTop: `${18 + i * 20}px` }}
                />
              ))}
            </div>

            {/* Header: Icon + Live Pill */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group-hover:bg-white/30 transition-colors duration-300">
                <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm" />
              </div>

              <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.18em] text-[#FFD285] uppercase bg-black/30 px-2 py-0.5 rounded-full border border-[#FFD285]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                PHOTOS
              </span>
            </div>

            {/* Title: VIEW GALLERY */}
            <div className="relative z-10 my-auto text-left">
              <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.22em] text-[#FFD285] font-extrabold">
                EXPLORE
              </span>
              <span className="block text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-black text-white uppercase tracking-tight leading-tight mt-0.5 drop-shadow">
                VIEW
                <br />
                GALLERY
              </span>
            </div>

            {/* Footer: Open Album prompt */}
            <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-white/20">
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-white/90 group-hover:text-white transition-colors">
                Browse Album
              </span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#9C3E08] transition-all duration-300 shadow-sm">
                →
              </div>
            </div>

            {/* Interactive sheen on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* 3D Drop Shadow underneath the tilted folder */}
          <div
            className="absolute -bottom-3 left-4 right-2 h-6 bg-black/30 rounded-full blur-md pointer-events-none"
            style={{ transform: "rotateZ(3deg) scaleY(0.6)" }}
          />
        </div>
      </Link>

    </div>
  )
}

// Diverse school photographs with ZERO repetition across all faculties, labs, and activities
const imgs = [
  { src: "/images/banner-1.jpg", alt: "Chinmaya Vidyalaya Main Campus" },
  { src: "/images/chinmaya/sports/sports_athletic_meet_001.jpg", alt: "Athletic Championship" },
  { src: "/images/phys.jpeg", alt: "Physics Laboratory" },
  { src: "/images/CHEM1.jpeg", alt: "Chemistry Laboratory" },
  { src: "/images/chinmaya/cultural/cultural_celebration_015.jpg", alt: "Cultural Performance" },
  { src: "/images/biology-lab.jpg", alt: "Biology Laboratory" },
  { src: "/images/it-lab.jpg", alt: "Computer & Robotics Lab" },
  { src: "/images/lib.jpg", alt: "Central Library" },
  { src: "/images/banner-8.webp", alt: "Annual Sports Day" },
  { src: "/images/chinmaya-web-science.jpg", alt: "Science & Innovation Fair" },
  { src: "/images/guru-paduka-pooja.webp", alt: "Guru Paduka Pooja" },
  { src: "/images/tour.jpg", alt: "Educational Excursion" },
  { src: "/images/about2.jpeg", alt: "Academic Campus Wings" },
  { src: "/images/banner-4.jpeg", alt: "Value Education" },
  { src: "/images/chinmaya/leadership/principal_dimple_mistry.jpg", alt: "Principal & Leadership" },
  { src: "/images/1.jpeg", alt: "Morning Prayer Assembly" },
];
