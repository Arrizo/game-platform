import CryptoJS from 'crypto-js'

function AesUtil (keySize, iterationCount) {
  this.keySize = keySize / 32
  this.iterationCount = iterationCount
}

AesUtil.prototype.generateKey = function (salt, passPhrase) {
  var key = CryptoJS.PBKDF2(
    passPhrase,
    CryptoJS.enc.Hex.parse(salt),
    { keySize: this.keySize, iterations: this.iterationCount })
  return key
}

// 如果加密出错返回空字符串
AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {


  var encryptResult = ''
  try{
    var key = this.generateKey(salt, passPhrase)
    var encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) })

      encryptResult = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  }catch(err){
    console.warn('--encrypt error---', err)
  }

  console.log('---encryptResult---', encryptResult)
  
  return encryptResult  
}

// 如果解密出错返回空字符串
AesUtil.prototype.decrypt = function (salt, iv, passPhrase, cipherText) {

  var decryptResult = ''
  try{
    var key = this.generateKey(salt, passPhrase)
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cipherText)
    })
    var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) })

      decryptResult = decrypted.toString(CryptoJS.enc.Utf8)
  }catch(err){
    console.warn('--decrypt error---', err)
  }

  console.log('---decryptResult---', decryptResult)
  
  return decryptResult
}


export default AesUtil
