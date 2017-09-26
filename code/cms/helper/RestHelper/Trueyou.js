const RestHelper     = require('../RestHelper');

class TrueyouRestHelper extends RestHelper{
    constructor(){ 
        super()
        
        this.url = "https://prod.trueyou.digitalsolution.us/trueyou_v4/api.php"
    }
    getMaster(master_id){
        return this._callRest('GET', this.url, 'param={"command":"getmasterof","data":{"type":"0","id":"' +master_id+ '"}}').data.master;
    }
    getPrivilege(privilege_id){
        return this._callRest('GET', this.url, 'param={"command":"getmasterof","data":{"type":"2","id":"' +privilege_id+ '"}}').data.master.privilege[privilege_id];
    }
}
module.exports = TrueyouRestHelper