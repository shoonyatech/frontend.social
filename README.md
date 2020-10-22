# Frontend Social

frontend.social website

## Project setup

Fork (upstream): https://github.com/shoonyatech/frontend.social

### Clone the repo on your local box

```
git clone <your forked git repo>
```

### Add upstream as remote git repo

```
git remote add upstream git@github.com:shoonyatech/frontend.social.git
```

## Run the site on local

Rename `src/config/keys.uat.js` file to `keys.js`

### Get project dependancies

```
npm install
```

### Run on local dev web server

```
npm run serve
```

### Run api server on localhost

Api Server : https://github.com/shoonyatech/frontend-social-api

Follow steps in this repo to setup API server on localhost using test DB

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

## Create PR

### Rebase with upstream

```
git checkout master
git pull upstream master --rebase
```

### Create local commit

We believe in proper commit messages to maintain consistency in the
project. You can either use `cz` command or write commit message in below format:

` type(scope?): subject body? footer?`

Example: feat(news-feed): add news feed feature on landing page

```
git push origin master -f
```

## Contribution

<!-- Please make sure to read the [Contributing Guide](https://github.com/shoonyatech/frontend.social/blob/master/.github/CONTRIBUTING.md) before making a pull request.  -->

Thank you to all the people who already contributed to frontend.social!

<a href="https://github.com/shoonyatech/frontend.social/graphs/contributors"><img src="./.github/contributors.svg" /></a>

## Stay in Touch

- [Twitter](https://twitter.com/frontendsocial)
- [Slack](https://join.slack.com/t/shoonya-tech/shared_invite/zt-i783y3rk-5I97wQmTZ~4zchNZdKJs2w)
- Mail us at [contact@shoonya.ca](mailto:contact@shoonya.ca)

Create new PR from your GitHub repo to upstream repo
Star the repo if you like it!
