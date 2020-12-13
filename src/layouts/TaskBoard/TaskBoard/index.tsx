import React, { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { BsPlusCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import TaskCard, { task, TaskCardProps } from "../TaskCard";
import IconButton from "../../../components/IconButton";

export type board = {
  id: string;
  title: string;
  boardColumnIndex: number;
  task: task[];
};

export type TaskBoardProps = TaskCardProps & {
  board: board;
  handleBoardCreate: () => void;
  handleBoardDelete: (id: string) => void;
  handleTaskCreate: () => void;
  handleTaskDelete: (id: string) => void;
  handleTaskClick: (id: string) => void;
};

const TaskBoard: React.FC<TaskBoardProps> = ({
  handleBoardDelete,
  handleTaskCreate,
  board,
  ...props
}): ReactElement => {
  const { handleTaskDelete, handleTaskClick } = props;
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

  const renderTasks = (tasks: task[]) => {
    return tasks.map((task) => {
      return (
        <Box mb={4}>
          <TaskCard key={task.id} task={task} {...taskConfig} />
        </Box>
      );
    });
  };

  return (
    <Box w={330} mr={4}>
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
          <Text color="primary.300">{`${board.task.length}`}</Text>
        </Box>
        <IconButton
          aria-label="delete board"
          iconButtonType="deleteBin"
          color="achromatic.600"
          onClick={() => handleBoardDelete(board.id)}
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
      >
        {renderTasks(board.task)}
        <Box onClick={handleTaskCreate} _hover={{ cursor: "pointer" }}>
          {changeIconColor(<BsPlusCircleFill />, "#828282", "25")}
        </Box>
      </Box>
    </Box>
  );
};

export default TaskBoard;

/*
{
  "data": {
    "getBoards": {
      "boards": [
        {
          "title": "Hat Rustic Frozen Hat",
          "boardColumnIndex": 0,
          "task": [
            {
              "title": "Liberian Dollar Ball Director",
              "boardRowIndex": null,
              "sprintRowIndex": 1,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Katlynn Smitham DDS"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "Borders",
                    "color": "PINK"
                  }
                }
              ]
            },
            {
              "title": "payment Cliffs indigo",
              "boardRowIndex": null,
              "sprintRowIndex": 3,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Vickie Beer"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "California",
                    "color": "RED"
                  }
                }
              ]
            },
            {
              "title": "Keys Borders Berkshire",
              "boardRowIndex": null,
              "sprintRowIndex": 5,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Camille Morissette"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "backing up",
                    "color": "PINK"
                  }
                }
              ]
            },
            {
              "title": "matrices payment asymmetric",
              "boardRowIndex": null,
              "sprintRowIndex": 6,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Bill Witting III"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "sky blue",
                    "color": "RED"
                  }
                }
              ]
            },
            {
              "title": "Michigan payment Graphic Interface",
              "boardRowIndex": null,
              "sprintRowIndex": 8,
              "userTask": [
                {
                  "user": {
                    "avatar": null,
                    "username": "Gina Emmerich"
                  }
                }
              ],
              "taskLabel": [
                {
                  "label": {
                    "name": "Clothing",
                    "color": "PINK"
                  }
                }
              ]
            }
          ]
        }
      ],
      "error": null
    }
  }
}

*/
