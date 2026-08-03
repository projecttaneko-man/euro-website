const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.render("pages/home", {
        title: "EuroPower Indonesia"
    });

});

module.exports = router;