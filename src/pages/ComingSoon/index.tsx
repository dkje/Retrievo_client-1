import React, { ReactElement } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Dog from "../Auth/Image/Dog";
import Heading, { headingEnum } from "../../components/Heading";
import Text from "../../components/Text";
import RoundButton, { RoundButtonColor } from "../../components/RoundButton";

const CommingSoon = (): ReactElement => {
  return (
    <Flex
      w="100%"
      h="100vh"
      bgColor="achromatic.200"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box borderTopRadius={10} borderBottomRadius={20} boxShadow="xl">
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          bgColor="primary.200"
          w="45rem"
          py={2}
          px={3}
          borderTopRadius={10}
        >
          <RoundButton
            aria-label="decoration button"
            buttonColor={RoundButtonColor.yellow}
            size="xs"
            mr={2}
          />
          <RoundButton
            aria-label="decoration button"
            buttonColor={RoundButtonColor.red}
            size="xs"
          />
        </Flex>
        <Flex
          bgColor="white"
          w="45rem"
          h="32rem"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          borderBottomRadius={20}
        >
          <Text>Woof Woof!</Text>
          <Heading headingType={headingEnum.auth}>Coming Soon</Heading>
          <Dog />
        </Flex>
      </Box>
    </Flex>
  );
};

export default CommingSoon;
