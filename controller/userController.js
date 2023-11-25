const User = require('../model/user');
const authService = require('../service/authService');

exports.authenticateUser = async (req, res, next) => {
    try {
        const token = await authService.login(req.body.username, req.body.password);

        if (token) {
            const data = await authService.getData(token);
            const id = await User.findByUsername(req.body.username);
            if (id) {
                await User.update(
                    id,
                    data.nome_usual,
                    data.email,
                    data.matricula,
                    data.tipo_vinculo = 'comum',
                    token
                );
            } else {
                await User.create(req.body.username,
                                data.nome_usual,
                                data.email,
                                data.matricula,
                                data.tipo_vinculo = 'comum',
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