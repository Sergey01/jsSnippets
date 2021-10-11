const nativeProxy = Proxy;
Proxy = function(target, handler) {
  
  // if handler object already has a get handler
  if (handler.get) {
    const oldGet = handler.get;  
    handler.get = function(target, prop, receiver) {
      if (prop === '__isProxy') return true;
      return oldGet(target, prop, receiver);
    }
  } else {  
    // if handler does not include get
    handler.get = handler.get = function(target, prop, receiver) {
      if (prop === '__isProxy') return true;
      return Reflect.get(target, prop, receiver);
    }
  }

  const proxiedObject = new nativeProxy(target, handler);
  
  return proxiedObject;
}
