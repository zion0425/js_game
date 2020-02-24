const ViewerStatus = {
  opening: Symbol("opening"),
  guide: Symbol("guide"),
  playing: Symbol("playing"),
  ending: Symbol("ending"),
  dead: Symbol("dead")
};

class Viewer {
  initialize = canvas => {
    this.status = ViewerStatus.opening;
    this.canvas = canvas;
    this.context = canvas.getContext(this.canvas);
    // 추후 추가 예정 bg_music
    // this.background = new BgMusic(this.canvas, this.context);

    this.itemManager = new ItemManager(this.canvas);
  };

  playing = () => {
    this.score = 0;
    this.story = storyBoard.story.concat();
    this.status = ViewerStatus.playing;
    this.player = new Player(this.canvas);
    this.onKeyDirectEvent = this.player.onKeyDirectEvent;
    this.onkeyInputEvent = this.player.onkeyInputEvent;

    this.toNextStory();
  };

  // opoeing view
  opening = () => {
    clear(this.context);
    this.background.render();
    renderTxtView(this.canvas, storyBoard.txt.opening);
  };

  // guide view
  guide = () => {
    this.status = ViewerStatus.guide;
    clear(this.context);
    this.background.render();
    renderMultiTxtView(this.canvas, storyBoard.txt.guide);
  };

  ending = () => {
    renderTxtView(this.canvas, storyBoard.txt.ending);
  };

  render = () => {
    clear(this.context);
    this.background.render();
    this.playManager.render();
    this.player.render();
    this.itemManager.render();
    this.renderScore();

    this.calPosition();
    this.judgeCollisionWithBullet();
    this.judgeCollisionWithPlayer();
    this.itemManager.judgeCollision(this.player);
    this.judgeToNext();
  };

  calPosition = () => {
    this.player.calPosition();
    this.playManager.calPosition(this.player);
  };

  toNextStory = () => {
    //  shift는 맨 앞의 원소를 제거
    let story = this.story.shift();
    if (!story) {
      this.status = ViewerStatus.ending;
      return;
    }
    this.playManager = new PlayManager(this.canvas, story);
    this.itemManager.itemRule = story.itemRule;
  };

  judgeToNext = () => {
    if (this.playManager.status == PlayStatus.exit) {
      this.toNextStory();
    }
  };

  // 충돌 여부 체크
  judgeCollisionWithPlayer = () => {
    if (!this.playManager.currentWave) {
      return;
    }

    this.player.judgeCollision(this.playManager.currentWave);
    if (this.player.isLive) {
      this.status = ViewerStatus.dead;
      renderTxtView(this.canvas, storyBoard.txt.dead);
    }
  };

  judgeCollisionWithBullet = () => {
    this.player.bulletItemList.forEach(bulletItem => {
      let result = this.playManager.judgeCollision(
        bulletItem.bulletList.filter(b => b.status == BulletStatus.fire)
      );
      if (result && result.seqList && result.seqList.length > 0) {
        bulletItem.setupCollision(result.seqList);
        this.addScore(result.score);
      }
    });
  };

  addScore = score => {
    let bScore = this.score,
      aScore = this.score + score;
    this.score = aScore;
    this.itemManager.changeScore(bScore, aScore);
  };
}
