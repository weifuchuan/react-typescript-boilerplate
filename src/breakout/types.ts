export interface IBrick {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface IBall {
	position: { x: number; y: number };
	direction: { x: number; y: number };
}

export interface ITicker {
	time: number;
	deltaTime: number | null;
}

export interface IState {
	ball: IBall;
	bricks: IBrick[];
	score: number;
	collisions: {
		paddle: boolean;
		floor: boolean;
		wall: boolean;
		ceiling: boolean;
		brick: boolean;
	};
}
