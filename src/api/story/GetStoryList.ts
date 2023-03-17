import instance from "../http";

export namespace GetStortyist {
  export const url = "/story/list";

  export type Params = {
    story_name?: string;
    created_by?: string;
    project_id?: number;
    handler?: number;
    status?: string;
  };

  export type Response200 = {
    list: {
      story_id: number;
      story_name: string;
      status: string;
      project_info: { project_name: string; project_id: number };
      handler_list: { name: string; user_id: string }[];
      created_by: { name: string; user_id: string };
    }[];
  };

  export const request = (options?: { params: Params }) => {
    const result = instance.get(url, { params: options?.params });
    return result as unknown as Promise<{ data: Response200 }>;
  };
}
