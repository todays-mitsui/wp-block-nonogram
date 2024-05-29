import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.describe( 'Block', () => {
	test.beforeEach( async ( { admin } ) => {
		await admin.createNewPost();
	} );

	test( 'should add a block', async ( { editor } ) => {
		await editor.insertBlock( {
			name: 'todays-mitsui/nonogram',
			attributes: {
				aspectRatio: [ 1, 1 ],
				boardData: null,
			},
		} );
		expect( await editor.getEditedPostContent() ).toMatchSnapshot();
	} );
} );
