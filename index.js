import fs from "fs";
import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const data = fs.readFileSync("pokemonok.csv").toString();
console.log(data);

const nev = await rl.question("Mi a pokemon neve: ");
const tipus = await rl.question("Mi a pokemon tipusa: ");
const szint = await rl.question("Mi a pokemon szintje: ");

fs.appendFileSync("pokemonok.csv", nev + ";" + tipus + ";" + szint + "\n");

rl.close();

