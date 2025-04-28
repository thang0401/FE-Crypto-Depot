// /pages/api/refresh-balance.js
import axios from 'axios';
import redisClient from '../../utils/redis';

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

    // Cập nhật balance và xóa frozenBalance
    await redisClient.set(balanceKey, balance.toString());
    await redisClient.del(frozenBalanceKey);

    res.status(200).json({ balance, frozenBalance: 0 });
  } catch (err) {
    console.error('Lỗi khi làm mới số dư:', err);
    res.status(500).json({ error: 'Không thể làm mới số dư' });
  }
}