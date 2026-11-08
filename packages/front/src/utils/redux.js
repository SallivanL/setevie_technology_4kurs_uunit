/**
 * Хелпер, вернет функцию, которая состояние разносит по ключам селкторов
 * @param selectorMap
 * @example bindSelectors({ data1: <selector_func>, data2: <selector_func> })
 */
export const bindSelectors = selectorMap => state =>
  Object.entries(selectorMap).reduce((acc, [key, selector]) => {
    acc[key] = selector(state);
    return acc;
  }, {});