import { default as React, SetStateAction } from 'react';
export type UseInputActions = {
    setValue: React.Dispatch<SetStateAction<string>>;
    onChange: (e: React.SyntheticEvent) => void;
    clear: () => void;
};
export type UseInput = [[string, boolean], UseInputActions];
export declare function useInput(initial?: string | number | boolean): UseInput;
export default useInput;
