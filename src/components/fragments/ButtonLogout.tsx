"use client";

import React from "react";
import { Button } from "../ui/button";
import { getCookie, setCookie } from "cookies-next";
import { useRecoilState } from "recoil";
import { loadingState } from "@/lib/recoils/atom";
import { fetchData } from "@/utilities/fetchData";
import { useRouter } from "next/navigation";

export const ButtonAll = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const router = useRouter();
  const handleLogout = async () => {
    const token = getCookie("access_token");
    try {
      setLoading(true);
      const { result, statusCode } = await fetchData({
        method: "POST",
        url: "logout",
        body: JSON.stringify({
          role: "ADMIN",
        }),
        token: token,
      });

      setLoading(false);

      if (result && statusCode === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button disabled={loading} onClick={handleLogout} className="mt-10" variant="outline">
      {loading ? "Loading..." : "Logout"}
    </Button>
  );
};
