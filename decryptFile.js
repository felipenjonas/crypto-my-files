const fs = require('fs');
const crypto = require('crypto')
const readline = require('readline');
require('dotenv/config');

const alg = 'aes-256-ctr'
const passwd = process.env.KEY

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('to decrypt the file you must enter the secret key:  ', (answer) => {
    if (answer === process.env.KEY) {
        const read = fs.createReadStream('output.txt')
        const write = fs.createWriteStream('decrypted.txt')
        const cipher = crypto.createCipher(alg, passwd)

        console.log(` Correct Secret Key, your decrypted file is done! `);

        read.pipe(cipher).pipe(write)
        
        console.log('Done! SUCCESS')

        rl.close();

    } else {
        console.log(`Sorry, The Secret Key is incorrect `);

        rl.close();
    }

});




