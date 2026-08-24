function sumObj (obj: {a: number; b: number; c: number}) {
  console.log(obj.a + obj.b + obj.c);
}

function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
sum( { a: 10, b: 3, c:9});

type ABC = {a: number; b: number; c: number};
function sumAbc ({a,b,c}:ABC) {
  console.log(a + b + c);
}