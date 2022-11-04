import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get the website url from the request
    const { website } = req.body;
    const response = await axios({
      method: "POST",
      url: "https://kxi1dx05fg.execute-api.us-west-2.amazonaws.com/default/website-age",
      data: {
        url: website,
      },
    });
    const { status } = response.data;
    const year = Object.keys(status)?.[0];
    res.status(200).json(year);
  } catch (error) {
    // @ts-ignore
    console.log("error at fetchWebsiteAge.ts", error.message);
    // @ts-ignore
    res.status(500).json({ error: error.message });
  }
}
