import React, { ReactElement, useState } from "react";
import { Box } from "@chakra-ui/react";
import { BsPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import TaskCard, { TaskCardProps } from "../TaskCard";
import IconButton from "../../../components/IconButton";
import Modal from "../../Modal/index";
import {
  Board as boardType,
  Task as taskType,
} from "../../../generated/graphql";
// export type board = {
//   __typename?: "Board" | undefined;
//   id: string;
//   title: string;
//   boardColumnIndex: number;
//   task: task[];
// };

export type TaskBoardProps = TaskCardProps & {
  board: boardType;
  // ref: (element: HTMLElement | null) => any;
  handleBoardDelete: (
    id: string,
    newBoardId: string,
    projectId: string
  ) => void;
  handleTaskCreate: () => void;
  handleTaskDelete: (id: string) => void;
  handleTaskClick: (id: string) => void;
};

const TaskBoard: React.FC<TaskBoardProps> = ({
  handleBoardDelete,
  handleTaskCreate,
  board,
  // ref,
  ...props
}): ReactElement => {
  const { handleTaskDelete, handleTaskClick } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // FIXME : index -> boardRowIndex
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
        </Box>
        <IconButton
          aria-label="delete board"
          iconButtonType="deleteBin"
          color="achromatic.600"
          onClick={() => setIsModalOpen(true)}
        />
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
          onClick={handleTaskCreate}
          _hover={{ cursor: "pointer" }}
          w={300}
        >
          {changeIconColor(<BsPlusCircleFill />, "#828282", "25")}
        </Box>
      </Box>
      {/* <Modal title="Which Board you want to move the tasks?"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        secondaryAction={}
      >
        <Dropdown />
      </Modal> */}
    </Box>
  );
};

export default TaskBoard;

// TODO : delete Modal dropdown -> id 연결
// TODO : rerender 문제 해결
