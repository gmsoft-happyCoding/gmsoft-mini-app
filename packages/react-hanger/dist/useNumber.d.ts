import { UseStateful } from './useStateful';
export type UseNumber = UseStateful<number> & {
    increase: (value?: number) => void;
    decrease: (value?: number) => void;
};
export declare function useNumber(initial: number, { upperLimit, lowerLimit, loop, step, }?: {
    upperLimit?: number;
    lowerLimit?: number;
    loop?: boolean;
    step?: number;
}): UseNumber;
export default useNumber;
