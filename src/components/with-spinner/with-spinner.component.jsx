import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// HOC: is a function that takes a component and wraps the spinner loading feature around it
const WithSpinner = WrappedComponent => {
  // HOC returns the functional spinner component
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
