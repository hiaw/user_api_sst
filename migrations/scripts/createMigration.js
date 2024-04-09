const fs = require("fs");

const date = new Date();
const year = String(date.getUTCFullYear());
const month = String(date.getUTCMonth() + 1).padStart(2, "0");
const day = String(date.getUTCDate()).padStart(2, "0");
const hour = String(date.getUTCHours()).padStart(2, "0");
const min = String(date.getUTCMinutes()).padStart(2, "0");
const sec = String(date.getUTCSeconds()).padStart(2, "0");

const dateString = `${year}${month}${day}${hour}${min}${sec}`;

fs.copyFile("./scripts/blankMigration.mjs", `${dateString}_.mjs`, () => {});
