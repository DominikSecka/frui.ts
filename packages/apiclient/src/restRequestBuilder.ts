import { IApiConnector } from "./types";

const cleanupRegex = /\/+$/g; // removes trailing slash

export class RestRequestBuilder {
  protected url: string;

  constructor(protected apiConnector: IApiConnector, baseUrl: string, protected params?: RequestInit) {
    this.url = baseUrl.replace(cleanupRegex, "");
  }

  all(path: string) {
    this.url += "/" + path;
    return this;
  }

  one(path: string, id?: any) {
    this.url += "/" + path;
    if (id !== undefined) {
      this.url += "/" + id;
    }
    return this;
  }

  get<T>(queryParams?: any): Promise<T> {
    const requestUrl = this.appendQuery(this.url, queryParams);
    const params = appendAcceptJsonHeader(this.params);
    return this.apiConnector.get(requestUrl, params).then(x => x.json());
  }

  post<T>(content: any): Promise<T> {
    const params = appendAcceptJsonHeader(this.params);
    return this.apiConnector.postJson(this.url, content, params).then(x => x.json());
  }

  postOnly(content: any) {
    return this.apiConnector.postJson(this.url, content, this.params);
  }

  put<T>(content: any): Promise<T> {
    const params = appendAcceptJsonHeader(this.params);
    return this.apiConnector.putJson(this.url, content, params).then(x => x.json());
  }

  putOnly(content: any) {
    return this.apiConnector.putJson(this.url, content, this.params);
  }

  patch<T>(content: any): Promise<T> {
    const params = appendAcceptJsonHeader(this.params);
    return this.apiConnector.patchJson(this.url, content, params).then(x => x.json());
  }

  patchOnly(content: any) {
    return this.apiConnector.patchJson(this.url, content, this.params);
  }

  delete() {
    return this.apiConnector.delete(this.url, this.params);
  }

  protected appendQuery(url: string, query?: any) {
    return query ? `${url}?${getQueryString(query)}` : url;
  }
}

function getQueryString(query: any) {
  return Object.keys(query)
    .filter(prop => query[prop] || query[prop] === 0)
    .map(prop => `${encodeURIComponent(prop)}=${encodeURIComponent(getValueForUri(query[prop]))}`)
    .join("&");
}

function getValueForUri(input: any) {
  if (input instanceof Date) {
    return input.toISOString();
  } else {
    return input;
  }
}

const jsonContentType = "application/json,text/json";

function appendAcceptJsonHeader(params?: RequestInit) {
  return {
    ...params,
    headers: {
      ...(params || {}).headers,
      Accept: jsonContentType,
    },
  };
}
