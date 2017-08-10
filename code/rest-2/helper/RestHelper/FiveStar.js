const RestHelper     = require('../RestHelper');

class FiveStarRestHelper extends RestHelper{
    constructor(){ 
        super()
        
        this.url = "http://staging-api-kaiyang.eggdigital.com/"
    }
    getProductCampaignList(cvid, limit, offset){
        return this._callRest('GET', this.url, 'api/getproductcampaign?cvid=2000031700&limit=2&offset=0').data.master;
    }
}
module.exports = FiveStarRestHelper