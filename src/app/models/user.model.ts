
export default interface IUser {
  email: string,
  password?: string,
  age: number,
  name: string,
  phoneNumber: string,
} 

// export default class IUser {
//   email?: string
//   password?: string
//   age?: number
//   name?: string
//   phoneNumber?: string
// } 


// Classes vs Interfaces //

// Both can type check data 
// Classes are a feature of JavaScript 
// Interfaces are a feature of TypeScript
// Interfaces do not get transpiled, while a class does

// Methods can be added to classes

// Classes can make bundle file bigger. Interfaces do not because they do not get transpiled, while a class does.




