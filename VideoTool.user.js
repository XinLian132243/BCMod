// ==UserScript==
// @name         视频外链提取
// @namespace    https://www.bondageprojects.com/
// @version      0.1.0
// @description  视频外链提取工具
// @author       xl
// @include      /^https:\/\/(www\.)?bilibili\.com\/video\/BV.+\/
// @grant    GM_registerMenuCommand
// @grant    GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      github.com
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
	console.log("[ChatRoomEx] Start Load");
    const script = document.createElement("script");
    const timestamp = new Date().getTime(); // 创建当前时间的时间戳
    script.src = `https://xinlian132243.github.io/BCMod/Source/VideoTool.js?timestamp=${timestamp}`;
    document.head.appendChild(script);

})();

