import { CAT_FRAME } from "../index";

export const errorWebsite = (uriParameter: string) => {

    const error = uriParameter;
    //search and extract domain name from url
    const domainName = error.split("/")[2];


    return `
    <script>${CAT_FRAME}</script>
    <!-- Favicon -->
    <link rel="shortcut icon" href="https://dev.aniyae.net/img/favicon-gris.png" type="image/x-icon">
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
    body {
        font-family: 'Roboto', sans-serif;
        background: linear-gradient(135deg, #3701c0 0%, #210075 50%, #0000 100%);
        margin: 0;
        padding: 0;
        overflow: hidden;
        position: relative;
    }

    body::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
        pointer-events: none;
        animation: wave 8s ease-in-out infinite;
    }

    .center-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: relative;
        z-index: 1;
        animation: fadeInUp 1s ease-out;
    }

    .error-icon {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
        animation: pulse 2s infinite;
    }

    .error-msg {
        font-size: 2.5rem;
        font-weight: 700;
        color: #ffffff;
        text-align: center;
        margin-bottom: 20px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        animation: fadeIn 1.5s ease-out 0.5s both;
    }

    .error-text {
        font-size: 1.2rem;
        font-weight: 400;
        color: #f8f9fa;
        text-align: center;
        max-width: 600px;
        line-height: 1.6;
        animation: fadeIn 1.5s ease-out 1s both;
    }

    .strong-text {
        font-weight: 700;
        color: #ffd700;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    @keyframes wave {
        0% {
            background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
        }
        25% {
            background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%);
        }
        50% {
            background: radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 60% 40%, rgba(255,255,255,0.1) 0%, transparent 50%);
        }
        75% {
            background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%);
        }
        100% {
            background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
        }
    }

    /* Responsive */
    @media screen and (max-width: 768px) {
        .error-msg {
            font-size: 2rem;
        }
        .error-text {
            font-size: 1rem;
            padding: 0 20px;
        }
        .error-icon {
            width: 60px;
            height: 60px;
        }
    }
    </style>

    <div class="center-container">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#ffd700"/>
        </svg>
        <h1 class="error-msg">Proveedor ya no disponible</h1>
        <p class="error-text">Parece que <span class="strong-text">${domainName}</span> ya no está disponible. <br> Si es el único proveedor de video, carga la sección de comentarios y solicita que se añadan otros servidores.</p>
    </div>
    `;
};

export const pilarDown = (uriParameter: string, animeTitle: string) => {
    const error = uriParameter;
    //search and extract domain name from url
    const domainName = error.split("/")[2];

    return `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
    body {
        font-family: 'Open Sans', sans-serif;
        background: linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%);
        margin: 0;
        padding: 0;
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
    }

    body::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 70%, rgba(138,43,226,0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 30%, rgba(255,215,0,0.05) 0%, transparent 50%);
        pointer-events: none;
        animation: waveDark 10s ease-in-out infinite;
    }

    .hero-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        position: relative;
        z-index: 1;
        padding: 20px;
    }

    .text-section {
        text-align: center;
        margin-bottom: 40px;
        animation: slideInFromTop 1s ease-out;
    }

    .h1-error {
        font-size: 2.2rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 20px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        background: linear-gradient(45deg, #ffffff, #ffd700);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .p-error {
        font-size: 1.1rem;
        font-weight: 400;
        color: #e0e0e0;
        max-width: 600px;
        line-height: 1.6;
        margin: 0 auto;
        animation: fadeIn 1.5s ease-out 0.5s both;
    }

    .highlight {
        font-weight: 700;
        color: #ffd700;
        text-shadow: 0 0 10px rgba(255,215,0,0.5);
    }

    .image-section {
        text-align: center;
        animation: slideInFromBottom 1s ease-out 0.8s both;
    }

    .yae-image {
        max-width: 300px;
        width: 100%;
        height: auto;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(138,43,226,0.3);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        animation: float 3s ease-in-out infinite;
    }

    .yae-image:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 40px rgba(0,0,0,0.7), 0 0 30px rgba(138,43,226,0.5);
    }

    @keyframes slideInFromTop {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    @keyframes waveDark {
        0% {
            background: radial-gradient(circle at 30% 70%, rgba(138,43,226,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(255,215,0,0.05) 0%, transparent 50%);
        }
        25% {
            background: radial-gradient(circle at 40% 60%, rgba(138,43,226,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 60% 40%, rgba(255,215,0,0.05) 0%, transparent 50%);
        }
        50% {
            background: radial-gradient(circle at 50% 50%, rgba(138,43,226,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(255,215,0,0.05) 0%, transparent 50%);
        }
        75% {
            background: radial-gradient(circle at 40% 60%, rgba(138,43,226,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 60% 40%, rgba(255,215,0,0.05) 0%, transparent 50%);
        }
        100% {
            background: radial-gradient(circle at 30% 70%, rgba(138,43,226,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(255,215,0,0.05) 0%, transparent 50%);
        }
    }

    /* Responsive */
    @media screen and (max-width: 768px) {
        .h1-error {
            font-size: 1.8rem;
        }
        .p-error {
            font-size: 1rem;
            padding: 0 20px;
        }
        .yae-image {
            max-width: 250px;
        }
        .hero-container {
            padding: 10px;
        }
    }
    </style>

    <div class="hero-container">
        <div class="text-section">
            <h1 class="h1-error">Estamos al tanto de que ${animeTitle} no se encuentra disponible.</h1>
            <p class="p-error">El proveedor <span class="highlight">${domainName}</span> ya no almacena este EP, estoy trabajando para reemplazarlo lo más pronto posible. ~ Yae</p>
        </div>
        <div class="image-section">
            <img src="https://i0.wp.com/i.postimg.cc/W4r1qW3H/yae-vector.png?fit=225%2C600&ssl=1" alt="${animeTitle}" class="yae-image">
        </div>
    </div>
    `;
};
