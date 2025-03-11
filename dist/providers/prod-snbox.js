"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raidenSanbox = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function raidenSanbox(uriParameter) {
    const catframe = process.env.CAT_FRAME || '';
    const content = `
    <script src="${catframe}"></script>
    <style>
        body {
            margin: 0;
        }
        iframe {
            height:calc(100vh - 4px);
            width:calc(100vw - 4px);
            border:0;
            box-sizing: border-box;
        }
        .container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            height: 100vh;
            width: 100vw;
            background-color: rgb(0,0,0,0);
            
        }
        .logo-float {
            position: absolute;
            top: 10px;
            left: 10px;
        }
        
        .logo-float-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
        }
        
        .logo-float-img {
            max-width: 80px;
        }
    </style>
    <div class="container">
        <div class="logo-float">
            <div class="logo-float-container">
                <img class="logo-float-img" src="//i0.wp.com/aniyae.net/wp-content/uploads/2022/04/AYLogoV4.png?fit=230%2C2047&ssl=1" alt="Aniyae Logo">
            </div>
        </div>
        <iframe allowfullscreen="yes" sandbox="allow-same-origin allow-scripts" scrolling="no" src="${uriParameter}" autoplay="true"></iframe>
    </div>`;
    return content;
}
exports.raidenSanbox = raidenSanbox;
