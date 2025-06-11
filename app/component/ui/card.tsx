import React from "react";

export const Card = ({ children }: any) => {
  return <div style={{ border: "1px solid #ccc", padding: "16px" }}>{children}</div>;
};

export const CardContent = ({ children }: any) => {
  return <div>{children}</div>;
};
