import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

import { raidenGeneral, basePlayerPage, raidenSanbox, performLbryAnalyzer, raidenPlayer, setProvider, errorWebsite, performOkruAnalyzer } from './index';
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

        const uriParameter = req.query[aniyaeHash] as string;
        const base = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const conmutatedValue = performConmutation(base, findArray);
        if (conmutatedValue) {
            const response = '/' + conmutatedValue + '/?' + aniyaeHash + '=' + uriParameter;
            const playerPage = basePlayerPage(response, image);
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
        Sentry.captureException('Error the uri not found ' + error);
        const response = {
            error: 'Error the uri not found ' + error
        };
        res.status(404).json(response);
    }
});

app.get('/prod-snbox', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const iframeContent = raidenSanbox(decodedUri);

        res.send(iframeContent);
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

        const iframeContent = raidenGeneral(decodedUri);

        res.send(iframeContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-general content ' + error);
        console.error('Error generating prod-snbox content :', error);
        const response = {
            error: 'Error generating prod-snbox content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-analizer-lbry', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const image = req.query.image as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const analizerLbryContent = performLbryAnalyzer(decodedUri);
        const iframeContent = raidenPlayer(analizerLbryContent, image);

        res.send(iframeContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-analizer-lbry content ' + error);
        console.error('Error generating prod-analizer-lbry content :', error);
        const response = {
            error: 'Error generating prod-analizer-lbry content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-analizer-ok', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter || '', 'base64').toString('utf-8');

        const analizerOkContent = performOkruAnalyzer(decodedUri);
        const iframeContent = raidenSanbox(analizerOkContent || '');

        res.send(iframeContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-analizer-ok content ' + error);
        console.error('Error generating prod-analizer-ok content :', error);
        const response = {
            error: 'Error generating prod-analizer-ok content '
        };
        res.status(500).json(response);
    }
});


app.get('/prod-raidenplayer', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const image = req.query.image as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const iframeContent = raidenPlayer(decodedUri, image);
        res.send(iframeContent);

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
        const iframeContent = raidenGeneral(setAnalyzer);

        res.send(iframeContent);
    } catch (error) {
        Sentry.captureException('Error generating prod-set content ' + error);
        console.error('Error generating prod-set content :', error);
        const response = {
            error: 'Error generating prod-set content '
        };
        res.status(500).json(response);
    }
});

app.get('/prod-down', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const iframeContent = errorWebsite(decodedUri);

        res.send(iframeContent);
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