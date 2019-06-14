import axios from "axios";
import getSign from "./_get-sign";
import vm from "@/main";

export default (
  url = "",
  method: "get" | "post" | "delete" | "patch" = "get",
  data = {}
): any =>
  new Promise(async (resolve, reject) => {
    try {
      const sign = getSign();

      const resp = await axios({
        method,
        url,
        data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-ID": sign.id,
          "User-Token": sign.token
        }
      });

      const { error, result } = resp.data;

      if (error) throw error;

      resolve(result);
    } catch (e) {
      if (typeof e === "number") reject(e);
      else if (e.constructor === Error) reject(e.response.status);
      else reject("unknown");
    }
  });
