import instance from "../http";

export namespace DeleteProject {
  export const url = "/project/deleted";

  export type Body = {
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
