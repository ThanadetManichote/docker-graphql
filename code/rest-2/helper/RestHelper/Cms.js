const RestHelper     = require('../RestHelper');

class CmsRestHelper extends RestHelper{
    constructor(){ 
        super()
        
        this.url = "http://staging-mic-cms-ms-api.eggdigital.com:8107/"
    }
    getContent(offset,limit){
        return this._callRest('GET', this.url+"content",'offset='+offset+'&limit='+limit ', this._getOption()).data;
    }


    _getOption(){
        return { 
        }
    }
}
module.exports = CmsRestHelper

