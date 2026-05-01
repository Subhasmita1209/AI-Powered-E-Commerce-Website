import jwt from 'jsonwebtoken';
export const generateToken = async (userId) => {
    try {
        const token = jwt.sign({  id: userId }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        return token;
    } catch (error) {
        console.log(" Token error:");
       
    }
}

export const generateToken1 = async (email) => {
    try {
        const token = jwt.sign({ email}, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        return token;
    } catch (error) {
        console.log(" Token error:");
       
    }
}