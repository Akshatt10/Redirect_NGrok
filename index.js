import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3000;
<<<<<<< HEAD
const NGROK_API_URL = 'https://d645-14-96-97-75.ngrok-free.app/api';
=======
const NGROK_API_URL = 'https://76db-14-96-97-75.ngrok-free.app/api';
>>>>>>> fa20bb67171b581336482f0ecdc7a8fb22dedf3d

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(
    '/api',
    createProxyMiddleware({
        target: NGROK_API_URL,
        changeOrigin: true,
        logLevel: 'debug',
        secure: false,
        pathRewrite: { '^/api': '' },
        headers: {
            'Connection': 'keep-alive'  
        },
        onProxyReq: (proxyReq, req) => {
            console.log(`Proxying request to: ${NGROK_API_URL}${req.originalUrl}`);
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).json({ error: 'Proxy failed' });
        }
    })
);

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});
