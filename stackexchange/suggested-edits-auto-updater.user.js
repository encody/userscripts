// ==UserScript==
// @name         StackExchange Suggested Edits Auto-Updater
// @namespace    http://geeklaunch.net/
// @version      0.0.1
// @description  Dynamically updates the suggested edits flag on StackExchange sites
// @author       Jacob
// @match        *://stackexchange.com/*
// @match        *://*.stackexchange.com/*
// @match        *://stackoverflow.com/*
// @match        *://*.stackoverflow.com/*
// @match        *://askubuntu.com/*
// @match        *://*.askubuntu.com/*
// @match        *://serverfault.com/*
// @match        *://*.serverfault.com/*
// @match        *://superuser.com/*
// @match        *://*.superuser.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // How long to wait in between requests, in milliseconds
    let timeout = 10000;

    let txt = 'suggested edits pending approval';

    let span = document.querySelector('span.edit-count.unread-count'),
        a = document.querySelector('.topbar-menu-links > a.topbar-icon.icon-flag.icon-tools-flag.yes-hover');

    if (!span || !a) {
        a = document.createElement('a');
        let t = document.querySelector('.topbar-menu-links');
        t.insertBefore(a, t.children[0]);
        a.href = '/review/suggested-edits';
        a.classList.add('topbar-icon', 'icon-flag', 'icon-tools-flag', 'yes-hover');
        a.title = txt;
        a.style.display = 'none';

        span = document.createElement('span');
        a.appendChild(span);
        span.classList.add('edit-count', 'unread-count');
        span.textContent = '?';
    }

    update();

    function update () {
        $.ajax({
            "type": "POST",
            "url": "/review/suggested-edit-count",
            "data": {
                "fkey": StackExchange.options.user.fkey,
            },
            "dataType": "json",
            "success": function(e) {
                let count = e.count;

                if (!count) {
                    a.style.display = 'none';
                } else {
                    a.style.display = '';
                    a.title = '~' + count + ' ' + txt;
                    span.textContent = count;
                }

                setTimeout(update, timeout);
            },
        });
    }
})();
