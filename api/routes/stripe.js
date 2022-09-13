const router = require("express").Router();
const KEY = `sk_test_51LYWKlL0artSSbIB6BHEoDWEAEaN8c4SYJ6DKkb6F9az4mzMJkQ9ZXVaib3KhAyXiMI8mo2VDriRqZcOonR6bsTu00cjR2RgcP`;
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: "tok_mastercard",
      amount: req.body.amount * 100,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
