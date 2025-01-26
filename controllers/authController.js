import { body, validationResult } from "express-validator";
import "dotenv/config";

const validateAuth = [
  body("adminPassword").custom(async (value) => {
    if (value != process.env.INVENTORY_PASS) {
      throw new Error("Wrong Password! Try Again.");
    }
  })
];

const authenticateGet = (req, res) => res.render("authenticate");
const authenticatePost = [
  validateAuth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).render("authenticate", {
        errors: errors.array(),
      });
    } else {
      req.session.authenticated = true;
      res.redirect("/");
    }
  },
];

export default { authenticateGet, authenticatePost };
