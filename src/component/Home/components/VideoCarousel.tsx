"use client";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VideoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Always muted
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
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1762082241/products/colors/color_6_1762082239640_2.mp4",
    },
    {
      title: "Pink Floral Print Palazzo Set",
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1762274177/products/colors/color_7_1762274096242_3.mp4",
    },
    {
      title: "Elegant Green Suit Set",
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1762082241/products/colors/color_6_1762082239640_2.mp4",
    },
    {
      title: "Maroon Embroidered Saree",
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1762274177/products/colors/color_7_1762274096242_3.mp4",
    },
    {
      title: "Grey Printed Kurta Set",
      url: "https://res.cloudinary.com/diq96m1v0/video/upload/v1762082241/products/colors/color_6_1762082239640_2.mp4",
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

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }

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
    if (windowWidth < 375) {
      return { width: 240, height: 360 };
    } else if (windowWidth < 640) {
      return { width: 260, height: 390 };
    } else if (windowWidth < 768) {
      return { width: 300, height: 450 };
    } else if (windowWidth < 1024) {
      return { width: 340, height: 510 };
    } else if (windowWidth < 1280) {
      return { width: 380, height: 540 };
    } else {
      return { width: 420, height: 600 };
    }
  };

  const dimensions = getCardDimensions();

  const getTransformStyle = (position) => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    const baseStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      transformStyle: "preserve-3d",
    };

    switch (position) {
      case "active":
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateZ(0) scale(1)`,
          zIndex: 50,
          opacity: 1,
        };

      case "next-1":
        if (isMobile) {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(${
              dimensions.width * 0.55
            }px) translateZ(-100px) scale(0.7) rotateY(-8deg)`,
            zIndex: 30,
            opacity: 0.6,
          };
        } else if (isTablet) {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(${
              dimensions.width * 0.65
            }px) translateZ(-150px) scale(0.75) rotateY(-10deg)`,
            zIndex: 30,
            opacity: 0.7,
          };
        } else {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(${
              dimensions.width * 0.8
            }px) translateZ(-200px) scale(0.75) rotateY(-10deg)`,
            zIndex: 30,
            opacity: 0.7,
          };
        }

      case "next-2":
        if (isMobile) {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(${
              dimensions.width * 1.1
            }px) translateZ(-200px) scale(0.5)`,
            zIndex: 10,
            opacity: 0,
          };
        } else {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(${
              dimensions.width * 1.3
            }px) translateZ(-400px) scale(0.6) rotateY(-15deg)`,
            zIndex: 10,
            opacity: 0.4,
          };
        }

      case "prev-1":
        if (isMobile) {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(-${
              dimensions.width * 0.55
            }px) translateZ(-100px) scale(0.7) rotateY(8deg)`,
            zIndex: 30,
            opacity: 0.6,
          };
        } else if (isTablet) {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(-${
              dimensions.width * 0.65
            }px) translateZ(-150px) scale(0.75) rotateY(10deg)`,
            zIndex: 30,
            opacity: 0.7,
          };
        } else {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(-${
              dimensions.width * 0.8
            }px) translateZ(-200px) scale(0.75) rotateY(10deg)`,
            zIndex: 30,
            opacity: 0.7,
          };
        }

      case "prev-2":
        if (isMobile) {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(-${
              dimensions.width * 1.1
            }px) translateZ(-200px) scale(0.5)`,
            zIndex: 10,
            opacity: 0,
          };
        } else {
          return {
            ...baseStyle,
            transform: `translate(-50%, -50%) translateX(-${
              dimensions.width * 1.3
            }px) translateZ(-400px) scale(0.6) rotateY(15deg)`,
            zIndex: 10,
            opacity: 0.4,
          };
        }

      default:
        return {
          ...baseStyle,
          transform: "translate(-50%, -50%) translateZ(-600px) scale(0.4)",
          zIndex: 1,
          opacity: 0,
        };
    }
  };

  const next = () => setActiveIndex((prev) => (prev + 1) % videos.length);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);

  const getContainerHeight = () => {
    if (windowWidth < 640) return dimensions.height + 100;
    if (windowWidth < 1024) return dimensions.height + 150;
    return dimensions.height + 200;
  };

  return (
    <div className="py-6 sm:py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent mb-6 sm:mb-8 md:mb-10 font-serif px-2">
          Trending Looks To Watch
        </h2>

        <div
          ref={carouselRef}
          className="relative mx-auto"
          style={{
            height: `${getContainerHeight()}px`,
            maxWidth: "100%",
            perspective: windowWidth < 640 ? "800px" : "1200px",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {videos.map((video, index) => {
            const position = getPosition(index);
            const transformStyle = getTransformStyle(position);

            return (
              <div
                key={index}
                style={transformStyle}
                onClick={() => position !== "active" && setActiveIndex(index)}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover"
                  loop
                  muted={true}
                  playsInline
                  preload="metadata"
                >
                  <source src={video.url} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

                {position === "active" && (
                  <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 flex justify-between items-start z-10">
                    <div className="bg-black/50 backdrop-blur-sm px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg max-w-[65%] sm:max-w-[70%]">
                      <p className="text-white text-[10px] sm:text-xs md:text-sm font-medium truncate">
                        {video.title}
                      </p>
                    </div>
                    <div className="flex gap-1 sm:gap-1.5 md:gap-2">
                      <button
                        disabled
                        className="bg-black/50 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg text-white opacity-50 cursor-not-allowed"
                      >
                        <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (videoRefs.current[index]) {
                            if (videoRefs.current[index].requestFullscreen) {
                              videoRefs.current[index].requestFullscreen();
                            } else if (
                              videoRefs.current[index].webkitRequestFullscreen
                            ) {
                              videoRefs.current[
                                index
                              ].webkitRequestFullscreen();
                            }
                          }
                        }}
                        className="bg-black/50 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg text-white hover:bg-black/70 transition-all active:scale-95"
                      >
                        <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {position === "active" && (
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <button className="bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white px-5 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium hover:shadow-lg transition-all active:scale-95">
                      View Product
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={prev}
            className="absolute left-1 sm:left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all hover:bg-[#115e59] hover:text-white"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </button>

          <button
            onClick={next}
            className="absolute right-1 sm:right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all hover:bg-[#115e59] hover:text-white"
            aria-label="Next video"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </button>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[#115e59] w-4 sm:w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-4 sm:mt-6 md:hidden">
          <p className="text-xs text-gray-500">
            👆 Swipe left or right to browse
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
