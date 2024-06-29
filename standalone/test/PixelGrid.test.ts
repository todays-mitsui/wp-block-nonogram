import { describe, test, expect } from 'vitest';
import {
	type PixelGrid,
	newPixelGrid,
	getPixels,
	update,
	resize,
	serialize,
	deserialize,
	type Clue,
	rowClues,
	columnClues,
	serializeClues,
	deserializeClues,
} from '../lib/PixelGrid';

test( 'constructor', () => {
	const grid = newPixelGrid( 3, 2 );
	expect( grid ).toEqual( {
		width: 3,
		height: 2,
		chunkLength: 3,
		// prettier-ignore
		pixels: [
			'UNSETTLED', 'UNSETTLED', 'UNSETTLED',
			'UNSETTLED', 'UNSETTLED', 'UNSETTLED',
		],
	} );
} );

test( 'getPixels', () => {
	let grid = newPixelGrid( 3, 2 );
	grid = update( grid, { x: 2, y: 0, newStatus: 7 } );
	grid = update( grid, { x: 1, y: 1, newStatus: 6 } );
	expect( new Set( getPixels( grid ) ) ).toEqual(
		new Set( [
			{ id: '0,0', x: 0, y: 0, status: 'UNSETTLED' },
			{ id: '1,0', x: 1, y: 0, status: 'UNSETTLED' },
			{ id: '2,0', x: 2, y: 0, status: 7 },
			{ id: '0,1', x: 0, y: 1, status: 'UNSETTLED' },
			{ id: '1,1', x: 1, y: 1, status: 6 },
			{ id: '2,1', x: 2, y: 1, status: 'UNSETTLED' },
		] )
	);
} );

test( 'update', () => {
	const grid = newPixelGrid( 3, 2 );
	const updated = update( grid, { x: 1, y: 1, newStatus: 6 } );
	expect( updated ).toEqual( {
		width: 3,
		height: 2,
		chunkLength: 3,
		// prettier-ignore
		pixels: [
			'UNSETTLED', 'UNSETTLED', 'UNSETTLED',
			'UNSETTLED',           6, 'UNSETTLED',
		],
	} );
} );

describe( 'resize', () => {
	describe( 'shrinkWidth', () => {
		test( 'UNSETTLED な値ばかりのとき', () => {
			const grid = newPixelGrid( 4, 2 );
			const resized = resize( grid, { width: 2, height: 2 } );
			expect( resized ).toEqual( {
				width: 2,
				height: 2,
				chunkLength: 2,
				// prettier-ignore
				pixels: [
					'UNSETTLED', 'UNSETTLED',
					'UNSETTLED', 'UNSETTLED',
				],
			} );
		} );

		test( 'SETTLED な値が含まれるとき', () => {
			let grid = newPixelGrid( 4, 2 );
			grid = update( grid, { x: 2, y: 1, newStatus: 6 } );
			const resized = resize( grid, { width: 2, height: 2 } );
			expect( resized ).toEqual( {
				width: 2,
				height: 2,
				chunkLength: 3,
				// prettier-ignore
				pixels: [
					'UNSETTLED', 'UNSETTLED', 'UNSETTLED',
					'UNSETTLED', 'UNSETTLED',           6,
				],
			} );
		} );
	} );

	test( 'expandWidth', () => {
		let grid = newPixelGrid( 2, 2 );
		grid = update( grid, { x: 1, y: 0, newStatus: 6 } );
		const resized = resize( grid, { width: 4, height: 2 } );
		expect( resized ).toEqual( {
			width: 4,
			height: 2,
			chunkLength: 4,
			// prettier-ignore
			pixels: [
				'UNSETTLED',           6, 'UNSETTLED', 'UNSETTLED',
				'UNSETTLED', 'UNSETTLED', 'UNSETTLED', 'UNSETTLED',
			],
		} );
	} );

	describe( 'shrinkHeight', () => {
		test( 'UNSETTLED な値ばかりのとき', () => {
			const grid = newPixelGrid( 2, 4 );
			const resized = resize( grid, { width: 2, height: 2 } );
			expect( resized ).toEqual( {
				width: 2,
				height: 2,
				chunkLength: 2,
				// prettier-ignore
				pixels: [
					'UNSETTLED', 'UNSETTLED',
					'UNSETTLED', 'UNSETTLED',
				],
			} );
		} );

		test( 'SETTLED な値が含まれるとき', () => {
			let grid = newPixelGrid( 2, 4 );
			grid = update( grid, { x: 0, y: 2, newStatus: 6 } );
			const resized = resize( grid, { width: 2, height: 2 } );
			expect( resized ).toEqual( {
				width: 2,
				height: 2,
				chunkLength: 2,
				// prettier-ignore
				pixels: [
					'UNSETTLED', 'UNSETTLED',
					'UNSETTLED', 'UNSETTLED',
					          6, 'UNSETTLED',
				],
			} );
		} );
	} );

	test( 'expandHeight', () => {
		let grid = newPixelGrid( 2, 2 );
		grid = update( grid, { x: 0, y: 1, newStatus: 6 } );
		const resized = resize( grid, { width: 2, height: 4 } );
		expect( resized ).toEqual( {
			width: 2,
			height: 4,
			chunkLength: 2,
			// prettier-ignore
			pixels: [
				'UNSETTLED', 'UNSETTLED',
				          6, 'UNSETTLED',
				'UNSETTLED', 'UNSETTLED',
				'UNSETTLED', 'UNSETTLED',
			],
		} );
	} );
} );

