"use client";
import {
  ChevronLeft,
  ChevronRight,
  VolumeX,
  Maximize,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const VideoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const videoRefs = useRef([]);
  const carouselRef = useRef(null);

  const videos = [
    {
      title: "Orange Crop Top Palazzo Set",
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1766823686/products/colors/color_84_1766823477294_0.mp4",
    },
    {
      title: "Pink Floral Print Palazzo Set",
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1766823377/products/colors/color_83_1766823162260_0.mp4",
    },
    {
      title: "Elegant Green Suit Set",
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1766823902/products/colors/color_83_1766823818238_0.mp4",
    },
    {
      title: "Maroon Embroidered Saree",
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1766824587/products/colors/color_83_1766824442017_0.mp4",
    },
    {
      title: "Grey Printed Kurta Set",
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1766824587/products/colors/color_83_1766824442017_0.mp4",
    },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) next();
    if (distance < -50) prev();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getPosition = (index) => {
    const position = (index - activeIndex + videos.length) % videos.length;
    if (position === 0) return "active";
    if (position === 1) return "next-1";
    if (position === 2) return "next-2";
    if (position === videos.length - 1) return "prev-1";
    if (position === videos.length - 2) return "prev-2";
    return "hidden";
  };

  const getCardDimensions = () => {
    if (windowWidth < 640) return { width: 280, height: 480 };
    if (windowWidth < 1024) return { width: 320, height: 520 };
    return { width: 400, height: 620 };
  };

  const dimensions = getCardDimensions();

  const getTransformStyle = (position) => {
    const isMobile = windowWidth < 640;
    const baseStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
      cursor: "pointer",
      transformStyle: "preserve-3d",
      borderRadius: "24px",
    };

    switch (position) {
      case "active":
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateZ(0) scale(1)`,
          zIndex: 50,
          opacity: 1,
          filter: "blur(0px)",
        };
      case "next-1":
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateX(${
            isMobile ? "40%" : "65%"
          }) translateZ(-150px) scale(0.85) rotateY(-15deg)`,
          zIndex: 30,
          opacity: 0.6,
          filter: "blur(2px)",
        };
      case "prev-1":
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateX(${
            isMobile ? "-40%" : "-65%"
          }) translateZ(-150px) scale(0.85) rotateY(15deg)`,
          zIndex: 30,
          opacity: 0.6,
          filter: "blur(2px)",
        };
      case "next-2":
      case "prev-2":
        const dir = position === "next-2" ? 1 : -1;
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateX(${
            dir * 100
          }%) translateZ(-300px) scale(0.6)`,
          zIndex: 10,
          opacity: 0,
        };
      default:
        return {
          ...baseStyle,
          transform: "translate(-50%, -50%) scale(0)",
          opacity: 0,
        };
    }
  };

  const next = () => setActiveIndex((prev) => (prev + 1) % videos.length);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);

  return (
    <section className="py-12 bg-white overflow-hidden select-none">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-600 tracking-tight text-center">
            Captured Collections
          </h2>
          <div className="h-1 w-20 bg-gray-600 mt-4 rounded-full" />
        </div>

        <div
          ref={carouselRef}
          className="relative mx-auto"
          style={{
            height: `${dimensions.height + 100}px`,
            perspective: "1500px",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* --- DESKTOP NAVIGATION ICONS WITH GRAY-600 HOVER --- */}
          <div className="hidden md:block">
            <button
              onClick={prev}
              className="absolute left-[2%] lg:left-[10%] top-1/2 -translate-y-1/2 z-[60] p-4 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-600 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-[2%] lg:right-[10%] top-1/2 -translate-y-1/2 z-[60] p-4 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-600 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {videos.map((video, index) => {
            const position = getPosition(index);
            const isActive = position === "active";

            return (
              <div
                key={index}
                style={getTransformStyle(position)}
                onClick={() => !isActive && setActiveIndex(index)}
                className={`group overflow-hidden bg-stone-100 ring-1 ring-black/5 ${
                  isActive
                    ? "shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)]"
                    : "shadow-lg"
                }`}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                >
                  <source src={video.url} type="video/mp4" />
                </video>

                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive
                      ? "bg-gradient-to-b from-black/30 via-transparent to-black/60"
                      : "bg-black/10 hover:bg-transparent"
                  }`}
                />

                {isActive && (
                  <>
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start animate-in fade-in slide-in-from-top-4 duration-700">
                      {/* <div className="bg-white/20 backdrop-blur-md border border-white/30 p-3 px-4 rounded-xl max-w-[75%]">
                        <p className="text-white text-sm font-medium leading-tight">
                          {video.title}
                        </p>
                      </div> */}

                      <div className="flex flex-col gap-3">
                        <button className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white/50 cursor-not-allowed">
                          <VolumeX size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const vid = videoRefs.current[index];
                            if (vid.requestFullscreen) vid.requestFullscreen();
                            else if (vid.webkitRequestFullscreen)
                              vid.webkitRequestFullscreen();
                          }}
                          className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-gray-600 transition-all active:scale-90"
                        >
                          <Maximize size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <Link
                        href="/shop"
                        className="w-full flex items-center justify-center gap-3 bg-white text-gray-600 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-600 hover:text-white transition-all active:scale-95 shadow-lg"
                      >
                        <ShoppingBag size={18} />
                        View Product
                      </Link>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-3 mt-8">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-500 rounded-full ${
                index === activeIndex
                  ? "w-10 h-2 bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
