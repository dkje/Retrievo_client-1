import React, { useEffect } from "react";
import { Divider, Container, Box, Flex } from "@chakra-ui/react";
import { ImClipboard } from "react-icons/im";
import { GoChevronDown, GoChevronUp, GoChevronRight } from "react-icons/go";

import { useLocation } from "react-router-dom";
import useLoadMore from "../../../hooks/useLoadMore";
import Heading, { headingEnum } from "../../../components/Heading";
import Text from "../../../components/Text";
import StyledListItem from "./MyTasks.styled";
import { useGetMeQuery } from "../../../generated/graphql";
import Spinner from "../../../components/Spinner";
import Label from "../../../components/Label";
import useQuery from "../../../hooks/useQuery";

export const MyTasks: React.FC = (): any => {
  const urlQuery = useQuery();
  const projectId = urlQuery.get("projectId");
  const { data: meData, loading: meLoading } = useGetMeQuery();
  const [items, setItems, visible, loadMore, reset] = useLoadMore([], 3);
  if (!projectId) return null;

  console.log(meData);
  useEffect(() => {
    if (!meData) return;
    if (!meData.getMe) return;
    if (!meData.getMe.user) return;
    if (meData.getMe.user?.userTask) {
      const taskData = meData.getMe.user.userTask.filter((userTask) => {
        return userTask.task.project?.id === projectId;
      });
      setItems(taskData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData]);

  if (meLoading) return <Spinner />;

  // if (meData?.getMe?.user?.userTask && !items.length) {
  // }

  const renderVisible = () => {
    return items.slice(0, visible).map((item) => {
      return (
        <>
          <StyledListItem
            display="grid"
            gridTemplateColumns="auto 1fr 2rem"
            gridColumnGap="1rem"
            p={3}
            bg="achromatic.100"
            w="100%"
            key={item.id}
          >
            <Label>{item.task.board ? item.task.board.title : "todo"}</Label>
            {item.task.title}
            <GoChevronRight className="_icon" opacity="0" />
          </StyledListItem>
          <Divider orientation="horizontal" />
        </>
      );
    });
  };

  return (
    <Box bg="achromatic.200" borderRadius={6} p="0" boxShadow="base">
      <Flex alignItems="center" p={4}>
        <ImClipboard />
        <Box pl={2}>
          <Heading headingType={headingEnum.table}>My Tasks</Heading>
        </Box>
      </Flex>
      {renderVisible()}
      <Flex width="100%" justifyContent="center">
        <button
          type="button"
          onClick={() => (visible >= items.length ? reset(3) : loadMore(3))}
        >
          <Flex alignItems="center" color="achromatic.600" p={2}>
            {visible >= items.length ? <GoChevronUp /> : <GoChevronDown />}
            <Text pl={1} color="achromatic.600" fontSize="sm">
              {visible >= items.length ? "No More" : "See More"}
            </Text>
          </Flex>
        </button>
      </Flex>
    </Box>
  );
};

export default MyTasks;
