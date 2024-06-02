import { describe, test, expect } from 'vitest';
import {
	type PixelGrid,
	newPixelGrid,
	getPixels,
	update,
	resize,
	serialize,
	deserialize,
} from '../../lib/Model/PixelGrid';

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
