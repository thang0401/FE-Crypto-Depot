// /pages/api/get-balance.js
import redisClient from '../../utils/redis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Phương thức không được phép' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId không hợp lệ' });
  }

  try {
    const balanceKey = `user:${userId}:balance`;
    const frozenBalanceKey = `user:${userId}:frozenBalance`;

    // Sử dụng redisClient.get với cú pháp redis@4.x
    const balance = parseFloat((await redisClient.get(balanceKey)) || '0');
    const frozenBalance = parseFloat((await redisClient.get(frozenBalanceKey)) || '0');

    res.status(200).json({ balance, frozenBalance });
  } catch (err) {
    console.error('Lỗi khi lấy số dư:', err);
    res.status(500).json({ error: 'Không thể lấy số dư' });
  }
}