// set up time zone here
const timeZone = 'America/Chicago'
const currentTime = new Date()

// set up verification code expirationTime upon register
const codeExpirationTime = () => {
    const min = 5
    const codeExpires = new Date(Date.now() + min * 60 * 1000).toLocaleString('en-US', { timeZone })
    return codeExpires
}

// Used to display time in console only
const convertToCentralTime = (min) => {
    const cstOffset = -6 * 60 * 60 * 1000 // -6 hours in milliseconds
    const centralTime = new Date(currentTime.getTime() + cstOffset)
    const roundedMinutes = Math.ceil(centralTime.getMinutes() / min) * min;
    centralTime.setMinutes(roundedMinutes)
    const time = centralTime.toISOString().slice(0, 16).replace('T', ' ');
    return time
}

// cron schedules
//set time here to run cron to remove unverified user
const timeToRemoveUnverifiedUser = () => {
    // At minute 35
    const min = 35
    const time = convertToCentralTime(min)
    const cronTime = `${min} * * * *`
    return { min, time, cronTime }
}

//set time here to run cron to remove expired code
const timeToRemoveExpiredCodes = () => {
    // Every 30 mins
    const min = 30
    const time = convertToCentralTime(min)
    const cronTime = `*/${min} * * * *`
    return { min, time, cronTime }
}

module.exports = {
    currentTime,
    codeExpirationTime,
    timeToRemoveUnverifiedUser,
    timeToRemoveExpiredCodes,

}