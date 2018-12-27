<?php


add_filter('Forms3rdPartyIntegration_service_filter_args', 'SIDEA_forwardCookies4PardotIntegration', 10, 4);

if (!function_exists('SIDEA_forwardCookies4PardotIntegration')) {
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
        if ($values['input_3'] == 'gf_other_choice') {
            $values['input_3'] = $values['input_3_other'];
        }

        return $values;
    }
}