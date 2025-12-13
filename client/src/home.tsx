import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Feedback from './component/feedback';
import Navbar from './component/Navbar';
import HeroSlider from './component/HeroSlider';
import AuthModal from './component/authmodal';



function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  // --- LOGIC ---
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // Không có token thì thôi
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Gửi kèm token
          }
        });
        const data = await res.json();
        if (data.success) {
          setCurrentUser(data.data);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Lỗi xác thực:", error);
        localStorage.removeItem('token');
      }
    };

    checkLoggedIn();
  }, []);

  const addToCart = (product) => setCart([...cart, product]);
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (!currentUser) return setIsAuthOpen(true);
    if (cart.length === 0) return alert("Giỏ hàng đang trống!");

    try {
      const res = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, total: totalAmount, user: currentUser })
      });
      const data = await res.json();
      if (data.success) navigate(`/orderDetail/${data.orderId}`);
    } catch (e) { console.error(e) }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50">

      <Navbar
        cartCount={cart.length}
        totalAmount={totalAmount}
        currentUser={currentUser}
        onCheckout={handleCheckout}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          localStorage.removeItem('token');
          setCurrentUser(null);
        }}
      />

      <HeroSlider />

      <main className="px-6 py-16 mx-auto max-w-7xl">
        <h2 className="mb-12 text-3xl font-bold tracking-wide text-center uppercase">Sản Phẩm Mới Nhất</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {products.map(product => (
            <div key={product.id} className="overflow-hidden transition-all duration-300 bg-white shadow-sm group rounded-xl hover:shadow-xl">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                <button
                  onClick={() => addToCart(product)}
                  className="absolute flex items-center justify-center w-10 h-10 text-black transition-transform translate-y-12 bg-white rounded-full shadow-lg bottom-4 right-4 group-hover:translate-y-0 hover:bg-black hover:text-white"
                >
                  +
                </button>
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-lg font-bold truncate">{product.name}</h3>
                <p className="text-gray-500">{product.price.toLocaleString()} VND</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Feedback />

      <footer className="py-8 mt-12 text-center text-white bg-black">
        <p>© 2025 Lif Studio - Fashion & Style</p>
      </footer>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </div>
  );
}

export default Home;
