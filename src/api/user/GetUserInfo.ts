import instance from "../http";

export namespace GetUserInfo {
  export const url = "/user-info";

  export type Response200 = {
    info: {
      user_name: string;
      user_id: number;
    };
  };

  export const request = () => {
    const result = instance.get(url);
    return result as unknown as Promise<Response200>;
  };
}
