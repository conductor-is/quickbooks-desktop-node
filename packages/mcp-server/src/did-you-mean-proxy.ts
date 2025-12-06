import Fuse from 'fuse.js';

const allKinds = ['string', 'number', 'boolean', 'object', 'array', 'method', 'constructor'] as const;
type Kind = (typeof allKinds)[number];

const nodeInspect = Symbol.for('nodejs.util.inspect.custom');
const denoInspect = Symbol.for('Deno.customInspect');

const stringMethods = new Set(Reflect.ownKeys(String.prototype).filter((k) => typeof k === 'string'));
const numberMethods = new Set(Reflect.ownKeys(Number.prototype).filter((k) => typeof k === 'string'));
const arrayMethods = new Set(Reflect.ownKeys(Array.prototype).filter((k) => typeof k === 'string'));

function getApplyKinds(name?: string | symbol): readonly Kind[] {
  if (!name || name === nodeInspect || name === denoInspect) {
    return allKinds;
  }

  if (name === Symbol.toPrimitive || name === 'toString' || name === 'valueOf') {
    return ['string', 'number', 'boolean'];
  }

  if (name === Symbol.iterator) {
    return ['array'];
  }

  if (typeof name !== 'string') {
    return ['method'];
  }

  const kinds: Kind[] = [];
  if (stringMethods.has(name)) {
    kinds.push('string');
  } else if (numberMethods.has(name)) {
    kinds.push('number');
  } else if (arrayMethods.has(name)) {
    kinds.push('array');
  }

  return kinds.length > 0 ? kinds : ['method'];
}

type KindPaths = Record<Kind, string[]>;

function traverseKinds(
  obj: object,
  path: string = '',
  result: KindPaths = {
    string: [],
    number: [],
    boolean: [],
    object: [],
    array: [],
    method: [],
    constructor: [],
  },
): KindPaths {
  while (obj !== null) {
    for (const key of Reflect.ownKeys(obj)) {
      if (typeof key !== 'string') {
        continue;
      }

      if (key === 'constructor') {
        continue;
      }

      if (!/^[a-zA-Z]/.test(key)) {
        continue;
      }

      const value = Reflect.get(obj, key);
      let kind: Kind;

      switch (typeof value) {
        case 'string': {
          kind = 'string';
          break;
        }
        case 'number':
        case 'bigint': {
          kind = 'number';
          break;
        }
        case 'boolean': {
          kind = 'boolean';
          break;
        }
        case 'object': {
          if (value === null) {
            continue;
          }
          kind = Array.isArray(value) ? 'array' : 'object';
          break;
        }
        case 'function': {
          kind =
            key === value.name && value.name === value.prototype?.constructor?.name ?
              'constructor'
            : 'method';
          break;
        }
        default: {
          continue;
        }
      }

      const fullKey = path ? `${path}.${key}` : key;
      result[kind].push(fullKey);

      if (kind === 'object') {
        traverseKinds(value, fullKey, result);
      } else if (kind === 'array' && value.length > 0) {
        traverseKinds(value[0], `${fullKey}[]`, result);
      }
    }

    obj = Object.getPrototypeOf(obj);
    if (obj === Object.prototype || obj === Array.prototype) {
      break;
    }
  }

  return result;
}

export type MakeError = (props: {
  expected: readonly Kind[];
  rootPath: (string | symbol)[];
  path: (string | symbol)[];
  suggestions: { item: string; score: number }[];
}) => string;

export type ProxyConfig = {
  /**
   * Whether to also proxy the return values. They will be proxied with
   * the same config, except the root path will be blank. Defaults to true.
   */
  proxyReturn?: boolean;
  /**
   * The path to the root object, prepended to path suggestions. For example,
   * if this is set to ['client'], then suggestions will be 'client.repos.list',
   * 'client.users.list', etc.
   */
  rootPath?: (string | symbol)[];
  /**
   * Customize the error message to be thrown. The root path will not be
   * prepended to either the path or the suggestions.
   */
  makeSuggestionError?: MakeError;
};

