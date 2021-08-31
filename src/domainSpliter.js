function getMainDomain(domain){
    console.log(domain.split('.').slice(-2).join('.'))
    return domain.split('.').slice(-2).join('.')
}
module.exports = {
    getMainDomain
}