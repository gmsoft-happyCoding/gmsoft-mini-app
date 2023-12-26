import * as React from 'react';
import { UseStateful } from './useStateful';
export type UseInput = UseStateful<string> & {
    onChange: (e: React.SyntheticEvent) => void;
    hasValue: boolean;
    clear: () => void;
    eventBind: {
        onChange: (e: React.SyntheticEvent) => void;
        value: string;
    };
    valueBind: {
        onChange: React.Dispatch<string>;
        value: string;
    };
};
export declare function useInput(initial?: string | number | boolean): UseInput;
export default useInput;
