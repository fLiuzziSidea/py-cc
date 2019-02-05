if (jQuery) {
    $ = jQuery;

    const {
        YES_LABEL = 'Acconsento',
        NO_LABEL = 'No',
        PRIVACY_POLICY_LABEL = 'Privacy policy',
        PRIVACY_POLICY_URL = '/privacy-policy/',
        
        MAX_SECONDS_TRYING = 5,
        HIDE_NO_BUTTON = true, // true false
        ACCEPT_AFTER_SCROLLING = 0.25 // % of page OR true/false
    } = typeof CookieCustomizationOptions !== 'undefined' ? CookieCustomizationOptions : {};
    
    $(function(){
        let i = 0;
        const INTERVAL_MILLISECONDS_STEP = 500;
        const interval = setInterval(() => {
            i++;
            const yesBtn = $('a[onclick^=piEnableTracking]');
            const noBtn = $('a[onclick^=piDisableTracking]');
            const cookieBarInitialized = yesBtn.length > 0 && noBtn.length > 0;
            
            if (cookieBarInitialized) {

                const container = yesBtn.parent('div');

                const privacyPolicyBtn = $(`&nbsp;<a>${PRIVACY_POLICY_LABEL}</a>`)
                    .addClass('btn btn-xs btn-default')
                    .attr('target', '_blank')
                    .attr('href', PRIVACY_POLICY_URL);
                container.find('div').detach(); // tolgo il div vuoto alla fine
                container.append(privacyPolicyBtn); // aggiunto il link alla privacy policy

                yesBtn
                    .text(YES_LABEL)
                    .addClass('btn btn-primary'); // stilizzo il bottone 'yes' per renderlo piú visibile

                noBtn.text(NO_LABEL);
                if (HIDE_NO_BUTTON) noBtn.detach();

                if (ACCEPT_AFTER_SCROLLING !== undefined && ACCEPT_AFTER_SCROLLING !== false) {
                    $(window).on('scroll', (evt) => {
                        if ($(window).scrollTop() >= (($(document).height() - $(window).height()) * ACCEPT_AFTER_SCROLLING)) {
                            yesBtn.click();
                            $(window).off(evt); // stacco l'evento dopo aver cliccato su si
                        }
                    });
                }
            }
            
            if( ( cookieBarInitialized ) ||
                i > (MAX_SECONDS_TRYING * 1000 / INTERVAL_MILLISECONDS_STEP) ) {
                clearInterval(interval);
            }
        }, INTERVAL_MILLISECONDS_STEP);
    });
}
