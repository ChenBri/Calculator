var calculation = [];

function number(n) {
    calculation.push(n);
    calculation = calculation.join("");
    console.log(calculation);
    calculation = Array.from(calculation.toString()).map(Number);
    console.log(calculation);
}