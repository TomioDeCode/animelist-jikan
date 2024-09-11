import { ButtonChangeTheme } from "@/components/core";
import { ButtonAll } from "@/components/fragments";
import React from "react";

const page = () => {

  return (
    <div className="bg-primary max-w-[150px] flex items-center justify-center h-[100vh]">
      <div className="">
        <ButtonChangeTheme />
      </div>
      <ButtonAll />
    </div>
  );
};

export default page;
