const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentosVencidosSchema = new Schema({
  Sucursal: { type: String },
  Comprobante: { type: String },
  Moneda: { type: String },
  MontoACobrar: { type: String },
  MontoPendiente: { type: String },
  FechaEmision: { type: String },
  FechaVencimiento: { type: String },
  CondicionPago: { type: String },
});

// create a schema
const clientSchema = new Schema(
  {
    IdCliente: { type: String},
    NombreCliente: { type: String, required: true },
    Direccion: { type: String },
    CorreoElectronico: { type: String, required: true, unique: true },
    EsGoldenLine: { type: String },
    AutorizaUATPConMorosidad: { type: String },
    AutorizaEmisionConFComisionPendiente: { type: String },
    IndBilletera: { type: String },
    MontoMaximoMorosidad: { type: String, required: true },
    idSucursal: { type: String },
    idPtoVenta: { type: String },
    Comisionistas: { type: String },
    LineaCredito: {
      IdCliente: { type: String },
      TotalCotizacion: { type: String },
      LineaCredito: { type: String },
      CreditoUtilizado: { type: String },
      DeudaVencida: { type: String },
      DeudaALaFecha: { type: String },
      CreditoDisponible: { type: String },
    },
    Morosidad: {
      MensajeMorosidad: { type: String },
      DeudaTotal: { type: String },
      DocumentosVencidos: [DocumentosVencidosSchema],
    },
  },
  { collection: "client" }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
