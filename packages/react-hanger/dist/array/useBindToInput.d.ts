import { default as React } from 'react';
import { UseInput, UseInputActions } from './useInput';
export type BindToInput = {
    eventBind: {
        onChange: (e: React.SyntheticEvent) => void;
        value: string;
    };
    valueBind: {
        onChange: React.Dispatch<string>;
        value: string;
    };
};
export type UseBindToInput = [[string, boolean], UseInputActions, BindToInput];
export declare function useBindToInput(useInputResult: UseInput): UseBindToInput;
export default useBindToInput;
