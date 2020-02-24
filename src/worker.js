importScripts("./util/Util.js");
importScripts("./Player");

const canvas = document.getElementById("canvas");

const offscreen = canvas.transferControlToOffscreen();

var blob = new Blob([document.getElementById("worker").textContent]);
var worker = new Worker(window.URL.createObjectURL(blob));
worker.postMessage({ cavnas: offscreen }, [offscreen]);