function shouldProxy(value: unknown): value is NonNullable<object> {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

const emptyTargetSymbol = Symbol.for('did-you-mean-proxy.emptyTargetPath');

type EmptyTarget = {
  [emptyTargetSymbol]: {
    getError: () => string;
  };
};
type EmptyTargetInfo = EmptyTarget[typeof emptyTargetSymbol];

/**
 * We use a special empty target so we can catch calls and constructions.
 * Also useful for de-proxying in the end; if we get an empty target, we know
 * we can throw an error.
 */
function createEmptyTarget(info: EmptyTargetInfo): EmptyTarget {
  const emptyTarget = function () {} as any;
  emptyTarget[nodeInspect] = () => {
    throw info.getError();
  };
  emptyTarget[denoInspect] = () => {
    throw info.getError();
  };
  emptyTarget[emptyTargetSymbol] = info;
  return emptyTarget;
}

function isEmptyTarget(value: unknown): value is EmptyTarget {
  return typeof value === 'function' && (value as any)[emptyTargetSymbol] !== undefined;
}

export const defaultMakeError: MakeError = function ({ expected, rootPath, path, suggestions }) {
  const rootPathString =
    rootPath.length > 0 ? `${rootPath.filter((p) => typeof p === 'string').join('.')}.` : '';
  const pathString = `'${rootPathString}${path.filter((p) => typeof p === 'string').join('.')}'`;

  let header = `${pathString} does not exist.`;
  if (expected.length === 1) {
    const expectedType =
      expected[0] === 'array' ? 'an array'
      : expected[0] === 'object' ? 'an object'
      : expected[0] === 'method' ? 'a function'
      : `a ${expected[0]}`;
    header = `${pathString} is not ${expectedType}.`;
  }

  const suggestionStrings = suggestions
    // TODO(sometime): thresholding?
    .filter((suggestion) => suggestion.score < 1)
    .slice(0, 5)
    .map((suggestion) => `'${rootPathString}${suggestion.item}'`);

  let body = '';
  if (suggestionStrings.length === 1) {
    body = `Did you mean ${suggestionStrings[0]}?`;
  } else if (suggestionStrings.length > 1) {
    const commas = suggestionStrings.slice(0, suggestionStrings.length - 1).join(', ');
    body = `Did you mean ${commas}, or ${suggestionStrings[suggestionStrings.length - 1]}?`;
  }

  return body ? `${header} ${body}` : header;
};

export const debugMakeError: MakeError = function ({ expected, path, suggestions }) {
  return `path ${path.filter((p) => typeof p === 'string').join('.')}; expected ${expected.join(', ')}
${suggestions
  .slice(0, 10)
  .map((suggestion) => `  - [${suggestion.score.toFixed(2)}] ${suggestion.item}`)
  .join('\n')}
`;
};

const proxyToObj = new WeakMap<any, any>();

export function makeProxy<Root extends object>(root: Root, config: ProxyConfig = {}): Root {
  let kindPaths: KindPaths | null = null;

  config.proxyReturn ??= true;
  config.rootPath ??= [''];
  config.makeSuggestionError ??= defaultMakeError;

  const { proxyReturn, rootPath, makeSuggestionError } = config;
  const { rootPath: _, ...subconfig } = config;

  function makeError(pathWithRoot: (string | symbol)[], expected: readonly Kind[]) {
    if (!kindPaths) {
      kindPaths = traverseKinds(root);
    }

    const fuse = new Fuse(
      expected.flatMap((kind) => kindPaths![kind]),
      { includeScore: true },
    );

    const path = pathWithRoot.slice(rootPath.length);
    const searchKey: string[] = [];
    for (const key of path) {
      // Convert array keys to []:
      if (/^\d+$/.test(key.toString())) {
        searchKey.push('[]');
      } else if (typeof key === 'string') {
        searchKey.push('.');
        searchKey.push(key);
      }
    }

    const key = searchKey.join('');
    const suggestions = fuse.search(key.slice(1)) as { item: string; score: number }[];

    return makeSuggestionError({ expected, rootPath, path, suggestions });
  }

  function subproxy<T extends object>(obj: T, path: (string | symbol)[]): T {
    const handlers: ProxyHandler<T> = {
      get(target, prop, receiver) {
        const newPath = [...path, prop];
        const value = Reflect.get(target, prop, receiver);

        if (value === undefined && !Reflect.has(target, prop)) {
          // Some common special cases:
          // - 'then' is called on a non-thenable.
          // - 'toJSON' is called when it's not defined.
          // In these cases, we actually want to return undefined, so we
          // resolve to the top-level thing.
          if (prop === 'then' || prop === 'toJSON') {
            return undefined;
          }

          return subproxy(
            createEmptyTarget({
              getError: () => makeError(newPath, allKinds),
            }),
            newPath,
          );
        }

        return shouldProxy(value) ? subproxy(value, newPath) : value;
      },
      construct(target, args, newTarget) {
        if (isEmptyTarget(target) || typeof target !== 'function') {
          throw new Error(makeError(path, ['constructor']));
        }

        const result = Reflect.construct(target, args, newTarget);

        return proxyReturn && shouldProxy(result) ? makeProxy(result, subconfig) : result;
      },
      apply(target, thisArg, args) {
        if (isEmptyTarget(target) || typeof target !== 'function') {
          throw new Error(makeError(path, getApplyKinds(path[path.length - 1])));
        }

        const correctThisArg = proxyToObj.get(thisArg) ?? thisArg;
        const proxiedArgs =
          proxyReturn ? args.map((arg) => (shouldProxy(arg) ? makeProxy(arg, subconfig) : arg)) : args;
        const result = Reflect.apply(target, correctThisArg, proxiedArgs);

        return proxyReturn && shouldProxy(result) ? makeProxy(result, subconfig) : result;
      },
    };

    // All other traps demand a non-empty target:
    for (const trap of [
      'defineProperty',
      'has',
      'set',
      'deleteProperty',
      'ownKeys',
      'getPrototypeOf',
      'setPrototypeOf',
      'isExtensible',
      'preventExtensions',
      'getOwnPropertyDescriptor',
    ] as const) {
      handlers[trap] = function (target: any, ...args: any[]) {
        if (isEmptyTarget(target)) {
          throw new Error(makeError(path, allKinds));
        }

        return (Reflect[trap] as any)(target, ...args);
      };
    }

    const proxy = new Proxy(obj, handlers);
    proxyToObj.set(proxy, obj);

    return proxy;
  }

  return subproxy(root, rootPath);
}

export function deproxy<T>(value: T): T {
  // Primitives never get proxied, so these are safe:
  if (typeof value !== 'object' && typeof value !== 'function') {
    return value;
  }
  if (isEmptyTarget(value)) {
    throw new Error(value[emptyTargetSymbol].getError());
  }
  return proxyToObj.get(value) ?? value;
}
