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

```
git push origin master -f
```

Create new PR from your GitHub repo to upstream repo
