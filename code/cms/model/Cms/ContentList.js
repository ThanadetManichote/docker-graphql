'use strict';

const Model          = require('../Base/Model');
const CMSContentModel = require('./Content');
const CmsRestHelper  = require('../../helper/RestHelper/Cms');

class CMSContentListModel extends Model {
    constructor(limit , offset){
        super()

        this.CmsRestHelper = new CmsRestHelper()
        this.content_list =  this.CmsRestHelper.getContentList(limit,offset)
        console.log('*******************************************');
        console.log(this.content_list)
    }
    content_ids(){
        return this.content_list.map(function(content){ return content.id })
    }
    content(){
        console.log('you work on content_list')
        var res_return = []

        this.content_ids().forEach(function(item) {
            res_return.push( new CMSContentModel(item) ) 
        } )

        return res_return
    }


}

module.exports = CMSContentListModel 