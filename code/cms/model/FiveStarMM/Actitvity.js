'use strict';

const Model          = require('../Base/Model');
const FiveStarMMRestHelper  = require('../../helper/RestHelper/FiveStar');

class MMActivityModel extends Model {
    constructor(id){
        super()
        this.FiveStarMMRestHelper = new FiveStarMMRestHelper()
        this.activity =  this.FiveStarMMRestHelper.getActivity(id)
        // console.log(this.activity)
        // console.log(this.activity.records)
    }
    id(){return this.activity.records.id}
    name_en(){return this.activity.records.name_en}
    detail_en(){return this.activity.records.detail_en}
    name_mm(){return this.activity.records.name_mm}
    detail_mm(){return this.activity.records.detail_mm}
    start_date(){return this.activity.records.start_date}
    end_date(){return this.activity.records.end_date}
    created_by(){return this.activity.records.created_by}
    status(){return this.activity.records.status}
    created_at(){return this.activity.records.created_at}
    updated_at(){return this.activity.records.updated_at}
    updated_by(){return this.activity.records.updated_by}

}


module.exports = MMActivityModel 