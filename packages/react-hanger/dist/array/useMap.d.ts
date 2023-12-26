import { Dispatch, SetStateAction } from 'react';
export type MapOrEntries<K, V> = Map<K, V> | [K, V][];
export type UseMapFunctions<K, V> = {
    setValue: Dispatch<SetStateAction<Map<K, V>>>;
    remove: (keyToRemove: K) => void;
    set: (key: K, value: V) => void;
    clear: Map<K, V>['clear'];
    initialize: (pairsOrMap: MapOrEntries<K, V>) => void;
};
export type UseMap<K, V> = [Map<K, V>, UseMapFunctions<K, V>];
export declare function useMap<K, V>(initialState?: MapOrEntries<K, V>): UseMap<K, V>;
export default useMap;
