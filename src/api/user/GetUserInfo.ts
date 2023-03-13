import instance from "../http";

export namespace GetUserInfo {
  export const url = "/user-info";

  export type Response200 = {
    info: {
      user_name: string;
      user_id: number;
    };
  };

  export type Params = {
    token: string;
  };

  export const request = (options?: { params: Params }) => {
    const result = instance.get(url, { params: options?.params });
    return result as unknown as Promise<{ data: Response200 }>;
  };
}
