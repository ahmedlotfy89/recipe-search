import initializeAxios from "./axiosSetup";
import { axiosRequestConfiguration } from "./config";
import { map } from "rxjs/operators";
import { defer, Observable } from "rxjs";

const axiosInstance = initializeAxios(axiosRequestConfiguration);

const appInfo = {
  app_id: "a79682ea",
  app_key: "5384dabbea00f6143974e7090afabd02",
};

const get = <T>(url: string, queryParams?: object): Observable<T> => {
  return defer(() =>
    axiosInstance.get<T>(url, { params: { ...queryParams, ...appInfo } })
  ).pipe(map((result) => result.data));
};

export default { get };
