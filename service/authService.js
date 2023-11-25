const axios = require('axios');

const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post('https://suap.ifrn.edu.br/api/v2/autenticacao/token/', {
                username: username,
                password: password
            });
            console.log(response.data);
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
      }
};

module.exports = authService;