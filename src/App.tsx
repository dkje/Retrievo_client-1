import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
// import Button from "./components/Button";
// import Heading, { headingStyle } from "./components/Heading";
// import MyProfile from "./pages/MyProfile";
import Register from "./pages/Register";

const App: React.FC<Record<string, never>> = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Register />
      </ChakraProvider>
    </>
  );
};

export default App;
