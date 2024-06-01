import React from "react";
import ReactLoading from "react-loading";

const LoadingComponent = ({ type = "spokes", color = "000" }) => (
  <ReactLoading type={type} color={color} height={100} width={40} />
);

export default LoadingComponent;
