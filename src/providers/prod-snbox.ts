export function raidenSanbox(uriParameter: string): string {
    const catframe = 'https://aria.js.cdn.aniyae.net/js/catFrame.js';
    const domainArray: string[] = ["tripphloems.com", "shoeingneurone.com", "havocsbilaan.com", "reivereme.com", "canzonicassons.com", "solemncringle.com", "karpasbeamer.com", "godwitescrol.com", "binoticprotea.com", "showkhussak.com", "astrandconifer.com", "bhalukecky.com", "plexureturp.com"];
    const adsDisplay: string = `/fvFTyqTpCC2mS/59725`;
    const randomDomain: string = domainArray[Math.floor(Math.random() * domainArray.length)];
    const galaxion = '//' + randomDomain + adsDisplay;
    const content = `
    <script src="${catframe}"></script>
    <script src="${galaxion}"></script>
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
                <img class="logo-float-img" src="//i0.wp.com/aniyae.net/wp-content/uploads/2022/04/AYLogoV4.png" alt="Aniyae Logo">
            </div>
        </div>
        <iframe allowfullscreen="yes" sandbox="allow-same-origin allow-scripts" scrolling="no" src="${uriParameter}" autoplay="true"></iframe>
    </div>`;
    return content;
}
