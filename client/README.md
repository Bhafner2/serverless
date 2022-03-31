# Angular Starter

An Angular application featuring [Angular](https://angular.io), [BiSkinKit](http://biskin-kit.pages.bisdevdom.ch/biskin-kit/?path=/story/welcome--to-biskinkit-storybook), [ag-Grid](https://www.ag-grid.com/)

# Table of Contents

- [Getting Started](#getting-started)
  - [Dependencies](#dependencies)
  - [Installing](#installing)
  - [Running the app](#running-the-app)

# Getting Started

## Dependencies

What you need to run this app:

- `node` and `npm`
- Ensure you're running the latest versions Node `v14.x.x`+

## Installing

- `fork` this repo
- `clone` your fork
- `npm install` to install all dependencies or `yarn`
- `npm run serve` to start the dev server

## Running the app

After you have installed all dependencies you can now run the app. Run `npm run serve` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:4200`.

## Other commands

### build files

```bash
# Frontend starten
npm run serve
```

### lint files

```bash
npm run lint
```

### run unit tests

```bash
npm run test
```

### run end-to-end tests

```bash
# this will start a test server and launch Cypress
npm run e2e
```

### working with translations

```bash
npm run i18n
```

# Troubleshoot

## Command not found

If you're running Git from an app and the command can be found in your terminal, this means that the `PATH` in your app is different from your terminal.

You can `echo $PATH` in your terminal and configure your app to use the same value.

If you've installed your command using `brew`, see the [Homebrew FAQ](https://docs.brew.sh/FAQ) to make your command available to your app.

Finally, if you're using a script for managing versions like `nvm`, `n`, `rbenv`, `pyenv`, ... you can use `~/.huskyrc` to load the necessary before running hooks.

For example, for `nvm` that would be:

```shell
# ~/.huskyrc
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Hooks not running

Ensure that you don't have a typo in your filename. For example, `precommit` or `pre-commit.sh` are invalid names. See Git hooks [documentation](https://git-scm.com/docs/githooks) for valid names.

Verify hooks permissions, they should be executable. This is automatically set when using `husky add` command but you can run `chmod +x .husky/<hookname>` to fix that.

Check that your version of Git is greater than `2.9`.

## Yarn on Windows

Git hooks may fail when using Yarn on Windows with Git Bash (`stdin is not a tty`). If you have users on Windows, it's highly recommended to add the following workaround.

1. Create `.husky/common.sh`:

```shell
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
```

2. Source it in in places where Yarn is used to run commands:

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

yarn ...
```
