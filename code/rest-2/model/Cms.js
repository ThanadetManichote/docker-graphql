const ContentModel      = require('./Cms/Content');
const RestHelper        = require('../helper/RestHelper');
const CMSContentModel   = require('../model/Cms/Content');

class Cms {
    constructor(){ 
        console.log("Cms was loaded") 
    }
    _getQraphType(type) {
        if (type == 'query') {
            return new CmsQuery();
        }
        if (type == 'mutate') {
            return new CmsMutate();
        }
    }

    content(args){
        return this._getQraphType('query').content(args);
    }
    createContent({input}){
        console.log('In')
        return this._getQraphType('mutate').createContent(args);
    }
    
    getSchema(){
        // return new CmsQuery().getSchema() + 
        //     new CmsMutate().getSchema()
        return new CmsQuery().getSchema()
    }
}

class CmsQuery {
    content(args){
        return new CMSContentModel(args.content_id);
    }

    getSchema(){
        return `
            type CmsQuery {
                content(id : String!, limit : Int! , offset : Int!) : ContentModel
            }
            type ContentModel {
                content_id : Int!
                first_name : String
                last_name : String
            }
        `
    }
}

module.exports = Cms