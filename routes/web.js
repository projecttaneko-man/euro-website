const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/home", {
    title: "EuroPower Indonesia - Agen Genset Cummins & Perkins",
  });
});

router.get("/layanan-kami", (req, res) => {
  res.render("pages/layanan-kami", {
    title: "Layanan Kami – Euro Power | Agen Genset Cummins & Perkins",
  });
});

router.get("/insight", (req, res) => {
  res.render("pages/insight", {
    title: "Insight – Euro Power | Agen Genset Cummins & Perkins",
  });
});

router.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: "Hubungi Kami – Euro Power | Agen Genset Cummins & Perkins",
    success: req.query.success === "1",
  });
});

router.post("/contact", (req, res) => {
  const firstName = (req.body.firstName || "").trim();
  const lastName = (req.body.lastName || "").trim();
  const email = (req.body.email || "").trim();
  const subject = (req.body.subject || "").trim();
  const message = (req.body.message || "").trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!firstName || !lastName || !email || !message || !emailPattern.test(email)) {
    return res.status(400).render("pages/contact", {
      title: "Hubungi Kami – Euro Power | Agen Genset Cummins & Perkins",
      error: "Mohon lengkapi semua kolom wajib dengan benar.",
    });
  }

  console.log("Pesan baru dari:", { firstName, lastName, email, subject, message });
  res.redirect("/contact?success=1");
});

module.exports = router;