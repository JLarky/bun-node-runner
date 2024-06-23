import { printIsNotBun } from "is-not-bun"

console.log("from js file", import.meta.filename);
printIsNotBun();