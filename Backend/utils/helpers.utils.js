const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwt_user_key = process.env.JWT_USER_TOKEN_KEY;
const jwt_admin_key = process.env.JWTTOKEN_KEY;


const generateToken = (user) => {
  return jwt.sign({ data: user }, jwt_user_key, { expiresIn: '30d' });
};

const generateAdminToken = (user) => {
    return jwt.sign({ data: user }, jwt_admin_key, { expiresIn: '30d' });
  };


const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  generateAdminToken,
  hashPassword,
  comparePassword,
};
