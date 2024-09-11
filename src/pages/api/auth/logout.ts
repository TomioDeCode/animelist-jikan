import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { role } = req.body;

  const token = getCookie("access_token");

  if (token && role) {
    deleteCookie("access_token");
    deleteCookie("role");
  }

  return res.status(200).json({ message: "Logout successful" });
}
