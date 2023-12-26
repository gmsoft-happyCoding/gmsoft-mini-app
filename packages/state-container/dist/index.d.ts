import type { Store, Reducer, Action, AnyAction, ReducersMapObject } from "redux";
export interface ReducerEnhancer {
    (reducer: Reducer<any>): void;
}
export interface EffectsCommandMap {
    put: <A extends AnyAction>(action: A) => any;
    call: Function;
    select: Function;
    take: Function;
    cancel: Function;
    [key: string]: any;
}
export interface Dispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): Promise<any> | T;
}
export interface SubscriptionAPI {
    dispatch: Dispatch<any>;
}
export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
export interface EffectsMapObject {
    [key: string]: Effect | EffectWithType;
}
export type EffectType = "takeEvery" | "takeLatest" | "watcher" | "throttle";
export type EffectWithType = [Effect, {
    type: EffectType;
}];
export type Subscription = (api: SubscriptionAPI, done: Function) => void;
export type ReducersMapObjectWithEnhancer = [
    ReducersMapObject,
    ReducerEnhancer
];
export interface SubscriptionsMapObject {
    [key: string]: Subscription;
}
export interface Model {
    namespace: string;
    state?: any;
    reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer;
    effects?: EffectsMapObject;
    subscriptions?: SubscriptionsMapObject;
}
export interface StateContainer {
    _store: Store<any>;
    injectModel: (model: Model, replace?: boolean) => Model;
}
interface ArgsI {
    NODE_ENV?: string;
    onError?: (err: any) => void;
}
declare function createStateContainer({ NODE_ENV, onError, }?: ArgsI): StateContainer;
export default createStateContainer;
