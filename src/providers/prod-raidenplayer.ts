export const raidenPlayer = (analizerLbryContent: string, image: string ): string => {
    const catframe = 'https://aria.js.cdn.aniyae.net/js/catFrame.js';
    const domainArray: string[] = ["tripphloems.com", "shoeingneurone.com", "havocsbilaan.com", "reivereme.com", "canzonicassons.com", "solemncringle.com", "karpasbeamer.com", "godwitescrol.com", "binoticprotea.com", "showkhussak.com", "astrandconifer.com", "bhalukecky.com", "plexureturp.com"];
    const adsDisplay: string = `/fvFTyqTpCC2mS/59725`;
    const randomDomain: string = domainArray[Math.floor(Math.random() * domainArray.length)];
    const galaxion = '//' + randomDomain + adsDisplay;
    const jwPlayer = "https://dev.aniyae.net/js/raiden_core.js?=v1.4";
    const raidenPlayerContent = `
    <script src="${catframe}"></script>
    <script src="${galaxion}"></script>
    <style>
    body{
        font-family: Arial,Helvetica,sans-serif;
        width:100%;
        height:100%;
        background-color:#000;
        overflow:hidden;
        position:fixed;
        border:0;
        margin:0;
        padding:0;
        }
        #vstr {
        position:absolute;
        min-width:100%;
        min-height:100%;
        z-index: 10;
        }
        #loading, #resume {
        width: 100%;
        height: 100%;
        position: absolute;
        }
        #loading {
        z-index: 11;
        }
        #resume {
        z-index: 12;
        }
        .pop-wrap {
        display: table;
        position: absolute;
        height: 100%;
        width: 100%;
        }
        .pop-main {
        display: table-cell;
        vertical-align: middle;
        }
        .pop-html {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        }
        .pop-block {
        display: inline-block;
        position: relative;
        }
        .myConfirm {
        max-width: 260px;
        max-height: 160px;
        padding: 3px;
        padding-bottom: 0px;
        border-radius: 3px;
        font-size: 14px;
        line-height: 1.3em;
        background-color: #333333;
        color: #f2f2f2;
        }
        .button {
        border-width: 0;
        padding: 5px 15px;
        line-height: 1.5;
        border-radius: 20px;
        text-transform: uppercase;
        font-size: 80%;
        font-weight: 700;
        margin: 5px 5px 5px 0;
        cursor: pointer;
        outline: none;
        background-color: #565656;
        color: #ffffff;
        }
        @-moz-keyframes rotate-loading {
        0% {
            transform: rotate(0);
            -ms-transform: rotate(0);
            -webkit-transform: rotate(0);
            -o-transform: rotate(0);
            -moz-transform: rotate(0)
        }
        100% {
            transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -moz-transform: rotate(360deg)
        }
        }
        @-o-keyframes rotate-loading {
        0% {
            transform: rotate(0);
            -ms-transform: rotate(0);
            -webkit-transform: rotate(0);
            -o-transform: rotate(0);
            -moz-transform: rotate(0)
        }
        100% {
            transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -moz-transform: rotate(360deg)
        }
        }
        @-webkit-keyframes rotate-loading {
        0% {
            transform: rotate(0);
            -ms-transform: rotate(0);
            -webkit-transform: rotate(0);
            -o-transform: rotate(0);
            -moz-transform: rotate(0)
        }
        100% {
            transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -moz-transform: rotate(360deg)
        }
        }
        @keyframes rotate-loading {
        0% {
            transform: rotate(0);
            -ms-transform: rotate(0);
            -webkit-transform: rotate(0);
            -o-transform: rotate(0);
            -moz-transform: rotate(0)
        }
        100% {
            transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -moz-transform: rotate(360deg)
        }
        }
        @-moz-keyframes loading-text-opacity {
        0%, 100%, 20% {
            opacity: 0
        }
        50% {
            opacity: 1
        }
        }
        @-o-keyframes loading-text-opacity {
        0%, 100%, 20% {
            opacity: 0
        }
        50% {
            opacity: 1
        }
        }
        @-webkit-keyframes loading-text-opacity {
        0%, 100%, 20% {
            opacity: 0
        }
        50% {
            opacity: 1
        }
        }
        @keyframes loading-text-opacity {
        0%, 100%, 20% {
            opacity: 0
        }
        50% {
            opacity: 1
        }
        }
        .loading-ani,
        .loading-container {
        height: 100px;
        position: relative;
        width: 100px;
        border-radius: 100%
        }
        .loading-container {
        margin: 40vh auto
        }
        .loading-ani {
        border: 2px solid transparent;
        border-color: transparent #fff transparent #FFF;
        -moz-animation: rotate-loading 1.5s linear 0s infinite normal;
        -moz-transform-origin: 50% 50%;
        -o-animation: rotate-loading 1.5s linear 0s infinite normal;
        -o-transform-origin: 50% 50%;
        -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;
        -webkit-transform-origin: 50% 50%;
        animation: rotate-loading 1.5s linear 0s infinite normal;
        transform-origin: 50% 50%
        }
        .loading-container:hover .loading-ani {
        border-color: transparent #E45635
        }
        .loading-container .loading-ani,
        .loading-container:hover .loading-ani {
        -webkit-transition: all .5s ease-in-out;
        -moz-transition: all .5s ease-in-out;
        -ms-transition: all .5s ease-in-out;
        -o-transition: all .5s ease-in-out;
        transition: all .5s ease-in-out
        }
        .loading-container .loading-text {
        -moz-animation: loading-text-opacity 2s linear 0s infinite normal;
        -o-animation: loading-text-opacity 2s linear 0s infinite normal;
        -webkit-animation: loading-text-opacity 2s linear 0s infinite normal;
        animation: loading-text-opacity 2s linear 0s infinite normal;
        color: #fff;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 10px;
        font-weight: 700;
        margin-top: 45px;
        opacity: 0;
        position: absolute;
        text-align: center;
        text-transform: uppercase;
        top: 0;
        width: 100px
        }
        .jw-rightclick-link.jw-info-overlay-item, .jw-rightclick-item.jw-featured {
        display: none !important;
        }
        .jwplayer .jw-rightclick .jw-rightclick-list .jw-rightclick-item .jw-rightclick-link {
        display: none !important;
        }
        .jw-button-container .jw-settings-sharing, .jw-button-container .jw-icon-cc {
        display: none !important;
        }
        .jw-rightclick-link {
        color: #d2d2d2 !important;
        }
        .jw-rightclick-link span {
        color: #fff !important;
        }
        .jw-svg-icon-download {
        height: 16px !important;
        width: auto !important;
        }
        .jw-svg-icon-qswitch {
        width: auto !important;
        }
        .jw-button-container .jw-logo-button {
        margin-right: 10px;
        }
    </style>
    <script src="${jwPlayer}"></script>
    <div id="vstr"></div>
    <script>
    jwplayer("vstr").setup({
        mute: false,
        width: "100%",
        height: "100%",
        aspectratio: "16:9",
        image: "${image}",
        file: "${analizerLbryContent}",
                type: "video/mp4",
        skin: {
            name: "RPlay",
            active: "#4b00ff",
            inactive: "#FFFFFF",
        },
        abouttext: "Raiden Player vSET.3",
        aboutlink: "https://aniyae.net",
    });
    </script>
    `;
    return raidenPlayerContent;};

