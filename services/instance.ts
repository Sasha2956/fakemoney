import axios from "axios";

export const axoisInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}/api`,
});
