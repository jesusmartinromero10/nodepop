var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var LoginController = require("./controller/LoginController");
var jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");
require('dotenv').config()

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

require("./lib/connectMongoose");

var app = express();

app.locals.title = "Nodepop";

//var mongoose = require('mongoose')

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// rutas website
app.use("/", indexRouter);
app.use("/users", usersRouter);

const loginController = new LoginController();

//rutas del API

app.use("/api/anuncios", require("./routes/api/anuncios"));
app.post("/api/login", loginController.postAPI);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // comprobar si es un error de validación
  if (err.array) {
    // const errorInfo = err.array({ onlyFirstError: true })[0];
    const errorInfo = err.errors[0];
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  // si lo que ha fallado es una petición al API
  // devuelvo el error en formato JSON
  if (req.originalUrl.startsWith("/api/")) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
