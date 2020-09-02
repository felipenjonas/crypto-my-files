const fs = require('fs');
require('dotenv/config');
const crypto = require('crypto')
const alg = 'aes-256-ctr'

const passwd = process.env.KEY

function crypt() {
    fs.exists('input.txt', (exists) => {
        if (exists == true) {
            console.log('\n The file input.txt already exist!! The program will proceed the crypt the file\n')
            try {
                fs.exists('output.txt', (exists) => {
                    if (exists == true) {
                        console.log('The file output.txt already exist!! If you want decrypt it, you need execute the decryptFile.js with node on terminal')
                    } else {
                        const read = fs.createReadStream('./input.txt')
                        const write = fs.createWriteStream('./output.txt')
                        const cipher = crypto.createCipher(alg, passwd)

                        read.pipe(cipher).pipe(write)
                        console.log('\n Crypt Success!\n')
                    }
                });
            } catch (err) {
                return err
            }
        } else {
            console.log('The file input.txt does not exist... You must create it manualy')
        }
    });
}

crypt()



