"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basePlayerPage = basePlayerPage;
const index_1 = require("../index");
function basePlayerPage(conmutatedValue, image, version) {
    const versionParam = version ? `&version=${encodeURIComponent(version)}` : '';
    return `
        <script>${index_1.CAT_FRAME}</script>
        <!-- Import fontawesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .container {
            display: flex;
            height: 100vh;
            width: 100vw;
            background-image: url(${image});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .container-general {
            height: 100%;
            width: 100%;
            background-color: rgb(0 0 0 / 31%);
        }
        .container-player {
            width: 100%;
            height: 100%;
        }
        .player-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            text-decoration: none;
            cursor: pointer;
        }
        .player-button:hover .player-icon {
            filter: opacity(.80);
            transform: scale(1.08);
            transition: transform 0.2s ease, filter 0.2s ease;
        }
    </style>
        <div class="container">
            <div class="container-general">
                <div class="container-player">
                    <a id="player" class="player-button" href="${conmutatedValue}&image=${image}${versionParam}"><i class="player-icon fa fa-play" style="font-size:100px;color:#ffff"></i></a>
                </div>
            </div>
        </div>
        `;
}
