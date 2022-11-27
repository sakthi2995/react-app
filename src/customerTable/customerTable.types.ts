import { ICustomer, ICustomerResponse } from "../App.types";

export interface ICustomerTable {
  customers: ICustomer[];
  firstCustomer: ICustomerResponse | undefined;
}

export interface IUseCustomer {
  showError: boolean;
  setShowError: (arg: boolean) => void;
}
