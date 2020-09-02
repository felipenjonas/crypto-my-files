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

function decrypt() {
    rl.question('to decrypt the file you must enter the secret key:  ', (answer) => {
        if (answer === process.env.KEY) {
            fs.exists('output.txt', (exists) => {
                if (exists == true) {
                    console.log('\n The file output.txt exist!! The program will proceed the decrypt the file\n')
                    try {
                        fs.exists('decrypted.txt', (exists) => {
                            if (exists == true) {
                                console.log('The file decrypted.txt already was decrypted!! \n')
                            } else {
                                const read = fs.createReadStream('output.txt')
                                const write = fs.createWriteStream('decrypted.txt')
                                const cipher = crypto.createCipher(alg, passwd)

                                console.log(` Correct Secret Key, your decrypted file is done! `);

                                read.pipe(cipher).pipe(write)

                                console.log('Done! SUCCESS DECRYPT!')

                                rl.close();
                            }
                        });
                    } catch (err) {
                        return err
                    }
                } else {
                    console.log('\n The file Output.txt does not exist... You must create it execute the file cryptFile.js with node ')
                }
            });

        } else {
            console.log(`Sorry, The Secret Key is incorrect `);

            rl.close();
        }
    });
}

decrypt()


