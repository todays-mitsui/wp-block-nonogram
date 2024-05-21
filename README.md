# Nonogram Block for WordPress

![Nonogram Puzzle](https://github.com/todays-mitsui/wp-block-nonogram/assets/3040456/59d892ca-75b4-48c4-99ce-78e3eb54328e)

## Description

The Nonogram Block allows you to create Nonogram puzzles in the WordPress block editor. This block provides a user-friendly interface for designing puzzles and presenting them to your website visitors for solving.

## Features

- Customize the number of rows and columns for your puzzle.
- Choose from predefined aspect ratios (Square, Wide, Tall).
- Easy to use controls in the WordPress editor.
- Responsive and interactive puzzle solving experience.

## Installation

1. Download the repository from GitHub:
   ```sh
   git clone https://github.com/todays-mitsui/wp-block-nonogram.git
   ```

2. Navigate to the plugin directory:
   ```sh
   cd wp-block-nonogram
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Build the plugin:
   ```sh
   npm run build
   ```

5. Upload the `wp-block-nonogram` folder to the `/wp-content/plugins/` directory of your WordPress installation.

6. Activate the plugin through the 'Plugins' menu in WordPress.

## Development

To start the development environment:

1. Follow steps 1-3 from the Installation section.

2. Start the development environment:
   ```sh
   npm start
   ```

3. This will set up a local development server. Open your browser and go to http://localhost:8888/wp-admin/ to access the WordPress admin dashboard. Use the following credentials to log in:
   - **Username**: `admin`
   - **Password**: `password`

## Usage

1. In the WordPress editor, add a new block and search for "Nonogram".
2. Use the block's settings in the sidebar to customize the number of rows, columns, and the aspect ratio.
3. Design your Nonogram puzzle and save your post or page.

## Attributes

- **numRows**: Number of rows in the puzzle (default: 15).
- **numColumns**: Number of columns in the puzzle (default: 15).
- **boardData**: The encoded puzzle data.
- **aspectRatio**: The aspect ratio of the puzzle grid. Options are:
  - Square (1:1)
  - Wide (3:2)
  - Tall (2:3)

## License

This plugin is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Credits

Developed by [Mitsui](https://github.com/todays-mitsui).
