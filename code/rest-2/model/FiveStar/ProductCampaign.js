'use strict';

const Model          = require('../Base/Model');
const FiveStarRestHelper = require('../../helper/RestHelper/FiveStar');

class ProductCampaignModel extends Model {
    constructor(master_id){
        super()
        this.FiveStarRestHelper = new FiveStarRestHelper()
        // this.master =  this.FiveStarRestHelper.FiveStarRestHelper(master_id)
    }
    cvid(){ /*this.productcampaign.cvid*/ return 12134 }
}
module.exports = ProductCampaignModel