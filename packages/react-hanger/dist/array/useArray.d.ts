import { UseStateful } from '../useStateful';
export type UseArrayActions<T> = {
    setValue: UseStateful<T[]>['setValue'];
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
export type UseArray<T = any> = [T[], UseArrayActions<T>];
export declare function useArray<T = any>(initial: T[]): UseArray<T>;
export default useArray;
