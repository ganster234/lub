/**************** 鼠标点击特效 *******************/
interface Position {
  x: number;
  y: number;
}

interface CircleOptions {
  origin: Position;
  speed: number;
  color: string;
  angle: number;
  context: CanvasRenderingContext2D;
}

interface BoomOptions {
  origin: Position;
  context: CanvasRenderingContext2D;
  circleCount?: number;
  area: { width: number; height: number };
}

class Circle {
  origin: Position;
  position: Position;
  color: string;
  speed: number;
  angle: number;
  context: CanvasRenderingContext2D;
  renderCount: number;

  constructor({ origin, speed, color, angle, context }: CircleOptions) {
    this.origin = origin;
    this.position = { ...origin };
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.context = context;
    this.renderCount = 0;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2);
    this.context.fill();
  }

  move() {
    this.position.x += Math.sin(this.angle) * this.speed;
    this.position.y +=
      Math.cos(this.angle) * this.speed + this.renderCount * 0.3;
    this.renderCount++;
  }
}

class Boom {
  origin: Position;
  context: CanvasRenderingContext2D;
  circleCount: number;
  area: { width: number; height: number };
  stop: boolean;
  circles: Circle[];

  constructor({ origin, context, circleCount = 10, area }: BoomOptions) {
    this.origin = origin;
    this.context = context;
    this.circleCount = circleCount;
    this.area = area;
    this.stop = false;
    this.circles = [];
    this.init();
  }

  private randomArray<T>(range: T[]): T {
    return range[Math.floor(range.length * Math.random())];
  }

  private randomColor(): string {
    const range = ["8", "9", "A", "B", "C", "D", "E", "F"];
    return (
      "#" +
      Array.from({ length: 6 })
        .map(() => this.randomArray(range))
        .join("")
    );
  }

  private randomRange(start: number, end: number): number {
    return (end - start) * Math.random() + start;
  }

  private init() {
    for (let i = 0; i < this.circleCount; i++) {
      const circle = new Circle({
        context: this.context,
        origin: this.origin,
        color: this.randomColor(),
        angle: this.randomRange(Math.PI - 1, Math.PI + 1),
        speed: this.randomRange(1, 6),
      });
      this.circles.push(circle);
    }
  }

  move() {
    this.circles = this.circles.filter((circle) => {
      if (
        circle.position.x > this.area.width ||
        circle.position.y > this.area.height
      ) {
        return false;
      }
      circle.move();
      return true;
    });

    if (this.circles.length === 0) {
      this.stop = true;
    }
  }

  draw() {
    this.circles.forEach((circle) => circle.draw());
  }
}

class CursorSpecialEffects {
  private computerCanvas: HTMLCanvasElement;
  private renderCanvas: HTMLCanvasElement;
  private computerContext: CanvasRenderingContext2D;
  private renderContext: CanvasRenderingContext2D;
  private globalWidth: number;
  private globalHeight: number;
  private booms: Boom[];
  private running: boolean;

  constructor() {
    this.computerCanvas = document.createElement("canvas");
    this.renderCanvas = document.createElement("canvas");
    this.computerContext = this.computerCanvas.getContext("2d")!;
    this.renderContext = this.renderCanvas.getContext("2d")!;
    this.globalWidth = window.innerWidth;
    this.globalHeight = window.innerHeight;
    this.booms = [];
    this.running = false;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.run = this.run.bind(this);
  }

  private handleMouseDown(e: MouseEvent) {
    const boom = new Boom({
      origin: { x: e.clientX, y: e.clientY },
      context: this.computerContext,
      area: {
        width: this.globalWidth,
        height: this.globalHeight,
      },
    });
    this.booms.push(boom);
    if (!this.running) this.run();
  }

  private handlePageHide() {
    this.booms = [];
    this.running = false;
  }

  init() {
    const style = this.renderCanvas.style;
    style.position = "fixed";
    style.top = "0";
    style.left = "0";
    style.zIndex = "9999999999";
    style.pointerEvents = "none";

    this.renderCanvas.width = this.computerCanvas.width = this.globalWidth;
    this.renderCanvas.height = this.computerCanvas.height = this.globalHeight;

    document.body.appendChild(this.renderCanvas);

    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("pagehide", () => this.handlePageHide());
  }

  private run() {
    this.running = true;
    if (this.booms.length === 0) {
      this.running = false;
      return;
    }

    requestAnimationFrame(this.run);

    this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight);
    this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight);

    this.booms = this.booms.filter((boom) => {
      if (boom.stop) return false;
      boom.move();
      boom.draw();
      return true;
    });

    this.renderContext.drawImage(
      this.computerCanvas,
      0,
      0,
      this.globalWidth,
      this.globalHeight
    );
  }
}

const cursorSpecialEffects = new CursorSpecialEffects();
cursorSpecialEffects.init();
