const MasterModel = require('./Trueyou/Master');
const PrivilegeModel = require('./Trueyou/Privilege');
const RestHelper     = require('../helper/RestHelper');

class Trueyou {
    constructor(){ 
        console.log("Trueyou was loaded") 
    }
    _getQraphType(type) {
        if (type == 'query') {
            return new TrueyouQuery();
        }
        if (type == 'mutate') {
            return new TrueyouMutate();
        }
    }

    master(args){
        return this._getQraphType('query').master(args);
    }
    privilege(args){
        return this._getQraphType('query').privilege(args);
    }
    createMaster({input}){
        console.log('In')
        return this._getQraphType('mutate').createMaster(args);
    }
    
    getSchema(){
        return new TrueyouQuery().getSchema() + 
            new TrueyouMutate().getSchema()
    }
}

class TrueyouQuery {
    master(args){
        return new MasterModel(args.master_id);
    }
    privilege(args){
        return new PrivilegeModel(args.privilege_id);
    }

    getSchema(){
        return `
            type MasterModel {
                master_id : Int!
                title_en : String
                title_th : String
                tag_en : [String]
                tag_th : [String]
                privileges(privilege_ids : [String]) : [PrivilegeModel]
                privilege_ids : [Int]
                rating : String
                num_review : String
                enable_review : Boolean
                category_id : Int
            }
            type PrivilegeModel {
                privilege_id : Int!
                master  : MasterModel
                master_id    : Int
                privilege_info_th : String
                privilege_info_en : String
                is_masscampaign : Boolean
            }      
            type TrueyouQuery {
                master(master_id : String, thai_id: String) : MasterModel
                privilege(privilege_id : String!, thai_id: String) : PrivilegeModel
            }
        `
    }
}


class TrueyouMutate {
    constructor(){ 
        console.log("TrueyouMutate was loaded") 
    }
    createMaster({input}){
        return new TrueyouQuery().master({"master_id" : "3376327"});
    }
    getSchema(){
        return `
            input MasterInput {
                title_en : String
            }

            type TrueyouMutate{
                createMaster(input: MasterInput) : MasterModel 
            }
            
        `
    }
}
module.exports = Trueyou