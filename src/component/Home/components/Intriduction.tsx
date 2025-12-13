const IntroSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        <div className="order-1 lg:order-2 text-center lg:text-left space-y-6 lg:space-y-8 px-4 lg:px-8 w-full">
          <div>
            <p className="text-2xl lg:text-4xl text-[#115e59] mb-3 tracking-wide font-serif">
              Introducing
            </p>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-[#115e59] to-[#134e4a] bg-clip-text text-transparent mb-4 leading-tight font-serif">
              KRAMBICA KURTI
              <span className="text-2xl lg:text-3xl align-top">™</span>
            </h1>
          </div>

          <div className="flex justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-[#115e59] to-[#134e4a] text-white px-8 lg:px-12 py-4 lg:py-5 text-sm lg:text-base font-semibold uppercase rounded-none hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-lg">
              Shop All Kurtis
            </button>
          </div>

          <div className="pt-4">
            <p className="text-gray-800 text-lg lg:text-2xl font-light leading-relaxed">
              Style Made Simple,{" "}
              <span className="font-semibold text-[#115e59]">
                Ready to Wear in Seconds!
              </span>
            </p>
          </div>
        </div>

        <div className="order-2 lg:order-1 grid grid-cols-2 gap-3 lg:gap-4 w-full">
          {/* Video - First Image */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-2 rounded-2xl overflow-hidden shadow-2xl h-64 lg:h-[600px] relative group">
            <video
              src="https://res.cloudinary.com/diq96m1v0/video/upload/v1762274177/products/colors/color_7_1762274096242_3.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#115e59]/10 group-hover:bg-transparent transition-all duration-300"></div>
          </div>

          {/* Second Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-64 lg:h-72 relative group">
            <img
              src="https://res.cloudinary.com/diq96m1v0/image/upload/v1762274090/products/colors/color_7_1762274087665_0.jpg"
              alt="Stylish Kurti Outfit"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#115e59]/10 group-hover:bg-transparent transition-all duration-300"></div>
          </div>

          {/* Third Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-64 lg:h-72 relative group">
            <img
              src="https://res.cloudinary.com/diq96m1v0/image/upload/v1762275562/products/colors/color_8_1762275558701_0.jpg"
              alt="Kurti Embroidery Detail"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#115e59]/10 group-hover:bg-transparent transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
