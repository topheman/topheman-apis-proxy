var path = require('path');

function requireApiConf(jsonFileName) {
  try{
    var json = require(jsonFileName);
  }
  catch(e){
    throw new Error(path.resolve(__dirname, jsonFileName) + ' file missing, please create it from the default template file');
  }
  return json;
}

var all = {
  github : requireApiConf('./github.json')
};

module.exports = all;