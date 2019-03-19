const fs = require('fs');

fs.readFile('./CasosPrueba.txt', 'utf-8', (err, data)=> {
    if(err)
        console.log(err);
    console.log(data);
});

