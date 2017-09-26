'use strict';

const Model          = require('../Base/Model');
const MMActivityModel = require('./Actitvity');
const FiveStarMMRestHelper  = require('../../helper/RestHelper/FiveStar');


class MMActivityListModel extends Model {
    constructor(date){
        super()
        date = "2017-09-13"
        this.FiveStarMMRestHelper = new FiveStarMMRestHelper()
        this.activity_list =  this.FiveStarMMRestHelper.getActivityList(date)
    }
    id(){
        return this.activity_list.records.data.map(function(activity){ return activity.id })
    }
    activity(){
        var res_return = []

        this.id().forEach(function(item) {
            res_return.push( new MMActivityModel(item) ) 
        } )
        return res_return
    }

    activity_activityconfig(itemconfig,date){
        var res_return = []

        this.id().forEach(function(item) {
            if(itemconfig == item){
                res_return.push( new MMActivityModel(item) ) 
            }
        })
        return res_return
    }
}

module.exports = MMActivityListModel 