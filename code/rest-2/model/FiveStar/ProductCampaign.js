'use strict';

const Model          = require('../Base/Model');
const FiveStarRestHelper = require('../../helper/RestHelper/FiveStar');

class ProductCampaignModel extends Model {
    constructor(master_id){
        super()
        this.TrueyouRestHelper = new FiveStarRestHelper()
        this.master =  this.FiveStarRestHelper.FiveStarRestHelper(master_id)
    }
    cvid(){ this.productcampaign.cvid}
}
module.exports = ProductCampaignModel