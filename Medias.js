let mediaAritmetica = function(vals){
    let result = 0;
    vals.forEach(element => {
        result += element;
    });
    return (result/vals.length);
};

let raizEnesima =  function(x, n){
    return Math.pow(x, (1/n));
};

let mediaGeometrica = function(vals){
    let result = 1;
    vals.forEach(element => {
        result *= element;
    });
    return raizEnesima(result, vals.length);
};

let mediaArmonica = function(vals){
    let result = 0;
    vals.forEach(element => {
        result += (1/element);
    })
    result = (vals.length/result);
    return result;
}

let elementos = [2,4,12,6,18];
console.log(raizEnesima(2,5));
console.log(mediaGeometrica(elementos));
console.log(mediaAritmetica(elementos));
console.log(mediaArmonica(elementos));