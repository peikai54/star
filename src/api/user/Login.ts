import instance from "../http";

export namespace Login {
  export const url = "/login";

  export type Body = {
    user_name: string;
    password: string;
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
