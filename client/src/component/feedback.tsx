import React, { useState } from 'react';
import { ArrowRight, Star, Quote } from 'lucide-react';

// --- 1. TYPES & DATA ---

interface FeedbackUser {
  id: number;
  name: string;
  role: string;
  image: string;
  comment?: string;
  rating?: number;
}

const feedbackData: FeedbackUser[] = [
  {
    id: 1,
    name: "Lisa (Blackpink)",
    role: "K-pop Idol",
    image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=200", // Mẫu nữ tóc đen cá tính
    // comment: "Chất lượng sản phẩm tuyệt vời, tôi rất thích cách phối đồ này!",
    rating: 5
  },
  {
    id: 2,
    name: "Jennie Kim",
    role: "Fashion Icon",
    image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=200", // Mẫu nữ thời trang sang chảnh
    comment: "Không gian rất chill và trang phục cực kỳ thoải mái.",
    rating: 5
  },
  {
    id: 3,
    name: "Katy Perry",
    role: "Singer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200", // Mẫu nữ phương tây tươi tắn
    comment: "Dịch vụ chuyên nghiệp, chắc chắn sẽ quay lại lần sau.",
    rating: 4
  },
  {
    id: 4,
    name: "Hương Giang",
    role: "Miss International Queen",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200", // Mẫu nữ quyến rũ
    comment: "Phong cách thiết kế rất sang trọng và tôn dáng.",
    rating: 5
  },
  // Data thêm cho trang "Xem thêm"
  { 
    id: 5, 
    name: "Rose", 
    role: "Artist", 
    image: "https://atplink.com/blog/wp-content/uploads/2021/06/fgg.jpg", 
    comment: "Tuyệt vời!", 
    rating: 5 
  },
  { 
    id: 6, 
    name: "Son Tung M-TP", 
    role: "Singer", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200", // Mẫu nam điển trai
    comment: "Good vibes only.", 
    rating: 4 
  },
  { 
    id: 7, 
    name: "Taylor Swift", 
    role: "Singer", 
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200", // Mẫu nữ tóc sáng màu
    comment: "Love the atmosphere.", 
    rating: 5 
  },
  { 
    id: 8, 
    name: "G-Dragon", 
    role: "Rapper", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200", // Mẫu nam cool ngầu
    comment: "Swag!", 
    rating: 5 
  },
];

// --- 2. COMPONENT CON: FEEDBACK CARD (HOME STYLE) ---
// Card hiển thị ở trang chủ: Tập trung vào hình ảnh, hover hiện tên

const FeedbackCardHome = ({ item }: { item: FeedbackUser }) => {
  return (
    <div className="group relative h-[450px] w-full cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-500 hover:shadow-xl">
      {/* Image Layer */}
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />
      
      {/* Overlay Gradient (Chỉ hiện khi hover để bắt mắt) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Text Content (Slide lên khi hover) */}
      <div className="absolute bottom-0 left-0 w-full translate-y-4 p-6 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-xl font-bold uppercase tracking-wider">{item.name}</h3>
        <p className="text-sm font-light text-gray-300">{item.role}</p>
        <div className="mt-2 flex gap-1">
             {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
             ))}
        </div>
      </div>
    </div>
  );
};

// --- 3. COMPONENT CON: FEEDBACK CARD (DETAIL STYLE) ---
// Card hiển thị ở trang Xem thêm: Sáng tạo hơn, hiển thị cả comment

const FeedbackCardCreative = ({ item }: { item: FeedbackUser }) => {
  return (
    <div className="break-inside-avoid mb-6 rounded-xl bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <img src={item.image} alt={item.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100" />
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
          <p className="text-xs text-gray-500">{item.role}</p>
        </div>
      </div>
      
      <div className="relative bg-gray-50 p-4 rounded-lg">
        <Quote className="absolute -top-2 -left-2 h-6 w-6 text-gray-300 fill-gray-200" />
        <p className="text-gray-600 text-sm italic leading-relaxed pt-2">"{item.comment}"</p>
      </div>

      <div className="mt-3 flex justify-end gap-1">
         {[...Array(item.rating || 5)].map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
         ))}
      </div>
    </div>
  );
};

// --- 4. MAIN SECTION (GIỐNG HÌNH YÊU CẦU) ---

const FeedbackSection = ({ onSeeMore }: { onSeeMore: () => void }) => {
  // Lấy 4 item đầu tiên giống hình
  const displayItems = feedbackData.slice(0, 4);

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-12 text-center text-3xl font-black uppercase tracking-[0.2em] text-gray-900 md:text-4xl">
          Feedback
        </h2>

        {/* Grid Layout - 4 Columns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayItems.map((item) => (
            <FeedbackCardHome key={item.id} item={item} />
          ))}
        </div>

        {/* Button See More */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onSeeMore}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-black px-8 py-3 text-white transition-all hover:bg-gray-800 hover:pr-10 shadow-lg hover:shadow-black/25"
          >
            <span className="font-medium tracking-wide">XEM THÊM</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- 5. PAGE: FEEDBACK DETAILS (SÁNG TẠO) ---

const FeedbackPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header của trang con */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
                <h1 className="text-4xl font-black text-gray-900">Khách hàng nói gì?</h1>
                <p className="mt-2 text-gray-500">Những chia sẻ chân thực từ những người bạn tuyệt vời.</p>
            </div>
            <button 
                onClick={onBack}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
                ← Quay lại trang chủ
            </button>
        </div>

        {/* Masonry Layout (Bố cục so le sáng tạo) */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-6">
          {feedbackData.map((item) => (
            <FeedbackCardCreative key={item.id} item={item} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm">Hiển thị {feedbackData.length} feedbacks</p>
        </div>
      </div>
    </div>
  );
};

// --- 6. APP CONTROLLER ---

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'feedback'>('home');

  // Điều hướng đơn giản
  if (currentView === 'feedback') {
    return <FeedbackPage onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {/* Giả lập trang chủ chỉ chứa Feedback Section cho dễ nhìn */}
        <div className="w-full bg-white shadow-2xl">
            <FeedbackSection onSeeMore={() => setCurrentView('feedback')} />
        </div>
    </div>
  );
};

export default App;