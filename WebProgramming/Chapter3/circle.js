const PI = 3.141592;

function getArea(rad) {
  return PI * rad * rad;
}

function getCircumference(rad) {
  return 2 * PI * rad;
}

export default { PI, getArea, getCircumference };
