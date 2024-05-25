const BASE64_CHARACTERS =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * @param {number[]} serials
 */
export function encode( serials ) {
	/** @type string */
	let code = '';

	for ( const chunk of chunks( serials, 3 ) ) {
		const index =
			( chunk[ 0 ] << 4 ) + ( chunk[ 1 ] << 2 ) + ( chunk[ 2 ] << 0 );
		code += BASE64_CHARACTERS.charAt( index );
	}

	return code;
}

/**
 * @param {string} code
 * @returns {number[]}
 */
export function decode( code ) {
	/** @type number[] */
	const serials = [];

	code.split( '' ).forEach( ( c ) => {
		const index = BASE64_CHARACTERS.indexOf( c );

		if ( index === -1 ) {
			throw new Error( 'Invalid character' );
		}

		serials.push(
			( index & 0b110000 ) >> 4,
			( index & 0b001100 ) >> 2,
			index & 0b000011
		);
	} );

	return serials;
}

/**
 * @template T
 * @param {T[]} array
 * @param {number} size
 * @returns {Generator<T[]>}
 */
function* chunks( array, size ) {
	for ( let i = 0; i < array.length; i += size ) {
		yield array.slice( i, i + size );
	}
}
