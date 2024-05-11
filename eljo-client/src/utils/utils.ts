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