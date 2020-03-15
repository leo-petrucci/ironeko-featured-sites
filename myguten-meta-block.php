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
            'supports' => array('title', 'editor', 'custom-fields' ),
        )
    );
}
// Hooking up our function to theme setup
add_action( 'init', 'create_posttype' );

// function featuredsites_get_palette( $post ) {
//   //return get_the_author_meta( 'display_name', (int) $post['author'] );
//   return get_metadata('post', $post['id'], 'paletteData');
// }
//
// function featuredsites_add_palette_data() {
//   register_rest_field( 'featuredsites',
//     'palette',
//     array(
//       'get_callback' => 'featuredsites_get_palette'
//     )
//   );
// }
// add_action( 'rest_api_init', 'featuredsites_add_palette_data' );

function myguten_register_post_meta() {
  //   register_post_meta( 'featuredsites', 'palette', array(
	// 'show_in_rest' => true,
  //       'single' => true,
  //       'type' => 'string',
  //   ) );
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

}
add_action( 'init', 'myguten_register_post_meta' );

function myguten_enqueue() {
    wp_enqueue_script(
        'myguten-script',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-components' )
    );

   wp_enqueue_style(
      'myguten-script',
      plugins_url( 'index.css', __FILE__ ),
      array()
   );
}
add_action( 'enqueue_block_editor_assets', 'myguten_enqueue' );
