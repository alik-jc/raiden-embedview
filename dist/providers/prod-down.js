"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorWebsite = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const errorWebsite = (uriParameter) => {
    const error = uriParameter;
    //search and extract domain name from url
    const domainName = error.split("/")[2];
    const catframe = process.env.CAT_FRAME || '';
    return `
    <script src="${catframe}"></script>
    <!-- Favicon -->
    <link rel="shortcut icon" href="https://dev.aniyae.net/img/favicon-gris.png" type="image/x-icon">
    <!-- Import jquery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
body {
    font-family: 'Roboto', sans-serif;
    background-color: #3701c0;
}
.error-msg{
    font-size: 1.5rem;
    font-weight: 300;
    color: #ffffff;
    text-align: center;
}
.error-text{
    font-size: 1.5rem;
    font-weight: 300;
    color: #ffffff;
    text-align: center;
}
.strong-text{
    font-weight: 700;
}

/* Center container */
.center-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Responsive */
@media screen and (max-width: 768px) {
    .error-msg{
        font-size: 1rem;    
    }
    .error-text{
        font-size: 1rem;
    }
    .strong-text{
        font-weight: 700;
    }
    .center-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
}
    </style>
    
    <div class="center-container">
        <h1 class="error-msg strong-text">Proveedor ya no disponible</h1>
        <p class="error-text">Parece que <span class="strong-text">${domainName}</span>, ya no esta disponible. <br> Si es el unico proveedor de video, carga la seccion de comentarios y
            solicita que se añadan otros servidores</p>
    </div>
    `;
};
exports.errorWebsite = errorWebsite;
