const MasterModel = require('./Trueyou/Master');
const PrivilegeModel = require('./Trueyou/Privilege');
const RestHelper     = require('../helper/RestHelper');

class Trueyou {
    constructor(){ console.log("Trueyou was loaded") }
    master(args){
        return new MasterModel(args.master_id);
    }
    privilege(args){
        return new PrivilegeModel(args.privilege_id);
    }
    privileges(args){
        var res_return = []

        this.RestHelper = new RestHelper();
        this.master.privilegelist =  this.RestHelper.searchPrivilege(args)
        this.master.privilegelist.forEach(function(item) {
            res_return.push( new PrivilegeModel(item) ) 
        } )

        return res_return
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
            type Trueyou {
                master(master_id : String, thai_id: String) : MasterModel
                privilege(privilege_id : String!, thai_id: String) : PrivilegeModel
            }
        `
    }
}
module.exports = Trueyou