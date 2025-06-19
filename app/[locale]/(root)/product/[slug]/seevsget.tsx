'use client';
import React, { useRef, useState } from 'react';

export default function Seevsget() {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [selectedPhotoFiles, setSelectedPhotoFiles] = useState<File[]>([]);
  const [selectedVideoFiles, setSelectedVideoFiles] = useState<File[]>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handlePhotoClick = () => {
    photoInputRef.current?.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedPhotoFiles(files);
      alert(`Selected ${files.length} photo(s): ${files.map(f => f.name).join(', ')}`);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedVideoFiles(files);
      alert(`Selected ${files.length} video(s): ${files.map(f => f.name).join(', ')}`);
    }
  };

  const handleSeeMore = () => {
    alert('Loading more user uploads...');
  };

  return (
    <div className="bg-gray-50 mb-2 py-2">
      <div className="mx-auto bg-white max-h-[400px] rounded-lg shadow-lg w-[96%]">
        <div className="p-4 space-y-3 flex justify-between w-full">
          {/* Left Section */}
          <div className="w-[15%]">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-gray-900">
                What You See Vs What You Get
              </h1>
              <p className="text-gray-600 text-base">
                Earn rewards by uploading real photos or videos of the product you received!
              </p>
            </div>
            <div className="flex gap-3 flex-col mt-[25px]">
              <button
                onClick={handlePhotoClick}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Upload Photo
              </button>
              <button
                onClick={handleVideoClick}
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Upload Video
              </button>
            </div>
          </div>

          {/* Center Product Image */}
          <div className="space-y-1 w-[40%] flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-900 text-center">Original Product Image</h2>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-16%20at%2006.25.55%20%281%29-xxDAvdbewCCVuPwm2sG0qlkVRK2b2b.jpeg"
              alt="Original product image"
              className="w-[80%] h-[320px] object-cover rounded"
            />
          </div>

          {/* Right Section - User Uploads */}
          <div className="w-[45%] flex flex-col space-y-4 items-center h-full">
            <div>
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">User uploads</h2>
              <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[250px]">
                {[
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-16%20at%2006.25.55%20%283%29-RJP1ePUjRDpUA14OhWv8EI7qi0ZsM4.jpeg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-16%20at%2006.25.55%20%282%29-4CmPt4iriWyHoz1KIaYinu51adrcGo.jpeg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-16%20at%2006.25.55-UhiZwImaTeF3r0BpcfbQ30Hy4PGdj5.jpeg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-16%20at%2006.25.56-sWcsDrqAqAwARcUwzhbjrzpkUfocWl.jpeg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-16%20at%2006.25.55%20%283%29-RJP1ePUjRDpUA14OhWv8EI7qi0ZsM4.jpeg",
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-16%20at%2006.25.55%20%282%29-4CmPt4iriWyHoz1KIaYinu51adrcGo.jpeg",
                ].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`User upload ${idx + 1}`}
                    className="w-full h-full rounded cursor-pointer"
                    onClick={() => setLightboxImage(src)}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleSeeMore}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 text-base font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              See More Uploads
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Inputs */}
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoChange}
        className="hidden"
        accept="image/*"
        multiple
      />
      <input
        type="file"
        ref={videoInputRef}
        onChange={handleVideoChange}
        className="hidden"
        accept="video/*"
        multiple
      />

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={lightboxImage}
              alt="Lightbox"
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
              onClick={() => setLightboxImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
