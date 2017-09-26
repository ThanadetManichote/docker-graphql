const RestHelper     = require('../RestHelper');

class CmsRestHelper extends RestHelper{
    constructor(){ 
        super()
        this.url = "http://staging-mic-cms-ms-api.eggdigital.com:8107/"
        this.api_key = global.args.language
    }
    getContent(id){
        return this._callRest('GET', this.url+"content/detail",'id='+id, this._getOption()).data;
    }
    getContentList(limit,offset){
        return this._callRest('GET', this.url+"content",'page[offset]='+offset+'&page[limit]='+limit, this._getOption()).data; 
    }
    postCreateContent(params){
        return this._callRest('POST', this.url+"content",params, this._postOption()).data;
    }

    _getOption(){
        return { 
            'headers' : { 'language': this.language }
        }
    }

    _postOption(){
        return { 
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }

            //  create_content(){
        // postCreateContent
        // var res_return = {
        //         first_name: {
        //             th:'สมศักดิ์',
        //           en:'Somsak',
        //           zh:'Somsak(zh)'
        //         },
        //         last_name:{
        //             th:'มั่นคง',
        //           en:'Munkong',
        //           zh:'Munkong(zh)'
        //         }
        //     };
        //     return res_return
        // }
}
module.exports = CmsRestHelper

