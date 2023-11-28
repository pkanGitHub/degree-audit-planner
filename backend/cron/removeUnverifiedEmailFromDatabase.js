// const cron = require('node-cron')
const User = require('../Models/user')

module.exports = async function () {
    try {
        const timeZone = 'America/Chicago'
        const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000).toLocaleString('en-US', { timeZone })
        console.log('Current timestamp:', new Date())
        console.log('Timestamp 3 minutes ago:', threeMinutesAgo)

        // Find and remove unverified users
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
