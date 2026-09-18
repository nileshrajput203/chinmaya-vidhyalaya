import { Link } from "react-router-dom"
import { FolderOpen } from "lucide-react"
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path"

// The path starts off-screen left (-150), flows across the viewport in a dynamic loop,
// and swoops straight into the open mouth of the 3D tilted "View Gallery" folder on the right (~1080, 160).
const path =
  "M-150 180C-50 260 150 320 350 200C480 120 420 -20 350 30C280 80 310 240 480 270C620 290 800 215 930 170C980 152 1035 156 1090 162"

export default function MarqueeAlongSvgPathDemo() {
  return (
    <div className="w-full bg-[#FAF8F5] overflow-hidden border-y border-[#E7E2D8] relative select-none">
      
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
          viewBox="-150 -50 1350 380"
          baseVelocity={8}
          slowdownOnHover={true}
          draggable={true}
          repeat={2}
          dragSensitivity={0.1}
          className="w-full h-[340px] sm:h-[400px] md:h-[450px] lg:h-[500px]"
          responsive
          grabCursor
          preserveAspectRatio="none"
        >
          {imgs.map((img, i) => (
            <div
              key={i}
              className="w-16 h-16 sm:w-18 sm:h-18 hover:scale-125 duration-300 ease-in-out transition-transform"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.25)] border border-white/60"
                draggable={false}
              />
            </div>
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

// School-relevant stock images from Unsplash (verified, persistent URLs)
const imgs = [
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop",
    alt: "School classroom with students",
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop",
    alt: "Student studying at desk",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=200&h=200&fit=crop",
    alt: "Students walking in campus",
  },
  {
    src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&h=200&fit=crop",
    alt: "School books and stationery",
  },
  {
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=200&h=200&fit=crop",
    alt: "Kids in school activity",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=200&fit=crop",
    alt: "Children in classroom",
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=200&h=200&fit=crop",
    alt: "Student writing in notebook",
  },
  {
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=200&h=200&fit=crop",
    alt: "Library books on shelf",
  },
  {
    src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=200&fit=crop",
    alt: "Science laboratory equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1556103255-4443dbae8e5a?w=200&h=200&fit=crop",
    alt: "Children playing sports",
  },
  {
    src: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&h=200&fit=crop",
    alt: "Art and crafts activity",
  },
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop",
    alt: "Graduation celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=200&fit=crop",
    alt: "Stack of textbooks",
  },
]
