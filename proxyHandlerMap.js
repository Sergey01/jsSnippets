// proxyHandlerMap.js

const proxyHandlerMap = new Map();

const nativeProxy = Proxy;

Proxy = function(target, handler) {

  const proxiedObject = new nativeProxy(target, handler);

  proxyHandlerMap.set(proxiedObject, handler);
  
  return proxiedObject;
}
