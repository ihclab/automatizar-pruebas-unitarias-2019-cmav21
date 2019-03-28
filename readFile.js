const fs = require('fs');
const claseMedia = require('./Medias');
const microprofiler = require('microprofiler');

class ReadFile {
    constructor(){
        this.medias = claseMedia;
        this.mediaGeometrica = new claseMedia();
        this.ejecucionPerMetodo = [];
    }

    leerArchivo () {
        fs.readFile('./CasosPrueba.txt', 'utf-8', (err, data)=> {
            if(err)
                console.log(err);
            let lineas = data.split('\r\n');
            let valores = [];
            let pruebas = [];
            let resultados = [];
            let textoArchivo = '';
            let campos = this.separarCampos(lineas);
            valores = this.separarPorNulls(valores, campos);
            pruebas = this.obtenerResultados(campos, valores, pruebas, resultados);
            textoArchivo = this.obtenerTextoArchivo(pruebas, campos, valores); 
            console.log(resultados);
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

    obtenerResultados(campos, valores, pruebas, resultadosMetodo){
        for (let i = 0; i < campos.length; i++) {
            let valor = this.ejecutarMetodo(campos[i][1], valores[i])
            resultadosMetodo.push(valor);
            try{ 
                let res = this.comprobarResultado(valor, campos[i][3]);
                pruebas.push(res);
            } catch(err){
                pruebas.push('exception');
                console.log(err);
            }
        }
        return pruebas;
    }

    obtenerTextoArchivo(valores, campos, resultados){
        let texto = '';
        for (let i = 0; i < valores.length; i++) {
            texto += `${campos[i][0]} ${valores[i]} ${campos[i][1]} = ${resultados[i]} \n`;   
        }   
        return texto;
    }
    
    guardarEnArchivo(texto){
        return 0;
    }

    ejecutarMetodo(nombreMetodo, valores){
        let media = nombreMetodo == 'mediaGeometrica' ? this.mediaGeometrica : this.medias;
        if(typeof media[nombreMetodo] === 'function')
        {
            try{
                var start = microprofiler.start();
                let mediaAritmetica = media[nombreMetodo](valores);
                var end = microprofiler.measureFrom(start);
                this.ejecucionPerMetodo.push((end/1000).toFixed(4));
                return mediaAritmetica;
            } catch(err){
                console.log(err);
            }
        } else {
            return 'Metodo no encontrado';
        }
    }
    
    comprobarResultado(valor, resultado){
        try{
            if(valor === 'dude aqui no hay nada' || valor === 'Metodo no encontrado'){
                return '    ';
            } 
            else{
                resultado = parseFloat(resultado);
                return valor == resultado ? 'Exito' : 'Falla';
            }
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




