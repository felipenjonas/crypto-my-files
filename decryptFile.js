const fs = require('fs');
const crypto = require('crypto')
const readline = require('readline');

const alg = 'aes-256-ctr'
const passwd = process.env.SECRET_KEY


const read = fs.createReadStream('./output.txt')
const write = fs.createWriteStream('./decrypted.txt')
const cipher = crypto.createCipher(alg, passwd)

// ler arquivo,critografa e devolve para outro arquivo de saída
read.pipe(cipher).pipe(write)
console.log('Pronto!')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('to decrypt the file you must enter the secret key:  ', (answer) => {
    if (answer === process.env.SECRET_KEY){
        console.log(` Correct Secret Key, your decrypted file is done! `);
        
        
    } else {
        console.log(`Sorry, The Secret Key is incorrect `);
        rl.close();
    }
    
    rl.close();
    
});




