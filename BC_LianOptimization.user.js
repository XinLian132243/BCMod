// ==UserScript==
// @name         BC Lian 优化
// @namespace    https://www.bondageprojects.com/
// @version      0.1.0
// @description  BC性能优化插件
// @author       XinLian
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @match https://*.bondage-asia.com/Club/R*
// @connect      github.com
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
	console.log("[LianOptimization] 开始加载");
    const script = document.createElement("script");
    const timestamp = new Date().getTime(); // 创建当前时间的时间戳
    script.src = `https://xinlian132243.github.io/BCMod/Source/BC_LianOptimizationSource.user.js?timestamp=${timestamp}`;
    document.head.appendChild(script);

})();
