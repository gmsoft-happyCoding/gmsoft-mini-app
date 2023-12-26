import { default as React, SetStateAction } from 'react';
export type UseNumberActions = {
    setValue: React.Dispatch<SetStateAction<number>>;
    increase: (value?: number) => void;
    decrease: (value?: number) => void;
};
export type UseNumber = [number, UseNumberActions];
export declare function useNumber(initial: number, { upperLimit, lowerLimit, loop, step, }?: {
    upperLimit?: number;
    lowerLimit?: number;
    loop?: boolean;
    step?: number;
}): UseNumber;
export default useNumber;
