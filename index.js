import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const NGROK_API_URL = 'https://0bed-116-68-245-229.ngrok-free.app/api';

// Debugging middleware
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});

// Proxy requests with /api prefix
app.use(
    '/api',
    createProxyMiddleware({
        target: NGROK_API_URL,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '' },
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
