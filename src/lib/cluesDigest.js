import { useEffect, useState } from '@wordpress/element';

/**
 * @param {number[][]} rowClues
 * @param {number[][]} columnClues
 * @returns {Promise<string>}
 */
export async function genCluesDigest( rowClues, columnClues ) {
	const rowCluesStr = rowClues
		.map( ( clues ) => clues.join( ',' ) )
		.join( ';' );
	const columnCluesStr = columnClues
		.map( ( clues ) => clues.join( ',' ) )
		.join( ';' );
	const cluesStr = `${ rowCluesStr }:${ columnCluesStr }`;
	const encoder = new TextEncoder();
	const data = encoder.encode( cluesStr );
	const digestBuffer = await crypto.subtle.digest( 'SHA-256', data );
	const digestArray = Array.from( new Uint8Array( digestBuffer ) );
	return digestArray
		.map( ( byte ) => byte.toString( 16 ).padStart( 2, '0' ) )
		.join( '' );
}

/**
 * @param {number[][]} rowClues
 * @param {number[][]} columnClues
 * @returns {string | null}
 */
export function useCluesDigest( rowClues, columnClues ) {
	const [ digest, setDigest ] = useState( null );

	useEffect( () => {
		genCluesDigest( rowClues, columnClues ).then( setDigest );
	}, [ rowClues, columnClues ] );

	return digest;
}
