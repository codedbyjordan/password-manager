import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ErrorBox = ({ message }) => {
  return (
    <div className="w-full flex items-center bg-red-300 border border-red-400 text-red-400 p-2 mt-4 rounded-md">
      <FontAwesomeIcon icon={faTimesCircle} />
      <p className="ml-2">{message}</p>
    </div>
  );
};

export default ErrorBox;
