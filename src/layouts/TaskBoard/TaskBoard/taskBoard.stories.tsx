import React, { ReactElement } from "react";
import TaskBoard, { TaskBoardProps } from "./index";
import SkeletonBoard, { SkeletonBoardProps } from "./SkeletonBoard";

export const taskBoard = ({ ...args }: TaskBoardProps): ReactElement => (
  <TaskBoard {...args} />
);
taskBoard.args = {
  handleBoardDelete: (id: string) => console.log(id),
  handleTaskClick: (id: string) => console.log(id),
  handleTaskCreate: () => console.log("create!"),
  handleTaskDelete: (id: string) => console.log(id),
  board: {
    id: "skasdkn",
    title: "TO DO",
    boardColumnIndex: 0,
    task: [
      {
        id: "alsk31231222212kdk",
        title: "Reading Books",
        boardRowIndex: 0,
        startDate: "1584172961096",
        endDate: "1611017454633",
        taskIndex: 20,
        userTask: [
          {
            user: {
              id: "ak39vm3",
              username: "Hailey",
              avatar: null,
            },
          },
          {
            user: {
              id: "dkgkasd",
              username: "Dongoc",
              avatar: null,
            },
          },
        ],
        taskLabel: [
          {
            label: {
              id: "aksjakeo",
              name: "Apple",
              color: "labelOrange",
            },
          },
          {
            label: {
              id: "akasdgakeo",
              name: "Banana",
              color: "labelYellow",
            },
          },
        ],
      },
      {
        id: "bmkads44444444421232222vkn",
        title: "Washing Dishes",
        startDate: "1584172961096",
        boardRowIndex: 1,
        endDate: null,
        taskIndex: 21,
        userTask: [
          {
            user: {
              id: "ak39vm3",
              username: "Hailey",
              avatar: null,
            },
          },
        ],
        taskLabel: [
          {
            label: {
              id: "aksjakeo",
              name: "Apple",
              color: "labelOrange",
            },
          },
          {
            label: {
              id: "akasdgakeo",
              name: "Banana",
              color: "labelYellow",
            },
          },
        ],
      },
    ],
  },
};

export const skeletonTaskBoard = ({
  ...args
}: SkeletonBoardProps): ReactElement => <SkeletonBoard {...args} />;
skeletonTaskBoard.args = {
  projectId: "project1",
  handleBoardCreate: (value: Record<string, string>, projectId: string) =>
    console.log("create!", value, projectId),
};

const TaskBoardStories = {
  title: "layouts/TaskBoard/TaskBoard",
  component: TaskBoard,
};

export default TaskBoardStories;
