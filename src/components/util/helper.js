
export function viewport() {
  //https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
  return {
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  }
}


