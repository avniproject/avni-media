import { createProxyMiddleware } from 'http-proxy-middleware';
console.log("calling middleware code....", process.env.BACKEND_URL)
export default function(app) {
  console.log("inside the middleware code....")
  app.use(
    createProxyMiddleware({
      target: 'https://staging.avniproject.org',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '/',
      // },
    })
  );
};
