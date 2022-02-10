import { CarDTO } from '../../dtos/CarDTO';

export type RootNativeParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  SchedulingComplete: undefined;
  MyCars: undefined;
};
