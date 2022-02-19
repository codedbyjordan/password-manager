import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SuccessBox = ({ message }) => {
  return (
    <div className="w-full flex items-center bg-green-300 border border-green-400 text-green-500 p-2 mt-4 rounded-md">
      <FontAwesomeIcon icon={faCheckCircle} />
      <p className="ml-2">{message}</p>
    </div>
  );
};

export default SuccessBox;
