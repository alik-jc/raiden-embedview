"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raidenGeneral = raidenGeneral;
const index_1 = require("../index");
function raidenGeneral(uriParameter) {
    const content = `
    <script>${index_1.CAT_FRAME}</script>
    <style>
        body {
            margin: 0;
        }
        iframe {
            height: calc(100vh - 4px);
            width: calc(100vw - 4px);
            border: 0;
            box-sizing: border-box;
        }
        .container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            height: 100vh;
            width: 100vw;
            background-color: rgba(0, 0, 0, 0);
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
                <img class="logo-float-img" src="//i0.aniyae.net/aniyae.net/wp-content/uploads/2022/04/AYLogoV4.png?fit=230%2C2047&ssl=1" alt="Aniyae Logo">
            </div>
        </div>
        <iframe allowfullscreen="yes" scrolling="no" src="${uriParameter}" autoplay="true"></iframe>
    </div>
    <script>${index_1.ADS_PLAYER}</script>
    <script>${index_1.ADS_GUARDIAN}</script>`;
    return content;
}
