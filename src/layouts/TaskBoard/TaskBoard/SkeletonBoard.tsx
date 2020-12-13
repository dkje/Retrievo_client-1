import React, { ReactElement, useState } from "react";
import * as yup from "yup";
import { Box } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { GoPlus } from "react-icons/go";
import { IconContext } from "react-icons";
import Text from "../../../components/Text";
import Heading, { headingEnum } from "../../../components/Heading";
import Form from "../../../components/Form";
import Input from "../../../components/Input";

export type boardType = {
  board: string;
};

export type SkeletonBoardProps = {
  handleBoardCreate: (board: boardType, projectId: string) => void;
  projectId: string;
};

const SkeletonBoard: React.FC<SkeletonBoardProps> = ({
  handleBoardCreate,
  projectId,
}): ReactElement => {
  const [isCreating, setIsCreating] = useState(false);

  const changeIconColor = (icon: ReactElement, color: string, size: string) => {
    return (
      <Box mx={3}>
        <IconContext.Provider value={{ color, size }}>
          {icon}
        </IconContext.Provider>
      </Box>
    );
  };

  const handleBoardCreateSubmit = (value: boardType) => {
    handleBoardCreate(value, projectId);
    setIsCreating(false);
  };

  const validationSchema = yup.object({
    board: yup.string().required(),
  });

  const renderHeaderOrInput = () => {
    return isCreating ? (
      <Form
        initialValues={{ board: "" }}
        validationSchema={validationSchema}
        buttonPosition="right"
        onSubmit={handleBoardCreateSubmit}
        isOnBlurSubmit={false}
        // isFullButton={false}
        // isSubmitButton
        // isCancelButton
        onCancel={() => setIsCreating(false)}
      >
        <Box display="flex" flexDir="row" alignItems="center" px={2}>
          <Input
            isEditable={false}
            isLabelNonVisible
            label="board"
            name="board"
            type="text"
          />
          <Box
            ml={2}
            _hover={{ cursor: "pointer" }}
            onClick={() => setIsCreating(false)}
          >
            <CgClose />
          </Box>
        </Box>
      </Form>
    ) : (
      <Heading mb={5} headingType={headingEnum.board} color="transparent">
        SkeletonBoard
      </Heading>
    );
  };

  return (
    <Box w={330}>
      {renderHeaderOrInput()}
      <Box
        h="100vh"
        p={4}
        borderRadius={10}
        bgColor={isCreating ? "primary.400" : "transparent"}
        border={isCreating ? "none" : "2px dotted #31D5BF"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        _hover={isCreating ? {} : { bgColor: "violetBg", cursor: "pointer" }}
        onClick={() => setIsCreating(true)}
      >
        {isCreating ? null : (
          <>
            <Box my={2}>{changeIconColor(<GoPlus />, "#31D5BF", "25")}</Box>
            <Text color="primary.200">Add Board...</Text>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SkeletonBoard;
