"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTICE_STYLES = exports.NOTICE_MESSAGES = void 0;
exports.getNoticeMessage = getNoticeMessage;
exports.renderNoticeBanner = renderNoticeBanner;
exports.NOTICE_MESSAGES = {
    'default': 'Este video contiene ads auto ocultables y ads PoPs por parte del servidor de video',
    'snbox': 'Este video contiene ads auto ocultables y protección anti PoPs',
};
function getNoticeMessage(version) {
    if (!version)
        return null;
    const key = version.trim().toLowerCase();
    return exports.NOTICE_MESSAGES[key] || null;
}
exports.NOTICE_STYLES = `
        /* Contenedor flotante */
        .logo-float {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 100;
            pointer-events: none;
            max-width: calc(100vw - 20px);
        }

        .logo-float-container {
            position: relative;
            display: inline-flex;
            align-items: center;
        }

        /* --- LOGO CON ENTRADA DE CORTINAS --- */
        .logo-curtain-wrapper {
            position: relative;
            display: inline-flex;
            align-items: center;
            overflow: hidden;
            clip-path: inset(0 100% 0 0);
            animation: logoRevealClip 0.8s cubic-bezier(0.77, 0, 0.175, 1) 16.0s forwards;
        }

        .logo-float-img {
            max-width: 80px;
            display: block;
            opacity: 0;
            animation: logoImgReveal 0.3s cubic-bezier(0.25, 1, 0.5, 1) 16.4s forwards;
        }

        .logo-curtain {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            pointer-events: none;
            transform: translateX(-101%);
        }

        .logo-curtain-1 {
            background-color: #4b00ff;
            z-index: 4;
            animation: logoCurtainIn 0.8s cubic-bezier(0.77, 0, 0.175, 1) 16.0s forwards;
        }

        .logo-curtain-2 {
            background-color: #ffffff;
            z-index: 3;
            animation: logoCurtainIn 0.8s cubic-bezier(0.77, 0, 0.175, 1) 16.12s forwards;
        }

        .logo-curtain-3 {
            background-color: #8b5cf6;
            z-index: 2;
            animation: logoCurtainIn 0.8s cubic-bezier(0.77, 0, 0.175, 1) 16.24s forwards;
        }

        /* --- AVISO / MENSAJE --- */
        .notice-curtain-wrapper {
            position: relative;
            display: inline-flex;
            align-items: center;
            overflow: hidden;
            background-color: transparent;
            padding: 7px 16px;
            pointer-events: none;
            user-select: none;
            max-width: calc(100vw - 20px);
            box-sizing: border-box;
            clip-path: inset(0 100% 0 0);
            animation: noticeWrapperClip 6.0s cubic-bezier(0.77, 0, 0.175, 1) 10.0s forwards;
        }

        .notice-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #000000;
            z-index: 1;
        }

        .notice-text {
            position: relative;
            z-index: 2;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 13px;
            font-weight: 700;
            line-height: 1.35;
            letter-spacing: 0.3px;
            white-space: nowrap;
            opacity: 0;
            animation: textReveal 0.3s cubic-bezier(0.25, 1, 0.5, 1) 10.55s forwards;
        }

        .curtain-layer {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            pointer-events: none;
            transform: translateX(-101%);
        }

        /* 4 Cortinas de ENTRADA del Aviso */
        .curtain-in-1 {
            background-color: #4b00ff;
            z-index: 6;
            animation: curtainIn 1.1s cubic-bezier(0.77, 0, 0.175, 1) 10.0s forwards;
        }

        .curtain-in-2 {
            background-color: #ffffff;
            z-index: 5;
            animation: curtainIn 1.1s cubic-bezier(0.77, 0, 0.175, 1) 10.12s forwards;
        }

        .curtain-in-3 {
            background-color: #8b5cf6;
            z-index: 4;
            animation: curtainIn 1.1s cubic-bezier(0.77, 0, 0.175, 1) 10.24s forwards;
        }

        .curtain-in-4 {
            background-color: #f3f0ff;
            z-index: 3;
            animation: curtainIn 1.1s cubic-bezier(0.77, 0, 0.175, 1) 10.36s forwards;
        }

        /* 2 Cortinas de SALIDA del Aviso */
        .curtain-out-1 {
            background-color: #ffffff;
            z-index: 8;
            animation: curtainOut 0.9s cubic-bezier(0.77, 0, 0.175, 1) 15.0s forwards;
        }

        .curtain-out-2 {
            background-color: #4b00ff;
            z-index: 9;
            animation: curtainOut 0.9s cubic-bezier(0.77, 0, 0.175, 1) 15.15s forwards;
        }

        /* Keyframes Aviso */
        @keyframes noticeWrapperClip {
            0% {
                clip-path: inset(0 100% 0 0);
            }
            15% {
                clip-path: inset(0 0% 0 0);
            }
            95% {
                clip-path: inset(0 0% 0 0);
            }
            100% {
                clip-path: inset(0 0 0 100%);
                display: none;
                visibility: hidden;
            }
        }

        @keyframes textReveal {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }

        @keyframes curtainIn {
            0% {
                transform: translateX(-101%);
            }
            50% {
                transform: translateX(0%);
            }
            100% {
                transform: translateX(101%);
            }
        }

        @keyframes curtainOut {
            0% {
                transform: translateX(-101%);
            }
            100% {
                transform: translateX(0%);
            }
        }

        /* Keyframes Logo */
        @keyframes logoRevealClip {
            0% {
                clip-path: inset(0 100% 0 0);
            }
            100% {
                clip-path: inset(0 0% 0 0);
            }
        }

        @keyframes logoImgReveal {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }

        @keyframes logoCurtainIn {
            0% {
                transform: translateX(-101%);
            }
            50% {
                transform: translateX(0%);
            }
            100% {
                transform: translateX(101%);
            }
        }

        /* Pantallas medianas y pequeñas */
        @media (max-width: 768px) {
            .notice-curtain-wrapper {
                padding: 6px 12px;
            }
            .notice-text {
                font-size: 11px;
                white-space: normal;
                line-height: 1.25;
            }
            .logo-float-img {
                max-width: 65px;
            }
        }

        @media (max-width: 540px) {
            .logo-float {
                top: 6px;
                left: 6px;
                max-width: calc(100vw - 12px);
            }
            .notice-curtain-wrapper {
                padding: 5px 10px;
            }
            .notice-text {
                font-size: 10px;
                white-space: normal;
                line-height: 1.2;
            }
            .logo-float-img {
                max-width: 50px;
            }
        }
`;
function renderNoticeBanner(version) {
    const message = getNoticeMessage(version);
    const logoHtml = `
        <div class="logo-curtain-wrapper">
            <img class="logo-float-img" src="//i0.aniyae.net/aniyae.net/wp-content/uploads/2022/04/AYLogoV4.png?fit=230%2C2047&ssl=1" alt="Aniyae Logo">
            <div class="logo-curtain logo-curtain-1"></div>
            <div class="logo-curtain logo-curtain-2"></div>
            <div class="logo-curtain logo-curtain-3"></div>
        </div>`;
    if (!message) {
        return logoHtml;
    }
    return `
        <div class="notice-curtain-wrapper">
            <div class="notice-bg"></div>
            <span class="notice-text">${message}</span>
            <!-- 4 cortinas de entrada del mensaje -->
            <div class="curtain-layer curtain-in-1"></div>
            <div class="curtain-layer curtain-in-2"></div>
            <div class="curtain-layer curtain-in-3"></div>
            <div class="curtain-layer curtain-in-4"></div>
            <!-- 2 cortinas de salida del mensaje -->
            <div class="curtain-layer curtain-out-1"></div>
            <div class="curtain-layer curtain-out-2"></div>
        </div>
        ${logoHtml}`;
}
