import { IBrick, ITicker, IBall, IState } from './types';
import { interval, merge as mergeStatic, fromEvent, Observable, Subject } from 'rxjs';
import { map, scan, distinctUntilChanged, withLatestFrom, merge, retryWhen, delay } from 'rxjs/operators';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import './index.less';

const stage = document.getElementById('stage') as HTMLCanvasElement;
const context = stage.getContext('2d')!;
context.fillStyle = 'green';

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;

const BALL_RADIUS = 10;

const BRICK_ROWS = 5;
const BRICK_COLUMNS = 7;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 3;

// 游戏进入
function drawIntro() {
	context.clearRect(0, 0, stage.width, stage.height);
	context.textAlign = 'center';
	context.font = '24px Courier New';
	context.fillText('Press [<] and [>]', stage.width / 2, stage.height / 2);
}

// 游戏结束
function drawGameOver(text: string) {
	context.clearRect(stage.width / 4, stage.height / 3, stage.width / 2, stage.height / 3);
	context.textAlign = 'center';
	context.font = '24px Courier New';
	context.fillText(text, stage.width / 2, stage.height / 2);
}

// 绘制分数
function drawScore(score: number) {
	context.textAlign = 'left';
	context.font = '16px Courier New';
	context.fillText(score.toString(), BRICK_GAP, 16);
}

// 绘制球拍
function drawPaddle(position: number) {
	context.beginPath();
	// 创建一个矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height。
	context.rect(position - PADDLE_WIDTH / 2, context.canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
	context.fill();
	context.closePath();
}

// 绘制弹球
function drawBall(ball: IBall) {
	context.beginPath();
	context.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2);
	context.fill();
	context.closePath();
}

// 绘制砖块
function drawBrick(brick: IBrick) {
	context.beginPath();
	context.rect(brick.x - brick.width / 2, brick.y - brick.height / 2, brick.width, brick.height);
	context.fill();
	context.closePath();
}

// 绘制砖块们
function drawBricks(bricks: IBrick[]) {
	bricks.forEach((b) => drawBrick(b));
}

const TICKER_INTERVAL = Math.ceil(1000 / 60); // 每秒60帧(60fps)，最顺滑的效果

const ticker$ = interval(TICKER_INTERVAL, animationFrame)
	.pipe(
		map<
			number,
			{
				time: number;
				deltaTime: number | null;
			}
		>(() => ({
			time: Date.now(),
			deltaTime: null
		}))
	)
	.pipe(
		// 在源Observable上应用累加器函数，并返回每个中间结果，并带有可选的种子值。
		scan((prev, curr) => ({
			time: curr.time,
			deltaTime: (curr.time - prev.time) / 1000 // 单位 秒
		}))
	);

const PADDLE_CONTROLS = {
	ArrowLeft: -1,
	ArrowRight: 1
};

const key$ = mergeStatic<number>(
	fromEvent(document, 'keydown').pipe(map((event: any) => PADDLE_CONTROLS[event.key] || 0)),
	fromEvent(document, 'keyup').pipe(map((event) => 0))
).pipe(distinctUntilChanged() /* 返回一个Observable，它发出源Observable发出的所有项，这些项与前一项相比是不同的。 */);

const PADDLE_SPEED = 240; // 球拍速度 px/s

const createPaddle$ = (ticker$: Observable<ITicker>) =>
	ticker$
		.pipe(
			// 将源Observable与其他Observable组合以创建一个Observable，其值仅根据源发出的值从每个值的最新值计算。
			withLatestFrom(key$)
		)
		.pipe(
			scan<[ITicker, number], number>((position, [ ticker, direction ]): number => {
				// 原位置 + 方向 * 时间 * 速度
				const nextPosition = position + direction * ticker.deltaTime! * PADDLE_SPEED;
				// PADDLE_WIDTH / 2 <= position <= stage.width - PADDLE_WIDTH / 2
				return Math.max(Math.min(nextPosition, stage.width - PADDLE_WIDTH / 2), PADDLE_WIDTH / 2);
			}, stage.width / 2)
		)
		.pipe(distinctUntilChanged());

