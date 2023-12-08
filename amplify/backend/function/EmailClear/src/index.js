const connection = require('./db');
const mongoose = require('mongoose')
const User = () => mongoose.model('User', require('./user'));

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    await removeExpiredCodes();
    await removeEmail()
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
const currentTime = new Date()

const removeExpiredCodes = async() => {
    try {
        // update user's verification code field to empty string when code expires.
        await User().updateMany(
            { verificationCodeExpires: { $lt: currentTime} },
            { $set: { verificationCode: '', verificationCodeExpires: null } }
        )
    } catch (error) {
        console.error('Error removing expired verification codes:', error)
    }
}

const removeEmail = async() => {
    try {
        // Find and remove unverified users
        const result = await User().deleteMany({
            emailVerified: false,
        })
        console.log(`${result.deletedCount} unverified users removed.`)
    } catch (error) {
        console.error('Error removing unverified users:', error)
    }
}
