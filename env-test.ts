import * as dotenv from 'dotenv';
dotenv.config();

console.log(`API_URL: ${process.env.API_URL}`);
console.log(`OID: ${process.env.OID}`);
console.log(`CLEINT_ID: ${process.env.CLEINT_ID}`);
console.log(`CLEINT_SECRET: ${process.env.CLEINT_SECRET}`);
