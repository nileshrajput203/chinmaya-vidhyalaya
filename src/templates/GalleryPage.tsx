import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { GalleryCard } from '../components/gallery/GalleryCard';
import { contentService } from '../services/contentService';
import { GalleryItem } from '../types/gallery';

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      const cat = selectedCategory === 'all' ? undefined : selectedCategory;
      const data = await contentService.getGallery(cat);
      setItems(data);
      setLoading(false);
    }
    loadGallery();
  }, [selectedCategory]);

  const categories = [
    { label: 'All Photos', value: 'all' },
    { label: 'Campus Infrastructure', value: 'campus' },
    { label: 'Academic Labs', value: 'academics' },
    { label: 'Sports & Athletics', value: 'sports' },
    { label: 'Celebrations & Events', value: 'celebrations' },
  ];

  return (
    <div className="bg-[#FCFBF7] text-[#181C20] pb-24">
      <PageHero title="Campus Visual Showcase" subtitle="Visual glimpses into campus life, academic infrastructure, cultural celebrations, and athletic sports meets" badge="Visual Archive" />
      <Breadcrumb items={[{ label: "Gallery" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E7E2D8]">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all rounded-xl border ${
                selectedCategory === cat.value
                  ? 'bg-[#0B1D30] text-white border-[#0B1D30] shadow-md font-bold'
                  : 'bg-white border-[#E7E2D8] text-[#4A5568] hover:bg-[#FAF8F5] hover:text-[#0B1D30]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20 text-[#4A5568] text-xs font-mono">Loading curated photography...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setActiveLightboxImg(item.imageUrl)}
                className="cursor-pointer"
              >
                <GalleryCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B1D30]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveLightboxImg(null)}
          >
            <button 
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={activeLightboxImg} 
              alt="Enlarged Campus Visual" 
              className="max-w-full max-h-[85vh] rounded-3xl shadow-2xl border border-white/20 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
