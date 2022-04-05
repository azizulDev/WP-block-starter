<?php
/*
  Plugin Name: Flexible Star
  Description: Simply you can own a star!
  Version: 1.0
  Author: Azizul Raju
  Author URI: https://profiles.wordpress.org/azizulraju/
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class FlexibleStar {
    function __construct() {
      add_action('init', array($this, 'adminAssets'));
    }
  
    function adminAssets() {
      wp_register_style('ournewblockcss', plugin_dir_url(__FILE__) . 'src/index.css');
      wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
  
      register_block_type('ourplugin/flexible-star', array(
        'editor_script' => 'ournewblocktype',
        'attributes' => array(
          'blockBg' => array(
            'type' => 'string',
            'default' => '#f1f1f1'
          ),
          'alignmentEl' => array(
            'type' => 'string',
            'default' => 'center'
          ),
          'paddingSize' => array(
            'type' => 'object',
            'default' => [
              ['top' => '50px'],
              ['let' => '50px'],
              ['right' => '50px'],
              ['bottom' => '50px'],
            ]
          ),
          'allStars' => array(
            'type' => 'object',
            'default' => [
              ['id'=> 1, 'name'=> 'star-filled'],
              ['id'=> 2, 'name'=> 'star-empty'],
              ['id'=> 3, 'name'=> 'star-empty'],
              ['id'=> 4, 'name'=> 'star-empty'],
              ['id'=> 5, 'name'=> 'star-empty']
            ]
          ),
          'filledStar' => array(
            'type' => 'string',
            'default' => '1'
          ),
          'starColor' => array(
            'type' => 'string',
            'default' => '#000000'
          ),
          'labelColor' => array(
            'type' => 'string',
            'default' => '#000000'
          ),
          'textLabel' => array(
            'type' => 'string',
            'default' => 'My overall rating:'
          ),
          'ratingTextColor' => array(
            'type' => 'string',
            'default' => '#000000'
          ),
          'conclusionText' => array(
            'type' => 'boolean',
            'default' => true
          ),
        ),
        'editor_style' => 'ournewblockcss',
        'render_callback' => array($this, 'theHTML')
      ));
    }
  
    function theHTML($attributes) {

      // error_log(serialize($attributes));

      wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__). 'build/frontend.js', array('wp-blocks', 'wp-element', 'wp-editor'));
      wp_enqueue_style('attentionFrontendStyles', plugin_dir_url(__FILE__). 'src/frontend.css');
      ob_start(); ?>

      <div class="pickPlugins-flexibleStar"><pre style="display: : none;"><?php echo wp_json_encode($attributes); ?></pre></div>

      <?php return ob_get_clean();
    }
  }
  
  $flexibleStar = new FlexibleStar();