"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const protect_1 = require("../middleware/protect");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post('/register', express_validator_1.body('email')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail(), express_validator_1.body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .trim()
    .escape(), auth_1.register);
router.post('/login', express_validator_1.body('email')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail(), express_validator_1.body('password')
    .trim()
    .escape(), auth_1.login);
router.post('/logout', auth_1.logout);
router.post('/demoLogin', auth_1.demoLogin);
router.get('/verify', protect_1.protect, (req, res) => {
    const resObj = { success: true, user: req.body.user.user_email };
    console.log('verify');
    console.log(resObj);
    res.status(200).json(resObj);
});
exports.default = router;
