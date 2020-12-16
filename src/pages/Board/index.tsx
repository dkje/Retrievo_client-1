import React, { useEffect, useState } from "react";
import _ from "lodash";

/* Layouts */
import { Box } from "@chakra-ui/react";
import SideNav from "../../layouts/SideNav";
import TopNav from "../../layouts/TopNav";
import PageHeading from "../../layouts/PageHeader";
import TaskBoardList from "../../layouts/TaskBoard/TaskBoardList";
import TaskBoardContainer from "../../layouts/TaskBoard/TaskBoardContainer";

import { client } from "../../index";
import { Boardoptions } from "../../layouts/TaskBoard/TaskBoard";

/* GraphQL */
import {
  GetBoardsDocument,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsLazyQuery,
  useGetBoardsQuery,
  CreateBoardDocument,
  GetBoardsQuery,
  BoardResponse,
  useUpdateBoardMutation,
} from "../../generated/graphql";

// interface indexProps {
//
// }

const args = {
  projects: [
    {
      id: "1",
      name: "Rock Paper Queens",
    },
    {
      id: "2",
      name: "My Blueberry",
    },
    {
      id: "3",
      name: "Current Project",
    },
    {
      id: "4",
      name: "Retrievo",
    },
  ],
  currentProject: {
    id: "4",
    name: "Retrievo",
  },
  onProjectSelect: (id: string) => console.log(id),
  avatars: [
    {
      name: "stupy",
      src:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "prettie",
      src:
        "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "bunny",
      src:
        "https://images.unsplash.com/photo-1573316364756-33b34fad4fcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhYmJpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "cuttie pie",
      src:
        "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
    },
  ],
};

