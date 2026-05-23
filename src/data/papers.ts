export type Paper = {
  id: string;
  title: string;
  author: string;
  year: number;
  language:
    | "汉文"
    | "英文"
    | "俄文"
    | "日文"
    | "蒙古文"
    | "藏文"
    | "波斯文"
    | "阿拉伯文"
    | "土耳其文"
    | "哈萨克文";
  region:
    | "新疆"
    | "内蒙古"
    | "西藏"
    | "青海"
    | "中亚"
    | "南亚"
    | "俄罗斯"
    | "东欧"
    | "伊朗";
  field:
    | "蒙古学"
    | "突厥学"
    | "满学"
    | "藏学"
    | "西夏学"
    | "中亚史"
    | "金帐汗国"
    | "蒙古帝国";
  keywords: string[];
  abstract: string;
  sourceUrl: string;
};

export const papers: Paper[] = [];

export const paperLanguages = [
  "汉文",
  "英文",
  "俄文",
  "日文",
  "蒙古文",
  "藏文",
  "波斯文",
  "阿拉伯文",
  "土耳其文",
  "哈萨克文",
] as const;

export const paperFields = [
  "蒙古学",
  "突厥学",
  "满学",
  "藏学",
  "西夏学",
  "中亚史",
  "金帐汗国",
  "蒙古帝国",
] as const;

export const paperRegions = [
  "新疆",
  "内蒙古",
  "西藏",
  "青海",
  "中亚",
  "南亚",
  "俄罗斯",
  "东欧",
  "伊朗",
] as const;
