let x = 25,
  y = 25,
  r = 25;
let render = canvas => () => {
  const context = canvas.getContext("2d");

  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.fillStyle = "#2E2225";
  context.fill();
  context.closePath();

  x += 3;
  if (x + r > canvas.width) {
    x = 25;
    y += 20;
    if (y + r > canvas.height) {
      y = 25;
    }
  }

  requestAnimationFrame(render(canvas));
};

self.onmessage = e => {
  render(e.data.canvas);
};

// export default Monster;
