'use strict';

const Model          = require('../Base/Model');
const MMActivityConfigModel = require('./ActitvityConfig');
const MMActivityModel = require('./Actitvity');
const MMActivityListModel = require('./ActitvityList');
const FiveStarMMRestHelper  = require('../../helper/RestHelper/FiveStar');


class MMActivityConfigListModel extends Model {
    constructor(condition){
        super()

        this.FiveStarMMRestHelper = new FiveStarMMRestHelper()
        this.activityconfig_list =  this.FiveStarMMRestHelper.getActivityConfigList(condition)
    }
    activity_id(){
        return this.activityconfig_list.records.data.map(function(activity){ return activity.activity_id })
    }
    id(){
        return this.activityconfig_list.records.data.map(function(activity){ return activity.id })
    }
    activityconfig(){
        var res_return = []

        this.id().forEach(function(item) {
            res_return.push( new MMActivityConfigModel(item) ) 
        } )

        return res_return
    }
    activity_activityconfig_list(date){
        var res_return = ''
        var dataarr = ''
        var allid=this.id();
        var MMAL  = new MMActivityListModel()
        var resultid  = [];
        var self = this;
        this.activity_id().forEach(function(item,index) {
            // res_return.push(MMAL.activity_activityconfig(item,date)) 
            dataarr = MMAL.activity_activityconfig(item,date)
            if(dataarr.length>0){
                resultid.push(allid[index])
            }
        })

        resultid.forEach(function(item) {
            // console.log(item.activity)
            res_return = self.activityconfig_related(item)
        })


        return res_return
    }

    activityconfig_related(id){
        var res_return = []
        this.id().forEach(function(item) {
            // console.log("=========")
            // console.log(id)
            // console.log("=========")
            // console.log(item)
            if(id == item){
                res_return.push( new MMActivityConfigModel(item) ) 
            }
        })

        return res_return
    }



}

module.exports = MMActivityConfigListModel 