// cargando dotenv
require("dotenv").config();

const app = require("./app");
require("./database");

async function main() {
    // metodo asincrono el listen de app
    await app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
}

main();