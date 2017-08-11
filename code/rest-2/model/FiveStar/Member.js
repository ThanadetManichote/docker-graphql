'use strict';

const Model          = require('../Base/Model');
const FiveStarRestHelper = require('../../helper/RestHelper/FiveStar');

class MemberModel extends Model {
    constructor( cvid , secret_code ){
        super()

        this.FiveStarRestHelper = new FiveStarRestHelper()
        this.member             = this.FiveStarRestHelper.getMember( cvid ,secret_code )
    }
    name(){ return  this.member.name }
    bankaccount_id(){ return  this.member.bankaccountid }
    bankaccount_name(){ return  this.member.bankaccountname }
    bankname_th(){ return  this.member.bankname_th }
    bankname_en(){ return  this.member.bankname_en }
    open_status(){ return  this.member.open_status }
    shop_latitude(){ return  this.member.shopLatitude }
    shop_longtitude(){ return  this.member.shopLongtitude }
}

module.exports = MemberModel