import { useState, useEffect } from 'react';

const banners = [
  { id: 1, title: "SUMMER VIBES 2025", category: "Nữ Tính · Xu Hướng", desc: "Tỏa sáng rực rỡ mùa hè.", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop" },
  { id: 2, title: "GENTLEMAN STYLE", category: "Nam Giới · Lịch Lãm", desc: "Đẳng cấp phái mạnh.", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1470&auto=format&fit=crop" },
  { id: 3, title: "URBAN STREETWEAR", category: "Unisex · Cá Tính", desc: "Phong cách đường phố.", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1470&auto=format&fit=crop" }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(prev => (prev === banners.length - 1 ? 0 : prev + 1)), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden mt-20">
      {banners.map((banner, index) => (
        <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${banner.image})` }}></div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg">{banner.title}</h1>
            <p className="text-lg md:text-xl font-light tracking-wide mb-6">{banner.category} · {banner.desc}</p>
            <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">Mua Ngay</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;