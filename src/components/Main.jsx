import React, { useState } from "react";
import PlayStation from "../assets/PlayStation.png";
import AirPodsMax from "../assets/AirPodsMax.png";
import VisionPro from "../assets/VisionPro.png";
import MacbookAir from "../assets/MacbookAir.png";


function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-none border-none overflow-hidden ${className || ""}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return <div className={`p-8 lg:p-12 ${className || ""}`}>{children}</div>;
}

function Button({ children, className, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded border border-black text-black bg-white hover:bg-black hover:text-white transition duration-300 font-sans text-base focus:outline-none focus:ring-2 focus:ring-black ${className || ""}`}
    >
      {children}
    </button>
  );
}

function ProductImage({ src, alt, className }) {
  return (
    <div className={`relative bg-[#f3f3f3] ${className || ""}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition duration-500 ease-out hover:scale-[1.04]"
      />
 
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/5 to-transparent" />
    </div>
  );
}

function DetailsModal({ open, onClose, title, description, image }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="bg-[#f3f3f3] p-6 flex items-center justify-center">
            <img src={image} alt="preview" className="w-full h-64 object-contain" />
          </div>
          <div className="p-6 md:p-8">
            <h3 id="product-title" className="text-2xl font-semibold tracking-tight">
              {title}
            </h3>
            <p className="mt-3 text-slate-700 leading-relaxed">{description}</p>
            <div className="mt-6 flex gap-3">
              <Button className="">Add to Cart</Button>
              <Button className="border-slate-300 text-slate-700 hover:text-white" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [modal, setModal] = useState({ open: false, title: "", description: "", image: "" });

  const openModal = (payload) => setModal({ open: true, ...payload });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  return (
    <main className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-[1400px] mx-auto">
    
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* PlayStation 5 */}
          <Card className="flex items-stretch">
            <ProductImage src={PlayStation} alt="PlayStation 5" className="flex-1 p-8" />
            <CardContent className="flex-1 flex flex-col justify-center">
              <h2 className="font-sans text-[44px] leading-[1.05] font-light text-black">
                Playstation <span className="font-bold">5</span>
              </h2>
              <p className="mt-4 font-serif text-lg text-gray-700 max-w-[46ch]">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
              </p>
            </CardContent>
          </Card>

       
          <Card className="flex items-stretch">
            <CardContent className="flex-1 flex flex-col justify-center">
              <h2 className="font-sans text-[44px] leading-[1.05] font-light text-black">
                Macbook <span className="font-bold">Air</span>
              </h2>
              <p className="mt-4 font-serif text-lg text-gray-700 max-w-[48ch]">
                The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
              </p>
              <Button
                className="mt-6 w-fit"
                onClick={() =>
                  openModal({
                    title: "MacBook Air",
                    description:
                      "Ultra‑thin design with powerful Apple silicon and an expansive Liquid Retina display.",
                    image: MacbookAir,
                  })
                }
              >
                Shop Now
              </Button>
            </CardContent>
            <ProductImage src={MacbookAir} alt="MacBook Air" className="flex-1 p-8" />
          </Card>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2">
 
          <Card>
            <CardContent className="flex flex-col items-start justify-center h-full">
              <img
                src={AirPodsMax}
                alt="Apple AirPods Max"
                className="w-full h-40 object-contain mb-4 transition duration-500 hover:scale-[1.04]"
              />
              <h3 className="font-sans text-2xl font-light text-black">
                Apple <span className="font-bold">AirPods Max</span>
              </h3>
              <p className="font-serif text-base text-gray-700 mt-2">
                Computational audio. Listen, it's powerful.
              </p>
            </CardContent>
          </Card>

     
          <Card>
            <CardContent className="flex flex-col items-start justify-center h-full">
              <img
                src={VisionPro}
                alt="Apple Vision Pro"
                className="w-full h-40 object-contain mb-4 transition duration-500 hover:scale-[1.04]"
              />
              <h3 className="font-sans text-2xl font-light text-black">
                Apple <span className="font-bold">Vision Pro</span>
              </h3>
              <p className="font-serif text-base text-gray-700 mt-2 max-w-[48ch]">
                An immersive way to experience entertainment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>


      <DetailsModal
        open={modal.open}
        onClose={closeModal}
        title={modal.title}
        description={modal.description}
        image={modal.image}
      />
    </main>
  );
}
