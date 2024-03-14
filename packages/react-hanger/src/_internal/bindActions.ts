import type { ActionCreatorsMapObject, Dispatch } from "redux";

function bindActionCreators(
  actionCreators: ActionCreatorsMapObject,
  dispatch: Dispatch
): ActionCreatorsMapObject {
  const boundActionCreators: ActionCreatorsMapObject = {};

  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = (...args) => dispatch(actionCreator(...args));
    }
  }
  return boundActionCreators;
}

export default function <AS>(actions: AS, dispatch: Dispatch<any>) {
  const boundActionCreators = {};
  // 遍历 actions, 为了绑定 async action
  // eslint-disable-next-line no-restricted-syntax
  for (const key in actions) {
    if (Object.prototype.hasOwnProperty.call(actions, key)) {
      const actionCreator = actions[key];
      // @ts-ignore
      boundActionCreators[key] = bindActionCreators(actionCreator, dispatch);
    }
  }
  return boundActionCreators as AS;
}
