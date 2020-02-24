class Player {
  constructor(canvas) {
    this.canvas = canvas;
    // this.context = getContext(canvas);
    this.context = canvas.getContext("2d");

    this.s = 3;

    this.r = 10;

    this.x = canvas.getWidth / 2;
    this.y = canvas.getHeight - this.r - 5;
    this.isDirectKeyPress = false;
    this.directKey = undefined;
    this.moveX = undefined;
    this.isInputKeyPress = false;
    this.inputKey = undefined;
    // this.bulletItemList = [new BasicBullet(canvas)];

    this.fireTerm = 0;
    this.isLive = true;
  }

  onKeyDirectKeyPress(eventName, key) {
    this.isDirectKeyPress = eventName === "keydown";
    this.directKey = this.isDirectKeyPress ? key : undefined;
  }

  render() {
    this.drawBody();
    this.drawMouse();
    this.drawEyes();
  }

  drawBody() {
    // 선을 그리기 시작
    this.context.beginPath();

    // arc -> 타원
    // x좌표, y좌표, r, 시작 앵글, 종료 앵글(r값), 원을그릴 방향

    this.context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);

    // 원의 색상
    // fill 함수 사용시 자동으로 선의 시작/종료지점이 이어짐

    this.context.fillStyle = "#5FAA23";
    this.context.fill();

    this.context.strokeStyle = "rgba(0,0,255,0.5)";
    this.context.stroke();

    this.context.closePath();
  }

  drawMouse() {
    this.context.beginPath();

    this.context.arc(this.x, this.y + 3, 5, 0, Math.PI, false);

    this.context.fillStyle = "#ffffff";
    this.context.fill();

    this.context.closePath();
  }

  drawEyes() {
    this.context.beginPath();
    this.context.arc(this.x - 4, this.y - 2, 2, 0, Math.PI * 2, false);

    this.context.fillStyle = "#ffffff";
    this.context.fill();

    this.context.arc(this.x + 4, this.y - 2, 2, 0, Math.PI * 2, false);
    this.context.fillStyle = "#ffffff";
    this.context.fill();

    this.context.closePath();
  }
}
let canvas = document.getElementById("canvas");
let u = new Player(canvas);

u.render();

// // window.onkeydown = () => {
// //   console.log(event.keyCode);
// // };

// // 화면이 resizing 되면 자동으로 real 사이즈 조정
// // 실제 canvas 넓이와 그림 비율을 조정하기 위해 scale값 조정을 위한 함수
// /*
// window.onresize = () => {
//   const widthR = canvas.clientWidth / 400;
//   const heightR = canvas.clientWidth / 600;
//   console.log({ widthR, heightR });
// };
// */
