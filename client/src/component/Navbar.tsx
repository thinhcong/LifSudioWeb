const Navbar = ({ cartCount, totalAmount, currentUser, onCheckout, onOpenAuth, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tighter cursor-pointer">LIF STUDIO</div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end text-sm">
            <span className="font-bold">{cartCount} sản phẩm</span>
            <span className="text-gray-500">{totalAmount.toLocaleString()}đ</span>
          </div>

          <button onClick={onCheckout} className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 hover:scale-105 transition-all shadow-lg">
            Thanh Toán
          </button>

          <div className="h-8 w-[1px] bg-gray-300 mx-2"></div>

          {currentUser ? (
            <div className="flex items-center gap-3 animate-fadeIn">
              <img src={currentUser.avatar} alt="Avatar" className="w-9 h-9 rounded-full border border-gray-200" />
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-bold">{currentUser.name}</p>
                <button onClick={onLogout} className="text-xs text-red-500 hover:text-red-700 font-medium">Đăng xuất</button>
              </div>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">👤</div>
              <span className="hidden sm:inline">Tài khoản</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;