describe( 'serialize/deserialize', () => {
	test( '空の PixelGrid', () => {
		const grid = newPixelGrid( 4, 3 );

		const serialized = serialize( grid );
		const [ , , , codeSize ] = serialized.split( ';' );
		console.info( { grid, serialized, codeSize } );
		expect( codeSize ).toBe( '4' );
		expect( deserialize( serialized ) ).toEqual( grid );
	} );

	test( 'SPACE のみ', () => {
		let grid = newPixelGrid( 4, 3 );

		grid = update( grid, { x: 2, y: 1, newStatus: 'SPACE' } );

		const serialized = serialize( grid );
		const [ , , , codeSize ] = serialized.split( ';' );
		console.info( { grid, serialized, codeSize } );
		expect( codeSize ).toBe( '4' );
		expect( deserialize( serialized ) ).toEqual( grid );
	} );

	test( '1まで', () => {
		let grid = newPixelGrid( 4, 3 );

		grid = update( grid, { x: 2, y: 1, newStatus: 'SPACE' } );
		grid = update( grid, { x: 0, y: 2, newStatus: 1 } );

		const serialized = serialize( grid );
		const [ , , , codeSize ] = serialized.split( ';' );
		console.info( { grid, serialized, codeSize } );
		expect( codeSize ).toBe( '4' );
		expect( deserialize( serialized ) ).toEqual( grid );
	} );

	test( '5まで', () => {
		let grid = newPixelGrid( 4, 3 );

		grid = update( grid, { x: 2, y: 1, newStatus: 'SPACE' } );
		grid = update( grid, { x: 0, y: 2, newStatus: 3 } );
		grid = update( grid, { x: 1, y: 0, newStatus: 5 } );

		const serialized = serialize( grid );
		const [ , , , codeSize ] = serialized.split( ';' );
		console.info( { grid, serialized, codeSize } );
		expect( codeSize ).toBe( '8' );
		expect( deserialize( serialized ) ).toEqual( grid );
	} );

	test( '13まで', () => {
		let grid = newPixelGrid( 4, 3 );

		grid = update( grid, { x: 2, y: 1, newStatus: 'SPACE' } );
		grid = update( grid, { x: 0, y: 2, newStatus: 6 } );
		grid = update( grid, { x: 1, y: 0, newStatus: 1 } );
		grid = update( grid, { x: 3, y: 0, newStatus: 13 } );

		const serialized = serialize( grid );
		const [ , , , codeSize ] = serialized.split( ';' );
		console.info( { grid, serialized, codeSize } );
		expect( codeSize ).toBe( '16' );
		expect( deserialize( serialized ) ).toEqual( grid );
	} );

	test( '29まで', () => {
		let grid = newPixelGrid( 4, 3 );

		grid = update( grid, { x: 2, y: 1, newStatus: 'SPACE' } );
		grid = update( grid, { x: 0, y: 2, newStatus: 14 } );
		grid = update( grid, { x: 1, y: 0, newStatus: 1 } );
		grid = update( grid, { x: 3, y: 0, newStatus: 13 } );
		grid = update( grid, { x: 3, y: 2, newStatus: 29 } );

		const serialized = serialize( grid );
		const [ , , , codeSize ] = serialized.split( ';' );
		console.info( { grid, serialized, codeSize } );
		expect( codeSize ).toBe( '32' );
		expect( deserialize( serialized ) ).toEqual( grid );
	} );

	test( '任意の grid', () => {
		let grid = newPixelGrid( 4, 3 );

		grid = update( grid, { x: 2, y: 1, newStatus: 'SPACE' } );
		grid = update( grid, { x: 0, y: 2, newStatus: 61 } );
		grid = update( grid, { x: 1, y: 0, newStatus: 0 } );
		grid = update( grid, { x: 3, y: 0, newStatus: 30 } );
		grid = update( grid, { x: 3, y: 2, newStatus: 42 } );

		const serialized = serialize( grid );
		const [ , , , codeSize ] = serialized.split( ';' );
		console.info( { grid, serialized, codeSize } );
		expect( codeSize ).toBe( '64' );
		expect( deserialize( serialized ) ).toEqual( grid );
	} );
} );

