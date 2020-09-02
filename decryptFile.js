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


rl.stdoutMuted = true;

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

    // ==================HIDE TERMINAL PASSWORD###1 "password : ****" 
    // rl._writeToOutput = function _writeToOutput(stringToWrite) {
    //     if (rl.stdoutMuted)
    //       rl.output.write("*");
    //     else
    //       rl.output.write(stringToWrite);
    //   };

    //==================HIDE TERMINAL PASSWORD###2 
      rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.stdoutMuted)
          rl.output.write("\x1B[2K\x1B[200D"+rl.query+"["+((rl.line.length%2==1)?"=-":"-=")+"]");
        else
          rl.output.write(stringToWrite);
      };



    // ==================HIDE TERMINAL PASSWORD###3
    // This sequence "\x1B[2K\x1BD" uses two escapes sequences:
    // Esc[2K: clear entire line.
    // Esc D: move / scroll window up one line.

        // rl._writeToOutput = function _writeToOutput(stringToWrite) {
        //     if (rl.stdoutMuted)
        //         rl.output.write("\x1B[2K\x1B[200D" + rl.query + "[" + ((rl.line.length % 2 == 1) ? "*" : "*") + "]");
        //     else
        //         rl.output.write(stringToWrite);
        // };
}

decrypt()

// You can clear history with
rl.history = rl.history.slice(1);


