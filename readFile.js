const fs = require('fs');
const claseMedia = require('./Medias');

class ReadFile {
    constructor(){
        this.medias = claseMedia;
        this.mediaGeometrica = new claseMedia();
    }

    leerArchivo () {
        fs.readFile('./CasosPrueba.txt', 'utf-8', (err, data)=> {
            if(err)
                console.log(err);
            let lineas = data.split('\r\n');
            let valores = [];
            let pruebas = [];
            let campos = this.separarCampos(lineas);
            valores = this.separarPorNulls(valores, campos);
            pruebas = this.obtenerResultados(campos, valores, pruebas); 
            console.log(pruebas);
        });
    }

    separarCampos (elementos) {
        let campos = [];
        elementos.forEach(element => {
            let valoresCampos = element.split(':');
            campos.push(valoresCampos);
        })
        return campos;
    }
    
    separarPorNulls(contenedor, data){
        data.forEach(vector => {
            if(vector[2] === 'NULL')
                contenedor.push(null);
            else
                contenedor.push(this.convertirCadena(vector[2]));
        });
        return contenedor;
    }

    obtenerResultados(campos, valores, pruebas){
        for (let i = 0; i < campos.length; i++) {
            let valor = this.ejecutarMetodo(campos[i][1], valores[i])
            try{ 
                let res = this.comprobarResultado(valor, campos[i][3]);
                pruebas.push(res);
            } catch(err){
                console.log(err);
            }
        }
        return pruebas;
    }
    
    ejecutarMetodo(nombreMetodo, valores){
        let media = nombreMetodo == 'mediaGeometrica' ? this.mediaGeometrica : this.medias;
        if(typeof media[nombreMetodo] === 'function')
        {
            try{
                let mediaAritmetica = media[nombreMetodo](valores);
                return mediaAritmetica;
            } catch(err){
                console.log(err);
            }
        }
    }
    
    comprobarResultado(valor, resultado){
        try{
            resultado = parseFloat(resultado);
            return valor == resultado;
        } catch(err) {
            console.log(err);
        }
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




