var fs = require("fs");
var CleanCSS = require('clean-css');
var cssbeautify = require('cssbeautify');
const { validate } = require('csstree-validator');

function replaceVars(input, options = { verbose: false }) {
    const declarations = [];

    input = input.replace(
        /(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g,
        (match, variable, value) => {
            declarations.push({ variable, value });
            if (options.verbose) {
                console.log(`Variable found: ${variable} = ${value}`);
            }
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

    if (options.verbose) {
        console.log(`Replaced ${declarations.length} variables.`);
    }
    return input;
}

function removeVars (input, options = { verbose: false }) {
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
    if (options.verbose) {
        console.log(`Removed ${count} variables.`);
    }
    return input;
}

function validateInput(input) {
    const result = validate(input, 'input.css');

    return result;
}

function prettyOutput (input, options = { verbose: false }) {
    if (options.verbose) {
        console.log(`Prettified processed output.`);
    }
    return cssbeautify(new CleanCSS().minify(input).styles);
}

function minifyOutput (input, options = { verbose: false }) {
    if (options.verbose) {
        console.log(`Minified processed output.`);
    }
    return new CleanCSS().minify(input).styles;
}

module.exports = {
    replaceVars,
    removeVars,
    validateInput,
    prettyOutput,
    minifyOutput
};