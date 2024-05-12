export const getConfigValue = <T>(key: string, defaultValue: T): T => {
    return import.meta.env[key] ? (import.meta.env[key] as T) : defaultValue;
  };
 export function validatePassword(password:string):boolean {
    // Regular expression pattern for password validation
    console.log(password)
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]).{8,}$/;
  
    // Test the password against the pattern
    return passwordPattern.test(password);
  }
 export  function validatePhoneNumber(phoneNumber:string):boolean {
    // Regular expression pattern for phone number validation
    const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  
    // Test the phone number against the pattern
    return phonePattern.test(phoneNumber);
  }
  export async function getBase64(file: File|null|string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        
      }
      const reader = new FileReader();
      const blob = new Blob([file??'']);
      reader.readAsDataURL(blob);
  
      reader.onload = () => {
        resolve(reader.result as string);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
//convert file into base64
