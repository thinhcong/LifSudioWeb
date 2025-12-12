import React, { useEffect, useState } from 'react';
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
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww", // Mẫu nữ tóc đen cá tính
    // comment: "Chất lượng sản phẩm tuyệt vời, tôi rất thích cách phối đồ này!",
    rating: 5
  },
  {
    id: 2,
    name: "Jennie Kim",
    role: "Fashion Icon",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Mẫu nữ thời trang sang chảnh
    comment: "Không gian rất chill và trang phục cực kỳ thoải mái.",
    rating: 5
  },
  {
    id: 3,
    name: "Katy Perry",
    role: "Singer",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Mẫu nữ phương tây tươi tắn
    comment: "Dịch vụ chuyên nghiệp, chắc chắn sẽ quay lại lần sau.",
    rating: 4
  },
  {
    id: 4,
    name: "Hương Giang",
    role: "Miss International Queen",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D", // Mẫu nữ quyến rũ
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
{
  id: 9,
  name: "Lisa (Blackpink)",
  role: "K-pop Idol",
  image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop",
  rating: 5
},
{
  id: 10,
  name: "Jennie Kim",
  role: "Fashion Icon",
  image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=900&auto=format&fit=crop",
  comment: "Không gian rất chill và trang phục cực kỳ thoải mái.",
  rating: 5
},
{
  id: 11,
  name: "Katy Perry",
  role: "Singer",
  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop",
  comment: "Dịch vụ chuyên nghiệp, chắc chắn sẽ quay lại lần sau.",
  rating: 4
},
{
  id: 12,
  name: "Hương Giang",
  role: "Miss International Queen",
  image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop",
  comment: "Phong cách thiết kế rất sang trọng và tôn dáng.",
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
        className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
      />
      
      {/* Overlay Gradient (Chỉ hiện khi hover để bắt mắt) */}
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:opacity-100" />

      {/* Text Content (Slide lên khi hover) */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-xl font-bold tracking-wider uppercase">{item.name}</h3>
        <p className="text-sm font-light text-gray-300">{item.role}</p>
        <div className="flex gap-1 mt-2">
             {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
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
        <img src={item.image} alt={item.name} className="object-cover w-12 h-12 rounded-full ring-2 ring-gray-100" />
        <div>
          <h4 className="text-sm font-bold text-gray-800">{item.name}</h4>
          <p className="text-xs text-gray-500">{item.role}</p>
        </div>
      </div>
      
      <div className="relative p-4 rounded-lg bg-gray-50">
        <Quote className="absolute w-6 h-6 text-gray-300 -top-2 -left-2 fill-gray-200" />
        <p className="pt-2 text-sm italic leading-relaxed text-gray-600">"{item.comment}"</p>
      </div>

      <div className="flex justify-end gap-1 mt-3">
         {[...Array(item.rating || 5)].map((_, i) => (
            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
         ))}
      </div>
    </div>
  );
};

// --- 4. MAIN SECTION (GIỐNG HÌNH YÊU CẦU) ---

const FeedbackSection = ({ onSeeMore }: { onSeeMore: () => void }) => {
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(feedbackData.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(0);

  // Auto slide mỗi 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalPages]);

  return (
    <section className="w-full py-16 overflow-hidden bg-white">
      <div className="container px-4 mx-auto">
        {/* Title */}
        <h2 className="mb-12 text-center text-3xl font-black uppercase tracking-[0.2em] text-gray-900 md:text-4xl">
          Feedback
        </h2>

        {/* Carousel Wrapper */}
        <div className="relative overflow-hidden">
          {/* Track */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="grid flex-shrink-0 w-full grid-cols-1 gap-4 px-1 sm:grid-cols-2 lg:grid-cols-4"
              >
                {feedbackData
                  .slice(
                    pageIndex * ITEMS_PER_PAGE,
                    pageIndex * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                  )
                  .map((item) => (
                    <FeedbackCardHome key={item.id} item={item} />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Button See More */}
        <div className="flex justify-center mt-12">
          <button
            onClick={onSeeMore}
            className="relative flex items-center gap-2 px-8 py-3 overflow-hidden text-white transition-all bg-black rounded-full shadow-lg group hover:bg-gray-800 hover:pr-10 hover:shadow-black/25"
          >
            <span className="font-medium tracking-wide">XEM THÊM</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- 5. PAGE: FEEDBACK DETAILS (SÁNG TẠO) ---

const FeedbackPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Header của trang con */}
        <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
            <div>
                <h1 className="text-4xl font-black text-gray-900">Khách hàng nói gì?</h1>
                <p className="mt-2 text-gray-500">Những chia sẻ chân thực từ những người bạn tuyệt vời.</p>
            </div>
            <button 
                onClick={onBack}
                className="px-6 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
            >
                ← Quay lại trang chủ
            </button>
        </div>

        {/* Masonry Layout (Bố cục so le sáng tạo) */}
        <div className="gap-6 space-y-6 columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
          {feedbackData.map((item) => (
            <FeedbackCardCreative key={item.id} item={item} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-sm text-gray-400">Hiển thị {feedbackData.length} feedbacks</p>
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Giả lập trang chủ chỉ chứa Feedback Section cho dễ nhìn */}
        <div className="w-full bg-white shadow-2xl">
            <FeedbackSection onSeeMore={() => setCurrentView('feedback')} />
        </div>
    </div>
  );
};

export default App;