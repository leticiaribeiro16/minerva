const User = require('../model/user');
const authService = require('../service/authService');

exports.authenticateUser = async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password){
            return res.status(400).json({ message: 'Username and password are required.' });
        }
        const token = await authService.login(req.body.username, req.body.password);

        if (token) {
            const data = await authService.getData(token);
            const id = await User.findByMatricula(req.body.username);
            if (id) {
                await User.update(
                    data.nome_usual,
                    data.email,
                    data.matricula,
                    data.tipo_vinculo,
                    token
                );
            } else {
                await User.create(data.nome_usual,
                    data.email,
                    data.matricula,
                    data.tipo_vinculo,
                    token);
            }

            res.status(200).json({ message: 'User authenticated and updated successfully!', token: token });
        } else {
            res.status(401).json({ message: 'Authentication failed.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.', error: error });
    }
};
exports.updateUserComissao = async (req, res, next) => {
    try {
        if(!req.body.matricula){
            return res.status(400).json({message: 'Matricula required'});
        }

        const user = await User.findByMatricula(req.body.matricula);
        if (user){
            if (typeof req.body.comissao !== 'boolean') {
                return res.status(400).json({ message: 'Bad Request: comissao must be a boolean.' });
            }
            await User.updateUserComissao(
                req.body.matricula,
                req.body.comissao
            );
            res.status(200).json({ message: 'User commission updated successfully!' });
        }else {
            res.status(404).json({ message: 'User does not exist!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred.', error: error });
    }
};