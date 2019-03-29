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
            // textoArchivo = this.obtenerTextoArchivo(campos,pruebas, valores, resultados); 
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
                console.log(res);
                pruebas.push(res);
            } catch(err){
                pruebas.push('exception');
                console.log(err);
            }
        }
        return pruebas;
    }

    // obtenerTextoArchivo( campos, resultadosPruebas, resPruebas, resultados){
    //     let texto = 'ID     ResultadoMétodo         Detalles \n========================================= \n';
    //     let exito = resultadosPruebas.filter(element => element === 'Exito');
    //     let falla = resultadosPruebas.filter(element => element === 'Falla')
    //     for (let i = 0; i < resPruebas.length; i++) {
    //             texto += ``;
    //             if(resultadosPruebas[i].split('    ')[1] !== 'Metodo no implementado' && resultadosPruebas[i].split('    ')[1] !== 'Metodo no encontrado'){
    //                 if(resultadosPruebas[i] === 'Exito')
    //                 texto += `${campos[i][0]}    ${resultadosPruebas[i]}   ${campos[i][1]} Calculado = ${resultados[i]} T.E: ${this.ejecucionPerMetodo[i]} ms \n`;
    //                 else
    //                 texto += `${campos[i][0]}   *${resultadosPruebas[i]}*  ${campos[i][1]} Calculado = ${resultados[i]} Esperado = ${campos[i][3]} T.E: ${this.ejecucionPerMetodo[i]} ms \n`;
    //             } else {
    //                 texto += `${campos[i][0]}          ${resultadosPruebas[i]}   ${campos[i][1]} \n` ;
    //             }
    //     }   
    //     return texto += `================== Fin de la prueba====================== \nExito = ${exito.length}    Falla = ${falla.length}`;
    // }
    
    // guardarEnArchivo(texto){
    //     fs.writeFile('resultadosPrueba.txt', texto, 'utf8', (err) => {
    //         if(err)
    //             console.log(err);
    //         console.log('el archivo fue almacenado con exito');
    //     })
    // }

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
            // if(valor === 'dude aqui no hay nada'){
            //     return 'Metodo no implementado';
            // } else if(valor === 'Metodo no encontrado'){
            //     return 'Metodo no encontrado';                
            // }
            // else{
                resultado = parseFloat(resultado);
                return valor == resultado ? `'\x1b[32m'Exito` : `'\x1b[31m'Falla`;
            // }
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




