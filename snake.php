<?php
/*
Plugin Name: WPProAtoZ Snake
Description: Let your users play snake on your website!
Version: 1.1
Author: WPProAtoZ.com / John Overall (Forked from Camil Staps https://github.com/wp-plugins/snake)
Requires at least: 6.0
Requires PHP: 8.0
License: GPLv2 or later
Author URI: https://wpproatoz.com
Plugin URI: https://wpproatoz.com/wp-pro-a-to-z-plugins-available/
Text Domain: wpproatoz-snake
Update URI: https://github.com/Ahkonsu/wpproatoz-snake/releases
GitHub Plugin URI: https://github.com/Ahkonsu/wpproatoz-snake/releases
GitHub Branch: main
Forked From: Snake
*/

// Prevent direct access.
if (!defined('ABSPATH')) {
    exit;
}

register_activation_hook(__FILE__, 'snake_install');
function snake_install() {
    add_option('snake_rounded_borders', false, '', 'yes');
}

register_deactivation_hook(__FILE__, 'snake_remove');
function snake_remove() {
    delete_option('snake_rounded_borders');
}

/* ADMIN MENU */
add_action('admin_menu', 'snake_admin_menu');
function snake_admin_menu() {
    add_options_page('Snake', 'Snake', 'manage_options', 'snake', 'snake_option_page');
}

function snake_option_page() {
    ?>
    <div class="wrap">
        <h1>Snake</h1>
        <h2>How to Insert Snake</h2>
        <p>Add the <code>[snake]</code> shortcode to any post or page. Compatible with Elementor!</p>
        <h3>Shortcode Attributes</h3>
        <p>Use attributes like <code>[snake color="blue"]</code>:</p>
        <ul>
            <li><code>color</code>: Snake color (<code>red</code>, <code>green</code>, <code>blue</code>). Default: <code>red</code>.</li>
            <li><code>foodcolor</code>: Food color (e.g., <code>#ff0000</code>). Default: <code>orange</code>.</li>
            <li><code>timeout</code>: Snake speed in milliseconds (integer, min 100). Default: <code>200</code>.</li>
        </ul>
        <h3>Example</h3>
        <p><code>[snake color="green" foodcolor="red" timeout="150"]</code></p>
        <h2>Why This Fork?</h2>
        <p>Bringing back the fun to WordPress with modern compatibility!</p>
    </div>
    <?php
}

/* SHORTCODE */
function playSnake($atts) {
    // Define defaults and sanitize attributes.
    $atts = shortcode_atts(
        array(
            'color' => 'red',
            'foodcolor' => 'orange',
            'timeout' => 200,
        ),
        $atts,
        'snake'
    );

    // Validate attributes.
    $atts['color'] = in_array($atts['color'], ['red', 'green', 'blue']) ? $atts['color'] : 'red';
    $atts['foodcolor'] = sanitize_hex_color($atts['foodcolor']) ?: 'orange';
    $atts['timeout'] = max(100, absint($atts['timeout']));

    // Enqueue assets.
    wp_enqueue_style('wpproatoz-snake', plugin_dir_url(__FILE__) . 'snake.css', [], '1.1');
    wp_enqueue_script('wpproatoz-snake', plugin_dir_url(__FILE__) . 'snake.js', ['jquery'], '1.1', true);

    // Pass settings to JavaScript.
    $settings = array(
        'color' => $atts['color'],
        'foodcolor' => $atts['foodcolor'],
        'timeout' => $atts['timeout'],
        'roundedborders' => get_option('snake_rounded_borders', false) ? 'true' : 'false',
    );
    wp_localize_script('wpproatoz-snake', 'snakeSettings', $settings);

    // Output game container.
    $output = '<div id="snakeContainer" class="wpproatoz-snake-container">';
    $output .= '<span class="snakeLabel"><span class="snakeButton" onclick="snakeStart();">Start</span></span>';
    $output .= '<span class="snakeLabel">Score: <span class="snakeInput" id="snakeScore">0</span></span>';
    $output .= '<span class="snakeLabel"><span class="snakeText" id="snakeMessage">Press the start button to begin.</span></span>';
    $output .= '<div id="snake" class="wpproatoz-snake"></div>';
    $output .= '</div>';

    return $output;
}
add_shortcode('snake', 'playSnake');

// Elementor compatibility.
add_action('wp_footer', 'snake_elementor_compatibility');
function snake_elementor_compatibility() {
    if (did_action('elementor/frontend/after_enqueue_scripts')) {
        ?>
        <script>
            jQuery(document).ready(function($) {
                if (typeof snakeBuildField === 'function') {
                    $('.wpproatoz-snake').each(function() {
                        snakeBuildField();
                        snakeClearField();
                    });
                }
            });
        </script>
        <?php
    }
}