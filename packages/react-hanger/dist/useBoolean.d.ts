import * as React from 'react';
import { SetStateAction } from 'react';
export type UseBoolean = {
    value: boolean;
    setValue: React.Dispatch<SetStateAction<boolean>>;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
};
export declare function useBoolean(initial: boolean): UseBoolean;
export default useBoolean;
