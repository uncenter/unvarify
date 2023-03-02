# `unvarify`

A simple tool to "unvarify" a CSS file by replacing all the variables with their values. 

## Usage

```
node console.js <args> --input <filename> --output <filename>
```

### Arguments

`-i, --input <filename>`: The file to unvarify (**required**).

`-o, --output <filename>`: The output file (**required**).

`-v, --validate`: Validate input before processing.

`-r, --remove`: Remove unused variables after processing.

`-f, --format`: Format processed content before writing to file.

`--help`: Show help.

`--version`: Show version number.


See [the roadmap](ROADMAP) for upcoming features and changes.

### Examples

Just unvarify the file:
```
node console.js --input index.css --output index-unvarified.css
```

Check before unvarifying and then prettify the file:
```
node console.js -c -p --input index.css --output index-unvarified.css
```

## License

[MIT](LICENSE)

## Contributing

I have no idea why you would want to contribute to this, but if you do, feel free to open an issue or a pull request.