import React from "react";
import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div className="loading-container">
      <Spinner
        thickness="7px"
        speed="0.95s"
        emptyColor="gray.200"
        color="blue.500"
        size="2xl"
      />
    </div>
  );
};

export default Loading;
