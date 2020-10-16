// function Person() {

//     // this.Operat = new Operat()
//     this.money = 1000;

//     // this.spendMoney = function(price) {
//     //     new Operat().add(this.money , -price)
//     // }

//     this.spendMondy = function(Operat,price) {
//         Operat.sub(this.money,price)
//     }
// }
// Person.prototype.test = function() {
//     console.log('test fn')
// }

// const dad = new Person()
// console.log(dad.test)
// console.log(dad.test())

// Person.prototype.test2 = function() {
//     console.log('test2 fn')
// }

// console.log(dad.test2)
// console.log(dad.test2())
// console.log(Object.getPrototypeOf(dad) === Person.prototype)


// function InterOpera() {
//     this.add = function() {return this}
// }


// function Operat() {
//     this.add = function(a,b) {return a + b}
//     // this.add = function(a,b,c) {return a + b + c}
// }

// let Dad = new Person() 
// Person.Operat.add(1,2)  

function extendFun(child,parent) {
    if(typeof parent !== 'function' || typeof child !== 'function') return

    child.prototype = new parent()
    child.prototype.constructor = child
    return child
}

function Person() {
}
Person.prototype.init = function(options) { 
    this.name = options.name || ''
    this.age  = options.age || ''
    return this
}

Person.prototype.spendMoney = function(Operat,price) {
    return this
}

function Dad(options) {}
extendFun(Dad,Person)
Dad.prototype.spendMoney  = function(Operat,price) {
    //do something
    return this
}
console.log(Dad.prototype === Person.prototype)


console.log('this')
console.log('this')
console.log('this')
console.log('this')
console.log('this')