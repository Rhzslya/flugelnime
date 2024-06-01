import React from "react";
import ReactLoading from "react-loading";

const ModalLoading = ({ type = "spokes", color = "000" }) => (
  <ReactLoading type={type} color={color} height={20} width={20} />
);

export default ModalLoading;
