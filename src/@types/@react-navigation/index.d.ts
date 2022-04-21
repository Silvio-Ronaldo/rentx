import { CarDTO } from '../../dtos/CarDTO';
import { UserDTO } from '../../dtos/UserDTO';

export type RootNativeParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: UserDTO };
  Home: undefined;
  HomeTab: undefined;
  Profile: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  Confirmation: { title: string; message: string; nextScreenRoute: string };
  MyCars: undefined;
};