// 弹球与球拍碰撞
function isHit(paddle: number, ball: IBall): boolean {
	return (
		ball.position.x > paddle - PADDLE_WIDTH / 2 &&
		ball.position.x < paddle + PADDLE_WIDTH / 2 &&
		ball.position.y > stage.height - PADDLE_HEIGHT - BALL_RADIUS / 2
	);
}

// 弹球与墙壁碰撞
function isCollision(brick: IBrick, ball: IBall): boolean {
	return (
		ball.position.x + ball.direction.x > brick.x - brick.width / 2 &&
		ball.position.x + ball.direction.x < brick.x + brick.width / 2 &&
		ball.position.y + ball.direction.y > brick.y - brick.height / 2 &&
		ball.position.y + ball.direction.y < brick.y + brick.height / 2
	);
}

const initState: () => IState = () => ({
	ball: {
		position: {
			x: stage.width / 2,
			y: stage.height / 2
		},
		direction: {
			x: 2,
			y: 2
		}
	},
	bricks: createBricks(),
	score: 0,
	collisions: {
		paddle: false,
		floor: false,
		wall: false,
		ceiling: false,
		brick: false
	}
});

function createBricks(): IBrick[] {
	let width = (stage.width - BRICK_GAP - BRICK_GAP * BRICK_COLUMNS) / BRICK_COLUMNS;
	let bricks: IBrick[] = [];
	for (let i = 0; i < BRICK_ROWS; i++) {
		for (let j = 0; j < BRICK_COLUMNS; j++) {
			bricks.push({
				x: j * (width + BRICK_GAP) + width / 2 + BRICK_GAP,
				y: i * (BRICK_HEIGHT + BRICK_GAP) + BRICK_HEIGHT / 2 + BRICK_GAP + 20,
				width,
				height: BRICK_HEIGHT
			});
		}
	}
	return bricks;
}

const BALL_SPEED = 60; // 球移动速度

const createState$ = (ticker$: Observable<ITicker>, paddle$: Observable<number>) =>
	ticker$.pipe(withLatestFrom(paddle$)).pipe(
		scan<[ITicker, number], IState>(({ ball, bricks, score }, [ ticker, paddle ]): IState => {
			let remainingBricks: IBrick[] = []; // 剩余的砖块
			// 碰撞
			const collisions = {
				paddle: false, // 球拍
				floor: false, // 底部
				wall: false, // 墙
				ceiling: false, // 天花板
				brick: false // 砖
			};
			ball.position.x = ball.position.x + ball.direction.x * ticker.deltaTime! * BALL_SPEED;
			ball.position.y = ball.position.y + ball.direction.y * ticker.deltaTime! * BALL_SPEED;
			for (let brick of bricks) {
				if (!isCollision(brick, ball)) {
					remainingBricks.push(brick);
				} else {
					collisions.brick = true;
					score += 10;
				}
			}
			collisions.paddle = isHit(paddle, ball);
			if (ball.position.x < BALL_RADIUS || ball.position.x > stage.width - BALL_RADIUS) {
				ball.direction.x = -ball.direction.x;
				collisions.wall = true;
			}
			collisions.ceiling = ball.position.y < BALL_RADIUS;
			if (collisions.brick || collisions.paddle || collisions.ceiling) {
				ball.direction.y = -ball.direction.y;
			}
			return {
				ball,
				bricks: remainingBricks,
				collisions,
				score
			};
		}, initState())
	);

let restart: Subject<any>;

const game$ = new Observable((observer) => {
	drawIntro();
	restart = new Subject();
	const paddle$ = createPaddle$(ticker$);
	const state$ = createState$(ticker$, paddle$);
	ticker$.pipe(withLatestFrom(paddle$, state$)).pipe(merge(restart)).subscribe(observer);
});

game$
	.pipe(
		retryWhen((err$) => {
			return err$.pipe(delay(1000));
		})
	)
	.subscribe(updateView as any);

function updateView([ ticker, paddle, state ]: [ITicker, number, IState]) {
	context.clearRect(0, 0, stage.width, stage.height);
	drawPaddle(paddle);
	drawBall(state.ball);
	drawBricks(state.bricks);
	drawScore(state.score);
	if (state.ball.position.y > stage.height - BALL_RADIUS) {
		drawGameOver('GAME OVER');
		restart.error('game over');
	}
	if (state.bricks.length === 0) {
		drawGameOver('Congradulations! ');
		restart.error('cong');
	}
}
