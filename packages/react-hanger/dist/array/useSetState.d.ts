import * as React from 'react';
import { SetStateAction } from 'react';
export type UseSetStateAction<T extends object> = React.Dispatch<SetStateAction<Partial<T>>>;
export type UseSetState<T extends object> = [T, UseSetStateAction<T>];
export declare function useSetState<T extends object>(initialValue: T): UseSetState<T>;
export default useSetState;
