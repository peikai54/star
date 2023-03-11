import type { GetProjectList } from "../api/project/GetProjectList";

export type IProject = GetProjectList.Response200["list"]["0"] & {
  type_name: string;
};

export const handleProjectList = (list: GetProjectList.Response200["list"]) => {
  const result: IProject[] = [];
  list?.forEach((el) =>
    result?.push({
      ...el,
      type_name: el.project_type === 1 ? "基本类型" : "测试项目",
    })
  );
  return result;
};
