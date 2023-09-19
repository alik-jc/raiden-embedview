# ✓ Set conmuter
> This is a simple conmuter used to manage the player options in aniyae.net

### ✅ Set Alpha version 0.0.2 (2021-09-01)

### **:rocket: Usage**

### **:wrench: Clone the repo**
```git clone https://github.com/alik-jc/radien-embedview.git``` and 
```cd radien-embedview```
### **:wrench: Install dependencies**
```npm install```
### **:wrench: Development**
```npm run dev```
### **:wrench: Get Production Build**
```npm run build```

### **:wrench: Project Structure**
- **src** - Contains all the source code of the project
- **src/providers** - Contains all embed and logic providers for the project
- **src/set.ts** - Contains the main logic for generate link proxy and embed withouth popup's
- **src/app.ts** - Contains the main routes for the project
- **src/conmuter.ts** - Contains the main entry point for the project
- **src/index.html** - Exports all modules in providers folder

### **:wrench: Providers**
- **src/providers/prod-analizer-ok.ts** - Contains the logic for analize and restrucure url for ok.ru
- **src/providers/prod-analizer-lbry.ts** - Contains the logic for analize and restrucure url for lbry.tv
- **src/providers/prod-base.ts** - Contains the logic for genereate base url for embed
- **src/providers/prod-raidenplayer.ts** - Contains the logic for genereate raidenplayer native player
- **src/providers/prod-snbox.ts** - Contains the logic for genereate sanboxed embed
- **src/providers/prod-general.ts** - Contains the logic for genereate general porpuse embed
- **src/providers/prod-down.ts** - Contains the logic for genereate error message in case of error in provider source

### **:wrench: Environment Variables**
- **SRV_URI** - Port for the server
- **SET_CORE_URI** - Core url for set proxy provider
- **PROVIDERS_URI** - Get providers url list for the dev.aniyae
- **HASH** - Contains the hash used in the url, example
    ```localhost:3000/?yourhash=yourb64encriptedurl```
- **USER_AGENT** - Contains the user agent used in the request to the provider
- **SENTRY_DSN** - Contains the sentry dsn for catch errors in the client side
- **CAT_FRAME** - Contains the cat frame security policy for the client side, example
    ```https://aria.js.cdn.aniyae.net/js/catFrame.js```

### **:wrench: Contributing**
- Fork it [Here](https://github.com/alik-jc/radien-embedview/fork)
- Create your feature branch (git checkout -b my-new-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push origin my-new-feature)
- Create a new Pull Request

### **:wrench: Recomended Deploy**
Optimized for [Vercel](https://vercel.com/) deploy


### **Repo Autor**

_*alik.io*_

> You can follow me on
> [github](https://github.com/alik-jc)&nbsp;&middot;&nbsp;[twitter](https://twitter.com/aliforus)

### **:memo: License**

[PRIVATE](LICENSE) &copy; [alik](https://jc.qsag.cloud)

Copyright ©2023 [Raiden Project](https://qsag.cloud)
