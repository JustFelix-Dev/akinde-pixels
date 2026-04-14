import config from "@payload-config";
import { getPayload } from "payload";

let payloadClient: Awaited<ReturnType<typeof getPayload>> | null = null;

export const getPayloadClient = async () => {
  if (!payloadClient) {
    payloadClient = await getPayload({ config });
  }

  return payloadClient;
};
