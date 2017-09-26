'use strict';

const Model          = require('../Base/Model');
const FiveStarMMRestHelper  = require('../../helper/RestHelper/FiveStar');

class MMActivityConfigModel extends Model {
    constructor(id){
        super()
        this.FiveStarMMRestHelper = new FiveStarMMRestHelper()
        this.activityconfig =  this.FiveStarMMRestHelper.getActivityConfig(id)
        // console.log(this.activityconfig)
        // console.log(this.activityconfig.records)
    }
    id(){return this.activityconfig.records.id}
    activity_id(){return this.activityconfig.records.activity_id}
    type_collect(){return this.activityconfig.records.type_collect}
    type(){return this.activityconfig.records.type}
    condition(){return this.activityconfig.records.condition}
    value(){return this.activityconfig.records.value}
    created_at(){return this.activityconfig.records.created_at}
    updated_at(){return this.activityconfig.records.updated_at}

}


module.exports = MMActivityConfigModel 