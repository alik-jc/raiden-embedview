import dotenv from 'dotenv';

dotenv.config();

export const errorWebsite = (uriParameter: string) => {

    const error = uriParameter;
    //search and extract domain name from url
    const domainName = error.split("/")[2];


    const catframe = process.env.CAT_FRAME || '';
    return `
    <script src="${catframe}"></script>
    <!-- Favicon -->
    <link rel="shortcut icon" href="https://dev.aniyae.net/img/favicon-gris.png" type="image/x-icon">
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
body {
    font-family: 'Roboto', sans-serif;
    background-color: #3701c0;
}
.error-msg{
    font-size: 1.5rem;
    font-weight: 300;
    color: #ffffff;
    text-align: center;
}
.error-text{
    font-size: 1.5rem;
    font-weight: 300;
    color: #ffffff;
    text-align: center;
}
.strong-text{
    font-weight: 700;
}

/* Center container */
.center-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Responsive */
@media screen and (max-width: 768px) {
    .error-msg{
        font-size: 1rem;    
    }
    .error-text{
        font-size: 1rem;
    }
    .strong-text{
        font-weight: 700;
    }
    .center-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
}
    </style>
    
    <div class="center-container">
        <h1 class="error-msg strong-text">Proveedor ya no disponible</h1>
        <p class="error-text">Parece que <span class="strong-text">${domainName}</span>, ya no esta disponible. <br> Si es el unico proveedor de video, carga la seccion de comentarios y
            solicita que se añadan otros servidores</p>
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
    @media screen and (min-width: 430px) and (min-height: 200px) {
        .error-msg {
            font-size: 2rem;
        }
        .error-text {
            font-size: 1.75rem;
        }
    }
    </style>
    <div class="container-fluid" style="background-color: #000000;">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6 col-sm-12 text-center">
                <h1 style="font-size: 2rem; font-weight: 700; color: #ffffff;">Estamos al tanto de que ${animeTitle}, no se encuentra disponible.</h1>
                <p style="font-size: 1.5rem; font-weight: 300; color: #ffffff;">El proveedor <span style="font-weight: 700;">${domainName}</span>, ya no almacena este EP, estoy trabajando para reemplazarlo lo mas pronto posible. ~ Yae</p>
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
