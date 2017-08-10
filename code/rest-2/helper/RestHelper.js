'use strict';

var request = require('sync-request');
var mcache  = require('memory-cache');
var crypto  = require('crypto');

module.exports = class RestHelper {

  searchPrivilege(args){
    return ['3376326', '3376328']
  }

  _callRest(method, baseUrl, param){
    let response
    let cacheKey   = method+":"+baseUrl+":"+param
    let cachedBody = mcache.get(cacheKey)

    baseUrl += '?' + param

    cacheKey = crypto.createHash('md5').update(cacheKey).digest("hex");

    if (cachedBody) {
      console.log('Key   : '+ cacheKey)
      console.log('Cache : '+ baseUrl)

      return cachedBody
    } else {
      response = JSON.parse(request(method, baseUrl).getBody('utf-8'))

      if (response)
        mcache.put(cacheKey, response, 3000);
    }    

    return response
  }
}