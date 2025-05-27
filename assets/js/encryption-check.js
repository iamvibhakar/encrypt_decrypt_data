/* eslint-disable -- Allow */

const CryptoJS = require('crypto-js');
const secretKey = "Hashstudioz";

// Encryption
function encrypt(text) { return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Decryption
function decrypt(encryptedText) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function SHA256 (phone){
  return CryptoJS.SHA256(phone).toString();
}

module.exports = {
    encrypt, decrypt, SHA256
}