import qs from "qs";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

let baseUrl = "";
if (__DEV__) {
  // baseUrl = '/api';
}

export { baseUrl };

export type Ret<T = {}> = {
	state: 'ok' | 'fail';
	msg?: string;
} & T;


export interface Page<T> {
	totalRow: number;
	pageNumber: number;
	firstPage: boolean;
	lastPage: boolean;
	totalPage: number;
	pageSize: number;
	list: T[];
}

export const emptyPage: Page<any> = {
	totalRow: 0,
	pageNumber: 0,
	firstPage: true,
	lastPage: false,
	totalPage: 0,
	pageSize: 0,
	list: []
};

export async function GET<Result = any>(
  uri: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Result>> {
  uri = params ? uri + "?" + qs.stringify(params) : uri;
  return await axios.get(`${baseUrl}${uri}`, config);
}

export async function POST<Result = any>(
  uri: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Result>> {
  return await axios.post(`${baseUrl}${uri}`, data, config);
}

export async function POST_FORM<Result = any>(
  uri: string,
  form: any,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<Result>> {
  const resp = await POST(uri, qs.stringify(form), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    ...config
  });
  return resp;
}

if(__DEV__){
  (window as any).GET=GET;
  (window as any).POST=POST;
  (window as any).POST_FORM=POST_FORM;
}