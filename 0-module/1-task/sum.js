function sum(a, b) {
  /* ваш код */
  if ( isNumeric(a) && isNumeric(b) ) {
    return a + b;
  } else {
    throw new TypeError();
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = sum;

