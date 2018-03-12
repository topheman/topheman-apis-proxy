'use strict';

// Test specific configuration
// DON'T mess with this file unless you're adding some of your own unit tests
// You can run unit tests with `npm test`
// ==========================================================================
module.exports = {
  github : {
    active : true,
    cors : []
  },
  githubApiMock : {
    active : true,
    cors : []
  },
  home : {
    active : true,
    cors : []
  },
  testActive1 : {
    active : true,
    cors : []
  },
  testActive2 : {
    active : false,
    cors : []
  },
  testActive3 : {
    //active : false,//active is missing
    cors : []
  },
  //the whole config block is missing
//  testActive4 : {
//    active : false,
//    cors : []
//  },
  testCorsActive1 : {
    active : true,
    cors : true
  },
  testCorsActive2 : {
    active : true,
    cors : false
  },
  testCorsActive3 : {
    active : true,
    cors : []
  },
  testCorsActive4 : {
    active : true,
    cors : ""
  },
  testCorsActive5 : {
    active : true
    //cors : [] //cors is missing
  },
  testCorsPattern1 : {
    active : true,
    cors : "foo.com"
  },
  testCorsPattern2 : {
    active : true,
    cors : ["foo.com","bar.com"]
  },
  testCorsPattern3 : {
    active : true,
    cors : ["*.foo.com","bar.com"]
  },
  testDelay : {
    active : true,
    cors : [],
    delay: 50
  },
  testJsonp : {
    active : true,
    cors : [],
    jsonp : "cb"
  },
  testToken1 : {
    active : true,
    cors : [],
    token: "mytoken1"
  },
  testToken2 : {
    active : true,
    cors : [],
    token: function(token, req, next){
      if(token === "mytoken2"){
        next(true);
      }
      else if(req.get('X-Another-Way-To-Auth')){
        var test = req.get('X-Another-Way-To-Auth').split('.');
        if(test[1] && test[1] === "mytoken2"){
          next(true);
        }
        else{
          next(false);
        }
      }
      else{
        next(false);
      }
    }
  },
  twitter : {
    active : true,
    cors : []
  }
};
