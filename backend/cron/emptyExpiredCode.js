const User = require('../Models/user')
const cron = require('node-cron')
const { currentTime, timeToRemoveExpiredCodes } = require('./cron-config')
const { min, time, cronTime } = timeToRemoveExpiredCodes()

const removeExpiredCodes = async() => {
    try {
        console.log(`Timestamp every ${min} minutes:`, time)
        // update user's verification code field to empty string when code expires.
        await User.updateMany(
            { verificationCodeExpires: { $lt: currentTime} },
            { $set: { verificationCode: '', verificationCodeExpires: null } }
        )
    } catch (error) {
        console.error('Error removing expired verification codes:', error)
    }
}

const removeExpiredCodesCron = () => {
    let emptyVerificationCode = cron.schedule(cronTime, async () => {
        console.log('Emptying expired verification codes. Running now...')
        await removeExpiredCodes()
    })
    emptyVerificationCode.start()
}

module.exports = { removeExpiredCodesCron }
