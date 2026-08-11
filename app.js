const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const helmet = require("helmet");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://*.google.com",
          "https://*.googleapis.com",
          "https://*.googletagmanager.com",
          "https://*.doubleclick.net",
          "https://*.googleadservices.com",
          "https://*.gstatic.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
          "https://*.gstatic.com",
          "https://*.googleapis.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://*.gstatic.com", "https://*.googleapis.com", "https://cdnjs.cloudflare.com"],
        imgSrc: [
          "'self'",
          "data:",
          "https://*.googletagmanager.com",
          "https://*.google.com",
          "https://*.google.co.id",
          "https://*.doubleclick.net",
          "https://*.googleadservices.com",
          "https://*.gstatic.com",
          "https://*.googleapis.com",
        ],
        connectSrc: [
          "'self'",
          "https://*.google.com",
          "https://*.googleapis.com",
          "https://*.google-analytics.com",
          "https://*.googletagmanager.com",
          "https://*.doubleclick.net",
          "https://*.googleadservices.com",
          "https://*.gstatic.com",
        ],
        frameSrc: [
          "'self'",
          "https://*.google.com",
          "https://*.googleapis.com",
          "https://*.googletagmanager.com",
          "https://*.doubleclick.net",
        ],
      },
    },
  })
);

app.get("/favicon.ico", (req, res) => res.sendFile(path.join(__dirname, "public/images/logo.png")));
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

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

const webRoutes = require("./routes/web");
app.use("/", webRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});