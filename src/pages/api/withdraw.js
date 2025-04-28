// /pages/api/withdraw.js
import axios from 'axios';
import redisClient from '../../utils/redis';

const BACKEND_API_URL = 'https://be-crypto-depot.name.vn/api';

// Hàm lấy số dư từ DB
const getBalanceFromDB = async (userId) => {
  try {
    const response = await axios.get(
      `${BACKEND_API_URL}/TransactionHistory/GetUserDebitAmount/${userId}`
    );
    return response.data.balance || 0;
  } catch (err) {
    console.error('Lỗi khi lấy số dư từ DB:', err);
    throw new Error('Không thể lấy số dư từ DB');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Phương thức không được phép' });
  }

  const { userId, amount } = req.body;

  if (!userId || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  }

  const lockKey = `lock:user:${userId}`;
  const balanceKey = `user:${userId}:balance`;
  const frozenBalanceKey = `user:${userId}:frozenBalance`;

  try {
    // Thử khóa với SET NX (timeout 5 giây)
    const lockAcquired = await redisClient.set(lockKey, 'locked', {
      NX: true,
      PX: 5000 // TTL 5 giây
    });

    if (!lockAcquired) {
      return res.status(429).json({ error: 'Hệ thống đang bận, vui lòng thử lại sau' });
    }

    try {
      let balance = await redisClient.get(balanceKey);
      let frozenBalance = parseFloat((await redisClient.get(frozenBalanceKey)) || '0');

      // Nếu không có balance trong Redis, lấy từ DB
      if (balance === null) {
        balance = await getBalanceFromDB(userId);
        await redisClient.set(balanceKey, balance.toString());
      } else {
        balance = parseFloat(balance);
      }

      const availableBalance = balance - frozenBalance;

      if (amount > availableBalance) {
        return res.status(400).json({ error: 'Số dư khả dụng không đủ' });
      }

      // Tăng frozenBalance và đặt TTL 24 giờ
      await redisClient.incrByFloat(frozenBalanceKey, amount);
      await redisClient.expire(frozenBalanceKey, 86400);

      // Forward yêu cầu tới backend gốc
      const response = await axios.post(`${BACKEND_API_URL}/payment/withdraw`, {
        userId,
        amount
      });

      res.status(200).json({
        message: 'Yêu cầu rút tiền đã được gửi và đang chờ phê duyệt',
        data: response.data
      });
    } finally {
      // Mở khóa bằng cách xóa lockKey
      await redisClient.del(lockKey).catch((err) => console.error('Lỗi khi mở khóa:', err));
    }
  } catch (err) {
    console.error('Lỗi khi xử lý yêu cầu rút:', err);
    res.status(500).json({ error: err.message || 'Đã có lỗi xảy ra' });
  }
}