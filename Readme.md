
# WPProAtoZ Snake

![Plugin Version](https://img.shields.io/badge/version-1.1-blue.svg) ![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg) ![PHP](https://img.shields.io/badge/PHP-8.0%2B-blue.svg) ![License](https://img.shields.io/badge/license-GPLv2-green.svg)

A fun WordPress plugin that lets your users play the classic Snake game on your website using a simple shortcode.

---

## Overview

The **WPProAtoZ Snake** plugin brings the nostalgic Snake game to your WordPress site. Forked from Camil Staps’ original plugin, this updated version adds modern WordPress compatibility, Elementor support, and bug fixes for a seamless gaming experience. Simply add the `[snake]` shortcode to any post or page, and let your visitors enjoy a customizable game of Snake.

Developed by [WPProAtoZ](https://wpproatoz.com), this plugin is perfect for adding a touch of fun to your website.

---

## Features

- **Shortcode Integration**: Add `[snake]` to any post, page, or Elementor widget to embed the game.
- **Customizable Appearance**: Set snake color (`red`, `green`, `blue`), food color (any hex code), and game speed via shortcode attributes.
- **Responsive Design**: Game grid scales to fit containers, with a maximum width of 600px.
- **Elementor Compatibility**: Works flawlessly in Elementor’s editor and frontend.
- **Modernized UI**: Updated CSS with grid layout for better rendering and responsiveness.
- **Debugging Support**: Includes console logs for troubleshooting food placement and collisions.
- **Lightweight**: Minimal dependencies (jQuery) and optimized JavaScript for smooth performance.

---

## Configuration

### Adding the Game
Insert the `[snake]` shortcode in any post, page, or Elementor shortcode widget.

### Shortcode Attributes
Customize the game with these optional attributes:
- **color**: Snake color (`red`, `green`, `blue`). Default: `red`.
- **foodcolor**: Food color (e.g., `#ff0000` for red). Default: `orange`.
- **timeout**: Game speed in milliseconds (minimum 100). Default: `200`.

**Example**:
```html
[snake color="green" foodcolor="#ff0000" timeout="150"]
```

### Admin Settings
- Navigate to `Settings > Snake` in WordPress admin for instructions and shortcode examples.
- No configuration required; the plugin is plug-and-play.

### Requirements
- **WordPress**: 6.0 or higher
- **PHP**: 8.0 or higher (8.3+ recommended)
- **Dependencies**: None (uses WordPress’s built-in jQuery)

---

## Changelog

### Version 1.1
- **Fixed Asset Paths**: Corrected loading of `snake.js` and `snake.css` from plugin root.
- **WordPress 6.6 Compatibility**: Ensured compatibility with the latest WordPress version.
- **Elementor Support**: Added initialization hooks for seamless integration with Elementor.
- **Text Domain Fix**: Corrected text domain to `wpproatoz-snake`.
- **JavaScript Fixes**: Resolved food generation and collision detection issues for reliable gameplay.
- **CSS Modernization**: Replaced float-based layout with CSS Grid for better responsiveness.
- **Debugging Logs**: Added console logs for food placement and snake movement to aid troubleshooting.

### Version 1.0
- Initial forked version from Camil Staps’ Snake plugin.

---

## Testing
- **Shortcode**: Add `[snake]` to a post/page and verify the game loads.
- **Gameplay**: Start the game, move the snake, eat food, and confirm score updates and snake growth.
- **Attributes**: Test `[snake color="green" foodcolor="#ff0000" timeout="150"]` for customization.
- **Elementor**: Add the shortcode via Elementor’s shortcode widget and check rendering in editor and frontend.
- **Debugging**: Enable `WP_DEBUG` in `wp-config.php` and check browser console for errors or logs:
  ```php
  define('WP_DEBUG', true);
  define('WP_DEBUG_LOG', true);
  define('WP_DEBUG_DISPLAY', false);
  ```

---

## Installation

1. **Download**: Get the latest release from the [Releases](https://github.com/Ahkonsu/wpproatoz-snake/releases) page.
2. **Upload**: In WordPress admin, go to `Plugins > Add New > Upload Plugin`, and upload the `wpproatoz-snake-1.1.zip` file.
3. **Activate**: Activate via the `Plugins` menu.
4. **Add Shortcode**: Insert `[snake]` in a post, page, or Elementor widget.
5. **Configure**: Optionally use shortcode attributes to customize the game.

Alternatively, clone the repository into your `/wp-content/plugins/` directory:
```bash
git clone https://github.com/Ahkonsu/wpproatoz-snake.git wpproatoz-snake
cd wpproatoz-snake
```

---

## Support
Reach out at [support@wpproatoz.com](mailto:support@wpproatoz.com) for assistance.

### Credits
- **Developed by**: WPProAtoZ
- **Forked from**: Snake by Camil Staps ([original repository](https://github.com/wp-plugins/snake))

---

## Contributing
Fork the repo, submit issues, or create pull requests at [github.com/Ahkonsu/wpproatoz-snake](https://github.com/Ahkonsu/wpproatoz-snake).

---

## License
Licensed under [GPLv2 or later](http://www.gnu.org/licenses/gpl-2.0.html).

---

## Demo
Check out the plugin in action at [WPProAtoZ.com](https://wpproatoz.com).


### Details
- **Badges**: Reflect version 1.1, WordPress 6.0+, PHP 8.0+, and GPLv2 license.
- **Overview**: Highlights the plugin’s purpose (fun Snake game) and fork history.
- **Features**: Lists key functionalities like shortcode usage, customization, and Elementor compatibility.
- **Configuration**: Explains how to use the shortcode and attributes, with minimal admin setup.
- **Changelog**: Summarizes version 1.1 fixes (asset paths, JavaScript bugs, CSS, Elementor) and mentions version 1.0.
- **Testing**: Provides clear steps to verify gameplay and debugging.
- **Installation**: Includes both zip upload and Git clone methods, matching the template.
- **Support/Credits**: Links to WPProAtoZ support and credits the original author.
- **Links**: Points to the correct GitHub repo (`Ahkonsu/wpproatoz-snake`) and WPProAtoZ website.

