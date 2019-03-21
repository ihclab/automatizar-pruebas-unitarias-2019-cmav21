const fs = require('fs');
const claseMedia = require('./Medias');

class ReadFile {
    constructor(){
        this.medias = new claseMedia();
    }

    leerArchivo () {        
        fs.readFile('./CasosPrueba.txt', 'utf-8', (err, data)=> {
            if(err)
                console.log(err); 
            let lineas = data.split('\r\n');
            let campos = this.separarCampos(lineas);
            let valores = [];
            let pruebas = [];
            campos.forEach(vector => {
                if(vector[2] != 'NULL')
                    valores.push(this.convertirCadena(vector[2]));
            });
            
            for (let i = 0; i < campos.length; i++) {
                    let valor = this.ejecutarMetodo(campos[i][1], valores[i])
                    let res = this.comprobarResultado(valor, campos[i][3]);
                    pruebas.push(res);
            }
            console.log(pruebas);
        });
    }
    
    ejecutarMetodo(nombreMetodo, valores){
        if(typeof this.medias[nombreMetodo] === 'function')
        {
            if(valores != null) {
                let mediaAritmetica = this.medias[nombreMetodo](valores);
                return mediaAritmetica;
            } 
        }
    }

    comprobarResultado(valor, resultado){
        if(!isNaN(resultado)){
            resultado = parseFloat(resultado);
            return valor === resultado;
        } else {
            return false;
        }
    }

    separarCampos (elementos) {
        let campos = [];
        elementos.forEach(element => {
            let valoresCampos = element.split(':');
            campos.push(valoresCampos);
        })
        return campos;
    }
    
    convertirCadena(cadena){
        let elementos = cadena.split(' ');
        let valores = [];
        elementos.forEach(elemento => {
            valores.push(parseInt(elemento,10));
        })
        return valores;
    }
}

let readFile = new ReadFile();
readFile.leerArchivo();




