const bannedChecker = require('./src/bannedChecker')
const httpsChecker = require('./src/httpsSupportChecker')
const domainSpliter = require('./src/domainSpliter')
async function checkSite(domain) {
    let bannedStatus = await bannedChecker.check(domainSpliter.getMainDomain(domain))
    let httpsStatus = await httpsChecker.httpsChecker(domain)
    return {
        banned: bannedStatus,
        ssl: httpsStatus
    }
}
checkSite("google.cn")