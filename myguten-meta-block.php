<?php
/**
 * Plugin Name: Ironeko Featured Sites
 * Description: Adds a "featured sites" custom post type and various blocks to set custom data for said custom post type.
 */

// register custom meta tag field
// Our custom post type function

function create_posttype() {

    register_post_type( 'Featured Sites',
    // CPT Options
        array(
            'labels' => array(
                'name' => __( 'Featured sites' ),
                'singular_name' => __( 'Featured site' )
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'custom-fields', 'thumbnail' ),
            'taxonomies' => array('post_tag')
        )
    );
}
// Hooking up our function to theme setup
add_action( 'init', 'create_posttype' );


function myguten_register_post_meta() {
    register_post_meta( 'featuredsites', 'paletteData', array(
        'show_in_rest' => array(
           'schema' => array(
               'type'  => 'array',
               'items' => array(
                   'type' => 'string',
               ),
           ),
        ),
        'single' => true,
        'type' => 'array',
    ) );

    register_post_meta( 'featuredsites', 'website', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );

}
add_action( 'init', 'myguten_register_post_meta' );

function featured_palette_enqueue() {
    wp_enqueue_script(
        'palette-script-js',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-components' )
    );

   wp_enqueue_style(
      'palette-script-css',
      plugins_url( 'index.css', __FILE__ ),
      array()
   );
}
add_action( 'enqueue_block_editor_assets', 'featured_palette_enqueue' );
