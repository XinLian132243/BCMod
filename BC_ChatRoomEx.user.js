// ==UserScript==
// @name         BC 聊天室扩展
// @namespace    https://www.bondageprojects.com/
// @version      0.1.0
// @description  聊天室扩展
// @author       XinLian
// @include      /^https:\/\/(www\.)?bondageprojects\.elementfx\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @include      /^https:\/\/(www\.)?bondage-europe\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @connect      gitgud.io
// @grant        GM_xmlhttpRequest
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
	console.log("[ChatRoomEx] Start Load");
    const script = document.createElement("script");
    const timestamp = new Date().getTime(); // 创建当前时间的时间戳
    script.src = `https://gitgud.io/XinLian132243/bcmod/-/raw/master/Source/BC_ChatRoomExSource.user.js?timestamp=${timestamp}`;
    document.head.appendChild(script);

})();

