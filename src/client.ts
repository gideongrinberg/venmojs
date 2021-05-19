import { CookieJar } from "tough-cookie";
import axios, { AxiosInstance } from "axios";
import axiosCookieJarSupport from "@3846masa/axios-cookiejar-support";

import { validateAccessKey } from "./utils";
import { InvalidAccessKeyError, InvalidHttpMethodError } from "./exceptions";

export enum HttpMethod {
    POST,
    GET,
    PUT,
    DELETE,
}

export class VenmoApiClient {
    public http: AxiosInstance;

    constructor(http: AxiosInstance) {
        this.http = http;
    }

    public get accessKey(): string {
        return this.http.defaults.headers.common["Authorization"];
    }

    static async init(accessKey: string): Promise<VenmoApiClient> {
        let client = new VenmoApiClient(
            await axios.create({
                baseURL: "https://api.venmo.com/v1",
                headers: {
                    "User-Agent": "Venmo/7.44.0 (iPhone; iOS 13.0; Scale/2.0)",
                    Authorization: validateAccessKey(accessKey),
                },
                withCredentials: true,
            })
        );

        client.http.defaults.headers.common["User-Agent"] =
            "Venmo/7.44.0 (iPhone; iOS 13.0; Scale/2.0)";
        client.http.defaults.headers.common["Authorization"] =
            validateAccessKey(accessKey);

        client.http.defaults.headers["User-Agent"] =
            "Venmo/7.44.0 (iPhone; iOS 13.0; Scale/2.0)";
        client.http.defaults.headers["Authorization"] =
            validateAccessKey(accessKey);

        client.http.defaults.baseURL = "https://api.venmo.com/v1";
        client.http.defaults.withCredentials = true;

        axiosCookieJarSupport(client.http);
        client.http.defaults.jar = new CookieJar();

        return Promise.resolve(client);
    }

    updateAccessKey(key: string) {
        this.http.defaults.headers.common["Authorization"] =
            validateAccessKey(key);
        this.http.defaults.headers["Authorization"] = validateAccessKey(key);
    }

    async _callApiWithValidation(
        resourcePath: string,
        method: HttpMethod,
        headerParams?: object,
        body?: object,
        callback?: (info: object) => any
    ) {
        // @ts-ignore
        let res: object = await this._callApi(
            resourcePath,
            method,
            headerParams,
            body
        );

        console.log(res);
    }

    async _callApi(
        resourcePath: string,
        method: HttpMethod,
        headerParams?: object,
        body?: object,
        callback?: (info: object) => any
    ): Promise<void | object> {
        headerParams = headerParams || {};

        if (body != null) {
            headerParams = Object.assign(
                { "Content-Type": "application/json" },
                headerParams
            );
        }

        let resp: object;
        if (method == HttpMethod.GET) {
            resp = this.http.get(resourcePath, {
                method: "GET",
                headers: headerParams,
                params: body,
            });
        } else if (method == HttpMethod.POST) {
            resp = this.http.post(resourcePath, {
                method: "POST",
                headers: headerParams,
                params: body,
            });
        } else if (method == HttpMethod.PUT) {
            resp = this.http.put(resourcePath, {
                method: "PUT",
                headers: headerParams,
                params: body,
            });
        } else if (method == HttpMethod.DELETE) {
            resp = this.http.delete(resourcePath, {
                method: "DELETE",
                headers: headerParams,
                params: body,
            });
        } else {
            throw new InvalidHttpMethodError();
        }

        if (callback != null) {
            callback(resp);
            return Promise.resolve();
        } else {
            return Promise.resolve(resp);
        }
    }
}
