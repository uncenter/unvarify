var fs = require("fs");
var CleanCSS = require('clean-css');
var cssbeautify = require('cssbeautify');
const { validate } = require('csstree-validator');

function replaceVariables(input) {
    const declarations = [];

    input = input.replace(
        /(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g,
        (match, variable, value) => {
            declarations.push({ variable, value });
            return match;
        }
    );

    const resolveValue = (value) => {
        const match = value.match(/var\((--[a-zA-Z0-9-]+)\)/);
        if (match) {
            const declaration = declarations.find((d) => d.variable === match[1]);
            if (declaration) {
                return resolveValue(declaration.value);
            }
        }
        return value;
    };

    input = input.replace(/var\((--[a-zA-Z0-9-]+)\)/g, (match, variable) => {
        const declaration = declarations.find((d) => d.variable === variable);
        if (declaration) {
            return resolveValue(declaration.value);
        }
        return match;
    });

    console.log(`Variables replaced (${declarations.length}).`);
    return input;
}

function removeVariables (input) {
    let count = 0;
    input = input.replace(/(--[a-zA-Z0-9-]+)\s*:\s*((?!url\().)+;/g,
        (match, variable) => {
            if (input.includes('var(' + variable + ')')) {
                return match;
            } else {
                count++;
                return '';
            }
        }
    );
    console.log(`Variables removed (${count}).`);
    return input;
}

function validateCSS(input) {
    const result = validate(input, 'input.css');

    return result;
}

function formatCSS (input) {
    return cssbeautify(new CleanCSS().minify(input).styles);
}

function main () {
    fs.readFile("test.css", "utf8", function (err, data) {
        if (err) throw err;
        if (validateCSS(data).length !== 0) {
            console.log(validateCSS(data));
            throw new Error('CSS validation failed.');
        } else {
            console.log('CSS validation passed.');
        }
        data = formatCSS(replaceVariables(data));
        fs.writeFile("output.css", data, function (err) {
            if (err) throw err;
            console.log("Output written to file.");
        });
    });
}

main();