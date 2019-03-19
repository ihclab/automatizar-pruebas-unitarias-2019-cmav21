const fs = require('fs');

fs.readFile('./CasosPrueba.txt', 'utf-8', (err, data)=> {
    if(err)
        console.log(err); 
    let lineas = data.split('\r\n');
    let campos = separarCampos(lineas);
    console.log(campos);
});

let separarCampos = (elementos) => {
    let campos = [];
    elementos.forEach(element => {
        let valoresCampos = element.split(':');
        campos.push(valoresCampos);
    })
    return campos;
}




