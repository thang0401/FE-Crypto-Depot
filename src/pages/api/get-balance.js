// /pages/api/get-balance.js
import { getRedisClient } from '../../utils/redis'; // Điều chỉnh đường dẫn nếu cần

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

    // Lấy client Redis
    const client = await getRedisClient();

    // Sử dụng client.get để lấy số dư
    const balance = parseFloat((await client.get(balanceKey)) || '0');
    const frozenBalance = parseFloat((await client.get(frozenBalanceKey)) || '0');

    res.status(200).json({ balance, frozenBalance });
  } catch (err) {
    console.error('Lỗi khi lấy số dư:', err);
    res.status(500).json({ error: 'Không thể lấy số dư' });
  }
}