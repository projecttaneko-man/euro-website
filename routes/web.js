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

router.get("/contact", (req, res) => {
  res.render("pages/contact", { title: "Hubungi Kami – Euro Power" });
});

router.post("/contact", (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;
  console.log("Pesan baru dari:", { firstName, lastName, email, subject, message });
  res.redirect("/contact?success=1");
});

module.exports = router;