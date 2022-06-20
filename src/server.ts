import { checkRquiredProps } from './middleware/requiredProperties';
import express from 'express';
import { jsonContent } from './middleware/header';
import session from 'express-session';
import { verifyToken } from './middleware/auth.jwt';
import cors from 'cors';
import mongoose from 'mongoose';
import { getDatabaseUri } from './utilities/database';
import * as UserRoutes   from './routes/user';
import dotenv from 'dotenv';
import morgan from 'morgan';
import * as PlantRoutes from './routes/plant';
import * as CropRoutes from './routes/crop';

dotenv.config();

mongoose
  .connect(getDatabaseUri())
  .then(() => console.log('Database Connected'))
  .catch((error) => console.error(error));

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use(session({ secret: process.env.SESSION_SECRET! }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

//#region UserRoutes
app.post('/users/signup/', jsonContent, UserRoutes.signup);
app.post('/users/signin/', jsonContent, UserRoutes.signin);
//#endregion UserRoutes

//#region PlantRoutes
const plantMiddleware = [verifyToken, jsonContent];
app.get('/plant/:plantId', plantMiddleware, PlantRoutes.read);
app.post('/plant', plantMiddleware, PlantRoutes.create);
app.get('/plant', plantMiddleware, PlantRoutes.readAll);
app.put('/plant', plantMiddleware, PlantRoutes.update);
app.delete('/plant', plantMiddleware, PlantRoutes.del);
//#endregion PlantRoutes

//#region CropRoutes
const cropMiddleware = [verifyToken, jsonContent];
app.get('/crop/:cropId', cropMiddleware, CropRoutes.read);

const cropCreateMiddleware = [
  verifyToken,
  jsonContent,
  checkRquiredProps(['name', 'plants']),
];
app.post('/crop', cropCreateMiddleware, CropRoutes.create);
app.get('/crop', cropMiddleware, CropRoutes.readAll);
app.put('/crop', cropMiddleware, CropRoutes.update);
app.delete('/crop', cropMiddleware, CropRoutes.del);
//#endregion CropRoutes

app.listen(process.env.PORT, function () {
  console.log('Server is running on Port: ' + process.env.PORT);
});
