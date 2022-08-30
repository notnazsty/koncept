import { Stack } from "@mantine/core";
import React, { FC, ReactNode } from "react";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <Stack>{children}</Stack>;
};

export default AuthProvider;
