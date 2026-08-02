"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raidenZillaProxy = raidenZillaProxy;
const index_1 = require("../index");
function raidenZillaProxy(hash) {
    const jwPlayer = "//ssl.p.jwpcdn.com/player/v/8.30.0/jwplayer.js";
    const m3u8Proxy = `/zilla-m3u8/${hash}`;
    const content = `
    <script>${index_1.CAT_FRAME}</script>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #000;
            overflow: hidden;
        }
        #player {
            width: 100%;
            height: 100vh;
        }
        .logo-float {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 99;
        }
        .logo-float-img {
            max-width: 80px;
        }
    </style>
    <div class="logo-float">
        <img class="logo-float-img" src="//i0.aniyae.net/aniyae.net/wp-content/uploads/2022/04/AYLogoV4.png?fit=230%2C2047&ssl=1" alt="Aniyae Logo">
    </div>
    <div id="player"></div>
    <script src="${jwPlayer}"></script>
    <script>
        jwplayer("player").setup({
            file: "${m3u8Proxy}",
            type: "hls",
            width: "100%",
            height: "100%",
            autostart: true,
            skin: {
                name: "RPlay",
                active: "#4b00ff",
                inactive: "#FFFFFF"
            }
        });
    </script>
    <script>${index_1.ADS_PLAYER}</script>
    <script>${index_1.ADS_GUARDIAN}</script>`;
    return content;
}
