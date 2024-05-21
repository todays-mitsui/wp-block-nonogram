import { useEffect, useState } from '@wordpress/element';

/**
 * @param {string | null} key
 * @param {() => string} genInitialValue
 * @returns {[string | null, (newValue: string) => void]}
 */
export function useLocalStorage( key, genInitialValue ) {
	const [ value, setValue ] = useState( null );

	useEffect( () => {
		if ( key != null ) {
			const storedValue = localStorage.getItem( key );
			setValue( storedValue == null ? genInitialValue() : storedValue );
		}
	}, [ key ] );

	useEffect( () => {
		if ( key != null && value != null ) {
			localStorage.setItem( key, value );
		}
	}, [ value ] );

	return [ value, setValue ];
}
