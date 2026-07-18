const express = require("express");

const router = express.Router();

const payoutController = require("../controllers/payoutController");
router.get("/", payoutController.getPayouts);
router.post("/advance", payoutController.advancePayout);
router.post("/reconcile", payoutController.reconcileSale);
router.post("/recover", payoutController.recoverPayout);
module.exports = router;