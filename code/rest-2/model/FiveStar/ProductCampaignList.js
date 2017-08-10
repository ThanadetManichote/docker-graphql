'use strict';

const Model          = require('../Base/Model');
const FiveStarRestHelper = require('../../helper/RestHelper/FiveStar');

class ProductCampaignListModel extends Model {
    constructor(cvid , limit , offset){
        super()
        this.FiveStarRestHelper = new FiveStarRestHelper()
        this.master =  this.FiveStarRestHelper.getProductCampaignList(cvid , limit , offset)
    }
}

module.exports = ProductCampaignListModel