var ajax = require("axios");

function DataProvider(config) {
  if (!config.url) {
    throw "must provide an url";
  }
    this.config = config;
    if (typeof(this.config.isRest) !== typeof(true)) {
      this.config.isRest = true;
    }
    this.count = null;
    this.promiseList = [];
    var self = this;
}

DataProvider.prototype.getCacheObject = function(query) {
  if (!query) {
    throw "missings arguments";
  }
  var item = this.promiseList.find(itm =>  itm.querySerialized === JSON.stringify(query));
  return !item ? null : item;
}

DataProvider.prototype.constructUrlFromId = function(query) {
  var urlToCall = this.config.url.replace(" ", "");
  if (this.config.isRest && query.id) {
    (urlToCall.length > 0) && (urlToCall.substr(-1) != "/") && (urlToCall += "/");
    return urlToCall + query.id;
  }
  else if (this.config.isRest) {
    throw "You must provide an ID if you are in RestMode";
  }
  return urlToCall;
}

/**
query : {
  offset:,
  limit:,
  ....
}
Will be passed as GET arguments
**/
DataProvider.prototype.get = function(query) {
  (!query) && (query = null);
  var self = this,
   cacheObject = this.getCacheObject(query),
   cacheList = null;
   if (cacheObject && cacheObject.promise) {

     return cacheObject.promise;
   }
  (!cacheObject) && (cacheObject = {}) && (this.promiseList.push(cacheObject));
  cacheObject.querySerialized = JSON.stringify(query);
  cacheObject.promise = null;
  var urlToCall = this.constructUrlFromId(query);
  cacheObject.promise = ajax.get(urlToCall, {params: query}).then(function(d) {
      return d.data;
    });
  return cacheObject.promise;
}


DataProvider.prototype.post = function(data) {
  if (!data || !data.id || !data.data) {
    throw "You must provide data and id; format: {data, id}";
  }
  var urlToCall = this.constructUrlFromId(data);
  return ajax.post(urlToCall, this.config.isRest ? data.data : data).then((d) => d.data);
}

DataProvider.prototype.put = function(data) {
  if (!data) {
    throw "You must provide data to put";
  }
  var urlToCall = this.config.url.replace(" ", "");
  return ajax.put(urlToCall, data).then((d) => d.data);
}

DataProvider.prototype.delete = function(id) {
    if (!id) {
      throw "You must provide an id";
    }
    if (this.config.isRest) {
      return ajax.delete(this.constructUrlFromId({id})).then((d) => d.data);
    }
    return ajax.delete(this.config.url.replace(" ", ""), {params: {id: id}}).then((d) => d.data);
}
module.exports = DataProvider;
