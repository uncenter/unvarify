const fs = require("fs");
const yargs = require("yargs");
const { replaceVariables, removeVariables, validateCSS, formatCSS } = require("./index.js");

const options = yargs
    .usage("Usage: -i <input> -o <output>")
    .option("v", {
        alias: "validate",
        describe: "Validate input before processing",
        type: "boolean",
    })
    .option("r", {
        alias: "remove",
        describe: "Remove unused variables after processing",
        type: "boolean",
    })
    .option("f", {
        alias: "format",
        describe: "Format processed content before writing to file",
        type: "boolean",
    })
    .option("i", {
        alias: "input",
        describe: "Input file name to unvarify",
        type: "string",
        demandOption: true,
    })
    .option("o", {
        alias: "output",
        describe: "Output file name to write to",
        type: "string",
        demandOption: true,
    }).argv;

function main() {
    fs.readFile(options.input, "utf8", function (err, data) {
        if (err) throw err;

        // Step 1
        if (options.validate && validateCSS(data).length !== 0) {
            console.log(validateCSS(data));
            throw new Error("CSS validation failed.");
        } else {
            console.log("CSS validation passed.");
        }

        // Intermediary required step
        data = replaceVariables(data);

        // Step 2
        if (options.removeVariables) {
            data = removeVariables(data);
        }

        // Step 3
        if (options.format) {
            data = formatCSS(data);
        }

        // Final required step
        fs.writeFile(options.output, data, function (err) {
            if (err) throw err;
            console.log("Output written to file.");
        });
    });
}

main();
