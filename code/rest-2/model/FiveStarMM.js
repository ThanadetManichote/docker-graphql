const MMMemberModel = require('./FiveStarMM/Member');

class FiveStarMM {
    constructor(){ 
        console.log("FiveStarMM was loaded")
    }
    _getQraphType(type) {
        if (type == 'query') {
            return new FiveStarMMQuery();
        }
        if (type == 'mutate') {
            return new FiveStarMMMutate();
        }
    }
    member(args) {
        return this._getQraphType('query').member(args);
    }
    search_campaign(args) {
        return this._getQraphType('query').search_campaign(args);
    }
    getSchema() { 
        return new FiveStarMMQuery().getSchema() + new FiveStarMMMutate().getSchema()
    }
}

class FiveStarMMQuery{
    member (args){
        return new MMMemberModel(args.member_id)
    }
    search_campaign(args){
        return new MMCampaignSearch(args)
    }

    getSchema(){ return `
        type FiveStarMMQuery {
            member : MMMemberModel
        }
        type MMMemberModel {
            member_id : Int
        }
        type MMCampaignSearch {
            name : String
            cvid : Int

        }
    ` }
}

class FiveStarMMMutate{
    getSchema(){ return `
        type FiveStarMMMutate{
            TO_BE_IMPLEMENTED : String
        }
    ` }
}

module.exports = FiveStarMM