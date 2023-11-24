// const cron = require('node-cron')
const User = require('../Models/user')

// Schedule a task to run everyday at 12:00
// cron.schedule('0 12 * * *', async () => {
module.exports = async function () {
    try {
        console.log('Cron job function running...');
        // Calculate the timestamp 3 minutes ago (adjust based on the verification code expiration)
        // const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000)
        const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000).toUTCString();
        console.log('Current timestamp:', new Date());
        console.log('Timestamp 3 minutes ago:', threeMinutesAgo);

        // Find and remove unverified users created more than 3 minutes ago
        const result = await User.deleteMany({
        emailVerified: false,
        // createdAt: { $lt: threeMinutesAgo },
        })

        console.log(`${result.deletedCount} unverified users removed.`)
    } catch (error) {
        console.error('Error removing unverified users:', error)
    }
// })
}
