import { encode, decode } from '../lib/encode';

export class Grid {
	/**
	 * @param {number} numColumns
	 * @param {number} numRows
	 */
	constructor( numColumns, numRows ) {
		if (
			! Number.isInteger( numColumns ) ||
			! Number.isInteger( numRows )
		) {
			throw new Error( 'numColumns and numRows must be integers' );
		}

		if ( numColumns < 0 || numRows < 0 ) {
			throw new Error( 'Out of bounds' );
		}

		this._numColumns = numColumns;
		this._numRows = numRows;
		this._cells = new Uint8ClampedArray( numColumns * numRows );
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {'unknown' | 'space' | 'filled'}
	 */
	get( x, y ) {
		if ( ! Number.isInteger( x ) || ! Number.isInteger( y ) ) {
			throw new Error( 'x and y must be integers' );
		}

		if ( x < 0 || x >= this._numColumns || y < 0 || y >= this._numRows ) {
			throw new Error( 'Out of bounds' );
		}

		const serial = this._cells[ y * this._numColumns + x ];
		return Grid.serialToStatus( serial );
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {'unknown' | 'space' | 'filled'} status
	 * @returns {this}
	 */
	set( x, y, status ) {
		if ( ! Number.isInteger( x ) || ! Number.isInteger( y ) ) {
			throw new Error( 'x and y must be integers' );
		}

		if ( x < 0 || x >= this._numColumns || y < 0 || y >= this._numRows ) {
			throw new Error( 'Out of bounds' );
		}

		const serial = Grid.statusToSerial( status );
		this._cells[ y * this._numColumns + x ] = serial;
		return this;
	}

	/**
	 * @param {number} serial
	 * @returns {'unknown' | 'space' | 'filled'}
	 */
	static serialToStatus( serial ) {
		switch ( serial ) {
			case 0:
				return 'unknown';
			case 1:
				return 'space';
			case 2:
				return 'filled';
			default:
				throw new Error( `Invalid serial: ${ serial }` );
		}
	}

	/**
	 * @param {'unknown' | 'space' | 'filled'} status
	 * @returns {number}
	 */
	static statusToSerial( status ) {
		switch ( status ) {
			case 'unknown':
				return 0;
			case 'space':
				return 1;
			case 'filled':
				return 2;
			default:
				throw new Error( `Invalid status: ${ status }` );
		}
	}

	/**
	 * @param {number} y
	 * @returns {boolean[]}
	 */
	getRow( y ) {
		if ( ! Number.isInteger( y ) ) {
			throw new Error( 'y must be an integer' );
		}

		if ( y < 0 || y >= this._numRows ) {
			throw new Error( 'Out of bounds' );
		}

		return Array.from(
			this._cells.subarray(
				y * this._numColumns,
				( y + 1 ) * this._numColumns
			)
		).map( Grid.serialToStatus );
	}

	/**
	 * @returns {Generator<boolean[]>}
	 */
	*rows() {
		for ( let y = 0; y < this._numRows; y++ ) {
			yield this.getRow( y );
		}
	}

	/**
	 * @param {number} x
	 * @returns {boolean[]}
	 */
	getColumn( x ) {
		if ( ! Number.isInteger( x ) ) {
			throw new Error( 'x must be an integer' );
		}

		if ( x < 0 || x >= this._numColumns ) {
			throw new Error( 'Out of bounds' );
		}

		const column = [];

		for ( let y = 0; y < this._numRows; y++ ) {
			column.push( this.get( x, y ) );
		}

		return column;
	}

	/**
	 * @returns {Generator<boolean[]>}
	 */
	*columns() {
		for ( let x = 0; x < this._numColumns; x++ ) {
			yield this.getColumn( x );
		}
	}

	/**
	 * @param {number} numColumns
	 * @param {number} numRows
	 * @returns {this}
	 */
	resize( numColumns, numRows ) {
		if (
			! Number.isInteger( numColumns ) ||
			! Number.isInteger( numRows )
		) {
			throw new Error( 'numColumns and numRows must be integers' );
		}

		if ( numColumns < 0 || numRows < 0 ) {
			throw new Error( 'Out of bounds' );
		}

		if ( numColumns < this._numColumns ) {
			this._shrinkHorizontally( numColumns );
		} else if ( numColumns > this._numColumns ) {
			this._expandHorizontally( numColumns );
		}

		if ( numRows < this._numRows ) {
			this._shrinkVertically( numRows );
		} else if ( numRows > this._numRows ) {
			this._expandVertically( numRows );
		}

		return this;
	}

	/**
	 * @param {number} numColumns
	 * @returns {this}
	 */
	_expandHorizontally( numColumns ) {
		const newCells = new Uint8ClampedArray( numColumns * this._numRows );

		for ( let y = 0; y < this._numRows; y++ ) {
			newCells.set(
				this._cells.subarray(
					y * this._numColumns,
					( y + 1 ) * this._numColumns
				),
				y * numColumns
			);
		}

		this._numColumns = numColumns;
		this._cells = newCells;

		return this;
	}

	/**
	 * @param {number} numColumns
	 * @returns {this}
	 */
	_shrinkHorizontally( numColumns ) {
		const nonSpaceIndexes = [ ...this.rows() ].flatMap( ( row ) => {
			return row
				.map( ( status, index ) =>
					status !== 'unknown' ? index : null
				)
				.filter( ( index ) => index != null );
		} );
		const maxNonSpaceIndex = Math.max( ...nonSpaceIndexes );

		const newNumColumns = Math.max( numColumns, maxNonSpaceIndex + 1 );

		if ( newNumColumns === this._numColumns ) return this;

		const newCells = new Uint8ClampedArray( newNumColumns * this._numRows );
		for ( let y = 0; y < this._numRows; y++ ) {
			newCells.set(
				this._cells.subarray(
					y * this._numColumns,
					y * this._numColumns + newNumColumns
				),
				y * newNumColumns
			);
		}

		this._numColumns = numColumns;
		this._cells = newCells;

		return this;
	}

	/**
	 * @param {number} numRows
	 * @returns {this}
	 */
	_expandVertically( numRows ) {
		const newCells = new Uint8ClampedArray( this._numColumns * numRows );

		newCells.set( this._cells );

		this._numRows = numRows;
		this._cells = newCells;

		return this;
	}

	/**
	 * @param {number} numRows
	 * @returns {this}
	 */
	_shrinkVertically( numRows ) {
		const maxNonSpaceIndex = [ ...this.rows() ].findLastIndex( ( row ) =>
			row.some( ( status ) => status !== 'unknown' )
		);

		const newNumRows = Math.max( numRows, maxNonSpaceIndex + 1 );

		if ( newNumRows === this._numRows ) return this;

		this._numRows = newNumRows;
		this._cells = this._cells.slice( 0, this._numColumns * newNumRows );

		return this;
	}

	/**
	 * @returns {string}
	 */
	serialize() {
		return `${ this._numColumns }x${ this._numRows };${ encode(
			this._cells
		) }`;
	}

	/**
	 * @param {string} str
	 * @returns {Grid}
	 */
	static deserialize( str ) {
		const [ size, data ] = str.split( ';' );
		const [ numColumns, numRows ] = size.split( 'x' ).map( Number );

		if ( numColumns < 0 || numRows < 0 ) {
			throw new Error( 'Out of bounds' );
		}

		const grid = new Grid( numColumns, numRows );

		const cells = decode( data ).slice( 0, numColumns * numRows );
		grid._cells = new Uint8ClampedArray( cells );

		return grid;
	}
}
