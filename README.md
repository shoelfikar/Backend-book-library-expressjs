# Backend-book-library-expressjs
---


![abcd](https://img.shields.io/badge/Code%20Style-Standard-green) [![Release Version](https://img.shields.io/badge/release-v.1.0-blue)](https://github.com/shoelfikar/Backend-book-library-expressjs/releases/tag/1.0) [![Node JS](https://img.shields.io/badge/Dependencies-Express%20JS-green)](https://nodejs.org/en/)




## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.
- Redis - Download and Install [Redis](https://redis.io/)

## Installation
### Clone
```
$ git clone https://github.com/shoelfikar/Backend-book-library-expressjs.git
$ cd Backend-book-library-expressjs
$ npm install
```

### Create Environment Variable
```
$ touch .env
$ nano .env
```

```
DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_TABLE_NAME

SERVER_PORT=YOUR_PORT

EMAIL=YOUR_EMAIL_ACTIVATION
PASSWORD=YOUR_EMAIL_PASSWORD

SECRET_KEY=YOUR_SECRET_KEY

SERVER_HOST=YOUR_HOST
SERVER_PORT=YOUR_PORT
SERVER_PORT_FRONT=YOUR_PORT_FRONT_END
PORT_REDIS=YOUR_PORT_REDIS / default => 6379

```

### Start Development Server
```
$ npm start
```
## Link Collection Postman
[Postman](https://www.getpostman.com/collections/5a776822917b6c04128a)

## Structur Folder
```
\---src
|    \---Configs
|    |   +---db.js            
|    \---controllers
|    |   +---books.js
|    |   +---category.js
|    |   +---loanbooks.js
|    |   +---user.js
|    \---helpers
|    |   +---helpers.js
|    \---models
|    |   +---books.js
|    |   +---category.js
|    |   +---loanbooks.js
|    |   +---user.js
|    \---routers
|    |   +---books.js
|    |   +---category.js
|    |   +---index.js
|    |   +---loanbooks.js
|    |   +---user.js
+---app.js
+---package-lock.json
+---package.json
```

### About Project 

  Membuat REST API untuk perpustakaan online menggunakan express js




---
Copyright © 2020 [Sulfikardi](https://github.com/shoelfikar/)
