import axios from 'axios';
import { getRedisClient } from '../../utils/redis';

const BACKEND_API_URL = 'https://be-crypto-depot.name.vn/api';

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

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId không hợp lệ' });
  }

  try {
    const balance = await getBalanceFromDB(userId);
    const balanceKey = `user:${userId}:balance`;
    const frozenBalanceKey = `user:${userId}:frozenBalance`;

    let frozenBalance = 0;

    try {
      const redisClient = await getRedisClient();
      const cachedFrozenBalance = await redisClient.get(frozenBalanceKey);
      frozenBalance = parseFloat(cachedFrozenBalance || '0');

      // Kiểm tra giao dịch Pending
      const response = await axios.get(
        `${BACKEND_API_URL}/payment/transactions/user/${userId}`
      );
      const transactions = response.data;

      const hasPending = transactions.some((tx) => tx.status === 'Pending');

      if (!hasPending) {
        // Không có giao dịch Pending → Xóa frozenBalance
        await redisClient.del(frozenBalanceKey);
        frozenBalance = 0;
      }

      // Cập nhật balance trong Redis
      await redisClient.set(balanceKey, balance.toString());
    } catch (redisErr) {
      console.error('Lỗi khi tương tác với Redis:', redisErr);
      // Nếu Redis lỗi, trả balance từ DB, frozenBalance = 0
    }

    res.status(200).json({ balance, frozenBalance });
  } catch (err) {
    console.error('Lỗi khi làm mới số dư:', err);
    res.status(500).json({ error: 'Không thể làm mới số dư' });
  }
};