const fs = require("fs");
const yargs = require("yargs");
const { replaceVars, removeVars, validateInput, formatOutput } = require("./index.js");

const options = yargs
    .usage("Usage: -i <input> -o <output>")
    .option("c", {
        alias: "check",
        describe: "Check input for errors before processing",
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
    .option("v", {
        alias: "verbose",
        describe: "Show verbose output",
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
        if (err) {
            throw new Error("Input file not found.");
        } else {
            if (options.verbose) {
                console.log("Input file found.");
            }
        }

        if (options.check && validateInput(data).length !== 0) {
            console.log(validateInput(data));
            throw new Error("Input failed validation checks.");
        } else {
            if (options.check && options.verbose) {
                console.log("Input passed validation checks.");
            }
        }

        data = replaceVars(data, { verbose: options.verbose });

        if (options.remove) {
            data = removeVars(data, { verbose: options.verbose });
        }

        if (options.format) {
            data = formatOutput(data, { verbose: options.verbose });
        }

        fs.writeFile(options.output, data, function (err) {
            if (err) throw err;
            if (options.verbose) {
                console.log("Output written to file.");
            }
        });
    });
}

main();
