import { CAT_FRAME } from "../index";

export const errorWebsite = (uriParameter: string) => {

    const error = uriParameter;
    //search and extract domain name from url
    const domainName = error.split("/")[2];


    return `
    <script>${CAT_FRAME}</script>
    <!-- Favicon -->
    <link rel="shortcut icon" href="https://dev.aniyae.net/img/favicon-gris.png" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;400&family=Fira+Mono&display=swap');
    body {
        font-family: 'Montserrat', 'Fira Mono', monospace, sans-serif;
        background: linear-gradient(135deg, #3701c0 0%, #6d28d9 100%);
        min-height: 100vh;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .error-card {
        background: rgba(255,255,255,0.10);
        border-radius: 24px;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.18);
        padding: 2.5rem 2rem 2rem 2rem;
        max-width: 400px;
        width: 90vw;
        text-align: center;
        animation: pop-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
    }
    @keyframes pop-in {
        0% { transform: scale(0.8) rotate(-5deg); opacity: 0; }
        80% { transform: scale(1.05) rotate(2deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); }
    }
    .error-icon {
        font-size: 3.5rem;
        color: #fff;
        margin-bottom: 0.5rem;
        filter: drop-shadow(0 0 8px #fff8);
        animation: shake 1.2s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
        10%, 90% { transform: translateX(-2px); }
        20%, 80% { transform: translateX(4px); }
        30%, 50%, 70% { transform: translateX(-8px); }
        40%, 60% { transform: translateX(8px); }
    }
    .error-title {
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
        margin-bottom: 0.5rem;
        letter-spacing: 1px;
        text-shadow: 0 2px 8px #0006;
    }
    .error-domain {
        color: #fbbf24;
        font-family: 'Fira Mono', monospace;
        font-size: 1.1rem;
        font-weight: 700;
        background: #fff2;
        border-radius: 6px;
        padding: 0.1em 0.5em;
        margin: 0 0.2em;
        box-shadow: 0 1px 4px #0002;
    }
    .error-desc {
        color: #f3f4f6;
        font-size: 1.1rem;
        margin-bottom: 1.2rem;
        line-height: 1.5;
    }
    .error-hint {
        color: #a5b4fc;
        font-size: 0.95rem;
        margin-top: 1.2rem;
        font-style: italic;
    }
    @media (max-width: 600px) {
        .error-card {
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
            max-width: 98vw;
        }
        .error-title { font-size: 1.2rem; }
        .error-desc { font-size: 0.95rem; }
    }
    </style>
    <div class="error-card">
        <div class="error-icon">🚫</div>
        <div class="error-title">Proveedor no disponible</div>
        <div class="error-desc">
            El dominio <span class="error-domain">${domainName}</span> ya no está accesible.<br>
            Si era el único proveedor de video, revisa la sección de comentarios y solicita que se añadan otros servidores.
        </div>
        <div class="error-hint">Intenta recargar la página o vuelve más tarde.</div>
    </div>
    `;
};

export const pilarDown = (uriParameter: string, animeTitle: string) => {
    const error = uriParameter;
    //search and extract domain name from url
    const domainName = error.split("/")[2];

    return `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    body {
        font-family: 'Open Sans', sans-serif;
        background-color: #000000;
    }
    .h1-error {
        font-size: 1.5rem; font-weight: 700; color: #ffffff;
    } @media screen and (max-width: 768px) {
        .h1-error {
            font-size: 18px;
        }
    }
    .p-error {
        font-size: 1.0rem; font-weight: 300; color: #ffffff;
    } @media screen and (max-width: 768px) {
        .p-error {
            font-size: 13px;
        }
    }
    </style>
    <div class="container-fluid" style="background-color: #000000;">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6 col-sm-12 text-center">
                <h1 class="h1-error">Estamos al tanto de que ${animeTitle}, no se encuentra disponible.</h1>
                <p class="p-error">El proveedor <span style="font-weight: 700;">${domainName}</span>, ya no almacena este EP, estoy trabajando para reemplazarlo lo mas pronto posible. ~ Yae</p>
            </div>
        </div>
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6 col-sm-12 text-center">
                <img src="https://i0.wp.com/i.postimg.cc/W4r1qW3H/yae-vector.png?fit=225%2C600&ssl=1" alt="${animeTitle}" style="max-width: 100%;">
            </div>
        </div>
    </div>
    `;
};
