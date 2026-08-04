const express = require("express");

const router = express.Router();


const {
    getUsers,
    deleteUser,
} = require("../controllers/admin.controller");


const protect = require("../middleware/protect");
const adminOnly = require("../middleware/admin");



router.get(
    "/users",
    protect,
    adminOnly,
    getUsers
);


router.delete(
    "/users/:id",
    protect,
    adminOnly,
    deleteUser
);

module.exports = router;