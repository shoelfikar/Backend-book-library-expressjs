// const crypto = require('crypto')
module.exports = {
    response: (res, result, status, err)=>{
      let resultPrint = {}
      resultPrint.status = 'Success';
      resultPrint.status_code = status;
      resultPrint.result = result;
      resultPrint.err = err||null;
      return res.status(resultPrint.status_code).json(resultPrint);
    },
    // generateSalt: (length)=> {
    //   return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0,length)
    // },
    // setPassword: (password,salt) => {
    //   let hash = crypto.createHmac('sha512',salt)
    //   hash.update(password)
    //   let value = hash.digest('hex')
    //   return {
    //     salt: salt,
    //     passwordHash:value
    //   }
    // }
   
  }