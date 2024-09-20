import api from "./api";
import type { TEndpointArgs, TEndpointKey, TEndpointReturn, TMethodType } from "./types";

async function call<E extends TEndpointKey>(
  method: TMethodType,
  endpoint: E,
  args?: TEndpointArgs<E, typeof method>,
): Promise<Awaited<TEndpointReturn<E, TMethodType>>> {
  // @ts-expect-error args에서 never에 할당할 수 없다고 나오는데 왜 그런지 모르겠음... 작동은 잘됨...
  return await api[endpoint][method](args);
}

export default call;
