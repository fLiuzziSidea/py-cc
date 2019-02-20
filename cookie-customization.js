if (jQuery) {
    $ = jQuery;

    const {
        YES_LABEL = 'Acconsento',
        NO_LABEL = 'No',
        PRIVACY_POLICY_LABEL = 'Privacy policy',
        PRIVACY_POLICY_URL = '/privacy-policy/',
        PRIVACY_POLICY_CLASS = 'btn btn-xs btn-default',
        
        YES_CLASS = 'btn btn-xs btn-primary',
        YES_BACKGROUND = '#337ab7', // #09c8ee
        MAX_SECONDS_TRYING = 5,
        HIDE_NO_BUTTON = true, // true false
        ACCEPT_AFTER_SCROLLING = 0.25 // % of page OR true/false
    } = typeof CookieCustomizationOptions !== 'undefined' ? CookieCustomizationOptions : {};
    
    $(function(){
        let i = 0;

        let pardotDeniedConsent = window.localStorage.getItem('pardot-denied-consent') || false;
        const pardotDenyConsent = () => {
            window.localStorage.setItem('pardot-denied-consent', true);
            pardotDeniedConsent = true;
        };

        const INTERVAL_MILLISECONDS_STEP = 500;
        const interval = setInterval(() => {
            i++;
            const yesBtn = $('a[onclick^=piEnableTracking]');
            const noBtn = $('a[onclick^=piDisableTracking]');
            const cookieBarInitialized = yesBtn.length > 0 && noBtn.length > 0;
            
            if (cookieBarInitialized) {
                const container = yesBtn.parent('div');

                const privacyPolicyBtn = $(`&nbsp;<a>${PRIVACY_POLICY_LABEL}</a>`)
                    .addClass(PRIVACY_POLICY_CLASS)
                    .attr('target', '_blank')
                    .attr('href', PRIVACY_POLICY_URL);
                container.find('div').detach(); // tolgo il div vuoto alla fine
                container.append(privacyPolicyBtn); // aggiunto il link alla privacy policy

                yesBtn
                    .css({
                        'background': YES_BACKGROUND,
                        'margin-left': '5px',
                    })
                    .text(YES_LABEL)
                    .addClass(YES_CLASS); // stilizzo il bottone 'yes' per renderlo piú visibile

                noBtn.text(NO_LABEL).click(pardotDenyConsent);
                if (HIDE_NO_BUTTON) noBtn.detach();

                const responsiveClearfix = $('<div></div>')
                    .addClass('clearfix visible-xs');

                responsiveClearfix.insertBefore(yesBtn);

                if (ACCEPT_AFTER_SCROLLING !== undefined && ACCEPT_AFTER_SCROLLING !== false) {
                    $(window).on('scroll', (evt) => {
                        if ($(window).scrollTop() >= (($(document).height() - $(window).height()) * ACCEPT_AFTER_SCROLLING)) {
                            if (!pardotDeniedConsent) yesBtn.click();
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