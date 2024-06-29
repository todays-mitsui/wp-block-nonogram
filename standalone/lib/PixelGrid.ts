import {
	encode4,
	decode4,
	encode8,
	decode8,
	encode16,
	decode16,
	encode32,
	decode32,
	encode64,
	decode64,
} from './util/encode';

export interface PixelGrid {
	width: number;
	height: number;
	chunkLength: number;
	pixels: Status[];
}

export function newPixelGrid( width: number, height: number ): PixelGrid {
	return {
		width,
		height,
		chunkLength: width,
		pixels: Array( width * height ).fill( 'UNSETTLED' ),
	};
}

export function getPixels( grid: PixelGrid ): readonly Pixel[] {
	const { width, height } = grid;
	const pixels: Pixel[] = [];
	for ( const [ y, row ] of rows( grid ).slice( 0, height ).entries() ) {
		for ( const [ x, status ] of row.slice( 0, width ).entries() ) {
			pixels.push( { id: `${ x },${ y }`, x, y, status } );
		}
	}
	return pixels;
}

/**
 * pixels を行ごとに分割して返す
 * scopeSize (width * height) の外の要素も返すので注意
 */
function rows( grid: PixelGrid ): readonly Status[][] {
	const { chunkLength, pixels } = grid;
	const rows: Status[][] = [];
	for ( let i = 0; i < pixels.length; i += chunkLength ) {
		rows.push( pixels.slice( i, i + chunkLength ) );
	}
	return rows;
}

// ========================================================================== //

interface UpdateParams {
	x: number;
	y: number;
	newStatus: Status;
}

export function update(
	grid: PixelGrid,
	{ x, y, newStatus }: UpdateParams
): PixelGrid {
	const index = x + y * grid.chunkLength;
	return {
		...grid,
		pixels: grid.pixels.map( ( status, i ) =>
			i === index ? newStatus : status
		),
	};
}

// ========================================================================== //

interface ResizeParams {
	width: number;
	height: number;
}

export function resize(
	grid: PixelGrid,
	{ width, height }: ResizeParams
): PixelGrid {
	const { width: oldWidth, height: oldHeight } = grid;
	let newGrid = grid;

	if ( width < oldWidth ) {
		newGrid = shrinkWidth( grid, width );
	} else if ( width > oldWidth ) {
		newGrid = expandWidth( grid, width );
	}

	if ( height < oldHeight ) {
		newGrid = shrinkHeight( newGrid, height );
	} else if ( height > oldHeight ) {
		newGrid = expandHeight( newGrid, height );
	}

	return newGrid;
}

function shrinkWidth( grid: PixelGrid, width: number ): PixelGrid {
	const { height, chunkLength, pixels } = grid;
	const settledIndexes = rows( grid ).flatMap( ( row ) =>
		row
			.map( ( status, index ) =>
				status !== 'UNSETTLED' ? index : null
			)
			.filter( ( index ): index is number => index !== null )
	);
	const maxSettledIndex = Math.max( 0, ...settledIndexes );
	const newChunkLength = Math.max( width, maxSettledIndex + 1 );

	const newPixels = Array( newChunkLength * height ).fill( 'UNSETTLED' );
	for ( let y = 0; y < height; y++ ) {
		const row = pixels.slice(
			y * chunkLength,
			y * chunkLength + newChunkLength
		);
		newPixels.splice( y * newChunkLength, row.length, ...row );
	}

	return {
		width,
		height,
		chunkLength: newChunkLength,
		pixels: newPixels,
	};
}

function expandWidth( grid: PixelGrid, width: number ): PixelGrid {
	const { height, chunkLength, pixels } = grid;
	const newChunkLength = Math.max( chunkLength, width );

	const newPixels = Array( newChunkLength * height ).fill( 'UNSETTLED' );
	for ( let y = 0; y < height; y++ ) {
		const row = pixels.slice( y * chunkLength, ( y + 1 ) * chunkLength );
		newPixels.splice( y * newChunkLength, row.length, ...row );
	}

	return {
		width,
		height,
		chunkLength: newChunkLength,
		pixels: newPixels,
	};
}

