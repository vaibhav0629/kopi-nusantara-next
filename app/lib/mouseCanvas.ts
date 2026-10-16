const initRadius = 8;
const initlWidth = 1;
const initColor = "#a36e49bb";

export class MouseCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lwidth: number;
  color: string;
  radius: number;
  length: number;
  currIdx: number;
  alive: number;
  X1Arr!: Float32Array;
  X2Arr!: Float32Array;
  Y1Arr!: Float32Array;
  Y2Arr!: Float32Array;

  constructor(canvas: HTMLCanvasElement, n = 10) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.lwidth = initlWidth;
    this.color = initColor;
    this.radius = initRadius;
    this.length = n;

    this.resizeCanvas();

    this.currIdx = 0;
    this.alive = 0;
    this.createArray();
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.setLineWidthnColor(this.lwidth, this.color);
  }

  setLineWidthnColor(lwidth: number, color: string) {
    this.lwidth = lwidth;
    this.color = color;
    this.ctx.lineWidth = lwidth;
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
  }

  createArray() {
    this.X1Arr = new Float32Array(this.length);
    this.X2Arr = new Float32Array(this.length);
    this.Y1Arr = new Float32Array(this.length);
    this.Y2Arr = new Float32Array(this.length);
  }

  recordMouse(curX: number, curY: number, prevX: number, prevY: number) {
    const angleBottom = Math.atan2(curY - prevY, curX - prevX);
    const angleTop = 0.5 * Math.PI - angleBottom;
    const newCordX1 = Math.cos(angleTop) * this.radius + curX;
    const newCordY1 = -Math.sin(angleTop) * this.radius + curY;
    const newCordX2 = -Math.cos(angleBottom) * this.radius + curX;
    const newCordY2 = Math.sin(angleBottom) * this.radius + curY;

    this.currIdx++;
    this.currIdx %= this.length;
    this.alive = this.alive + 1 > this.length ? this.length : this.alive + 1;
    this.X1Arr[this.currIdx] = newCordX1 > 0 ? newCordX1 : 0;
    this.X2Arr[this.currIdx] = newCordX2 > 0 ? newCordX2 : 0;
    this.Y1Arr[this.currIdx] = newCordY1 > 0 ? newCordY1 : 0;
    this.Y2Arr[this.currIdx] = newCordY2 > 0 ? newCordY2 : 0;
  }

  updateArray() {
    if (this.alive > 0) this.alive--;
    if (this.alive < 2) return;

    const idx = this.currIdx;
    const last = this.alive - 1;

    for (let k = 0; k <= last; k++) {
      const i = (idx - k + this.length) % this.length;
      const mx = (this.X1Arr[i] + this.X2Arr[i]) / 2;
      const my = (this.Y1Arr[i] + this.Y2Arr[i]) / 2;
      const t = k / last;

      this.X1Arr[i] += (mx - this.X1Arr[i]) * t;
      this.X2Arr[i] += (mx - this.X2Arr[i]) * t;
      this.Y1Arr[i] += (my - this.Y1Arr[i]) * t;
      this.Y2Arr[i] += (my - this.Y2Arr[i]) * t;
    }

    const tip = (idx - last + this.length) % this.length;
    const tx = (this.X1Arr[tip] + this.X2Arr[tip]) / 2;
    const ty = (this.Y1Arr[tip] + this.Y2Arr[tip]) / 2;
    this.X1Arr[tip] = this.X2Arr[tip] = tx;
    this.Y1Arr[tip] = this.Y2Arr[tip] = ty;
  }

  createBoxes(
    ax: number, ay: number,
    bx: number, by: number,
    cx: number, cy: number,
    dx: number, dy: number,
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(ax, ay);
    this.ctx.lineTo(bx, by);
    this.ctx.lineTo(cx, cy);
    this.ctx.lineTo(dx, dy);
    this.ctx.fill();
  }

  createAllBox() {
    const idx = this.currIdx;
    let prevCordX1 = this.X1Arr[idx];
    let prevCordX2 = this.X2Arr[idx];
    let prevCordY1 = this.Y1Arr[idx];
    let prevCordY2 = this.Y2Arr[idx];
    for (let k = 1; k < this.alive; k++) {
      const i = (idx - k + this.length) % this.length;
      const X1 = this.X1Arr[i];
      const X2 = this.X2Arr[i];
      const Y1 = this.Y1Arr[i];
      const Y2 = this.Y2Arr[i];

      this.createBoxes(
        prevCordX1, prevCordY1,
        X1, Y1,
        X2, Y2,
        prevCordX2, prevCordY2,
      );

      prevCordX1 = X1;
      prevCordX2 = X2;
      prevCordY2 = Y2;
      prevCordY1 = Y1;
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}