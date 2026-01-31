
console.log("POLYFILL: Executing polyfill.js");
const RN = require('react-native');
const { Dimensions, Keyboard } = RN;

console.log("POLYFILL: Checking Dimensions");
// Polyfill for Dimensions.removeEventListener (removed in React Native 0.65+)
if (typeof Dimensions.removeEventListener !== 'function') {
  console.log("POLYFILL: Patching Dimensions.removeEventListener");
  const dimensionListeners = new Map()
  const originalAddEventListener = Dimensions.addEventListener

  Dimensions.addEventListener = (type, handler) => {
    const subscription = originalAddEventListener(type, handler)
    if (type === 'change') {
      dimensionListeners.set(handler, subscription)
    }
    return subscription
  }

  Dimensions.removeEventListener = (type, handler) => {
    if (type === 'change') {
      const subscription = dimensionListeners.get(handler)
      if (subscription) {
        if (subscription.remove) {
          subscription.remove()
        }
        dimensionListeners.delete(handler)
      }
    }
  }
}

console.log("POLYFILL: Checking Keyboard");
// Polyfill for Keyboard.removeListener (removed in React Native 0.70+)
if (Keyboard) {
    console.log("POLYFILL: Keyboard exists. removeListener type: " + typeof Keyboard.removeListener);
    if (!Keyboard.removeListener) {
        console.log("POLYFILL: Patching Keyboard.removeListener");
        const _addListener = Keyboard.addListener
        const _keyboardListeners = new Map()

        Keyboard.addListener = (eventName, callback) => {
            console.log("POLYFILL: Keyboard.addListener called for " + eventName);
            const subscription = _addListener.call(Keyboard, eventName, callback)
            let listenerMap = _keyboardListeners.get(eventName)
            if (!listenerMap) {
            listenerMap = new Map()
            _keyboardListeners.set(eventName, listenerMap)
            }
            listenerMap.set(callback, subscription)
            return subscription
        }

        Keyboard.removeListener = (eventName, callback) => {
            console.log("POLYFILL: Keyboard.removeListener called for " + eventName);
            const listenerMap = _keyboardListeners.get(eventName)
            if (listenerMap) {
            const subscription = listenerMap.get(callback)
            if (subscription) {
                subscription.remove()
                listenerMap.delete(callback)
            }
            }
        }
    }
} else {
    console.error("POLYFILL: Keyboard object missing!");
}
console.log("POLYFILL: Finished polyfill.js");
