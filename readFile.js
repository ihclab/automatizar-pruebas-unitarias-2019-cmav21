const fs = require('fs');

class ReadFile {
    constructor(fs) {
        this.fs = fs;
    }

    leerArchivo = () => {
        this.fs.readFile('./CasosPrueba.txt', 'utf-8', (err, data)=> {
            if(err)
                console.log(err); 
            let lineas = data.split('\r\n');
            let campos = separarCampos(lineas);
            console.log(campos);
        });
    }

    separarCampos = (elementos) => {
        let campos = [];
        elementos.forEach(element => {
            let valoresCampos = element.split(':');
            campos.push(valoresCampos);
        })
        return campos;
    }
}




