import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

import {

    raidenGeneral,
    basePlayerPage,
    raidenSanbox,
    pilarDown,
    raidenPlayer,
    setProvider,
    errorWebsite,
    performOkruAnalyzer,
    performWishAnalyzer,
    qlsProvider,
    performFilelionAnalyzer,
    performMixdropAnalyzer,
    uqlsProvider,
    wistTransform,
    performLuluAnalyzer

    } from './index';

import { performConmutation } from './conmuter';

import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

dotenv.config();

const app = express();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

const port = process.env.SRV_URI || 3000;
const aniyaeHash = process.env.HASH || '';
const providersUri = process.env.PROVIDERS_URI || '';
export const userAgent = process.env.USER_AGENT || '';

app.get('/', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(providersUri, { headers: { 'User-Agent': userAgent } });
        const findArray = response.data;
        const image = req.query.image as string;
        const animeTitle = req.query.animeTitle as string;
        const postUri = req.query.postTitle as string;

        const uriParameter = req.query[aniyaeHash] as string;
        const base = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const conmutatedValue = performConmutation(base, findArray);
        if (conmutatedValue) {
            const response = '/' + conmutatedValue + '/?' + aniyaeHash + '=' + uriParameter;
            const playerPage = basePlayerPage(response, image, animeTitle, postUri);
            res.send(playerPage);
        } else {
            const uriParser = new URL(base);
            const response = {
                error: 'Error the uri provided is not supported',
                uri: uriParser.hostname
            };
            res.status(404).json(response);
        }

    } catch (error) {
        res.status(403).redirect('https://aniyae.net');
        
    }
});

app.get('/prod-snbox', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const renderContent = raidenSanbox(decodedUri);

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-snbox content' + error);
        console.error('Error generating prod-snbox content : ', error);
        const response = {
            error: 'Error generating prod-snbox content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-general', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const renderContent = raidenGeneral(decodedUri);

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-general content ' + error);
        console.error('Error generating prod-snbox content :', error);
        const response = {
            error: 'Error generating prod-snbox content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-analizer-ok', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');

        const OkContent = performOkruAnalyzer(decodedUri);
        const renderContent = raidenSanbox(OkContent || '');

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-analizer-ok content ' + error);
        console.error('Error generating prod-analizer-ok content :', error);
        const response = {
            error: 'Error generating prod-analizer-ok content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-analizer-wish', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');

        const wishContent = performWishAnalyzer(decodedUri);
        const transformWish = wistTransform(wishContent);
        const renderContent = raidenGeneral(transformWish || '');


        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-analizer-wish content ' + error);
        console.error('Error generating prod-analizer-wish content :', error);
        const response = {
            error: 'Error generating prod-analizer-wish content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-analizer-lions', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');

        const lionsContent = performFilelionAnalyzer(decodedUri);
        const renderContent = raidenGeneral(lionsContent || '');

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-analizer-lion content ' + error);
        console.error('Error generating prod-analizer-lion content :', error);
        const response = {
            error: 'Error generating prod-analizer-wish content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-analizer-lulu', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');

        const luluContent = performLuluAnalyzer(decodedUri);
        const renderContent = raidenGeneral(luluContent || '');

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating new prod-analizer-lulu /e/ content ' + error);
        console.error('Error generating new prod-analizer-lulu /e/ content :', error);
        const response = {
            error: 'Error generating new prod-analizer-lulu /e/ content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-analizer-mixdrop', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');

        const mixdropContent = performMixdropAnalyzer(decodedUri);
        const renderContent = raidenGeneral(mixdropContent || '');

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-analizer-mixdrop content ' + error);
        console.error('Error generating prod-analizer-mixdrop content :', error);
        const response = {
            error: 'Error generating prod-analizer-mixdrop content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-raidenplayer', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const image = req.query.image as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const renderContent = raidenPlayer(decodedUri, image);
        res.send(renderContent);

    } catch (error) {
        Sentry.captureException('Error generating prod-raidenplayer content ' + error);
        console.error('Error generating prod-raidenplayer content :', error);
        const response = {
            error: 'Error generating prod-raidenplayer content '
        };
        res.status(500).json(response);
    }
});

app.get('/set', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const setAnalyzer = await setProvider(decodedUri);
        const renderContent = raidenGeneral(setAnalyzer);

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-set content ' + error);
        console.error('Error generating prod-set content :', error);
        const response = {
            error: 'Error generating prod-set content '
        };
        res.status(500).json(response);
    }
});

app.get('/qls', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const setAnalyzer = await qlsProvider(decodedUri);
        const renderContent = raidenGeneral(setAnalyzer);

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-set content ' + error);
        console.error('Error generating prod-set content :', error);
        const response = {
            error: 'Error generating prod-set content '
        };
        res.status(500).json(response);
    }
});

app.get('/uqls', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const uqlsAnalyzer = await uqlsProvider(decodedUri);
        const renderContent = raidenGeneral(uqlsAnalyzer);

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-set content ' + error);
        console.error('Error generating prod-set content :', error);
        const response = {
            error: 'Error generating prod-set content '
        };
        res.status(500).json(response);
    }
});

app.get('/ext', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const response = {
           Error: 'Esta uri ya no sera soportada en Aniyae, hemos enviado un reporte para su verificación',
           Uri : decodedUri
        };
        Sentry.captureException('Filelion.online uri encontrada, lista para clonar manualmente ' + decodedUri);
        res.send(response);
    } catch (error) {
        console.error('Error generating prod-ext content :', error);
        const response = {
            error: 'Error generating prod-ext content '
        };
        res.status(500).json(response);
    }
});

app.get('/provisional', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const animeTitle = req.query.animeTitle as string;
        const postUri = req.query.postTitle as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const renderContent = pilarDown(decodedUri, animeTitle);
        Sentry.captureException(new Error(`Se ha detectado un pilar, con el titulo ${animeTitle}:${postUri}`), { level: 'warning' });

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating pilar down page ' + error);
        const response = {
            error: 'Error generating pilar down page'
        };
        res.status(500).json(response);
    }
});

app.get('/prod-down', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const renderContent = errorWebsite(decodedUri);

        res.send(renderContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-down content ' + error);
        console.error('Error generating prod-down content :', error);
        const response = {
            error: 'Error generating prod-down content '
        };
        res.status(500).json(response);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});