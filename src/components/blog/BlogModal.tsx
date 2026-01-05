'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BlogModalProps {
  children: React.ReactNode;
}

export function BlogModal({ children }: BlogModalProps) {
  const router = useRouter();

  const handleDismiss = () => {
    router.back();
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop - reduced blur for performance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={handleDismiss}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-auto glass-effect rounded-2xl shadow-2xl"
          style={{
            background: 'rgba(5, 5, 5, 0.98)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-6 md:p-8">
            {children}

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // The children should ideally provide the slug, 
                  // but for now we can infer from current path if it's an intercepting route
                  const path = window.location.pathname;
                  if (path.includes('/blog/')) {
                    window.location.href = path; // Force full page reload to the actual page
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20"
              >
                Read Full Story
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