function shrinkHeight( grid: PixelGrid, height: number ): PixelGrid {
	const { width, chunkLength, pixels } = grid;

	const settledIndexes = rows( grid )
		.map( ( row, index ) =>
			row.some( ( status ) => status !== 'UNSETTLED' ) ? index : null
		)
		.filter( ( index ): index is number => index !== null );
	const maxSettledIndex = Math.max( ...settledIndexes );
	const pixelsLength = chunkLength * Math.max( maxSettledIndex + 1, height );

	return {
		width,
		height,
		chunkLength,
		pixels: pixels.slice( 0, pixelsLength ),
	};
}

function expandHeight( grid: PixelGrid, height: number ): PixelGrid {
	const { width, chunkLength, pixels } = grid;
	const newPixels = pixels.concat(
		Array( width * height - pixels.length ).fill( 'UNSETTLED' )
	);
	return {
		width,
		height,
		chunkLength,
		pixels: newPixels,
	};
}

// ========================================================================== //

export function serialize( grid: PixelGrid ): string {
	const { width, height, chunkLength, pixels } = grid;
	const [ maxCode, encode ] = genEncoder( grid );
	const pixelsStr = encode( pixels );
	const frameSize = `${ width }x${ height }`;
	const gridSize = `${ chunkLength }x${ pixels.length / chunkLength }`;
	return `v2;${ frameSize };${ gridSize };${ maxCode };${ pixelsStr }`;
}

export function deserialize( serialized: string ): PixelGrid {
	const [ version, frameSize, gridSize, maxCodeStr, pixelsStr ] =
		serialized.split( ';' );

	if ( version !== 'v2' ) {
		throw new Error( 'Unsupported version' );
	}

	const [ width, height ] = frameSize.split( 'x' ).map( Number );
	const [ chunkLength, rows ] = gridSize.split( 'x' ).map( Number );
	const maxCode = Number( maxCodeStr );
	const decode = genDecoder( maxCode, rows * chunkLength );
	const pixels = decode( pixelsStr );

	return { width, height, chunkLength, pixels };
}

function genEncoder(
	grid: PixelGrid
): [ number, ( pixels: Status[] ) => string ] {
	const { pixels } = grid;
	const maxCode = Math.max(
		0,
		...pixels.map( ( status ): number => {
			switch ( status ) {
				case 'UNSETTLED':
				case 'SPACE':
					return -1;
				default:
					return status;
			}
		} )
	);

	const mapToCode = ( status: Status, maxCode: number ): number => {
		switch ( status ) {
			case 'UNSETTLED':
				return maxCode - 1;
			case 'SPACE':
				return maxCode - 2;
			default:
				return status;
		}
	};

	switch ( true ) {
		case maxCode < 2:
			return [
				4,
				( pixels ) =>
					encode4(
						pixels.map( ( status ) => mapToCode( status, 4 ) )
					),
			] as const;
		case maxCode < 6:
			return [
				8,
				( pixels ) =>
					encode8(
						pixels.map( ( status ) => mapToCode( status, 8 ) )
					),
			] as const;
		case maxCode < 14:
			return [
				16,
				( pixels ) =>
					encode16(
						pixels.map( ( status ) => mapToCode( status, 16 ) )
					),
			] as const;
		case maxCode < 30:
			return [
				32,
				( pixels ) =>
					encode32(
						pixels.map( ( status ) => mapToCode( status, 32 ) )
					),
			] as const;
		default:
			return [
				64,
				( pixels ) =>
					encode64(
						pixels.map( ( status ) => mapToCode( status, 64 ) )
					),
			] as const;
	}
}

function genDecoder(
	codeSize: number,
	length: number
): ( code: string ) => Status[] {
	let decode: ( code: string ) => number[];
	switch ( true ) {
		case codeSize <= 4:
			decode = decode4;
			break;
		case codeSize <= 8:
			decode = decode8;
			break;
		case codeSize <= 16:
			decode = decode16;
			break;
		case codeSize <= 32:
			decode = decode32;
			break;
		default:
			decode = decode64;
			break;
	}

	return ( pixelsStr ) => {
		const pixels = decode( pixelsStr )
			.map( ( code ) => {
				switch ( code ) {
					case codeSize - 1:
						return 'UNSETTLED';
					case codeSize - 2:
						return 'SPACE';
					default:
						return code;
				}
			} )
			.slice( 0, length );

		if ( ! isValidPixels( pixels ) ) {
			throw new Error( 'Invalid pixels' );
		}

		return pixels;
	};
}

