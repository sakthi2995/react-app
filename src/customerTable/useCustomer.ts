import { useEffect, useState } from "react";
import { ICustomerResponse } from "../App.types";
import { IUseCustomer } from "./customerTable.types";

export const useCustomer = (
  customer: ICustomerResponse | undefined
): IUseCustomer => {
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (customer) {
      const payload = {
        firstname: btoa(JSON.stringify(customer)),
        timestamp: new Date().toISOString(),
      };
      fetch(`${process.env.REACT_APP_API_BASE_URL}/customer`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "x-client-id": "12345",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then(() => {
          console.log("Customer info posted successfully.");
        })
        .catch(() => {
          setShowError(true);
        });
    }
  }, [customer]);

  return { showError, setShowError };
};