describe( 'rowClues', () => {
	test( '空の PixelGrid', () => {
		const grid = newPixelGrid( 4, 3 );
		expect( rowClues( grid ) ).toEqual( [ [], [], [] ] );
	} );

	test( '1色のみ', () => {
		let grid = newPixelGrid( 4, 3 );
		const color = 0;

		// 0行め
		grid = update( grid, { x: 0, y: 0, newStatus: color } );
		grid = update( grid, { x: 1, y: 0, newStatus: color } );
		grid = update( grid, { x: 2, y: 0, newStatus: color } );

		// 1行め
		grid = update( grid, { x: 0, y: 1, newStatus: color } );
		grid = update( grid, { x: 3, y: 1, newStatus: color } );

		// 2行め
		grid = update( grid, { x: 0, y: 2, newStatus: color } );
		grid = update( grid, { x: 2, y: 2, newStatus: color } );
		grid = update( grid, { x: 3, y: 2, newStatus: color } );

		// prettier-ignore
		expect( rowClues( grid ) ).toEqual( [
			[ [ 3, color ],              ],
			[ [ 1, color ], [ 1, color ] ],
			[ [ 1, color ], [ 2, color ] ],
		] );
	} );

	test( '2色', () => {
		let grid = newPixelGrid( 4, 3 );
		const color1 = 6;
		const color2 = 42;

		// 0行め
		grid = update( grid, { x: 0, y: 0, newStatus: color1 } );
		grid = update( grid, { x: 1, y: 0, newStatus: color1 } );
		grid = update( grid, { x: 2, y: 0, newStatus: color2 } );

		// 1行め
		grid = update( grid, { x: 0, y: 1, newStatus: color2 } );
		grid = update( grid, { x: 3, y: 1, newStatus: color1 } );

		// 2行め
		grid = update( grid, { x: 0, y: 2, newStatus: color1 } );
		grid = update( grid, { x: 2, y: 2, newStatus: color1 } );
		grid = update( grid, { x: 3, y: 2, newStatus: color2 } );

		// prettier-ignore
		expect( rowClues( grid ) ).toEqual( [
			[ [ 2, color1 ], [ 1, color2 ],               ],
			[ [ 1, color2 ], [ 1, color1 ],               ],
			[ [ 1, color1 ], [ 1, color1 ], [ 1, color2 ] ],
		] );
	} );
} );

