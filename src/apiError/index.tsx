import { memo } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import { IApiError } from "./apiError.types";

const { Header, Body } = Toast;

const ApiError = ({ message, onClose, show }: IApiError) => (
  <ToastContainer position="top-end" className="p-3">
    <Toast
      bg="danger"
      className="d-inline-block m-1"
      show={show}
      autohide
      delay={5000}
      onClose={onClose}
    >
      <Header closeButton={false} className="justify-content-between">
        <div>Error</div>
        <div>
          <Button type="button" className="btn-close" onClick={onClose} />
        </div>
      </Header>
      <Body>
        <strong>{message}</strong>
      </Body>
    </Toast>
  </ToastContainer>
);

export default memo(ApiError);
