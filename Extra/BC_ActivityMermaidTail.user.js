// ==UserScript==
// @name         BC 鱼尾扩展
// @namespace    https://www.bondageprojects.com/
// @version      0.1.1
// @description  鱼尾扩展
// @author       XinLian
// @include      /^https:\/\/(www\.)?bondageprojects\.elementfx\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @include      /^https:\/\/(www\.)?bondage-europe\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @connect      github.com
// @grant        GM_xmlhttpRequest
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
	console.log("[BC_ActivityMermaidTail] Start Load");
    const script = document.createElement("script");
    const timestamp = new Date().getTime(); // 创建当前时间的时间戳
    script.src = `https://xinlian132243.github.io/BCMod/Extra/Source/BC_ActivityMermaidTail.js?timestamp=${timestamp}`;
    document.head.appendChild(script);

})();