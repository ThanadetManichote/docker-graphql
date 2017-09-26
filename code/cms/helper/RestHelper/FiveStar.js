const RestHelper     = require('../RestHelper');

class FiveStarRestHelper extends RestHelper{
    constructor(){ 
        super()
        
        this.url = "http://staging-api-kaiyang.eggdigital.com/"
        this.url_activity = "http://staging-api-kaiyang-myanmar-activity.eggdigital.com:8104/"
        this.url_activity_config = "http://staging-api-kaiyang-myanmar-activityconfig.eggdigital.com:8105/"

        this.api_key = global.args.api_key
    }
    getProductCampaignList(cvid, limit, offset){
        var response = this._callRest('GET', this.url+"api/getproductcampaign", 'cvid='+cvid+'&limit='+limit+'&offset='+offset, this._getOption())

        if(response.status == '200')
            return response.data;
        else
            this.error = response
    }
    getProductCampaign(cvid){
        // return this._callRest('GET', this.url+"api/getproductcampaign", 'cvid='+cvid+'&limit='+limit+'&offset='+offset, this._getOption()).data;
    }
    getMember(cvid, secret_code){
        return this._callRest('POST', this.url+"api/getmemberinfo", 'cvid='+cvid+'&secretcode='+secret_code , this._getOption()).data;
    }
    //=================================================================================================
    getActivityConfigList(condition){
        return this._callRest('GET',this.url_activity_config+"activityconfig",'condition='+condition , this._getOption()).data;
    }
    getActivityConfig(id){
        return this._callRest('GET',this.url_activity_config+"activityconfig/"+id,'', this._getOption()).data;
    }
    getActivityList(date){
        return this._callRest('GET',this.url_activity+"activity/startenddate",'date='+date , this._getOption()).data;
    }
    getActivity(id){
        return this._callRest('GET',this.url_activity+"activity/"+id,'', this._getOption()).data;
    }
    //=================================================================================================


    getError(){ return this.error }

    _getOption(){
        return { 
            'headers' : { 'x-api-key': this.api_key }
        }
    }
}
module.exports = FiveStarRestHelper