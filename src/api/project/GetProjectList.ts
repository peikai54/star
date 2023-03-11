import instance from "../http";

export namespace GetProjectList {
  export const url = "/projects";

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

  export const request = () => {
    const result = instance.get(url);
    return result as unknown as Promise<{ data: Response200 }>;
  };
}
