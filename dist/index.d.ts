import { Tree } from './core';
export interface FilterValue {
    text?: string | boolean;
    wrods: Array<string | undefined>;
    pass?: boolean;
}
interface FilterOptions {
    replace?: boolean;
    words?: boolean;
    every?: boolean;
}
interface OptionsType {
    transform: 'none' | 'capital' | 'lower';
}
declare class Mint extends Tree {
    private options;
    constructor(keywords?: Array<string | number>, options?: OptionsType);
    /**
     * 收集敏感词
     * @param node 节点
     */
    private collectWord;
    /**
     * 筛选方法
     * @param word 文字
     * @param every 验证全部
     * @param replace 是否替换
     */
    private filterFunc;
    /**
     * 快速验证是否存在敏感词
     * @param text 文本
     */
    validator(text: string): boolean;
    /**
     * 过滤方法
     * @param text 文本
     * @param options 选项
     */
    filterSync(text: string, options?: FilterOptions): FilterValue;
    /**
     * 异步过滤方法
     * @param text 文本
     * @param options 选项
     */
    filter(text: string, options?: FilterOptions): Promise<FilterValue>;
}
export default Mint;
