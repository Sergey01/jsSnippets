// Monkey patch for the native Javascript Proxy constructor function. This stores
// every created proxy as a key in a Map with the original object stored as the
// value. This should not be used in proxy intensive production sites as this does
// not use a WeakMap so this will impede garbage collection as the Map will retain
// references to objects (proxies and their targets) that would have otherwise been
// removed from memory.
//
// The native Proxy function can be called via "nativeProxy".

const proxyMap = new Map();

const nativeProxy = Proxy;

Proxy = function(target, handler) {
  
  const originalObject = target;

  const proxiedObject = new nativeProxy(target, handler);

  proxyMap.set(proxiedObject, originalObject);
  
  return proxiedObject;
}
