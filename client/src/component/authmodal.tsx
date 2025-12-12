import { useState, useEffect } from 'react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', password: '' });
      setIsRegister(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Giả lập API call
    setTimeout(() => {
      setLoading(false);
      const userData = {
        name: isRegister ? formData.name : "Khách hàng Vip",
        email: formData.email,
        avatar: `https://ui-avatars.com/api/?background=random&name=${isRegister ? formData.name : "User"}`
      };
      onLoginSuccess(userData);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold z-10">&times;</button>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-gray-900">LIF STUDIO</h2>
            <p className="text-sm text-gray-500">{isRegister ? "Tạo tài khoản mới" : "Chào mừng trở lại!"}</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            {['Đăng Nhập', 'Đăng Ký'].map((tab, idx) => (
              <button
                key={idx}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${((!isRegister && idx === 0) || (isRegister && idx === 1)) ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setIsRegister(idx === 1)}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <InputGroup label="Họ và tên" placeholder="Nguyễn Văn A" onChange={(v) => setFormData({...formData, name: v})} />
            )}
            <InputGroup label="Email" type="email" placeholder="example@mail.com" onChange={(v) => setFormData({...formData, email: v})} />
            <InputGroup label="Mật khẩu" type="password" placeholder="••••••••" onChange={(v) => setFormData({...formData, password: v})} />

            <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold py-3.5 rounded-lg hover:bg-gray-800 transition-all shadow-lg flex justify-center items-center mt-4">
              {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : (isRegister ? "TẠO TÀI KHOẢN" : "ĐĂNG NHẬP")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Component con nhỏ để tái sử dụng Input
const InputGroup = ({ label, type = "text", placeholder, onChange }) => (
  <div className="group">
    <label className="block text-xs font-bold text-gray-700 uppercase mb-1 ml-1">{label}</label>
    <input 
      type={type} required
      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default AuthModal;