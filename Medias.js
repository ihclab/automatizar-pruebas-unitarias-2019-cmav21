
class Medias {

    static mediaAritmetica (vals){
        try{
            if(vals === null)
                return 0.0000;
            let result = 0;
            vals.forEach(element => {
                result += element;
            });
            return (result/vals.length).toFixed(4);
        } catch(err){
            throw new Error(` no ${err}`);
        }
    }

    static raizEnesima (x, n){
        try{
            return Math.pow(x, (1/n));
        } catch(err){
            throw new Error("no" +err);
        }
    };

    mediaGeometrica (vals){
        try{
            if(vals === null)
                return 0.0000;
            let zero = vals.filter(number => number === 0);
            if(zero.length > 1){
                throw new Error();
            }
            let result = 1;
            vals.forEach(element => {
                result *= element
            });   
            return Medias.raizEnesima(result, vals.length).toFixed(4);
        } catch(err){
            throw new Error(err);
        }
    };

    static mediaArmonica (vals){
        // let result = 0;
        // vals.forEach(element => {
        //     result += (1/element);
        // });
        // result = (vals.length/result);
        // return result;
        return 'dude aqui no hay nada';
    }
}

module.exports = Medias;

let elementos = [1,2,4,8,16];

let medias = new Medias();

// console.log(medias.raizEnesima(2,5));
// console.log(medias.mediaGeometrica(elementos));
// console.log(Medias.mediaAritmetica(elementos));
// console.log(medias.mediaArmonica(elementos));