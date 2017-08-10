const ProductCampaignListModel = require('./FiveStar/ProductCampaignList');

class FiveStar {
    constructor(){ console.log("FiveStar was loaded") }
    product_campaign_list(args){
        // return new ProductCampaignListModel(args.cvid, args.limit, args.offset);
    }
    product_campaign(){}
// {
//             "cvId": "2000031700",
//             "ownerCampaignNameTh": "ทรูยู",
//             "ownerCampaignNameEn": "Trueyou",
//             "campaignId": "9",
//             "campaignNameTh": "ทรูยู",
//             "campaignNameEn": "Trueyou",
//             "startedDate": "2017-06-12 00:00:00",
//             "expiredDate": "2017-08-31 23:59:59",
//             "product_id": "7",
//             "code": "6",
//             "nameTh": "ทดสอบ อกไก่อบชานอ้อยห้าดาว",
//             "nameEn": "Test Smoked Ham",
//             "textTh": "ชิ้นละ 29 บาท (ปกติ 57 บาท)  ",
//             "textEn": "Smoked Ham only 29  bt. Normal price 57 bt.",
//             "price": "29.00",
//             "thumbnail": "http://staging-api-kaiyang.eggdigital.com/uploads/campaign/cccaa706db1794ad1d1a8ad8ee02226a.png",
//             "image": "http://staging-api-kaiyang.eggdigital.com/uploads/campaign/cccaa706db1794ad1d1a8ad8ee02226a.png",
//             "status": "1",
//             "createdDate": "2017-06-12 18:03:18"
//         }
    getSchema(){
        return `
            type FiveStar {
                product_campaign_list(cvid : String, limit: Int, offset: Int) : ProductCampaignListModel
            }
            type ProductCampaignListModel {
                product_campaign(cvid : String) : [ProductCampaignModel]
            }
            type ProductCampaignModel {
                cvid : Int
            }
        `
    }
}

module.exports = FiveStar