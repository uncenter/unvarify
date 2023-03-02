# `unvarify`

> **Warning**<br>
> Please don't acfually use this. Try [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables) instead.
> I made this tool (originally a script) to quickly unvarify a CSS file for a Codepen and kept going with it... I don't know why.

A ~~simple~~ cursed tool to "unvarify" a CSS file by replacing all the variables with their values. 

## Usage

```sh
node console.js <args> --input <filename> --output <filename>
```

### Arguments

`-i, --input <filename>`: The file to unvarify (**required**).

`-o, --output <filename>`: The output file (**required**).

`-c, --check`: Check input for errors before processing.

`-r, --remove`: Remove unused variables after processing. [^1]
[^1]: With `--remove`, you may have empty selectors. I recommend using `--format` after using `--remove` to fix.

`-f, --format`: Format processed content before writing to file. [^2]
[^2]: Uses CleanCSS under the hood.

`-v, --verbose`: Show verbose output.

`--help`: Show help.

`--version`: Show version number.


See [the roadmap](ROADMAP.md) for upcoming features and changes.

### Examples

Just unvarify the file:
```sh
node console.js --input input.css --output output.css
```

Check before unvarifying and then prettify the file:
```sh
node console.js -c -p --input input.css --output output.css
```

## License

[MIT](LICENSE)

## Contributing

I have no idea why you would want to contribute to this, but if you do, feel free to open an issue or a pull request.