const User = require('../Models/user')
const cron = require('node-cron')
const { timeToRemoveUnverifiedUser} = require('./cron-config')
const { min, time, cronTime } = timeToRemoveUnverifiedUser()

const removeEmail = async() => {
    try {
        console.log(`Timestamp at minutes ${min}:`, time)
        // Find and remove unverified users
        const result = await User.deleteMany({
            emailVerified: false,
        })
        console.log(`${result.deletedCount} unverified users removed.`)
    } catch (error) {
        console.error('Error removing unverified users:', error)
    }
}

const removeUnverifiedEmailCron = () => {
     let removeUnverifiedEmail = cron.schedule(cronTime, async () => {
        console.log('Cron job scheduled. Running now...');
        await removeEmail();
      })
      removeUnverifiedEmail.start();
}

module.exports = { removeUnverifiedEmailCron }
