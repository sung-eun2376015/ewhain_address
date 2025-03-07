import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// 내 정보 수정 API
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const { name, num, team, phoneNum, address, email } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { id: req.user.id },
      { name, num, team, phoneNum, address, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.json({ message: '정보가 성공적으로 수정되었습니다.', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 전체 인원 조회 API
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // 비밀번호는 제외하고 조회
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;
