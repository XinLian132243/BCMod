// ==UserScript==
// @name         BC 涟信
// @namespace    https://www.bondageprojects.com/
// @version      0.1.1
// @description  涟信
// @author       XinLian
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @connect      github.com
// @grant        GM_xmlhttpRequest
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
	console.log("[LianChat] Start Load");
    const script = document.createElement("script");
    const timestamp = new Date().getTime(); // 创建当前时间的时间戳
    script.src = `https://xinlian132243.github.io/BCMod/Source/BC_LianChat.js?timestamp=${timestamp}`;
    document.head.appendChild(script);

})();

