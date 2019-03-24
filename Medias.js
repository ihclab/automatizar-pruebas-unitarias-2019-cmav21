
class Medias {

    static mediaAritmetica (vals){
        try{
            let result = 0;
            vals.forEach(element => {
                result += element;
            });
            return (result/vals.length).toFixed(4);
        } catch(err){
            throw new Error(err);
        }
    }

    static raizEnesima (x, n){
        try{
            return Math.pow(x, (1/n));
        } catch(err){
            return new Error("no" +err);
        }
    };

    mediaGeometrica (vals){
        try{
            let result = 1;
            vals.forEach(element => {
                result *= element
            });   
            return Medias.raizEnesima(result, vals.length).toFixed(4);
        } catch(err){
            return new Error(err);
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