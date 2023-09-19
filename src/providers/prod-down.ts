import dotenv from 'dotenv';

dotenv.config();

export const errorWebsite = (uriParameter: string) => {
    const catframe = process.env.CAT_FRAME || '';
    return `
    <script src="${catframe}"></script>
    <!-- Favicon -->
    <link rel="shortcut icon" href="https://dev.aniyae.net/img/favicon-gris.png" type="image/x-icon">
    <!-- Import jquery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
        <p class="error-text">Parece que <span class="strong-text" id="domainName"></span>, ya no esta disponible. <br> Si es el unico proveedor de video, carga la seccion de comentarios y
            solicita que se añadan otros servidores</p>
    </div>
    <!-- Create a script to show error with the link string-->
    <script>
        const urlError = new URL(document.location).searchParams.get("RXJlcyB1biBoaWpvIGRlIHB1dGEgcG9yIGludGVudGFyIHJvYmFyIGVsIGxpbmssIHBlcm8gZXJlcyBsbyBzdWZpY2llbnRlbWVudGUgaW50ZWxpZ2VudGUgY29tbyBwYXJhIHZlciBlc3RlIG1lbnNhamUuIE1hbiBkYW1lIHVuIHR3aXQgQGFuaXlhZV9jb20gc2kgbG8gbG9ncmFzIGVuY29udHJhcg");
        const urlErrorDecode = atob(urlError);
        //search and extract domain name from url
        const domainName = urlErrorDecode.split("/")[2];
        //show domain name in h2
        document.getElementById("domainName").innerHTML = domainName;
    </script>
    `;
};