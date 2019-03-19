
class Medias {

    mediaAritmetica (vals){
        let result = 0;
        vals.forEach(element => {
            result += element;
        });
        return (result/vals.length);
    }

    raizEnesima (x, n){
        return Math.pow(x, (1/n));
    };

    mediaGeometrica (vals){
        let result = 1;
        vals.forEach(element => {
            result *= element;
        });
        return this.raizEnesima(result, vals.length);
    };

    mediaArmonica (vals){
        let result = 0;
        vals.forEach(element => {
            result += (1/element);
        });
        result = (vals.length/result);
        return result;
    }
}

let elementos = [2,4,12,6,18];

let medias = new Medias();

console.log(medias.raizEnesima(2,5));
console.log(medias.mediaGeometrica(elementos));
console.log(medias.mediaAritmetica(elementos));
console.log(medias.mediaArmonica(elementos));