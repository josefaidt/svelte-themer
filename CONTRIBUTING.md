# Contributing

## Prerequisites

- Node.js version mentioned in [.nvmrc](./.nvmrc)
- [pnpm](https://pnpm.io/) -- `npm install -g pnpm`

## Development

This guide utilizes the [GitHub CLI](https://cli.github.com/)

1. `gh repo fork josefaidt/svelte-themer`
2. Follow the prompts to clone the fork

   ```console
   ? Would you like to clone the fork? Yes
   ```

3. This will clone the forked repository locally with `origin` and `upstream` remotes, as well as set up local branches tracking existing upstream branches. To proceed with development off the `main` branch, run:

   ```console
   git checkout -b my-new-branch
   ```

4. Install dependencies with `pnpm install`
5. Run the development servers with `pnpm start`

## Sync Local Branches

```console
git checkout main
git fetch upstream
git pull --strategy-option theirs
```

## Releasing

### Latest

1. `pnpm version --<major|minor|patch>`
2. `pnpm publish`

### Next

1. `pnpm version prerelease --preid next`
2. `pnpm publish --tag next --publish-branch next`
