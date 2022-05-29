import { Car as ModelCar } from '../../database/model/Car';
import { UserDTO } from '../../dtos/UserDTO';

export type RootNativeParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: UserDTO };
  Home: undefined;
  HomeTab: undefined;
  Profile: undefined;
  CarDetails: { car: ModelCar };
  Scheduling: { car: ModelCar };
  SchedulingDetails: { car: ModelCar; dates: string[] };
  Confirmation: { title: string; message: string; nextScreenRoute: string };
  MyCars: undefined;
};
