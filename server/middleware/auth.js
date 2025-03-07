import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(403).json({ message: '토큰이 필요합니다.' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decodedToken; // 사용자 정보를 요청 객체에 추가
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
  }
};

export default authMiddleware;
