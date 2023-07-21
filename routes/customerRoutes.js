const express= require("express");
const router = express.Router();
const {getCustomers,
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer} = require("../controllers/customerController");
const validateToken = require("../middleware/validateTokenHandler")
router.use(validateToken);
router.route("/").get(getCustomers).post(createCustomer);
router.route("/:id").get(getCustomer).put(updateCustomer).delete(deleteCustomer);
module.exports=router;