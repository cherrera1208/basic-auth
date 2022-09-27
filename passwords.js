'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');

let username = 'Carlos';
let password = 'pa$$W0rd!';

let credentials = `${username}:${password}`;
let encodedCredentials = base64.encode(credentials);
console.log(credentials, encodedCredentials);

let decodedCredentials = base64.decode(encodedCredentials);

console.log(credentials == decodedCredentials);

let complexity = 5;
bcrypt.hash(password, complexity)
  .then(encryptedPassword => {
    console.log(encryptedPassword);

    console.log(password, encryptedPassword);
    bcrypt.compare('pa$$W0rd!', '$2b$05$dUPBsRBoD3A0JllOtJZpleSjMAau7P4j5dOmpOl8KshCiJjXMWHJy').then(isValid => console.log(isValid));
  })
