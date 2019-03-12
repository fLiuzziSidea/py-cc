<?php

// ...

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
add_filter('Forms3rdPartyIntegration_service_filter_post_1', 'SIDEA_replaceOtherChoice', 10, 4);

if (!function_exists('SIDEA_replaceOtherChoice')) {
    function SIDEA_replaceOtherChoice ($values, $service, $cf7) {
        if ($values['importo'] == 'gf_other_choice' || $values['importo'] == 'ALTRO IMPORTO') {
            $values['importo'] = $values['importo_altro']; // valorizzo il campo importo con il valore inserito dall'utente nel campo 'altro'
            if (is_numeric($values['importo']) && !is_float($values['importo'] + 0)) {
                $values['importo'] = number_format($values['importo'], 0, ",", '.'); // se il valore inserito è numerico, lo formatto (es 150.200)
            }
        }

        unset($values['importo_altro']); // in ogni caso, al termine cancello la chiave importo_altro

        return $values;
    }
}

add_filter('Forms3rdPartyIntegration_service_filter_post', 'SIDEA_email_filler', 10, 5);
if (!function_exists('SIDEA_email_filler')) {
    function SIDEA_email_generator() {
        $name = uniqid('no_mail-');

        return "{$name}@prestiyou.nomail";
    }

    function SIDEA_email_filler($post, $service, $form, $sid, $submission) {
        if (empty($post['email'])) {
            $post['email'] = SIDEA_email_generator();
        }

        return $post;
    }
}