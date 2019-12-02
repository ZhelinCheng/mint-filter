import { Tree } from './core';
export interface FilterValue {
    text?: string | boolean;
    filter: Array<string | undefined>;
    pass?: boolean;
}
declare class Mint extends Tree {
    constructor(keywords: Array<string | number>);
    private searchKey;
    private filterFunc;
    /**
     * 异步快速检测字符串是否无敏感词
     * @param word
     */
    every(word: string): Promise<boolean>;
    /**
     * 同步快速检测字符串是否无敏感词
     * @param word
     */
    validator(word: string): boolean;
    everySync(word: string): boolean;
    /**
     * 同步过滤方法
     * @param word
     * @param replace
     */
    filterSync(word: string, replace?: boolean): FilterValue;
    /**
     * 异步过滤方法
     * @param word
     * @param replace
     */
    filter(word: string, replace?: boolean): Promise<FilterValue>;
}
export default Mint;
