const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const sql = require('./mysqlConnect');
const locationServices = require('./services/route_services');
const authServices = require('./services/auth_services');
const app = new Koa();
const router = new Router();
app.use(cors({
    origin: '*',
}));
router.post('/signup', async (ctx) => {
    return authServices.insertSignupDetails(ctx);
})
router.post('/login', async (ctx) => {
    return authServices.authenticateUser(ctx);
});
router.get('/startRide', async (ctx) => {
    return authServices.startRide(ctx);
});
router.get('/endRide', async (ctx) => {
    return authServices.endRide(ctx);
});
 router.post('/requestRide', async (ctx) => {
    return authServices.requestRide(ctx);
});
router.get('/acceptRide', async (ctx) => {
    return authServices.acceptRide(ctx);
});
router.get('/queryRideRequests', async (ctx) => {
    return authServices.queryRideRequests(ctx);
});

router.get('/getAvailableRides', async (ctx) => {
    return authServices.getAvailableRides(ctx);
});


app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});