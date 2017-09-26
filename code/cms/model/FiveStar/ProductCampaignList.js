'use strict';

const Model          = require('../Base/Model');
const ProductCampaignModel = require('./ProductCampaign');
const FiveStarRestHelper = require('../../helper/RestHelper/FiveStar');

class ProductCampaignListModel extends Model {
    constructor(cvid , limit , offset){
        super()

        this.FiveStarRestHelper = new FiveStarRestHelper()
        this.product_campaign_list =  this.FiveStarRestHelper.getProductCampaignList(cvid , limit , offset)
    }
    product_campaign_ids(){
        // console.log(this.product_campaign_list )

        return this.product_campaign_list.map(function(campaign){ return campaign.campaignId })
    }
    product_campaign(){
        var res_return = []

        this.product_campaign_ids().forEach(function(item) { 
            console.log(item);
            res_return.push( new ProductCampaignModel(item) ) 
        } )

        return res_return
    }
}

module.exports = ProductCampaignListModel