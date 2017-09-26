'use strict';

const Model          = require('../Base/Model');
const CmsRestHelper  = require('../../helper/RestHelper/Cms');

class CMSContentModel extends Model {
    constructor(offset,limit){
        super()
        this.CmsRestHelper = new CmsRestHelper()
        this.content =  this.CmsRestHelper.getContent(offset,limit)
    }

    content_id() { return  parseInt( this.content.id ) }
    first_name() { return this.content.first_name }
    last_name() { return this.content.last_name }
}

module.exports = CMSContentModel 