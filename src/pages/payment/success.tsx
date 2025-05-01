'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface PayOSWebhookResponse {
  message: string;
  status: 'loading' | 'success' | 'error';
}

interface WebhookPayload {
  code: string;
  desc: string;
  data: {
    orderCode: number;
    amount: number;
    description: string;
    accountNumber: string;
    reference: string;
    transactionDateTime: string;
    currency: string;
    paymentLinkId: string;
    code: string;
    desc: string;
  };
  signature: string;
}

const PayOSWebhookSimulator: React.FC = () => {
  const [response, setResponse] = useState<PayOSWebhookResponse>({
    message: 'Đang gửi yêu cầu...',
    status: 'loading'
  });
  const router = useRouter();
  const hasCalledWebhook = useRef(false); // Theo dõi trạng thái gọi webhook

  useEffect(() => {
    if (hasCalledWebhook.current) return; // Không gọi lại nếu đã gọi

    const simulateWebhook = async () => {
      hasCalledWebhook.current = true; // Đánh dấu webhook đã được gọi

      let lastOrderCode: number;
      let lastAmount: number;
      let lastUserId: string;

      // Sử dụng try-catch để lấy dữ liệu từ localStorage
      try {
        const orderCode = localStorage.getItem('lastOrderCode');
        const amount = localStorage.getItem('lastAmount');
        const userId = localStorage.getItem('lastUserId');

        if (!orderCode || !amount || !userId) {
          throw new Error('Dữ liệu trong localStorage không đầy đủ');
        }

        lastOrderCode = parseInt(orderCode);
        lastAmount = parseInt(amount);
        lastUserId = userId;

        if (isNaN(lastOrderCode) || isNaN(lastAmount)) {
          throw new Error('Dữ liệu orderCode hoặc amount không hợp lệ');
        }
      } catch (error) {
        // Không gán giá trị mặc định, cập nhật trạng thái lỗi và dừng thực thi
        const errorMessage = error instanceof Error ? `Lỗi: ${error.message}` : 'Lỗi không xác định khi lấy dữ liệu từ localStorage';
        setResponse({
          message: errorMessage,
          status: 'error'
        });
        return; // Dừng hàm simulateWebhook
      }

      // Payload mẫu cho webhook, sử dụng dữ liệu từ localStorage
      const payload: WebhookPayload = {
        code: '00',
        desc: 'Success',
        data: {
          orderCode: lastOrderCode,
          amount: lastAmount,
          description: lastUserId, // userId
          accountNumber: '1234567890',
          reference: 'REF123456',
          transactionDateTime: new Date().toISOString(), // Lấy thời gian hiện tại
          currency: 'VND',
          paymentLinkId: 'PAYLINK123',
          code: '00',
          desc: 'Payment successful'
        },
        signature: 'abc123xyz'
      };

      try {
        // Gửi yêu cầu POST đến webhook endpoint
        const result = await axios.post('http://localhost:8000/api/payment/webhook/payos', payload);
        
        // Xử lý kết quả thành công
        setResponse({
          message: result.data,
          status: 'success'
        });

        // Chuyển hướng và xóa localStorage sau khi thành công
        setTimeout(() => {
          router.push('/buy-sell');
          localStorage.removeItem('lastOrderCode');
          localStorage.removeItem('lastAmount');
          localStorage.removeItem('lastUserId');
        }, 3000); // Trì hoãn 1 giây (có thể điều chỉnh thời gian)


      } catch (error) {
        // Xử lý lỗi
        let errorMessage = 'Đã xảy ra lỗi không xác định';
        
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = `Lỗi: ${error.response.status} - ${error.response.data || error.message}`;
        } else if (error instanceof Error) {
          errorMessage = `Lỗi: ${error.message}`;
        }
        
        setResponse({
          message: errorMessage,
          status: 'error'
        });
      }
    };

  
    // Gọi hàm gửi webhook khi component mount
    simulateWebhook();
  }, []); // Loại bỏ dependency [router]

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Gọi Webhook PayOS</h2>
        <div className={`text-lg ${
          response.status === 'loading' ? 'text-gray-600' :
          response.status === 'success' ? 'text-green-600' :
          'text-red-600'
        }`}>
          Giao dịch thành công
        </div>
      </div>
    </div>
  );
};

export default PayOSWebhookSimulator;