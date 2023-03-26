"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
// Load environment variables
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Import routes
const coins_1 = __importDefault(require("./routes/coins"));
const auth_1 = __importDefault(require("./routes/auth"));
const portfolios_1 = __importDefault(require("./routes/portfolios"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { path: '/socket' });
const PORT = Number(process.env.PORT) || 5001;
// Request body parser
app.use(express_1.default.json());
// Cors
app.use(cors_1.default());
// Cookie parser
app.use(cookie_parser_1.default());
// Route handlers
app.use('/api/v1/coins', coins_1.default);
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/portfolios', portfolios_1.default);
app.use('/api/v1/transactions', transactions_1.default);
// Global error handler
app.use(errorHandler_1.default);
// Serve build files if in production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
}
// Catch route
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/dist/index.html'));
});
io.on('connection', (socket) => {
    console.log('User connected');
    io.emit('connected', 'hi');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// Start server
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
