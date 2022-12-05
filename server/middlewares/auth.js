import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedData = jwt.verify(token, process.env.SECRET);
        req.userId = decodedData?.id;

        next();
    } catch (error) {
        console.log(error);
    }
}