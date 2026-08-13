"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raidenSanbox = raidenSanbox;
const index_1 = require("../index");
function raidenSanbox(uriParameter, version = 'snbox') {
    const noticeHtml = (0, index_1.renderNoticeBanner)(version);
    const content = `
    <script>${index_1.CAT_FRAME}</script>
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
            z-index: 100;
            pointer-events: none;
        }
        .logo-float-container {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;
        }
        .logo-float-img {
            max-width: 80px;
            display: block;
        }
        ${index_1.NOTICE_STYLES}
    </style>
    <div class="container">
        <div class="logo-float">
            <div class="logo-float-container">
                ${noticeHtml}
            </div>
        </div>
        <iframe allowfullscreen="yes" sandbox="allow-same-origin allow-scripts" scrolling="no" src="${uriParameter}" autoplay="true"></iframe>
    </div>
    <script>${index_1.ADS_PLAYER}</script>
    <script>${index_1.ADS_GUARDIAN}</script>`;
    return content;
}
