"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basePlayerPage = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function basePlayerPage(conmutatedValue, image) {
    const catframe = process.env.CAT_FRAME || '';
    return `
        <script src="${catframe}"></script>
        <!-- Import fontawesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <style>
        body {
            margin: 0;
        }
        .container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            height: 100%;
            width: 100%;
            background-image: url(${image});
            background-size: cover;
            background-repeat: no-repeat;
            
        }
        .container-general {
            height: 100%;
            width: 100%;
            background-color: rgb(0 0 0 / 31%);
        }
        .container-player {
            width: 100%;
            height: 95vh;
            background-size: cover;
        }
        .player-button {
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }
        .player-button:hover {
            filter: opacity(.80);
         }
    </style>
        <div class="container">
            <div class="container-general">
                <div class="container-player">
                    <a id="player" class="player-button" href="${conmutatedValue}&image=${image}"><i class="player-icon fa fa-play" style="font-size:100px;color:#ffff"></i></a>
                </div>
            </div>
        </div>
        `;
}
exports.basePlayerPage = basePlayerPage;
