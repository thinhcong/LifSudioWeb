import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import Feedback from './component/feedback';

// Dữ liệu banner
const banners = [
  {
    id: 1,
    title: "SUMMER VIBES 2025",
    category: "Nữ Tính · Xu Hướng Mới",
    desc: "Tỏa sáng rực rỡ với bộ sưu tập váy hoa và áo kiểu mùa hè.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "GENTLEMAN STYLE",
    category: "Nam Giới · Lịch Lãm",
    desc: "Đẳng cấp phái mạnh với những bộ Vest và Sơ mi thiết kế riêng.",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "URBAN STREETWEAR",
    category: "Unisex · Cá Tính",
    desc: "Bứt phá giới hạn bản thân với phong cách đường phố cực chất.",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1470&auto=format&fit=crop",
  }
];

function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  // --- Logic tự động chuyển slide ---
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(slideInterval);
  }, []);

  // API lấy sản phẩm
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Lỗi:", err));
  }, []);

  const addToCart = (product: any) => setCart([...cart, product]);
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Giỏ hàng đang trống!");

    try {
      const res = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, total: totalAmount })
      });

      const data = await res.json();

      if (data.success) {
        const id = data.orderId; // lấy ID từ backend
        navigate(`/orderDetail/${id}`); // chuyển hướng sang order:id
      }

    } catch (err) {
      console.error(err);
      alert("Lỗi khi đặt hàng!");
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="logo">LIF STUDIO</div>
          <div className="cart-area">
            <span className="cart-total">{cart.length} món - {totalAmount.toLocaleString()}đ</span>
            <button onClick={handleCheckout} className="btn-checkout">Thanh Toán</button>
          </div>
        </div>
      </nav>

      {/* Slider */}
      <div className="hero-slider">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="overlay"></div>
            <div className="slide-content">
              <h1>{banner.title}</h1>
              <div className="meta-info">
                <button className="btn-stream">Stream now</button>
                <span className="category"><strong>{banner.category}</strong></span>
                <span className="desc">· {banner.desc}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="dots-container">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? 'active-dot' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Products */}
      <main className="main-content">
        <h2 className="section-title">Sản Phẩm Mới Nhất</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="image-wrapper"><img src={product.image} alt={product.name} /></div>
              <div className="card-body">
                <h3>{product.name}</h3>
                <p className="price">{product.price.toLocaleString()} VND</p>
                <button className="btn-add" onClick={() => addToCart(product)}>+ Thêm</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Feedback />


      <footer><p>© 2025 Brand Shop</p></footer>
    </div>
  );
}

export default Home;
