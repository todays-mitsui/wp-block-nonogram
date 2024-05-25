<?php
/**
 * Plugin Name:       Nonogram
 * Plugin URI:        https://github.com/todays-mitsui/wp-block-nonogram
 * Description:       Create and solve Nonogram puzzles in the WordPress block editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.2.0
 * Author:            todays-mitsui
 * Author URI:        https://github.com/todays-mitsui
 * License:           MIT
 * License URI:       https://opensource.org/license/mit
 * Text Domain:       nonogram
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_nonogram_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_nonogram_block_init' );
