// ==UserScript==
// @name         StackExchange Timeline Link
// @namespace    http://geeklaunch.net/
// @version      0.0.1
// @description  Add timeline links to posts.
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

    let question = document.querySelector('.question');

    // If there's no question on this page, skip it
    if (!question) return;

    let questionId = question.getAttribute('data-questionid'),
        questionMenu = question.querySelector('.post-menu');

    addTimelineLink(questionMenu, questionId);

    let answers = [].slice.call(document.querySelectorAll('#answers > .answer'));

    answers.forEach(function (answer) {
        let id = answer.getAttribute('data-answerid'),
            menu = answer.querySelector('.post-menu');

        addTimelineLink(menu, id);
    });

    function addTimelineLink (menu, postId) {
        let link = '/posts/' + postId + '/timeline',
            lsep = document.createElement('span'),
            a = document.createElement('a');

        lsep.classList.add('lsep');
        lsep.textContent = '|';

        a.href = link;
        a.textContent = 'timeline';

        menu.appendChild(lsep);
        menu.appendChild(a);
    }
})();
