const MMMemberModel = require('./FiveStarMM/Member');
const MMActivityConfigModel = require('./FiveStarMM/ActitvityConfig');
const MMActivityConfigListModel = require('./FiveStarMM/ActitvityConfigList');
const MMActivityModel = require('./FiveStarMM/Actitvity');
const MMActivityListModel = require('./FiveStarMM/ActitvityList');

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
    activityconfig_list(args) {
        return this._getQraphType('query').activityconfig_list(args);
    }
    activityconfig(args) {
        return this._getQraphType('query').activityconfig(args);
    }
    activity_list(args) {
        return this._getQraphType('query').activity_list(args);
    }
    activity(args) {
        return this._getQraphType('query').activity(args);
    }
    activity_activityconfig_list(args) {
        return this._getQraphType('query').activity_activityconfig_list(args);
    }
    search_campaign(args) {
        return this._getQraphType('query').search_campaign(args);
    }
    getSchema() { 
        return new FiveStarMMQuery().getSchema() + new FiveStarMMMutate().getSchema()
    }
}

class FiveStarMMQuery{
    activityconfig_list (args){
        return new MMActivityConfigListModel(args.condition)
    }
    activityconfig (args){
        return new MMActivityConfigModel(args.id)
    }
    activity_list (args){
        return new MMActivityListModel(args.date)
    }
    activity (args){
        return new MMActivityModel(args.id)
    }
    activity_activityconfig_list(args){
        return new MMActivityListModel(args.date)
    }
    activity_activityconfig(){
        return new MMActivityModel()
    }
    
    member (args){
        return new MMMemberModel(args.member_id)
    }
    search_campaign(args){
        return new MMCampaignSearch(args)
    }

    getSchema(){ return `
        type FiveStarMMQuery {
            member : MMMemberModel
            activityconfig_list(condition : String! ) : MMActivityConfigListModel
            activityconfig(id : String!) : MMActivityConfigModel
            activity_list(date : String! ) : MMActivityListModel
            activity(id : String!) : MMActivityModel
        }
        type MMMemberModel {
            member_id : Int
        }
        type MMActivityConfigListModel {
            activity_id : [String]
            activityconfig : [MMActivityConfigModel]
            activity_activityconfig_list(date : String!) : [MMActivityConfigModel]
        }

        type MMActivityListModel {
            activity_id : [String]
            activity : [MMActivityModel]
        }


        type MMActivityConfigModel {
            id : String
            activity_id : String
            type_collect : String
            type : String
            condition : String
            value : Int
            value : Int
            created_at : String
            updated_at : String
        }

        

        type MMActivityModel {
            id : String
            name_en : String
            detail_en : String
            name_mm : String
            detail_mm : String
            start_date : String
            end_date : String
            status : String
            created_by : String
            created_at : String
            updated_at : String
            updated_by : String
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