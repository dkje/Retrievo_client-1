/* eslint-disable no-unused-vars */
import React from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";

export enum headingEnum {
  homepage = "for Retrievo hompage title",
  auth = "for register, login, new project title",
  page = "for project pages title",
  table = "for table header",
  sprint = "for sprint title in Board page",
  board = "for board title",
  taskCard = "for task card title in Board page",
  task = "for task title",
  modal = "for modal title",
  article = "for article title",
}

export type HeadingProps = {
  headingType: headingEnum;
  children: string;
};

const Heading: React.FC<HeadingProps> = ({
  headingType,
  children,
  ...props
}) => {
  const renderHeadings = () => {
    let fontFamily = "heading";
    let fontSize = "6xl";
    let fontWeight = "normal";
    let color = "achromatic.700";

    if (headingType === headingEnum.homepage) {
      fontFamily = "title";
      fontSize = "5xl";
    }

    if (headingType === headingEnum.auth) {
      fontSize = "6xl";
      color = "achromatic.800";
    }

    if (headingType === headingEnum.page) {
      fontSize = "4xl";
      fontWeight = "bold";
    }

    if (headingType === headingEnum.table) {
      fontSize = "xl";
      fontWeight = "bold";
    }

    if (headingType === headingEnum.sprint) {
      fontSize = "3xl";
      fontWeight = "medium";
    }

    if (headingType === headingEnum.board) {
      fontSize = "md";
    }

    if (headingType === headingEnum.taskCard) {
      fontSize = "md";
      fontWeight = "medium";
    }

    if (headingType === headingEnum.task) {
      fontSize = "3xl";
      fontWeight = "medium";
    }

    if (headingType === headingEnum.modal) {
      fontSize = "xl";
      color = "achromatic.800";
    }

    if (headingType === headingEnum.article) {
      fontSize = "4xl";
      fontWeight = "bold";
    }

    return { fontFamily, fontSize, fontWeight, color };
  };
  const headingConfig = renderHeadings();

  return (
    <ChakraHeading {...headingConfig} {...props}>
      {children}
    </ChakraHeading>
  );
};

export default Heading;
