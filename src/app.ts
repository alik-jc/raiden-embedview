import express, { Request, Response } from 'express';
import axios from 'axios';
import { raidenGeneral, basePlayerPage, raidenSanbox, performLbryAnalyzer, raidenPlayer, setProvider, errorWebsite, performOkruAnalyzer } from './index';
import { performConmutation } from './conmuter';

const app = express();
const PORT = 3000;
const aniyaeHash = 'RXJlcyB1biBoaWpvIGRlIHB1dGEgcG9yIGludGVudGFyIHJvYmFyIGVsIGxpbmssIHBlcm8gZXJlcyBsbyBzdWZpY2llbnRlbWVudGUgaW50ZWxpZ2VudGUgY29tbyBwYXJhIHZlciBlc3RlIG1lbnNhamUuIE1hbiBkYW1lIHVuIHR3aXQgQGFuaXlhZV9jb20gc2kgbG8gbG9ncmFzIGVuY29udHJhcg';
const PROVIDERS_JSON_URL = 'https://dev.aniyae.net/set-json/providers.json';
export const userAgent = 'Aniyae-Player';

app.get('/', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(PROVIDERS_JSON_URL, { headers: { 'User-Agent': userAgent } });
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
        res.redirect('//aniyae.net');
    }
});

app.get('/prod-snbox', async (req: Request, res: Response) => {
    try {
        const uriParameter = req.query[aniyaeHash] as string;
        const decodedUri = Buffer.from(uriParameter, 'base64').toString('utf-8');

        const iframeContent = raidenSanbox(decodedUri);

        res.send(iframeContent);
    } catch (error) {
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
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
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
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
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
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
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
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
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
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
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
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
        console.error('Error generating prod-snbox content:', error);
        const response = {
            error: 'Error generating prod-snbox content'
        };
        res.status(500).json(response);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});