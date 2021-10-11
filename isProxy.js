// Monkey patch for the native Javascript Proxy constructor function. This adds
// a __isProxy property to any created Javascript proxies which returns true when
// accessed. This does not modify the original target object nor is there any
// other way to detect if a Proxy is being used (unless you want to go with things
// like the postMessage hack but this is cleaner).
//
// The native Proxy function can be called via "nativeProxy".

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
