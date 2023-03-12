import instance from "../http";

export namespace GetProjectList {
  export const url = "/projects";

  export type Params = {
    name?: string;
    type?: number;
    creator?: string;
    start_at?: number;
    end_at?: number;
  };

  export type Response200 = {
    list: {
      project_name: string;
      project_type: number;
      project_id: number;
      creator_id: number;
      creator_name: string;
      create_at: string;
    }[];
  };

  export const request = (options?: { params: Params }) => {
    const result = instance.get(url, { params: options?.params });
    return result as unknown as Promise<{ data: Response200 }>;
  };
}
