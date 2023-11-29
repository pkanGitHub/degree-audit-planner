// set up time zone here
const timeZone = 'America/Chicago'

// set up verification code expirationTime upon register
const codeExpirationTime = () => {
    const min = 5
    const codeExpires = new Date(Date.now() + min * 60 * 1000).toLocaleString('en-US', { timeZone })
    return codeExpires
}

// cron schedule
const cronSchedule = (min) => {
    const time = new Date(Date.now() - min * 60 * 1000).toLocaleString('en-US', { timeZone })
    return time
}

//set time here to run cron to remove unverified user
const timeToRemoveUnverifiedUser = () => {
    // At minute 35
    const min = 35
    const timeAgo = cronSchedule(min)
    const cronTime = `${min} * * * *`
    return { min, timeAgo, cronTime }
}

//set time here to run cron to remove expired code
const timeToRemoveExpiredCodes = () => {
    // At minute 30
    const min = 30
    const timeAgo = cronSchedule(min)
    const cronTime = `*/${min} * * * *`
    return { min, timeAgo, cronTime }
}

module.exports = { 
    codeExpirationTime,
    cronSchedule,
    timeToRemoveUnverifiedUser,
    timeToRemoveExpiredCodes,

}