'use strict';

const PrivilegeModel = require('./Privilege');
const Model          = require('../Base/Model');
const TrueyouRestHelper = require('../../helper/RestHelper/Trueyou');

class MasterModel extends Model {
    constructor(master_id){
        super()
        this.TrueyouRestHelper = new TrueyouRestHelper()
        this.master =  this.TrueyouRestHelper.getMaster(master_id)
    }

    master_id(){ return  parseInt( this.master.master_id )}
    title_th() { return this.master.title_th }
    title_en() { return this.master.title_en }
    privilege_ids() { return this.master.privilegelist.map( parseInt ) }

    privileges(args) { 
        var res_return = []
        if(args.privilege_ids){
            this.master.privilegelist = args.privilege_ids
        }

        this.master.privilegelist.forEach(function(item) { 
            res_return.push( new PrivilegeModel(item) ) 
        } )

        return res_return
    }

    tag_en() { return this.master.tag_en }
    tag_th() { return this.master.tag_th }

    rating() { return this.master.rating }
    num_review() { return this.master.num_review }
    enable_review() { return this.master.enable_review }

    category_id () { return parseInt( this.master.category_id) }
}

module.exports = MasterModel 