function hello(){
    console.log('Hello Node.JS');
}

function sayHelloName(name){
    console.log('Hello ', name);
}

/**
 * sayHelloName('Nam')
 */

//Xuất nó ra
module.exports = {
    hello,
    sayHelloName
};
 
/**
 * Objects
 */

// const user = {id: 1, name: 'John', email: 'james@example.com'}
// //destructuring ES6
// const {name} = user;