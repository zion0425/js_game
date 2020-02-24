class ItemManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.itemRule = { step: -1, itemList: [] };
    this.itemList = [];
  }

  changeScore = (bScore, aScore) => {
    let { step, itemList } = this.itemRule;
    if (step == -1 || (itemList || []).length < 1 || aScore < step) {
      return;
    }

    if (bScore % step > aScore % step) {
      let bulletClazz = itemList[randomInt(0, itemList.length - 1)];
      this.addItem(new bulletClazz(this.canvas));
    }
  };

  addItem = item => {
    let x = randomInt(50, rWidth - 50),
      s = 3;
    let { canvas } = this;
    this.itemList.push(Item.create(item)({ x, s })({ canvas }));
  };
}
