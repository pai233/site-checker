const _ = require("axios").default

async function httpsChecker(domain){
    let sslStatus = await _.post('https://api-tools.sslchaoshi.com/ssltools/sslVerity',"hostname="+domain+"&port=443",{
        headers: {
            'Referer': 'https://www.sslceshi.com/'
        }
    })
    return sslStatus.data;
}
module.exports = {
    httpsChecker
}