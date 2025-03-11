import dotenv from 'dotenv';

dotenv.config();

export function raidenGeneral(uriParameter: string): string {
    const catframe = process.env.CAT_FRAME || '';
    const content = `
    <script src="${catframe}"></script>
    <style>
    body {
        margin: 0;
    }
    iframe {
        height:calc(100vh - 4px);
        width:calc(100vw - 4px);
        border:0;
        box-sizing: border-box;
    }
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background-color: rgb(0,0,0,0);
        
    }
    .logo-float {
        position: absolute;
        top: 10px;
        left: 10px;
    }
    
    .logo-float-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
    
    .logo-float-img {
        max-width: 80px;
    }
</style>
<div class="container">
    <div class="logo-float">
        <div class="logo-float-container">
            <img class="logo-float-img" src="//i0.wp.com/aniyae.net/wp-content/uploads/2022/04/AYLogoV4.png?fit=230%2C2047&ssl=1" alt="Aniyae Logo">
        </div>
    </div>
        <iframe src="${uriParameter}" allowfullscreen="yes" scrolling="no"></iframe>
    </div>`;
    return content;
}
