import fs from "fs";
import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const FILE = "pokemonok.csv";

if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "");
}

function beolvasCSV() {
    const tartalom = fs.readFileSync(FILE, "utf8").trim();

    if (!tartalom) {
        return [];
    }

    return tartalom.split("\n").map(sor => {
        const [nev, tipus, szint] = sor.split(";");
        return {
            nev,
            tipus,
            szint: Number(szint)
        };
    });
}

async function ujSzerzemeny() {
    const nev = await rl.question("Pokemon neve: ");
    const tipus = await rl.question("Pokemon típusa: ");
    const szint = await rl.question("Pokemon szintje: ");

    fs.appendFileSync(FILE, `${nev};${tipus};${szint}\n`);

    console.log("\nhozzáadva\n");
}

function lista() {
    const pokemonok = beolvasCSV();

    console.log("\n------");
    pokemonok.forEach(p => {
        console.log(`${p.nev} | ${p.tipus} | Szint: ${p.szint}`);
    });
    console.log();
}

function darabszam() {
    const pokemonok = beolvasCSV();
    console.log(`\nPokemonok száma: ${pokemonok.length}\n`);
}

function legerosebb() {
    const pokemonok = beolvasCSV();

    const maxSzint = Math.max(...pokemonok.map(p => p.szint));
    const legerosebbek = pokemonok.filter(p => p.szint === maxSzint);

    console.log(`\nLegerősebb Szint: ${maxSzint}`);
    legerosebbek.forEach(p => {
        console.log(`${p.nev} (${p.tipus})`);
    });
    console.log();
}

function szintSzerint() {
    const pokemonok = beolvasCSV();

    const rendezett = pokemonok.sort((a, b) => b.szint - a.szint);

    console.log("\nPokemonok szint szerint:");
    rendezett.forEach(p => {
        console.log(`${p.nev} - Szint: ${p.szint}`);
    });
    console.log();
}

while (true) {

        console.log(`
------ POKEMON NYILVÁNTARTÓ ------
1. Új
2. Lista
3. Darabszám
4. Legerősebb
5. Szint szerinti sorrendben
--------------------------------
`);

        const valasz = await rl.question("menüpontok: ");

        switch (valasz) {
            case "1":
                await ujSzerzemeny();
                break;
            case "2":
                lista();
                break;
            case "3":
                darabszam();
                break;
            case "4":
                legerosebb();
                break;
            case "5":
                szintSzerint();
                break;
            default:
                console.log("Érvénytelen");
        }
    }