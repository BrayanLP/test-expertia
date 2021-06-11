const express = require("express");
const bodyParser = require("body-parser");
const router = express();
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://localhost/test";

const User = require("./model/cliente");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lista de clientes
app.get("/api/clientes", async (req, res) => {
  mongoose.connect(url, { useUnifiedTopology: true }, async (err) => {
    try {
      let task = await User.find();
      console.log("task", task);
      res.send({
        Estatus: {
          Ok: true,
          Mensajes: null,
        },
        Resultado: task,
      });
    } catch (e) {
      console.log("error=>", e);
      res.status(500).send({
        message: "Ocurrio un error, intentelo más tarde",
      });
    }
  });
});

// Creacion de clientes
app.post("/api/clientes", async (req, res, next) => {
  mongoose.connect(url, { useUnifiedTopology: true }, async (err) => {
    try {
      const task = new User(req.body);
      console.log("res", task);
      await task.save();
      res.send({
        Estatus: {
          Ok: true,
          Mensajes: "Creado correctamente",
        },
      });
    } catch (e) {
      console.log("error=>", e);
      res.status(500).send({
        message: "Ocurrio un error, intentelo más tarde",
      });
    }
  });
});

// Actualizar
app.put("/api/clientes/:id", async (req, res, next) => {
  mongoose.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    async (err) => {
      try {
        const { id } = req.params;
        await User.update({ _id: id }, req.body);
        res.send({
          Estatus: {
            Ok: true,
            Mensajes: "Actualizado correctamente",
          },
        });
      } catch (e) {
        console.log("error=>", e);
        res.status(500).send({
          message: "Ocurrio un error, intentelo más tarde",
        });
      }
    }
  );
});

// Ver Detalle
app.get("/api/clientes/:id", async (req, res, next) => {
  mongoose.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    async (err) => {
      try {
        const { id } = req.params;
        // console.log(id);
        const client = await User.findOne({ _id: id });
        console.log(client);
        res.send(client);
      } catch (e) {
        console.log("error=>", e);
        res.status(500).send({
          message: "Ocurrio un error, intentelo más tarde",
        });
      }
    }
  );
});

// Eliminar
app.delete("/api/clientes/:id", async (req, res, next) => {
  mongoose.connect(url, { useUnifiedTopology: true }, async (err) => {
    try {
      let { id } = req.params;
      await User.remove({ _id: id });
      res.send({
        Estatus: {
          Ok: true,
          Mensajes: "Eliminado correctamente",
        },
      });
    } catch (e) {
      console.log("error=>", e);
      res.status(500).send({
        message: "Ocurrio un error, intentelo más tarde",
      });
    }
  });
});

app.get("/", (req, res) => {
  mongoose.connect(url, { useMongoClient: true }, function(err) {
    res.json({ message: "Welcome to application." });
  });
});

const PORT = process.env.PORT || 8080;
app.listen(3000, () => console.log("Blog server running on port 3000!"));
