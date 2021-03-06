/* eslint-disable no-unused-vars */
import { AvatarGroup } from "@chakra-ui/react";
import React from "react";
import Avatar, { BetterAvatarProps } from "../Avatar";

export enum AvatarSize {
  xxs = "2xs",
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  xxl = "2xl",
}

export type AvatarGroupProps = {
  avatars: BetterAvatarProps[] | null;
  size: AvatarSize;
  max: number;
};

export const avatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size,
  max,
}) => {
  return (
    <AvatarGroup size={size} max={max}>
      {avatars?.map((avatarProps) => (
        <Avatar key={avatarProps.id} {...avatarProps} />
      ))}
    </AvatarGroup>
  );
};

export default avatarGroup;
