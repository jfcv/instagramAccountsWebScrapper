"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const index_controllers_1 = require("../controllers/index.controllers");
router.get('/accounts', index_controllers_1.getAccounts);
router.post('/accounts', index_controllers_1.addAccount);
exports.default = router;
