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
        .notice-curtain-wrapper {
            position: relative;
            display: inline-flex;
            align-items: center;
            overflow: hidden;
            background-color: transparent;
            padding: 6px 14px;
            pointer-events: none;
            user-select: none;
            max-width: calc(100vw - 110px);
            box-sizing: border-box;
            clip-path: inset(0 100% 0 0);
            animation: noticeWrapperClip 6.5s cubic-bezier(0.77, 0, 0.175, 1) 0.3s forwards;
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
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: 0;
            animation: textReveal 0.3s cubic-bezier(0.25, 1, 0.5, 1) 0.85s forwards;
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

        /* 4 Cortinas de ENTRADA */
        .curtain-in-1 {
            background-color: #4b00ff;
            z-index: 6;
            animation: curtainIn 1.1s cubic-bezier(0.77, 0, 0.175, 1) 0.3s forwards;
        }

        .curtain-in-2 {
            background-color: #ffffff;
            z-index: 5;
            animation: curtainIn 1.1s cubic-bezier(0.77, 0, 0.175, 1) 0.42s forwards;
        }

        .curtain-in-3 {
            background-color: #8b5cf6;
            z-index: 4;
            animation: curtainIn 1.1s cubic-bezier(0.77, 0, 0.175, 1) 0.54s forwards;
        }

        .curtain-in-4 {
            background-color: #f3f0ff;
            z-index: 3;
            animation: curtainIn 1.1s cubic-bezier(0.77, 0, 0.175, 1) 0.66s forwards;
        }

        /* 2 Cortinas de SALIDA */
        .curtain-out-1 {
            background-color: #ffffff;
            z-index: 8;
            animation: curtainOut 1.0s cubic-bezier(0.77, 0, 0.175, 1) 5.3s forwards;
        }

        .curtain-out-2 {
            background-color: #4b00ff;
            z-index: 9;
            animation: curtainOut 1.0s cubic-bezier(0.77, 0, 0.175, 1) 5.45s forwards;
        }

        /* El contenedor completo se despliega y cierra mediante clip-path sincronizado */
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

        /* Animación de Entrada: cruza de izquierda a derecha revelando el contenido */
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

        /* Animación de Salida: barre desde la izquierda para tapar el contenido hacia la derecha */
        @keyframes curtainOut {
            0% {
                transform: translateX(-101%);
            }
            100% {
                transform: translateX(0%);
            }
        }

        /* Media Queries para pantallas móviles y tablets */
        @media (max-width: 768px) {
            .notice-curtain-wrapper {
                padding: 5px 10px;
                max-width: calc(100vw - 90px);
            }
            .notice-text {
                font-size: 11px;
                letter-spacing: 0.2px;
            }
        }

        @media (max-width: 480px) {
            .notice-curtain-wrapper {
                padding: 4px 8px;
                max-width: calc(100vw - 75px);
            }
            .notice-text {
                font-size: 10px;
                letter-spacing: 0.1px;
            }
        }
`;
function renderNoticeBanner(version) {
    const message = getNoticeMessage(version);
    if (!message)
        return '';
    return `
        <div class="notice-curtain-wrapper">
            <div class="notice-bg"></div>
            <span class="notice-text">${message}</span>
            <!-- 4 cortinas de entrada (1 sola ejecución al inicio) -->
            <div class="curtain-layer curtain-in-1"></div>
            <div class="curtain-layer curtain-in-2"></div>
            <div class="curtain-layer curtain-in-3"></div>
            <div class="curtain-layer curtain-in-4"></div>
            <!-- 2 cortinas de salida (barren para cubrir al final) -->
            <div class="curtain-layer curtain-out-1"></div>
            <div class="curtain-layer curtain-out-2"></div>
        </div>`;
}
