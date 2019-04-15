// GENERATORS

//Chapter - 1 : Syntax and basics
/*
Regular functions return only one, single value (or nothing).

Generators can return (“yield”) multiple values, possibly 
an infinite number of values, one after another, on-demand. 
They work great with iterables, allowing to create data streams 
with ease.
*/
function* generator(){
    yield 1;
    yield 2;
    return 3;
}

/*
When generateSequence() is called, it does not execute the code. 
Instead, it returns a special object, called “generator”.
*/
let result = generator();
console.log(result);

/* 
The result of next() is always an object:
value: the yielded value.
done: false if the code is not finished yet, otherwise true. 
*/
let first = result.next();
console.log(first); // value: 1, done: false

let second = result.next();
console.log(second);// value: 2, done: false

let third = result.next();
console.log(third); // value: 3, done: true

let forth = result.next();
console.log(forth);// value: undefined, done: true

// Chapter - 2: Generators are Iterables
// We can use all benefits of iterables with generators.
function* secondGenerator() {
    yield 1;
    yield 2;
    yield 3;// If you use return it does not seen on for...of
}

let secondResult = secondGenerator();

for(let value of secondResult){
    console.log(value);
}

//We can use spread operators with generators, because of it's iterable
let thirdResult = [...secondGenerator(), 4, 5];

console.log(thirdResult);

// You can use "generators" instead of "iterables".
// For more information please google it :)

// Chapter -  3: Generator composition
/*
    Generator composition is a special feature of generators 
    that allows to transparently “embed” generators in each other.
*/

function* generateSequence (start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

function* generatePassword() {
    /*
    The special yield* directive in the example is responsible f
    or the composition. It delegates the execution to another generator.
    */
    yield* generateSequence(48, 57);//0-9
    
    yield* generateSequence(65, 90)//A-Z
}

let password = '';

for(let code of generatePassword()) {
    // String.fromCharCode is defaut JS method to convert char codes to chars
    password += String.fromCharCode(code);
}

console.log(password);

//Send parameter to next()

function* myGenerator () {
    let result = yield '5 + 5?'

    console.log(result);
}

let myResult = myGenerator();
console.log(myResult);

let question = myResult.next().value; // yield returns the value (question)
console.log(question);

myResult.next(12); // pass parameter into generator


// throw error
// You can throw arrow from outside and 'catch' catches that as error
function* gen() {
    try {
        let result = yield '2 + 3 ?';
        // this line never be executed if there is thrown error
        console.log('This is also executed'); 
    } catch (error) {
        console.log(error);
    }
}

let lastGenerator = gen();

let q = lastGenerator.next().value; // 2 + 3 ?
console.log(q);

lastGenerator.throw(new Error('There is no answer!'));