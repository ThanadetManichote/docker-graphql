'use strict';

const Model          = require('../Base/Model');
const CmsRestHelper = require('../../helper/RestHelper/Cms');

class CmsDataContentModel extends Model {
    constructor( data ){
        super()

        this.CmsRestHelper = new CmsRestHelper()
        this.data             = this.CmsRestHelper.postCreateContent( data )
    }
    data(){ return  this.data }
}

module.exports = CmsDataContentModel

