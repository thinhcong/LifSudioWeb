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
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
      
      <Navbar 
        cartCount={cart.length}
        totalAmount={totalAmount}
        currentUser={currentUser}
        onCheckout={handleCheckout}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setCurrentUser(null)}
      />

      <HeroSlider />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-wide">Sản Phẩm Mới Nhất</h2>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button 
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform hover:bg-black hover:text-white"
                >
                  +
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
                <p className="text-gray-500">{product.price.toLocaleString()} VND</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Feedback />

      <footer className="bg-black text-white py-8 text-center mt-12">
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
