import 'module-alias/register';
import express, {
  NextFunction,
  Response as ExpressResponse,
  Request as ExpressRequest,
} from "express";
import '@controllers/Products/ProductsController'; 
import '@controllers/User/UserController'; 

import { database } from './database';
import { RegisterRoutes } from './routes';
import * as swaggerUi from 'swagger-ui-express';
import * as cryptojs from 'crypto-js';
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8081; // default port to listen

try {
	const swaggerDocument = require('../swagger.json');
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
	console.error('swagger error', error);
}

// Middleware to intercept the response body, adding to locals so we can log later.
app.use((req, res, next) => {
	const oldJson = res.json;
	res.json = (body) => {
		res.locals.body = body;
		return oldJson.call(res, body);
	};
	next();
});


// Middleware to log in console the request and body response.
app.use(function (
	req: ExpressRequest,
	res: ExpressResponse,
	next: NextFunction
) {
	if (req.url !== '/') {
		res?.on('finish', () => {
			const response = res.locals.body;
			const details = {
				method: req?.method,
				url: req?.path,
				status: res.statusCode,
				code: res.statusMessage,
				body: response || {},
			};
			console.log(details);
		});
	}
	next();
});

const secretKey = 'test'

function encrypt(str : any) {
   if (!str) return

   return cryptojs.AES.encrypt(str, secretKey).toString();
}

function decrypt(str : any) {
   if (!str) return

   return JSON.parse(cryptojs.AES.decrypt(str, secretKey).toString(cryptojs.enc.Utf8));
}

// Middleware to encrypt the responses and decrypt request
app.use(function (
	req: ExpressRequest,
	res: ExpressResponse,
	next: NextFunction
) {

	// if the request came from another service, we encrypt the data sent and decrypt the data received
	if(!req.headers.referer?.startsWith('http://localhost:8081')){

		//encrypt data sent

		const oldSend = res.send;
		res.send = function(...args){
			args[0] = encrypt(args[0])
			return oldSend.apply(res, args);
		}

		//decrypt data received

		const oldBody = req.body;
		req.body = decrypt(oldBody.decrypt);
	}
	
	next();
});

//TSOA Middleware
RegisterRoutes(app);

// Middleware to redirect empty route to Swagger.
app.use(function notFoundHandler(
	req,
	res: ExpressResponse,
	next: NextFunction
) {
	if (req.path === '/') {
		res.redirect('/docs');
	}

	next();
});

// Middleware to manage controller layer errors
app.use(function errorHandler(
  err: unknown,
  _req: ExpressRequest,
  res: ExpressResponse,
  _next: NextFunction
): ExpressResponse | void {
  if (typeof err === "string") {
    return res.status(400).json({
      message: err,
    });
  } else {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

database()
  .then(() => {
    console.log("connected to database");
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  });