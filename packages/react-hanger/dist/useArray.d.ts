import { UseStateful } from './useStateful';
export type UseArray<T> = UseStateful<T[]> & {
    add: (value: T) => void;
    clear: () => void;
    move: (from: number, to: number) => void;
    removeById: (id: T extends {
        id: string;
    } ? string : T extends {
        id: number;
    } ? number : unknown) => void;
    removeIndex: (index: number) => void;
};
export declare function useArray<T = any>(initial: T[]): UseArray<T>;
export default useArray;
