const jwt = require('jsonwebtoken');
const { Env, EnvKeys } = require('../env');

const generateToken = async (data) => {
    const token = await jwt.sign(data, Env.get(EnvKeys.TOKENSECRET), {
      expiresIn: Env.get(EnvKeys.LIFESPAN),
    });
  
    return token;
  };

const decode = async (token) => {
    try {
        const decoded = await jwt.verify(token, Env.get(EnvKeys.TOKENSECRET));
        return decoded
    } catch (error) {
        console.error(error);
        return null;
    }
}
function validateEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Test the email against the pattern
    return emailPattern.test(email);
  }
  function validatePassword(password) {
    // Regular expression pattern for password validation
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]).{8,}$/;
  
    // Test the password against the pattern
    return passwordPattern.test(password);
  }
  function validatePhoneNumber(phoneNumber) {
    // Regular expression pattern for phone number validation
    const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  
    // Test the phone number against the pattern
    return phonePattern.test(phoneNumber);
  }
  function generateEmployeeCode(lastDigit ) {
    let lastEmployeeCode;
    if (!lastDigit|| isNaN(lastDigit)|| lastDigit < 1) {
      lastEmployeeCode = 1;
    } else {
      lastEmployeeCode = lastDigit + 1;
    }
  
    const code = `ELJO-${lastEmployeeCode}`;
    return code;
  }
   async function getBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        
      }
      const reader = new FileReader();
      const blob = new Blob([file??'']);
      reader.readAsDataURL(blob);
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
module.exports = {generateToken,decode,validateEmail,validatePassword,validatePhoneNumber,generateEmployeeCode,getBase64}