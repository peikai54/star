import instance from "../http";

export namespace AddStore {
  export const url = "/story/add";

  export type Body = {
    story_name: string;
    handler?: number[];
    status: string;
    created_by: number;
    project_id: number;
  };

  export type Response200 = {
    message: string;
  };

  export const request = (options?: { body: Body }) => {
    const result = instance.post(url, {
      ...options?.body,
    });
    return result as unknown as Promise<Response200>;
  };
}
