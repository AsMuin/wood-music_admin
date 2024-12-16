import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { showMessage } from '@/component/MessageManager';
interface IResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    token?: string;
}
export interface IRequestConfig extends AxiosRequestConfig {
    toastError?: boolean;
}

const axiosInstance = axios.create({
    baseURL: '/api'
});

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig & IRequestConfig) => {
    try {
        if (config.url === '/user/login' || config.url === '/user/register' || config.url === '/song/list') {
            return config;
        } else {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('请先登录');
                // 权限认证失败的情况下
                showMessage({ type: 'warning', message: '请先登录' });
                return Promise.reject('请先登录');
            } else {
                config.headers.Authorization = token;
                return config;
            }
        }
    } catch (e: any) {
        console.error(e);
        showMessage({ type: 'error', message: e.message });
        return Promise.reject(e);
    }
});

axiosInstance.interceptors.response.use(async (response: AxiosResponse<IResponse, any>) => {
    try {
        const { data } = response;
        if (data.success) {
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            return response;
        } else {
            // 服务端响应了数据,但是处理结果是失败的
            showMessage({ type: 'error', message: data.message });
            return Promise.reject(data.message);
        }
    } catch (e: any) {
        console.error(e);
        return Promise.reject(e);
    }
});

export async function Request<T = any>(params: IRequestConfig, extraConfig?: IRequestConfig): Promise<IResponse<T>> {
    try {
        const Response = await axiosInstance.request<IResponse<T>>({ ...extraConfig, ...params });
        return Response.data;
    } catch (e:any) {
        // 某种原因请求发送失败 比如网络断开
        console.error(e);
        showMessage({ type: 'error', message: e.message });
        return Promise.reject(e);
    }
}

const RequestConstructor =
    <T>(config: AxiosRequestConfig, beforeRequest?: (params: T, extraConfig?: IRequestConfig) => T | void) =>
    <R>(params: T, extraConfig?: IRequestConfig) => {
        let requestParamsCopy = structuredClone(params);
        if (beforeRequest) {
            const beforeRequestResult = beforeRequest(requestParamsCopy, extraConfig);
            if (beforeRequestResult) {
                requestParamsCopy = beforeRequestResult;
            }
        }
        return Request<R>({ ...config, data: requestParamsCopy || params }, extraConfig);
    };

export default RequestConstructor;
