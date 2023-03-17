import instance from "../http";

export namespace GetUserList {
  export const url = "/user/list";

  export type Response200 = {
    list: {
      user_name: string;
      user_id: number;
    }[];
  };

  export const request = () => {
    const result = instance.get(url);
    return result as unknown as Promise<{ data: Response200 }>;
  };
}
