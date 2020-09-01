const fs = require('fs');
require('dotenv/config');
const crypto = require('crypto')
const alg = 'aes-256-ctr'

const passwd = process.env.KEY


const read = fs.createReadStream('./input.txt')
const write = fs.createWriteStream('./output.txt')
const cipher = crypto.createCipher(alg, passwd)


read.pipe(cipher).pipe(write)
console.log('Pronto!')