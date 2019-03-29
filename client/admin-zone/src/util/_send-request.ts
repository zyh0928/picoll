import axios from "axios";
import getSign from "./_get-sign";

export default (
  url = "",
  method: "get" | "post" | "delete" | "patch" = "get",
  data = {}
): any =>
  new Promise(async (resolve, reject) => {
    try {
      const sign = getSign();

      resolve(
        await axios({
          method,
          url,
          data,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-ID": sign.id,
            "User-Token": sign.token
          }
        })
      );
    } catch (e) {
      reject(e);
    }
  });
