const fs = require('fs')

fs.exists('teste.txt', (exists) => {
    console.log(exists ? 'it\'s there' : 'no passwd!');
});


function verifyExistInputFile() {
    fs.exists('input.txt', (exists) => {
        if(exists == true){    
            console.log('The file input.txt already exist!!')
        } else {
            console.log('The file input.txt does not exist... You must create')
        }
    });
}

function verifyExistOutputFile() {
    fs.exists('output.txt', (exists) => {
        if(exists == true){    
            console.log('The file output.txt already exist!!')
        } else {
            console.log('The file output.txt does not exist... You must create')
        }

    });
}

// verifyExistInputFile()
verifyExistOutputFile()