import { EProvinceKeys } from "./utils/provinces";

export interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  location: string;
  active: boolean;
  province: string;
}

export type TCustomerKeys = keyof ICustomer;

export interface ICustomerResponse {
  id: number;
  name: string;
  location: EProvinceKeys;
  active: boolean;
}
