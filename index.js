const bannedChecker = require('./src/bannedChecker')
async function checkSite(domain) {
    let status = await bannedChecker.check(domain)
    console.log(status)
}
checkSite("google.com")