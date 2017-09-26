'use strict';

const Model          = require('../Base/Model');
const CmsRestHelper  = require('../../helper/RestHelper/Cms');

class CMSContentModel extends Model {
    constructor(id){
        super()
        this.CmsRestHelper = new CmsRestHelper()
        this.content =  this.CmsRestHelper.getContent(id)
        this.language = global.args.language
    }

    content_id() { return  parseInt( this.content.id ) }

    first_name(){
        if (typeof this.content.attributes.first_name !== "undefined" ){
            switch(this.language) {
                case 'th':return this.content.attributes.first_name.th;break;
                case 'en':return this.content.attributes.first_name.en;break;
                case 'zh':return this.content.attributes.first_name.zh;break;
                default:return this.content.attributes.first_name.th;break;
            }
        }
    }
    
    last_name() { 
        if (typeof this.content.attributes.last_name !== "undefined" ){
            switch(this.language) {
                case 'th':return this.content.attributes.last_name.th;break;
                case 'en':return this.content.attributes.last_name.en;break;
                case 'zh':return this.content.attributes.last_name.zh;break;
                default:return this.content.attributes.last_name.th;break;
            }
        }
    }
    address() { 
        if (typeof this.content.attributes.address !== "undefined" ){
            switch(this.language) {
                case 'th':return this.content.attributes.address.th;break;
                case 'en':return this.content.attributes.address.en;break;
                case 'zh':return this.content.attributes.address.zh;break;
                default:return this.content.attributes.address.th;break;
            }
        }
    }
}

module.exports = CMSContentModel 