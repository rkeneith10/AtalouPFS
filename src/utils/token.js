const jwt = require('jsonwebtoken');
const createToken = async (user, secret, expiresIn) => {
    const { id, username, role } = user;
    return await jwt.sign({ id, username, role }, secret, { expiresIn });
};

const getMe = async req => {
    if(req){
        const token = req.headers['x-token'];
  
        if (token) {
            try {
                return await jwt.verify(token, process.env.JWT_SECRET);
            } catch (e) {
                throw new AuthenticationError(
                'Your session expired. Sign in again.',
                );
            }
        }
    }
    return {};
  };

module.exports = {
    createToken,
    getMe
}