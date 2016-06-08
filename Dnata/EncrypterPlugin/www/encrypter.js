var exec = require('cordova/exec');

var Encrypter = {
  encryptMessage:function(successCallback,errorCallback,message)
  {
      exec(successCallback, errorCallback, "Encrypter", "encrypt", [message]);
  }
}


module.exports = Encrypter;
