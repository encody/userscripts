// ==UserScript==
// @name         Jisho.org Search Bar Focus
// @namespace    https://geeklaunch.net
// @version      0.1
// @description  Focus search bar on jisho.org when / is pressed
// @author       Jacob Lindahl
// @match        https://jisho.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('keydown', function (e) {
        if ((e.key === '/' || e.keyCode === 191 || e.which === 191) && document.activeElement === document.body) {
            document.getElementById('keyword').focus();
            e.preventDefault();
        }
    });
})();
