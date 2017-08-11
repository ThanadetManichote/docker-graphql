const MMMemberModel = require('./FiveStarMM/Member');

class FiveStarMM {
    constructor(){ 
        console.log("FiveStarMM was loaded")
    }
    member (args){
        return new MMMemberModel(args.member_id)
    }
    getSchema(){ return `
        type FiveStarMM {
            member : MMMemberModel
        }
        type MMMemberModel {
            member_id : Int
        }
    ` }
}

module.exports = FiveStarMM