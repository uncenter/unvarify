# Roadmap

## Bug fixes

- [x] The remove variables step messes with semi-colons and isn't doing it properly? I think I have the regex wrong.
Fixed?

## Arguments

- [x] `-c, --check`: Change `-v, --validate` to `-c, --check` to allow for '-v, --verbose' in the future.
- [x] `-v, --verbose`: Once `-c, --check` is changed, add `-v, --verbose` to display the variables and their values in the replace variables step.
- [ ] `-m, --minify`: Add minifying since we already have formatting.
- [ ] `-p, --pretty`: Change `-f, --format` to `-p, --pretty` for no reason.
- [ ] `-s, --silent`: Add silent since we have `-v, --verbose`.

Here's the new help text.
```
`-m, --minify`: Minify the output file.

`-p, --pretty`: Prettify the output file.

`-s, --silent`: Don't display anything.
```

## NPM package?

- [ ] Make it an NPM package?

Is it even worth it lmao.

## Other

- [ ] Add tests? (I don't know how to do this)
- [ ] Allow for multiple input files and output files?
    - [ ] On the same note, allow for multiple input files and one output file?
- [ ] Allow for overwriting, i.e. same input and output files.
- [ ] Add fancy colors to the output.
