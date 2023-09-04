import { create } from "dva-core";
import type {
  Store,
  Reducer,
  Action,
  AnyAction,
  ReducersMapObject,
} from "redux";
import createLoading from "dva-loading";

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
export type EffectWithType = [Effect, { type: EffectType }];
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

// model namespace cache
const cached = {};

let stateContainer: any = wx["_stateContainer_"];

// eslint-disable-next-line no-console
const defaultOnError = (err: any) => console.error(err);

interface ArgsI {
  NODE_ENV?: string;
  onError?: (err: any) => void;
}

function createStateContainer({
  NODE_ENV = "production",
  onError = defaultOnError,
}: ArgsI = {}) {
  if (stateContainer) return stateContainer as StateContainer;

  wx["_stateContainer_"] = stateContainer = create({ onError });

  stateContainer.use(createLoading());

  /**
   * dynamic inject dva model to stateContainer
   * if replace=true, same namespace model will be replaced
   */
  stateContainer.injectModel = (model: Model, replace = false) => {
    // @ts-ignore
    const m = model.default || model;
    if (replace || NODE_ENV === "development") {
      // Replace a model if it exsits, if not, add it to app
      stateContainer.replaceModel(m);
    } else if (!cached[m.namespace]) {
      stateContainer.model(m);
    }
    cached[m.namespace] = 1;
    return m;
  };

  stateContainer.start();

  return stateContainer as StateContainer;
}

const dvaContainer = createStateContainer({
  NODE_ENV: process.env.NODE_ENV,
  onError: (err) => {
    console.error(err);
  },
});

export default dvaContainer;
