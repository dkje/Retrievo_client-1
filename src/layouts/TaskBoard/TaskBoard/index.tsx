/* eslint-disable indent */
import React, { ReactElement, useState } from "react";
// import { RouteComponentProps } from "react-router-dom";

import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsPlusCircleFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { IconContext } from "react-icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Heading, { headingEnum } from "../../../components/Heading";
import TaskCard, { TaskCardProps } from "../TaskCard";
import IconButton from "../../../components/IconButton";
import Modal from "../../Modal/index";
import {
  Board as boardType,
  Task as taskType,
} from "../../../generated/graphql";

export type Boardoptions = {
  id: string;
  title?: string;
  boardColumnIndex?: number;
};

export type TaskOptions = {
  title: string;
  boardId: string;
  sprintId: string;
};

export type TaskBoardProps = TaskCardProps & {
  board?: boardType;
  boards: boardType[];
  projectId: string;
  sprintId: string;
  // ref: (element: HTMLElement | null) => any;
  handleBoardDelete: (
    id: string,
    newBoardId: string,
    projectId: string
  ) => void;
  handleTaskCreate: (options: TaskOptions, projectId: string) => void;
  handleBoardUpdate: (options: Boardoptions, projectId: string) => void;
  handleTaskDelete: (id: string) => void;
  handleTaskClick: (id: string) => void;
};

const TaskBoard: React.FC<TaskBoardProps> = ({
  handleBoardDelete,
  handleBoardUpdate,
  handleTaskCreate,
  board,
  boards,
  projectId,
  sprintId,
  // ref,
  ...props
}): ReactElement | null => {
  // const projectId = "04f025f8-234c-49b7-b9bf-7b7f94415569";
  const { handleTaskDelete, handleTaskClick } = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedNewBoard, setSelectedNewBoard] = useState<boardType>(
    boards[0]
  );
  const [inputValue, setInputValue] = useState(board?.title);
  const [taskTitle, setTestTitle] = useState("");

  if (!board) return null;

  const taskConfig = { handleTaskDelete, handleTaskClick };

  const changeIconColor = (icon: ReactElement, color: string, size: string) => {
    return (
      <Box mx={3}>
        <IconContext.Provider value={{ color, size }}>
          {icon}
        </IconContext.Provider>
      </Box>
    );
  };

  const handleDeleteSubmit = async () => {
    if (!selectedNewBoard || board.id === selectedNewBoard.id) return;
    await handleBoardDelete(board.id, selectedNewBoard.id, projectId);
    setIsDeleteModalOpen(false);
  };

  // TODO : try catch
  const handleEditSubmit = async () => {
    await handleBoardUpdate(
      {
        id: board.id,
        title: inputValue,
      },
      projectId
    );
    setIsEditModalOpen(false);
  };

  // TODO : try catch
  const handleCreateTaskSubmit = async () => {
    try {
      await handleTaskCreate(
        {
          title: taskTitle,
          boardId: board.id,
          sprintId,
        },
        projectId
      );
    } catch (err) {
      console.log(err);
    }

    setIsCreateTaskModalOpen(false);
  };

  const renderTasks = (tasks: taskType[]) => {
    if (!tasks.length) return null;
    return tasks.map((task, index) => {
      return (
        <Draggable
          index={task.boardRowIndex || index}
          draggableId={task.id}
          key={task.id}
        >
          {(provided) => (
            <Box
              mb={4}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <TaskCard key={task.id} task={task} {...taskConfig} />
            </Box>
          )}
        </Draggable>
      );
    });
  };

  const renderModalMenu = () => {
    const otherBoards = boards.filter((currentBoard) => {
      return board.id !== currentBoard.id;
    });
    return otherBoards.map((currentBoard) => (
      <MenuItem onClick={() => setSelectedNewBoard(currentBoard)}>
        {currentBoard.title}
      </MenuItem>
    ));
  };

  // column
  return (
    <Box w={330} mr={4} minH={1000}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        px={5}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Heading mr={2} headingType={headingEnum.board}>
            {board.title}
          </Heading>
          <Text color="primary.300">{`${board.task?.length}`}</Text>
          {/* <Text color="fail">{`${board.boardColumnIndex}`}</Text> */}
        </Box>
        <Box>
          <IconButton
            aria-label="delete board"
            iconButtonType="pencil"
            color="achromatic.600"
            onClick={() => setIsEditModalOpen(true)}
          />
          {board.boardColumnIndex >= boards.length - 1 ? null : (
            <IconButton
              aria-label="delete board"
              iconButtonType="deleteBin"
              color={
                board.boardColumnIndex >= boards.length - 1
                  ? "transparent"
                  : "achromatic.600"
              }
              onClick={
                board.boardColumnIndex === boards.length - 1
                  ? () => {
                      return null;
                    }
                  : () => setIsDeleteModalOpen(true)
              }
            />
          )}
        </Box>
      </Box>
      <Box
        bgColor="primary.400"
        h="100%"
        p={4}
        mb={4}
        borderRadius={10}
        display="flex"
        flexDir="column"
        alignItems="center"
        minH={170}
      >
        <Droppable droppableId={board.id} type="TASK">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              key={board.id}
            >
              {renderTasks(board.task || [])}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Box
          display="flex"
          justifyContent="center"
          onClick={() => setIsCreateTaskModalOpen(true)}
          _hover={{ cursor: "pointer" }}
          w={300}
        >
          {changeIconColor(<BsPlusCircleFill />, "#828282", "25")}
        </Box>
      </Box>
      <Modal
        title="Delete Board"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        secondaryText="Submit"
        secondaryAction={handleDeleteSubmit}
        buttonColor="fail"
        buttonFontColor="white"
      >
        <>
          <Text mb={3}>Which Board you want to move the tasks to?</Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<BiChevronDown />}>
              {selectedNewBoard.title}
            </MenuButton>
            <MenuList>{renderModalMenu()}</MenuList>
          </Menu>
        </>
      </Modal>
      <Modal
        title="Edit Board"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        secondaryText="Submit"
        secondaryAction={handleEditSubmit}
        buttonColor="primary.200"
        buttonFontColor="white"
      >
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          defaultValue={board.title}
        />
      </Modal>
      <Modal
        title="Create Task"
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        secondaryText="Submit"
        secondaryAction={handleCreateTaskSubmit}
        buttonColor="primary.200"
        buttonFontColor="white"
      >
        <Input
          onChange={(e) => setTestTitle(e.target.value)}
          placeholder="Write Task Name"
        />
      </Modal>
    </Box>
  );
};

export default TaskBoard;
