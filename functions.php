<?php

// Defines
define( 'FL_CHILD_THEME_DIR', get_stylesheet_directory() );
define( 'FL_CHILD_THEME_URL', get_stylesheet_directory_uri() );

// Classes
require_once 'classes/class-fl-child-theme.php';

// Actions
add_action( 'wp_enqueue_scripts', 'FLChildTheme::enqueue_scripts', 1000 );
//Disable gravity form anchor for a specific form with id5 & id14
/*add_filter( 'gform_confirmation_anchor_5', '__return_false' );
add_filter( 'gform_confirmation_anchor_14', '__return_false' );*/
//Disable gravity form field labels selector
add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );



add_filter('Forms3rdPartyIntegration_service_filter_args', 'SIDEA_forwardCookies4PardotIntegration', 10, 4);

if (!function_exists('SIDEA_forwardCookies4PardotIntegration')) { // faccio il forward dei cookie e dell'IP dell'utente
    function SIDEA_forwardCookies4PardotIntegration ($post_args) {
        $post_args['cookies']                    = $_COOKIE;
        $post_args['headers']['Forwarded']       = " for=" .$_SERVER['REMOTE_ADDR'];
        $post_args['headers']['X-Forwarded-For'] = $_SERVER['REMOTE_ADDR'];
        
        return $post_args;
    }
}

add_filter('Forms3rdPartyIntegration_service_filter_post_0', 'SIDEA_replaceOtherChoice', 10, 4);

if (!function_exists('SIDEA_replaceOtherChoice')) {
    function SIDEA_replaceOtherChoice ($values, $service, $cf7) {
        if ($values['importo'] == 'gf_other_choice') {
            $values['importo'] = $values['importo_altro']; // valorizzo il campo importo con il valore inserito dall'utente nel campo 'altro'
        } else {
            $values['importo'] = str_replace(".", "", $values['importo']); // rimuovo l'eventuale punto all'interno dell'importo
        }
        unset($values['importo_altro']);

        return $values;
    }
}
