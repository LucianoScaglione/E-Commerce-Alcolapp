const axios = require('axios');

const redireccionar = "http://localhost:3000";

const createPayment = async (item, id) => {
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      items: item,
      back_urls: {
        failure: `http://localhost:3001/payments/failure/${id}`,
        pending: `http://localhost:3001/payments/pending/${id}`,
        success: `http://localhost:3001/payments/success/${id}`,
      }
    };
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    const result = [
      payment.data.init_point,
      payment.data.id,
      payment.data.items.map((e) => {
        return e;
      }),
    ];
    return result;
  } catch (error) {
    next(error);
  };
};

const createInformationOrderWithPayment = async (req, res, next) => {
  try {
    const precioTotal = req.body.item.map(e => e.unit_price * e.quantity).reduce((a, b) => a + b);
    const orden = await axios.post('http://localhost:3001/orders', {
      idUsuario: req.body.id_usuario,
      estado: "pendiente",
      fecha: new Date(),
      precio_orden: precioTotal,
      id_usuario: req.body.id_usuario,
      productId: req.body.productId,
    });
    const resultado = await createPayment(req.body.item, orden.data.id);
    res.send(resultado);
  } catch (error) {
    next(error);
  };
};

const orderSuccess = async (req, res, next) => {
  try {
    const { id } = req.params;
    await axios.put(`http://localhost:3001/orders/${id}`, { estado: "finalizada" });
    res.redirect(redireccionar);
  } catch (error) {
    next(error);
  };
};

const orderPending = async (req, res, next) => {
  try {
    const { id } = req.params;
    await axios.put(`http://localhost:3001/orders/${id}`, { estado: "pendiente" });
    res.redirect(redireccionar);
  } catch (error) {
    next(error);
  };
};

const orderFailure = async (req, res, next) => {
  try {
    const { id } = req.params;
    await axios.put(`http://localhost:3001/orders/${id}`, { estado: "cancelada" });
    res.redirect(redireccionar);
  } catch (error) {
    next(error);
  };
};

module.exports = {
  createInformationOrderWithPayment,
  createPayment,
  orderSuccess,
  orderPending,
  orderFailure
};