const RestHelper        = require('../helper/RestHelper');
const CMSContentModel   = require('../model/Cms/Content');
const CMSDataContentModel   = require('../model/Cms/DataContent');
const CMSContentListModel   = require('../model/Cms/ContentList');

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

    content_list(args){
        return this._getQraphType('query').content_list(args);
    }
    content(args){
        return this._getQraphType('query').content(args);
    }
    
    getSchema(){
        return new CmsQuery().getSchema()  +  new CmsMutate().getSchema()
    }
}

class CmsQuery {
    content_list(args){
        return new CMSContentListModel(args.limit, args.offset);
    }
    content(args){
        return new CMSContentModel(args.id);
    }
    getSchema(){
        return `
            type CmsQuery {
                content_list(limit : String! , offset : Int!) : CMSContentListModel
                content(id : String!) : CMSDetailContentModel
            }
            type CMSContentListModel {
                content : [CMSContentModel]
                content_ids : [String]
            }
            type CMSContentModel {
                content_id : Int!
                first_name : String
                last_name : String
                address : String
            }

            type CMSDetailContentModel {
                content_id : Int!
                first_name : String
                last_name : String
                address : String
            }
            
        `
    }
}

class CmsMutate {
    constructor(){ 
        console.log("CmsMutate was loaded") 
    }
    createContent({input}){
        // return new CmsQuery().master({"limit" : "5","offset" : "0"});
        return new CmsDataContentModel(args);
    }
    getSchema(){
        return `
            input CmsContentInput {
                title_en : String
            }
            type CMSDataContentModel{
                data:String
            }

            type CmsMutate{
                createContent(input: CmsContentInput) : CMSDataContentModel 
            }
            
        `
    }
}

module.exports = Cms