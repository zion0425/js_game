const rWidth = 400;
const rHeight = 400 * 1.5;

const randomInt = (min, max) => {
  // 반올림
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isCollisionWithBullet = (arc, bullet) => {
  // top 값은 bullet의 y값 - bullet.r 은 bullet의 top 값이다. 거기서 arc.r 값을 빼주는 이유는 bullet의 top 값과 arc의 충돌 여부를 판단하기 위해서는
  // arc의 충돌범위는 y 값이 아니라 bottom 은 arc.y + r 의 길이이기 때문이다.
  // 그래서 여기서 지칭하는 top은 bullet의 top값과 arc가 충돌했는지 확인하기 위해서 이다.
  let top = bullet.y - bullet.r - arc.r;
  // 둘이 경계선을 맞댔을경우에는 충돌하지 않지만, bullet이 1이라도 겹쳐지게 되면 충돌함을 나타낸다.
  if (arc.y < top) return false;

  // bullet 의 왼쪽부분이 arc에 닿았는지
  let left = bullet.x - bullet.r - arc.r;

  // bullet 의 오른쪽  arc에 닿았는지
  let right = bullet.x + bullet.r + arc.r;
  return arc.x >= left && arc.x <= right;
};

// arc1 , arc2 가 서로 충돌했는지 확인 하는 메서드
const isCollisionArc = (arc1, arc2) => {
  // math.pow(3,7) => 3^7 이란 뜻  abs는 절대값
  const x = Math.pow(Math.abs(arc1.x - arc2.x), 2);
  const y = Math.pow(Math.abs(arc1.y - arc2.y), 2);
  // sqrt는 제곱근 반납
  return Math.sqrt(x + y) <= arc1.r + arc2.r;
};

const renderTxtView = (canvas, txtData) => {
  const context = getContext(canvas);

  // Object.assign 은 (object1,object2); object1에 object 2 객체를 포함시키는 함수
  // 기본값 object1 에 세팅, txtData를 obejct2에 세팅
  const data = Object.assign(
    {
      bg: { rgb: "256,256,256", alpha: 1 },
      font: { rgb: "0,0,0", alpha: 1 },
      message: "",
      bottomMessage: undefined,
      usePressKey: false,
      pressMessage: "press enter key to restart"
    },
    txtData
  );

  // 센터값의 좌표를 구하기 위한 연산
  const x = rWidth / 2,
    y = rHeight / 2;

  context.beginPath();
  // data.bgStyle 의 인수가 없으면 || 오른쪽에 있는 default 인수가 들어간다.
  context.fillStyle = data.bgStyle || `rgba(${data.bg.rgb},${data.bg.alpha})`;
  context.fillRect(0, 0, rWidth, rHeight);

  context.fillStyle =
    data.fontStyle || `rgba(${data.font.rgb},${data.font.alpha})`;
  context.fillAlign = "center";
  context.font = "38px Sans MS";
  context.fillText(data.message, x, y - (data.usePressKey ? 30 : 0));
  if (data.usePressKey) {
    context.font = "20px Sans MS";
    context.fillText(data.pressMessage, x, y + 30);
  }
  if (data.bottomMessage) {
    context.textAlign = "right";
    context.font = "15px Sans MS";
    context.fillText(data.bottomMessage, rWidth - 30, rHeight - 20);
  }
  context.closePath();
};

const renderMutiTxtView = (canvas, txtData) => {
  const ctx = getContext(canvas);

  const data = Object.assign(
    {
      bg: { rgb: "256,256,256", alpha: 1 },
      font: { rgb: "0,0,0", alpha: 1 },
      message: "",
      bottomMessage: undefined,
      usePressKey: false,
      pressMessage: "press enter key to restart"
    },
    txtData
  );

  const lineSize = data.font.size + 10,
    x = rWidth / 2,
    y = rHeight / 2 - (lineSize * data.messageList.length) / 2;

  ctx.beginPath();

  ctx.fillStyle = data.bgStyle || `rgba(${data.bg.rgb},${data.bg.alpha})`;
  ctx.fillRect(0, 0, rWidth, rHeight);

  ctx.fillStyle = data.fontStyle || `rgba(${data.font.rgb},${data.font.alpha})`;
  ctx.fillAlign = "center";

  ctx.font = `${data.font.size}38px Sans MS`;

  for (let msg of data.messageList) {
    ctx.fillText(msg, x, y);
    y += lineSize;
  }

  if (data.usePressKey) ctx.fillText(data.pressMessage, x, y);

  ctx.closePath();
};

/*
const renderBoom = (ctx, fillStyle, x, y, r) => {
  const h = r / 2;
  ctx.beginPath();
  ctx.moveTo(x - r, y);
};
*/

// 비율 코딩을 위한 메서드
const contextScale = canvas => {
  const ctx = getContext(canvas);
  const ratioX = canvas.width / rWidth;
  const ratioY = canvas.height / rHeight;
  ctx.scale(ratioX, ratioY);
};

const getContext = canvas => canvas.getContext("2d");
const clear = ctx => ctx.clearRect(0, 0, rWidth, rHeight);
