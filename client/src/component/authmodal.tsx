import React, { useState, useEffect, FormEvent } from 'react';

// 1. Định nghĩa các kiểu dữ liệu (Types/Interfaces)

// Kiểu dữ liệu User trả về từ API
interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role?: string;
}

// Kiểu dữ liệu cho Props của AuthModal
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

// Kiểu dữ liệu phản hồi từ API (Response)
interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

// Kiểu dữ liệu cho lỗi (Errors)
interface FormErrors {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  general?: string | null;
}

// 2. Component chính
const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form khi mở modal
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
      setIsRegister(false);
    }
  }, [isOpen]);

  // Hàm xử lý thay đổi input với Type an toàn
  const handleChange = (field: 'name' | 'email' | 'password', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Xóa lỗi của trường đó nếu người dùng nhập lại
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
    // Xóa lỗi chung
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: null }));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset lỗi cũ

    const endpoint = isRegister 
        ? 'http://localhost:5000/api/auth/register' 
        : 'http://localhost:5000/api/auth/login';

    const payload = isRegister 
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data: AuthResponse = await res.json();

      if (!data.success) {
        setLoading(false);
        const msg = data.message || "Có lỗi xảy ra";

        // Logic phân loại lỗi vào đúng ô input
        const newErrors: FormErrors = {};
        
        if (msg.toLowerCase().includes("email")) {
            newErrors.email = msg;
        } else if (msg.toLowerCase().includes("mật khẩu") || msg.toLowerCase().includes("password")) {
            newErrors.password = msg;
        } else {
            newErrors.general = msg; 
        }
        
        setErrors(newErrors);
        return;
      }

      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        onLoginSuccess(data.user);
        onClose();
      }

    } catch (error) {
      console.error(error);
      setErrors({ general: "Lỗi kết nối server. Vui lòng thử lại sau." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute z-10 text-2xl font-bold text-gray-400 top-4 right-4 hover:text-black">&times;</button>
        
        <div className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-black text-gray-900">LIF STUDIO</h2>
            <p className="text-sm text-gray-500">{isRegister ? "Tạo tài khoản mới" : "Chào mừng trở lại!"}</p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 mb-6 bg-gray-100 rounded-xl">
            {['Đăng Nhập', 'Đăng Ký'].map((tab, idx) => (
              <button
                key={idx}
                type="button"
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${((!isRegister && idx === 0) || (isRegister && idx === 1)) ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => {
                    setIsRegister(idx === 1);
                    setErrors({});
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Hiển thị lỗi chung */}
          {errors.general && (
            <div className="p-3 mb-4 text-sm text-center text-red-600 bg-red-100 rounded-lg">
                {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <InputGroup 
                label="Họ và tên" 
                placeholder="Nguyễn Văn A" 
                onChange={(v) => handleChange('name', v)} 
                error={errors.name}
              />
            )}
            
            <InputGroup 
                label="Email" 
                type="email" 
                placeholder="example@mail.com" 
                onChange={(v) => handleChange('email', v)} 
                error={errors.email} 
            />
            
            <InputGroup 
                label="Mật khẩu" 
                type="password" 
                placeholder="••••••••" 
                onChange={(v) => handleChange('password', v)} 
                error={errors.password} 
            />

            <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold py-3.5 rounded-lg hover:bg-gray-800 transition-all shadow-lg flex justify-center items-center mt-4">
              {loading ? <span className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></span> : (isRegister ? "TẠO TÀI KHOẢN" : "ĐĂNG NHẬP")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// 3. Component InputGroup với Props đã được định nghĩa kiểu
interface InputGroupProps {
  label: string;
  type?: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string | null;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, type = "text", placeholder, onChange, error }) => (
  <div className="group">
    <label className="block mb-1 ml-1 text-xs font-bold text-gray-700 uppercase">{label}</label>
    <input 
      type={type} 
      required
      className={`w-full px-4 py-3 text-sm transition-all border rounded-lg outline-none bg-gray-50 focus:bg-white focus:ring-1 
        ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' 
            : 'border-gray-200 focus:border-black focus:ring-black'
        }`}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && (
        <p className="mt-1 ml-1 text-xs font-medium text-red-500 animate-pulse">
            {error}
        </p>
    )}
  </div>
);

export default AuthModal;