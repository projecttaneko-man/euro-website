const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/home", {
    title: "EuroPower Indonesia",
  });
});

router.get("/layanan-kami", (req, res) => {
  res.render("pages/layanan-kami", {
    title: "Layanan Kami – Euro Power",
  });
});

router.get("/insight", (req, res) => {
  res.render("pages/insight", {
    title: "Insight – Euro Power",
  });
});

router.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: "Contact – Euro Power",
  });
});

module.exports = router;