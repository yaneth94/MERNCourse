const app = require("./app");

async function main() {
    // metodo asincrono el listen de app
    await app.listen(4000);
    console.log("Server on port 4000");
}

main();