// ========================================================================== //

export interface Pixel {
	id: `${ number },${ number }`;
	x: number;
	y: number;
	status: Status;
}

// prettier-ignore
export type ColorIndex =
	|  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7
	|  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15
	| 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
	| 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
	| 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
	| 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47
	| 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55
	| 56 | 57 | 58 | 59 | 60 | 61
	;

// prettier-ignore
export type Status = 'UNSETTLED' | 'SPACE' | ColorIndex;

function isValidPixels(
	pixel: ( 'UNSETTLED' | 'SPACE' | number )[]
): pixel is Status[] {
	return pixel.every( isValidStatus );
}

function isValidStatus(
	status: 'UNSETTLED' | 'SPACE' | number
): status is Status {
	return typeof status === 'string' || isValidColorIndex( status );
}

export function isFilled( status: Status ): status is ColorIndex {
	return typeof status === 'number' && isValidColorIndex( status );
}

function isValidColorIndex( colorIndex: number ): colorIndex is ColorIndex {
	return colorIndex >= 0 && colorIndex <= 61;
}

// ========================================================================== //

export type Clue = [ number, ColorIndex ][];

export function rowClues(
	grid: PixelGrid,
	monochrome: boolean = false
): Clue[] {
	const { width, height } = grid;

	return rows( grid )
		.slice( 0, height )
		.map( ( row ) => row.slice( 0, width ) )
		.map( ( row ) =>
			monochrome ? calcClueMonochrome( row ) : calcClueColor( row )
		);
}

export function columnClues(
	grid: PixelGrid,
	monochrome: boolean = false
): Clue[] {
	const { width, height, chunkLength } = grid;

	return Array.from( { length: width }, ( _, x ) =>
		Array.from(
			{ length: height },
			( _, y ) => grid.pixels[ x + y * chunkLength ]
		)
	).map( ( column ) =>
		monochrome ? calcClueMonochrome( column ) : calcClueColor( column )
	);
}

/**
 * 1行分または1列分の手がかりを計算する
 */
function calcClueMonochrome( cells: readonly Status[] ): Clue {
	const clue: Clue = [];

	let count = 0;
	let currentColor: ColorIndex | null = null;
	for ( const status of cells ) {
		// 色の切り替わり判定
		if ( currentColor != null && ! isFilled( status ) ) {
			clue.push( [ count, currentColor ] );
			count = 0;
			currentColor = null;
		}

		// 今見ているセルが塗られていればカウントアップする
		if ( typeof status === 'number' ) {
			count++;
			currentColor = status;
		}
	}

	if ( currentColor != null ) {
		clue.push( [ count, currentColor ] );
	}

	return clue;
}

/**
 * 1行分または1列分の手がかりを計算する
 */
function calcClueColor( cells: readonly Status[] ): Clue {
	const clue: Clue = [];

	let count = 0;
	let currentColor: ColorIndex | null = null;
	for ( const status of cells ) {
		// 色の切り替わり判定
		if ( currentColor != null && currentColor !== status ) {
			clue.push( [ count, currentColor ] );
			count = 0;
			currentColor = null;
		}

		// 今見ているセルが塗られていればカウントアップする
		if ( typeof status === 'number' ) {
			count++;
			currentColor = status;
		}
	}

	if ( currentColor != null ) {
		clue.push( [ count, currentColor ] );
	}

	return clue;
}

// ========================================================================== //

export function serializeClues( clues: Clue[] ): string {
	return clues
		.map( ( clue ) =>
			clue
				.map(
					( [ count, colorIndex ] ) => `${ colorIndex }:${ count }`
				)
				.join( ',' )
		)
		.join( ';' );
}

export function deserializeClues( serialized: string ): Clue[] {
	return serialized.split( ';' ).map( ( row ) =>
		row === ''
			? []
			: row.split( ',' ).map( ( clue ) => {
					const [ colorIndex, count ] = clue
						.split( ':' )
						.map( Number );
					if ( ! isValidColorIndex( colorIndex ) ) {
						throw new Error( 'Invalid colorIndex' );
					}
					return [ count, colorIndex ] as const;
			  } )
	);
}
