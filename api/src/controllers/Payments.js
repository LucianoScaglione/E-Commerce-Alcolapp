const axios = require('axios');

const createPayment = async (req, res, next) => {
  console.log("payment", req.body)
  try {
    // Agrego los datos (id, title, description, picture_url,category_id, quantity, unit_price) a una constante para simplificar
    const item = req.body;
    // URL para enviar la data a MercadoPago
    const url = "https://api.mercadopago.com/checkout/preferences";
    // Datos de la órden
    const body = {
      items: [item],
      back_urls: {
        failure: "http://www.failure.com",
        pending: "http://www.pending.com",
        success: "https://www.success.com",
      }
    };
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    // Información que se enviará al front (en init_point está el link para comprar)
    const result = [
        payment.data.init_point,
        payment.data.id,
        payment.data.items.map((e) => {
        return e;
        }),
      ];
     console.log("id orden", result)
    // Creo la orden para agregarla a la tabla "Ordenes"
    // const precioTotal = item.map(e => e.unit_price * e.quantity.reduce((a, b) => a + b))
    console.log(item)
    const crearOrden = {
      id: result[1],
      estado: "pendiente", 
      fecha: new Date(),
      precio_orden: 1,
      id_usuario: req.body.id_usuario, 
      productId: [req.body.productId],
    }
    // Hago el post a orders
    await axios.post('http://localhost:3001/orders', crearOrden);
      res.send(result);
  } catch (error) {
    next(error)
  }
  }

  module.exports = {
    createPayment
  };