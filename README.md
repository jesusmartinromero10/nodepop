# Nodepop

Install dependencies with:

```sh
npm install
```

Initialize the database with:

```sh
npm run initDB
```

Start in development mode:

```sh
npm run dev
```

## General info

Application created with:

```sh
npx express-generator nodeapp --ejs
```

## Start a MongoDB Server in Macs or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```

## API Methods

### GET /api/anuncios

{
    "results":[
        {
            "_id":"63f5e4f167098aa92ce312ba",
            "nombre":"moto yamaha r1",
            "venta":true,
            "precio":20000,
            "foto":"r1.jpeg",
            "tags":["motor","lifestyle"],
            "__v":0
        },
        ...
}

