import { IPlant } from './../models/plant';
import { Plant } from "../models/plant";
import { TypedRequestQueryParams } from "types/request.interface";
import { Crop } from "../models/crop";

export const plantGrowthChartData = async (req: TypedRequestQueryParams<{ plantId: string }>, res) => {
  const plantData = await Plant.findById(req.query.plantId).exec();
  if (plantData) {

    const labels = plantData.growthLogs.map((growthLog) => {
      return new Date(growthLog.dateCreated).toLocaleDateString();
    });

    const heightData = plantData.growthLogs.map((growthLog) => {
      return growthLog.heightInches;
    });

    const leaveData = plantData.growthLogs.map((growthLog) => {
      return growthLog.numbersOfLeaves;
    });

    return res.status(200).json({
      labels: labels,
      datasets: [
        {
          label: 'Height',
          data: heightData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Leaves',
          data: leaveData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ]
    });
  }

  return res.status(400).json({});
};

export const cropGrowthChartData = async (req: TypedRequestQueryParams<{ cropId: string }>, res) => {
  const cropData = await Crop.findById(req.query.cropId).populate('plants');
  const dataFormatted = {}
  const averageArray = arr => arr.reduce((a,b) => a + b, 0) / arr.length

  if (cropData) {
    const plantData: IPlant[] = cropData.plants as any;

    plantData.forEach((plant: IPlant) => {
      plant.growthLogs.forEach((log) => {
        const dateLabel = new Date(log.dateCreated).toLocaleDateString();

        if (!dataFormatted.hasOwnProperty(dateLabel)) {
          dataFormatted[dateLabel] = [];
        };

        dataFormatted[dateLabel].push(log.heightInches);
      });
    });

    const labels = Object.keys(dataFormatted);
    const heightData = labels.map((dateLabel: string) => Math.round(averageArray(dataFormatted[dateLabel])));

    return res.status(200).json({
      labels: labels,
      datasets: [
        {
          label: 'Height',
          data: heightData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    });
  }

  return res.status(400).json({});
};