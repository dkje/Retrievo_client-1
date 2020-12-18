/* eslint-disable no-nested-ternary */
import { Flex, Box, Text, Divider, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { RouteComponentProps, useLocation } from "react-router-dom";
import Avatar, { AvatarSize } from "../../../components/Avatar";
import AvatarGroup from "../../../components/AvatarGroup";
import Label from "../../../components/Label";
import Spinner from "../../../components/Spinner";
import { Task } from "../../../generated/graphql";
import { TaskBar } from "../../../layouts/TaskBar";

// import TaskBar from "../../../layouts/TaskBar";
// type userTaskUserType = {
//   src?: string;
//   name?: string;
// };

// type taskDataType = {
//   id: string;
//   taskIndex: number;
//   sprintRowIndex: number;
//   title: string;
//   board: Record<string, string>;
//   userTask: userTaskType[];
// };

type taskListEntryProps = {
  taskData: Task;
  mappedIndex: number;
};

export const TaskListEntry: React.FC<taskListEntryProps> = ({
  taskData,
  mappedIndex,
}) => {
  // const [isDesktop] = useMediaQuery("(min-width: 1280px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const projectId = location.pathname.split("/").pop() || "";
  if (!taskData) return <Spinner />;

  return (
    <>
      <Draggable
        key={taskData.id}
        draggableId={taskData.id}
        index={mappedIndex}
      >
        {(provided) => (
          <>
            <Flex
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              alignItems="center"
              p={2}
            >
              <Box w="80px">
                <Label>{`No. ${taskData.taskIndex}`}</Label>
              </Box>
              <Box w="65%">
                {/* <TaskBar taskId={taskData.id} /> */}
                <Text fontSize="base" onClick={() => console.log("hello")}>
                  {taskData.title}
                </Text>
              </Box>
              <Box w="20%">
                {taskData.board ? <Label>{taskData.board.title}</Label> : null}
              </Box>
              <Box w="10%">
                {taskData.userTask ? (
                  taskData.userTask.length > 1 ? (
                    <AvatarGroup
                      max={3}
                      size={AvatarSize.sm}
                      avatars={taskData.userTask.map((user: any) => user.user)}
                    />
                  ) : (
                    <Avatar
                      name={taskData.userTask[0].user.username}
                      src={
                        taskData.userTask[0].user.avatar
                          ? taskData.userTask[0].user.avatar
                          : undefined
                      }
                      size="sm"
                    />
                  )
                ) : undefined}
              </Box>
            </Flex>
            <Divider />
          </>
        )}
      </Draggable>
      <TaskBar taskId={taskData.id} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TaskListEntry;
