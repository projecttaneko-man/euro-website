const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

app.locals.site = {
  phoneDisplay: "+62 851-9609-5855",
  emailMarketing: "marketing@europower.co.id",
  emailSupport: "support@europower.co.id",
  waLink: "https://api.whatsapp.com/send/?phone=6285196095855&text&type=phone_number&app_absent=0",
  location: "Semarang, Jawa Tengah",
  hours: "Senin - Jumat, 08.00 - 17.00",
};

const webRoutes = require("./routes/web");
app.use("/", webRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});