import { Fragment, memo, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

import { ICustomer, TCustomerKeys } from "../App.types";
import { ICustomerTable } from "./customerTable.types";

import ApiError from "../apiError";
import { useCustomer } from "./useCustomer";

import "./customerTable.css";

const { Body, Header, Title } = Modal;

const CustomerTable = ({ customers, firstCustomer }: ICustomerTable) => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const { showError, setShowError } = useCustomer(firstCustomer);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  const handleRowClick = (e: any, customer: ICustomer) => {
    e.preventDefault();
    if (customer.active) {
      setShow(true);
      setSelectedCustomer(customer);
    }
  };

  const TableRow = memo((rowProps: ICustomer) => {
    const { id, firstName, lastName, location, province, active } = rowProps;

    return (
      <tr
        className={active ? "active" : "disabled"}
        onClick={(e) => handleRowClick(e, rowProps)}
      >
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{location}</td>
        <td>{province}</td>
      </tr>
    );
  });

  const onClose = () => {
    setShow(false);
  };

  const modalContent = useMemo(() => {
    return selectedCustomer
      ? Object.keys(selectedCustomer).map((key) => (
          <div key={key}>
            <div>
              <strong>{key}:&nbsp;</strong>
              <span>{selectedCustomer[key as TCustomerKeys].toString()}</span>
            </div>
          </div>
        ))
      : null;
  }, [selectedCustomer]);

  const onErrorClose = () => {
    setShowError(false);
  };

  return (
    <Fragment>
      <Modal show={show} onHide={onClose}>
        <Header closeButton>
          <Title>Customer Details</Title>
        </Header>
        <Body>{modalContent}</Body>
      </Modal>
      <ApiError
        show={showError}
        onClose={onErrorClose}
        message="Failed to post customer info."
      />
      <Table striped bordered hover size="sm" className="tableWidth">
        <thead>
          <tr>
            <th>{t("homepage.id")}</th>
            <th>{t("homepage.firstname")}</th>
            <th>{t("homepage.lastname")}</th>
            <th>{t("homepage.location")}</th>
            <th>{t("homepage.province")}</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(({ id, ...rest }) => (
            <TableRow key={id} id={id} {...rest} />
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default memo(CustomerTable);
