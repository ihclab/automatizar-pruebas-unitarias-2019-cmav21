const fs = require('fs');

class ReadFile {

    leerArchivo () {
        fs.readFile('./CasosPrueba.txt', 'utf-8', (err, data)=> {
            if(err)
                console.log(err); 
            let lineas = data.split('\r\n');
            let campos = this.separarCampos(lineas);
            let valores = [];
            campos.forEach(vector => {
                if(vector[2] === 'NULL')
                    valores.push(null);
                else 
                    vector[2] === 'NULL' ? vector.push(null) : valores.push(this.convertirCadena(vector[2])) 
;
            });
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




