const ProductCampaignListModel = require('./FiveStar/ProductCampaignList');
const ProductCampaignModel     = require('./FiveStar/ProductCampaign');
const MemberModel              = require('./FiveStar/Member');

class FiveStar {
    constructor(){ 
        console.log("FiveStar was loaded")
    }

    _getQraphType(type) {
        if (type == 'query') {
            return new FiveStarQuery();
        }
        if (type == 'mutate') {
            return new FiveStarMutate();
        }
    }

    product_campaign_list(args){
        return this._getQraphType('query').product_campaign_list( args );
    }
    member(args){
        return this._getQraphType('query').member( args );
    }
    product_campaign(args){ return this._getQraphType('query').product_campaign( args ); }
    
    getSchema(){
        return new FiveStarQuery().getSchema() + new FiveStarMutate().getSchema();
    }
}

class FiveStarQuery{
    product_campaign_list(args){
        return new ProductCampaignListModel( args.cvid, args.limit, args.offset );
    }
    member(args){
        return new MemberModel( args.cvid, args.secret_code );
    }
    product_campaign(args){ return new ProductCampaignModel(args.cvid) }
    getSchema(){
        return `
            type FiveStarQuery {
                product_campaign_list(cvid : String, limit: Int, offset: Int) : FSProductCampaignListModel
                member(cvid : String, secret_code : String) : FSMemberModel
            }
            
            type FSProductCampaignListModel {
                product_campaign : [FSProductCampaignModel]
                product_campaign_ids : [String]
            }
            type FSProductCampaignModel {
                cvid : Int
            }
            type FSMemberModel {
                name    : String
                bankaccount_id : Int,
                bankaccount_name : String,
                bankname_th : String,
                bankname_en : String,
                open_status : Boolean,
                shop_latitude : Float ,
                shop_longtitude : Float
            }
        `
    }
}

class FiveStarMutate{
    getSchema(){ return `
        type FiveStarMutate{
            TO_BE_IMPLEMENTED : String
        }
    `;}
}

module.exports = FiveStar