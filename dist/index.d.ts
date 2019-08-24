/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
import { Tree } from './core';
interface FilterValue {
    text?: string | boolean;
    filter: Array<string>;
    pass?: boolean;
}
export default class Mint extends Tree {
    constructor(keywords: Array<string>);
    _filterFn(word: string, every?: boolean, replace?: boolean): FilterValue;
    /**
     * 异步快速检测字符串是否无敏感词
     * @param word
     */
    every(word: string): Promise<boolean>;
    /**
     * 同步快速检测字符串是否无敏感词
     * @param word
     */
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
export {};
