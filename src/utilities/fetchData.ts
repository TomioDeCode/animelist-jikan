/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "cookies-next";
import { fetchDatas } from "@/lib/types/fetch.types";

export const fetchData = async (props: fetchDatas, req?: any) => {
  const url = "http://localhost:3000/api/auth/" + props.url;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";

  const token = props.token || getCookie("token", { req });

  const headers = new Headers({
    "x-api-key": apiKey,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(props.isForm || props.isSendFile
      ? {}
      : { "Content-Type": "application/json" }),
  });

  const config: RequestInit = {
    method: props.method,
    headers,
    body: props.body || undefined,
    next: {
      revalidate: props.timeRelavalidate ?? 60 * 60 * 24,
    },
  };

  const response = await fetch(url, config);
  const result = await response.json();

  return {
    statusCode: response.status,
    headers: response.headers,
    result,
  };
};
