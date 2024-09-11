/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type methods = "GET" | "POST" | "PUT" | "DELETE";

export type fetchDatas = {
  url: string;
  method: methods;
  body?: FormData | any;
  token?: string | RequestCookie;
  timeRelavalidate?: number;
  isForm?: boolean;
  isSendFile?: boolean;
  pathRevalidate?: string;
}
