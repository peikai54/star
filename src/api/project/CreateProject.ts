import instance from "../http";

export namespace CreateProject {
  export const url = "/add-project";

  export type Body = {
    user_id: number;
    project_name: string;
    project_type: number;
  };

  export type Response200 = {
    message: string;
  };

  export const request = (options?: { body: Body }) => {
    const result = instance.post(url, {
      ...options?.body,
      headers: { "content-type": "application/json" },
    });
    return result as unknown as Promise<Response200>;
  };
}
