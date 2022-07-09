import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import { getDatabaseUri } from './utilities/database';
import * as UserRoutes   from './routes/user';
import dotenv from 'dotenv';
import morgan from 'morgan';
import * as PlantRoutes from './routes/plant';
import * as CropRoutes from './routes/crop';
import * as NutrientBatchRoutes from './routes/nutrientBatch';
import * as SearchRoutes from './routes/search';
import * as UserRoutesMiddleware from './middleware/userRoutesMiddleware';
import * as PlantRoutesMiddleware from './middleware/plantRoutesMiddleware';
import * as CropRoutesMiddleware from './middleware/cropRoutesMiddleware';
import * as NutrientBatchRoutesMiddleware from './middleware/nutrientBatchRoutesMiddleware';
import * as SearchRoutesMiddleware from './middleware/searchRoutesMiddleware';

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
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ limit: '4mb', extended: false }));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

//#region UserRoutes
app.post('/users/signup/', UserRoutesMiddleware.signUp, UserRoutes.signup);
app.post('/users/signin/', UserRoutesMiddleware.signIn, UserRoutes.signin);
//#endregion UserRoutes

//#region PlantRoutes
app.get('/plant/:plantId', PlantRoutesMiddleware.read, PlantRoutes.read);
app.post('/plant/growthLog', PlantRoutesMiddleware.createGrowthLog, PlantRoutes.createGrowthLog);
app.post('/plant', PlantRoutesMiddleware.create, PlantRoutes.create);
app.get('/plant', PlantRoutesMiddleware.read, PlantRoutes.readAll);
app.put('/plant', PlantRoutesMiddleware.update, PlantRoutes.update);
app.delete('/plant', PlantRoutesMiddleware.del, PlantRoutes.del);
//#endregion PlantRoutes

//#region CropRoutes
// app.post('/crop/addNutrientBatch', CropRoutesMiddleware.addNutrientBatch, CropRoutes.addNutrientBatch);
app.get('/crop/plantData', CropRoutesMiddleware.readCropPlantData, CropRoutes.readCropPlantData);
app.get('/crop/nutrientBatchData', CropRoutesMiddleware.readNutrientBatchData, CropRoutes.readNutrientBatchData);
app.get('/crop/:cropId', CropRoutesMiddleware.read, CropRoutes.read);
app.post('/crop', CropRoutesMiddleware.create, CropRoutes.create);
app.get('/crop', CropRoutesMiddleware.read, CropRoutes.readAll);
app.put('/crop', CropRoutesMiddleware.update, CropRoutes.update);
app.delete('/crop', CropRoutesMiddleware.del, CropRoutes.del);
//#endregion CropRoutes

//#region NutrientBatch
app.get('/nutrientBatch/:nutrientBatchId', NutrientBatchRoutesMiddleware.read, NutrientBatchRoutes.read);
app.post('/nutrientBatch/application', NutrientBatchRoutesMiddleware.createApplication, NutrientBatchRoutes.createApplication);
app.delete('/nutrientBatch/application', NutrientBatchRoutesMiddleware.delApplication, NutrientBatchRoutes.delApplication);
app.post('/nutrientBatch', NutrientBatchRoutesMiddleware.create, NutrientBatchRoutes.create);
app.get('/nutrientBatch', NutrientBatchRoutesMiddleware.read, NutrientBatchRoutes.readAll);
app.put('/nutrientBatch', NutrientBatchRoutesMiddleware.update, NutrientBatchRoutes.update);
app.delete('/nutrientBatch', NutrientBatchRoutesMiddleware.del, NutrientBatchRoutes.del);
//#endregion NutrientBatchRoutes

app.get('/search', SearchRoutesMiddleware.search, SearchRoutes.search);

app.listen(process.env.PORT, function () {
  console.log('Server is running on Port: ' + process.env.PORT);
});
