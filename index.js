// // //const express = require('express'); 
// // import express from 'express';

// // const app = express(); 
// // const port = process.env.PORT || 80;

// // //Defining '/' route 
// // app.get('/', function (req, res) { 
// // 	res.redirect('https://da9f-14-96-97-75.ngrok-free.app'); 
// // }); 



// // app.listen(port, function (req, res) { 
// // 	console.log(`Server is running at port ${port}`); 
// // });



// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// const app = express();
// const port = 3000;
// const NGROK_API_URL = 'https://da9f-14-96-97-75.ngrok-free.app/api'; // Remove /api

// // Debugging middleware
// app.use((req, res, next) => {
//     console.log(`Received request: ${req.method} ${req.originalUrl}`);
//     next();
// });

// // Proxy requests with /api prefix
// app.use(
//     '/api',
//     createProxyMiddleware({
//         target: NGROK_API_URL,
//         changeOrigin: true,
//         logLevel: 'debug',
//         pathRewrite: { '^/api': '' }, // Correct path rewrite
//         onProxyReq: (proxyReq, req) => {
//             console.log(`Proxying request to: ${NGROK_API_URL}${req.originalUrl}`);
//         },
//         onError: (err, req, res) => {
//             console.error('Proxy error:', err);
//             res.status(500).json({ error: 'Proxy failed' });
//         }
//     })
// );

// app.listen(port, () => {
//     console.log(`Proxy server running at http://localhost:${port}`);
// });



import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const NGROK_API_URL = 'https://2f70-116-68-245-229.ngrok-free.app/api';

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

// Export the handler for Vercel
export default app;

