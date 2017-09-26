'use strict';

const RestHelper  = require('../../helper/RestHelper')
class Model {
    constructor(){
        this.RestHelper = new RestHelper()
    }
    convert_boolean(args){
        if(args == 1) {
            return true
        }
        if(args == true) {
            return true
        }
        
        return false
    }
}

module.exports = Model