const BASE64_CHARACTERS =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function encode4( data: number[] ): string {
	let code = '';

	if ( data.some( ( val ) => val < 0 || 4 < val ) ) {
		throw new Error( 'Invalid data' );
	}

	for ( const chunk of chunks( data, 3 ) ) {
		const index =
			( chunk[ 0 ] << 4 ) + ( chunk[ 1 ] << 2 ) + ( chunk[ 2 ] << 0 );
		code += BASE64_CHARACTERS.charAt( index );
	}

	return code;
}

export function decode4( code: string ): number[] {
	const data: number[] = [];

	for ( const char of code ) {
		const index = BASE64_CHARACTERS.indexOf( char );
		data.push( ( index >> 4 ) & 0b11 );
		data.push( ( index >> 2 ) & 0b11 );
		data.push( ( index >> 0 ) & 0b11 );
	}

	return data;
}

// ========================================================================== //

export function encode8( data: number[] ): string {
	let code = '';

	if ( data.some( ( val ) => val < 0 || 8 < val ) ) {
		throw new Error( 'Invalid data' );
	}

	for ( const chunk of chunks( data, 2 ) ) {
		const index = ( chunk[ 0 ] << 3 ) + ( chunk[ 1 ] << 0 );
		code += BASE64_CHARACTERS.charAt( index );
	}

	return code;
}

export function decode8( code: string ): number[] {
	const data: number[] = [];

	for ( const char of code ) {
		const index = BASE64_CHARACTERS.indexOf( char );
		data.push( ( index >> 3 ) & 0b111 );
		data.push( ( index >> 0 ) & 0b111 );
	}

	return data;
}

// ========================================================================== //

export function encode16( data: number[] ): string {
	let code = '';

	if ( data.some( ( val ) => val < 0 || 16 < val ) ) {
		throw new Error( 'Invalid data' );
	}

	for ( const chunk of chunks( data, 3 ) ) {
		const index1 = ( chunk[ 0 ] << 2 ) + ( chunk[ 1 ] >> 2 );
		const index2 = ( ( chunk[ 1 ] & 0b11 ) << 4 ) + ( chunk[ 2 ] << 0 );
		code += BASE64_CHARACTERS.charAt( index1 );
		code += BASE64_CHARACTERS.charAt( index2 );
	}

	return code;
}

export function decode16( code: string ): number[] {
	const data: number[] = [];

	for ( let i = 0; i < code.length; i += 2 ) {
		const index1 = BASE64_CHARACTERS.indexOf( code[ i ] );
		const index2 = BASE64_CHARACTERS.indexOf( code[ i + 1 ] );
		data.push( ( index1 >> 2 ) & 0b1111 );
		data.push( ( ( index1 & 0b11 ) << 2 ) + ( ( index2 >> 4 ) & 0b11 ) );
		data.push( index2 & 0b1111 );
	}

	return data;
}

// ========================================================================== //

export function encode32( data: number[] ): string {
	let code = '';

	if ( data.some( ( val ) => val < 0 || 32 < val ) ) {
		throw new Error( 'Invalid data' );
	}

	for ( const chunk of chunks( data, 6 ) ) {
		const index1 = ( chunk[ 0 ] << 1 ) + ( chunk[ 1 ] >> 4 );
		const index2 = ( ( chunk[ 1 ] & 0b1111 ) << 2 ) + ( chunk[ 2 ] >> 3 );
		const index3 = ( ( chunk[ 2 ] & 0b111 ) << 3 ) + ( chunk[ 3 ] >> 2 );
		const index4 = ( ( chunk[ 3 ] & 0b11 ) << 4 ) + ( chunk[ 4 ] >> 1 );
		const index5 = ( ( chunk[ 4 ] & 0b1 ) << 5 ) + ( chunk[ 5 ] << 0 );
		code += BASE64_CHARACTERS.charAt( index1 );
		code += BASE64_CHARACTERS.charAt( index2 );
		code += BASE64_CHARACTERS.charAt( index3 );
		code += BASE64_CHARACTERS.charAt( index4 );
		code += BASE64_CHARACTERS.charAt( index5 );
	}

	return code;
}

export function decode32( code: string ): number[] {
	const data: number[] = [];

	for ( let i = 0; i < code.length; i += 5 ) {
		const index1 = BASE64_CHARACTERS.indexOf( code[ i ] );
		const index2 = BASE64_CHARACTERS.indexOf( code[ i + 1 ] );
		const index3 = BASE64_CHARACTERS.indexOf( code[ i + 2 ] );
		const index4 = BASE64_CHARACTERS.indexOf( code[ i + 3 ] );
		const index5 = BASE64_CHARACTERS.indexOf( code[ i + 4 ] );
		data.push( ( index1 >> 1 ) & 0b11111 );
		data.push( ( ( index1 & 0b1 ) << 4 ) + ( index2 >> 2 ) );
		data.push( ( ( index2 & 0b11 ) << 3 ) + ( index3 >> 3 ) );
		data.push( ( ( index3 & 0b111 ) << 2 ) + ( index4 >> 4 ) );
		data.push( ( ( index4 & 0b1111 ) << 1 ) + ( index5 >> 5 ) );
		data.push( index5 & 0b11111 );
	}

	return data;
}

// ========================================================================== //

export function encode64( data: number[] ): string {
	let code = '';

	if ( data.some( ( val ) => val < 0 || 64 < val ) ) {
		throw new Error( 'Invalid data' );
	}

	for ( let i = 0; i < data.length; i++ ) {
		const index = data[ i ];
		code += BASE64_CHARACTERS.charAt( index );
	}

	return code;
}

export function decode64( code: string ): number[] {
	const data: number[] = [];

	for ( const char of code ) {
		const index = BASE64_CHARACTERS.indexOf( char );
		data.push( index );
	}

	return data;
}

// ========================================================================== //

function chunks( data: number[], chunkSize: number ): number[][] {
	const result: number[][] = [];
	for ( let i = 0; i < data.length; i += chunkSize ) {
		result.push( data.slice( i, i + chunkSize ) );
	}
	return result;
}
