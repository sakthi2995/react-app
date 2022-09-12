import { Fragment, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";

import { ICustomer, ICustomerResponse } from "./App.types";
import { PROVINCES } from "./utils/provinces";
import CustomerTable from "./customerTable";
import {
  AppTranslation,
  detectLanguageFromBrowser,
  initializeTranslationService,
} from "./config/i18n";
import ApiError from "./apiError";

function App() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [firstCustomer, setFirstCustomer] = useState<ICustomerResponse>();
  const [showError, setShowError] = useState<boolean>(false);

  const formatCustomers = (responseData: ICustomerResponse[]): ICustomer[] => {
    return responseData.map((item: ICustomerResponse) => {
      const { name, ...rest } = item;
      const [firstName, lastName] = name.split(" ");
      const province = PROVINCES[rest.location];
      return { ...rest, firstName, lastName, province: province || "" };
    });
  };

  useEffect(() => {
    const currentLang = detectLanguageFromBrowser();
    initializeTranslationService(currentLang);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/customers`)
      .then((res) => res.json())
      .then((data) => {
        setCustomers(formatCustomers(data));
        setFirstCustomer(data[0]);
      })
      .catch(() => {
        setShowError(true);
      });
  }, []);

  const onClose = () => {
    setShowError(false);
  };

  if (!AppTranslation.isInitialized) return <Fragment>Loading...</Fragment>;

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Customer POC</Navbar.Brand>
      </Navbar>
      <ApiError
        show={showError}
        onClose={onClose}
        message="Failed to fetch data."
      />
      <CustomerTable customers={customers} firstCustomer={firstCustomer} />
    </Fragment>
  );
}

export default App;
