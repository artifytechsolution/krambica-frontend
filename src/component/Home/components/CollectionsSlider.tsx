"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CollectionsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const router = useRouter();

  const collections = [
    {
      title: "Sequins Collection",
      code: "GLAM7",
      image:
        "https://res.cloudinary.com/diq96m1v0/image/upload/v1762274090/products/colors/color_7_1762274087665_0.jpg",
    },
    {
      title: "Cape Styles For You",
      code: "GLAM7",
      image:
        "https://res.cloudinary.com/diq96m1v0/image/upload/v1762275562/products/colors/color_8_1762275558701_0.jpg",
    },
    {
      title: "Printed Pret Collection",
      code: "GLAM7",
      image:
        "https://res.cloudinary.com/diq96m1v0/image/upload/v1762274090/products/colors/color_7_1762274087665_0.jpg",
    },
    {
      title: "Classic Couture Styles",
      code: "GLAM7",
      image:
        "https://res.cloudinary.com/diq96m1v0/image/upload/v1762275562/products/colors/color_8_1762275558701_0.jpg",
    },
    {
      title: "Designer Anarkali",
      code: "GLAM7",
      image:
        "https://res.cloudinary.com/diq96m1v0/image/upload/v1762274090/products/colors/color_7_1762274087665_0.jpg",
    },
    {
      title: "Festive Wear",
      code: "GLAM7",
      image:
        "https://res.cloudinary.com/diq96m1v0/image/upload/v1762275562/products/colors/color_8_1762275558701_0.jpg",
    },
  ];

  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 4;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

  useEffect(() => {
    const handleResize = () => setVisibleSlides(getVisibleSlides());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % (collections.length - visibleSlides + 1)
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [visibleSlides]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentIndex((prev) =>
        Math.min(prev + 1, collections.length - visibleSlides)
      );
    }
    if (touchStart - touchEnd < -75) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const next = () =>
    setCurrentIndex((prev) =>
      Math.min(prev + 1, collections.length - visibleSlides)
    );
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-white">
      <div className="text-center mb-6 md:mb-8 lg:mb-12 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#115e59] tracking-wide font-serif">
          Our Collections
        </h2>
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-600 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleSlides)
                }%)`,
              }}
            >
              {collections.map((collection, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 md:px-3 lg:px-4"
                  style={{ width: `${100 / visibleSlides}%` }}
                >
                  <div className="relative overflow-hidden h-[400px] md:h-[450px] lg:h-[500px] cursor-pointer group rounded-lg md:rounded-xl">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-10 flex flex-col items-center justify-end text-center z-10">
                      <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-normal mb-2 tracking-wide font-serif">
                        {collection.title}
                      </h3>
                      <p className="text-white text-xs md:text-sm mb-3 md:mb-5 font-light">
                        Get 7% OFF* | Use Code: {collection.code}
                      </p>
                      <button
                        onClick={() => router.push("/shop")}
                        className="bg-[#115e59] text-white px-6 md:px-8 lg:px-10 py-2.5 md:py-3 lg:py-3.5 text-xs md:text-sm font-semibold uppercase tracking-widest border-2 border-[#115e59] transition-all duration-300 hover:bg-[#134e4a] hover:border-[#134e4a]"
                      >
                        SHOP NOW
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#115e59] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={next}
            disabled={currentIndex >= collections.length - visibleSlides}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#115e59] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSlider;
