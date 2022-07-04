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
import * as NutrientBatchRoutes from './routes/nutrientBatch';

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
const plantCreateMiddleware = [
  verifyToken,
  jsonContent,
  checkRquiredProps(['genus', 'species', 'commonName', 'batch']),
];
app.post('/plant', plantCreateMiddleware, PlantRoutes.create);
app.get('/plant', plantMiddleware, PlantRoutes.readAll);
const plantUpdateMiddleware = [
  verifyToken,
  jsonContent,
  checkRquiredProps(['id']),
];
app.put('/plant', plantUpdateMiddleware, PlantRoutes.update);
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
const cropUpdateMiddleware = [
  verifyToken,
  jsonContent,
  checkRquiredProps(['id']),
];
app.put('/crop', cropUpdateMiddleware, CropRoutes.update);
app.delete('/crop', cropMiddleware, CropRoutes.del);
//#endregion CropRoutes

//#region NutrientBatch
const nutrientBatchMiddleware = [verifyToken, jsonContent];
app.get('/nutrientBatch/:nutrientBatchId', nutrientBatchMiddleware, NutrientBatchRoutes.read);

const nutrientBatchCreateMiddleware = [
  verifyToken,
  jsonContent,
  checkRquiredProps([
    'totalWaterGallons',
    'totalFloraMicroMls',
    'totalFloraBloomMls',
    'totalFloraGroMls',
    'phDownMls',
    'phUpMls',
    'startingPh',
    'endingPh',
    'applications'
  ]),
];
app.post('/nutrientBatch', nutrientBatchCreateMiddleware, NutrientBatchRoutes.create);
app.get('/nutrientBatch', nutrientBatchMiddleware, NutrientBatchRoutes.readAll);
const nutrientBatchUpdateMiddleware = [
  verifyToken,
  jsonContent,
  checkRquiredProps(['id']),
];
app.put('/nutrientBatch', nutrientBatchUpdateMiddleware, NutrientBatchRoutes.update);
app.delete('/nutrientBatch', nutrientBatchMiddleware, NutrientBatchRoutes.del);
//#endregion NutrientBatchRoutes

app.listen(process.env.PORT, function () {
  console.log('Server is running on Port: ' + process.env.PORT);
});
