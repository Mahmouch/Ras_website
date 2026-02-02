import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { supabase } from "../../supabaseClient";
import { initialActivities } from "../../data/initialData";

const iconMap = {
  AcademicCapIcon: AcademicCapIcon,
  RocketLaunchIcon: RocketLaunchIcon,
  WrenchScrewdriverIcon: WrenchScrewdriverIcon,
  UserGroupIcon: UserGroupIcon,
};

// 🎯 Optimized Image Component with skeleton loader
const OptimizedImage = ({ src, alt, description, instagramUrl, facebookUrl }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-200 cursor-pointer shadow-md hover:shadow-xl transition-shadow">
      {/* Skeleton Loader */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Image */}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-600">
          <span className="text-sm">Failed to load</span>
        </div>
      )}

      {/* Overlay - only show when image is loaded */}
      {loaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#5F2167]/95 via-[#5F2167]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <p className="text-white font-medium text-lg mb-3 line-clamp-2 drop-shadow-lg">
            {description}
          </p>
          <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition-colors drop-shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <FaInstagram className="text-2xl" />
              </a>
            )}
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors drop-shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <FaFacebook className="text-2xl" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Activities() {
  const [showModal, setShowModal] = useState(false);
  const [activities] = useState(initialActivities);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerRef = useRef(null);

  const PAGE_SIZE = 12; // 📈 Increased from 6 to 12 for better UX

  // ================= OPTIMIZED FETCH WITH CACHING =================
  const fetchGallery = async (isInitial = false) => {
    setLoading(true);
    try {
      const from = isInitial ? 0 : page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("gallery")
        .select("id, image_url, description, instagram_url, facebook_url, created_at") // 🎯 Select only needed fields
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (isInitial) {
        setGallery(data || []);
        setPage(1);
      } else {
        setGallery((prev) => [...prev, ...(data || [])]);
        setPage((prev) => prev + 1);
      }

      if (!data || data.length < PAGE_SIZE) setHasMore(false);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
    setLoading(false);
  };

  // Load gallery when modal opens
  useEffect(() => {
    if (showModal) {
      setGallery([]);
      setPage(0);
      setHasMore(true);
      fetchGallery(true);
    }
  }, [showModal]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchGallery(false);
    }
  };

  // 🚀 Infinite Scroll Observer (optional enhancement)
  useEffect(() => {
    if (!showModal) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [showModal, loading, hasMore, page]);

  // ================= UI =================
  return (
    <div
      id="activities"
      className="py-24 sm:py-32 bg-gradient-to-b from-[#5F2167]/8 to-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#5F2167] sm:text-4xl">
            Our Activities
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore the many learning and development opportunities we offer to
            our members.
          </p>
        </motion.div>

        {/* Activities */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none grid grid-cols-1 gap-8 lg:grid-cols-2">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.iconName] || AcademicCapIcon;

            return (
              <motion.div
                key={activity.name || index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 p-8 hover:shadow-2xl hover:ring-[#5F2167]/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-x-4">
                  <Icon className="h-12 w-12 flex-none text-[#862633] p-2 bg-[#862633]/10 rounded-lg" />
                  <h3 className="text-xl font-semibold leading-7 tracking-tight text-[#5F2167]">
                    {activity.name}
                  </h3>
                </div>

                <p className="mt-4 text-base leading-7 text-gray-600 flex-grow">
                  {activity.description}
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-sm font-semibold leading-6 text-[#862633] hover:text-[#5F2167] transition-colors"
                  >
                    View Gallery →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= MODAL ================= */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-7xl w-full h-[90vh] flex flex-col relative shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-[#5F2167] to-[#862633]">
                <h3 className="text-3xl font-bold text-white tracking-wide">
                  Gallery {gallery.length > 0 && `(${gallery.length})`}
                </h3>
                <button
                  className="text-white/90 hover:text-white text-2xl font-bold transition-colors p-2 hover:bg-white/10 rounded-full"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>

              {/* Gallery */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {/* Loading State - First Load */}
                {loading && gallery.length === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-[4/5] rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                      />
                    ))}
                  </div>
                )}

                {/* Gallery Grid */}
                {gallery.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {gallery.map((item, index) => (
                      <motion.div
                        key={item.id || index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }} // 🎯 Reduced delay for faster animation
                      >
                        <OptimizedImage
                          src={item.image_url}
                          alt={item.description || "Gallery image"}
                          description={item.description}
                          instagramUrl={item.instagram_url}
                          facebookUrl={item.facebook_url}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && gallery.length > 0 && (
                  <div className="mt-12 text-center pb-8">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-[#5F2167] to-[#862633] hover:from-[#862633] hover:to-[#5F2167] text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                          Loading...
                        </span>
                      ) : (
                        "Load More Photos"
                      )}
                    </button>
                  </div>
                )}

                {/* Intersection Observer Target for Infinite Scroll */}
                <div ref={observerRef} className="h-4" />

                {/* No More Items */}
                {!hasMore && gallery.length > 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No more photos to load
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}