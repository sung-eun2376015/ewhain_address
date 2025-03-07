import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import authenticateToken from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

// 회원탈퇴 API
router.delete('/delete-account', authenticateToken, async (req, res) => {
   try {
     // JWT에서 사용자 ID 추출
     const userId = req.user.id; // "yerin"과 같은 사용자 정의 ID
     
     // id 필드로 문서 조회 및 삭제
     const deletedUser = await User.findOneAndDelete({ id: userId });
     
     if (!deletedUser) {
       return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
     }
     
     res.json({ message: '계정이 성공적으로 삭제되었습니다.' });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: '서버 오류가 발생했습니다.' });
   }
 });
 

// 회원가입 API
router.post('/signup', async (req, res) => {
  try {
    const { id, pw, name, num, team, phoneNum, address, email } = req.body;

    // 중복 아이디 체크
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(pw, 12);

    // 사용자 생성
    const user = new User({
      id,
      password: hashedPassword,
      name,
      num,
      team,
      phoneNum,
      address,
      email,
    });

    await user.save();
    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 로그인 API
router.post('/login', async (req, res) => {
  try {
    const { id, pw } = req.body;

    const user = await User.findOne({ id });
    if (!user) {
      return res.status(400).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    const isMatch = await bcrypt.compare(pw, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;
