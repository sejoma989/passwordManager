const crypto = require('crypto');
const secret = '77Dios7777Dios7777Dios7777Dios77'

const encrypt = (password) => {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);

    const encryptedPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ]);
    
    return {
        iv: iv.toString("hex"),
        password: encryptedPassword.toString("hex") 
    };
};

const decrypt = (encryption) => {

};

module.exports = {encrypt, decrypt};