export const Board: React.FC = () => {
  // FIXME
  const projectId = "04f025f8-234c-49b7-b9bf-7b7f94415569";
  // text "04f025f8-234c-49b7-b9bf-7b7f94415569";
  // no sprint "14ab38e8-91a0-4644-ad05-ca476387e678";

  /* Mutation, Query */
  const { loading, data, refetch } = useGetBoardsQuery({
    variables: { projectId },
  });

  const [
    getBoards,
    { loading: lazyLoading, data: lazyData, refetch: lazyRefetch },
  ] = useGetBoardsLazyQuery({
    variables: { projectId },
  });
  // const [flag, setFlag] = useState<boolean>(false);

  // useEffect(() => {
  //   // TODO
  //   console.log("use Effect:", data);
  // }, [flag, data]);

  const [
    createBoard,
    { data: createdData, loading: createLoading, error: createError },
  ] = useCreateBoardMutation();
  console.log("i dont know", data);

  const [
    deleteBoard,
    { data: deletedData, loading: deleteLoading, error: deleteError },
  ] = useDeleteBoardMutation();

  const [
    updateBoard,
    { data: updatedData, loading: updateLoading, error: updateError },
  ] = useUpdateBoardMutation();

  /* Function Props */
  const handleBoardCreate = async (title: string, projectId: string) => {
    await createBoard({
      variables: { title, projectId },
      refetchQueries: [
        {
          query: GetBoardsDocument,
          variables: { projectId },
        },
      ],
      update: (cache, { data }) => {
        try {
          const newBoardRes = data?.createBoard.boards;
          // const newBoard = newBoardRes && newBoardRes[newBoardRes.length - 2];
          const existingBoards = client.readQuery({
            query: GetBoardsDocument,
            variables: { projectId },
          });
          // console.log("newBoard", newBoard);
          if (!existingBoards) return;
          console.log("existingBoards", existingBoards);
          console.log("newBoardRes", newBoardRes);
          // cache.evict({ fieldName: "boards:{}" });

          const newBoard = _.cloneDeep(newBoardRes);

          if (!newBoardRes) return;
          client.writeQuery({
            query: GetBoardsDocument,
            variables: { projectId }, // 쿼리가 바뀌었다는 것을 인지하지 못해서
            data: {
              getBoards: {
                boards: newBoard,
              },
            },
          });
          // 0. writeQuery에서 variables 지워보기 -> 실패
          // 0-1. try catch로 감고 error 메세지 확인해보기 -> 에러 없음
          // 0-2. writeQuery에 data?.createBoard.boards 바로 꽂기 -> 안됨..
          // 2. client.writeQuery (https://github.com/apollographql/apollo-client/issues/3909#issuecomment-568558285) -> getBoard에 넣는 건 성공! 리랜더는 아직
          // 9. modify
          // console.log("handleCreateBoard", cache);
          // setTimeout(() => {
          //   setFlag(!flag);
          if (lazyRefetch) lazyRefetch();
          // }, 800);
        } catch (error) {
          console.log("error!!!!!!:", error);
        }
      },
    });
  };

  const handleBoardDelete = async (
    id: string,
    newBoardId: string,
    projectId: string
  ) => {
    await deleteBoard({
      variables: {
        id,
        newBoardId,
        projectId,
      },
      update: (cache, { data }) => {
        const newBoardRes = data?.deleteBoard.boards;
        if (!newBoardRes) return;
        client.writeQuery({
          query: GetBoardsDocument,
          variables: { projectId },
          data: {
            getBoards: {
              boards: [...newBoardRes],
            },
          },
        });
        console.log("deleteboard", newBoardRes);
        // if (refetch) refetch();
      },
    });
  };

  const handleUpdateBoard = async (
    options: Boardoptions,
    projectId: string
  ) => {
    await updateBoard({
      variables: {
        options,
        projectId,
      },
      update: (cache, { data }) => {
        const newBoardRes = data?.updateBoard.boards;
        const existingBoards = client.readQuery({
          query: GetBoardsDocument,
          variables: { projectId },
        });
        if (!newBoardRes) return;
        // console.log(existingBoards);
        const copyExistingBoards = existingBoards.getBoards.boards.slice();
        copyExistingBoards.splice(
          newBoardRes[0].boardColumnIndex,
          1,
          newBoardRes
        );
        client.writeQuery({
          query: GetBoardsDocument,
          variables: { projectId },
          data: {
            getBoards: {
              boards: copyExistingBoards,
            },
          },
        });
        console.log("updatedboard", newBoardRes);
      },
    });
  };

  const handleTaskCreate = () => console.log("create!");
  const handleTaskDelete = (id: string) => console.log("delete", id);
  const handleTaskClick = (id: string) => console.log("click", id);
  // const [getBoards, { loading, data, refetch }] = useGetBoardsLazyQuery({
  //   variables:
  //     projectId: "04f025f8-234c-49b7-b9bf-7b7f94415569",
  //   },
  // });

  // console.log("data", data?.getBoards);

  const render = () => {
    console.log("render again");
    return null;
  };

  // if (loading || !data?.getBoards.boards) {
  //   return <TaskBoardContainer />;
  // }

  // FIXME : board가 왜 들어가는고얌..
  return (
    <>
      <Box>
        <TopNav {...args} />
        <SideNav />
        <Box display="flex">
          <Box w="100%" p={9} ml={210} mt={50}>
            <PageHeading />
            <Box mt={9}>
              {render()}
              {loading || !data?.getBoards.boards ? (
                <TaskBoardContainer />
              ) : (
                <TaskBoardList
                  projectId={projectId}
                  handleBoardCreate={handleBoardCreate}
                  handleBoardDelete={handleBoardDelete}
                  handleTaskClick={handleTaskClick}
                  handleTaskCreate={handleTaskCreate}
                  handleTaskDelete={handleTaskDelete}
                  handleUpdateBoard={handleUpdateBoard}
                  boards={data !== null ? data?.getBoards.boards : []}
                  // boards={data?.getBoards ? data?.getBoards.boards : []}
                  // boards={dummyBoardData.boards}
                  // board={dummyBoardData.boards}
                  board={data?.getBoards.boards[0]}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Board;
