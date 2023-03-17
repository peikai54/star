import instance from "../http";

export namespace GetStatusList {
  export const url = "/story/status";

  export type Response200 = {
    list: {
      status_name: string;
    }[];
  };

  export const request = () => {
    const result = instance.get(url);
    return result as unknown as Promise<{ data: Response200 }>;
  };
}
