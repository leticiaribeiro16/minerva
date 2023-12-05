const axios = require('axios');
const jwt = require('jsonwebtoken');
const secret = 'senhamuitoforte';

const authService = {
  login: async (username, password) => {
    //return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIwMjAxMDQxMTEwMDA1Iiwicm9sZSI6IkFsdW5vIiwiaWF0IjoxNzAxMjE5MTM3LCJleHAiOjE3MDEyMjI3Mzd9.xoLkyQ6nmOIFL2NzIA-8jmPpNiYQVEZXo7erzP-9TNM";
    try {
      const response = await axios.post('https://suap.ifrn.edu.br/api/v2/autenticacao/token/', {
        username: username,
        password: password
      });
      if (response.data.access) {
        return response.data.access;
      } else {
        throw new Error('Access token not found in response');
      }
    } catch (error) {
      throw error;
    }
  },
  getData: async (token) => {
    try {
      const response = await axios.get('https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createToken: (user) => {
    const payload = {
      username: user.username,
      role: user.role
    };
    const options = {
      expiresIn: '1h'
    };
    return jwt.sign(payload, secret, options);
  },
  decodeToken: (token) => {
    try {
      const decoded = jwt.verify(token, secret);
      return {
        username: decoded.username,
        role: decoded.role
      };
    } catch (error) {
      throw error;
    }
  },
  isTokenValid: (token) => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  }
};

module.exports = authService;