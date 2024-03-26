function square(n: number): number {
    return n * n;
}

//square("2"); // Error!
square(2); // Error!

class User {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
console.log(new User("John", 30));
