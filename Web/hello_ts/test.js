function executor(f, a) {
    return f(a);
}
function a(a) {
    return a * 10;
}
const b = (num) => -num;
function c(a) {
    console.log(a);
}
const d = (num) => console.log(num);
executor(a, 1);
executor(b, 1);
export {};
