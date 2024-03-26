let x = 1;
let y = 2;
// use conditional assignment – ES2021 feature
x &&= y;
console.log('Conditional assignment', x);

function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
async function example() {
    console.log('Starting...');
    await wait(1000);
    console.log('1s later...');
    await wait(1000);
    console.log('2s later...');
    await wait(3000);
    console.log('Done after 5s!');
}
example();
