'use strict';

const MasterModel = require( './Master')
const Model       = require('../Base/Model')
const TrueyouRestHelper = require('../../helper/RestHelper/Trueyou');

class PrivilegeModel extends Model {
    constructor(privilege_id){
        super()
        this.MasterModel = require( './Master')

        this.TrueyouRestHelper = new TrueyouRestHelper()
        this.privilege         = this.TrueyouRestHelper.getPrivilege(privilege_id)
    }

    privilege_id(){ return parseInt(this.privilege.privilege_id) }
    privilege_info_th(){ return this.privilege.privilege_info_th }
    privilege_info_en(){ return this.privilege.privilege_info_en }
    master_id(){ return parseInt(this.privilege.masterID) }

    master(){
        return new this.MasterModel( this.master_id() )
    }
    is_masscampaign() {
        return this.convert_boolean(this.privilege.is_masscampaign)
    }
}

module.exports = PrivilegeModel