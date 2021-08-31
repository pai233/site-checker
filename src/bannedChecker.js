let _ = require("axios").default
const cookie = require("tough-cookie");
const cookieSupporter = require("axios-cookiejar-support").default
const JAR = new cookie.CookieJar()
const https = require("https")
_ = cookieSupporter(_)
_.defaults.jar = JAR
_.defaults.withCredentials = true
_.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false
})
async function check(domain) {
    let html =await _.post('https://www.itdog.cn/firewall/'+domain,"more=no");
    let useLogTokenReg=new RegExp(/{ token:\u0020"(.*)" }/g)
    let useLogToken = useLogTokenReg.exec(html.data)[1]
    let checkTokenReg = RegExp(/var\u0020token='(.*)'/g)
    let checkToken = checkTokenReg.exec(html.data)[1]
    await _.post('https://www.itdog.cn/public/ajax.aspx?type=use_log',"token="+useLogToken,{
        headers: {
            'Referer': 'https://www.itdog.cn/firewall/'+domain
        }
    })
    let gfwStatus = await _.post('https://www.itdog.cn/public/ajax.aspx?type=firewall',"host="+domain+"&token="+checkToken,{
        headers: {
            'Referer': 'https://www.itdog.cn/firewall/'+domain
        }
    })
    let dnsStatus = await _.post('https://www.itdog.cn/public/ajax.aspx?type=dns_error',"host="+domain+"&token="+checkToken,{
        headers: {
            'Referer': 'https://www.itdog.cn/firewall/'+domain
        }
    })
    if(gfwStatus.data.type=='error' || dnsStatus.data.type=='error'){
        return {
            status: 'Error',
            message: 'API Request Failed',
            gfwBanned: null,
            dnsError: null
        }
    }
    if(gfwStatus.data.firewall===undefined)return check(domain)
    return {
        status: 'Success',
        gfwBanned: gfwStatus.data.firewall,
        dnsError: dnsStatus.data.dns_error,
        message: null
    }
    
}
module.exports = {
    check
}