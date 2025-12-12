import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState(null) as any;
    const [loading, setLoading] = useState(true);
    console.log(id,"lam");
const [qr, setQr] = useState("");

const handlePayment = () => {
    const qrUrl = `https://img.vietqr.io/image/VCB-1027120242-compact.png?amount=${order.total}&addInfo=DH${order._id}`;
    setQr(qrUrl);
};
    useEffect(() => {
        fetch(`http://localhost:5000/api/order/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setOrder(data.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center h-screen text-xl font-semibold">
            Đang tải đơn hàng...
        </div>
    );

    if (!order) return (
        <div className="flex items-center justify-center h-screen text-xl text-red-500">
            Không tìm thấy đơn hàng.
        </div>
    );

    return (
        <div className="max-w-4xl px-4 mx-auto mt-10">
            
            <h1 className="mb-6 text-3xl font-bold ">Chi Tiết Đơn Hàng</h1>

            {/* Thông tin đơn hàng */}
            <div className="p-6 mb-8 bg-white border border-gray-200 shadow rounded-xl">
                <p className="mb-2"><span className="font-semibold">Mã đơn hàng:</span> {order._id}</p>
                <p className="mb-2"><span className="font-semibold">Ngày đặt:</span> {new Date(order.date).toLocaleString()}</p>
                <p><span className="font-semibold">Tổng tiền:</span> {order.total.toLocaleString()}đ</p>
            </div>

            <h2 className="mb-4 text-2xl font-semibold">Sản phẩm trong đơn</h2>

            {/* Danh sách sản phẩm */}
            <div className="space-y-4">
                {order.cart.map((item: { image: string | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: { toLocaleString: () => string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; }, index: Key | null | undefined) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                        
                        <img 
                            src={item.image} 
                            className="object-cover w-20 h-20 rounded-lg"
                        />

                        <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-gray-600">
                                Giá: {item.price.toLocaleString()}đ
                            </p>
                        </div>

                    </div>
                ))}
            </div>

            {/* Nút thanh toán momo */}


{/* Popup QR */}
{qr && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div className="p-6 text-center bg-white shadow-xl rounded-xl">
            <h2 className="mb-4 text-xl font-semibold">Quét QR để thanh toán</h2>

            <img src={qr} alt="QR Momo" className="w-64 h-64 p-2 mx-auto border" />

            <button
                className="px-5 py-2 mt-4 text-white bg-gray-800 rounded-lg"
                onClick={() => setQr("")}
            >
                Đóng
            </button>
        </div>
    </div>
)}
            {/* Back button */}
      <div className="flex justify-between py-8">

    {/* Nút quay lại */}
    <a 
        href="/" 
        className="inline-block px-6 py-3 text-white transition bg-black rounded-lg hover:opacity-90"
    >
        Quay lại trang chủ
    </a>

    {/* Nút thanh toán VNPAY */}
    <button
        onClick={handlePayment}
        className="px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
    >
        Thanh toán VNPAY
    </button>

</div>
        </div>
    );
}

export default OrderDetail;
