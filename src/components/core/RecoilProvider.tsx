"use client";

import React from "react";
import { RecoilRoot } from "recoil";

type Recoil = {
  children: React.ReactNode;
};

const RecoilProvider = (props: Recoil) => {
  return <RecoilRoot>{props.children}</RecoilRoot>;
};

export default RecoilProvider;
