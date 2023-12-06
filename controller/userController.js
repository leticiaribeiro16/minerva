const User = require('../model/user');
const authService = require('../service/authService');

exports.authenticateUser = async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password){
            return res.status(400).json({ message: 'Username and password are required.' });
        }
        const suapToken = 'token here'; //await authService.login(req.body.username, req.body.password);

        if (suapToken) {
            let apptoken;
            const user = await User.findByMatricula(req.body.username);
            let acesso;
            if (user) {
                apptoken = authService.createToken({ username: req.body.username, role: user.role });
                acesso = user.role;
                await User.update(
                    req.body.username,
                    suapToken,
                    apptoken
                );
            } else {
                const data = await authService.getData(suapToken);
                apptoken = authService.createToken({ username: req.body.username, role: data.tipo_vinculo });
                acesso = data.tipo_vinculo;
                await User.create(data.nome_usual,
                    data.email,
                    data.matricula,
                    data.tipo_vinculo,
                    suapToken,
                    apptoken);
            }
            req.session.token = apptoken;
            res.status(200).json({ message: 'User authenticated and updated successfully!', token: apptoken, acesso: acesso });
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