describe( 'columnClues', () => {
	test( '空の PixelGrid', () => {
		const grid = newPixelGrid( 4, 3 );
		expect( columnClues( grid ) ).toEqual( [ [], [], [], [] ] );
	} );

	test( '1色のみ', () => {
		let grid = newPixelGrid( 4, 3 );
		const color = 0;

		// 0列め
		grid = update( grid, { x: 0, y: 0, newStatus: color } );
		grid = update( grid, { x: 0, y: 1, newStatus: color } );
		grid = update( grid, { x: 0, y: 2, newStatus: color } );

		// 1列め
		grid = update( grid, { x: 1, y: 0, newStatus: color } );
		grid = update( grid, { x: 1, y: 2, newStatus: color } );

		// 2列め
		grid = update( grid, { x: 2, y: 1, newStatus: color } );
		grid = update( grid, { x: 2, y: 2, newStatus: color } );

		// prettier-ignore
		expect( columnClues( grid ) ).toEqual( [
			[ [ 3, color ],              ],
			[ [ 1, color ], [ 1, color ] ],
			[ [ 2, color ],              ],
			[                            ],
		] );
	} );

	test( '2色', () => {
		let grid = newPixelGrid( 4, 3 );
		const color1 = 6;
		const color2 = 42;

		// 0列め
		grid = update( grid, { x: 0, y: 0, newStatus: color1 } );
		grid = update( grid, { x: 0, y: 1, newStatus: color1 } );
		grid = update( grid, { x: 0, y: 2, newStatus: color2 } );

		// 1列め
		grid = update( grid, { x: 1, y: 0, newStatus: color1 } );
		grid = update( grid, { x: 1, y: 2, newStatus: color1 } );

		// 2列め
		grid = update( grid, { x: 2, y: 1, newStatus: color1 } );
		grid = update( grid, { x: 2, y: 2, newStatus: color1 } );

		// 3列め
		grid = update( grid, { x: 3, y: 0, newStatus: color1 } );
		grid = update( grid, { x: 3, y: 1, newStatus: color2 } );
		grid = update( grid, { x: 3, y: 2, newStatus: color1 } );

		// prettier-ignore
		expect( columnClues( grid ) ).toEqual( [
			[ [ 2, color1 ], [ 1, color2 ],               ],
			[ [ 1, color1 ], [ 1, color1 ],               ],
			[ [ 2, color1 ],                              ],
			[ [ 1, color1 ], [ 1, color2 ], [ 1, color1 ] ],
		] );
	} );
} );

describe( 'serializeClues/deserializeClues', () => {
	test( '空の Clues', () => {
		const clues: Clue[] = [ [], [], [] ];
		const serialized = serializeClues( clues );
		console.info( { clues, serialized } );
		expect( deserializeClues( serialized ) ).toEqual( clues );
	} );

	test( 'serializeClues/deserializeClues', () => {
		// prettier-ignore
		const clues: Clue[] = [
			[ [ 1, 3 ] ],
			[],
			[ [ 3, 1 ], [ 4, 1 ] ],
			[ [ 5, 1 ], [ 1, 2 ] ],
		];
		const serialized = serializeClues( clues );
		console.info( { clues, serialized } );
		expect( deserializeClues( serialized ) ).toEqual( clues );
	} );

	test( '', () => {
		// prettier-ignore
		const clues: Clue[] = [
			[ [ 1, 0 ], [ 1, 0 ] ],
			[ [ 1, 0 ], [ 1, 0 ], [ 1, 0 ] ],
			[ [ 1, 0 ], [ 1, 0 ], [ 1, 0 ] ],
			[ [ 1, 0 ], [ 1, 0 ] ],
			[ [ 1, 0 ], [ 1, 0 ] ],
		];
	} );
} );
