// Hijacks built-in Javascript Proxy function temporarily and, when a new Proxy
// is constructed this console logs the target object as well as the handler
// object. It then removes the hijack. This is good for single-use Proxy inspection.

interceptedProxyBool = false;

nativeProxy = Proxy;

Proxy = function(target, handler) {
	if (interceptedProxyBool) {
		Proxy = nativeProxy;
		return new Proxy(target, handler);
	};
	console.log(`Target:`);
	console.log(target);
	console.log(`Handler:`);
	console.log(handler);
	proxy = new nativeProxy(target, handler);
	interceptedProxyBool = true;
	return proxy;
}