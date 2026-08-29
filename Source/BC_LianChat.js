// ==UserScript==
// @name         BC LianChat
// @namespace    https://www.bondageprojects.com/
// @version      0.1.2
// @description  LianChat
// @author       XinLian
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @match https://*.bondage-asia.com/club/R*/*
// @grant        none
// @license      MIT
// ==/UserScript==


(function () {
    'use strict';
    // FUSAM規範的防重複加載
    if (window.LianChat) {
        console.warn('[LianChat] is loaded, skip duplicate imports...');
        return;
    }
    // =======================================================================================
    var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

    const MOD_NAME = "LianChat";
    const MOD_FULL_NAME = "LianChat";
    const MOD_VERSION = "0.1.2";


    const mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    }, { allowReplace: true });

    // =======================================================================================
    const w = window;
    // =======================================================================================

    // 在文件开头添加配置对象
    const config = {
        allowedImageHosts: [
            'github.io',
            'gitlab.io',
            'ibb.co',
            'imgbb.com',
            'imgchest.com',
            'imgur.com',
            'postimg.cc',
            'hd-r.icu'
        ],
        maxMessageCount: 50,
        maxShowPlayerCountOnLoading: 20
    };

    const HidePrivateChatEnum = {
        NONE: 0,        // 不隐藏
        HIDE_WHEN_SHOW_DIALOG: 1,    // 显示对话框时隐藏
        HIDE_ALL_TIME: 2 // 隐藏所有私聊
    };

    const FloatZindex = 100001;

    // 为可滚动区域增加拖曳滚动；allowTextSelect 保留文字选择能力。
    function makeDragScrollable(el, opts) {
        if (!el || el.dataset.lcDragScroll) return;
        el.dataset.lcDragScroll = '1';
        opts = opts || {};
        let isDown = false, moved = false, startX = 0, startY = 0, scrollLeft0 = 0, scrollTop0 = 0;
        const THRESHOLD = 4;
        el.addEventListener('mousedown', function (e) {
            // 已有专属交互的元素（按钮/输入框/连结）不要抢走它们的点击/输入焦点
            if (e.target.closest && e.target.closest('input, textarea, button, a')) return;
            isDown = true;
            moved = false;
            startX = e.clientX;
            startY = e.clientY;
            scrollLeft0 = el.scrollLeft;
            scrollTop0 = el.scrollTop;
        });
        function onMove(e) {
            if (!isDown) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (!moved && (Math.abs(dx) > THRESHOLD || Math.abs(dy) > THRESHOLD)) {
                moved = true;
                if (!opts.allowTextSelect) el.classList.add('lc-drag-scrolling');
            }
            if (moved) {
                el.scrollLeft = scrollLeft0 - dx;
                el.scrollTop = scrollTop0 - dy;
                if (!opts.allowTextSelect) e.preventDefault();
            }
        }
        function onUp() {
            if (!isDown) return;
            isDown = false;
            el.classList.remove('lc-drag-scrolling');
        }
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
        // 拖曳滚动结束后紧接着的 click 是「拖出来的」，不是真正点击，吞掉它避免误触房间/成员项
        // （允许文字选取的容器不吞 click：那类容器点击本来就没有「打开」语义，不需要防误触）
        el.addEventListener('click', function (e) {
            if (moved) {
                if (!opts.allowTextSelect) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                moved = false;
            }
        }, true);
    }

    // =======================================================================================
    // 主题、设计变量与图标
    // 覆盖范围：injectDesignTokens() / ThemeModule（data-lc-theme-pref + data-lc-theme）/
    //           LC_ICONS 14 枚 / lcIcon() 渲染辅助。
    // =======================================================================================

    // ── SVG 图标集（design-strategist 提供，stroke:currentColor，零色值；颜色由父级 .lc-* 控制）
    const LC_ICONS = {
        chat: '<img src="https://cdn.jsdelivr.net/gh/XinLian132243/BCMod@master/Assets/LianChatButton.png" alt="LianChat" draggable="false" style="width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;"/>',
        pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
        gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14.2 3h-4l-.3 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2l.3 2.6h4l.3-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.07-.4.1-.8.1-1.2Z"/></svg>',
        close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
        plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
        disk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
        chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
        chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
        send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-11 11"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>',
        sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4.4" fill="currentColor" stroke="none"/><path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7"/></svg>',
        half: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a8.6 8.6 0 0 0 0 17.2z" fill="currentColor" stroke="none"/></svg>',
        moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 14.6A8.6 8.6 0 0 1 9.4 3.7a8.6 8.6 0 1 0 10.9 10.9z"/></svg>',
        emptyChat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.9 8.9 0 0 1-3.8-.9L3 20l1.2-5.4a8.2 8.2 0 0 1-.9-3.7A8.4 8.4 0 0 1 11.8 2.5 8.4 8.4 0 0 1 21 11.5Z"/><circle cx="9" cy="11.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="11.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="11.5" r="1.1" fill="currentColor" stroke="none"/></svg>',
        person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
        door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V5l7-3 7 3v16"/><path d="M9 21v-6h6v6"/><path d="M12 11.8v.6"/></svg>',
        panelToggle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M14 4v16"/><path d="M9 10l3 2-3 2"/></svg>'
    };

    // 渲染辅助：<span class="lc-ico [cls]"><svg…/></span>；尺寸由 CSS class 控制
    function lcIcon(name, cls) {
        const svg = LC_ICONS[name] || '';
        return '<span class="lc-ico' + (cls ? ' ' + cls : '') + '">' + svg + '</span>';
    }

    // ── 设计令牌 CSS 层（注入 head，id=lc-ui-style；幂等：先删旧再建）
    function injectDesignTokens() {
        const old = document.getElementById('lc-ui-style');
        if (old) old.remove();
        const style = document.createElement('style');
        style.id = 'lc-ui-style';
        style.textContent = [
            /* 基础令牌（双主题共享） */
            'html[data-lc-theme]{',
            '  --ease:cubic-bezier(.3,1.3,.4,1);',
            '  --ease-out:cubic-bezier(.16,1,.3,1);',
            '  --ease-spring:cubic-bezier(.34,1.56,.64,1);',
            '  --r-pill:999px; --r-tab:9px; --r-card:14px; --r-row:10px;',
            '  --lc-font:-apple-system,"PingFang SC","Microsoft YaHei","Noto Sans SC",sans-serif;',
            '}',
            /* 亮色主题令牌 */
            'html[data-lc-theme="light"]{',
            '  --bg:#F6F1E7; --bg-sink:#F1EBDE; --panel:#EBE6DA; --panel-dn:#CEC9BA;',
            '  --card:#FBF8F1; --seam:#E4DED0;',
            '  --list-surface:#EBE6DA; --content-surface:rgb(241,235,222);',
            '  --input-surface:#D9D4C9;',
            '  --divider:#C8BDAA;',
            '  --ink:#11100F; --ink-2:#3F3B36; --ink-3:#67615A;',
            '  --accent:#E8483F; --accent-soft:rgba(232,72,63,.12);',
            '  --line:rgba(43,41,37,.10); --hairline:rgba(43,41,37,.08);',
            '  --shadow:rgba(43,41,37,.08) 0 1px 2px, rgba(43,41,37,.06) 0 6px 20px -6px;',
            '  --shadow-float:rgba(43,41,37,.12) 0 2px 4px, rgba(43,41,37,.10) 0 12px 32px -8px;',
            '  --shadow-inset:inset rgba(255,255,255,.55) 0 1px 0;',
            '  --btn-ink:#1A1917; --btn-ink-h:#2D2B28; --btn-sink:#050505; --btn-label:#F6F3EC;',
            '}',
            /* 经典主题令牌 */
            'html[data-lc-theme="classic"]{',
            '  --bg:#FFFFFF; --bg-sink:#F5F5F5; --panel:#FFFFFF; --panel-dn:rgb(237,237,237);',
            '  --card:#FFFFFF; --seam:#D8D8D8;',
            '  --list-surface:#FFFFFF; --content-surface:rgb(245,245,245);',
            '  --input-surface:#F5F5F5;',
            '  --divider:#C8C8C8;',
            '  --ink:#111111; --ink-2:#3F3F3F; --ink-3:#666666;',
            '  --accent:#1890FF; --accent-soft:#E6F4FF;',
            '  --line:rgba(0,0,0,.12); --hairline:rgba(0,0,0,.10);',
            '  --shadow:rgba(0,0,0,.12) 0 2px 8px; --shadow-float:rgba(0,0,0,.18) 0 4px 14px;',
            '  --shadow-inset:inset rgba(255,255,255,.65) 0 1px 0;',
            '  --btn-ink:#222222; --btn-ink-h:#000000; --btn-sink:#000000; --btn-label:#FFFFFF;',
            '}',
            /* 暗色主题令牌 */
            'html[data-lc-theme="dark"]{',
            '  --bg:#211c19; --bg-sink:#2a2420; --panel:#322a25; --panel-dn:#1a1614;',
            '  --card:#2a2420; --seam:rgba(255,255,255,.11);',
            '  --list-surface:rgb(50,42,37); --content-surface:#2A2420;',
            '  --input-surface:#2A2420;',
            '  --divider:rgba(255,255,255,.28);',
            '  --ink:#FFFFFF; --ink-2:#ECE7DF; --ink-3:#C7BEB2;',
            '  --accent:#f0805a; --accent-soft:rgba(240,128,90,.16);',
            '  --line:rgba(255,255,255,.07); --hairline:rgba(255,255,255,.05);',
            '  --shadow:rgba(0,0,0,.2) 0 1px 2px, rgba(0,0,0,.15) 0 6px 20px -6px;',
            '  --shadow-float:rgba(0,0,0,.25) 0 2px 4px, rgba(0,0,0,.20) 0 12px 32px -8px;',
            '  --shadow-inset:inset rgba(255,255,255,.04) 0 1px 0;',
            '  --btn-ink:#F2EEE6; --btn-ink-h:#FFFFFF; --btn-sink:#000000; --btn-label:#1A1917;',
            '}',
            /* 图标尺寸 */
            '.lc-ico{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;line-height:0}',
            '.lc-ico svg{display:block;width:100%;height:100%}',
            '.lc-ico img{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}',
            '.lc-ico--sm{width:14px;height:14px}',
            '.lc-ico--md{width:16px;height:16px}',
            '.lc-ico--lg{width:24px;height:24px}',
            '.lc-drag-scrolling{cursor:grabbing!important;user-select:none!important;-webkit-user-select:none!important}',
            /* 主题拨杆浮层宿主（Step3 头部重排后并入对话框 head，届时删此宿主）
               z=100001 与 fab 同级：保证 Step1 期间浮层恒在面板之上可点；并入面板后不适用 */
            '#lc-theme-host{position:fixed;right:10px;bottom:162px;z-index:100001;display:flex;align-items:center;gap:8px;font-family:var(--lc-font);-webkit-tap-highlight-color:transparent}',
            '#lc-theme-host.lc-pending{visibility:hidden;pointer-events:none}',
            '.lc-theme-chip{font-size:11px;color:var(--ink-2);letter-spacing:.06em;white-space:nowrap;transition:color .2s var(--ease)}',
            /* 3D 拨杆（72×48，home.css 旋钮文化 + v3.5 预览规格） */
            '.lc-theme-dial{position:relative;width:72px;height:48px;flex:none;border:0;padding:0;background:none;cursor:pointer;border-radius:14px}',
            '.lc-theme-dial:focus-visible{outline:2px solid var(--accent);outline-offset:2px}',
            '.lc-td-mark{position:absolute;width:10px;height:10px;color:color-mix(in srgb,var(--ink-2) 78%,var(--bg));transition:color .2s var(--ease)}',
            '.lc-td-mark svg{width:10px;height:10px;display:block}',
            '.lc-td-mark.light{left:11.3px;top:12.2px}',
            '.lc-td-mark.classic{left:31px;top:2px}',
            '.lc-td-mark.dark{left:50.7px;top:12.2px}',
            '.lc-td-seat{position:absolute;left:23px;top:18px;width:26px;height:26px;border-radius:50%;background:var(--panel);border:1px solid var(--seam);box-shadow:inset 0 1px 2px rgba(43,41,37,.10)}',
            '.lc-td-stem{position:absolute;left:36px;top:31px;width:9px;height:18px;margin:-16px 0 0 -4.5px;transform-origin:4.5px 16px;border-radius:50%;background:var(--card);border:1px solid var(--seam);box-shadow:0 1px 3px rgba(43,41,37,.26);transition:transform .32s var(--ease-spring)}',
            '.lc-td-slot{position:absolute;left:50%;top:3px;width:8px;height:2.5px;margin-left:-4px;border-radius:2px;background:var(--accent)}',
            'html[data-lc-theme-pref="light"] .lc-td-stem{transform:rotate(-55deg)}',
            'html[data-lc-theme-pref="classic"] .lc-td-stem{transform:rotate(0deg)}',
            'html[data-lc-theme-pref="dark"] .lc-td-stem{transform:rotate(55deg)}',
            'html[data-lc-theme-pref="light"] .lc-td-mark.light,',
            'html[data-lc-theme-pref="classic"] .lc-td-mark.classic,',
            'html[data-lc-theme-pref="dark"] .lc-td-mark.dark{color:var(--ink)}',
            /* reduced-motion 守卫 */
            '@media (prefers-reduced-motion:reduce){',
            '  .lc-td-stem{transition:none!important}',
            '  .lc-theme-chip{transition:none}',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    }

    // ── ThemeModule：双属性 data-lc-theme-pref（用户偏好）/ data-lc-theme（实际生效）
    const ThemeModule = (function () {
        const STORAGE_KEY = 'LC_THEME_PREF';
        const PREF_VALUES = ['classic', 'light', 'dark'];
        let pref = 'classic';

        function readPref() {
            try {
                const v = localStorage.getItem(STORAGE_KEY);
                if (v === 'auto') return 'classic';
                if (PREF_VALUES.indexOf(v) >= 0) return v;
            } catch (e) { console.warn('[LianChat-UI] localStorage 不可用，主题偏好仅本次生效', e); }
            return 'classic';
        }
        function writePref(v) {
            try { localStorage.setItem(STORAGE_KEY, v); }
            catch (e) { console.warn('[LianChat-UI] 主题偏好保存失败', e); }
        }
        function effective() { return pref; }

        function apply() {
            const eff = effective();
            const root = document.documentElement;
            root.setAttribute('data-lc-theme-pref', pref);
            root.setAttribute('data-lc-theme', eff);
            const dial = document.getElementById('lcThemeDial');
            if (dial) dial.setAttribute('aria-label', '主题模式：' + ({ classic: '经典', light: '亮色', dark: '暗色' }[pref]));
            const chip = document.getElementById('lcThemeChip');
            if (chip) chip.textContent = ({ classic: '经典', light: '亮色', dark: '暗色' }[eff]);
        }

        function renderDial() {
            const old = document.getElementById('lc-theme-host');
            if (old) old.remove();
            const host = document.createElement('div');
            host.id = 'lc-theme-host';
            host.classList.add('lc-pending');
            host.innerHTML =
                '<button class="lc-theme-dial" id="lcThemeDial" type="button" aria-label="主题模式">' +
                '<span class="lc-td-mark light" aria-hidden="true">' + LC_ICONS.sun + '</span>' +
                '<span class="lc-td-mark classic" aria-hidden="true">' + LC_ICONS.half + '</span>' +
                '<span class="lc-td-mark dark" aria-hidden="true">' + LC_ICONS.moon + '</span>' +
                '<span class="lc-td-seat"></span>' +
                '<span class="lc-td-stem"><span class="lc-td-slot"></span></span>' +
                '</button>' +
                '<span class="lc-theme-chip" id="lcThemeChip"></span>';
            document.body.appendChild(host);
            host.querySelector('.lc-theme-dial').addEventListener('click', function () {
                const i = PREF_VALUES.indexOf(pref);
                pref = PREF_VALUES[(i + 1) % PREF_VALUES.length];
                writePref(pref);
                apply();
            });
        }

        function init() {
            pref = readPref();
            renderDial();
            apply();
        }

        function dispose() {
        }

        return { init: init, apply: apply, dispose: dispose, getPref: function () { return pref; } };
    })();

    // Step1 自启动
    injectDesignTokens();
    ThemeModule.init();

    // 主题拨杆尚未移入面板前跟随 FAB 位置。
    // 这个函式就不再做事。
    function _positionThemeHostNearFab() {
        try {
            const host = document.getElementById('lc-theme-host');
            if (!host || host.style.position === 'static') return; // 已并入面板头部，不需要处理
            const fab = document.getElementById('floatingMessageButton');
            if (!fab) return; // FAB 尚未创建，维持 CSS 默认位置
            const rect = fab.getBoundingClientRect();
            if (!rect.width && !rect.height) return; // FAB 还没排版完成
            const gap = 10;
            if (rect.top > window.innerHeight / 2) {
                host.style.bottom = (window.innerHeight - rect.top + gap) + 'px';
                host.style.top = 'auto';
            } else {
                host.style.top = (rect.bottom + gap) + 'px';
                host.style.bottom = 'auto';
            }
            if (rect.left > window.innerWidth / 2) {
                host.style.right = (window.innerWidth - rect.right) + 'px';
                host.style.left = 'auto';
            } else {
                host.style.left = rect.left + 'px';
                host.style.right = 'auto';
            }
        } catch (e) {}
    }
    window.addEventListener('resize', _positionThemeHostNearFab);

    // 累积注入幂等：注册清理（断开监听器 + 删顶层元素），供 lc-hot-inject 重注入前调用
    try {
        window.__LC_UI_CLEANUP__ = window.__LC_UI_CLEANUP__ || [];
        window.__LC_UI_CLEANUP__.push(function () {
            try { ThemeModule.dispose(); } catch (e) {}
            var s = document.getElementById('lc-ui-style'); if (s) s.remove();
            var h = document.getElementById('lc-theme-host'); if (h) h.remove();
        });
    } catch (e) {}

    // =======================================================================================

    // =======================================================================================
    // 悬浮消息按钮
    // =======================================================================================

    // ── 悬浮按钮 CSS（附加进 #lc-ui-style；幂等：检测 lc-fab 指纹避免重复追加）
    const LC_FAB_CSS = [
        /* 本体：58px 圆、卡片底、发丝边、内高光、浮层阴影 */
        '.lc-fab{position:fixed;z-index:100001;width:58px;height:58px;border-radius:50%;isolation:isolate;overflow:visible;',
        '  display:flex;align-items:center;justify-content:center;cursor:pointer;',
        '  background:var(--card);border:1px solid var(--hairline);',
        '  box-shadow:var(--shadow-inset),var(--shadow-float);',
        '  color:var(--ink);font-size:24px;user-select:none;-webkit-tap-highlight-color:transparent;',
        '  transition:transform .2s var(--ease),box-shadow .2s var(--ease),background .2s var(--ease);}',
        '.lc-fab:hover{transform:translateY(-2px);box-shadow:var(--shadow-inset),0 4px 10px var(--line),var(--shadow-float)}',
        /* 聚焦：去除浏览器默认蓝色 outline，改用强调色环（可访问性保留 :focus-visible） */
        '.lc-fab:focus{outline:none}',
        '.lc-fab:focus-visible{outline:none;box-shadow:var(--shadow-inset),var(--shadow-float),0 0 0 3px var(--accent-soft)}',
        '.lc-fab:active{transform:scale(.92)}',
        /* 对话框打开态：糖果强调色 */
        '.lc-fab--open{background:var(--accent);color:var(--btn-label);border-color:transparent}',
        '.lc-fab--open .lc-fab-ico{color:var(--btn-label)}',
        /* 图标（currentColor，零色值） */
        '.lc-fab .lc-ico{width:32px;height:32px;color:var(--ink)}',
        /* 未读徽标 */
        '.lc-fab-badge{position:absolute;z-index:3;top:-6px;right:-6px;min-width:18px;height:18px;padding:0 5px;',
        '  display:flex;align-items:center;justify-content:center;box-sizing:border-box;',
        '  border-radius:999px;background:var(--accent);color:var(--btn-label);',
        '  font:700 11px/1 var(--lc-font);box-shadow:0 2px 6px rgba(0,0,0,.25);border:1px solid var(--card);}',
        /* 未讀通知光圈 */
        '.lc-fab-ring{position:absolute;z-index:0;inset:0;border-radius:50%;pointer-events:none;box-shadow:none}',
        '.lc-fab--unread .lc-fab-ring{animation:lcFabRingFast 1.2s ease-out infinite}',
        '@keyframes lcFabRingFast{0%{box-shadow:0 0 2px 0 var(--accent);opacity:.65}100%{box-shadow:0 0 18px 22px var(--accent);opacity:0}}',
        '.lc-fab--unread .lc-fab-badge{animation:lcBadgePop .36s var(--ease-spring) both}',
        /* 来消息：按钮级呼吸光晕 + 加速光环，辨识度拉满 */
        '.lc-fab--unread{animation:none}',
        '@keyframes lcBadgePop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.35)}100%{transform:scale(1);opacity:1}}',
        /* 入场 */
        '.lc-fab-ico{position:relative;z-index:2}.lc-fab--rise{animation:lcFabRise .42s var(--ease-spring) both}',
        '@keyframes lcFabRise{from{opacity:0;transform:translateY(14px) scale(.8)}to{opacity:1;transform:translateY(0) scale(1)}}',
        /* reduced-motion 守卫 */
        '@media (prefers-reduced-motion:reduce){',
        '  .lc-fab,.lc-fab:hover,.lc-fab:active{transition:none!important;transform:none!important}',
        '  .lc-fab-ring{animation:none!important}',
        '  .lc-fab--rise{animation:none!important}',
        '  .lc-fab--unread,.lc-fab--unread .lc-fab-ring,.lc-fab--unread .lc-fab-badge{animation:none!important}',
        '}'
    ].join('\n');

    function injectFabStyle() {
        const s = document.getElementById('lc-ui-style');
        if (!s) return;
        if (s.textContent.indexOf('lc-fab') >= 0) return; // 幂等
        s.textContent += '\n' + LC_FAB_CSS;
    }

    // 重应用：对单个 FAB 做外观换肤（幂等，断开观察器避免自触发循环）
    let _fabObs = null;
    function reskinFab(fab) {
        if (!fab) return;
        if (_fabObs) _fabObs.disconnect();
        // 删除外观冲突内联（保留 position/right/bottom/zIndex 位置相关）
        ['width', 'height', 'backgroundColor', 'borderRadius', 'boxShadow', 'fontSize',
         'userSelect', 'display', 'alignItems', 'justifyContent', 'transition', 'border', 'color'
        ].forEach(function (p) { try { fab.style[p] = ''; } catch (e) {} });
        fab.classList.add('lc-fab');
        // 入场动画仅首次（重渲染用 html.lc-no-anim 跳过）
        if (!fab.dataset.lcFabDone && !document.documentElement.classList.contains('lc-no-anim')) {
            fab.classList.add('lc-fab--rise');
            fab.dataset.lcFabDone = '1';
        }
        // 清理原 PNG 图标 div
        const png = fab.querySelector('div[style*="background-image"]');
        if (png) png.remove();
        // 图标 span（currentColor SVG）
        let icon = fab.querySelector('.lc-fab-ico');
        if (!icon) {
            icon = document.createElement('span');
            icon.className = 'lc-fab-ico lc-ico lc-ico--lg';
            fab.insertBefore(icon, fab.firstChild);
        }
        icon.innerHTML = LC_ICONS.chat;
        // 呼吸环（始终存在）
        if (!fab.querySelector('.lc-fab-ring')) {
            const ring = document.createElement('span');
            ring.className = 'lc-fab-ring';
            fab.appendChild(ring);
        }
        // 徽标换肤（插件生成，保留未读数；仅加 class + 清内联）
        const nodes = fab.children;
        for (let i = 0; i < nodes.length; i++) {
            const el = nodes[i];
            if (el.classList.contains('lc-fab-ico') || el.classList.contains('lc-fab-ring')) continue;
            if (el.tagName === 'DIV' && (el.style.backgroundImage || el.style.backgroundColor || el.style.cssText)) {
                el.className = 'lc-fab-badge';
                el.style.cssText = '';
            }
        }
        // 重新挂观察器（仅 childList + class，避免拖拽 right/bottom 触发）
        if (_fabObs) _fabObs.observe(fab, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }

    function observeFab(fab) {
        if (_fabObs) _fabObs.disconnect();
        _fabObs = new MutationObserver(function () { reskinFab(fab); });
        _fabObs.observe(fab, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }

    let _fabWaitObs = null;
    function applyFabReskin() {
        const fab = document.getElementById('floatingMessageButton');
        if (fab) { reskinFab(fab); observeFab(fab); restoreFabSnap(fab); _positionThemeHostNearFab(); return; }
        // 尚未创建（提交源码加载顺序）：等其出现后一次性应用
        if (_fabWaitObs) return;
        _fabWaitObs = new MutationObserver(function (muts) {
            for (let i = 0; i < muts.length; i++) {
                const m = muts[i];
                for (let j = 0; j < m.addedNodes.length; j++) {
                    const n = m.addedNodes[j];
                    if (n.nodeType === 1 && (n.id === 'floatingMessageButton' || (n.querySelector && n.querySelector('#floatingMessageButton')))) {
                        if (_fabWaitObs) _fabWaitObs.disconnect();
                        _fabWaitObs = null;
                        const f = document.getElementById('floatingMessageButton');
                        if (f) { reskinFab(f); observeFab(f); restoreFabSnap(f); _positionThemeHostNearFab(); }
                        return;
                    }
                }
            }
        });
        _fabWaitObs.observe(document.body, { childList: true, subtree: true });
    }

    // 加载时从 localStorage 恢复上次吸附位置（仅 left/top 绝对定位，清除 right/bottom 漂移）
    function restoreFabSnap(fab) {
        try {
            const raw = localStorage.getItem('floatingMessageButtonPositionSnap');
            if (!raw) return;
            const pos = JSON.parse(raw);
            if (!pos || typeof pos.left !== 'number' || typeof pos.top !== 'number') return;
            const m = 12;
            const left = Math.max(m, Math.min(pos.left, window.innerWidth - fab.offsetWidth - m));
            const top = Math.max(m, Math.min(pos.top, window.innerHeight - fab.offsetHeight - m));
            fab.style.transition = 'none';
            fab.style.left = left + 'px';
            fab.style.top = top + 'px';
            fab.style.right = 'auto';
            fab.style.bottom = 'auto';
            // 让 transition 恢复（避免后续拖拽动画失效）
            requestAnimationFrame(function () {
                fab.style.transition = 'transform .2s var(--ease),box-shadow .2s var(--ease),background .2s var(--ease)';
            });
        } catch (e) {}
    }

    // 将 FAB 吸附到最近的一条屏幕边。实际调用合并进插件原生拖曳流程，
    // 避免两套 mouse/touch 监听器同时改写位置。
    function snapFabToNearestEdge(fab) {
        if (!fab) return;
        const rect = fab.getBoundingClientRect();
        const w = rect.width || fab.offsetWidth;
        const h = rect.height || fab.offsetHeight;
        const m = 12;
        let left = Math.max(0, Math.min(parseFloat(fab.style.left) || rect.left, window.innerWidth - w));
        let top = Math.max(0, Math.min(parseFloat(fab.style.top) || rect.top, window.innerHeight - h));
        const distances = [left, window.innerWidth - left - w, top, window.innerHeight - top - h];
        const nearest = distances.indexOf(Math.min.apply(null, distances));
        if (nearest === 0) left = m;
        else if (nearest === 1) left = Math.max(m, window.innerWidth - w - m);
        else if (nearest === 2) top = m;
        else top = Math.max(m, window.innerHeight - h - m);
        left = Math.max(m, Math.min(left, window.innerWidth - w - m));
        top = Math.max(m, Math.min(top, window.innerHeight - h - m));
        fab.style.transition = 'left .28s var(--ease),top .28s var(--ease)';
        fab.style.left = left + 'px';
        fab.style.top = top + 'px';
        fab.style.right = 'auto';
        fab.style.bottom = 'auto';
        try { localStorage.setItem('floatingMessageButtonPositionSnap', JSON.stringify({ left: left, top: top })); } catch (e) {}
        setTimeout(function () {
            if (fab) fab.style.transition = 'transform .2s var(--ease),box-shadow .2s var(--ease),background .2s var(--ease)';
        }, 320);
    }

    // 初始化 FAB 外观
    injectFabStyle();
    applyFabReskin();

    // 累积注入幂等：清理 STEP2 新增元素/观察器/监听器
    try {
        window.__LC_UI_CLEANUP__ = window.__LC_UI_CLEANUP__ || [];
        window.__LC_UI_CLEANUP__.push(function () {
            if (_fabObs) _fabObs.disconnect();
            if (_fabWaitObs) _fabWaitObs.disconnect();
            var fab = document.getElementById('floatingMessageButton');
            if (fab) {
                fab.classList.remove('lc-fab', 'lc-fab--rise', 'lc-fab--open');
                var r = fab.querySelector('.lc-fab-ring'); if (r) r.remove();
                var i = fab.querySelector('.lc-fab-ico'); if (i) i.remove();
            }
        });
    } catch (e) {}


    // =======================================================================================
    // 消息面板外观
    // =======================================================================================

    const LC_DIALOG_CSS = [
        /* 面板外壳 */
        '.lc-panel{background:var(--panel);border:1px solid var(--seam);border-radius:var(--r-card);box-shadow:var(--shadow);color:var(--ink);font-family:var(--lc-font);animation:lcPanelIn .3s var(--ease-spring) both}',
        '@keyframes lcPanelIn{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}',
        /* 面板关闭动画：forwards 保持终态到 210ms 计时器隐藏元素；重新开启时会先清除此类。 */
        '.lc-panel--closing{animation:lcPanelOut .2s var(--ease) forwards;pointer-events:none}',
        '@keyframes lcPanelOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.97)}}',
        /* 滚动条：webkit 自定义（火柴粗细、hover 加深），同时 firefox thin */
        '.lc-panel *::-webkit-scrollbar{width:8px;height:8px}',
        '.lc-panel *::-webkit-scrollbar-track{background:transparent}',
        '.lc-panel *::-webkit-scrollbar-thumb{background:var(--panel-dn);border-radius:4px;border:2px solid transparent;background-clip:padding-box;transition:background .15s var(--ease)}',
        '.lc-panel *::-webkit-scrollbar-thumb:hover{background:var(--panel-dn)}',
        '.lc-panel *{scrollbar-width:thin;scrollbar-color:var(--panel-dn) transparent}',
        /* 头像：圆 40、白边 2、微阴影，hover 微放大 */
        '.lc-av{width:40px;height:40px;border-radius:50%;border:2px solid var(--card);box-shadow:0 1px 3px var(--line);object-fit:cover;flex-shrink:0;background:var(--bg-sink);transition:transform .15s var(--ease)}',
        '.lc-conv-item:hover .lc-av{transform:scale(1.06)}',
        /* 消息气泡出现动画 */
        '@keyframes lcMsgIn{from{opacity:0;transform:translateY(6px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}',
        '.lc-msg-self,.lc-msg-other,.lc-bubble{animation:lcMsgIn .28s var(--ease-spring) both}',
        /* 自己消息从右侧滑入，他人从左侧滑入 */
        '.lc-msg-self .lc-bubble{animation:lcMsgInR .28s var(--ease-spring) both}',
        '.lc-msg-other .lc-bubble{animation:lcMsgInL .28s var(--ease-spring) both}',
        '@keyframes lcMsgInR{from{opacity:0;transform:translateX(12px) scale(.98)}to{opacity:1;transform:translateX(0) scale(1)}}',
        '@keyframes lcMsgInL{from{opacity:0;transform:translateX(-12px) scale(.98)}to{opacity:1;transform:translateX(0) scale(1)}}',
        '.lc-panel-head{background:var(--panel-dn);border-bottom:1px solid var(--seam);padding:6px 10px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-shrink:0}',
        '.lc-chat-header{background:var(--content-surface)!important;color:var(--ink)!important;border-bottom:1px solid var(--seam)!important}',
        '.lc-chat-header h3,.lc-chat-header span{color:inherit}',
        '.lc-room-info-btn{border:1px solid var(--accent)!important;background:var(--accent-soft)!important;color:var(--accent)!important}',
        '#roomInfoPopup{background:var(--list-surface)!important;color:var(--ink)!important;border:1px solid var(--divider)!important;border-radius:12px!important;box-shadow:var(--shadow-float)!important}',
        '#roomInfoPopup .lc-room-description{color:var(--ink-2)!important}',
        '.lc-panel input,.lc-panel textarea,.lc-panel button{color:var(--ink)}',
        '.lc-panel h1,.lc-panel h2,.lc-panel h3,.lc-panel strong{color:var(--ink)}',
        /* 头部按钮（16px SVG） */
        '.lc-head-btn{width:32px;height:32px;border:1px solid var(--seam);border-radius:10px;background:var(--card);color:var(--ink-2);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:background .15s var(--ease),color .15s var(--ease),transform .15s var(--ease)}',
        '.lc-head-btn:hover{background:var(--accent-soft);color:var(--accent)}',
        '.lc-head-btn:focus{outline:none}',
        '.lc-head-btn:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent-soft)}',
        '.lc-head-btn:active{transform:scale(.94)}',
        /* 迷你按钮同样处理焦点 */
        '.lc-mini-btn:focus{outline:none}',
        '.lc-mini-btn:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent-soft)}',
        '.lc-head-btn .lc-ico{width:16px;height:16px}',
        /* 右工具条（14px 迷你按钮） */
        '.lc-right-head{background:var(--panel-dn);border-top:1px solid var(--seam);border-bottom:1px solid var(--seam);padding:5px 8px;display:flex;align-items:center;justify-content:space-between;gap:6px;flex-shrink:0}',
        '.lc-mini-btn{height:28px;min-width:28px;padding:0 8px;border:1px solid var(--seam);border-radius:8px;background:var(--card);color:var(--ink-2);display:inline-flex;align-items:center;justify-content:center;gap:4px;cursor:pointer;font-size:12px;transition:background .15s var(--ease),color .15s var(--ease)}',
        '.lc-mini-btn:hover{background:var(--accent-soft);color:var(--accent)}',
        '.lc-mini-btn .lc-ico{width:14px;height:14px}',
        '.lc-save-btn{background:var(--card)!important;color:var(--ink-2)!important;border:1px solid var(--seam)!important}',
        '.lc-save-btn:hover{background:var(--accent-soft)!important;color:var(--accent)!important;filter:none}',
        /* 搜索框包裹 */
        '.lc-search-wrap{display:flex;align-items:center;gap:8px;padding:0 0 10px 0;border-bottom:1px solid var(--divider);margin-bottom:10px}',
        '.lc-search-wrap input{flex:1;width:100%;padding:8px 10px;border:1px solid var(--seam);border-radius:10px;background:var(--input-surface);color:var(--ink);box-sizing:border-box;font-family:var(--lc-font);font-size:13px;outline:none;transition:border-color .15s var(--ease),box-shadow .15s var(--ease)}',
        '.lc-search-wrap input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}',
        /* 输入区 */
        '.lc-input{flex:1;padding:10px 12px;border:1px solid var(--seam);border-radius:12px;background:var(--input-surface);color:var(--ink);font-family:var(--lc-font);font-size:14px;outline:none;resize:none;transition:border-color .15s var(--ease),box-shadow .15s var(--ease)}',
        '.lc-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}',
        /* 发送按钮（糖果） */
        '.lc-ico-send{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border:none;border-radius:12px;background:var(--accent);color:var(--btn-label);font-weight:600;font-size:14px;cursor:pointer;font-family:var(--lc-font);transition:filter .15s var(--ease),transform .15s var(--ease)}',
        '.lc-ico-send:hover{filter:brightness(1.06)}',
        '.lc-ico-send:active{transform:scale(.96)}',
        '.lc-ico-send .lc-ico{width:16px;height:16px}',
        /* 会话列表项 */
        '.lc-conv-item{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:var(--r-row);cursor:pointer;transition:background .15s var(--ease);background:var(--list-surface)!important;color:var(--ink)!important}',
        '.lc-conv-item:hover{background:var(--bg-sink)!important}',
        '.lc-conv-item.is-active{background:var(--accent-soft)!important}',
        '.lc-conv-item > div{background:transparent!important;color:inherit!important}',
        '.lc-conv-list,.lc-message-log{background:var(--list-surface)!important;color:var(--ink)!important}',
        '.lc-conv-list{border-right:1px solid var(--seam)}',
        '.lc-av{width:36px;height:36px;border-radius:50%;flex:none;overflow:hidden;display:flex;align-items:center;justify-content:center;background:var(--panel);color:var(--ink-2);font-size:13px;font-weight:600}',
        '.lc-av.a1{background:linear-gradient(135deg,#ffd3c2,#ff9a76)} .lc-av.a2{background:linear-gradient(135deg,#c2e9ff,#76b6ff)} .lc-av.a3{background:linear-gradient(135deg,#d8ffc2,#9bff76)} .lc-av.a4{background:linear-gradient(135deg,#e7c2ff,#b876ff)} .lc-av.a5{background:linear-gradient(135deg,#ffe9c2,#ffce76)} .lc-av.a6{background:linear-gradient(135deg,#c2fff0,#76ffd9)}',
        '.lc-conv-main{flex:1;min-width:0}',
        '.lc-conv-name{font-size:13px;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
        '.lc-conv-time{font-size:11px;color:var(--ink-3)}',
        '.lc-conv-preview{font-size:12px;color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
        '.lc-unread{min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:var(--accent);color:var(--btn-label);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center}',
        /* 消息气泡 */
        '.lc-msg-self,.lc-msg-other{display:flex;align-items:flex-start;gap:8px;margin-bottom:6px}',
        '.lc-msg-self{justify-content:flex-end}',
        '.lc-bubble{position:relative;max-width:80%;min-width:50px;padding:8px 10px;border-radius:12px;font-size:14px;line-height:1.45;word-break:break-word;color:var(--ink)!important}',
        '.lc-msg-other .lc-bubble,.lc-msg-self .lc-bubble{color:var(--ink)!important;border:1px solid var(--seam)!important}',
        '.lc-msg-other .lc-bubble{background:var(--panel-dn)!important;border-left:3px solid var(--divider)!important;border-top-left-radius:4px!important}',
        '.lc-msg-self .lc-bubble{background:var(--panel-dn)!important}',
        '.lc-msg-self .lc-bubble{border-left:3px solid var(--accent)!important;border-top-right-radius:4px!important}',
        '.lc-avatar,.lc-av{width:40px!important;height:40px!important;min-width:40px!important;max-width:40px!important;flex:0 0 40px!important;padding:0!important;border:0!important;border-radius:50%!important;box-shadow:none!important;overflow:hidden!important;background:transparent!important}',
        '.lc-avatar img,.lc-av img{width:100%!important;height:100%!important;border-radius:50%!important;object-fit:cover!important}',
        '.lc-message-type-selector{gap:6px;color:var(--ink)}',
        '.lc-message-type-selector label{padding:4px 8px;border-radius:8px;transition:background .15s var(--ease),color .15s var(--ease)}',
        '.lc-message-type-selector input[type="radio"]{accent-color:var(--accent)}',
        '.lc-message-type-selector label:has(input:checked){background:var(--accent-soft);color:var(--accent);font-weight:600}',
        /* 系统/状态行（如“现在在线/离线”“悄悄话来自 …”）无气泡子元素时的兜底归类 */
        '.lc-msg-system{padding:6px 10px;color:var(--ink-2);font-size:12px;text-align:center;opacity:.85}',
        '.lc-msg-footer{font-size:11px;color:var(--ink-3);margin-top:2px;opacity:.85}',
        /* 时间分隔（复用现有 .message-time-divider 类，!important 压制内联） */
        '.message-time-divider{background:var(--panel-dn)!important;color:var(--ink-2)!important;border:1px solid var(--divider)!important}',
        /* 设置浮层 */
        '.lc-settings{background:var(--panel)!important;border:1px solid var(--seam)!important;border-radius:var(--r-card)!important;box-shadow:var(--shadow-float)!important;color:var(--ink)!important;font-family:var(--lc-font)!important}',
        /* reduced-motion 守卫 */
        '@media (prefers-reduced-motion:reduce){.lc-head-btn,.lc-mini-btn,.lc-ico-send{transition:none!important}.lc-head-btn:active,.lc-mini-btn:active,.lc-ico-send:active{transform:none!important}}'
    ].join('\n');

    function injectDialogStyle() {
        const s = document.getElementById('lc-ui-style');
        if (!s) return;
        if (s.textContent.indexOf('lc-panel') >= 0) return; // 幂等
        s.textContent += '\n' + LC_DIALOG_CSS;
    }

    function _svgIcon(name, size) {
        const span = document.createElement('span');
        span.className = 'lc-ico' + (size ? ' lc-ico--' + size : '');
        span.innerHTML = (LC_ICONS[name] || '');
        return span;
    }
    function _swapBtnIcon(btn, name, size) {
        if (!btn) return;
        btn.textContent = '';
        btn.appendChild(_svgIcon(name, size));
    }
    function _strip(el, props) {
        if (!el) return;
        props.forEach(function (p) { try { el.style[p] = ''; } catch (e) {} });
    }

    // 找到对话框（含 #LC-Message-SenderList 的 fixed 定位祖先）
    function _findDialog() {
        const sl = document.getElementById('LC-Message-SenderList');
        if (!sl) return null;
        let n = sl;
        while (n && !(n.style && n.style.position === 'fixed')) n = n.parentElement;
        return n;
    }
    function _findTitleBar(dlg) {
        const btns = [].slice.call(dlg.querySelectorAll('button'));
        const anchor = btns.find(function (b) { return b.textContent === '⚙' || b.textContent === '×' || b.textContent === '📄'; });
        if (!anchor) {
            // 兜底：标题栏为 dlg 直接子元素中持有多枚按钮的 flex 行（按钮文本尚未填充时也能命中）
            const kids = [].slice.call(dlg.children);
            for (let i = 0; i < kids.length; i++) {
                const k = kids[i];
                if (k.querySelectorAll && k.querySelectorAll('button').length >= 2) return k;
            }
            return null;
        }
        let p = anchor.parentElement;
        while (p && p.parentElement !== dlg) p = p.parentElement;
        return p;
    }
    // 将主题拨杆 #lc-theme-host 并入头部（幂等；插到右侧按钮组最前，关闭按钮保持在最右上）
    function _moveDialIntoHead(dlg) {
        const host = document.getElementById('lc-theme-host');
        if (!host) return false;
        const titleBar = _findTitleBar(dlg);
        if (!titleBar) return false;
        // 找右侧按钮容器（含关闭按钮的容器），拨杆插到它最前面
        let rightBtns = null;
        const btns = [].slice.call(titleBar.querySelectorAll('button'));
        const closeBtn = btns.find(function (b) { return b.textContent === '×'; });
        if (closeBtn && closeBtn.parentElement && closeBtn.parentElement !== titleBar) {
            rightBtns = closeBtn.parentElement;
        }
        if (!rightBtns) rightBtns = titleBar.children[1] || titleBar;
        if (host.parentElement === rightBtns && rightBtns.firstChild === host) return true;
        host.style.position = 'static';
        host.style.bottom = 'auto';
        host.style.right = 'auto';
        host.style.zIndex = '';
        host.classList.remove('lc-pending');
        rightBtns.insertBefore(host, rightBtns.firstChild);
        return true;
    }

    let _dlgObs = null, _bubbleObs = null, _dlgWaitObs = null;

    function reskinBubble(item) {
        if (!item || item.classList.contains('lc-msg-self') || item.classList.contains('lc-msg-other') || item.classList.contains('lc-msg-system')) return;
        // 输入框容器（含 #LC-Message-InputField）不是消息行，跳过
        if (item.querySelector && item.querySelector('#LC-Message-InputField')) return;
        const self = item.style.justifyContent === 'flex-end';
        item.classList.add(self ? 'lc-msg-self' : 'lc-msg-other');
        _strip(item, ['justifyContent']);
        const bubble = [].slice.call(item.children).find(function (c) {
            return !c.classList.contains('lc-avatar') && c.style && (c.style.maxWidth === '80%' || c.style.borderLeft);
        });
        if (bubble) {
            _strip(bubble, ['backgroundColor', 'borderLeft', 'borderRadius', 'padding', 'color']);
            bubble.classList.add('lc-bubble');
        } else {
            // 无气泡子元素的纯状态/系统行（如“现在在线/离线”），单独归类
            item.classList.remove('lc-msg-self', 'lc-msg-other');
            item.classList.add('lc-msg-system');
        }
    }
    // 扫描消息区内的消息行（messageItem 特征：inline display:flex + align-items:flex-start + 方向）
    function _scanBubbles(rm) {
        if (!rm) return;
        [].slice.call(rm.querySelectorAll('div[style*="justify-content"][style*="align-items: flex-start"]')).forEach(reskinBubble);
    }

    function reskinDialog(dlg) {
        if (!dlg) return;
        if (_dlgObs) _dlgObs.disconnect();

        // 面板外壳（删除内联外观，让 .lc-panel 类生效；保留 position/size 等功能性内联）
        dlg.classList.add('lc-panel');
        _strip(dlg, ['backgroundColor', 'border', 'borderRadius', 'boxShadow', 'color']);

        // 会话列表左栏（去掉内联 #ddd 分隔，改用令牌 seam）
        const sl0 = document.getElementById('LC-Message-SenderList');
        if (sl0) { _strip(sl0, ['borderRight', 'backgroundColor']); sl0.classList.add('lc-conv-list'); }

        // 头部 + 三枚按钮 SVG 化
        const btns = [].slice.call(dlg.querySelectorAll('button'));
        const pageBtn = btns.find(function (b) { return b.textContent === '📄'; });
        const setBtn = btns.find(function (b) { return b.textContent === '⚙'; });
        const closeBtn = btns.find(function (b) { return b.textContent === '×'; });
        const backBtn = btns.find(function (b) { return b.textContent === '◀️'; });
        const titleBar = _findTitleBar(dlg);
        if (titleBar) {
            titleBar.classList.add('lc-panel-head');
            // 清除会覆盖主题的内联样式。
            _strip(titleBar, ['backgroundColor', 'borderBottom', 'borderTopLeftRadius', 'borderTopRightRadius']);
            [pageBtn, setBtn, closeBtn, backBtn].forEach(function (b) {
                if (!b || b.classList.contains('lc-head-btn')) return;
                b.classList.add('lc-head-btn');
                _strip(b, ['background', 'border', 'borderRadius', 'color', 'width', 'height', 'fontSize', 'fontWeight']);
                // 原监听器会写回固定颜色，随后清除以维持主题样式。
                b.addEventListener('mouseover', function () { b.style.background = ''; b.style.color = ''; });
                b.addEventListener('mouseout', function () { b.style.background = ''; b.style.color = ''; });
            });
            if (pageBtn && pageBtn.textContent === '📄') _swapBtnIcon(pageBtn, 'pencil', 'md');
            if (setBtn && setBtn.textContent === '⚙') _swapBtnIcon(setBtn, 'gear', 'md');
            if (closeBtn && closeBtn.textContent === '×') _swapBtnIcon(closeBtn, 'close', 'md');
            // 合并主题拨杆进头部（含兜底重试：头部按钮可能稍后填充）
            if (!_moveDialIntoHead(dlg)) {
                setTimeout(function () { if (dlg && dlg.isConnected) _moveDialIntoHead(dlg); }, 200);
            }
        }

        // 搜索框与在线按钮共用原容器，避免嵌套 flex 缩窄内容。
        const searchInput = document.getElementById('LC-Message-SenderSearchInput');
        if (searchInput) {
            let wrap = searchInput.parentElement;
            const nestedWrap = searchInput.closest('.lc-search-wrap');
            if (nestedWrap) wrap = nestedWrap;
            if (wrap) {
                wrap.classList.add('lc-search-wrap');
                wrap.style.width = '';
                wrap.style.minWidth = '';
            }
        }

        // 输入区 + 发送按钮
        const input = document.getElementById('LC-Message-InputField');
        if (input && !input.classList.contains('lc-input')) {
            _strip(input, ['border', 'borderRadius', 'background', 'color', 'padding', 'outline', 'boxShadow', 'boxSizing']);
            input.classList.add('lc-input');
        }
        const send = document.getElementById('messageSendButton');
        if (send && !send.classList.contains('lc-ico-send')) {
            _strip(send, ['background', 'color', 'border', 'borderRadius', 'padding']);
            send.classList.add('lc-ico-send');
            if (!send.querySelector('.lc-ico')) send.insertBefore(_svgIcon('send', 'md'), send.firstChild);
        }

        // 右工具条 + 迷你按钮 SVG 化
        const qb = btns.find(function (b) { return b.textContent && b.textContent.indexOf('➕') >= 0; });
        const db = btns.find(function (b) { return b.textContent === '💾'; });
        const toolbar = qb ? qb.parentElement.parentElement : null;
        if (toolbar) {
            toolbar.classList.add('lc-right-head');
            _strip(toolbar, ['borderTop', 'borderBottom', 'padding', 'marginBottom']);
            if (qb && !qb.classList.contains('lc-mini-btn')) { qb.classList.add('lc-mini-btn'); _strip(qb, ['background', 'border', 'borderRadius', 'color', 'padding']); _swapBtnIcon(qb, 'plus', 'sm'); }
            if (db) db.classList.add('lc-save-btn');
            if (db && !db.classList.contains('lc-mini-btn')) { db.classList.add('lc-mini-btn', 'lc-save-btn'); _strip(db, ['background', 'border', 'borderRadius', 'color', 'padding']); _swapBtnIcon(db, 'disk', 'sm'); }
        }

        // 设置浮层
        const settings = document.getElementById('lianChatSettingsDialog');
        if (settings) settings.classList.add('lc-settings');

        // 持久化：会话项 + 气泡 观察器
        const rm = document.getElementById('LC-Message-RightMessageContainer');
        if (rm) {
            // 初始扫描：消息行可能已渲染（如打开即带历史）
            _scanBubbles(rm);
            if (!_bubbleObs) {
                _bubbleObs = new MutationObserver(function () { _scanBubbles(rm); });
                // subtree:true 才能捕获嵌套在 messageContent 内的消息行
                _bubbleObs.observe(rm, { childList: true, subtree: true });
            }
        }

        // 重新挂对话框级观察器（重渲染时重应用）
        if (_dlgObs) { /* 已 disconnect */ }
        _dlgObs = new MutationObserver(function () { reskinDialogLight(dlg); });
        _dlgObs.observe(dlg, { childList: true, subtree: false });
    }

    // 轻量重应用（重渲染后恢复头部按钮/搜索/输入类，避免重复 wrap）
    function reskinDialogLight(dlg) {
        const btns = [].slice.call(dlg.querySelectorAll('button'));
        const pageBtn = btns.find(function (b) { return b.textContent === '📄'; });
        const setBtn = btns.find(function (b) { return b.textContent === '⚙'; });
        const closeBtn = btns.find(function (b) { return b.textContent === '×'; });
        if (pageBtn && pageBtn.textContent === '📄') _swapBtnIcon(pageBtn, 'pencil', 'md');
        if (setBtn && setBtn.textContent === '⚙') _swapBtnIcon(setBtn, 'gear', 'md');
        if (closeBtn && closeBtn.textContent === '×') _swapBtnIcon(closeBtn, 'close', 'md');
        const input = document.getElementById('LC-Message-InputField');
        if (input && !input.classList.contains('lc-input')) { _strip(input, ['border', 'borderRadius', 'background', 'color', 'padding', 'outline', 'boxShadow', 'boxSizing']); input.classList.add('lc-input'); }
        const send = document.getElementById('messageSendButton');
        if (send && !send.classList.contains('lc-ico-send')) { _strip(send, ['background', 'color', 'border', 'borderRadius', 'padding']); send.classList.add('lc-ico-send'); if (!send.querySelector('.lc-ico')) send.insertBefore(_svgIcon('send', 'md'), send.firstChild); }
        // 方案 A：轻量重应用也兜底移动拨杆（重渲染/按钮填充后）
        _moveDialIntoHead(dlg);
    }

    function applyDialogReskin() {
        const dlg = _findDialog();
        if (dlg) { reskinDialog(dlg); return; }
        if (_dlgWaitObs) return;
        _dlgWaitObs = new MutationObserver(function (muts) {
            for (let i = 0; i < muts.length; i++) {
                const m = muts[i];
                for (let j = 0; j < m.addedNodes.length; j++) {
                    const n = m.addedNodes[j];
                    if (n.nodeType === 1 && (n.querySelector && n.querySelector('#LC-Message-SenderList'))) {
                        if (_dlgWaitObs) _dlgWaitObs.disconnect();
                        _dlgWaitObs = null;
                        const d = _findDialog();
                        if (d) {
                            reskinDialog(d);
                            // 方案 B：延迟一次再整轮重应用，等头部按钮填充完成后确保拨杆入头
                            setTimeout(function () { if (d && d.isConnected) reskinDialog(d); }, 200);
                        }
                        return;
                    }
                }
            }
        });
        _dlgWaitObs.observe(document.body, { childList: true, subtree: true });
    }

    // Step3 自启动
    injectDialogStyle();
    applyDialogReskin();

    // 累积注入幂等：清理 STEP3 新增元素/观察器
    try {
        window.__LC_UI_CLEANUP__ = window.__LC_UI_CLEANUP__ || [];
        window.__LC_UI_CLEANUP__.push(function () {
            if (_dlgObs) _dlgObs.disconnect();
            if (_bubbleObs) _bubbleObs.disconnect();
            if (_dlgWaitObs) _dlgWaitObs.disconnect();
        });
    } catch (e) {}

    // 设置面板外观
    const LC_SETTINGS_CSS = [
        /* 浮层外壳（覆盖原内联 white / 绿按钮） */
        '#lianChatSettingsDialog{',
        '  background:var(--panel)!important;color:var(--ink)!important;',
        '  border:1px solid var(--seam)!important;border-radius:18px!important;',
        '  box-shadow:var(--shadow-float),0 0 0 1px rgba(0,0,0,.02)!important;',
        '  padding:26px 28px 20px!important;font-family:var(--lc-font)!important;',
        '  animation:lcSetIn .28s var(--ease-spring) both;}',
        '@keyframes lcSetIn{from{opacity:0;transform:translate(-50%,-46%) scale(.96)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}',
        /* 标题 */
        '#lianChatSettingsDialog > div:first-child{color:var(--ink)!important;font-size:1.25em!important;margin-bottom:16px!important}',
        /* 区块说明文字（hideLabel 等 div） */
        '#lianChatSettingsDialog > div:not(:first-child){color:var(--ink-2)!important}',
        /* 后台通知行（直接子 label，开关置右） */
        '#lianChatSettingsDialog > label{display:flex!important;flex-direction:row-reverse!important;align-items:center!important;justify-content:space-between!important;',
        '  gap:14px!important;margin-bottom:18px!important;color:var(--ink)!important;cursor:pointer!important;font-size:14px!important}',
        /* 隐藏方式三选项（group 内 label → 可选行卡片） */
        '#lianChatSettingsDialog div label{display:flex!important;align-items:center!important;gap:10px!important;',
        '  margin-bottom:8px!important;padding:10px 12px!important;border-radius:var(--r-row)!important;',
        '  background:var(--bg-sink)!important;border:1px solid var(--line)!important;color:var(--ink-2)!important;',
        '  cursor:pointer!important;font-size:14px!important;',
        '  transition:background .2s var(--ease),color .2s var(--ease),border-color .2s var(--ease)}',
        '#lianChatSettingsDialog div label:has(input:checked){color:var(--ink)!important;background:var(--accent-soft)!important;',
        '  border-color:color-mix(in srgb,var(--accent) 45%,transparent)!important;font-weight:600!important}',
        /* 原生 radio → 自定义圆点 */
        '#lianChatSettingsDialog input[type=radio]{appearance:none!important;-webkit-appearance:none!important;',
        '  width:20px!important;height:20px!important;flex:none!important;margin:0 2px 0 0!important;',
        '  border-radius:50%!important;border:2px solid var(--seam)!important;background:var(--card)!important;',
        '  cursor:pointer!important;position:relative!important;transition:border-color .2s var(--ease),box-shadow .2s var(--ease)!important}',
        '#lianChatSettingsDialog input[type=radio]:checked{border-color:var(--accent)!important;box-shadow:inset 0 0 0 4px var(--accent)!important}',
        /* 原生 checkbox → iOS 开关（带 I/O 标记，accent 轨） */
        '#lianChatSettingsDialog input[type=checkbox]{appearance:none!important;-webkit-appearance:none!important;',
        '  position:relative!important;width:46px!important;height:28px!important;flex:none!important;margin:0!important;',
        '  border-radius:999px!important;border:1px solid var(--seam)!important;background:var(--panel-dn)!important;',
        '  cursor:pointer!important;transition:background .25s var(--ease),border-color .25s var(--ease)!important}',
        '#lianChatSettingsDialog input[type=checkbox]:checked{background:var(--accent)!important;border-color:transparent!important}',
        '#lianChatSettingsDialog input[type=checkbox]::after{content:""!important;position:absolute!important;top:2px!important;left:2px!important;',
        '  width:22px!important;height:22px!important;border-radius:50%!important;background:var(--card)!important;',
        '  box-shadow:0 1px 3px rgba(0,0,0,.3)!important;transition:transform .25s var(--ease-spring)!important}',
        '#lianChatSettingsDialog input[type=checkbox]:checked::after{transform:translateX(18px)!important}',
        '#lianChatSettingsDialog input[type=checkbox]::before{content:"O"!important;position:absolute!important;right:7px!important;top:50%!important;',
        '  transform:translateY(-50%)!important;font:700 11px/1 var(--lc-font)!important;color:var(--ink-3)!important}',
        '#lianChatSettingsDialog input[type=checkbox]:checked::before{content:"I"!important;right:auto!important;left:7px!important;color:var(--btn-label)!important}',
        /* 确定按钮：糖果 */
        '#lianChatSettingsDialog button{margin-top:10px!important;align-self:center!important;padding:11px 32px!important;border:none!important;cursor:pointer!important;',
        '  background:linear-gradient(180deg,var(--accent),color-mix(in srgb,var(--accent) 82%,#000))!important;',
        '  color:var(--btn-label)!important;border-radius:var(--r-pill)!important;font:600 15px/1 var(--lc-font)!important;',
        '  box-shadow:var(--shadow-float),inset 0 1px 0 rgba(255,255,255,.25)!important;',
        '  transition:transform .12s var(--ease),filter .2s var(--ease)!important}',
        '#lianChatSettingsDialog button:hover{filter:brightness(1.05)!important}',
        '#lianChatSettingsDialog button:active{transform:scale(.95)!important}',
        /* reduced-motion 守卫 */
        '@media (prefers-reduced-motion:reduce){',
        '  #lianChatSettingsDialog{animation:none!important}',
        '  #lianChatSettingsDialog input[type=radio],#lianChatSettingsDialog input[type=checkbox],#lianChatSettingsDialog input[type=checkbox]::after{transition:none!important}',
        '  #lianChatSettingsDialog button{transition:none!important}',
        '  #lianChatSettingsDialog button:active{transform:none!important}',
        '}'
    ].join('\n');

    function injectSettingsStyle() {
        const s = document.getElementById('lc-ui-style');
        if (!s) return;
        if (s.textContent.indexOf('lianChatSettingsDialog') >= 0) return; // 幂等
        s.textContent += '\n' + LC_SETTINGS_CSS;
    }
    injectSettingsStyle();

    // 交互动画
    const LC_POLISH_CSS = [
        /* 消息气泡入场（仅首次加类时播放；reskin 已对加过类的跳过） */
        '@keyframes lcBubbleIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}',
        '.lc-bubble{animation:lcBubbleIn .26s var(--ease-out) both}',
        /* 会话项按压微交互（补 transform 过渡，避免生硬） */
        '.lc-conv-item{transition:background .15s var(--ease),transform .12s var(--ease)}',
        '.lc-conv-item:active{transform:scale(.98)}',
        /* reduced-motion 守卫 */
        '@media (prefers-reduced-motion:reduce){',
        '  .lc-bubble{animation:none!important}',
        '  .lc-conv-item:active{transform:none!important}',
        '}'
    ].join('\n');
    function injectPolishStyle() {
        const s = document.getElementById('lc-ui-style');
        if (!s) return;
        if (s.textContent.indexOf('lcBubbleIn') >= 0) return; // 幂等
        s.textContent += '\n' + LC_POLISH_CSS;
    }
    injectPolishStyle();

    // 原生聊天通知配色
    const LC_NATIVEBAR_CSS = [
        '#TextAreaChatLog .ChatMessage.bce-notification{',
        '  background:var(--accent-soft)!important;',
        '  color:var(--ink-2)!important;',
        '  box-shadow:inset 3px 0 0 0 var(--accent)!important;}',
        '#TextAreaChatLog .ChatMessage.bce-notification .chat-room-metadata{color:var(--ink-3)!important}'
    ].join('\n');
    function injectNativeBarStyle() {
        const s = document.getElementById('lc-ui-style');
        if (!s) return;
        if (s.textContent.indexOf('bce-notification') >= 0) return; // 幂等
        s.textContent += '\n' + LC_NATIVEBAR_CSS;
    }
    injectNativeBarStyle();

    function setDesktopPanelLayout(mode) {
        const panel = document.querySelector('.lc-panel');
        const senderList = document.getElementById('LC-Message-SenderList');
        const rightContainer = document.getElementById('LC-Message-RightContainer');
        if (!panel || !senderList || !rightContainer || MessageModule.isPageMode) return;

        if (rightContainer._lcCollapseTimer) clearTimeout(rightContainer._lcCollapseTimer);
        if (rightContainer._lcLayoutTimer) clearTimeout(rightContainer._lcLayoutTimer);
        rightContainer._lcCollapseTimer = null;
        rightContainer._lcLayoutTimer = null;
        rightContainer.style.display = 'flex';

        if (mode === 'contacts') {
            const startWidth = rightContainer.offsetWidth;
            rightContainer.style.width = startWidth + 'px';
            rightContainer.style.flex = '0 0 ' + startWidth + 'px';
            void rightContainer.offsetWidth;
            senderList.style.width = panel.clientWidth + 'px';
            senderList.style.minWidth = panel.clientWidth + 'px';
            rightContainer.style.width = '0px';
            rightContainer.style.flex = '0 0 0px';
            rightContainer.style.opacity = '0';
            rightContainer._lcLayoutTimer = setTimeout(function () {
                if (rightContainer.dataset.lcLayout === 'contacts') rightContainer.style.display = 'none';
                rightContainer._lcLayoutTimer = null;
            }, 520);
        } else if (mode === 'chat') {
            senderList.style.width = '0px';
            senderList.style.minWidth = '0px';
            rightContainer.style.width = '100%';
            rightContainer.style.flex = '1 1 100%';
            rightContainer.style.opacity = '1';
        } else {
            const contactWidth = Math.min(220, Math.max(0, panel.clientWidth - 300));
            senderList.style.width = contactWidth + 'px';
            senderList.style.minWidth = contactWidth + 'px';
            rightContainer.style.width = Math.max(300, panel.clientWidth - contactWidth) + 'px';
            rightContainer.style.flex = '1 1 auto';
            rightContainer.style.opacity = '1';
            mode = 'split';
        }

        rightContainer.dataset.lcLayout = mode;
        rightContainer.dataset.lcCollapsed = mode === 'contacts' ? '1' : '0';
        const toggle = document.querySelector('button.lc-head-btn[data-lc-patched="pencil-v3"]');
        if (toggle) toggle.classList.toggle('lc-head-btn--active', mode === 'contacts');
    }

    // 面板布局与行为
    (function () {
        const LC_STEP7_CSS = [
            /* === 头部重排与缩小 === */
            /* 主题拨杆并入右侧按钮组后，保证内部 flex 不换行、右对齐 */
            '.lc-panel-head{min-height:36px!important;padding:4px 8px!important}',
            '.lc-panel-head > div{display:flex;align-items:center;gap:6px}',
            '.lc-panel-head > div:last-child{justify-content:flex-end}',
            /* 按钮尺寸缩小 */
            '.lc-head-btn{width:28px!important;height:28px!important;border-radius:8px!important}',
            '.lc-head-btn .lc-ico{width:15px!important;height:15px!important}',
            '.lc-head-btn--active{background:var(--accent-soft)!important;color:var(--accent)!important;border-color:color-mix(in srgb,var(--accent) 35%,transparent)!important}',
            /* 主题拨杆缩小 */
            '.lc-theme-dial{width:56px!important;height:38px!important;border-radius:10px!important}',
            '.lc-td-mark svg{width:9px!important;height:9px!important}',
            '.lc-td-mark.light{left:9px!important;top:10px!important}',
            '.lc-td-mark.classic{left:24px!important;top:2px!important}',
            '.lc-td-mark.dark{left:39px!important;top:10px!important}',
            '.lc-td-seat{left:19px!important;top:15px!important;width:20px!important;height:20px!important}',
            '.lc-td-stem{left:29px!important;top:25px!important;width:7px!important;height:14px!important;margin:-12px 0 0 -3.5px!important;transform-origin:3.5px 12px!important}',
            '.lc-td-slot{width:6px!important;height:2px!important;margin-left:-3px!important}',
            'html[data-lc-theme-pref="light"] .lc-td-stem{transform:rotate(-55deg)}',
            'html[data-lc-theme-pref="classic"] .lc-td-stem{transform:rotate(0deg)}',
            'html[data-lc-theme-pref="dark"] .lc-td-stem{transform:rotate(55deg)}',
            /* 隐藏模式文字 chip */
            '.lc-theme-chip{display:none!important}',
            /* 标题文字缩小 */
            '.lc-panel-head > div:first-child > div{font-size:14px!important;font-weight:700!important;color:var(--ink)!important}',

            /* === 添加发送者界面（右侧标签）暗色化 === */
            '.lc-add-sender{background:var(--panel)!important}',
            '.lc-add-sender .lc-add-search{background:var(--panel)!important}',
            /* 模式切换组 / 房间空间切换组 */
            '.lc-add-sender .lc-add-search > div:nth-of-type(1),',
            '.lc-add-sender .lc-add-search > div:nth-of-type(2){background:var(--card)!important;border-color:var(--seam)!important}',
            '.lc-add-sender .lc-add-search > div:nth-of-type(1) button,',
            '.lc-add-sender .lc-add-search > div:nth-of-type(2) button{background:transparent!important;color:var(--ink)!important}',
            /* 搜索输入 */
            '.lc-add-sender .lc-add-search > input{background:var(--input-surface)!important;color:var(--ink)!important;border-color:var(--seam)!important}',
            '.lc-add-sender .lc-add-search > input::placeholder{color:var(--ink-3)!important}',
            /* 列表容器 */
            '.lc-add-sender .add-sender-content-container{background:var(--panel)!important}',
            /* 成员/房间卡片（直接子元素） */
            '.lc-add-sender .add-sender-content-container > div{background:var(--card)!important;border-color:var(--seam)!important;box-shadow:none!important;color:var(--ink)!important}',
            '.lc-add-sender .add-sender-content-container > div:hover{background:var(--bg-sink)!important}',
            /* 成员卡片内文字（强制覆盖 #666/#888/#b0b0b0 内联色） */
            '.lc-add-sender [id^="character-info-panel-"] span{color:var(--ink)!important}',
            '.lc-add-sender [id^="character-info-panel-"] span[style*="color: rgb(136, 136, 136)"],',
            '.lc-add-sender [id^="character-info-panel-"] span[style*="color: #888"],',
            '.lc-add-sender [id^="character-info-panel-"] span[style*="color: rgb(176, 176, 176)"],',
            '.lc-add-sender [id^="character-info-panel-"] span[style*="color: #b0b0b0"],',
            '.lc-add-sender [id^="character-info-panel-"] span[style*="color: rgb(102, 102, 102)"],',
            '.lc-add-sender [id^="character-info-panel-"] span[style*="color: #666"]{color:var(--ink-2)!important}',
            /* 房间卡片内文字 */
            '.lc-add-sender .add-sender-content-container > div > div{color:var(--ink)!important}',
            '.lc-add-sender .add-sender-content-container > div span[style*="color: rgb(136, 136, 136)"],',
            '.lc-add-sender .add-sender-content-container > div span[style*="color: #888"],',
            '.lc-add-sender .add-sender-content-container > div span[style*="color: rgb(102, 102, 102)"],',
            '.lc-add-sender .add-sender-content-container > div span[style*="color: #666"]{color:var(--ink-2)!important}',
            '.lc-add-sender .add-sender-content-container > div button{background:var(--bg-sink)!important;color:var(--ink-2)!important}',
            /* 当前房间/禁用的房间项 */
            '.lc-add-sender .add-sender-content-container > div[style*="opacity: 0.6"]{opacity:.55!important}',

            /* === 左栏个人资料暗色文字补完 === */
            '.lc-conv-list [id^="character-info-panel-"]{background:transparent!important;border-color:var(--seam)!important}',
            '.lc-conv-list [id^="character-info-panel-"] span{color:var(--ink)!important}',
            '.lc-conv-list [id^="character-info-panel-"] span[style*="color: rgb(136, 136, 136)"],',
            '.lc-conv-list [id^="character-info-panel-"] span[style*="color: #888"],',
            '.lc-conv-list [id^="character-info-panel-"] span[style*="color: rgb(176, 176, 176)"],',
            '.lc-conv-list [id^="character-info-panel-"] span[style*="color: #b0b0b0"],',
            '.lc-conv-list [id^="character-info-panel-"] span[style*="color: rgb(102, 102, 102)"],',
            '.lc-conv-list [id^="character-info-panel-"] span[style*="color: #666"]{color:var(--ink-2)!important}',

            /* === 右侧标签折叠时的平滑宽度 === */
            '#LC-Message-SenderList{transition:width .5s var(--ease),min-width .5s var(--ease)}',
            '#LC-Message-RightContainer{transition:width .5s var(--ease),flex .5s var(--ease),opacity .5s var(--ease);overflow:hidden}',

            /* === 悬浮按钮：彻底消除点击蓝色高亮（tap-highlight + :active 背景保护）=== */
            '.lc-fab,.lc-fab *{-webkit-tap-highlight-color:transparent!important}',
            '.lc-fab:active{background:var(--card)!important}',
            '.lc-fab--open:active{background:var(--accent)!important}',

            /* === 好友/房间/大厅 tab 切换组重设计（#e6f4ff 浅蓝 → 暖色）=== */
            '.lc-add-sender .lc-add-search>div:nth-of-type(1){background:var(--card)!important;border:1px solid var(--seam)!important;border-radius:10px!important;padding:2px!important;overflow:hidden!important}',
            '.lc-add-sender .lc-add-search>div:nth-of-type(1) button{background:transparent!important;color:var(--ink-2)!important;border-radius:8px!important;transition:background .2s var(--ease),color .2s var(--ease)!important}',
            '.lc-add-sender .lc-add-search>div:nth-of-type(1) button[style*="rgb(230, 244, 255)"]{background:var(--accent-soft)!important;color:var(--accent)!important}',
            '.lc-add-sender .lc-add-search>div:nth-of-type(1) button[style*="rgb(255, 255, 255)"]{background:transparent!important;color:var(--ink-2)!important}',
            '.lc-add-sender .lc-add-search>div:nth-of-type(1) button:hover{background:var(--accent-soft)!important;color:var(--accent)!important;box-shadow:0 0 0 1px var(--accent-soft)}',

            /* === 在线人数按钮（lc-online-btn，SVG 人像 + 数字胶囊徽标）=== */
            '.lc-online-btn{width:40px;height:36px;border:1px solid var(--seam);border-radius:12px;background:var(--card);color:var(--ink-2);cursor:pointer;flex:none;box-shadow:none;transition:background .15s var(--ease),color .15s var(--ease),transform .15s var(--ease)}',
            '.lc-online-btn:hover{background:var(--accent-soft);color:var(--accent)}',
            '.lc-online-btn:active{transform:scale(.94)}',
            '.lc-online-btn .lc-ico{color:inherit}',
            '.lc-online-btn .lc-online-count{min-width:16px;height:16px;padding:0 4px;border-radius:999px;background:var(--accent);color:var(--btn-label);font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1}',

            /* === 置顶按钮（lc-pin-btn 基础态 + lc-pin-active 置顶态）=== */
            // 置顶按钮的基础态与启用态。
            '.lc-pin-btn{background:var(--panel-dn);color:var(--ink-2)}',
            '.lc-pin-active{background:var(--accent-soft)!important;color:var(--accent)!important}',

            /* === tab 滑块（滑动指示器）：实心强调色滑块在选中项间滑动 === */
            '.lc-add-sender .lc-add-search>div:nth-of-type(1){position:relative!important;overflow:hidden!important}',
            '.lc-tab-slider{position:absolute;top:2px;bottom:2px;left:2px;width:46px;border-radius:8px;background:var(--accent);z-index:0;pointer-events:none;transition:left .25s var(--ease-spring),width .25s var(--ease-spring)}',
            '.lc-add-sender .lc-add-search>div:nth-of-type(1) button{position:relative;z-index:1;transition:background .2s var(--ease),color .2s var(--ease)!important}',
            '.lc-add-sender .lc-add-search>div:nth-of-type(1) button.lc-tab-active{color:var(--btn-label)!important}',
            '.lc-add-sender .lc-add-search>div:nth-of-type(1) button[style*="rgb(230, 244, 255)"]{background:transparent!important;color:var(--btn-label)!important}',

            /* === 好友在线/离线视觉区分：在线=暖色边框+指示点，离线=灰显+暗点 === */
            '.lc-add-sender .add-sender-content-container>div[id^="character-info-panel-"]{position:relative}',
            '.lc-online-item{border-color:var(--accent)!important;opacity:1!important;box-shadow:0 0 0 1px var(--accent-soft),0 2px 8px rgba(0,0,0,.08)!important}',
            '.lc-offline-item{opacity:.5!important;filter:grayscale(.35)!important}',

            /* === 搜索行重排：输入框 flex:1 + 在线按钮等高同排（大厅标签页下对齐/尺寸协调）=== */
            '#LC-Message-SenderList .lc-search-wrap{display:flex!important;align-items:center;align-self:flex-start;flex:none;width:calc(100% - 20px)!important;max-width:calc(100% - 20px);gap:8px;padding:8px 0;border-bottom:1px solid var(--divider);margin:0 10px 6px;box-sizing:border-box}',
            '#LC-Message-SenderList .lc-search-wrap input{flex:1 1 auto!important;min-width:0;width:auto!important;height:34px;padding:0 10px;border:1px solid var(--seam);border-radius:10px;background:var(--input-surface);color:var(--ink);box-sizing:border-box;font-family:var(--lc-font);font-size:13px;outline:none;transition:border-color .15s var(--ease),box-shadow .15s var(--ease)}',
            '#LC-Message-SenderList .lc-search-wrap input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}',
            'html[data-lc-theme="dark"] #LC-Message-SenderSearchInput,html[data-lc-theme="dark"] #LC-Message-AddSenderSearchInput{border-color:var(--seam)!important}',
            '#LC-Message-SenderList .lc-online-btn{height:34px;min-width:54px;padding:0 10px;border:1px solid var(--seam);border-radius:10px;background:var(--card);color:var(--ink-2)!important;cursor:pointer;flex:none;display:inline-flex;align-items:center;justify-content:center;gap:4px;box-sizing:border-box;box-shadow:none;transition:background .15s var(--ease),color .15s var(--ease),transform .15s var(--ease)}',
            '#LC-Message-SenderList .lc-online-btn:hover{background:var(--accent-soft);color:var(--accent)!important;filter:none;box-shadow:none}',
            '#LC-Message-SenderList .lc-online-btn:active{transform:scale(.94)}',
            '#LC-Message-SenderList .lc-online-btn .lc-online-count{min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:var(--btn-label);color:var(--accent);font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;line-height:1}',

            /* === 大厅 < / > 切换：加载中状态（spinner 覆盖列表）=== */
            '.lc-space-loading{position:relative;pointer-events:none}',
            '.lc-space-loading .add-sender-content-container{opacity:.35;filter:blur(1px);transition:opacity .2s var(--ease),filter .2s var(--ease)}',
            '.lc-space-loading::before{content:"";position:absolute;left:50%;top:40%;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;border:3px solid var(--accent-soft);border-top-color:var(--accent);animation:lcSpaceSpin .7s linear infinite;z-index:5}',
            '@keyframes lcSpaceSpin{to{transform:rotate(360deg)}}',

            /* === 左侧最近聊天列表重设计：分组感 + 分隔 + active 高亮条 === */
            '.lc-conv-list{padding:6px 8px;gap:2px;box-sizing:border-box}',
            '.lc-conv-item{position:relative;border-radius:12px;padding:9px 10px;margin-bottom:2px;border:1px solid transparent;transition:background .18s var(--ease),border-color .18s var(--ease),transform .12s var(--ease)}',
            '.lc-conv-item:hover{background:var(--accent-soft)!important;border-color:var(--accent-soft)!important;transform:translateX(2px)}',
            '.lc-conv-item.is-active,.lc-conv-item[style*="background-color: rgb(230, 247, 255)"]{background:var(--accent-soft)!important;border-color:var(--accent-soft)!important}',
            '.lc-conv-item.is-active::before,.lc-conv-item[style*="background-color: rgb(230, 247, 255)"]::before{content:"";position:absolute;left:0;top:22%;bottom:22%;width:3px;border-radius:3px;background:var(--accent)}',
            '.lc-conv-item .lc-av{width:38px;height:38px;border-radius:50%;border:2px solid var(--card);box-shadow:0 1px 3px var(--line);object-fit:cover;flex-shrink:0;background:var(--bg-sink)}',
            '.lc-conv-item .lc-conv-name{font-size:13px;font-weight:600;color:var(--ink)}',
            '.lc-conv-item .lc-conv-time{font-size:11px;color:var(--ink-3);font-weight:400}',
            '.lc-conv-item .lc-conv-preview{font-size:12px;color:var(--ink-2)}',
            'html[data-lc-theme="classic"] .lc-conv-name,html[data-lc-theme="classic"] .lc-conv-preview,html[data-lc-theme="classic"] .lc-conv-time,html[data-lc-theme="light"] .lc-conv-name,html[data-lc-theme="light"] .lc-conv-preview,html[data-lc-theme="light"] .lc-conv-time{color:rgb(92,92,92)!important}',
            'html[data-lc-theme="classic"] .lc-conv-name--strong,html[data-lc-theme="light"] .lc-conv-name--strong{color:rgb(0,0,0)!important}',
            'html[data-lc-theme="dark"] .lc-conv-name,html[data-lc-theme="dark"] .lc-conv-preview,html[data-lc-theme="dark"] .lc-conv-time{color:rgb(210,210,210)!important}',
            'html[data-lc-theme="dark"] .lc-conv-name--strong{color:rgb(255,255,255)!important}',

            /* 触控设备不保留模拟 hover，只在按下期间显示反馈。 */
            '@media (hover:none), (pointer:coarse){',
            '  .lc-head-btn:hover{background:var(--card);color:var(--ink-2)}',
            '  .lc-mini-btn:hover,.lc-online-btn:hover,.lc-save-btn:hover{background:var(--accent-soft)!important;color:var(--accent)!important}',
            '  .lc-head-btn--active:hover{background:var(--accent-soft)!important;color:var(--accent)!important}',
            '  .lc-conv-item:hover{background:var(--list-surface)!important;transform:none}',
            '  .lc-conv-item:active{background:var(--accent-soft)!important;border-color:var(--accent-soft)!important}',
            '  .lc-conv-item:hover .lc-av{transform:none}',
            '  .lc-conv-item.is-active:hover{background:var(--accent-soft)!important}',
            '  .lc-add-sender .add-sender-content-container>div:hover{background:var(--card)!important}',
            '  .lc-add-sender .lc-add-search>div:nth-of-type(1) button:hover{background:transparent!important;color:var(--ink-2)!important;box-shadow:none}',
            '  .lc-add-sender .lc-add-search>div:nth-of-type(1) button.lc-tab-active:hover{color:var(--btn-label)!important}',
            '  .lc-add-sender .lc-add-search>div:nth-of-type(1) button:active{background:var(--accent-soft)!important;color:var(--accent)!important;transform:scale(.96)}',
            '  .lc-head-btn:active,.lc-conv-item:active{background:var(--accent-soft)!important;color:var(--accent)!important;transform:scale(.94)}',
            '  .lc-ico-send:hover,#lianChatSettingsDialog button:hover{filter:none!important}',
            '  .lc-fab:hover{transform:none;box-shadow:var(--shadow-inset),var(--shadow-float)}',
            '}',

            /* === 切换聊天窗口过渡：右侧消息区淡入+轻微上滑 === */
            '.lc-msg-switch{animation:lcMsgSwitch .32s var(--ease-spring) both}',
            '@keyframes lcMsgSwitch{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}'
        ].join('\n');

        function injectStep7Style() {
            const s = document.getElementById('lc-ui-style');
            if (!s) return;
            if (s.textContent.indexOf('lc-step7-marker') >= 0) return;
            s.textContent += '\n/* lc-step7-marker */\n' + LC_STEP7_CSS;
        }
        injectStep7Style();

        // ── 1) 头部重排：把主题拨杆挪进右侧按钮组最左侧，并隐藏模式文字
        function reorderHeader() {
            const dlg = document.querySelector('.lc-panel');
            if (!dlg) return;
            const head = dlg.querySelector('.lc-panel-head');
            if (!head || head.dataset.lcReordered) return;
            const host = document.getElementById('lc-theme-host');
            const rightButtons = head.children[1];
            if (!host || !rightButtons) return;
            // 把拨杆塞进右侧按钮容器最前面
            if (host.parentElement !== rightButtons) {
                rightButtons.insertBefore(host, rightButtons.firstChild);
                host.style.position = 'static';
                host.style.bottom = 'auto';
                host.style.right = 'auto';
                host.style.zIndex = '';
                host.classList.remove('lc-pending');
            }
            // 隐藏文字 chip
            const chip = document.getElementById('lcThemeChip');
            if (chip) chip.style.display = 'none';
            head.dataset.lcReordered = '1';
        }
        reorderHeader();

        // ── 2) 给右侧标签容器打暗色类
        function markAddSender() {
            const asc = document.getElementById('LC-Message-AddSenderContainer');
            if (asc && !asc.classList.contains('lc-add-sender')) {
                asc.classList.add('lc-add-sender');
            }
        }
        markAddSender();

        // ── 3) 铅笔按钮改为“收起/展开右侧标签”
        function patchPencilButton() {
            const dlg = document.querySelector('.lc-panel');
            if (!dlg) return;
            // 兼容已 patch 过的按钮（title 已是新文案）：重注入时也能找到并替换旧 clone。
            // ⚠️ 必须用版本号短路：cloneNode + replaceChild 会触发 MutationObserver 再次进入本函数，
            // 若不加短路会无限 clone 循环，占满主线程导致页面点不动。
            const pencil = [...dlg.querySelectorAll('button.lc-head-btn')].find(function (b) {
                return b.title === '切换单双页模式' || b.title === '收起/展开右侧标签' || b.title === '切换联系人/对话';
            });
            if (!pencil || pencil.dataset.lcPatched === 'pencil-v3') return;
            const headButtonLabel = CommonIsMobile ? '切换联系人/对话' : '收起/展开右侧标签';
            pencil.title = headButtonLabel;
            pencil.setAttribute('aria-label', headButtonLabel);
            // 替换图标为「侧边栏切换」：外框 + 竖线 + 折叠箭头（告别"书写"铅笔）
            pencil.innerHTML = lcIcon('panelToggle', 'lc-ico--md');
            // clone 掉原 click 监听（cloneNode 不复制 addEventListener，天然丢弃旧 handler）
            const clone = pencil.cloneNode(true);
            clone.dataset.lcPatched = 'pencil-v3';
            pencil.parentElement.replaceChild(clone, pencil);
            clone.addEventListener('click', function (e) {
                e.stopPropagation();
                if (MessageModule.isPageMode) {
                    if (MessageModule.isRightPageActive) {
                        MessageModule.switchToSenderListPage(true);
                    } else if (MessageModule.hasSelectedSender()) {
                        MessageModule.switchToRightPage();
                    }
                    clone.classList.toggle('lc-head-btn--active', MessageModule.isRightPageActive);
                    return;
                }
                const rightContainer = document.getElementById('LC-Message-RightContainer');
                if (!rightContainer) return;
                const mode = rightContainer.dataset.lcLayout || (rightContainer.dataset.lcCollapsed === '1' ? 'contacts' : 'split');
                setDesktopPanelLayout(mode === 'contacts' ? 'split' : 'contacts');
                if (typeof constrainDialogToWindow === 'function' && dlg) constrainDialogToWindow(dlg);
            });
        }
        patchPencilButton();

        // 在线人数按钮
        function patchOnlineButton() {
            const searchInput = document.getElementById('LC-Message-SenderSearchInput');
            if (!searchInput) return;
            // friendButton 在搜索框所在容器（.lc-search-wrap 的父）里的 button
            const wrap = searchInput.closest('.lc-search-wrap') || searchInput.parentElement;
            // 按钮可能在 wrap 内（同排）或在 wrap 的父容器里
            let container = wrap ? wrap.parentElement : null;
            let btn = wrap ? Array.from(wrap.children).find(function (c) { return c.tagName === 'BUTTON'; }) : null;
            if (!btn && container) {
                btn = Array.from(container.children).find(function (c) { return c.tagName === 'BUTTON'; });
            }
            if (!btn || btn.dataset.lcPatched === 'online') return;
            btn.dataset.lcPatched = 'online';
            btn.classList.add('lc-online-btn');
            ['width', 'height', 'border', 'borderRadius', 'backgroundColor', 'fontSize', 'color'].forEach(function (p) { try { btn.style[p] = ''; } catch (e) {} });
            const icon = btn.querySelector('span');
            if (icon) {
                icon.className = 'lc-ico lc-ico--md';
                icon.style.cssText = '';
                if (typeof LC_ICONS !== 'undefined' && LC_ICONS.person) icon.innerHTML = LC_ICONS.person;
            }
            const spans = btn.querySelectorAll('span');
            if (spans[1]) { spans[1].className = 'lc-online-count'; spans[1].style.cssText = ''; }
        }
        patchOnlineButton();

        // 标签滑动指示器
        function patchTabGroup() {
            const group = document.querySelector('.lc-add-sender .lc-add-search > div:nth-of-type(1)');
            if (!group || group.dataset.lcSlider) return;
            group.dataset.lcSlider = '1';
            group.style.position = 'relative';
            let slider = group.querySelector('.lc-tab-slider');
            if (!slider) {
                slider = document.createElement('span');
                slider.className = 'lc-tab-slider';
                group.appendChild(slider);
            }
            function moveSlider() {
                const active = group.querySelector('button.lc-tab-active') || group.querySelector('button[style*="rgb(230, 244, 255)"]');
                const btn = active || group.querySelector('button');
                if (btn && btn.offsetWidth > 0) {
                    slider.style.width = btn.offsetWidth + 'px';
                    slider.style.left = btn.offsetLeft + 'px';
                }
            }
            // 等按钮完成排版后定位滑块，最多重试 30 帧。
            function moveSliderUntilReady(attemptsLeft) {
                const active = group.querySelector('button.lc-tab-active') || group.querySelector('button[style*="rgb(230, 244, 255)"]');
                const btn = active || group.querySelector('button');
                if (btn && btn.offsetWidth > 0) {
                    moveSlider();
                    return;
                }
                if (attemptsLeft <= 0) return;
                requestAnimationFrame(function () { moveSliderUntilReady(attemptsLeft - 1); });
            }
            moveSliderUntilReady(30); // 最多重试约 30 帧（~500ms），足够涵盖排版延迟
            // 添加发送者界面显示/隐藏时重新定位滑块（默认尺寸 0，用户打开时才可见）
            const addSender = document.getElementById('LC-Message-AddSenderContainer');
            if (addSender) {
                const mo2 = new MutationObserver(moveSlider);
                mo2.observe(addSender, { attributes: true, attributeFilter: ['style'] });
                window.__lcStep7Cleanups = window.__lcStep7Cleanups || [];
                window.__lcStep7Cleanups.push(function () { mo2.disconnect(); });
            }
            group.addEventListener('click', function (e) {
                const btn = e.target.closest('button');
                if (btn) requestAnimationFrame(moveSlider);
            });
            const mo = new MutationObserver(moveSlider);
            mo.observe(group, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
            window.__lcStep7Cleanups = window.__lcStep7Cleanups || [];
            window.__lcStep7Cleanups.push(function () { mo.disconnect(); });
        }
        patchTabGroup();

        // ── 3.65) 面板关闭动画
        // 动画统一由 MessageModule.hideMessageDialog 驱动，所有关闭入口共享同一实体与状态。
        function patchCloseAnimation() {
            const dlg = document.querySelector('.lc-panel');
            if (dlg) dlg.dataset.lcCloseAnim = 'native-v1';
        }
        patchCloseAnimation();

        // ── 3.66) 切换聊天窗口动画
        function patchMsgSwitch() {
            const rm = document.getElementById('LC-Message-RightMessageContainer');
            if (!rm || rm.dataset.lcMsgSwitch) return;
            rm.dataset.lcMsgSwitch = '1';
            let lastCount = 0;
            const mo = new MutationObserver(function () {
                const c = rm.children.length;
                // 内容被清空重建（切换发送者）时触发动画；正常增量消息（+1）不触发
                if (c < lastCount || (c > 0 && lastCount === 0)) {
                    rm.classList.remove('lc-msg-switch');
                    void rm.offsetWidth;
                    rm.classList.add('lc-msg-switch');
                }
                lastCount = c;
            });
            mo.observe(rm, { childList: true, subtree: false });
            window.__lcStep7Cleanups = window.__lcStep7Cleanups || [];
            window.__lcStep7Cleanups.push(function () { mo.disconnect(); });
        }
        patchMsgSwitch();

        // ── 4) 悬浮按钮四边吸附拖拽
        // 说明：四边吸附已合并进插件原生拖曳释放流程，并受设置页开关控制；
        // STEP2 仅提供吸附计算与位置恢复，不再注册第二套拖曳监听器。

        // ── 5) 面板尺寸由 MessageModule 在创建和视窗变化时统一处理。

        // 观察器：对话框重建/右侧标签重新渲染后自动再打补丁
        let _step7Obs = null;
        function observeAndReapply() {
            if (_step7Obs) return;
            _step7Obs = new MutationObserver(function () {
                reorderHeader();
                markAddSender();
                patchPencilButton();
                patchOnlineButton();
                patchTabGroup();
                patchCloseAnimation();
                patchMsgSwitch();
            });
            // 只观察面板，避免聊天室消息触发无关处理。
            const panelHost = document.querySelector('.lc-panel') || document.body;
            _step7Obs.observe(panelHost, { childList: true, subtree: true });
        }
        observeAndReapply();

        // 清理注册
        try {
            window.__LC_UI_CLEANUP__ = window.__LC_UI_CLEANUP__ || [];
            window.__LC_UI_CLEANUP__.push(function () {
                try { if (_step7Obs) _step7Obs.disconnect(); } catch (e) {}
                try {
                    if (window.__lcStep7Cleanups) {
                        window.__lcStep7Cleanups.forEach(function (fn) { try { fn(); } catch (e) {} });
                        window.__lcStep7Cleanups = [];
                    }
                } catch (e) {}
            });
        } catch (e) {}
    })();

    // 初始化全局图片缓存
    if (!window.ImageCache) {
        window.ImageCache = {
            // URL 到 img 元素的映射
            imgMap: {},
            // 获取或创建 img 元素
            getImg: function(url) {
                if (!this.imgMap[url]) {
                    const img = document.createElement('img');
                    img.src = url;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    this.imgMap[url] = img;
                }
                return this.imgMap[url].cloneNode(true);
            }
        };
    }

    mod.hookFunction("ChatRoomMessageDisplay", 99, (args, next) => {
        var data = args[0];
        var msg = args[1];
        var SenderCharacter = args[2];
        var metadata = args[3];

        // 使用消息模块处理悄悄话消息
        MessageModule.handleChatRoomMessageDisplay(
            data,
            msg,
            SenderCharacter,
            data.Target ? ChatRoomCharacter.find(c => c.MemberNumber === data.Target) : null
        );
        if (data.Type == "Whisper"
            || (data.Type == "LocalMessage" && (msg.includes("<a onclick=\"FriendListShowBeep")
                                                || msg.includes("<a onclick=\"ServerOpenFriendList()\">")
                                                || msg.includes("bce-beep-reply")
                                               )))
        {
            if (Player.ExtensionSettings.LCData.MessageSetting.HidePrivateChat === HidePrivateChatEnum.HIDE_WHEN_SHOW_DIALOG
                && MessageModule.isMessageDialogVisible())
            {
                return;
            }
            if (Player.ExtensionSettings.LCData.MessageSetting.HidePrivateChat === HidePrivateChatEnum.HIDE_ALL_TIME)
            {
                return;
            }
        }


        return next(args);
    });


    // 获取消息
    mod.hookFunction(
        "ChatRoomMessage",
        99,
        (args, next) => {

            let data = args[0];
            // 使用消息模块处理悄悄话消息
            MessageModule.handleChatRoomMessage(data);

            next(args);
        }
    );

    mod.hookFunction("ServerAccountBeep", 0, (args, next) => {
        const data = args[0];

        // 处理收到的私聊消息
        if (data && data.MemberNumber && data.Message) {
            try {
                // 处理LCPlayerInfo类型的消息
                if (data.BeepType === "LCPlayerInfo") {
                    MessageModule.handlePlayerInfoMessage(data);
                }
                // 处理LCTypingStatus类型的消息
                else if (data.BeepType === "LCTypingStatus") {
                    MessageModule.handleTypingStatusMessage(data);
                }
                // 仅处理普通Beep消息（BeepType为null或空字符串的消息）
                else if (!data.BeepType || data.BeepType === "") {
                    // 处理消息内容
                    let messageContent = processBeepMessage(data.Message);

                    // 调用处理Beep的函数
                    MessageModule.handleBeepMessage(data.MemberNumber, data.MemberName, messageContent);
                }
            } catch (error) {
                console.error("处理私聊消息时出错:", error);
            }
        }

        // 继续原始函数
        return next(args);
    });

    // 添加对ServerSend函数的hook，捕获发送的Beep消息
    mod.hookFunction("ServerSend", 0, (args, next) => {
        // 检查是否是AccountBeep类型的消息
        if (args[0] === "AccountBeep" && args[1] && args[1].MemberNumber && args[1].Message) {
            try {
                const data = args[1];
                const targetMemberNumber = data.MemberNumber;
                let message = data.Message;
                // 仅处理普通Beep消息（BeepType为null或空字符串的消息）
                if (!data.BeepType || data.BeepType === "")
                {
                    // 处理消息内容
                    message = processBeepMessage(message);

                    // 将自己发送的Beep消息添加到历史记录
                    MessageModule.handleSentBeepMessage(targetMemberNumber, message);
                }
            } catch (error) {
                console.error("处理发送的Beep消息时出错:", error);
            }
        }

        // 继续原始函数
        return next(args);
    });


    // Hook GameKeyDown - 这是所有键盘事件的统一入口点
    // GameKeyDown在所有screen特定的KeyDown函数之前被调用，是最可靠的拦截点
    mod.hookFunction(
        "GameKeyDown",
        99, // 高优先级，确保在BC的其他处理之前执行
        (args, next) => {
            const event = args[0];

            // 如果消息对话框显示且按下Escape键
            if (MessageModule.isMessageDialogVisible() && event.key === 'Escape') {
                MessageModule.toggleMessageDialog();
                // 阻止事件传播
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                // 返回true告诉BC这个事件已被处理
                return true;
            }

            // 如果焦点在消息输入框上，阻止BC的默认键盘处理
            if (document.activeElement?.id?.startsWith("LC-Message")) {
                // 对于某些按键（如方向键、Escape等），完全阻止BC的处理
                // 但允许正常的文本输入
                const blockKeys = ['Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
                                   'PageUp', 'PageDown', 'Home', 'End', 'Tab'];
                if (blockKeys.includes(event.key)) {
                    // 只阻止传播，不preventDefault，这样输入框可以正常响应这些按键
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    // 返回true告诉BC不要继续处理
                    return true;
                }
                // 对于其他按键（如字母、数字、Enter等），也阻止BC的快捷键处理
                // 但允许在输入框内正常输入
                event.stopPropagation();
                event.stopImmediatePropagation();
                return true;
            }

            // 如果没有特殊情况，继续BC的正常处理流程
            return next(args);
        }
    );


    /**
     * 处理Beep消息内容，移除特殊字符串和尾部换行符
     * @param {string} message - 原始消息内容
     * @returns {string} - 处理后的消息内容
     */
    function processBeepMessage(message) {
        if (!message) return "";

        // 定义需要截断的特殊字符串列表
        const specialStrings = ['{"messageType"', '{"messageType"'];

        // 查找最早出现的特殊字符串位置
        let cutIndex = message.length;
        for (const str of specialStrings) {
            const index = message.indexOf(str);
            if (index > 0 && index < cutIndex) {
                cutIndex = index;
            }
        }

        // 如果找到了需要截断的位置，进行截断
        if (cutIndex < message.length) {
            message = message.substring(0, cutIndex).trim();
        }

        // 去掉末尾的换行符
        return message.replace(/[\r\n]+$/, '');
    }


    // 消息历史持久化模块
    const LCDataStorageModule = (function(dbName) {
        const DB_VERSION = 1;
        const STORE_MESSAGES = 'messages';
        const STORE_SENDER_STATES = 'senderStates';
        const STORE_PLAYER_CACHE = 'playerCache';

        let db = null;

        /**
         * 初始化数据库
         * @returns {Promise<IDBDatabase>}
         */
        async function initDB() {
            if (db) return db;

            return new Promise((resolve, reject) => {
                const request = indexedDB.open(dbName, DB_VERSION);

                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    db = request.result;
                    resolve(db);
                };

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;

                    // 创建消息存储
                    if (!db.objectStoreNames.contains(STORE_MESSAGES)) {
                        const messageStore = db.createObjectStore(STORE_MESSAGES, { keyPath: 'id', autoIncrement: true });
                        messageStore.createIndex('memberNumber', 'memberNumber', { unique: false });
                        messageStore.createIndex('time', 'time', { unique: false });
                    }

                    // 创建状态存储
                    if (!db.objectStoreNames.contains(STORE_SENDER_STATES)) {
                        const stateStore = db.createObjectStore(STORE_SENDER_STATES, { keyPath: 'memberNumber' });
                        stateStore.createIndex('pinnedTime', 'pinnedTime', { unique: false });
                        stateStore.createIndex('orderTimeStamp', 'orderTimeStamp', { unique: false });
                    }

                    // 新增 playerCache 存储
                    if (!db.objectStoreNames.contains(STORE_PLAYER_CACHE)) {
                        db.createObjectStore(STORE_PLAYER_CACHE, { keyPath: 'memberNumber' });
                    }
                };
            });
        }

        /**
         * 异步删除指定玩家的所有消息数据
         * @param {number} memberNumber - 玩家会员编号
         * @returns {Promise<void>}
         */
        async function deletePlayerMessages(memberNumber) {
            const database = await initDB();
            const transaction = database.transaction([STORE_MESSAGES, STORE_SENDER_STATES], 'readwrite');
            const store = transaction.objectStore(STORE_MESSAGES);
            const stateStore = transaction.objectStore(STORE_SENDER_STATES);
            const index = store.index('memberNumber');

            return new Promise((resolve, reject) => {
                const request = index.openCursor(IDBKeyRange.only(memberNumber));

                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        store.delete(cursor.primaryKey);
                        cursor.continue();
                    } else {
                        // 删除对应的状态数据
                        stateStore.delete(memberNumber);
                        resolve();
                    }
                };

                request.onerror = () => reject(request.error);
            });
        }

        /**
         * 异步获取指定玩家的消息记录
         * @param {number} memberNumber - 玩家会员编号
         * @param {number} [limit=-1] - 获取最近的n条消息，-1为全部
         * @returns {Promise<Array>} - 消息记录数组
         */
        async function getPlayerMessages(memberNumber, limit = -1) {
            const database = await initDB();
            const transaction = database.transaction([STORE_MESSAGES], 'readonly');
            const store = transaction.objectStore(STORE_MESSAGES);
            const index = store.index('memberNumber');

            return new Promise((resolve, reject) => {
                const request = index.getAll(IDBKeyRange.only(memberNumber));
                request.onsuccess = () => {
                    let result = request.result || [];
                    // 确保每条消息都带有主键id
                    result.forEach(msg => {
                        if (msg.id === undefined && msg[store.keyPath] !== undefined) {
                            msg.id = msg[store.keyPath];
                        }
                    });
                    if (limit > 0) {
                        // 按时间排序，取最近的n条
                        result = result.sort((a, b) => b.time - a.time).slice(0, limit).reverse();
                    }
                    resolve(result);
                };
                request.onerror = () => reject(request.error);
            });
        }

        /**
         * 同步向指定玩家添加消息记录
         * @param {number} memberNumber - 玩家会员编号
         * @param {Object} message - 消息对象
         */
        function addMessage(memberNumber, message) {
            const addMessageToDB = (database) => {
                const transaction = database.transaction([STORE_MESSAGES], 'readwrite');
                const store = transaction.objectStore(STORE_MESSAGES);
                const request = store.add({ ...message, memberNumber });

                request.onsuccess = () => {
                    // 将生成的ID添加到原始消息对象中
                    message.id = request.result;
                };
            };

            if (!db) {
                initDB().then(addMessageToDB).catch(console.error);
            } else {
                addMessageToDB(db);
            }
        }


        /**
         * 根据ID更新消息
         * @param {number} id - 消息ID
         * @param {Object} message - 要更新的消息对象
         */
        function updateMessageById(id, message) {
            if (!id) {
                return;
            }
            const updateMessageToDB = (database) => {
                const transaction = database.transaction([STORE_MESSAGES], 'readwrite');
                const store = transaction.objectStore(STORE_MESSAGES);
                // 先查找该id是否存在
                const getRequest = store.get(id);
                getRequest.onsuccess = () => {
                    if (!getRequest.result) {
                        console.error('updateMessageById: 数据库中不存在该ID，无法更新', id, message);
                        return;
                    }
                    // 存在才更新
                    const request = store.put({ ...message, id });
                    request.onerror = (e) => {
                        console.error('消息更新失败', e, message);
                    };
                };
                getRequest.onerror = (e) => {
                    console.error('updateMessageById: 查询消息时出错', e, id, message);
                };
            };

            if (!db) {
                initDB().then(updateMessageToDB).catch(console.error);
            } else {
                updateMessageToDB(db);
            }
        }


        /**
         * 异步获取指定玩家的状态数据
         * @param {number} memberNumber - 玩家会员编号
         * @returns {Promise<Object>} - 状态数据
         */
        async function getSenderState(memberNumber) {
            if (!db) return {};

            return new Promise((resolve, reject) => {
                const transaction = db.transaction([STORE_SENDER_STATES], 'readonly');
                const store = transaction.objectStore(STORE_SENDER_STATES);
                const request = store.get(memberNumber);

                request.onsuccess = () => resolve(request.result || {});
                request.onerror = () => reject(request.error);
            });
        }

        /**
         * 同步更新指定玩家的状态数据
         * @param {number} memberNumber - 玩家会员编号
         * @param {Object} state - 新的状态数据
         */
        function updateSenderState(memberNumber, state) {
            if (!db) {
                initDB().then(database => {
                    const transaction = db.transaction([STORE_SENDER_STATES], 'readwrite');
                    const store = transaction.objectStore(STORE_SENDER_STATES);
                    const { messages, ...stateWithoutMessages } = state;
                    store.put({ ...stateWithoutMessages, memberNumber });
                }).catch(console.error);
            } else {
                const transaction = db.transaction([STORE_SENDER_STATES], 'readwrite');
                const store = transaction.objectStore(STORE_SENDER_STATES);
                const { messages, ...stateWithoutMessages } = state;
                store.put({ ...stateWithoutMessages, memberNumber });
            }
        }

        /**
         * 异步加载置顶和最近玩家的消息
         * @param {Object} messageHistory - 要填充的消息历史对象
         * @param {number} maxRecentPlayers - 最大最近玩家数
         * @param {number} maxMessagesPerPlayer - 每个玩家最大消息数
         * @returns {Promise<void>}
         */
        async function loadRecentMessages(messageHistory, maxRecentPlayers = 10, maxMessagesPerPlayer = 20) {
            const database = await initDB();

            // 获取置顶玩家
            const pinnedPlayers = await new Promise((resolve, reject) => {
                const transaction = database.transaction([STORE_SENDER_STATES], 'readonly');
                const store = transaction.objectStore(STORE_SENDER_STATES);
                const index = store.index('pinnedTime');

                const request = index.openCursor(null, 'prev');
                const players = [];

                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor && cursor.value.pinnedTime) {
                        players.push(cursor.value.memberNumber);
                        cursor.continue();
                    } else {
                        resolve(players);
                    }
                };

                request.onerror = () => reject(request.error);
            });

            // 获取最近且不隐藏的玩家
            const recentPlayers = await new Promise((resolve, reject) => {
                const transaction = database.transaction([STORE_SENDER_STATES], 'readonly');
                const store = transaction.objectStore(STORE_SENDER_STATES);
                const index = store.index('orderTimeStamp');

                const request = index.openCursor(null, 'prev');
                const players = [];

                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        // 对于 recentPlayers，只收集不置顶、不隐藏、不是自己，且数量未超限
                        if (
                            !cursor.value.pinnedTime &&
                            !cursor.value.isHidden &&
                            cursor.value.memberNumber != Player.MemberNumber &&
                            players.length < maxRecentPlayers
                        ) {
                            players.push(cursor.value.memberNumber);
                        }
                        // 无论是否 push，都要继续遍历
                        // 但如果数量已满，直接 resolve
                        if (players.length < maxRecentPlayers) {
                            cursor.continue();
                        } else {
                            resolve(players);
                        }
                    } else {
                        resolve(players);
                    }
                };

                request.onerror = () => reject(request.error);
            });

            // 合并所有需要加载的玩家
            const playersToLoad = [...pinnedPlayers, ...recentPlayers];

            // 加载每个玩家的消息和状态
            for (const memberNumber of playersToLoad) {
                // 使用带limit参数的新方法，直接获取最新的maxMessagesPerPlayer条消息
                const [messages, state] = await Promise.all([
                    getPlayerMessages(memberNumber, maxMessagesPerPlayer),
                    getSenderState(memberNumber)
                ]);

                // 不再需要 slice 截取，messages 已经是最新的maxMessagesPerPlayer条
                const recentMessages = messages;

                // 填充到messageHistory
                messageHistory[memberNumber] = {
                    messages: recentMessages,
                    ...state
                };
            }
        }

        /**
         * 异步获取所有 PlayerCache 并放入传入的 playerCache 对象
         * @param {Object} playerCacheObj - 传入的 playerCache 对象
         * @returns {Promise<void>}
         */
        async function loadAllPlayerCache(playerCacheObj) {
            const database = await initDB();
            return new Promise((resolve, reject) => {
                const transaction = database.transaction([STORE_PLAYER_CACHE], 'readonly');
                const store = transaction.objectStore(STORE_PLAYER_CACHE);
                const request = store.getAll();
                request.onsuccess = () => {
                    const result = request.result || [];
                    for (const item of result) {
                        playerCacheObj[item.memberNumber] = item;
                    }
                    resolve();
                };
                request.onerror = () => reject(request.error);
            });
        }

        /**
         * 异步用传入的 playerCacheObj 替换整个 PlayerCache 库
         * @param {Object} playerCacheObj - 要写入的 playerCache 对象
         * @returns {Promise<void>}
         */
        async function replaceAllPlayerCache(playerCacheObj) {
            const database = await initDB();
            return new Promise((resolve, reject) => {
                const transaction = database.transaction([STORE_PLAYER_CACHE], 'readwrite');
                const store = transaction.objectStore(STORE_PLAYER_CACHE);
                // 先清空
                const clearReq = store.clear();
                clearReq.onsuccess = () => {
                    // 批量写入
                    const values = Object.values(playerCacheObj);
                    let i = 0;
                    function putNext() {
                        if (i >= values.length) {
                            resolve();
                            return;
                        }
                        const item = values[i++];
                        try {
                            const putReq = store.put(item);
                            putReq.onsuccess = putNext;
                            putReq.onerror = () => {
                                console.warn('[LianChat] IndexedDB write failed, skipping problematic data item:', item);
                                putNext();
                            };
                        } catch (error) {
                            console.warn('[LianChat] Data validation failed, skipping problematic data item:', item, 'Error:', error);
                            putNext();
                        }
                    }
                    putNext();
                };
                clearReq.onerror = () => reject(clearReq.error);
            });
        }

        /**
         * 异步更新单个玩家的 PlayerCache
         * @param {number} memberNumber
         * @param {Object} cacheData
         * @returns {Promise<void>}
         */
        async function updatePlayerCache(memberNumber, cacheData) {
            const database = await initDB();
            return new Promise((resolve, reject) => {
                const transaction = database.transaction([STORE_PLAYER_CACHE], 'readwrite');
                const store = transaction.objectStore(STORE_PLAYER_CACHE);
                const data = { ...cacheData, memberNumber };
                const req = store.put(data);
                req.onsuccess = () => resolve();
                req.onerror = () => reject(req.error);
            });
        }


        /**
         * 异步获取指定玩家的消息数量
         * @param {number} memberNumber - 玩家会员编号
         * @returns {Promise<number>} - 消息数量
         */
        async function getPlayerMessageCount(memberNumber) {
            const database = await initDB();
            const transaction = database.transaction([STORE_MESSAGES], 'readonly');
            const store = transaction.objectStore(STORE_MESSAGES);
            const index = store.index('memberNumber');
            return new Promise((resolve, reject) => {
                let countRequest = index.count(IDBKeyRange.only(memberNumber));
                countRequest.onsuccess = () => resolve(countRequest.result || 0);
                countRequest.onerror = () => reject(countRequest.error);
            });
        }

        return {
            deletePlayerMessages,
            getPlayerMessages,
            addMessage,
            updateMessageById,
            getSenderState,
            updateSenderState,
            loadRecentMessages,
            loadAllPlayerCache,
            replaceAllPlayerCache,
            updatePlayerCache,
            getPlayerMessageCount,
            initDB // 导出initDB以便外部初始化
        };
    });

    /**
     * @type {ReturnType<typeof LCDataStorageModule>}
     * 消息历史持久化模块实例
     */
    let LCDataStorage = null;

    // 国际化模块
    const I18nModule = (function() {
        // 翻译字典
        const translations = {
            'CN': {
                'input_placeholder': '输入消息...',
                'enter_room': '进入房间',
                'leave_room_first': '需要先离开房间',
                'confirm_enter_room': '进入房间 {0}？',
                'typing': '(正在输入...)',
                'offline': '离线',
                'left_room': '已离开',
                'current_room': '当前房间',
                'private_room': '[私人房间]',
                'friends': '好友',
                'room': '房间',
                'lobby': '大厅',
                'loading': '加载中...',
                'whisper': '悄悄话',
                'beep': '私聊',
                'search_members': '搜索消息成员...',
                'no_message_history': '暂无消息记录',
                'room_location': '位于 {0}',
                'current_room_location': '位于 当前房间',
                'private_room_prefix': '[私]',
                'confirm': '确定',
                'cancel': '取消',
                'unpin': '取消置顶',
                'pin': '置顶',
                'hide': '不显示',
                'delete_chat_history': '删除聊天记录',
                'confirm_delete_chat': '确定要删除与 {0} 的所有聊天记录吗？此操作不可恢复。',
                'search...': '搜索...',
                'confirm_teleport_room': '是否传送至房间 "{0}" ？',
                'enter': '进入',
                'lianchat_settings': 'LianChat 设置',
                'hide_private_messages': '公屏隐藏收到的悄悄话和私聊：',
                'no_hide': '不隐藏',
                'hide_when_open': '打开时隐藏',
                'always_hide': '一直隐藏',
                'background_notification': '网页后台时消息通知',
                'signature_placeholder': '输入新的签名...（最多50字）',
                'avatar_url_placeholder': '输入头像地址...',
                'avatar_sites_tip': '悬停此处查看目前头像可用网站',
                'save': '保存',
                'invalid_image_url': '不可用的图片URL，请使用以下网站：\n{0}',
                'select_sender_prompt': '请选择一个发送者查看消息',
                'no_messages': '暂无消息',
                'invite_to_current_room': '邀请进入当前房间',
                'invite_room_message': '({0} 邀请你进入房间 |{1}|)',
                'cannot_get_room_info': '无法获取当前房间信息',
                'send_member_status': '发送成员状态列表',
                'not_in_chatroom': '您当前不在聊天室中',
                'room_members_count': '👥 房间内{0}人:\n',
                'invite_friend': '邀请成为好友',
                'invite_friend_message': '({0} 邀请你成为好友)',
                'send_lianchat_link': '发送LianChat安装链接',
                'lianchat_link_message': '[LianChat] (https://xinlian132243.github.io/BCMod/BC_LianChat.user.js)',
                'chat_record_file_name': '聊天记录_{0}_{1}-{2}_{3}-{4}.txt',
                'cannot_send': '无法发送',
                'send': '发送',
                'locked_prefix': '[锁] ',
                'private_prefix': '[私] ',
                'no_signature': '暂无签名',
                'add_friend': '添加好友',
                'friend_added_confirm': '已成功加{0}为好友，是否立即发送回执消息？',
                'friend_added_message': '({0} 已经成为了你的好友，让我们一起开始愉快的聊天吧)',
                'message_limit_tip': '超出显示范围的消息请下载后查看'
            },
            'EN': {
                'input_placeholder': 'Type a message...',
                'enter_room': 'Enter Room',
                'leave_room_first': 'Need to leave current room first',
                'confirm_enter_room': 'Enter room {0}?',
                'typing': 'Typing...',
                'offline': 'Offline',
                'left_room': 'Left',
                'current_room': 'current Room',
                'private_room': '[Private Room]',
                'friends': 'Friends',
                'room': 'Room',
                'lobby': 'Lobby',
                'loading': 'Loading...',
                'whisper': 'Whisper',
                'beep': 'Beep',
                'search_members': 'Search members...',
                'no_message_history': 'No message history',
                'room_location': 'In {0}',
                'current_room_location': 'In current room',
                'private_room_prefix': '[Private]',
                'confirm': 'Confirm',
                'cancel': 'Cancel',
                'unpin': 'Unpin',
                'pin': 'Pin',
                'hide': 'Hide',
                'delete_chat_history': 'Delete Chat History',
                'confirm_delete_chat': 'Are you sure you want to delete all chat history with {0}? This action cannot be undone.',
                'search...': 'Search...',
                'confirm_teleport_room': 'Teleport to room "{0}"?',
                'enter': 'Enter',
                'lianchat_settings': 'LianChat Settings',
                'hide_private_messages': 'Hide received whispers and private messages on public screen:',
                'no_hide': 'No hide',
                'hide_when_open': 'Hide when open',
                'always_hide': 'Always hide',
                'background_notification': 'Message notification when page is in background',
                'signature_placeholder': 'Enter new signature... (max 50 characters)',
                'avatar_url_placeholder': 'Enter avatar URL...',
                'avatar_sites_tip': 'Hover here to view available avatar sites',
                'save': 'Save',
                'invalid_image_url': 'Invalid image URL, please use the following sites:\n{0}',
                'select_sender_prompt': 'Please select a sender to view messages',
                'no_messages': 'No messages',
                'invite_to_current_room': 'Invite to current room',
                'invite_room_message': '({0} invites you to join room |{1}|)',
                'cannot_get_room_info': 'Cannot get current room information',
                'send_member_status': 'Send member status list',
                'not_in_chatroom': 'You are not currently in a chat room',
                'room_members_count': '👥 {0} members in room:\n',
                'invite_friend': 'Invite as friend',
                'invite_friend_message': '({0} invites you to be friends)',
                'send_lianchat_link': 'Send LianChat installation link',
                'lianchat_link_message': '[LianChat] (https://xinlian132243.github.io/BCMod/BC_LianChat.user.js)',
                'chat_record_file_name': 'Chat_Record_{0}_{1}-{2}_{3}-{4}.txt',
                'cannot_send': 'Cannot send',
                'send': 'Send',
                'locked_prefix': '[L] ',
                'private_prefix': '[P] ',
                'no_signature': 'No signature',
                'add_friend': 'Add Friend',
                'friend_added_confirm': 'Successfully added {0} as friend. Send confirmation message now?',
                'friend_added_message': '({0} is now your friend, let\'s start chatting happily together!)',
                'message_limit_tip': 'Messages beyond the display range can be viewed after downloading'
            }
        };

        /**
         * 获取当前语言
         * @returns {string} - 语言代码，如 'CN' 或 'EN'
         */
        function getCurrentLanguage() {
            // 从 TranslationLanguage 获取当前语言，默认为 'CN'
            const lang = typeof TranslationLanguage !== 'undefined' ? TranslationLanguage : 'EN';
            if (lang === 'TW') return 'CN';
            // 确保语言代码存在于翻译字典中
            return translations[lang] ? lang : 'EN';
        }

        /**
         * 根据 key 获取对应语言的文本
         * @param {string} key - 翻译键
         * @param {...string} args - 用于替换占位符的参数
         * @returns {string} - 翻译后的文本
         */
        function getText(key, ...args) {
            const lang = getCurrentLanguage();
            let text = translations[lang][key] || translations['CN'][key] || key;

            // 替换占位符 {0}, {1}, {2} 等
            args.forEach((arg, index) => {
                text = text.replace(new RegExp(`\\{${index}\\}`, 'g'), arg);
            });

            return text;
        }

        /**
         * 检查指定语言是否支持某个键
         * @param {string} key - 翻译键
         * @param {string} [lang] - 语言代码，默认为当前语言
         * @returns {boolean} - 是否支持
         */
        function hasKey(key, lang = null) {
            const targetLang = lang || getCurrentLanguage();
            return translations[targetLang] && translations[targetLang][key] !== undefined;
        }

        /**
         * 添加或更新翻译
         * @param {string} lang - 语言代码
         * @param {string} key - 翻译键
         * @param {string} value - 翻译值
         */
        function addTranslation(lang, key, value) {
            if (!translations[lang]) {
                translations[lang] = {};
            }
            translations[lang][key] = value;
        }

        return {
            getText,
            hasKey,
            addTranslation,
            getCurrentLanguage
        };
    })();

    // 消息对话框模块
    const MessageModule = (function() {
        // 私有变量
        let messageDialog = null;
        // 关闭动画期间面板仍在渲染，因此可见状态必须独立于 style.display，
        // 并在 show/hide 调用当下同步，避免 FAB 状态和快速连点发生反转。
        let isDialogVisibleState = false;
        let isDragging = false;
        let dragOffsetX = 0;
        let dragOffsetY = 0;
        /** @type {Object.<number, {
         *      messages: Array<{
         *          id?: number, // 消息在IndexedDB中的唯一自增ID
         *          content: string,
         *          time: Date,
         *          type: string,
         *          sender: number,
         *          status?: { [key: string]: string } // 用于描述消息处理状况的字典
         *      }>,
         *      inputState?: {
         *          text: string,
         *          type: string
         *      },
         *      isHidden?: boolean,
         *      unreadCount?: number,
         *      pinnedTime?: number,
         *      orderTimeStamp?: number
         * }>} */
        let messageHistory = {}; // 存储消息历史，按发送者MemberNumber分组
        let selectedSenderNum = 0; // 当前选中的发送者MemberNumber，0表示未选择
        let typingToSenderType = null; // 正在输入的类型,Beep或Whisper
        let typingTimer = null;

        // 正在输入的用户数组
        /** @type {Array<{
         *      Number: number,
         *      type: string,
         *      timestamp: number
         * }>} */
        let typingPlayers = [];


        // 缩放相关变量
        let isResizing = false;
        let resizeDirection = '';
        let originalWidth = 0;
        let originalHeight = 0;
        let originalX = 0;
        let originalY = 0;

        /**
         * @typedef {Object} PlayerCacheInfo
         * @property {string} Name - 角色名称
         * @property {string} Nickname - 角色昵称
         * @property {string} Avatar - 角色头像URL
         * @property {string} Signature - 角色签名
         * @property {number} UpdateTime - 缓存更新时间戳
         */

        /**
         * 角色信息缓存
         * @type {Object.<number, PlayerCacheInfo>}
         */
        let playerCache = {};
        /**
         * 好友数据缓存
         * @type {Array<{
         *     Type: string,
         *     MemberNumber: number,
         *     MemberName: string,
         *     ChatRoomSpace: string,
         *     ChatRoomName: string
         * }>}
         */
        let onlineFriendsCache = [];

        let isReadyRevRoomList = false;
        let roomListRequestId = 0; // 只采用最新的房间列表回应
        let lobbyListLoading = false;

        /**
         * 房间列表数据缓存
         * @type {Object.<string, {
         *     Name: string,
         *     Language: string,
         *     Creator: string,
         *     CreatorMemberNumber: number,
         *     Creation: number,
         *     MemberCount: number,
         *     MemberLimit: number,
         *     Description: string,
         *     BlockCategory: string[],
         *     Game: string,
         *     Friends: Array<{
         *         Type: string,
         *         MemberNumber: number,
         *         MemberName: string
         *     }>,
         *     Space: string,
         *     Visibility: string[],
         *     Access: string[],
         *     Locked: boolean,
         *     Private: boolean,
         *     MapType: string,
         *     CanJoin: boolean
         * }>}
         */
        let onlineRoomListData = {};

        /**
         * 房间列表数据缓存
         * @type {Array<{
         *     Name: string,
         *     Language: string,
         *     Creator: string,
         *     CreatorMemberNumber: number,
         *     Creation: number,
         *     MemberCount: number,
         *     MemberLimit: number,
         *     Description: string,
         *     BlockCategory: string[],
         *     Game: string,
         *     Friends: Array<{
         *         Type: string,
         *         MemberNumber: number,
         *         MemberName: string
         *     }>,
         *     Space: string,
         *     Visibility: string[],
         *     Access: string[],
         *     Locked: boolean,
         *     Private: boolean,
         *     MapType: string,
         *     CanJoin: boolean
         * }>}
         */
        let searchRoomListResult = [];
        let updateCounter = 0;

        // 自动刷新相关变量
        let refreshInterval = null;
        const REFRESH_INTERVAL_MS = 3000; // 3秒刷新一次

        let syncPlayerInfoQueue = []; // 待同步信息列表
        let syncPlayerInfoTimer = null; // 同步定时器

        /**
         * 获取并更新角色缓存信息
         * @param {number} memberNumber - 角色会员编号
         * @param {boolean} [forceUpdate=false] - 是否强制更新缓存
         * @returns {{cache: PlayerCacheInfo, isSelf: boolean} | null} - 缓存信息和是否是自己
         */
        function getAndUpdateCharacterCache(memberNumber) {
            if (!memberNumber) return null;

            // 检查是否需要更新缓存
            const existingCache = playerCache[memberNumber];

            // 获取角色信息
            let characterInfo = null;
            let isSelf = false;

            if (memberNumber === Player?.MemberNumber) {
                characterInfo = {
                    Name: Player?.Name || '',
                    Nickname: Player?.Nickname || '',
                    Avatar: Player?.OnlineSharedSettings?.LCData?.MessageSetting?.Avatar || '',
                    Signature: Player?.OnlineSharedSettings?.LCData?.MessageSetting?.Signature || '',
                    EnableLianChat: Player?.OnlineSharedSettings?.LCData?.MessageSetting?.EnableLianChat || false
                };
                isSelf = true;
            } else if (CurrentScreen === "ChatRoom" && ChatRoomCharacter?.find(c => c?.MemberNumber === memberNumber)) {
                const character = ChatRoomCharacter.find(c => c?.MemberNumber === memberNumber);
                if (character) {
                    characterInfo = {
                        Name: character?.Name || '',
                        Nickname: character?.Nickname || '',
                        Avatar: character?.OnlineSharedSettings?.LCData?.MessageSetting?.Avatar || '',
                        Signature: character?.OnlineSharedSettings?.LCData?.MessageSetting?.Signature || '',
                        EnableLianChat: character?.OnlineSharedSettings?.LCData?.MessageSetting?.EnableLianChat || false
                    };
                }
            } else if (playerCache[memberNumber]) {
                // 从缓存中获取
                return { cache: playerCache[memberNumber], isSelf: false };
            } else if (Player?.FriendList && Player?.FriendNames) {
                const friendName = Player?.FriendNames?.get(memberNumber);
                if (friendName) {
                    characterInfo = {
                        Name: friendName || '',
                        Nickname: '',
                        Avatar: '',
                        Signature: '',
                        EnableLianChat: false
                    };
                    // 不更新缓存，直接返回
                    return { cache: characterInfo, isSelf: false };
                }
            }

            if (characterInfo) {
                const newCache = {
                    ...characterInfo,
                    UpdateTime: Date.now()
                };

                // 检查内容是否发生变化
                if (!existingCache ||
                    existingCache.Name !== newCache.Name ||
                    existingCache.Nickname !== newCache.Nickname ||
                    existingCache.Avatar !== newCache.Avatar ||
                    existingCache.Signature !== newCache.Signature) {
                    playerCache[memberNumber] = newCache;
                    LCDataStorage.updatePlayerCache(memberNumber, newCache);
                }
                return { cache: newCache, isSelf };
            }

            return { cache: null, isSelf: false};
        }

        /**
         * 获取玩家名称
         * @param {number} memberNumber - 角色会员编号
         * @returns {string} - 角色名称
         */
        function getCharacterName(memberNumber) {
            if (!memberNumber) return `(${memberNumber})`;

            const cacheResult = getAndUpdateCharacterCache(memberNumber);
            if (cacheResult && cacheResult.cache) {
                return cacheResult.cache.Nickname || cacheResult.cache.Name || `(${memberNumber})`;
            }

            return `(${memberNumber})`;
        }

        /**
         * 获取角色头像信息
         * @param {number} memberNumber - 角色会员编号
         * @returns {{Avatar: string, Signature: string}} - 头像和签名信息
         */
        function getCharacterInfo(memberNumber) {
            const cacheResult = getAndUpdateCharacterCache(memberNumber);
            if (cacheResult) {
                return {
                    Avatar: cacheResult?.cache?.Avatar || '',
                    Signature: cacheResult?.cache?.Signature || ''
                };
            }

            return {
                Avatar: '',
                Signature: ''
            };
        }

        function getCharacterRoomInfo(memberNumber) {
            // 检查是否在当前房间
            if (CurrentScreen === "ChatRoom" && ChatRoomCharacter) {
                const isInCurrentRoom = ChatRoomCharacter.some(c => c.MemberNumber === parseInt(memberNumber));
                if (isInCurrentRoom)
                {
                    if (parseInt(memberNumber) === Player.MemberNumber) {
                        return I18nModule.getText('room_location', ChatRoomData?.Name || I18nModule.getText('current_room'));
                    } else {
                        return I18nModule.getText('current_room_location');
                    }
                }
            }

            // 如果不在房间，则什么也不显示
            if (parseInt(memberNumber) === Player.MemberNumber) {
                return ``;
            }

            const friendInfo = onlineFriendsCache.find(f => f.MemberNumber === parseInt(memberNumber));
            if (friendInfo) {
                return I18nModule.getText('room_location', getRoomLocationText(friendInfo));
            } else if (isFriend(memberNumber)) {
                // 是好友但不在在线好友列表中
                return I18nModule.getText('offline');
            } else {
                // 既不是好友也不在同一个房间
                return I18nModule.getText('left_room');
            }
        }

        /**
         * 封装房间位置文本生成逻辑
         * @param {Object} friendInfo
         * @returns {string}
         */
        function getRoomLocationText(friendInfo) {
            let location = '';
            // 根据房间名和私有状态显示不同文本
            if (friendInfo.ChatRoomName) {
                // 有房间名
                if (friendInfo.Private) {
                    location = `${I18nModule.getText('private_room_prefix')} ${friendInfo.ChatRoomName}`;
                } else {
                    location = `${friendInfo.ChatRoomName}`;
                }
            } else if (friendInfo.Private) {
                // 无房间名但是私有房间
                location = I18nModule.getText('private_room');
            } else {
                // 既无房间名也不是私有房间
                location = I18nModule.getText('lobby');
            }
            return location;
        }

        // 重置对话框位置到初始状态
        function resetDialogPosition(dialog) {
            if (!CommonIsMobile) {
                // 桌面设备
                dialog.style.left = '0%';
                dialog.style.top = '20%';
            } else {
                // 移动设备
                dialog.style.left = '1%';
                dialog.style.top = '1%';
            }
        }

        // 发送悄悄话函数
        function sendWhisper(targetMemberNumber, message) {
            if (!targetMemberNumber || !message || message.trim() === '') return false;

            // 检查是否在聊天室
            if (CurrentScreen !== "ChatRoom") return false;

            // 检查目标是否在当前房间
            const targetCharacter = ChatRoomCharacter.find(c => c.MemberNumber === parseInt(targetMemberNumber));
            if (!targetCharacter) return false;

            // 备份当前目标
            const originalTarget = ChatRoomTargetMemberNumber;

            // 发送悄悄话
            ChatRoomTargetMemberNumber = targetCharacter.MemberNumber;

            ChatRoomSendWhisper(targetMemberNumber, message);

            // 还原原始目标
            ChatRoomTargetMemberNumber = originalTarget;

            return true;
        }


        /**
     * 发送Beep消息给指定会员
     * @param {number} targetMemberNumber - 接收者的会员编号
     * @param {string} message - 消息内容
     * @param {Object} [options] - 可选配置项
     * @param {boolean} [options.showRoom=false] - 是否在Beep中显示当前聊天室信息
     * @param {boolean} [options.logToConsole=false] - 是否在控制台记录发送的Beep
     * @returns {boolean} - 发送是否成功
     */
        function sendBeep(targetMemberNumber, message, options = {}) {
            // 参数验证
            if (!CommonIsInteger(targetMemberNumber) || targetMemberNumber <= 0) {
                console.error("无效的会员编号:", targetMemberNumber);
                return false;
            }

            if (typeof message !== "string") {
                message = String(message || "");
            }

            // 添加WCE 风格消息会导致无法进入WCE Beep聊天记录
            //message += '\n\n{"messageType":"Message","messageColor":"' + Player.LabelColor + '"}';

            // 默认选项
            const defaultOptions = {
                showRoom: false,
                logToConsole: false
            };

            // 合并选项
            const finalOptions = Object.assign({}, defaultOptions, options);

            try {
                // 发送Beep消息
                ServerSend("AccountBeep", {
                    MemberNumber: targetMemberNumber,
                    BeepType: "",
                    IsSecret: !finalOptions.showRoom,
                    Message: message || undefined
                });

                // 添加到Beep日志
                FriendListBeepLog.push({
                    MemberNumber: targetMemberNumber,
                    MemberName: Player.FriendNames.get(targetMemberNumber) || `会员 #${targetMemberNumber}`,
                    ChatRoomName: finalOptions.showRoom ? ChatRoomData?.Name : undefined,
                    ChatRoomSpace: finalOptions.showRoom ? ChatRoomData?.Space : undefined,
                    Sent: true,
                    Private: finalOptions.showRoom ? !ChatRoomData?.Visibility.includes("All") : undefined,
                    Time: new Date(),
                    Message: message || undefined
                });

                // 可选的控制台日志
                if (finalOptions.logToConsole) {
                    console.log(`已发送Beep给 ${targetMemberNumber}，消息内容: ${message}`);
                }

                return true;
            } catch (error) {
                console.error("发送Beep时出错:", error);
                return false;
            }
        }


        /**
     * 发送悄悄话输入状态给指定玩家
     * @param {number} targetNumber - 目标玩家的会员编号
     * @param {boolean} isTyping - true表示开始输入，false表示结束输入
     */
        function sendWhisperTypingStatus(targetNumber, isTyping) {
            if (!targetNumber) return;

            // 构建状态消息
            const statusMessage = {
                type: "ChatRoomStatusEvent",
                message: {
                    Type: isTyping ? "Whisper" : "None",
                    Target: targetNumber
                }
            };

            // 发送状态消息
            ServerSend("ChatRoomChat", {
                Content: "BCXMsg",
                Type: "Hidden",
                Target: targetNumber,
                Dictionary: statusMessage
            });
        }


        // 发送输入状态
        function sendTypingStatus(isTyping)
        {
            if (!selectedSenderNum) return;

            // 获取当前选择的消息类型
            const messageType = document.querySelector('input[name="messageType"]:checked')?.value;

            // 如果之前有正在输入的对象，先结束它的输入状态
            if (messageType && typingToSenderType && typingToSenderType !== messageType) {
                if (typingToSenderType === "Whisper") {
                    sendWhisperTypingStatus(selectedSenderNum, false);
                } else {
                    sendBeepTypingStatus(selectedSenderNum, false);
                }
            }
            // 更新当前输入类型
            typingToSenderType = isTyping ? messageType : null;
            // 发送新的输入状态
            if (messageType === "Whisper") {
                sendWhisperTypingStatus(selectedSenderNum, isTyping);
            } else {
                sendBeepTypingStatus(selectedSenderNum, isTyping);
            }

            if (!isTyping) {
                // 清除之前的定时器
                if (typingTimer) {
                    clearInterval(typingTimer);
                    typingTimer = null;
                }
            }
        }


        /**
     * 发送角色信息Beep消息给指定会员
     * @param {number} targetMemberNumber - 接收者的会员编号
     * @param {Object} messageSetting - 角色信息设置
     * @param {Object} [options] - 可选配置项
     * @param {boolean} [options.logToConsole=false] - 是否在控制台记录发送的Beep
     * @returns {boolean} - 发送是否成功
     */
        function sendPlayerInfoBeep(targetMemberNumber, options = {}) {
            // 参数验证
            if (!CommonIsInteger(targetMemberNumber) || targetMemberNumber <= 0) {
                console.error("无效的会员编号:", targetMemberNumber);
                return false;
            }

            // 从Player获取messageSetting
            const messageSetting = {
                Name: Player?.Name || '',
                Nickname: Player?.Nickname || '',
                Avatar: Player?.OnlineSharedSettings?.LCData?.MessageSetting?.Avatar || '',
                Signature: Player?.OnlineSharedSettings?.LCData?.MessageSetting?.Signature || '',
                EnableLianChat: Player?.OnlineSharedSettings?.LCData?.MessageSetting?.EnableLianChat || false
            };

            // 默认选项
            const defaultOptions = {
                logToConsole: false
            };

            // 合并选项
            const finalOptions = Object.assign({}, defaultOptions, options);

            try {
                // 发送Beep消息
                ServerSend("AccountBeep", {
                    MemberNumber: targetMemberNumber,
                    BeepType: "LCPlayerInfo",
                    IsSecret: true,
                    Message: JSON.stringify(messageSetting)
                });

                // 可选的控制台日志
                if (finalOptions.logToConsole) {
                    console.log(`已发送角色信息Beep给 ${targetMemberNumber}，消息内容:`, messageSetting);
                }

                return true;
            } catch (error) {
                console.error("发送角色信息Beep时出错:", error);
                return false;
            }
        }

        /**
     * 发送Beep输入状态给指定会员
     * @param {number} targetMemberNumber - 接收者的会员编号
     * @param {boolean} isTyping - true表示开始输入，false表示结束输入
     * @param {Object} [options] - 可选配置项
     * @param {boolean} [options.logToConsole=false] - 是否在控制台记录发送的Beep
     * @returns {boolean} - 发送是否成功
     */
        function sendBeepTypingStatus(targetMemberNumber, isTyping, options = {}) {
            // 参数验证
            if (!CommonIsInteger(targetMemberNumber) || targetMemberNumber <= 0) {
                console.error("无效的会员编号:", targetMemberNumber);
                return false;
            }

            // 构建状态消息
            const statusMessage = {
                type: "TypingStatus",
                isTyping: isTyping,
                timestamp: Date.now()
            };

            // 默认选项
            const defaultOptions = {
                logToConsole: false
            };

            // 合并选项
            const finalOptions = Object.assign({}, defaultOptions, options);

            try {
                // 发送Beep消息
                ServerSend("AccountBeep", {
                    MemberNumber: targetMemberNumber,
                    BeepType: "LCTypingStatus",
                    IsSecret: true,
                    Message: JSON.stringify(statusMessage)
                });

                // 可选的控制台日志
                if (finalOptions.logToConsole) {
                    console.log(`已发送输入状态Beep给 ${targetMemberNumber}，状态: ${isTyping ? '正在输入' : '结束输入'}`);
                }

                return true;
            } catch (error) {
                console.error("发送输入状态Beep时出错:", error);
                return false;
            }
        }


        // SenderItem类定义
        class SenderItem {
            constructor() {
                // 创建DOM元素
                this.element = document.createElement('div');
                this.element.className = 'lc-conv-item';
                this.element.style.display = 'flex';
                this.element.style.flexDirection = 'row';
                this.element.style.padding = '8px 5px';
                this.element.style.cursor = 'pointer';
                this.element.style.borderRadius = '4px';
                this.element.style.gap = '10px';

                // 创建子元素
                this.avatarContainer = null;
                this.contentContainer = document.createElement('div');
                this.contentContainer.className = 'lc-conv-main';
                this.firstRow = document.createElement('div');
                this.secondRow = document.createElement('div');
                this.nameContainer = document.createElement('div');
                this.nameSpan = document.createElement('span');
                this.nameSpan.className = 'lc-conv-name';
                this.timeContainer = document.createElement('div');
                this.timeContainer.className = 'lc-conv-time';
                this.previewContainer = document.createElement('div');
                this.previewContainer.className = 'lc-conv-preview';
                this.unreadIndicator = document.createElement('div');
                this.unreadIndicator.className = 'lc-unread';

                // 初始化样式
                this.initializeStyles();

                // 在构造函数中初始化DOM结构
                this.initializeDOMStructure();

                // 添加事件监听器
                this.addEventListeners();
            }

            initializeDOMStructure() {
                // 清空element
                this.element.innerHTML = '';

                // 创建并添加头像容器
                this.avatarContainer = createOrUpdateAvatarContainer(0); // 先创建空的头像容器
                this.avatarContainer.style.flexShrink = '0';
                this.element.appendChild(this.avatarContainer);

                // 添加内容容器
                this.element.appendChild(this.contentContainer);
            }

            initializeStyles() {
                // 内容容器样式
                this.contentContainer.style.display = 'flex';
                this.contentContainer.style.flexDirection = 'column';
                this.contentContainer.style.flex = '1';
                this.contentContainer.style.minWidth = '0';

                // 第一行样式
                this.firstRow.style.display = 'flex';
                this.firstRow.style.justifyContent = 'space-between';
                this.firstRow.style.alignItems = 'center';
                this.firstRow.style.width = '100%';

                // 名称容器样式
                this.nameContainer.style.flex = '1';
                this.nameContainer.style.overflow = 'hidden';
                this.nameContainer.style.textOverflow = 'ellipsis';
                this.nameContainer.style.whiteSpace = 'nowrap';

                // 第二行样式
                this.secondRow.style.display = 'flex';
                this.secondRow.style.justifyContent = 'space-between';
                this.secondRow.style.alignItems = 'center';
                this.secondRow.style.width = '100%';
                this.secondRow.style.marginTop = '3px';

                // 预览容器样式
                this.previewContainer.style.fontSize = '0.85em';
                this.previewContainer.style.color = '#666666';
                this.previewContainer.style.overflow = 'hidden';
                this.previewContainer.style.textOverflow = 'ellipsis';
                this.previewContainer.style.whiteSpace = 'nowrap';
                this.previewContainer.style.flex = '1';
                this.previewContainer.style.maxWidth = '100%';

                // 未读指示器样式
                this.unreadIndicator.style.backgroundColor = '#ff4d4f';
                this.unreadIndicator.style.color = 'white';
                this.unreadIndicator.style.borderRadius = '10px';
                this.unreadIndicator.style.padding = '0 6px';
                this.unreadIndicator.style.fontSize = '12px';
                this.unreadIndicator.style.fontWeight = 'bold';
                this.unreadIndicator.style.minWidth = '18px';
                this.unreadIndicator.style.height = '18px';
                this.unreadIndicator.style.display = 'flex';
                this.unreadIndicator.style.alignItems = 'center';
                this.unreadIndicator.style.justifyContent = 'center';
                this.unreadIndicator.style.marginLeft = '8px';
            }

            addEventListeners() {
                // 移除之前的事件监听器（如果存在）
                this.removeEventListeners();

                const COLOR_HOVER = '#f0f0f0';
                const COLOR_SELECTED = '#e6f7ff';
                const COLOR_PINNED = '#fAfAfA';

                // 存储事件处理函数以便后续移除
                this.mouseOverHandler = () => {
                    if (selectedSenderNum !== this.memberNumber) {
                        this.element.style.backgroundColor = COLOR_HOVER;
                    }
                };

                this.mouseOutHandler = () => {
                    if (selectedSenderNum !== this.memberNumber) {
                        if (messageHistory[this.memberNumber]?.pinnedTime && messageHistory[this.memberNumber].pinnedTime > 0) {
                            this.element.style.backgroundColor = COLOR_PINNED;
                        } else {
                            this.element.style.backgroundColor = '';
                        }
                    } else {
                        this.element.style.backgroundColor = COLOR_SELECTED;
                    }
                };

                this.clickHandler = () => {
                    const searchInput = document.getElementById('messageSearchInput');
                    if (searchInput) {
                        searchInput.value = '';
                    }
                    saveCurrentInputState();
                    changeSelectedSender(this.memberNumber);

                    const inputField = document.getElementById('LC-Message-InputField');
                    if (inputField) {
                        inputField.focus();
                    }
                };

                this.contextMenuHandler = (e) => {
                    e.preventDefault();
                    createContextMenu(this.getContextMenuOptions(this.memberNumber), e.clientX, e.clientY);
                };

                // 添加新的事件监听器
                this.element.addEventListener('mouseover', this.mouseOverHandler);
                this.element.addEventListener('mouseout', this.mouseOutHandler);
                this.element.addEventListener('click', this.clickHandler);
                this.element.addEventListener('contextmenu', this.contextMenuHandler);
            }

            removeEventListeners() {
                if (this.mouseOverHandler) {
                    this.element.removeEventListener('mouseover', this.mouseOverHandler);
                }
                if (this.mouseOutHandler) {
                    this.element.removeEventListener('mouseout', this.mouseOutHandler);
                }
                if (this.clickHandler) {
                    this.element.removeEventListener('click', this.clickHandler);
                }
                if (this.contextMenuHandler) {
                    this.element.removeEventListener('contextmenu', this.contextMenuHandler);
                }
            }

            update(memberNumber, chatHistory, selectedSenderNum, showPlayerNumber = false) {
                // 更新成员编号
                this.memberNumber = memberNumber;

                // 更新头像
                this.avatarContainer = createOrUpdateAvatarContainer(memberNumber, this.avatarContainer);
                this.avatarContainer.style.flexShrink = '0';

                // 重新组装DOM结构
                this.element.innerHTML = '';
                this.element.appendChild(this.avatarContainer);
                this.element.appendChild(this.contentContainer);

                // 更新名称
                this.nameSpan.textContent = getCharacterName(memberNumber);

                // 清空并重新组装名称容器
                this.nameContainer.innerHTML = '';
                this.nameContainer.appendChild(this.nameSpan);

                // 新增：显示PlayerNumber（仅当showPlayerNumber为true）
                if (showPlayerNumber) {
                    if (!this.playerNumberSpan) {
                        this.playerNumberSpan = document.createElement('span');
                        this.playerNumberSpan.style.color = '#aaa';
                        this.playerNumberSpan.style.fontSize = '0.9em';
                        this.playerNumberSpan.style.marginLeft = '2px';
                    }
                    this.playerNumberSpan.textContent = "("+ memberNumber+")";
                    this.nameContainer.appendChild(this.playerNumberSpan);
                } else if (this.playerNumberSpan) {
                    this.playerNumberSpan.remove();
                }

                // 更新互动状态样式
                const canInteract = isBeepAvailable(memberNumber) ||
                      isWhisperAvailable(memberNumber);

                if (canInteract) {
                    this.nameSpan.style.color = '#000000';
                    this.nameSpan.style.fontWeight = 'bold';
                    this.nameSpan.classList.add('lc-conv-name--strong');
                } else {
                    this.nameSpan.style.color = '#888888';
                    this.nameSpan.style.fontWeight = 'normal';
                    this.nameSpan.classList.remove('lc-conv-name--strong');
                }

                // 更新消息时间和预览
                const hasMessages = chatHistory.messages && chatHistory.messages.length > 0;
                const lastMessage = hasMessages ? chatHistory.messages[chatHistory.messages.length - 1] : null;

                // 更新时间
                this.timeContainer.innerHTML = '';
                if (hasMessages && lastMessage.time) {
                    const messageDate = new Date(lastMessage.time);
                    const now = new Date();
                    let timeText = '';

                    if (messageDate.toDateString() === now.toDateString()) {
                        timeText = messageDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    } else {
                        timeText = messageDate.toLocaleDateString([], {month: 'numeric', day: 'numeric'});
                    }

                    this.timeContainer.textContent = timeText;
                    this.timeContainer.style.color = '#888888';
                    this.timeContainer.style.fontSize = '0.85em';
                    this.timeContainer.style.marginLeft = '8px';
                }

                // 更新预览
                this.previewContainer.textContent = hasMessages ? (lastMessage.content || '') : '';

                // 更新未读消息数
                const unreadCount = getUnreadCount(memberNumber);
                this.unreadIndicator.style.display = unreadCount > 0 ? 'flex' : 'none';
                if (unreadCount > 0) {
                    this.unreadIndicator.textContent = unreadCount > 99 ? '99+' : unreadCount.toString();
                }

                // 更新背景色
                const COLOR_SELECTED = '#e6f7ff';
                const COLOR_PINNED = '#fAfAfA';

                if (selectedSenderNum === memberNumber) {
                    this.element.style.backgroundColor = COLOR_SELECTED;
                } else if (chatHistory.pinnedTime && chatHistory.pinnedTime > 0) {
                    this.element.style.backgroundColor = COLOR_PINNED;
                } else {
                    this.element.style.backgroundColor = '';
                }

                // 组装DOM结构
                this.firstRow.innerHTML = '';
                this.firstRow.appendChild(this.nameContainer);
                if (hasMessages && lastMessage.time) {
                    this.firstRow.appendChild(this.timeContainer);
                }

                this.secondRow.innerHTML = '';
                this.secondRow.appendChild(this.previewContainer);
                if (unreadCount > 0) {
                    this.secondRow.appendChild(this.unreadIndicator);
                }

                this.contentContainer.innerHTML = '';
                this.contentContainer.appendChild(this.firstRow);
                this.contentContainer.appendChild(this.secondRow);
            }

            getContextMenuOptions(memberNumber) {
                const options = [];

                if (messageHistory[memberNumber]) {
                    if (messageHistory[memberNumber].pinnedTime) {
                        options.push({
                            text: I18nModule.getText('unpin'),
                            action: () => {
                                messageHistory[memberNumber].pinnedTime = 0;
                                messageDialog.updateSenderList();
                                LCDataStorage.updateSenderState(memberNumber, messageHistory[memberNumber]);
                            }
                        });
                    } else {
                        options.push({
                            text: I18nModule.getText('pin'),
                            action: () => {
                                if (!messageHistory[memberNumber]) {
                                    messageHistory[memberNumber] = { messages: [] };
                                }
                                messageHistory[memberNumber].pinnedTime = Date.now();
                                messageDialog.updateSenderList();
                                LCDataStorage.updateSenderState(memberNumber, messageHistory[memberNumber]);
                            }
                        });
                    }
                }

                options.push(
                    {
                        text: I18nModule.getText('hide'),
                        action: () => {
                            if (messageHistory[memberNumber]) {
                                messageHistory[memberNumber].isHidden = true;
                            } else {
                                messageHistory[memberNumber] = { messages: [], isHidden: true };
                            }

                            if (selectedSenderNum === memberNumber) {

                                changeSelectedSender(0);
                            }

                            messageDialog.updateSenderList();
                            LCDataStorage.updateSenderState(memberNumber, messageHistory[memberNumber]);
                        }
                    },
                    {
                        text: I18nModule.getText('delete_chat_history'),
                        action: () => {
                            if (confirm(I18nModule.getText('confirm_delete_chat', getCharacterName(memberNumber)))) {
                                delete messageHistory[memberNumber];

                                if (selectedSenderNum === memberNumber) {

                                    changeSelectedSender(0);
                                }

                                messageDialog.updateSenderList();
                                LCDataStorage.deletePlayerMessages(memberNumber);
                            }
                        }
                    }
                );

                return options;
            }
        }

        // SenderItem池
        class SenderItemPool {
            constructor() {
                this.pool = [];
                this.activeItems = new Map();
            }

            getItem(memberNumber) {
                let item = this.activeItems.get(memberNumber);

                if (!item) {
                    if (this.pool.length > 0) {
                        item = this.pool.pop();
                    } else {
                        item = new SenderItem();
                    }
                    this.activeItems.set(memberNumber, item);
                }

                return item;
            }

            releaseItem(memberNumber) {
                const item = this.activeItems.get(memberNumber);
                if (item) {
                    this.activeItems.delete(memberNumber);
                    this.pool.push(item);
                }
            }

            clear() {
                this.activeItems.clear();
                this.pool = [];
            }
        }


        // 角色小信息面板类
        class CharacterSmallInfoPanel {
            constructor() {
                this.element = document.createElement('div');
                this.element.style.width = '100%';
                this.element.style.boxSizing = 'border-box';
                this.element.style.overflow = 'hidden';
                this.element.style.textOverflow = 'ellipsis';
                this.element.style.whiteSpace = 'nowrap';
                this.element.style.minHeight = '50px';
                this.element.style.display = 'flex';
                this.element.style.padding = '8px';
                this.element.style.borderBottom = '1px solid #ddd';
                this.element.style.marginBottom = '10px';
                this.element.style.gap = '10px';
                this.element.style.alignItems = 'center';

                // 头像
                this.avatarContainer = null;
                // 信息容器
                this.infoContainer = document.createElement('div');
                this.infoContainer.style.display = 'flex';
                this.infoContainer.style.flexDirection = 'column';
                this.infoContainer.style.gap = '2px';
                this.infoContainer.style.width = '100%'; // 关键

                // 姓名
                this.nameRow = document.createElement('div');
                this.nameRow.style.display = 'flex';
                this.nameRow.style.alignItems = 'center';
                this.nameRow.style.width = '100%'; // 关键
                this.nameRow.style.boxSizing = 'border-box'; // 关键

                this.nameSpan = document.createElement('span');
                this.nameSpan.style.fontWeight = 'bold';
                this.nameSpan.style.fontSize = '14px';
                this.nameSpan.style.overflow = 'hidden';
                this.nameSpan.style.textOverflow = 'ellipsis';
                this.nameSpan.style.whiteSpace = 'nowrap';

                this.roomNameSpan = document.createElement('span');
                this.roomNameSpan.style.fontWeight = 'bold';
                this.roomNameSpan.style.fontSize = '14px';
                this.roomNameSpan.style.color = '#b0b0b0';
                this.roomNameSpan.style.whiteSpace = 'nowrap';
                this.roomNameSpan.style.overflow = 'hidden';
                this.roomNameSpan.style.textOverflow = 'ellipsis';
                this.roomNameSpan.style.marginLeft = 'auto';

                this.nameRow.appendChild(this.nameSpan);
                this.nameRow.appendChild(this.roomNameSpan);

                this.infoContainer.appendChild(this.nameRow);

                // 签名
                this.signatureSpan = document.createElement('span');
                this.signatureSpan.style.color = '#666';
                this.signatureSpan.style.fontSize = '12px';
                this.signatureSpan.style.maxWidth = '200px';
                this.signatureSpan.style.overflow = 'hidden';
                this.signatureSpan.style.textOverflow = 'ellipsis';
                this.signatureSpan.style.whiteSpace = 'nowrap';

                this.infoContainer.appendChild(this.signatureSpan);

                this.element.appendChild(this.infoContainer);
            }

            update(memberNumber) {
                this.element.id = `character-info-panel-${memberNumber}`;

                // 更新头像
                if (this.avatarContainer) {
                    this.element.removeChild(this.avatarContainer);
                }

                this.avatarContainer = createOrUpdateAvatarContainer(memberNumber, this.avatarContainer);
                this.avatarContainer.style.width = '36px';
                this.avatarContainer.style.height = '36px';
                this.avatarContainer.style.cursor = 'pointer';

                // 头像点击事件
                this.avatarContainer.onclick = (event) => {
                    event.stopPropagation();
                    messageDialog.showCharacterInfoPanel(memberNumber, event.clientX, event.clientY);
                };

                this.element.insertBefore(this.avatarContainer, this.infoContainer);

                // 更新姓名
                this.nameSpan.textContent = getCharacterName(memberNumber);

                // 在线状态
                const canWhisper = isWhisperAvailable(memberNumber);
                const canBeep = isBeepAvailable(memberNumber);
                const isSelf = memberNumber === Player.MemberNumber;
                if (!canWhisper && !canBeep && !isSelf) {
                    this.nameSpan.style.color = '#888';
                } else {
                    this.nameSpan.style.color = '';
                }

                // 签名
                const characterInfo = getCharacterInfo(memberNumber);
                this.signatureSpan.textContent = characterInfo.Signature || '';

                // 房间名逻辑
                const friendObj = onlineFriendsCache.find(f => f.MemberNumber === parseInt(memberNumber));
                this.roomNameSpan.textContent = friendObj ? getRoomLocationText(friendObj) : '';
            }
        }

        // 角色小信息面板池
        class CharacterSmallInfoPanelPool {
            constructor() {
                this.pool = [];
                this.activePanels = new Map();
            }

            getPanel(memberNumber) {
                let panel = this.activePanels.get(memberNumber);
                if (!panel) {
                    if (this.pool.length > 0) {
                        panel = this.pool.pop();
                    } else {
                        panel = new CharacterSmallInfoPanel();
                    }
                    this.activePanels.set(memberNumber, panel);
                }
                panel.update(memberNumber);
                return panel.element;
            }

            releasePanel(memberNumber) {
                const panel = this.activePanels.get(memberNumber);
                if (panel) {
                    this.activePanels.delete(memberNumber);
                    this.pool.push(panel);
                }
            }

            clear() {
                this.activePanels.clear();
                this.pool = [];
            }
        }


        class RoomItem {
            // 设定颜色
            static COLOR_DEFAULT = '#fafafa';
            static COLOR_HOVER = '#e6e6e6';
            static COLOR_SELECTED = '#f5f5f5';
            static COLOR_PINNED = '#fAfAfA';
            static COLOR_DISABLED = '';

            constructor() {
                this.lastFriends = null; // 记录上次的好友数组
                this.lastRoomName = null; // 记录上次的房间名
                this.IsCurrentRoom = false;
                this.CantJoin = false;

                this.element = document.createElement('div');
                // 这里可以设置样式，参考 createRoomList 里的 item
                this.element.style.cursor = 'pointer';
                this.element.style.transition = 'background-color 0.2s';
                this.element.style.border = '1px solid #ddd';
                this.element.style.borderRadius = '4px';
                this.element.style.padding = '8px';
                this.element.style.marginBottom = '4px';
                this.element.style.backgroundColor = '#fafafa';
                this.element.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';

                this.cantTouch = () => {
                    return (this.CantJoin || this.IsCurrentRoom);
                }

                // 悬浮效果
                this.element.addEventListener('click', (e) => {
                    if (this.cantTouch()) return;

                    // 如果是在房间里
                    if (ChatRoomData)
                    {
                        createMouseConfirmDialog({
                            content: I18nModule.getText('leave_room_first'),
                        }, e);
                    }
                    else
                    {
                        createMouseConfirmDialog({
                            content: I18nModule.getText('confirm_enter_room', this.lastRoomName),
                            onConfirm: () => {
                                MessageModule.toggleMessageDialog();
                                enterRoom(this.lastRoomName);
                            }
                        }, e);
                    }

                });

                this.element.addEventListener('mouseover', (e) => {
                    if (this.cantTouch()) return;
                    this.element.style.backgroundColor = RoomItem.COLOR_HOVER;
                });

                this.element.addEventListener('mouseleave', (e) => {
                    if (this.cantTouch()) return;
                    this.element.style.backgroundColor = RoomItem.COLOR_DEFAULT;
                });

                // 结构
                this.firstRow = document.createElement('div');
                this.firstRow.style.display = 'flex';
                this.firstRow.style.alignItems = 'center';

                this.memberCountSpan = document.createElement('span');
                this.memberCountSpan.style.color = '#888';
                this.memberCountSpan.style.fontSize = '13px';
                this.memberCountSpan.style.marginRight = '8px';
                this.memberCountSpan.style.width = '30px';

                this.nameSpan = document.createElement('span');
                this.nameSpan.style.fontWeight = 'bold';
                this.nameSpan.style.fontSize = '16px';
                this.nameSpan.style.marginRight = '8px';

                this.creatorSpan = document.createElement('span');
                this.creatorSpan.style.color = '#888';
                this.creatorSpan.style.fontSize = '13px';

                this.pinButton = document.createElement('button');
                this.pinButton.classList.add('lc-pin-btn');
                this.pinButton.style.marginLeft = 'auto';
                this.pinButton.style.background = '#f5f5f5';
                this.pinButton.style.color = '#888';
                this.pinButton.style.border = 'none';
                this.pinButton.style.borderRadius = '4px';
                this.pinButton.style.padding = '2px 8px';
                this.pinButton.style.cursor = 'pointer';
                this.pinButton.style.fontSize = '16px';
                this.pinButton.style.transition = 'background 0.2s, color 0.2s';

                this.firstRow.appendChild(this.memberCountSpan);
                this.firstRow.appendChild(this.nameSpan);
                this.firstRow.appendChild(this.creatorSpan);
                this.firstRow.appendChild(this.pinButton);

                this.descRow = document.createElement('div');
                this.descRow.style.color = '#666';
                this.descRow.style.fontSize = '13px';
                this.descRow.style.margin = '4px 0 0 0';
                this.descRow.style.wordBreak = 'break-all';

                this.friendsRow = document.createElement('div');
                this.friendsRow.style.display = 'flex';
                this.friendsRow.style.alignItems = 'center';
                this.friendsRow.style.gap = '4px';
                this.friendsRow.style.marginTop = '4px';

                this.element.appendChild(this.firstRow);
                this.element.appendChild(this.descRow);
                this.element.appendChild(this.friendsRow);


                // 只绑定一次 pinButton 事件
                this.pinButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const pinnedRooms = Player.ExtensionSettings?.LCData?.MessageSetting?.PinnedRooms || {};
                    if (pinnedRooms[this.lastRoomName] !== undefined) {
                        delete pinnedRooms[this.lastRoomName];
                    } else {
                        pinnedRooms[this.lastRoomName] = Date.now();
                    }
                    messageDialog.updateAddSenderLists();
                    ServerPlayerExtensionSettingsSync('LCData');
                });
            }

            /**
     * 更新房间项
     * @param {Object} room - 房间对象
     */
            update(room) {

                const pinnedRoomsDict = Player.ExtensionSettings?.LCData?.MessageSetting?.PinnedRooms || {};

                // 更新内容
                this.memberCountSpan.textContent = `${room.MemberCount}/${room.MemberLimit}`;
                this.nameSpan.textContent = room.Name;
                if (room.Locked) {
                    this.nameSpan.textContent = I18nModule.getText('locked_prefix') + room.Name;
                }
                if (room.Private) {
                    this.nameSpan.textContent = I18nModule.getText('private_prefix') + room.Name;
                }
                this.creatorSpan.textContent = `- ${room.Creator}`;
                this.descRow.textContent = room.Description || '';

                // 置顶按钮样式和title更新
                const isPinned = pinnedRoomsDict[room.Name] !== undefined;
                const cantJoin = !room.CanJoin || room.MemberCount >= room.MemberLimit;
                this.IsCurrentRoom = room.Name == ChatRoomData?.Name;

                this.pinButton.textContent = isPinned ? '★' : '☆';
                this.pinButton.classList.toggle('lc-pin-active', isPinned);
                this.pinButton.style.background = '';
                this.pinButton.style.color = '';
                this.pinButton.style.width = '30px';

                this.element.style.cursor = 'pointer';          // 恢复鼠标样式
                this.element.style.opacity = '1';
                // 禁用整个 RoomItem 的交互和悬浮效果
                if (this.IsCurrentRoom)
                {
                    this.element.style.backgroundColor = RoomItem.COLOR_SELECTED; // 恢复背景色
                }
                else if (cantJoin) {
                    this.element.style.backgroundColor = RoomItem.COLOR_DISABLED;        // 无背景色
                    this.element.style.cursor = 'not-allowed';      // 鼠标为禁止
                    this.element.style.opacity = '0.6';             // 降低不活跃感
                } else {
                    if (this.element.matches(':hover')) {
                        this.element.style.backgroundColor = RoomItem.COLOR_HOVER;
                    } else {
                        this.element.style.backgroundColor = RoomItem.COLOR_DEFAULT;
                    }
                }

                this.CantJoin = cantJoin;
                //   置顶房间的边框
                this.element.style.border = isPinned? '1px solid #2196f3':'1px solid #ddd';
                // 记录当前房间名，供事件用
                this.lastRoomName = room.Name;

                // 只有好友数组变化时才重建头像
                const friendsKey = Array.isArray(room.Friends) ? room.Friends.map(f => f.MemberNumber).join(',') : '';
                if (this.lastFriends !== friendsKey) {
                    this.friendsRow.innerHTML = '';
                    if (Array.isArray(room.Friends) && room.Friends.length > 0) {
                        room.Friends.forEach(friend => {
                            const avatar = createOrUpdateAvatarContainer(friend.MemberNumber);
                            avatar.style.width = '28px';
                            avatar.style.height = '28px';
                            avatar.style.borderRadius = '50%';
                            avatar.style.cursor = 'pointer';
                            avatar.title = friend.MemberName || friend.MemberNumber;
                            avatar.onclick = (event) => {
                                event.stopPropagation();
                                messageDialog.showCharacterInfoPanel(friend.MemberNumber, event.clientX, event.clientY);
                            };
                            this.friendsRow.appendChild(avatar);
                        });
                    }
                    this.lastFriends = friendsKey;
                }
            }
        }

        // 房间项对象池
        class RoomItemPool {
            constructor() {
                this.pool = [];
                this.activeItems = [];
            }

            getItem(room) {
                let item;
                if (this.pool.length > 0) {
                    item = this.pool.pop();
                } else {
                    item = new RoomItem();
                }
                item.update(room);
                this.activeItems.push(item);
                return item.element;
            }

            releaseAll() {
                while (this.activeItems.length > 0) {
                    const item = this.activeItems.pop();
                    this.pool.push(item);
                }
            }

            clear() {
                this.pool = [];
                this.activeItems = [];
            }
        }

        // 创建内存池实例
        const characterSmallInfoPanelPool = new CharacterSmallInfoPanelPool();
        const roomItemPool = new RoomItemPool();


        // 创建全局SenderItem池实例
        const senderItemPool = new SenderItemPool();

        function createOrUpdateAvatarContainer(memberNumber, existingAvatarContainer = null) {
            // 获取头像URL
            const avatarUrl = getCharacterInfo(memberNumber).Avatar;

            // 如果存在现有的avatarContainer且URL没有变化，直接返回
            if (existingAvatarContainer && existingAvatarContainer.Url === avatarUrl) {
                return existingAvatarContainer;
            }

            // 创建新的avatarContainer
            const avatarContainer = document.createElement('div');
            avatarContainer.className = 'lc-avatar';
            avatarContainer.style.width = '36px';
            avatarContainer.style.height = '36px';
            avatarContainer.style.borderRadius = '50%';
            avatarContainer.style.overflow = 'hidden';
            avatarContainer.style.flexShrink = '0';
            avatarContainer.style.backgroundColor = '#f0f0f0';
            avatarContainer.style.display = 'flex';
            avatarContainer.style.alignItems = 'center';
            avatarContainer.style.justifyContent = 'center';
            avatarContainer.style.fontSize = '14px';
            avatarContainer.style.color = '#666';

            if (avatarUrl && isValidImageUrl(avatarUrl)) {
                // 使用缓存的img元素
                avatarContainer.appendChild(window.ImageCache.getImg(avatarUrl));
                avatarContainer.Url = avatarUrl;
            } else {
                // 如果没有头像，显示名称缩写
                const name = getCharacterName(memberNumber);
                let displayText = '';

                // 检查是否包含中文字符
                if (/[\u4e00-\u9fa5]/.test(name)) {
                    // 中文：最多显示2个字
                    displayText = name.match(/[\u4e00-\u9fa5]/g)?.slice(0, 2).join('') || name.charAt(0);
                } else {
                    // 英文：最多显示4个字母
                    displayText = name.slice(0, 4);
                }

                avatarContainer.textContent = displayText;
                avatarContainer.Url = null; // 标记没有URL
            }

            return avatarContainer;
        }
        // 切换选中的发送者
        function changeSelectedSender(memberNumber)
        {
            sendTypingStatus(false);
            selectedSenderNum = memberNumber;

            if (memberNumber) MessageModule.switchToRightPage();
            if (memberNumber && MessageModule.isPageMode) {
                const pageToggle = document.querySelector('button.lc-head-btn[data-lc-patched="pencil-v3"]');
                if (pageToggle) pageToggle.classList.add('lc-head-btn--active');
            }

            messageDialog.updateSenderList();
            messageDialog.updateMessageContent();
            messageDialog.hideAddSenderInterface();
            loadSenderInputState(memberNumber);

            // 右侧消息区切换过渡动画（重触发）
            const msgContent = document.getElementById('LC-Message-RightMessageContainer');
            if (msgContent) {
                msgContent.classList.remove('lc-msg-switch');
                void msgContent.offsetWidth; // 强制 reflow 重触发动画
                msgContent.classList.add('lc-msg-switch');
            }
        }

        // 以 BC 2000x1000 逻辑画布为基准，将桌面面板维持在 900x750 逻辑尺寸。
        // 同时使用宽、高比例的较小值，避免非 2:1 视窗或浏览器缩放把高度撑出画面。
        function applyResponsiveDialogSize(dialog, force) {
            if (!dialog || (!force && dialog.dataset.lcUserResized === '1')) return;
            if (CommonIsMobile || window.innerWidth < 640) {
                dialog.style.width = '98%';
                dialog.style.height = '98%';
                dialog.style.maxWidth = 'calc(100vw - 12px)';
                dialog.style.maxHeight = 'calc(100vh - 12px)';
                return;
            }
            const canvas = document.getElementById('MainCanvas') || document.querySelector('canvas');
            const canvasRect = canvas ? canvas.getBoundingClientRect() : null;
            const availableWidth = canvasRect && canvasRect.width > 0 ? canvasRect.width : window.innerWidth;
            const availableHeight = canvasRect && canvasRect.height > 0 ? canvasRect.height : window.innerHeight;
            const scale = Math.max(0.25, Math.min(availableWidth / 2000, availableHeight / 1000));
            const width = Math.min(Math.round(900 * scale), Math.max(300, window.innerWidth - 24));
            const height = Math.min(Math.round(750 * scale), Math.max(200, window.innerHeight - 24));
            dialog.style.width = width + 'px';
            dialog.style.height = height + 'px';
            dialog.style.maxWidth = 'calc(100vw - 24px)';
            dialog.style.maxHeight = 'calc(100vh - 24px)';
        }

        // 创建对话框
        function createMessageDialog() {
            if (messageDialog) {
                document.body.removeChild(messageDialog);
            }

            // 创建对话框容器
            messageDialog = document.createElement('div');
            messageDialog.style.position = 'fixed';
            messageDialog.style.backgroundColor = 'white';
            messageDialog.style.border = '1px solid #888';
            messageDialog.style.borderRadius = '5px';
            messageDialog.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            messageDialog.style.zIndex = '10000';
            messageDialog.style.display = 'flex';
            messageDialog.style.flexDirection = 'column';
            messageDialog.style.overflow = 'hidden';

            applyResponsiveDialogSize(messageDialog, true);

            // 设置初始位置
            resetDialogPosition(messageDialog);

            // 添加缩放边缘
            addResizeHandles(messageDialog);

            // 创建标题栏
            const titleBar = document.createElement('div');
            titleBar.style.padding = '4px 10px'; // 减小上下padding
            titleBar.style.backgroundColor = '#f0f0f0';
            titleBar.style.borderBottom = '1px solid #ddd';
            titleBar.style.borderTopLeftRadius = '5px';
            titleBar.style.borderTopRightRadius = '5px';
            titleBar.style.cursor = 'move';
            titleBar.style.display = 'flex';
            titleBar.style.justifyContent = 'space-between';
            titleBar.style.alignItems = 'center';
            titleBar.style.flexShrink = '0';
            titleBar.style.minHeight = '24px'; // 设置最小高度

            // 切换单双页模式按钮
            const pageButton = document.createElement('button');
            pageButton.textContent = '📄'; // 初始状态
            pageButton.title = '切换单双页模式';
            pageButton.style.background = '#f0f0f0';
            pageButton.style.border = '1px solid #ddd';
            pageButton.style.borderRadius = '4px';
            pageButton.style.cursor = 'pointer';
            pageButton.style.fontSize = '16px';
            pageButton.style.fontWeight = 'bold';
            pageButton.style.color = '#555';
            pageButton.style.width = '30px';
            pageButton.style.height = '30px';
            pageButton.style.display = 'flex';
            pageButton.style.alignItems = 'center';
            pageButton.style.justifyContent = 'center';
            pageButton.style.padding = '0';
            pageButton.style.marginLeft = '0';
            pageButton.style.marginRight = '0';

            // 返回发送者列表按钮
            const backToSenderButton = document.createElement('button');
            backToSenderButton.textContent = '◀️';
            backToSenderButton.title = '返回发送者列表';
            backToSenderButton.style.background = '#f0f0f0';
            backToSenderButton.style.border = '1px solid #ddd';
            backToSenderButton.style.borderRadius = '4px';
            backToSenderButton.style.cursor = 'pointer';
            backToSenderButton.style.fontSize = '16px';
            backToSenderButton.style.fontWeight = 'bold';
            backToSenderButton.style.color = '#555';
            backToSenderButton.style.width = '30px';
            backToSenderButton.style.height = '30px';
            backToSenderButton.style.display = 'none'; // 初始隐藏
            backToSenderButton.style.alignItems = 'center';
            backToSenderButton.style.justifyContent = 'center';
            backToSenderButton.style.padding = '0';
            backToSenderButton.style.marginLeft = '0';
            backToSenderButton.style.marginRight = '0';

            // 悬停效果
            pageButton.addEventListener('mouseover', function() {
                this.style.background = '#e0e0e0';
                this.style.color = '#1890ff';
            });
            pageButton.addEventListener('mouseout', function() {
                this.style.background = '#f0f0f0';
                this.style.color = '#555';
            });

            backToSenderButton.addEventListener('mouseover', function() {
                this.style.background = '#e0e0e0';
                this.style.color = '#1890ff';
            });
            backToSenderButton.addEventListener('mouseout', function() {
                this.style.background = '#f0f0f0';
                this.style.color = '#555';
            });

            // 分页状态变量（MessageModule内）
            MessageModule.isPageMode = CommonIsMobile; // 移动端默认单页模式
            MessageModule.isRightPageActive = false; // 右侧页面是否激活
            MessageModule.pageButton = pageButton; // 保存按钮引用
            MessageModule.backToSenderButton = backToSenderButton; // 保存返回发送者按钮引用

            // 切换到右侧页面的共用函数
            function switchToRightPage() {
                const senderList = document.getElementById('LC-Message-SenderList');
                const rightContainer = document.getElementById('LC-Message-RightContainer');
                if (MessageModule.isPageMode) {
                    MessageModule.isRightPageActive = true;

                    // 显示返回发送者按钮
                    MessageModule.backToSenderButton.style.display = 'flex';

                    if (senderList && rightContainer) {
                        senderList.style.width = '0';
                        senderList.style.minWidth = '0';
                        rightContainer.style.width = '100%';
                        rightContainer.style.display = 'flex';
                    }
                } else if (rightContainer
                           && (rightContainer.dataset.lcLayout === 'contacts'
                               || rightContainer.dataset.lcCollapsed === '1')) {
                    setDesktopPanelLayout('chat');
                }
            }

            // 切换到发送者列表页面的共用函数
            function switchToSenderListPage(preserveSelection) {
                if (MessageModule.isPageMode) {
                    MessageModule.isRightPageActive = false;
                    if (!preserveSelection) selectedSenderNum = 0;
                    // 隐藏返回发送者按钮
                    MessageModule.backToSenderButton.style.display = 'none';

                    const senderList = document.getElementById('LC-Message-SenderList');
                    const rightContainer = document.getElementById('LC-Message-RightContainer');

                    if (senderList && rightContainer) {
                        senderList.style.width = '100%';
                        senderList.style.minWidth = '100%';
                        rightContainer.style.width = '0';
                        rightContainer.style.display = 'none';
                    }
                    messageDialog.updateSenderList();
                }
            }

            // 退出分页模式的共用函数
            function exitPageMode() {
                MessageModule.isPageMode = false;
                MessageModule.isRightPageActive = false;
                messageDialog.updateMessageContent();
                // 隐藏返回发送者按钮
                MessageModule.backToSenderButton.style.display = 'none';

                const senderList = document.getElementById('LC-Message-SenderList');
                const rightContainer = document.getElementById('LC-Message-RightContainer');

                if (senderList && rightContainer) {
                    senderList.style.width = '220px';
                    senderList.style.minWidth = '220px';
                    rightContainer.style.width = 'auto';
                    rightContainer.style.display = 'flex';
                }
            }

            // 将函数设为MessageModule可访问
            MessageModule.switchToRightPage = switchToRightPage;
            MessageModule.switchToSenderListPage = switchToSenderListPage;
            MessageModule.exitPageMode = exitPageMode;

            // 切换单双页模式按钮点击事件
            pageButton.addEventListener('click', function(e) {
                e.stopPropagation();

                if (MessageModule.isPageMode) {
                    // 当前是分页模式，切换到双页模式
                    MessageModule.exitPageMode();
                } else {
                    // 当前是双页模式，切换到分页模式
                    MessageModule.isPageMode = true;
                    MessageModule.isRightPageActive = false;

                    // 切换到发送者列表页面
                    MessageModule.switchToSenderListPage();
                }
            });

            // 返回发送者列表按钮点击事件
            backToSenderButton.addEventListener('click', function(e) {
                e.stopPropagation();

                // 从右侧页面返回发送者列表页面
                MessageModule.switchToSenderListPage();
            });

            // 设置按钮
            const settingsButton = document.createElement('button');
            settingsButton.textContent = '⚙'; // 齿轮符号
            settingsButton.title = '设置';
            settingsButton.style.background = '#f0f0f0';
            settingsButton.style.border = '1px solid #ddd';
            settingsButton.style.borderRadius = '4px';
            settingsButton.style.cursor = 'pointer';
            settingsButton.style.fontSize = '18px';
            settingsButton.style.fontWeight = 'bold';
            settingsButton.style.color = '#555';
            settingsButton.style.width = '30px';
            settingsButton.style.height = '30px';
            settingsButton.style.display = 'flex';
            settingsButton.style.alignItems = 'center';
            settingsButton.style.justifyContent = 'center';
            settingsButton.style.padding = '0';
            settingsButton.style.marginLeft = '0';
            settingsButton.style.marginRight = '0';

            // 悬停效果
            settingsButton.addEventListener('mouseover', function() {
                this.style.background = '#e0e0e0';
                this.style.color = '#1890ff';
            });
            settingsButton.addEventListener('mouseout', function() {
                this.style.background = '#f0f0f0';
                this.style.color = '#555';
            });

            // 点击弹出设置界面
            settingsButton.addEventListener('click', function(e) {
                e.stopPropagation();
                showLianChatSettingsDialog();
            });

            // 关闭按钮
            const closeButton = document.createElement('button');
            closeButton.textContent = '×'; // 使用更清晰的乘号符号
            closeButton.style.background = '#f0f0f0';
            closeButton.style.border = '1px solid #ddd';
            closeButton.style.borderRadius = '4px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.fontSize = '18px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.color = '#555';
            closeButton.style.width = '30px';
            closeButton.style.height = '30px';
            closeButton.style.display = 'flex';
            closeButton.style.alignItems = 'center';
            closeButton.style.justifyContent = 'center';
            closeButton.style.padding = '0';
            closeButton.style.marginLeft = '0';

            // 添加悬停效果
            closeButton.addEventListener('mouseover', function() {
                this.style.background = '#e0e0e0';
                this.style.color = '#ff4d4f';
            });

            closeButton.addEventListener('mouseout', function() {
                this.style.background = '#f0f0f0';
                this.style.color = '#555';
            });

            closeButton.addEventListener('click', function(e) {
                // 阻止事件冒泡，防止触发标题栏的mousedown事件
                e.stopPropagation();
                hideMessageDialog();
            });

            // 创建左侧容器（放置返回发送者列表按钮）
            const leftButtons = document.createElement('div');
            leftButtons.style.display = 'flex';
            leftButtons.style.alignItems = 'center';
            leftButtons.style.gap = '5px';

            // 创建右侧容器（放置切换按钮、设置和关闭按钮）
            const rightButtons = document.createElement('div');
            rightButtons.style.display = 'flex';
            rightButtons.style.alignItems = 'center';
            rightButtons.style.gap = '10px';

            // 将按钮添加到对应容器
            leftButtons.appendChild(backToSenderButton);
            rightButtons.appendChild(pageButton);
            rightButtons.appendChild(settingsButton);
            rightButtons.appendChild(closeButton);

            // 将容器添加到标题栏
            titleBar.appendChild(leftButtons);
            titleBar.appendChild(rightButtons);

            // 内容区域容器
            const contentContainer = document.createElement('div');
            contentContainer.style.display = 'flex';
            contentContainer.style.flexGrow = '1';
            contentContainer.style.overflow = 'hidden';

            // 左侧发送者列表
            const senderList = document.createElement('div');
            senderList.id = 'LC-Message-SenderList';
            senderList.style.width = '220px';
            senderList.style.minWidth = '220px'; // 添加最小宽度
            senderList.style.flexShrink = '0'; // 防止被挤压
            senderList.style.borderRight = '1px solid #ddd';
            senderList.style.overflowX = 'hidden'; // 防止横向滚动
            senderList.style.height = '100%';
            senderList.style.display = 'flex'; // 添加flex布局
            senderList.style.flexDirection = 'column'; // 设置垂直方向

            // 创建固定区域容器(个人信息和搜索框)
            const fixedContainer = document.createElement('div');
            fixedContainer.style.flexShrink = '0'; // 防止压缩
            fixedContainer.style.padding = '2px';

            // 创建可滚动区域容器
            const scrollableContainer = document.createElement('div');
            scrollableContainer.style.flexGrow = '1';
            scrollableContainer.style.overflowY = 'auto';
            scrollableContainer.style.overflowX = 'hidden';
            scrollableContainer.style.padding = '0 10px';
            makeDragScrollable(scrollableContainer);

            // 添加搜索框容器
            const searchContainer = document.createElement('div');
            searchContainer.style.padding = '0 0 10px 0';
            searchContainer.style.borderBottom = '1px solid #ddd';
            searchContainer.style.marginBottom = '10px';
            searchContainer.style.display = 'flex';
            searchContainer.style.alignItems = 'center';
            searchContainer.style.gap = '8px';

            // 创建搜索框
            const searchInput = document.createElement('input');
            searchInput.id = 'LC-Message-SenderSearchInput'; // 添加唯一ID
            searchInput.type = 'text';
            searchInput.placeholder = I18nModule.getText('search_members');
            searchInput.style.width = '100%';
            searchInput.style.padding = '6px';
            searchInput.style.border = '1px solid #ddd';
            searchInput.style.borderRadius = '4px';
            searchInput.style.boxSizing = 'border-box';

            // 添加搜索事件监听
            searchInput.addEventListener('input', function() {
                updateSenderList();
            });

            // 添加"在线人数"按钮（重新设计：SVG 人像图标 + 数字，lc-online-btn 类）
            const friendButton = document.createElement('button');
            friendButton.className = 'lc-online-btn';
            friendButton.type = 'button';
            friendButton.style.display = 'flex';
            friendButton.style.alignItems = 'center';
            friendButton.style.justifyContent = 'center';
            friendButton.style.gap = '3px';

            // SVG 人像图标（替换 👤 emoji）
            const iconSpan = document.createElement('span');
            iconSpan.className = 'lc-ico lc-ico--md';
            iconSpan.innerHTML = (typeof LC_ICONS !== 'undefined' && LC_ICONS.person) ? LC_ICONS.person : '👤';

            const countSpan = document.createElement('span');
            countSpan.className = 'lc-online-count';

            friendButton.appendChild(iconSpan);
            friendButton.appendChild(countSpan);

            // 更新在线好友数量显示
            function updateFriendButtonCount() {
                const onlineFriendsCount = onlineFriendsCache ? onlineFriendsCache.length : 0;
                countSpan.textContent = onlineFriendsCount.toString();
            }

            // 初始化数量显示
            updateFriendButtonCount();

            // 添加点击事件
            friendButton.addEventListener('click', function() {
                MessageModule.switchToRightPage();
                showAddSenderInterface();
            });

            // 将搜索框和加号按钮添加到容器
            searchContainer.appendChild(searchInput);
            searchContainer.appendChild(friendButton);

            fixedContainer.appendChild(createCharacterSmallInfoPanel(Player.MemberNumber));
            fixedContainer.appendChild(searchContainer);
            // 将固定区域和可滚动区域添加到senderList
            senderList.appendChild(fixedContainer);
            senderList.appendChild(scrollableContainer);


            // 右侧消息内容和输入框容器
            const rightContainer = document.createElement('div');
            rightContainer.id = 'LC-Message-RightContainer';
            rightContainer.style.position = 'relative';
            rightContainer.style.flex = '1 1 0%';
            rightContainer.style.display = 'flex';
            rightContainer.style.flexDirection = 'column';
            rightContainer.style.height = '100%';

            // 创建 rightMessageContainer（原有消息内容区）
            const rightMessageContainer = document.createElement('div');
            rightMessageContainer.style.width = '100%';
            rightMessageContainer.style.height = '100%';
            rightMessageContainer.style.display = 'flex';
            rightMessageContainer.style.flexDirection = 'column';
            rightMessageContainer.id = 'LC-Message-RightMessageContainer';

            // 创建 addSenderContainer（添加发送者界面）
            const addSenderContainer = document.createElement('div');
            addSenderContainer.style.width = '100%';
            addSenderContainer.style.height = '100%';
            addSenderContainer.style.display = 'none'; // 默认隐藏
            addSenderContainer.style.flexDirection = 'column';
            addSenderContainer.id = 'LC-Message-AddSenderContainer';

            // 将两个容器都加入 rightContainer
            rightContainer.appendChild(rightMessageContainer);
            rightContainer.appendChild(addSenderContainer);

            // 用 rightContainer 替换原有的 rightMessageContainer
            contentContainer.appendChild(rightContainer);


            // 消息标题区域
            const headerContainer = document.createElement('div');
            headerContainer.className = 'lc-chat-header';
            headerContainer.style.backgroundColor = 'var(--card)';
            headerContainer.style.color = 'var(--ink)';
            headerContainer.style.padding = '10px 15px';
            headerContainer.style.borderBottom = '1px solid var(--seam)';

            const header = document.createElement('h3');
            header.style.margin = '0';

            headerContainer.appendChild(header);

            // 消息内容区域
            const messageContent = document.createElement('div');
            messageContent.className = 'lc-message-log';
            messageContent.style.flexGrow = '1';
            messageContent.style.padding = '15px';
            messageContent.style.overflowY = 'auto';
            makeDragScrollable(messageContent, { allowTextSelect: true });

            // 创建工具按钮栏
            const toolbarContainer = createToolbar();

            // 输入区域
            const inputContainer = document.createElement('div');
            inputContainer.style.borderTop = '1px solid #ddd';
            inputContainer.style.padding = '10px';
            inputContainer.style.display = 'flex';
            inputContainer.style.flexDirection = 'column'; // 改为纵向排列
            inputContainer.style.gap = '8px'; // 添加间距
            inputContainer.style.justifyContent = 'flex-end'; // 让输入框底部对齐

            // 输入框
            const inputField = document.createElement('textarea'); // 使用 textarea 替代 input
            inputField.placeholder = I18nModule.getText('input_placeholder');
            inputField.style.width = '100%'; // 宽度占满
            inputField.style.padding = '8px';
            inputField.style.border = '1px solid #ddd';
            inputField.style.borderRadius = '4px';
            inputField.style.boxSizing = 'border-box'; // 确保 padding 不会增加总宽度
            inputField.style.minHeight = '36px'; // 设置最小高度
            inputField.rows = 1; // 默认显示 1 行
            inputField.id = 'LC-Message-InputField'; // 添加 ID 以便在外部函数中引用
            inputField.style.verticalAlign = 'bottom'; // 可选，进一步保证底部对齐
            inputField.style.overflowY = 'hidden'; // 隐藏滚动条，体验更好
            inputField.style.maxHeight = '200px';

            // 添加焦点和输入事件处理
            const TYPING_DELAY = 5000; // 5秒延迟

            // 处理输入状态变化
            function handleTypingChange() {
                const isTyping = inputField.value.trim().length > 0;

                inputField.style.height = 'auto'; // 先重置高度
                inputField.style.height = inputField.scrollHeight + 'px'; // 再设置为内容高度

                // 判断是否超出最大高度，决定是否显示滚动条
                if (inputField.scrollHeight > parseInt(inputField.style.maxHeight)) {
                    inputField.style.overflowY = 'auto';
                } else {
                    inputField.style.overflowY = 'hidden';
                }

                let currentText = "";

                if (isTyping && !typingTimer) {
                    // 如果正在输入，立即发送一次状态
                    sendTypingStatus(true);

                    // 设置定时器定期发送状态
                    typingTimer = setInterval(() => {
                        // 检查文本是否发生变化
                        if (inputField.value === currentText) {
                            sendTypingStatus(false);
                        } else {
                            currentText = inputField.value;
                            sendTypingStatus(true);
                        }
                    }, TYPING_DELAY);
                } else if (!isTyping && typingTimer) {
                    // 如果结束输入，发送结束状态
                    sendTypingStatus(false);
                }
            }

            inputField.addEventListener('blur', () => {
                if (typingTimer) {
                    clearInterval(typingTimer);
                    typingTimer = null;
                }
                sendTypingStatus(false);
            });

            inputField.addEventListener('input', handleTypingChange);

            // 按钮容器
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'space-between'; // 修改为两端对齐
            buttonContainer.style.alignItems = 'center'; // 垂直居中对齐

            // 消息类型选择器
            const messageTypeSelector = document.createElement('div');
            messageTypeSelector.className = 'lc-message-type-selector';
            messageTypeSelector.style.display = 'flex';
            messageTypeSelector.style.alignItems = 'center';

            // 创建单选按钮组
            const whisperLabel = document.createElement('label');
            whisperLabel.style.display = 'flex';
            whisperLabel.style.alignItems = 'center';
            whisperLabel.style.marginRight = '10px';
            whisperLabel.style.cursor = 'pointer';

            const whisperRadio = document.createElement('input');
            whisperRadio.type = 'radio';
            whisperRadio.name = 'messageType';
            whisperRadio.value = 'Whisper';
            whisperRadio.style.marginRight = '5px';
            whisperRadio.checked = true; // 默认选中悄悄话

            const whisperText = document.createTextNode(I18nModule.getText('whisper'));
            whisperLabel.appendChild(whisperRadio);
            whisperLabel.appendChild(whisperText);

            const beepLabel = document.createElement('label');
            beepLabel.style.display = 'flex';
            beepLabel.style.alignItems = 'center';
            beepLabel.style.cursor = 'pointer';

            const beepRadio = document.createElement('input');
            beepRadio.type = 'radio';
            beepRadio.name = 'messageType';
            beepRadio.value = 'Beep';
            beepRadio.style.marginRight = '5px';

            const beepText = document.createTextNode(I18nModule.getText('beep'));
            beepLabel.appendChild(beepRadio);
            beepLabel.appendChild(beepText);

            messageTypeSelector.appendChild(whisperLabel);
            messageTypeSelector.appendChild(beepLabel);

            // 发送按钮
            const sendButton = document.createElement('button');
            sendButton.textContent = I18nModule.getText('send');
            sendButton.style.padding = '8px 16px';
            sendButton.style.backgroundColor = '#4CAF50';
            sendButton.style.color = 'white';
            sendButton.style.border = 'none';
            sendButton.style.borderRadius = '4px';
            sendButton.style.cursor = 'pointer';
            sendButton.style.marginLeft = '8px';
            sendButton.id = 'messageSendButton'; // 添加ID以便在外部函数中引用

            // 组装按钮容器
            buttonContainer.appendChild(messageTypeSelector);
            buttonContainer.appendChild(sendButton);

            // 组装输入区域
            inputContainer.appendChild(inputField);
            inputContainer.appendChild(buttonContainer);

            // 发送消息的函数
            function sendMessage(customMessage) {
                if (!selectedSenderNum) return false;

                // 检查发送者是否在线或在房间中
                const isOnline = isBeepAvailable(selectedSenderNum);
                const isInRoom = isWhisperAvailable(selectedSenderNum);

                if (!isOnline && !isInRoom) {
                    return false;
                }

                // 确定要发送的消息内容
                let message = '';
                if (customMessage !== undefined) {
                    // 如果提供了自定义消息，使用它
                    message = customMessage.trim();
                } else {
                    // 否则使用输入框中的内容
                    if (!inputField.value.trim()) return false;
                    message = inputField.value.trim();
                }

                // 如果消息以*开头，在*后插入角色名称
                if (message.startsWith('*')) {
                    if (message.startsWith('**'))
                    {
                        message = message.substring(1);
                    }
                    else
                    {
                        // 获取当前选中角色的名称
                        const characterName = getCharacterName(Player.MemberNumber);
                        // 在*后插入角色名称
                        message = `*${characterName} ${message.substring(1)}`;
                    }

                    if (!message.trimEnd().endsWith('*')) {
                        message += `*`;
                    }
                }


                let success = false;

                // 获取用户选择的消息类型
                const selectedType = document.querySelector('input[name="messageType"]:checked').value;

                // 根据用户选择的类型发送消息
                if (selectedType === 'Beep') {
                    success = sendBeep(selectedSenderNum, message);
                } else {
                    success = sendWhisper(selectedSenderNum, message);
                }

                if (success) {
                    // 只有在使用输入框内容时才清空输入框
                    if (customMessage === undefined) {
                        inputField.value = '';
                        inputField.style.height = 'auto'; // 先重置高度
                        inputField.style.height = inputField.scrollHeight + 'px'; // 再设置为内容高度

                        // 更新保存的输入状态
                        if (messageHistory[selectedSenderNum]) {
                            if (messageHistory[selectedSenderNum].inputState) {
                                messageHistory[selectedSenderNum].inputState.text = '';
                            }
                        }
                        LCDataStorage.updateSenderState(selectedSenderNum, messageHistory[selectedSenderNum]);
                    }
                    // 消息会由统一的 addMessageToHistory 路径增量加入画面；
                    // 此处不再重建整个 lc-message-log，避免发送时闪烁与滚动跳动。
                    // 只有在使用输入框内容时才聚焦输入框
                    if (customMessage === undefined) {
                        inputField.focus();
                    }
                }

                return success;
            }

            // 绑定发送按钮点击事件
            sendButton.addEventListener('click', function() {
                sendMessage();
            });

            // 绑定输入框回车事件
            inputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && e.target === inputField && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            // 更新发送者列表
            function updateSenderList() {
                // 清除可滚动区域的内容
                scrollableContainer.innerHTML = '';

                // 获取搜索关键词
                const searchKeyword = searchInput.value.toLowerCase();

                if (Object.keys(messageHistory).length === 0) {
                    const noSenders = document.createElement('div');
                    noSenders.textContent = I18nModule.getText('no_message_history');
                    noSenders.style.color = '#888';
                    noSenders.style.padding = '10px 0';
                    scrollableContainer.appendChild(noSenders);
                    return;
                }

                // 创建一个数组，包含所有发送者及其最新消息时间
                const senders = [];
                for (const memberNumber in messageHistory) {
                    // 跳过隐藏的发送者
                    if (messageHistory[memberNumber]?.isHidden || memberNumber == Player.MemberNumber) {
                        continue;
                    }

                    const chatHistory = messageHistory[memberNumber] || { messages: [], isHidden: false };
                    senders.push({
                        memberNumber: memberNumber,
                        orderTimeStamp: chatHistory.orderTimeStamp || 0,
                        pinnedTime: chatHistory.pinnedTime || 0
                    });
                }

                // 按最新消息时间排序，最新的在前面
                senders.sort((a, b) => {
                    // 优先按置顶时间排序
                    if (a.pinnedTime !== b.pinnedTime) {
                        return b.pinnedTime - a.pinnedTime;
                    }
                    // 如果置顶时间相同，则按排序时间排序
                    return b.orderTimeStamp - a.orderTimeStamp;
                });

                // 统计名字出现次数，找出重名
                const nameCount = {};
                const memberNumbers = [];
                for (const sender of senders) {
                    const memberNumber = parseInt(sender.memberNumber);
                    // 搜索匹配逻辑（与下方一致）
                    let isMatch = false;
                    if (!searchKeyword) {
                        isMatch = true;
                    } else {
                        if (memberNumber.toString().includes(searchKeyword)) {
                            isMatch = true;
                        } else {
                            const senderName = getCharacterName(memberNumber).toLowerCase();
                            if (senderName.includes(searchKeyword)) {
                                isMatch = true;
                            } else {
                                const cachedInfo = getAndUpdateCharacterCache(memberNumber).cache;
                                if (cachedInfo) {
                                    if (cachedInfo.Name && cachedInfo.Name.toLowerCase().includes(searchKeyword)) {
                                        isMatch = true;
                                    } else if (cachedInfo.Nickname && cachedInfo.Nickname.toLowerCase().includes(searchKeyword)) {
                                        isMatch = true;
                                    }
                                }
                            }
                        }
                    }
                    if (!isMatch) continue;
                    const name = getCharacterName(memberNumber);
                    nameCount[name] = (nameCount[name] || 0) + 1;
                    memberNumbers.push(memberNumber);
                }
                const duplicatedNames = new Set();
                for (const [name, count] of Object.entries(nameCount)) {
                    if (count > 1) duplicatedNames.add(name);
                }
                // 创建排序后的发送者列表
                let hasVisibleSenders = false;
                for (const sender of senders) {
                    const memberNumber = parseInt(sender.memberNumber);
                    // 搜索匹配逻辑
                    let isMatch = false;
                    if (!searchKeyword) {
                        isMatch = true;
                    } else {
                        if (memberNumber.toString().includes(searchKeyword)) {
                            isMatch = true;
                        } else {
                            const senderName = getCharacterName(memberNumber).toLowerCase();
                            if (senderName.includes(searchKeyword)) {
                                isMatch = true;
                            } else {
                                const cachedInfo = getAndUpdateCharacterCache(memberNumber).cache;
                                if (cachedInfo) {
                                    if (cachedInfo.Name && cachedInfo.Name.toLowerCase().includes(searchKeyword)) {
                                        isMatch = true;
                                    } else if (cachedInfo.Nickname && cachedInfo.Nickname.toLowerCase().includes(searchKeyword)) {
                                        isMatch = true;
                                    }
                                }
                            }
                        }
                    }
                    if (!isMatch) {
                        continue;
                    }
                    hasVisibleSenders = true;
                    const chatHistory = messageHistory[memberNumber] || { messages: [], isHidden: false };
                    const name = getCharacterName(memberNumber);
                    const showPlayerNumber = duplicatedNames.has(name);
                    const senderItem = senderItemPool.getItem(memberNumber);
                    senderItem.update(memberNumber, chatHistory, selectedSenderNum, showPlayerNumber);
                    scrollableContainer.appendChild(senderItem.element);
                }

                // 如果没有匹配的发送者，显示提示信息
                if (!hasVisibleSenders && searchKeyword) {
                    const noResults = document.createElement('div');
                    noResults.textContent = `没有找到匹配"${searchKeyword}"的消息成员`;
                    noResults.style.color = '#888';
                    noResults.style.padding = '10px 0';
                    scrollableContainer.appendChild(noResults);
                }
            }

            // 更新消息内容
            function updateMessageContent() {
                messageContent.innerHTML = '';

                if (!selectedSenderNum) {
                    showNoSelectionMessage();
                    return;
                } else {
                    // 更新标题
                    header.id = `chat-header-${selectedSenderNum}`;
                    updateChatHeader(selectedSenderNum);

                    // 启用输入框
                    inputField.disabled = false;
                    sendButton.disabled = false;

                    // 清除未读消息计数
                    if (clearUnreadMessages(selectedSenderNum)) {
                        updateSenderList();
                    }
                }

                const chatHistory = messageHistory[selectedSenderNum] || { messages: [], isHidden: false };

                if (!chatHistory.messages || chatHistory.messages.length === 0) {
                    showNoMessagesMessage();
                    return;
                }


                // 添加提示信息（如果消息超过100条）
                if (chatHistory.messages.length >= config.maxMessageCount) {
                    const tipElement = document.createElement('div');
                    tipElement.className = 'message-tip';
                    tipElement.style.cssText = 'text-align: center; color: #666; font-size: 12px; padding: 5px;';
                    tipElement.textContent = I18nModule.getText('message_limit_tip');
                    messageContent.appendChild(tipElement);
                }

                // 只显示最近的50条消息
                const recentMessages = chatHistory.messages.slice(-config.maxMessageCount);
                displayMessages(recentMessages);

                // 清空与重建都发生在同一轮事件中，立即定位到底部，避免旧版延迟
                // 10ms 期间浏览器先绘制 scrollTop=0 而产生闪烁。
                messageContent.scrollTop = messageContent.scrollHeight;
            }

            // 显示"无选择"消息
            function showNoSelectionMessage() {
                const noSelection = document.createElement('div');
                noSelection.textContent = I18nModule.getText('select_sender_prompt');
                noSelection.style.color = '#888';
                noSelection.style.textAlign = 'center';
                noSelection.style.marginTop = '50px';
                messageContent.appendChild(noSelection);

                // 更新标题
                header.textContent = '';

                // 禁用输入框
                inputField.disabled = true;
                sendButton.disabled = true;
            }

            // 显示"无消息"提示
            function showNoMessagesMessage() {
                const noMessages = document.createElement('div');
                noMessages.textContent = I18nModule.getText('no_messages');
                noMessages.style.color = '#888';
                messageContent.appendChild(noMessages);
            }

            // 创建时间分隔符
            function createTimeDivider(currentTime, lastTime)
            {
                if (lastTime === null || lastTime === undefined)
                    lastTime = new Date(0);

                const timeDiff = currentTime - lastTime;
                const oneHour = 60 * 60 * 1000; // 1小时的毫秒数
                const oneWeek = 7 * 24 * oneHour; // 1周的毫秒数

                // 检查是否是同一天
                const today = new Date();
                const isSameDay = currentTime.toDateString() === today.toDateString();
                const isYesterday = currentTime.toDateString() === new Date(today.getTime() - 24 * 60 * 60 * 1000).toDateString();
                const isWithinWeek = (today - currentTime) <= oneWeek; // 是否在一周内

                if (timeDiff >= oneHour) {
                    const timeDiv = document.createElement('div');
                    timeDiv.className = 'message-time-divider';
                    timeDiv.style.cssText = 'text-align: center; color: #666; font-size: 12px; padding: 2px 8px; margin: 5px auto; background-color: #fAfAfA; border-radius: 10px; display: inline-block; width: fit-content; line-height: 1.2;';

                    // 创建一个容器来居中显示时间分隔符
                    const container = document.createElement('div');
                    container.style.cssText = 'width: 100%; text-align: center; margin: 0; padding: 0;';
                    container.appendChild(timeDiv);

                    // 根据条件设置不同的时间格式
                    timeDiv.textContent = !isSameDay
                        ? (isYesterday
                           ? `昨天 ${currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
                           : (isWithinWeek
                              ? `${currentTime.toLocaleDateString('zh-CN', { weekday: 'long' })} ${currentTime.toLocaleString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}`
                              : currentTime.toLocaleString('zh-CN', {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    })))
                    : currentTime.toLocaleTimeString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return container;
                }

                return null;
            }

            // 显示消息列表
            function displayMessages(messages) {
                let lastMessageTime = null;
                for (const msg of messages) {
                    // 检查是否需要插入时间分隔
                    const timeDivider = createTimeDivider(msg.time, lastMessageTime);
                    if (timeDivider) {
                        messageContent.appendChild(timeDivider);
                    }

                    const messageItem = createMessageItem(msg);
                    messageContent.appendChild(messageItem);
                    lastMessageTime = msg.time;
                }
            }

            // 显示添加发送者界面
            function showAddSenderInterface() {
                changeSelectedSender(0);
                rightMessageContainer.style.display = 'none';
                addSenderContainer.style.display = 'flex';

                // 清空并显示添加发送者容器
                addSenderContainer.innerHTML = '';
                addSenderContainer.style.display = 'block';

                // 添加搜索框
                const addSenderSearchInput = document.createElement('input');
                addSenderSearchInput.type = 'text';
                addSenderSearchInput.placeholder = I18nModule.getText('search...');
                addSenderSearchInput.style.width = '100%';
                addSenderSearchInput.style.padding = '8px';
                addSenderSearchInput.style.border = '1px solid #ddd';
                addSenderSearchInput.style.borderRadius = '4px';
                addSenderSearchInput.style.boxSizing = 'border-box';
                addSenderSearchInput.id = 'LC-Message-AddSenderSearchInput';

                // 添加搜索事件监听
                addSenderSearchInput.addEventListener('input', function() {
                    updateAddSenderLists();
                });

                addSenderSearchInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        sendUpdateRoomListOnShow();
                    }
                });

                // 创建搜索框容器
                const searchContainer = document.createElement('div');
                searchContainer.style.display = 'flex'; // 横向排列
                searchContainer.style.alignItems = 'center';
                searchContainer.style.padding = '15px 15px 0 15px';
                searchContainer.style.marginBottom = '10px';
                searchContainer.className = 'lc-add-search';

                // 按钮配置数组
                const modeButtons = [
                    { mode: 'friend', text: I18nModule.getText('friends') },
                    { mode: 'room', text: I18nModule.getText('room') },
                    { mode: 'lobby', text: I18nModule.getText('lobby') }
                ];

                const buttonElements = {};
                const switchGroup = document.createElement('div');
                switchGroup.style.display = 'flex';
                switchGroup.style.alignItems = 'center';
                switchGroup.style.marginRight = '10px';
                switchGroup.style.border = '1px solid #ddd';
                switchGroup.style.borderRadius = '4px';
                switchGroup.style.overflow = 'hidden';
                switchGroup.style.minWidth = '160px';
                switchGroup.style.position = 'relative';
                // 滑动指示器（选中项滑块）
                const tabSlider = document.createElement('span');
                tabSlider.className = 'lc-tab-slider';
                switchGroup.appendChild(tabSlider);

                // 当前模式变量
                let currentMode = addSenderContainer.getAttribute('data-mode') || 'friend';

                // 创建按钮并添加到切换组
                modeButtons.forEach(({ mode, text }) => {
                    const btn = document.createElement('button');
                    btn.textContent = text;
                    btn.style.padding = '6px 16px';
                    btn.style.border = 'none';
                    btn.style.cursor = 'pointer';
                    btn.style.outline = 'none';
                    btn.style.fontWeight = 'bold';
                    btn.style.minWidth = '48px';
                    btn.style.whiteSpace = 'nowrap';
                    btn.style.display = 'flex';
                    btn.style.alignItems = 'center';
                    btn.style.justifyContent = 'center';
                    btn.style.color = 'black';

                    btn.addEventListener('click', function() {
                        if (currentMode !== mode) {
                            currentMode = mode;
                            addSenderSearchInput.value = '';
                            addSenderContainer.setAttribute('data-mode', mode);
                            updateSwitchStyle();
                            // 切到大厅时先显示载入状态。
                            if (mode === 'lobby') {
                                lobbyListLoading = true;
                            }
                            sendUpdateRoomListOnShow();
                            updateAddSenderLists();

                            if (mode === 'lobby') {
                                roomSpaceSwitchContainer.style.display = 'flex';
                            }
                            else
                            {
                                roomSpaceSwitchContainer.style.display = 'none';
                            }
                        }
                    });

                    buttonElements[mode] = btn;
                    switchGroup.appendChild(btn);
                });

                // 切换按钮样式函数
                function updateSwitchStyle() {
                    modeButtons.forEach(({ mode }) => {
                        const btn = buttonElements[mode];
                        const active = (currentMode === mode);
                        btn.classList.toggle('lc-tab-active', active);
                        btn.style.background = '';
                        btn.style.color = '';
                    });
                    // 滑块滑动到选中项
                    const activeBtn = buttonElements[currentMode];
                    if (activeBtn && tabSlider) {
                        tabSlider.style.width = activeBtn.offsetWidth + 'px';
                        tabSlider.style.left = activeBtn.offsetLeft + 'px';
                    }
                }

                updateSwitchStyle();

                const roomSpaceSwitchContainer = document.createElement('div');
                roomSpaceSwitchContainer.style.display = 'flex';
                roomSpaceSwitchContainer.style.alignItems = 'center';
                roomSpaceSwitchContainer.style.marginRight = '10px';
                roomSpaceSwitchContainer.style.border = '1px solid #ddd';
                roomSpaceSwitchContainer.style.borderRadius = '4px';
                roomSpaceSwitchContainer.style.overflow = 'hidden';
                roomSpaceSwitchContainer.style.minWidth = '72px';
                roomSpaceSwitchContainer.style.width = '72px';
                roomSpaceSwitchContainer.style.background = '#fafafa';

                // 性别选项
                const roomSpaceOptions = ['♀', '♀♂', '♂'];
                const roomSpaceMap = {
                    '♀': '',
                    '♀♂': 'X',
                    '♂': 'M'
                };
                const currentRoomSpaceValue = (Player?.LastChatRoom?.Space !== undefined && Player?.LastChatRoom?.Space !== null)
                ? Player.LastChatRoom.Space
                : Player.ExtensionSettings.LCData.MessageSetting.SetRoomSpace;

                let roomSpaceIndex = roomSpaceOptions.findIndex(opt => roomSpaceMap[opt] === currentRoomSpaceValue);

                const roomSpaceLeftBtn = document.createElement('button');
                roomSpaceLeftBtn.textContent = '<';
                roomSpaceLeftBtn.style.padding = '6px 10px';
                roomSpaceLeftBtn.style.border = 'none';
                roomSpaceLeftBtn.style.cursor = 'pointer';
                roomSpaceLeftBtn.style.outline = 'none';
                roomSpaceLeftBtn.style.background = 'none';
                roomSpaceLeftBtn.style.fontWeight = 'bold';
                roomSpaceLeftBtn.style.display = 'flex';
                roomSpaceLeftBtn.style.alignItems = 'center';
                roomSpaceLeftBtn.style.justifyContent = 'center';
                roomSpaceLeftBtn.style.color = 'black';
                roomSpaceLeftBtn.style.width = '20px';

                const roomSpaceRightBtn = document.createElement('button');
                roomSpaceRightBtn.textContent = '>';
                roomSpaceRightBtn.style.padding = '6px 10px';
                roomSpaceRightBtn.style.border = 'none';
                roomSpaceRightBtn.style.cursor = 'pointer';
                roomSpaceRightBtn.style.outline = 'none';
                roomSpaceRightBtn.style.background = 'none';
                roomSpaceRightBtn.style.fontWeight = 'bold';
                roomSpaceRightBtn.style.display = 'flex';
                roomSpaceRightBtn.style.alignItems = 'center';
                roomSpaceRightBtn.style.justifyContent = 'center';
                roomSpaceRightBtn.style.color = 'black';
                roomSpaceRightBtn.style.width = '20px';

                const roomSpaceDisplay = document.createElement('span');
                roomSpaceDisplay.textContent = roomSpaceOptions[roomSpaceIndex];
                roomSpaceDisplay.style.minWidth = '32px';
                roomSpaceDisplay.style.textAlign = 'center';
                roomSpaceDisplay.style.fontWeight = 'bold';
                roomSpaceDisplay.style.fontSize = '18px';
                roomSpaceDisplay.style.display = 'flex';
                roomSpaceDisplay.style.alignItems = 'center';
                roomSpaceDisplay.style.justifyContent = 'center';
                roomSpaceDisplay.style.width = '20px';

                // 切换逻辑
                function updateroomSpaceDisplay() {
                    roomSpaceDisplay.textContent = roomSpaceOptions[roomSpaceIndex];
                    addSenderContainer.setAttribute('data-roomSpace', roomSpaceMap[roomSpaceOptions[roomSpaceIndex]]);
                    Player.ExtensionSettings.LCData.MessageSetting.SetRoomSpace = roomSpaceMap[roomSpaceOptions[roomSpaceIndex]];
                    ServerPlayerExtensionSettingsSync('LCData');

                }
                // 大厅请求完成后收起载入状态。
                function showRoomSpaceLoading() {
                    addSenderContainer.classList.add('lc-space-loading');
                    setTimeout(function () {
                        Promise.resolve(sendUpdateRoomListOnShow())
                            .catch(function () {})
                            .then(function () {
                            addSenderContainer.classList.remove('lc-space-loading');
                        });
                    }, 60);
                }
                roomSpaceLeftBtn.addEventListener('click', () => {
                    roomSpaceIndex = (roomSpaceIndex + roomSpaceOptions.length - 1) % roomSpaceOptions.length;
                    updateroomSpaceDisplay();
                    showRoomSpaceLoading();
                });
                roomSpaceRightBtn.addEventListener('click', () => {
                    roomSpaceIndex = (roomSpaceIndex + 1) % roomSpaceOptions.length;
                    updateroomSpaceDisplay();
                    showRoomSpaceLoading();
                });

                // 初始赋值
                updateroomSpaceDisplay();

                // 组装控件
                roomSpaceSwitchContainer.appendChild(roomSpaceLeftBtn);
                roomSpaceSwitchContainer.appendChild(roomSpaceDisplay);
                roomSpaceSwitchContainer.appendChild(roomSpaceRightBtn);

                // 初始隐藏，只有大厅模式才显示
                roomSpaceSwitchContainer.style.display = 'none';


                searchContainer.appendChild(switchGroup); // 把切换按钮加到最左侧
                searchContainer.appendChild(roomSpaceSwitchContainer);
                searchContainer.appendChild(addSenderSearchInput);

                addSenderContainer.appendChild(searchContainer);

                // 创建并填充列表
                updateAddSenderLists();
            }

            // 刷新添加发送者界面的列表
            function updateAddSenderLists() {
                // 获取搜索框容器，如果存在的话
                const searchContainer = document.getElementById('LC-Message-AddSenderSearchInput');
                const searchValue = searchContainer ? searchContainer.value : '';
                const mode = addSenderContainer.getAttribute('data-mode') || 'friend';

                // 记录上次滚动位置
                let prevScrollTop = 0;
                const existingContentContainer = addSenderContainer.querySelector('.add-sender-content-container');
                if (existingContentContainer) {
                    prevScrollTop = existingContentContainer.scrollTop;
                    addSenderContainer.removeChild(existingContentContainer);
                }

                // 创建内容容器
                const container = document.createElement('div');
                container.className = 'add-sender-content-container';
                container.style.display = 'grid';
                container.style.gap = '4px';
                container.style.padding = '12px';
                container.style.height = 'calc(100% - 60px)';
                container.style.overflowY = 'auto';
                container.style.alignContent = 'start'; // 让内容始终靠上对齐
                makeDragScrollable(container);

                // 根据addSenderContainer宽度判断列数
                let columnCount = Math.min(3, Math.max(1, Math.floor(addSenderContainer.offsetWidth / 400)));
                container.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

                // 生成成员列表
                let showList;
                if (mode === 'room') {
                    // 只显示房间成员
                    const roomMemberNumbers = ChatRoomCharacter
                    .filter(c => c.MemberNumber !== Player.MemberNumber)
                    .filter(c => {
                        if (!searchValue) return true;
                        const name = getCharacterName(c.MemberNumber).toLowerCase();
                        const memberNumber = c.MemberNumber.toString();
                        const cachedInfo = getAndUpdateCharacterCache(c.MemberNumber).cache;
                        let nickname = '';
                        let characterName = '';
                        if (cachedInfo) {
                            if (cachedInfo.Nickname) nickname = cachedInfo.Nickname.toLowerCase();
                            if (cachedInfo.Name) characterName = cachedInfo.Name.toLowerCase();
                        }
                        const searchLower = searchValue.toLowerCase();
                        return name.includes(searchLower) ||
                            memberNumber.includes(searchValue) ||
                            nickname.includes(searchLower) ||
                            characterName.includes(searchLower);
                    })
                    .map(c => c.MemberNumber);

                    createMemberList(roomMemberNumbers, container);
                } else if (mode === 'friend') {
                    // 只显示好友
                    const filterFriend = (memberNumber) => {
                        if (!searchValue) return true;
                        const name = getCharacterName(memberNumber).toLowerCase();
                        const memberNumberStr = memberNumber.toString();
                        const cachedInfo = getAndUpdateCharacterCache(memberNumber).cache;
                        let nickname = '';
                        let characterName = '';
                        if (cachedInfo) {
                            if (cachedInfo.Nickname) nickname = cachedInfo.Nickname.toLowerCase();
                            if (cachedInfo.Name) characterName = cachedInfo.Name.toLowerCase();
                        }
                        const searchLower = searchValue.toLowerCase();
                        return name.includes(searchLower) ||
                            memberNumberStr.includes(searchValue) ||
                            nickname.includes(searchLower) ||
                            characterName.includes(searchLower);
                    };

                    const onlineFriendNumbers = onlineFriendsCache
                    .map(f => f.MemberNumber)
                    .filter(filterFriend);

                    const offlineFriendNumbers = Player.FriendList
                    .filter(memberNumber => isFriend(memberNumber) && Player.FriendNames.get(memberNumber) && !onlineFriendNumbers.includes(memberNumber))
                    .filter(filterFriend);

                    const allFriendNumbers = [...onlineFriendNumbers, ...offlineFriendNumbers];

                    createMemberList(allFriendNumbers, container, {
                        isFriend: true,
                        onlineSet: new Set(onlineFriendNumbers)
                    });
                }
                else if (mode === 'lobby')
                {
                    if (lobbyListLoading) {
                        // 房间资料载入中。
                        const loadingHint = document.createElement('div');
                        loadingHint.className = 'lc-lobby-loading-hint';
                        loadingHint.style.gridColumn = '1 / -1';
                        loadingHint.style.textAlign = 'center';
                        loadingHint.style.padding = '24px 0';
                        loadingHint.style.opacity = '.6';
                        loadingHint.textContent = I18nModule.getText('loading') || '...';
                        container.appendChild(loadingHint);
                    } else {
                        createRoomList(searchRoomListResult, container)
                    }
                }

                function restoreScroll() {
                    container.scrollTop = prevScrollTop;
                }
                requestAnimationFrame(restoreScroll);

                // 添加到添加发送者容器
                addSenderContainer.appendChild(container);
            }

            function sendUpdateRoomListOnShow()
            {
                if (needUpdateRoomList()) {
                    const searchInput = document.getElementById('LC-Message-AddSenderSearchInput');
                    const roomSpace = addSenderContainer.getAttribute('data-roomSpace') || '';
                    // 让调用端等待房间资料完成。
                    return sendQueryOnlineRoomListData(searchInput.value, roomSpace);
                }
                return Promise.resolve();
            }

            // 创建角色小信息面板
            function createCharacterSmallInfoPanel(memberNumber) {
                return characterSmallInfoPanelPool.getPanel(memberNumber);
            }

            // 创建大型信息面板
            function showCharacterInfoPanel(memberNumber, x, y) {
                // 如果已经存在面板，先移除
                const existingPanel = document.getElementById('character-large-info-panel');
                if (existingPanel) {
                    existingPanel.remove();
                }

                const panel = document.createElement('div');
                panel.id = 'character-large-info-panel';
                panel.style.position = 'fixed';
                panel.style.left = `${x + 10}px`; // 在鼠标右侧显示
                panel.style.top = `${y}px`;
                panel.style.width = '300px';
                // 使用主题颜色。
                panel.style.backgroundColor = 'var(--card)';
                panel.style.color = 'var(--ink)';
                panel.style.border = '1px solid var(--seam)';
                panel.style.borderRadius = '8px';
                panel.style.padding = '15px';
                panel.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                panel.style.zIndex = FloatZindex;

                // 第一行：头像和基本信息
                const headerRow = document.createElement('div');
                headerRow.style.display = 'flex';
                headerRow.style.alignItems = 'center';
                headerRow.style.gap = '15px';
                headerRow.style.marginBottom = '15px';

                // 头像
                const avatarContainer = createOrUpdateAvatarContainer(memberNumber);
                avatarContainer.style.width = '64px';
                avatarContainer.style.height = '64px';
                // 修改点击事件
                avatarContainer.addEventListener('click', function(event) {
                    event.stopPropagation();
                    const avatarUrl = avatarContainer.Url;
                    if (avatarUrl) {
                        window.open(avatarUrl, '_blank');
                    }
                });
                headerRow.appendChild(avatarContainer);

                // 名称和会员号容器
                const nameContainer = document.createElement('div');
                nameContainer.style.flex = '1';

                // 名称
                const nameSpan = document.createElement('div');
                nameSpan.textContent = getCharacterName(memberNumber);
                nameSpan.style.fontWeight = 'bold';
                nameSpan.style.fontSize = '16px';
                nameContainer.appendChild(nameSpan);

                // 会员号
                const numberSpan = document.createElement('div');
                numberSpan.textContent = `${memberNumber}`;
                numberSpan.style.color = 'var(--ink-3)';
                numberSpan.style.fontSize = '14px';
                nameContainer.appendChild(numberSpan);

                // 房间信息
                const roomInfo = document.createElement('div');
                roomInfo.textContent = getCharacterRoomInfo(memberNumber);
                roomInfo.style.color = 'var(--ink-2)';
                roomInfo.style.fontSize = '14px';
                roomInfo.style.marginLeft = 'auto';
                nameContainer.appendChild(roomInfo);

                headerRow.appendChild(nameContainer);
                panel.appendChild(headerRow);

                // 第二行：个性签名
                const signatureRow = document.createElement('div');
                signatureRow.style.marginTop = '10px';

                // 显示当前签名（所有玩家都显示）
                const currentSignature = document.createElement('div');
                currentSignature.textContent = getCharacterInfo(memberNumber).Signature || I18nModule.getText('no_signature');
                currentSignature.style.color = 'var(--ink-2)';
                currentSignature.style.fontSize = '14px';
                currentSignature.style.padding = '8px';
                currentSignature.style.backgroundColor = 'var(--panel-dn)';
                currentSignature.style.borderRadius = '4px';
                currentSignature.style.marginBottom = '10px';
                currentSignature.style.whiteSpace = 'pre-wrap'; // 允许自动换行
                currentSignature.style.wordBreak = 'break-word'; // 允许在单词内换行
                currentSignature.style.maxWidth = '100%'; // 确保不会超出容器宽度
                signatureRow.appendChild(currentSignature);

                // 如果是自己，显示编辑区域
                const isSelf = memberNumber === Player.MemberNumber;
                if (isSelf) {
                    // 分隔线
                    const divider = document.createElement('hr');
                    divider.style.margin = '10px 0';
                    divider.style.border = 'none';
                    divider.style.borderTop = '1px solid var(--seam)';
                    signatureRow.appendChild(divider);

                    // 签名输入框
                    const signatureInput = document.createElement('textarea');
                    signatureInput.value = getCharacterInfo(memberNumber).Signature || ''; // 设置当前签名
                    signatureInput.placeholder = I18nModule.getText('signature_placeholder');
                    signatureInput.maxLength = 50; // 限制最大字数
                    signatureInput.style.width = '100%';
                    signatureInput.style.height = '60px';
                    signatureInput.style.padding = '8px';
                    signatureInput.style.border = '1px solid var(--seam)';
                    signatureInput.style.borderRadius = '4px';
                    signatureInput.style.resize = 'none';
                    signatureInput.style.marginBottom = '10px';
                    signatureInput.style.backgroundColor = 'var(--card)';
                    signatureInput.style.color = 'var(--ink)';
                    signatureRow.appendChild(signatureInput);

                    // 头像URL输入框
                    const avatarUrlInput = document.createElement('input');
                    avatarUrlInput.type = 'text';
                    avatarUrlInput.value = getCharacterInfo(memberNumber).Avatar || ''; // 设置当前头像URL
                    avatarUrlInput.placeholder = I18nModule.getText('avatar_url_placeholder');
                    signatureInput.maxLength = 100; // 限制最大字数
                    avatarUrlInput.style.width = '100%';
                    avatarUrlInput.style.padding = '8px';
                    avatarUrlInput.style.border = '1px solid var(--seam)';
                    avatarUrlInput.style.borderRadius = '4px';
                    avatarUrlInput.style.marginBottom = '5px';
                    avatarUrlInput.style.backgroundColor = 'var(--card)';
                    avatarUrlInput.style.color = 'var(--ink)';
                    signatureRow.appendChild(avatarUrlInput);

                    // 添加可用网站提示
                    const websiteTip = document.createElement('div');
                    websiteTip.textContent = I18nModule.getText('avatar_sites_tip');
                    websiteTip.style.color = 'var(--ink-2)';
                    websiteTip.style.fontSize = '12px';
                    websiteTip.style.marginBottom = '10px';
                    websiteTip.style.cursor = 'help';
                    websiteTip.title = config.allowedImageHosts.join('\n');
                    signatureRow.appendChild(websiteTip);

                    // 保存按钮
                    const saveButton = document.createElement('button');
                    saveButton.className = 'lc-save-btn';
                    saveButton.textContent = I18nModule.getText('save');
                    saveButton.style.padding = '6px 12px';
                    saveButton.style.backgroundColor = '#4CAF50';
                    saveButton.style.color = 'white';
                    saveButton.style.border = 'none';
                    saveButton.style.borderRadius = '4px';
                    saveButton.style.cursor = 'pointer';
                    saveButton.style.float = 'right';

                    // 保存按钮点击事件
                    saveButton.addEventListener('click', function() {
                        const newSignature = signatureInput.value;
                        const newAvatarUrl = avatarUrlInput.value;

                        // 检查头像URL是否有效
                        if (newAvatarUrl && !isValidImageUrl(newAvatarUrl)) {
                            alert(I18nModule.getText('invalid_image_url', config.allowedImageHosts.join('\n')));
                            return;
                        }

                        // 使用新函数更新信息
                        updateCharacterInfo(newSignature, newAvatarUrl);

                        // 更新自己的 SmallInfo 面板
                        const smallInfoPanel = document.getElementById(`character-info-panel-${Player.MemberNumber}`);
                        if (smallInfoPanel && smallInfoPanel.parentNode) {
                            const parentNode = smallInfoPanel.parentNode;
                            const nextSibling = smallInfoPanel.nextSibling;
                            smallInfoPanel.remove();
                            const newSmallInfoPanel = createCharacterSmallInfoPanel(Player.MemberNumber);
                            if (nextSibling) {
                                parentNode.insertBefore(newSmallInfoPanel, nextSibling);
                            } else {
                                parentNode.appendChild(newSmallInfoPanel);
                            }
                        }
                        // 关闭面板
                        panel.remove();
                    });

                    signatureRow.appendChild(saveButton);
                }

                panel.appendChild(signatureRow);

                // 添加到文档
                document.body.appendChild(panel);

                // 点击其他地方关闭面板
                document.addEventListener('click', function closePanel(event) {
                    if (!panel.contains(event.target)) {
                        panel.remove();
                        document.removeEventListener('click', closePanel);
                    }
                });
            }

            // 修改成员列表创建函数，添加滚动条支持
            function createMemberList(memberNumbers, container, options) {
                memberNumbers.forEach(memberNumber => {
                    // 使用createCharacterSmallInfoPanel创建成员项
                    const memberItem = createCharacterSmallInfoPanel(memberNumber);

                    // 在线/离线视觉标记（仅好友模式传入 options）
                    if (options && options.isFriend) {
                        const isOnline = options.onlineSet && options.onlineSet.has(parseInt(memberNumber));
                        memberItem.classList.remove('lc-online-item', 'lc-offline-item');
                        memberItem.classList.add(isOnline ? 'lc-online-item' : 'lc-offline-item');
                    } else {
                        memberItem.classList.remove('lc-online-item', 'lc-offline-item');
                    }

                    // 添加按钮样式
                    memberItem.style.cursor = 'pointer';
                    memberItem.style.transition = 'background-color 0.2s';
                    memberItem.style.border = '1px solid var(--seam)';
                    memberItem.style.borderRadius = '4px';
                    memberItem.style.padding = '8px';
                    memberItem.style.marginBottom = '4px';
                    memberItem.style.backgroundColor = 'var(--card)';
                    memberItem.style.color = 'var(--ink)';
                    memberItem.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    // 添加悬停效果
                    memberItem.addEventListener('mouseover', function() {
                        this.style.backgroundColor = 'var(--panel-dn)';
                    });

                    memberItem.addEventListener('mouseout', function() {
                        this.style.backgroundColor = 'var(--card)';
                    });

                    // 添加点击事件
                    memberItem.addEventListener('click', function() {
                        addSenderToHistory(memberNumber);
                        hideAddSenderInterface(); // 隐藏添加发送者界面
                    });

                    container.appendChild(memberItem);
                });
            }

            /**
             * 生成房间信息列表
             * @param {Array} roomList - 房间数据数组
             * @param {HTMLDivElement} container - 容器元素
             * @returns {HTMLDivElement} - 房间列表容器
             */
            function createRoomList(roomList, container) {
                // 先释放所有活跃的房间项，准备复用
                roomItemPool.releaseAll();

                const pinnedRoomsDict = Player.ExtensionSettings?.LCData?.MessageSetting?.PinnedRooms || {};

                roomList
                    .slice() // 防止修改原数组
                    .sort((a, b) => {
                    // 当前房间始终排在最前
                    if (a.Name === ChatRoomData?.Name) return -1;
                    if (b.Name === ChatRoomData?.Name) return 1;

                    const aPinned = pinnedRoomsDict[a.Name] !== undefined;
                    const bPinned = pinnedRoomsDict[b.Name] !== undefined;
                    if (aPinned && bPinned) {
                        // 都置顶，按时间戳降序
                        return pinnedRoomsDict[a.Name] - pinnedRoomsDict[b.Name];
                    }
                    if (aPinned) return -1; // a置顶，排前
                    if (bPinned) return 1;  // b置顶，排前
                    // 都不置顶，按好友数降序
                    const aFriends = Array.isArray(a.Friends) ? a.Friends.length : 0;
                    const bFriends = Array.isArray(b.Friends) ? b.Friends.length : 0;
                    return bFriends - aFriends;
                })
                    .forEach(room => {
                    // 用对象池获取房间项
                    const itemElement = roomItemPool.getItem(room);
                    container.appendChild(itemElement);
                });
            }

            function needUpdateRoomList()
            {
                return addSenderContainer.style.display !== 'none'
                && addSenderContainer.getAttribute('data-mode') === 'lobby';
            }

            // 添加发送者到消息历史
            function addSenderToHistory(memberNumber) {
                // 如果已经存在，直接选中
                if (messageHistory[memberNumber]) {
                    messageHistory[memberNumber].isHidden = false;

                    changeSelectedSender(memberNumber);
                    update();
                    return;
                }

                // 先切换画面，历史记录随后从本地缓存补入。
                const pendingHistory = messageHistory[memberNumber] = {
                    messages: [],
                    orderTimeStamp: Date.now()
                };
                changeSelectedSender(memberNumber);
                update();

                LCDataStorage.getPlayerMessages(memberNumber, config.maxMessageCount).then(msgs => {
                    if (messageHistory[memberNumber] !== pendingHistory || !Array.isArray(msgs) || msgs.length === 0) return;
                    if (pendingHistory.messages.length === 0) pendingHistory.messages = msgs;
                    messageDialog.updateSenderList();
                    if (selectedSenderNum === memberNumber) messageDialog.updateMessageContent();
                }).catch(error => console.error('读取聊天记录失败:', error));
            }

            // 创建单个消息项
            function createMessageItem(msg) {
                const messageItem = document.createElement('div');
                messageItem.className = 'lc-message-item';
                messageItem.style.marginBottom = '6px';
                messageItem.style.padding = '4px';
                messageItem.style.borderRadius = '5px';
                messageItem.style.display = 'flex';
                messageItem.style.alignItems = 'flex-start';
                messageItem.style.gap = '8px';

                // 使用新的createOrUpdateAvatarContainer函数
                const avatarContainer = createOrUpdateAvatarContainer(msg.sender);

                // 添加点击事件到头像
                avatarContainer.addEventListener('click', function(event) {
                    event.stopPropagation(); // 阻止事件冒泡
                    showCharacterInfoPanel(msg.sender, event.clientX, event.clientY);
                });

                // 创建消息内容容器
                const messageContainer = document.createElement('div');
                messageContainer.style.maxWidth = '80%';
                messageContainer.style.minWidth = '50px';
                messageContainer.style.borderRadius = '5px';
                messageContainer.style.padding = '6px';

                // 根据消息方向设置不同样式
                const isSelf = msg.sender === Player.MemberNumber;
                if (isSelf) {
                    messageItem.style.justifyContent = 'flex-end';
                    messageContainer.style.backgroundColor = '#e1f5fe';
                    messageContainer.style.borderLeft = '3px solid #4fc3f7';
                    // 发送消息时，头像在右侧
                    messageItem.appendChild(messageContainer);
                    messageItem.appendChild(avatarContainer);
                } else {
                    messageItem.style.justifyContent = 'flex-start';
                    messageContainer.style.backgroundColor = '#f9f9f9';
                    messageContainer.style.borderLeft = '3px solid #ddd';
                    // 接收消息时，头像在左侧
                    messageItem.appendChild(avatarContainer);
                    messageItem.appendChild(messageContainer);
                }

                // 消息文本
                const messageText = document.createElement('div');

                // 处理消息内容，应用不同的样式和功能
                // 只有在接收到的消息中才处理操作按钮
                const { content, actions } = processMessageContent(msg, msg.content, msg.sender !== Player.MemberNumber);

                messageText.innerHTML = content;
                messageText.style.margin = '2px 0';
                messageText.style.wordBreak = 'break-word';

                // 消息底部信息栏
                const messageFooter = createMessageFooter(msg);

                // 组装消息项
                messageContainer.appendChild(messageText);

                // 如果有操作按钮，且不是自己发送的消息，添加到消息中
                if (actions && actions.length > 0 && msg.sender !== Player.MemberNumber) {
                    const actionsContainer = createActionsContainer(actions);
                    messageContainer.appendChild(actionsContainer);
                }

                messageContainer.appendChild(messageFooter);

                return messageItem;
            }

            // 当前对话收到新消息时只追加一个节点，不清空 lc-message-log。
            // 用户原本停在底部（或消息由自己发送）才跟随到底；正在阅读旧消息时保留位置。
            function appendMessageToContent(msg, previousMessage) {
                if (!msg || !selectedSenderNum) return;
                const wasNearBottom = messageContent.scrollHeight - messageContent.scrollTop - messageContent.clientHeight < 80;
                messageContent.querySelectorAll(':scope > div').forEach(function(element) {
                    if (element.classList.contains('lc-message-item') || element.classList.contains('message-time-divider')) return;
                    if (element.textContent === I18nModule.getText('no_messages')) element.remove();
                });

                const previousTime = previousMessage?.time ? new Date(previousMessage.time) : null;
                const currentTime = msg.time instanceof Date ? msg.time : new Date(msg.time);
                const divider = createTimeDivider(currentTime, previousTime);
                if (divider) messageContent.appendChild(divider);
                messageContent.appendChild(createMessageItem(msg));

                // 维持画面上限；移除最旧消息及其紧邻的旧时间分隔。
                const items = messageContent.querySelectorAll(':scope > .lc-message-item');
                if (items.length > config.maxMessageCount) {
                    const oldest = items[0];
                    const dividerBefore = oldest.previousElementSibling;
                    oldest.remove();
                    if (dividerBefore?.querySelector('.message-time-divider')) dividerBefore.remove();
                }

                if (wasNearBottom || msg.sender === Player.MemberNumber) {
                    requestAnimationFrame(function() {
                        messageContent.scrollTop = messageContent.scrollHeight;
                    });
                }
            }

            // 处理消息内容，返回处理后的HTML和可能的操作按钮
            function processMessageContent(message, content, allowActions = true) {
                // 初始化返回对象
                const result = {
                    content: '',
                    actions: []
                };

                // 处理换行符
                let processedContent = content.replace(/\n/g, '<br>');

                // 处理URL链接，使其可点击
                const urlRegex = /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
                processedContent = processedContent.replace(urlRegex, function(url) {
                    if (isValidImageUrl(url)) {
                        return `<a href="${url}" target="_blank" style="text-decoration: none;"><img src="${url}" style="max-width: 100%; max-height: 300px; border-radius: 4px; margin: 4px 0;" alt="图片" /></a>`;
                    }
                    return `<a href="${url}" target="_blank" style="color: #0066cc; text-decoration: underline;">${url}</a>`;
                });

                // 检查是否以*开头和结尾，应用斜体样式
                if (processedContent.startsWith('*') || processedContent.startsWith('•') && processedContent.length > 2) {
                    processedContent = `<em style="color: #444444;">${processedContent}</em>`;
                }

                // 只有当允许操作按钮时才检查和添加
                if (allowActions) {
                    // 检查是否包含房间邀请 |房间名|格式
                    const roomInviteRegex = /\|([^\|]+)\|/;
                    const roomMatch = processedContent.match(roomInviteRegex);

                    if (roomMatch) {
                        const roomName = roomMatch[1];
                        // 判断status和status.entered
                        const entered = message.status && message.status.entered === true;
                        // 添加进入房间的操作按钮
                        result.actions.push({
                            text: I18nModule.getText('enter') +" " +  roomName,
                            roomName: roomName,
                            enabled : entered,
                            callback: function() {
                                createConfirmDialog({
                                    content: I18nModule.getText('confirm_teleport_room', roomName),
                                    confirmText: I18nModule.getText('enter'),
                                    onConfirm: () => {
                                        if (!message.status) message.status = {};
                                        message.status.entered = true;


                                        LCDataStorage.updateMessageById(message.id, message);
                                        enterRoom(roomName);
                                        hideMessageDialog();
                                    },
                                    onCancel: () => {
                                    }
                                });
                            }
                        });
                    }

                    // 检查是否包含好友邀请
                    if (processedContent.includes('邀请你成为好友') || processedContent.includes('invites you to be friends')) {
                        // 判断status和status.addedFriend
                        const addedFriend = message.status && message.status.addedFriend === true;
                        if (!isFriend(selectedSenderNum) && !addedFriend) {
                            result.actions.push({
                                text: I18nModule.getText('add_friend'),
                                enabled : addedFriend,
                                callback: function() {
                                    if (!message.status) message.status = {};
                                    message.status.addedFriend = true;
                                    LCDataStorage.updateMessageById(message.id, message);
                                    ChatRoomListManipulation(Player.FriendList, true, selectedSenderNum.toString()),
                                        updateMessageContent();
                                    createConfirmDialog({
                                        content: I18nModule.getText('friend_added_confirm', getCharacterName(selectedSenderNum)),
                                        confirmText: I18nModule.getText('send'),
                                        cancelText: I18nModule.getText('cancel'),
                                        onConfirm: () => {
                                            sendMessage(I18nModule.getText('friend_added_message', getCharacterName(Player.MemberNumber)));
                                        },
                                        onCancel: () => {
                                        }
                                    });
                                }
                            });
                        }
                    }
                }

                // 设置处理后的内容
                result.content = processedContent;

                return result;
            }

            // 创建操作按钮容器
            function createActionsContainer(actions) {
                const container = document.createElement('div');
                container.style.display = 'flex';
                container.style.gap = '8px';
                container.style.marginTop = '6px';

                actions.forEach(action => {
                    const button = document.createElement('button');
                    button.textContent = action.text;
                    button.style.padding = '4px 8px';
                    button.style.backgroundColor = '#4CAF50';
                    button.style.color = 'white';
                    button.style.border = 'none';
                    button.style.borderRadius = '4px';
                    button.style.cursor = 'pointer';
                    button.style.fontSize = '12px';

                    // 判断是否已处理
                    if (action.enabled) {
                        button.disabled = true;
                        button.style.backgroundColor = 'transparent';
                        button.style.color = '#999';
                        button.style.border = '1px solid #999';
                        button.style.cursor = 'not-allowed';
                    } else {
                        // 添加悬停效果
                        button.addEventListener('mouseover', function() {
                            this.style.backgroundColor = '#45a049';
                        });
                        button.addEventListener('mouseout', function() {
                            this.style.backgroundColor = '#4CAF50';
                        });
                        // 添加点击事件
                        button.addEventListener('click', action.callback);
                    }

                    container.appendChild(button);
                });

                return container;
            }

            // 创建消息底部信息栏
            function createMessageFooter(msg) {
                const messageFooter = document.createElement('div');
                messageFooter.style.display = 'flex';
                messageFooter.style.justifyContent = 'space-between';
                messageFooter.style.alignItems = 'center';
                messageFooter.style.marginTop = '3px';
                messageFooter.style.fontSize = '11px';

                // 消息类型
                const messageType = document.createElement('span');
                messageType.textContent = getMessageTypeText(msg.type);
                messageType.style.color = '#999';
                messageType.style.marginRight = '10px';

                // 消息时间
                const messageTime = document.createElement('span');
                // 只显示时间部分
                const timeOnly = msg.time.toLocaleTimeString();
                messageTime.textContent = timeOnly;
                messageTime.style.color = '#888';

                // 组装底部信息栏
                messageFooter.appendChild(messageType);
                messageFooter.appendChild(messageTime);

                return messageFooter;
            }

            // 创建工具按钮栏
            function createToolbar() {
                const toolbarContainer = document.createElement('div');
                toolbarContainer.style.display = 'flex';
                toolbarContainer.style.justifyContent = 'space-between';
                toolbarContainer.style.padding = '5px';
                toolbarContainer.style.borderTop = '1px solid #eee';
                toolbarContainer.style.borderBottom = '1px solid #eee';
                toolbarContainer.style.marginBottom = '0';

                // 左侧按钮区域
                const leftButtonsContainer = document.createElement('div');

                // 创建快捷消息按钮
                const quickMessageButton = createQuickMessageButton();
                leftButtonsContainer.appendChild(quickMessageButton);

                // 右侧按钮区域
                const rightButtonsContainer = document.createElement('div');

                // 创建下载聊天记录按钮
                const downloadButton = createDownloadButton();
                rightButtonsContainer.appendChild(downloadButton);

                // 添加左右两侧按钮区域到工具栏
                toolbarContainer.appendChild(leftButtonsContainer);
                toolbarContainer.appendChild(rightButtonsContainer);

                return toolbarContainer;
            }

            // 创建快捷消息按钮
            function createQuickMessageButton() {
                const quickMessageButton = document.createElement('button');
                quickMessageButton.textContent = '➕️';
                quickMessageButton.style.padding = '4px 8px';
                quickMessageButton.style.backgroundColor = '#f0f0f0';
                quickMessageButton.style.border = '1px solid #ddd';
                quickMessageButton.style.borderRadius = '4px';
                quickMessageButton.style.cursor = 'pointer';
                quickMessageButton.style.marginRight = '5px';

                // 点击快捷消息按钮显示菜单
                quickMessageButton.addEventListener('click', function(e) {
                    e.stopPropagation();

                    const options = [
                        {
                            text: I18nModule.getText('invite_to_current_room'),
                            action: function() {
                                const currentRoom = getCurrentRoomName();
                                const playerName = getCharacterName(Player.MemberNumber);
                                if (currentRoom) {
                                    sendMessage(I18nModule.getText('invite_room_message', playerName, currentRoom));
                                } else {
                                    alert(I18nModule.getText('cannot_get_room_info'));
                                }
                            }
                        },
                        {
                            text: I18nModule.getText('send_member_status'),
                            action: function() {
                                if (CurrentScreen !== "ChatRoom" || !ChatRoomData) {
                                    alert(I18nModule.getText('not_in_chatroom'));
                                    return;
                                }

                                let statusMsg = I18nModule.getText('room_members_count', ChatRoomCharacter.length);

                                ChatRoomCharacter.forEach((char, index) => {
                                    const charName = getCharacterName(char.MemberNumber);
                                    let charStatus = "";

                                    if (char.IsRestrained()) {
                                        charStatus += "🔒";
                                    }

                                    statusMsg += `${index + 1}. ${charName}[${char.Name}] ${charStatus}\n`;
                                });

                                const now = new Date();
                                const timeStr = now.toLocaleTimeString();
                                statusMsg += `\n⏱️ ${timeStr}`;

                                sendMessage(statusMsg);
                            }
                        }
                    ];

                    // 如果不是好友，添加邀请成为好友选项
                    if (isWhisperAvailable(selectedSenderNum) && !isBeepAvailable(selectedSenderNum)) {
                        options.push({
                            text: I18nModule.getText('invite_friend'),
                            action: function() {
                                const playerName = getCharacterName(Player.MemberNumber);
                                sendMessage(I18nModule.getText('invite_friend_message', playerName));
                                if (!Player.FriendList.includes(selectedSenderNum)) {
                                    ChatRoomListManipulation(Player.FriendList, true, selectedSenderNum.toString());
                                }
                            }
                        });
                    }

                    options.push({
                        text: I18nModule.getText('send_lianchat_link'),
                        action: function() {
                            sendMessage(I18nModule.getText('lianchat_link_message'));
                        }
                    });

                    const buttonRect = quickMessageButton.getBoundingClientRect();
                    createContextMenu(options, buttonRect.left, buttonRect.bottom);
                });

                return quickMessageButton;
            }


            // 创建下载聊天记录按钮
            function createDownloadButton() {
                const downloadButton = document.createElement('button');
                downloadButton.textContent = '💾';
                downloadButton.style.padding = '4px 8px';
                downloadButton.style.backgroundColor = '#f0f0f0';
                downloadButton.style.border = '1px solid #ddd';
                downloadButton.style.borderRadius = '4px';
                downloadButton.style.cursor = 'pointer';

                // 点击下载按钮
                downloadButton.addEventListener('click', function() {
                    downloadChatHistory();
                });

                return downloadButton;
            }

            // 获取当前房间名称
            function getCurrentRoomName() {
                // 这里需要根据游戏实际情况获取当前房间名称
                // 示例实现，实际使用时需要替换
                if (typeof ChatRoomData !== 'undefined' && ChatRoomData && ChatRoomData.Name) {
                    return ChatRoomData.Name;
                }
                return null;
            }

            // 下载聊天记录
            function downloadChatHistory() {
                // 确保有选中的发送者
                if (!selectedSenderNum) {
                    return;
                }

                // 获取选中发送者的聊天记录


                // 异步获取所有消息
                LCDataStorage.getPlayerMessages(selectedSenderNum, -1).then(function(messages)
                                                                            {
                    if (!messages || messages.length === 0) {
                        return;
                    }

                    // 获取发送者名称
                    const senderName = getCharacterName(selectedSenderNum) || selectedSenderNum;

                    // 生成聊天记录文本
                    let chatText = `=====  ${senderName} =====\n\n`;

                    // 使用正确的messages数组
                    messages.forEach(msg => {
                        const timeStr = new Date(msg.time).toLocaleString();
                        const isSelf = msg.sender === Player.MemberNumber;
                        const typeStr = getMessageTypeText(msg.type);

                        // 获取发送者名称
                        let senderName = '';
                        if (isSelf) {
                            senderName = getCharacterName(Player.MemberNumber);
                        } else {
                            senderName = getCharacterName(selectedSenderNum);
                        }

                        // 格式：[时间] 发送者名称: 内容
                        chatText += `[${timeStr}] ${senderName}: ${msg.content}\n\n`;
                    });

                    // 创建下载链接
                    const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);

                    // 创建下载元素
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;

                    // 生成文件名：聊天记录_对象_日期时间.txt
                    const now = new Date();
                    const fileName = I18nModule.getText('chat_record_file_name', senderName, now.getFullYear(), padZero(now.getMonth()+1), padZero(now.getDate()), padZero(now.getHours()), padZero(now.getMinutes()));

                    downloadLink.download = fileName;

                    // 触发下载
                    document.body.appendChild(downloadLink);
                    downloadLink.click();

                    // 清理
                    document.body.removeChild(downloadLink);
                    URL.revokeObjectURL(url);
                });

            }


            // 补零函数，确保日期时间格式正确
            function padZero(num) {
                return num.toString().padStart(2, '0');
            }

            // 组装右侧容器
            rightMessageContainer.appendChild(headerContainer);
            rightMessageContainer.appendChild(messageContent);
            rightMessageContainer.appendChild(toolbarContainer);
            rightMessageContainer.appendChild(inputContainer);



            // 初始化界面
            updateSenderList();
            updateMessageContent();

            // 组装对话框
            // 创建标题文本
            const leftTitle = document.createElement('div');
            leftTitle.textContent = 'LianChat';
            leftTitle.style.fontWeight = 'bold';
            leftTitle.style.flexGrow = '1'; // 让标题占据剩余空间

            // 将标题添加到左侧容器
            leftButtons.appendChild(leftTitle);

            contentContainer.appendChild(senderList);
            contentContainer.appendChild(rightContainer);

            messageDialog.appendChild(titleBar);
            messageDialog.appendChild(contentContainer);

            // 添加拖动功能
            titleBar.addEventListener('mousedown', function(e) {
                // 确保不是点击关闭按钮
                if (e.target === closeButton) {
                    return;
                }

                isDragging = true;
                const rect = messageDialog.getBoundingClientRect();
                dragOffsetX = e.clientX - rect.left;
                dragOffsetY = e.clientY - rect.top;
                messageDialog.style.transform = 'none'; // 移除居中定位
            });

            document.addEventListener('mousemove', function(e) {
                if (isDragging && messageDialog) {
                    messageDialog.style.left = (e.clientX - dragOffsetX) + 'px';
                    messageDialog.style.top = (e.clientY - dragOffsetY) + 'px';
                } else if (isResizing && messageDialog) {
                    handleResize(e);
                }
            });

            document.addEventListener('mouseup', function() {
                if (isDragging && messageDialog) {
                    // 拖拽结束时检查边界
                    constrainDialogToWindow(messageDialog);
                }
                isDragging = false;
                isResizing = false;
                resizeDirection = '';
                document.body.style.cursor = 'default';
            });

            // 添加键盘事件监听器，用于ESC键关闭窗口
            const handleKeyDown = function(event) {
                if (event.key === "Escape" && MessageModule.isMessageDialogVisible()) {
                    hideMessageDialog();
                }
            };

            // 添加键盘事件监听
            document.addEventListener('keydown', handleKeyDown);

            // 添加到文档
            document.body.appendChild(messageDialog);
            // Step3：创建即套用 .lc-panel 外观（头部 SVG / 搜索 / 输入 / 发送 / 列表），观察者负责后续持久化
            try { if (typeof reskinDialog === 'function') reskinDialog(messageDialog); } catch (e) {}

            // 添加窗口大小变化监听器，确保对话框在窗口范围内
            const resizeHandler = function() {
                if (messageDialog && messageDialog.style.display !== 'none') {
                    applyResponsiveDialogSize(messageDialog, false);
                    constrainDialogToWindow(messageDialog);
                }
            };
            window.addEventListener('resize', resizeHandler);

            // 保存监听器引用，以便后续移除
            messageDialog.resizeHandler = resizeHandler;

            // 公开更新方法
            messageDialog.handleKeyDown = handleKeyDown;

            messageDialog.updateSenderList = updateSenderList;
            messageDialog.updateMessageContent = updateMessageContent;
            messageDialog.appendMessageToContent = appendMessageToContent;
            messageDialog.hideAddSenderInterface = hideAddSenderInterface;
            messageDialog.updateAddSenderLists = updateAddSenderLists;
            messageDialog.showCharacterInfoPanel = showCharacterInfoPanel;
            messageDialog.needUpdateRoomList = needUpdateRoomList;
            messageDialog.sendUpdateRoomListOnShow = sendUpdateRoomListOnShow;
            messageDialog.updateFriendButtonCount = updateFriendButtonCount;

            showAddSenderInterface();
        }

        function hideAddSenderInterface() {
            document.getElementById('LC-Message-AddSenderContainer').style.display = 'none';
            document.getElementById('LC-Message-RightMessageContainer').style.display = 'flex';
        }

        // 添加缩放边缘处理
        function addResizeHandles(dialog) {
            const resizeHandleSize = 8; // 调整手柄的大小

            // 创建8个调整手柄（四个角落和四个边）
            const positions = [
                'n', 'e', 's', 'w', // 上右下左
                'ne', 'se', 'sw', 'nw' // 右上、右下、左下、左上
            ];

            const cursors = {
                'n': 'ns-resize',
                'e': 'ew-resize',
                's': 'ns-resize',
                'w': 'ew-resize',
                'ne': 'nesw-resize',
                'se': 'nwse-resize',
                'sw': 'nesw-resize',
                'nw': 'nwse-resize'
            };

            positions.forEach(pos => {
                const handle = document.createElement('div');
                handle.className = `resize-handle resize-${pos}`;
                handle.style.position = 'absolute';
                handle.style.zIndex = '10001';

                // 设置手柄位置和大小
                switch(pos) {
                    case 'n':
                        handle.style.top = '0';
                        handle.style.left = resizeHandleSize + 'px';
                        handle.style.right = resizeHandleSize + 'px';
                        handle.style.height = resizeHandleSize + 'px';
                        handle.style.cursor = 'ns-resize';
                        break;
                    case 'e':
                        handle.style.right = '0';
                        handle.style.top = resizeHandleSize + 'px';
                        handle.style.bottom = resizeHandleSize + 'px';
                        handle.style.width = resizeHandleSize + 'px';
                        handle.style.cursor = 'ew-resize';
                        break;
                    case 's':
                        handle.style.bottom = '0';
                        handle.style.left = resizeHandleSize + 'px';
                        handle.style.right = resizeHandleSize + 'px';
                        handle.style.height = resizeHandleSize + 'px';
                        handle.style.cursor = 'ns-resize';
                        break;
                    case 'w':
                        handle.style.left = '0';
                        handle.style.top = resizeHandleSize + 'px';
                        handle.style.bottom = resizeHandleSize + 'px';
                        handle.style.width = resizeHandleSize + 'px';
                        handle.style.cursor = 'ew-resize';
                        break;
                    case 'ne':
                        handle.style.top = '0';
                        handle.style.right = '0';
                        handle.style.width = resizeHandleSize + 'px';
                        handle.style.height = resizeHandleSize + 'px';
                        handle.style.cursor = 'nesw-resize';
                        break;
                    case 'se':
                        handle.style.bottom = '0';
                        handle.style.right = '0';
                        handle.style.width = resizeHandleSize + 'px';
                        handle.style.height = resizeHandleSize + 'px';
                        handle.style.cursor = 'nwse-resize';
                        break;
                    case 'sw':
                        handle.style.bottom = '0';
                        handle.style.left = '0';
                        handle.style.width = resizeHandleSize + 'px';
                        handle.style.height = resizeHandleSize + 'px';
                        handle.style.cursor = 'nesw-resize';
                        break;
                    case 'nw':
                        handle.style.top = '0';
                        handle.style.left = '0';
                        handle.style.width = resizeHandleSize + 'px';
                        handle.style.height = resizeHandleSize + 'px';
                        handle.style.cursor = 'nwse-resize';
                        break;
                }

                // 添加鼠标事件
                handle.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    isResizing = true;
                    resizeDirection = pos;
                    dialog.dataset.lcUserResized = '1';

                    // 记录原始尺寸和位置
                    const rect = dialog.getBoundingClientRect();
                    originalWidth = rect.width;
                    originalHeight = rect.height;
                    originalX = rect.left;
                    originalY = rect.top;

                    // 设置鼠标样式
                    document.body.style.cursor = cursors[pos];
                });

                // 添加鼠标悬停样式
                handle.addEventListener('mouseover', function() {
                    this.style.cursor = cursors[pos];
                });

                dialog.appendChild(handle);
            });
        }


        // 约束对话框在窗口范围内
        function constrainDialogToWindow(dialog) {
            const rect = dialog.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let newLeft = rect.left;
            let newTop = rect.top;
            let newWidth = rect.width;
            let newHeight = rect.height;

            // 最小尺寸限制
            const minWidth = 300;
            const minHeight = 200;

            // 检查并修正宽度
            if (rect.width > windowWidth) {
                newWidth = Math.max(minWidth, windowWidth - 20); // 留20px边距
            }

            // 检查并修正高度
            if (rect.height > windowHeight) {
                newHeight = Math.max(minHeight, windowHeight - 20); // 留20px边距
            }

            // 检查右边界
            if (rect.right > windowWidth) {
                newLeft = windowWidth - newWidth;
            }

            // 检查下边界
            if (rect.bottom > windowHeight) {
                newTop = windowHeight - newHeight;
            }

            // 检查左边界
            if (rect.left < 0) {
                newLeft = 0;
            }

            // 检查上边界
            if (rect.top < 0) {
                newTop = 0;
            }

            // 应用新位置和尺寸
            if (newLeft !== rect.left || newTop !== rect.top) {
                dialog.style.left = newLeft + 'px';
                dialog.style.top = newTop + 'px';
            }

            if (newWidth !== rect.width || newHeight !== rect.height) {
                dialog.style.width = newWidth + 'px';
                dialog.style.height = newHeight + 'px';
            }
        }

        // 处理缩放
        function handleResize(e) {
            const rect = messageDialog.getBoundingClientRect();
            const minWidth = 300;  // 最小宽度
            const minHeight = 200; // 最小高度

            let newWidth = originalWidth;
            let newHeight = originalHeight;
            let newX = originalX;
            let newY = originalY;

            // 根据调整方向计算新尺寸和位置
            if (resizeDirection.includes('e')) {
                newWidth = Math.max(minWidth, e.clientX - rect.left);
            }
            if (resizeDirection.includes('s')) {
                newHeight = Math.max(minHeight, e.clientY - rect.top);
            }
            if (resizeDirection.includes('w')) {
                const deltaX = e.clientX - originalX;
                newWidth = Math.max(minWidth, originalWidth - deltaX);
                if (newWidth !== minWidth) {
                    newX = e.clientX;
                }
            }
            if (resizeDirection.includes('n')) {
                const deltaY = e.clientY - originalY;
                newHeight = Math.max(minHeight, originalHeight - deltaY);
                if (newHeight !== minHeight) {
                    newY = e.clientY;
                }
            }

            // 应用新尺寸和位置
            messageDialog.style.width = newWidth + 'px';
            messageDialog.style.height = newHeight + 'px';
            messageDialog.style.left = newX + 'px';
            messageDialog.style.top = newY + 'px';

            // 缩放后检查边界
            constrainDialogToWindow(messageDialog);
        }

        // 显示对话框
        function showMessageDialog() {
            isDialogVisibleState = true;
            if (!messageDialog) {
                createMessageDialog();
            } else {
                if (messageDialog._lcCloseTimer) {
                    clearTimeout(messageDialog._lcCloseTimer);
                    messageDialog._lcCloseTimer = null;
                }
                messageDialog.classList.remove('lc-panel--closing');
                messageDialog.style.display = 'flex';
                void messageDialog.offsetWidth;
                // 显示时检查边界，确保对话框在窗口范围内
                constrainDialogToWindow(messageDialog);

                // 重新添加窗口大小变化监听器
                if (!messageDialog.resizeHandler) {
                    const resizeHandler = function() {
                        if (messageDialog && messageDialog.style.display !== 'none') {
                            constrainDialogToWindow(messageDialog);
                        }
                    };
                    window.addEventListener('resize', resizeHandler);
                    messageDialog.resizeHandler = resizeHandler;
                }

                // 更新内容
                if (messageDialog.updateSenderList) {
                    // 如果有选中的发送者，清除其未读消息计数
                    if (selectedSenderNum) {
                        clearUnreadMessages(selectedSenderNum);
                    }

                    messageDialog.updateSenderList();
                    messageDialog.updateMessageContent();
                    messageDialog.sendUpdateRoomListOnShow();
                }
            }

            // 启动自动刷新
            startAutoRefresh();
        }

        // 隐藏对话框：立即同步逻辑状态，再让同一个实体面板播完动画后隐藏。
        function hideMessageDialog() {
            isDialogVisibleState = false;
            if (messageDialog) {
                if (messageDialog._lcCloseTimer) clearTimeout(messageDialog._lcCloseTimer);
                messageDialog.classList.remove('lc-panel--closing');
                void messageDialog.offsetWidth;
                messageDialog.classList.add('lc-panel--closing');
                const dialogToHide = messageDialog;
                dialogToHide._lcCloseTimer = setTimeout(function () {
                    if (isDialogVisibleState || !dialogToHide) return;
                    dialogToHide.style.display = 'none';
                    dialogToHide.classList.remove('lc-panel--closing');
                    dialogToHide._lcCloseTimer = null;
                }, 210);
                sendTypingStatus(false);
                stopAutoRefresh();
                if (messageDialog.resizeHandler) {
                    window.removeEventListener('resize', messageDialog.resizeHandler);
                    messageDialog.resizeHandler = null;
                }
            }
        }


        function showLianChatSettingsDialog()
        {
            // 如果已存在设置弹窗，先移除
            const old = document.getElementById('lianChatSettingsDialog');
            if (old) old.remove();

            // 弹窗主体
            const dialog = document.createElement('div');
            dialog.id = 'lianChatSettingsDialog';
            dialog.style.position = 'fixed'; // 关键：让弹窗脱离文档流
            dialog.style.left = '50%';
            dialog.style.top = '50%';
            dialog.style.transform = 'translate(-50%, -50%)';
            dialog.style.background = 'white';
            dialog.style.borderRadius = '8px';
            dialog.style.boxShadow = '0 2px 10px rgba(0,0,0,0.18)';
            dialog.style.padding = '28px 32px 20px 32px';
            dialog.style.minWidth = '320px';
            dialog.style.maxWidth = '90vw';
            dialog.style.display = 'flex';
            dialog.style.flexDirection = 'column';
            dialog.style.alignItems = 'stretch';
            dialog.style.zIndex = FloatZindex; // 保证在最上层

            // 标题
            const title = document.createElement('div');
            title.textContent = I18nModule.getText('lianchat_settings');
            title.style.fontSize = '1.2em';
            title.style.fontWeight = 'bold';
            title.style.marginBottom = '18px';
            dialog.appendChild(title);

            // 公屏隐藏悄悄话和私聊（单选）
            const hideLabel = document.createElement('div');
            hideLabel.textContent = I18nModule.getText('hide_private_messages');
            hideLabel.style.marginBottom = '8px';
            dialog.appendChild(hideLabel);

            const hideOptions = [
                { label: I18nModule.getText('no_hide'), value: 0 },
                { label: I18nModule.getText('hide_when_open'), value: 1 },
                { label: I18nModule.getText('always_hide'), value: 2 }
            ];

            const hideGroup = document.createElement('div');
            hideGroup.style.display = 'flex';
            hideGroup.style.flexDirection = 'column';
            hideGroup.style.marginBottom = '18px';

            // 当前设置
            let currentHide = (Player.ExtensionSettings?.LCData?.MessageSetting?.HidePrivateChat) ?? 0;

            hideOptions.forEach(opt => {
                const label = document.createElement('label');
                label.style.display = 'flex';
                label.style.alignItems = 'center';
                label.style.marginBottom = '4px';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'hidePrivateChat';
                radio.value = opt.value;
                radio.checked = (currentHide == opt.value);

                label.appendChild(radio);
                label.appendChild(document.createTextNode(opt.label));
                hideGroup.appendChild(label);
            });
            dialog.appendChild(hideGroup);

            // 后台时消息通知（勾选框）
            const notifyLabel = document.createElement('label');
            notifyLabel.style.display = 'flex';
            notifyLabel.style.alignItems = 'center';
            notifyLabel.style.marginBottom = '18px';

            const notifyCheckbox = document.createElement('input');
            notifyCheckbox.type = 'checkbox';
            notifyCheckbox.checked = !!(Player.ExtensionSettings?.LCData?.MessageSetting?.NotifyWhenBackground);

            notifyLabel.appendChild(notifyCheckbox);
            notifyLabel.appendChild(document.createTextNode(I18nModule.getText('background_notification')));
            dialog.appendChild(notifyLabel);

            // 悬浮按钮拖曳后自动吸附屏幕边缘
            const snapLabel = document.createElement('label');
            snapLabel.style.display = 'flex';
            snapLabel.style.alignItems = 'center';
            snapLabel.style.marginBottom = '18px';
            const snapCheckbox = document.createElement('input');
            snapCheckbox.type = 'checkbox';
            snapCheckbox.checked = Player.ExtensionSettings?.LCData?.MessageSetting?.SnapFloatingButtonToEdge !== false;
            snapLabel.appendChild(snapCheckbox);
            snapLabel.appendChild(document.createTextNode('悬浮按钮自动贴边'));
            dialog.appendChild(snapLabel);

            // 确定按钮
            const okBtn = document.createElement('button');
            okBtn.textContent = I18nModule.getText('confirm');
            okBtn.style.marginTop = '8px';
            okBtn.style.alignSelf = 'center';
            okBtn.style.padding = '6px 24px';
            okBtn.style.border = '1px solid #4CAF50';
            okBtn.style.background = '#4CAF50';
            okBtn.style.color = 'white';
            okBtn.style.borderRadius = '4px';
            okBtn.style.fontSize = '1em';
            okBtn.style.cursor = 'pointer';

            okBtn.onclick = function() {
                // 读取单选
                const selectedRadio = dialog.querySelector('input[name="hidePrivateChat"]:checked');
                const hideValue = selectedRadio ? Number(selectedRadio.value) : 0;
                // 读取勾选
                const notifyValue = notifyCheckbox.checked;
                const snapValue = snapCheckbox.checked;

                // 保存到设置
                Player.ExtensionSettings.LCData.MessageSetting.HidePrivateChat = hideValue;
                Player.ExtensionSettings.LCData.MessageSetting.NotifyWhenBackground = notifyValue;
                Player.ExtensionSettings.LCData.MessageSetting.SnapFloatingButtonToEdge = snapValue;

                // 同步到服务器
                ServerPlayerExtensionSettingsSync('LCData');

                dialog.remove();
            };

            dialog.appendChild(okBtn);

            // 点击弹窗外部关闭
            function closeIfClickOutside(e) {
                if (!dialog.contains(e.target)) {
                    dialog.remove();
                    document.removeEventListener('mousedown', closeIfClickOutside);
                }
            }
            setTimeout(() => {
                document.addEventListener('mousedown', closeIfClickOutside);
            }, 0);
            document.body.appendChild(dialog);
        }


        // 启动自动刷新
        function startAutoRefresh() {
            // 先清除可能存在的旧定时器
            stopAutoRefresh();

            // 在线状态来自好友查询，不以同房或悄悄话权限判断。
            if (typeof ServerSend === 'function' && (typeof ServerIsConnected === 'undefined' || ServerIsConnected)) {
                ServerSend("AccountQuery", { Query: "OnlineFriends" });
            }
            updateCounter = 1;

            // 设置新的定时器
            refreshInterval = setInterval(function() {
                if (MessageModule.isMessageDialogVisible()) {
                    update();
                } else {
                    // 如果对话框不可见，停止刷新
                    stopAutoRefresh();
                }
            }, REFRESH_INTERVAL_MS);
        }

        // 停止自动刷新
        function stopAutoRefresh() {
            if (refreshInterval) {
                clearInterval(refreshInterval);
                refreshInterval = null;
            }
        }


        function update() {
            // 更新当前输入框状态
            saveCurrentInputState();
            loadSenderInputState(selectedSenderNum, false);
            // 更新发送者列表
            messageDialog.updateSenderList();
            messageDialog.updateFriendButtonCount();
            // 更新正在输入状态
            updateTypingPlayers();
            if (document.getElementById('LC-Message-AddSenderContainer').style.display !== 'none')
            {
                messageDialog.updateAddSenderLists();
            }

            // 降低更新房间列表的频率
            if(MessageModule.isMessageDialogVisible()
               && selectedSenderNum
               && updateCounter % 2 == 0)
            {
                const friend = onlineFriendsCache.find(f => f.MemberNumber === selectedSenderNum);
                if (friend && friend.ChatRoomName) {
                    sendQueryOnlineRoomListData(friend.ChatRoomName, friend.ChatRoomSpace);
                }
            }

            if(MessageModule.isMessageDialogVisible()
               && messageDialog.needUpdateRoomList()
               && updateCounter % 2 == 0)
            {
                messageDialog.sendUpdateRoomListOnShow()
            }

            if (MessageModule.isMessageDialogVisible()
                && updateCounter % 10 === 0
                && typeof ServerSend === 'function'
                && (typeof ServerIsConnected === 'undefined' || ServerIsConnected)) {
                ServerSend("AccountQuery", { Query: "OnlineFriends" });
            }

            updateCounter ++;
        }



        // 处理发送的Beep消息
        function handleSentBeepMessage(targetMemberNumber, message) {
            if (!targetMemberNumber || !message) return;
            // 添加到消息历史，发送者为当前玩家
            addMessageToHistory(targetMemberNumber, message, "Beep", Player.MemberNumber);
        }

        // 处理聊天室消息
        function handleChatRoomMessageDisplay(data, msg, senderCharacter, targetCharacter) {
            if (!senderCharacter || !senderCharacter.MemberNumber) return;

            // 处理悄悄话类型的消息
            if (data.Type == "Whisper")
            {
                // 缓存一次名称
                getAndUpdateCharacterCache(senderCharacter.MemberNumber);

                if (data.Dictionary) {
                    const gagEffect = data.Dictionary.find(d =>
                                                           d.Effects && d.Effects.includes("gagGarble") && d.Original);

                    if (gagEffect && gagEffect.Original) {
                        msg = `${msg}\n[${gagEffect.Original}]`;
                    }
                }

                // 添加到消息历史，使用发送者的编号
                const partnerMemberNumber = senderCharacter.MemberNumber === Player.MemberNumber ?
                      (targetCharacter ? targetCharacter.MemberNumber : data.Target) :
                senderCharacter.MemberNumber;

                addMessageToHistory(partnerMemberNumber, msg, "Whisper", senderCharacter.MemberNumber);
            }
        }

        // 处理聊天室消息
        function handleChatRoomMessage(data) {

            // 处理输入状态消息
            if (data.Type === "Hidden" && data.Dictionary && data.Dictionary.type === "ChatRoomStatusEvent") {
                const statusMessage = data.Dictionary.message;
                const senderNumber = data.Sender;
                const targetNumber = statusMessage.Target;

                // 检查是否是悄悄话输入状态
                if (statusMessage.Type === "Whisper" && targetNumber === Player.MemberNumber) {
                    // 添加到正在输入数组
                    if (!typingPlayers.some(item =>
                                            item.Number === senderNumber && item.type === "Whisper")) {
                        typingPlayers.push({
                            Number: senderNumber,
                            type: "Whisper",
                            timestamp: Date.now()
                        });

                        if (selectedSenderNum === senderNumber) {
                            updateChatHeader(senderNumber);
                        }
                    }
                }
                // 检查是否是结束输入状态
                else if (statusMessage.Type === "None") {
                    // 从正在输入数组中移除
                    typingPlayers = typingPlayers.filter(item =>
                                                         !(item.Number === senderNumber && item.type === "Whisper"));

                    if (selectedSenderNum === senderNumber) {
                        updateChatHeader(senderNumber);
                    }
                }
                return;
            }
        }

        // 处理Beep消息
        function handleBeepMessage(memberNumber, memberName, message) {
            if (!memberNumber || !message) return;

            // 添加到消息历史，发送者为消息来源
            addMessageToHistory(memberNumber, message, "Beep", memberNumber);
        }

        // 未读消息管理
        function addUnreadMessage(memberNumber) {
            if (!messageHistory[memberNumber]) {
                messageHistory[memberNumber] = { messages: [], isHidden: false };
            }
            messageHistory[memberNumber].unreadCount = (messageHistory[memberNumber].unreadCount || 0) + 1;
        }

        function clearUnreadMessages(memberNumber) {
            if (messageHistory[memberNumber]?.unreadCount) {
                messageHistory[memberNumber].unreadCount = 0;
                // 保存到本地存储
                if (LCDataStorage) LCDataStorage.updateSenderState(memberNumber, messageHistory[memberNumber]);

                return true; // 返回true表示有未读消息被清除
            }
            return false; // 返回false表示没有未读消息需要清除
        }

        function getUnreadCount(memberNumber) {
            return messageHistory[memberNumber]?.unreadCount || 0;
        }

        function getTotalUnreadCount() {
            let total = 0;
            for (const memberNumber in messageHistory) {
                // 跳过隐藏的发送者
                if (messageHistory[memberNumber].isHidden || memberNumber == Player.MemberNumber) {
                    continue;
                }
                total += messageHistory[memberNumber].unreadCount || 0;
            }
            return total;
        }

        // 添加消息到历史记录
        function addMessageToHistory(partnerMemberNumber, content, type, senderNumber) {
            const memberNumber = partnerMemberNumber;

            if (!messageHistory[memberNumber]) {
                messageHistory[memberNumber] = {
                    messages: [],
                    isHidden: false
                };
            }

            // 确保 messages 数组存在
            if (!messageHistory[memberNumber].messages) {
                messageHistory[memberNumber].messages = [];
            }

            // 如果发送者被隐藏，取消隐藏状态
            if (messageHistory[memberNumber]?.isHidden) {
                messageHistory[memberNumber].isHidden = false;
            }


            // 保存消息，确保不会覆盖inputState属性
            const msgObj = {
                content: content,
                time: new Date(),
                type: type,
                sender: senderNumber,
                // status 字段可选添加
                // status: { delivered: "false" }
            };

            const previousMessage = messageHistory[memberNumber].messages[messageHistory[memberNumber].messages.length - 1] || null;
            messageHistory[memberNumber].messages.push(msgObj);

            if (LCDataStorage) LCDataStorage.addMessage(memberNumber, msgObj);

            messageHistory[memberNumber].orderTimeStamp = Date.now();

            // 如果是接收到的消息（发送者不是自己），且对话框未显示或者不是当前选中的发送者，增加未读计数
            if (senderNumber !== Player.MemberNumber &&
                (messageDialog === null ||
                 messageDialog.style.display === 'none' ||
                 selectedSenderNum !== memberNumber)) {
                addUnreadMessage(partnerMemberNumber);
            }

            // 如果对话框已打开，更新内容
            if (MessageModule.isMessageDialogVisible()) {
                messageDialog.updateSenderList();
                if (selectedSenderNum === memberNumber) {
                    messageDialog.appendMessageToContent(msgObj, previousMessage);
                }
            }

            // 保存到本地存储
            if (LCDataStorage) LCDataStorage.updateSenderState(memberNumber, messageHistory[memberNumber]);

            // 新增：后台消息通知
            if (senderNumber !== Player.MemberNumber) {
                notifyIfBackground(senderNumber, type, content);
            }
        }

        // 保存当前输入状态
        function saveCurrentInputState() {
            if (selectedSenderNum) {
                // 确保该发送者在messageHistory中有记录
                if (!messageHistory[selectedSenderNum]) {
                    messageHistory[selectedSenderNum] = {
                        messages: [],
                        isHidden: false
                    };
                }

                // 获取输入框元素
                const inputField = document.getElementById('LC-Message-InputField');
                // 获取消息类型选择
                const messageType = document.querySelector('input[name="messageType"]:checked');

                if (inputField && messageType) {
                    // 将输入状态直接保存到messageHistory对象中
                    messageHistory[selectedSenderNum].inputState = {
                        text: inputField.value,
                        type: messageType.value
                    };
                }
            }
        }

        // 判断悄悄话是否可用（在同一个房间内）
        function isWhisperAvailable(memberNumber) {
            // 检查目标玩家是否在当前房间
            if (CurrentScreen === "ChatRoom" && ChatRoomCharacter) {
                return ChatRoomCharacter.some(c => c.MemberNumber === parseInt(memberNumber));
            }
            return false;
        }

        // 判断Beep是否可用（在好友列表中）
        function isBeepAvailable(memberNumber) {
            // 检查是否在好友列表中
            return onlineFriendsCache.some(friend => friend.MemberNumber === parseInt(memberNumber));
        }


        function isFriend(memberNumber) {
            // 检查是否在好友列表中
            return Player.FriendList?.includes(parseInt(memberNumber));
        }

        // 更新正在输入状态
        function updateTypingPlayers() {
            // 遍历typingPlayers数组，检查每个玩家的状态
            typingPlayers = typingPlayers.filter(item => {
                // 如果是悄悄话类型，检查是否可用
                if (item.type === "Whisper") {
                    return isWhisperAvailable(item.Number);
                }
                if (item.type === "Beep") {
                    return isBeepAvailable(item.Number) && item.timestamp > Date.now() - 1000 * 6;
                }
                // 其他类型保持不变
                return true;
            });
        }

        async function sendQueryOnlineRoomListData(query = "", space = "") {
            const SearchData = {Language: "", Space: space, Game: "", FullRooms: true};
            isReadyRevRoomList = true;
            // 丢弃较旧的并行回应。
            const requestId = ++roomListRequestId;
            let res;
            try {
                res = await ServerRoomSearch(query, SearchData);
            } catch (err) {
                if (requestId === roomListRequestId) {
                    isReadyRevRoomList = false;
                    lobbyListLoading = false;
                }
                throw err;
            }
            if (requestId !== roomListRequestId) {
                // 已經有更新的請求發出，這次回應過期，忽略
                return;
            }
            if (!res.err) {
                updateOnlineRoomListData(res.value ?? []);
            } else {
                isReadyRevRoomList = false;
                lobbyListLoading = false;
            }
        }

        function updateChatHeader(memberNumber) {
            const header = document.getElementById(`chat-header-${memberNumber}`);
            if (!header) return;

            // 清空header内容
            header.innerHTML = '';

            // 创建标题容器
            const titleContainer = document.createElement('div');
            titleContainer.style.display = 'flex';
            titleContainer.style.justifyContent = 'space-between';
            titleContainer.style.alignItems = 'center';
            titleContainer.style.width = '100%';

            // 添加名字
            const partnerName = getCharacterName(memberNumber);
            const nameSpan = document.createElement('span');
            nameSpan.textContent = partnerName;
            titleContainer.appendChild(nameSpan);

            // 检查是否正在输入
            const isTyping = typingPlayers.some(item =>
                                                item.Number === memberNumber);

            if (isTyping) {
                // 添加正在输入的提示
                const typingSpan = document.createElement('span');
                typingSpan.id = `typing-${memberNumber}`;
                typingSpan.style.color = '#888888';
                typingSpan.style.fontSize = '0.85em';
                typingSpan.style.display = 'inline';
                typingSpan.style.marginLeft = '10px'; // 添加左边距
                typingSpan.textContent = I18nModule.getText('typing');
                titleContainer.appendChild(typingSpan);
            }

            // 添加一个弹性空间，将后面的内容推到右侧
            const spacer = document.createElement('div');
            spacer.style.flexGrow = '1';
            titleContainer.appendChild(spacer);

            // 添加房间信息
            const roomInfoSpan = document.createElement('span');
            roomInfoSpan.id = `room-info-${memberNumber}`;
            roomInfoSpan.style.color = '#888888';
            roomInfoSpan.style.fontSize = '0.85em';
            roomInfoSpan.style.fontStyle = 'italic';

            // 检查是否是好友，并显示房间
            roomInfoSpan.textContent = isFriend(memberNumber) ? '🐾 ' + getCharacterRoomInfo(memberNumber) : getCharacterRoomInfo(memberNumber);

            titleContainer.appendChild(roomInfoSpan);

            // 新增：如果是好友且有房间信息，显示房间详情按钮
            if (isFriend(memberNumber)) {
                const friend = onlineFriendsCache.find(f => f.MemberNumber === Number(memberNumber));
                if (friend && friend.ChatRoomName && onlineRoomListData[friend.ChatRoomName]) {
                    const room = onlineRoomListData[friend.ChatRoomName];

                    // 创建按钮
                    const infoBtn = document.createElement('button');
                    infoBtn.className = 'lc-room-info-btn';
                    infoBtn.textContent = `(${room.MemberCount}/${room.MemberLimit})`;
                    infoBtn.style.marginLeft = '4px';  // 减小左边距
                    infoBtn.style.padding = '0 4px';   // 减小内边距
                    infoBtn.style.fontSize = '0.75em'; // 减小字体
                    infoBtn.style.border = '1px solid #ddd'; // 改为浅灰色边框
                    infoBtn.style.background = '#f5f5f5'; // 改为浅灰色背景
                    infoBtn.style.color = '#666'; // 改为深灰色文字
                    infoBtn.style.borderRadius = '4px'; // 统一圆角
                    infoBtn.style.cursor = 'pointer';
                    infoBtn.style.height = '18px';     // 固定高度
                    infoBtn.style.lineHeight = '16px'; // 行高等于高度减去边框
                    infoBtn.style.display = 'inline-flex'; // 使用flex布局
                    infoBtn.style.alignItems = 'center';   // 垂直居中
                    infoBtn.style.justifyContent = 'center'; // 水平居中

                    // 点击弹出悬浮窗
                    infoBtn.addEventListener('click', function(e) {
                        e.stopPropagation();

                        // 先移除已有的悬浮窗
                        const old = document.getElementById('roomInfoPopup');
                        if (old) old.remove();

                        // 创建悬浮窗
                        const popup = document.createElement('div');
                        popup.id = 'roomInfoPopup';
                        popup.style.position = 'fixed';
                        popup.style.left = (e.clientX + 10 - 220) + 'px';
                        popup.style.top = (e.clientY + 10) + 'px';
                        popup.style.background = 'var(--list-surface)';
                        popup.style.color = 'var(--ink)';
                        popup.style.border = '1px solid var(--divider)';
                        popup.style.borderRadius = '12px';
                        popup.style.boxShadow = 'var(--shadow-float)';
                        popup.style.padding = '14px 18px';
                        popup.style.zIndex = FloatZindex;
                        popup.style.minWidth = '220px';

                        // Friends转为名字
                        let friendsNames = '';
                        if (Array.isArray(room.Friends) && room.Friends.length > 0) {
                            friendsNames = room.Friends.map(f => {
                                // 使用 getCharacterName 获取名字
                                return getCharacterName(f.MemberNumber);
                            }).join('，');
                        } else {
                            friendsNames = '无';
                        }

                        // 填充内容
                        popup.innerHTML = `
                        <div style="display:flex;justify-content:space-between;align-items:center;font-weight:bold;font-size:1.1em;margin-bottom:6px;">
                            <span>${room.Name}</span>
                            <span>(${room.MemberCount}/${room.MemberLimit})</span>
                        </div>
                        <div class="lc-room-description" style="margin-bottom:6px;">${room.Description || ''}</div>
                        <div>${I18nModule.getText('friends')}：${friendsNames}</div>
                        `;

                        // 点击外部关闭
                        function closePopup(ev) {
                            if (!popup.contains(ev.target)) {
                                popup.remove();
                                document.removeEventListener('mousedown', closePopup);
                            }
                        }
                        setTimeout(() => {
                            document.addEventListener('mousedown', closePopup);
                        }, 0);

                        document.body.appendChild(popup);
                    });

                    titleContainer.appendChild(infoBtn);
                }
            }


            // 添加标题容器到header
            header.appendChild(titleContainer);

            // 添加个人签名
            const signature = getCharacterInfo(memberNumber).Signature;
            if (signature) {
                const signatureSpan = document.createElement('span');
                signatureSpan.style.color = '#666666';
                signatureSpan.style.fontSize = '0.85em';
                signatureSpan.style.fontStyle = 'italic';
                signatureSpan.style.marginTop = '5px';
                signatureSpan.style.display = 'block';
                signatureSpan.textContent = signature;
                header.appendChild(signatureSpan);
            }
        }
        /**
         * 加载发送者的输入状态
         * @param {number} memberNumber - 发送者的会员编号
         * @param {boolean} [refreshInput=true] - 是否刷新输入框内容，默认为true
         */
        function loadSenderInputState(memberNumber, refreshInput = true) {
            // 更新题头
            updateChatHeader(memberNumber);

            // 获取输入框元素
            const inputField = document.getElementById('LC-Message-InputField');

            // 获取单选按钮元素
            const whisperRadio = document.querySelector('input[name="messageType"][value="Whisper"]');
            const beepRadio = document.querySelector('input[name="messageType"][value="Beep"]');

            // 获取发送按钮
            const sendButton = document.getElementById('messageSendButton');

            if (!inputField || !whisperRadio || !beepRadio || !sendButton) return;

            // 检查各消息类型是否可用
            const whisperAvailable = isWhisperAvailable(memberNumber);
            const beepAvailable = isBeepAvailable(memberNumber);

            // 设置单选按钮可用状态
            whisperRadio.disabled = !whisperAvailable;
            beepRadio.disabled = !beepAvailable;

            // 如果两种消息类型都不可用，禁用发送按钮
            sendButton.disabled = !whisperAvailable && !beepAvailable;

            // 如果发送按钮被禁用，添加提示信息
            if (sendButton.disabled) {
                sendButton.textContent = I18nModule.getText('cannot_send');
                // 可选：添加视觉提示
                sendButton.style.opacity = "0.5";

            } else {
                sendButton.textContent = I18nModule.getText('send');
                sendButton.style.opacity = "1";

                inputField.placeholder = I18nModule.getText('input_placeholder');
                inputField.autocomplete = "off"; // 禁用自动补全
                inputField.disabled = false;
            }

            // 默认消息类型
            let messageType = 'Whisper'; // 默认为悄悄话

            // 检查是否有保存的输入状态
            if (messageHistory[memberNumber] && messageHistory[memberNumber].inputState) {
                // 只有当需要刷新输入框且当前输入框内容与存储内容不一致时才更新
                if (refreshInput) {
                    const storedText = messageHistory[memberNumber].inputState.text || '';
                    if (inputField.value !== storedText) {
                        inputField.value = storedText;
                        inputField.style.height = 'auto'; // 先重置高度
                        inputField.style.height = inputField.scrollHeight + 'px'; // 再设置为内容高度
                    }
                }

                // 获取保存的消息类型
                messageType = messageHistory[memberNumber].inputState.type;

                // 如果保存的消息类型不可用，切换到可用的类型
                if ((messageType === 'Whisper' && !whisperAvailable) ||
                    (messageType === 'Beep' && !beepAvailable)) {
                    messageType = whisperAvailable ? 'Whisper' : (beepAvailable ? 'Beep' : 'Whisper');
                }
            } else if (refreshInput) {
                // 如果没有保存的状态且需要刷新输入框，清空输入框
                inputField.value = '';
                inputField.style.height = 'auto'; // 先重置高度
                inputField.style.height = inputField.scrollHeight + 'px'; // 再设置为内容高度

                // 根据历史消息设置默认消息类型
                if (messageHistory[memberNumber] && messageHistory[memberNumber].messages && messageHistory[memberNumber].messages.length > 0) {
                    // 获取最近的消息类型
                    const messages = messageHistory[memberNumber].messages;

                    for (let i = messages.length - 1; i >= 0; i--) {
                        const msg = messages[i];
                        if (msg.type === 'Whisper') {
                            messageType = 'Whisper';
                            break;
                        } else if (msg.type === 'Beep') {
                            messageType = 'Beep';
                            break;
                        }
                    }

                    // 如果历史消息类型不可用，切换到可用的类型
                    if ((messageType === 'Whisper' && !whisperAvailable) ||
                        (messageType === 'Beep' && !beepAvailable)) {
                        messageType = whisperAvailable ? 'Whisper' : (beepAvailable ? 'Beep' : 'Whisper');
                    }
                } else {
                    // 如果没有历史消息，选择可用的类型
                    messageType = whisperAvailable ? 'Whisper' : (beepAvailable ? 'Beep' : 'Whisper');
                }
            }

            // 统一设置消息类型选择
            if (messageType === 'Beep' && beepAvailable) {
                beepRadio.checked = true;
                whisperRadio.checked = false;
            } else if (whisperAvailable) {
                whisperRadio.checked = true;
                beepRadio.checked = false;
            }
        }

        // 更新好友缓存
        function updateOnlineFriendsCache(data) {
            if (Array.isArray(data)) {
                const normalizedData = data
                    .filter(friend => friend && Number.isFinite(Number(friend.MemberNumber)))
                    .map(friend => Object.assign({}, friend, { MemberNumber: Number(friend.MemberNumber) }));
                // 检查新上线的好友
                normalizedData.forEach(friend => {
                    if (friend && friend.MemberNumber) {
                        const oldFriend = onlineFriendsCache?.find(f => f.MemberNumber === friend.MemberNumber);
                        if (!oldFriend) {
                            syncPlayerInfoToFriend(friend.MemberNumber);
                        }
                    }
                });

                // 更新缓存
                onlineFriendsCache = normalizedData;
                if (MessageModule.isMessageDialogVisible() && messageDialog) {
                    messageDialog.updateFriendButtonCount();
                    const addSender = document.getElementById('LC-Message-AddSenderContainer');
                    if (addSender && addSender.style.display !== 'none') messageDialog.updateAddSenderLists();
                }
            }
        }

        // 更新好友缓存
        function updateOnlineRoomListData(data) {
            if (Array.isArray(data)) {
                // 遍历房间数据，以Name为key存储
                data.forEach(room => {
                    if (room && room.Name) {
                        onlineRoomListData[room.Name] = room;
                    }
                });
                searchRoomListResult = data;
            }
            isReadyRevRoomList = false;
            lobbyListLoading = false;

            if(messageDialog.needUpdateRoomList())
            {
                messageDialog.updateAddSenderLists();
            }
        }

        function dialogisReadyRevRoomList() {
            return isReadyRevRoomList;
        }

        // 添加检查URL是否有效的函数
        function isValidImageUrl(url) {
            if (!url) return false;

            // 检查文件扩展名是否为常见图片格式
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
            const hasValidExtension = imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
            if (!hasValidExtension) return false;

            try {
                // 解析URL
                const urlObj = new URL(url);
                // 获取主机名（不包含www）
                const hostname = urlObj.hostname.replace(/^www\./, '');

                // 检查主机名是否匹配允许的网站
                return config.allowedImageHosts.some(host => {
                    // 将主机名和允许的域名都转换为小写进行比较
                    const normalizedHost = host.toLowerCase();
                    const normalizedUrlHost = hostname.toLowerCase();

                    // 如果是完全匹配，直接返回true
                    if (normalizedUrlHost === normalizedHost) return true;

                    // 检查是否是二级域名
                    // 例如：如果允许的域名是 "example.com"，那么 "sub.example.com" 也应该被允许
                    return normalizedUrlHost.endsWith('.' + normalizedHost);
                });
            } catch (e) {
                // 如果URL解析失败，返回false
                return false;
            }
        }


        // 更新玩家信息
        function updateCharacterInfo(signature, avatarUrl) {
            // 确保 LCData 设置存在
            if (!Player.OnlineSharedSettings.LCData) {
                Player.OnlineSharedSettings.LCData = {};
            }

            // 确保 MessageSetting 存在
            if (!Player.OnlineSharedSettings.LCData.MessageSetting) {
                Player.OnlineSharedSettings.LCData.MessageSetting = {};
            }


            Player.OnlineSharedSettings.LCData.MessageSetting.Signature = signature;
            Player.OnlineSharedSettings.LCData.MessageSetting.Avatar = avatarUrl;

            // 同步到服务器
            ServerAccountUpdate.QueueData({ OnlineSharedSettings: Player.OnlineSharedSettings });
            // 同步到所有在线好友
            syncPlayerInfoToAllOnlineFriends();
        }

        // 从本地存储读取消息历史，并清理不需要的项
        async function loadFromLocalAndClean() {
            await LCDataStorage.loadAllPlayerCache(playerCache);
            // 遍历 playerCache，删除不需要的项
            for (const memberNumber in playerCache) {
                // 不是好友
                const notFriend = !Player.FriendList?.includes(Number(memberNumber));
                // 没有置顶
                const notPinned = !messageHistory[memberNumber]?.pinnedTime;
                if (notFriend && notPinned) {
                    // 只有在前两个条件都满足时才查询消息数量
                    const messageCount = await LCDataStorage.getPlayerMessageCount(Number(memberNumber));
                    if (messageCount === 0) {
                        // 删除 playerCache 中的该项
                        delete playerCache[memberNumber];
                        // 同步删除本地存储
                        LCDataStorage.deletePlayerMessages(Number(memberNumber));
                    }
                }
            }
            // 清理后写回playerCache
            await LCDataStorage.replaceAllPlayerCache(playerCache);

            // 重新加载消息历史
            await LCDataStorage.loadRecentMessages(messageHistory, config.maxShowPlayerCountOnLoading, config.maxMessageCount);
        }


        /**
     * 处理输入状态消息
     * @param {Object} data - 接收到的Beep消息数据
     */
        function handleTypingStatusMessage(data) {
            try {
                const statusMessage = JSON.parse(data.Message);
                if (statusMessage.type === "TypingStatus") {
                    // 更新输入状态
                    if (statusMessage.isTyping) {
                        // 添加到正在输入数组
                        if (!typingPlayers.some(item =>
                                                item.Number === data.MemberNumber && item.type === "Beep")) {
                            typingPlayers.push({
                                Number: data.MemberNumber,
                                type: "Beep",
                                timestamp: statusMessage.timestamp
                            });

                            if (selectedSenderNum === data.MemberNumber) {
                                updateChatHeader(data.MemberNumber);
                            }
                        }
                    } else {
                        // 从正在输入数组中移除
                        typingPlayers = typingPlayers.filter(item =>
                                                             !(item.Number === data.MemberNumber && item.type === "Beep"));

                        if (selectedSenderNum === data.MemberNumber) {
                            updateChatHeader(data.MemberNumber);
                        }
                    }
                }
            } catch (parseError) {
                console.error("解析输入状态消息时出错:", parseError);
            }
        }


        /**
         * 处理LCPlayerInfo类型的消息
         * @param {Object} data - 消息数据
         */
        function handlePlayerInfoMessage(data) {
            try {
                const messageSetting = JSON.parse(data.Message);
                if (messageSetting && typeof messageSetting === 'object' && data.MemberNumber) {
                    playerCache[data.MemberNumber] = {
                        Name: typeof messageSetting.Name === 'string' ? messageSetting.Name : '',
                        Nickname: typeof messageSetting.Nickname === 'string' ? messageSetting.Nickname : '',
                        Avatar: typeof messageSetting.Avatar === 'string' ? messageSetting.Avatar : '',
                        Signature: typeof messageSetting.Signature === 'string' ? messageSetting.Signature : '',
                        EnableLianChat: messageSetting.EnableLianChat !== false,
                        UpdateTime: Date.now()
                    };
                    LCDataStorage.updatePlayerCache(data.MemberNumber, playerCache[data.MemberNumber]);
                }
            } catch (e) {
                console.error("处理LCPlayerInfo消息时出错:", e);
            }
        }

        // 同步给所有在线好友
        function syncPlayerInfoToAllOnlineFriends() {
            onlineFriendsCache?.forEach(friend => {
                if (friend && friend.MemberNumber) {
                    syncPlayerInfoToFriend(friend.MemberNumber);
                }
            });
        }

        // 同步给好友PlayerInfo
        function syncPlayerInfoToFriend(memberNumber) {
            if (!memberNumber || memberNumber === Player.MemberNumber) return;

            // 如果已经在队列中，不重复添加
            if (!syncPlayerInfoQueue.includes(memberNumber)) {
                syncPlayerInfoQueue.push(memberNumber);

                // 如果定时器未启动，启动定时器
                if (!syncPlayerInfoTimer) {
                    startSyncPlayerInfoTimer();
                }
            }
        }

        // 启动同步定时器
        function startSyncPlayerInfoTimer() {
            syncPlayerInfoTimer = setInterval(() => {
                if (syncPlayerInfoQueue.length > 0) {
                    const memberNumber = syncPlayerInfoQueue.shift();
                    sendPlayerInfoBeep(memberNumber);
                } else {
                    // 队列为空，停止定时器
                    clearInterval(syncPlayerInfoTimer);
                    syncPlayerInfoTimer = null;
                }
            }, Math.floor(Math.random() * 4000) + 4000); // 随机4-8秒处理一个
        }


        /**
         * 在页面位于后台且开启设置时，发送浏览器通知
         * @param {string} content - 消息内容
         */
        function notifyIfBackground(number, type,content) {
            try {
                if (
                    Player.ExtensionSettings?.LCData?.MessageSetting?.NotifyWhenBackground &&
                    document.hidden &&
                    "Notification" in window
                ) {
                    function sendNotification() {
                        new Notification(getCharacterName(number) + " - " + getMessageTypeText(type), {
                            body: content,
                            icon: getCharacterInfo(number).Avatar || "/favicon.ico"
                        });
                    }

                    if (Notification.permission === "granted") {
                        sendNotification();
                    } else if (Notification.permission !== "denied") {
                        Notification.requestPermission().then(permission => {
                            if (permission === "granted") {
                                sendNotification();
                            }
                        });
                    }
                }
            } catch (e) {
                console.error("发送通知时出错:", e);
                // 忽略通知异常
            }
        }

        // 获取消息类型的显示文本
        function getMessageTypeText(type)
        {
            switch(type) {
                case 'Whisper':
                    return I18nModule.getText('whisper');
                case 'Beep':
                    return I18nModule.getText('beep');
                default:
                    return type || '';
            }
        }


        // 公开接口
        return {
            init: function() {
                // 初始化模块
                messageHistory = {};
                selectedSenderNum = 0;
                onlineFriendsCache = [];

                // 确保没有运行中的刷新定时器
                stopAutoRefresh();
            },

            handleChatRoomMessageDisplay: handleChatRoomMessageDisplay,
            handleChatRoomMessage: handleChatRoomMessage,

            handleBeepMessage: handleBeepMessage,
            handleSentBeepMessage: handleSentBeepMessage,

            toggleMessageDialog: function() {
                if (MessageModule.isMessageDialogVisible()) {
                    hideMessageDialog();
                    updateFloatingButtonState();
                    return false;
                } else {
                    showMessageDialog();
                    updateFloatingButtonState();
                    return true;
                }
            },

            isMessageDialogVisible: function() {
                return !!messageDialog && isDialogVisibleState;
            },

            hasSelectedSender: function() {
                return !!selectedSenderNum;
            },

            // 暴露发送悄悄话函数，以便其他模块可以使用
            sendWhisper: sendWhisper,

            // 获取总未读消息数
            getTotalUnreadCount: getTotalUnreadCount,

            // 手动刷新函数，可以从外部调用
            update: update,

            // 更新好友缓存的接口
            updateOnlineFriendsCache: updateOnlineFriendsCache,

            updateOnlineRoomListData: updateOnlineRoomListData,

            dialogisReadyRevRoomList: dialogisReadyRevRoomList,

            // 消息历史相关接口
            loadFromLocalAndClean: loadFromLocalAndClean,

            handlePlayerInfoMessage: handlePlayerInfoMessage,
            handleTypingStatusMessage: handleTypingStatusMessage,
            syncPlayerInfoToFriend: syncPlayerInfoToFriend
        };
    })();

    // 初始化消息模块
    MessageModule.init();


    mod.hookFunction("FriendListLoadFriendList", 100, (args, next) => {
        let data = args[0];
        MessageModule.updateOnlineFriendsCache(data);
        next(args);
    });


    // 创建通用菜单函数
    function createContextMenu(options, x, y) {
        // 如果已经存在菜单，先移除
        const existingMenu = document.getElementById('contextMenu');
        if (existingMenu) {
            existingMenu.remove();
        }

        // 创建菜单容器
        const menu = document.createElement('div');
        menu.id = 'contextMenu';
        menu.style.position = 'fixed';
        menu.style.backgroundColor = 'white';
        menu.style.border = '1px solid #ddd';
        menu.style.borderRadius = '4px';
        menu.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        menu.style.padding = '5px 0';
        menu.style.zIndex = FloatZindex;
        menu.style.maxHeight = '300px';
        menu.style.overflowY = 'auto';

        // 为每个选项创建菜单项
        options.forEach(option => {
            const menuItem = document.createElement('div');
            menuItem.textContent = option.text;
            menuItem.style.padding = '6px 12px';
            menuItem.style.cursor = 'pointer';
            menuItem.style.color = '#333';

            // 鼠标悬停效果
            menuItem.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#f5f5f5';
            });
            menuItem.addEventListener('mouseout', function() {
                this.style.backgroundColor = 'transparent';
            });

            // 点击事件
            menuItem.addEventListener('click', function() {
                option.action();
                menu.remove();
            });

            menu.appendChild(menuItem);
        });

        // 添加到文档以获取实际尺寸
        document.body.appendChild(menu);
        const menuRect = menu.getBoundingClientRect();

        // 计算最佳显示位置
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 水平位置：尽量居中
        let left = x;
        if (x + menuRect.width > windowWidth) {
            left = windowWidth - menuRect.width;
        }
        if (left < 0) {
            left = 0;
        }

        // 垂直位置：根据点击位置决定向上或向下显示
        let top = y;
        if (y + menuRect.height > windowHeight) {
            // 如果向下显示会超出窗口，则向上显示
            top = y - menuRect.height;
        }
        if (top < 0) {
            // 如果向上显示会超出窗口，则向下显示
            top = 0;
        }

        // 应用计算后的位置
        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;

        // 点击其他地方关闭菜单
        const closeMenu = function(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };

        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 0);

        return menu;
    }

    // 创建通用提示框函数
    function createConfirmDialog(options) {
        // 默认配置
        const defaultOptions = {
            title: 'LianChat',
            content: '',
            confirmText: I18nModule.getText('confirm'),
            cancelText: I18nModule.getText('cancel'),
            onConfirm: () => {},
            onCancel: () => {},
            width: '300px'
        };

        // 合并配置
        const config = { ...defaultOptions, ...options };

        // 如果已经存在对话框，先移除
        const existingDialog = document.getElementById('confirmDialog');
        if (existingDialog) {
            existingDialog.remove();
        }

        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = FloatZindex - 1;
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';

        // 创建对话框容器
        const dialog = document.createElement('div');
        dialog.id = 'confirmDialog';
        dialog.style.backgroundColor = 'white';
        dialog.style.borderRadius = '8px';
        dialog.style.padding = '20px';
        dialog.style.width = config.width;
        dialog.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        dialog.style.position = 'relative';

        // 创建标题
        const title = document.createElement('div');
        title.textContent = config.title;
        title.style.fontSize = '16px';
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '15px';
        title.style.color = '#333';

        // 创建内容
        const content = document.createElement('div');
        content.textContent = config.content;
        content.style.marginBottom = '20px';
        content.style.color = '#666';
        content.style.lineHeight = '1.5';

        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'flex-end';
        buttonContainer.style.gap = '10px';

        // 创建取消按钮
        const cancelButton = document.createElement('button');
        cancelButton.textContent = config.cancelText;
        cancelButton.style.padding = '6px 12px';
        cancelButton.style.border = '1px solid #ddd';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.backgroundColor = 'white';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.color = '#666';

        // 创建确认按钮
        const confirmButton = document.createElement('button');
        confirmButton.textContent = config.confirmText;
        confirmButton.style.padding = '6px 12px';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '4px';
        confirmButton.style.backgroundColor = '#4CAF50';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.color = 'white';

        // 添加按钮悬停效果
        cancelButton.addEventListener('mouseover', () => {
            cancelButton.style.backgroundColor = '#f5f5f5';
        });
        cancelButton.addEventListener('mouseout', () => {
            cancelButton.style.backgroundColor = 'white';
        });

        confirmButton.addEventListener('mouseover', () => {
            confirmButton.style.backgroundColor = '#45a049';
        });
        confirmButton.addEventListener('mouseout', () => {
            confirmButton.style.backgroundColor = '#4CAF50';
        });

        // 添加按钮点击事件
        cancelButton.addEventListener('click', () => {
            config.onCancel();
            overlay.remove();
        });

        confirmButton.addEventListener('click', () => {
            config.onConfirm();
            overlay.remove();
        });

        // 组装对话框
        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(confirmButton);
        dialog.appendChild(title);
        dialog.appendChild(content);
        dialog.appendChild(buttonContainer);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        // 点击遮罩层关闭对话框
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                config.onCancel();
                overlay.remove();
            }
        });

        // 添加ESC键关闭功能
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                config.onCancel();
                overlay.remove();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return {
            close: () => {
                overlay.remove();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
    }

    function createMouseConfirmDialog(options, mouseEvent) {
        // 默认配置
        const defaultOptions = {
            content: '',
            confirmText: I18nModule.getText('confirm'),
            cancelText: I18nModule.getText('cancel'),
            onConfirm: () => {},
            onCancel: () => {},
        };

        // 合并配置
        const config = { ...defaultOptions, ...options };

        // 如果已经存在对话框，先移除
        const existingDialog = document.getElementById('mouseConfirmDialog');
        if (existingDialog) {
            existingDialog.remove();
        }

        // 创建对话框容器
        const dialog = document.createElement('div');
        dialog.id = 'mouseConfirmDialog';
        dialog.style.backgroundColor = 'white';
        dialog.style.borderRadius = '8px';
        dialog.style.padding = '16px';
        dialog.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        dialog.style.position = 'fixed';
        dialog.style.zIndex = FloatZindex || 9999;
        dialog.style.display = 'flex';
        dialog.style.flexDirection = 'column';
        dialog.style.alignItems = 'flex-end';
        dialog.style.width = 'auto'; // 宽度自适应内容
        dialog.style.maxWidth = '80vw'; // 防止过宽

        // 创建内容
        const content = document.createElement('div');
        content.textContent = config.content;
        content.style.marginBottom = '16px';
        content.style.color = '#666';
        content.style.lineHeight = '1.5';
        content.style.whiteSpace = 'nowrap'; // 只显示一行
        content.style.overflow = 'hidden'; // 超出隐藏
        content.style.textOverflow = 'ellipsis'; // 超出显示省略号

        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'flex-end';
        buttonContainer.style.gap = '10px';

        // 创建取消按钮
        const cancelButton = document.createElement('button');
        cancelButton.textContent = config.cancelText;
        cancelButton.style.padding = '6px 12px';
        cancelButton.style.border = '1px solid #ddd';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.backgroundColor = 'white';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.color = '#666';

        // 创建确认按钮
        const confirmButton = document.createElement('button');
        confirmButton.textContent = config.confirmText;
        confirmButton.style.padding = '6px 12px';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '4px';
        confirmButton.style.backgroundColor = '#4CAF50';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.color = 'white';

        // 添加按钮悬停效果
        cancelButton.addEventListener('mouseover', () => {
            cancelButton.style.backgroundColor = '#f5f5f5';
        });
        cancelButton.addEventListener('mouseout', () => {
            cancelButton.style.backgroundColor = 'white';
        });

        confirmButton.addEventListener('mouseover', () => {
            confirmButton.style.backgroundColor = '#45a049';
        });
        confirmButton.addEventListener('mouseout', () => {
            confirmButton.style.backgroundColor = '#4CAF50';
        });

        // 添加按钮点击事件
        cancelButton.addEventListener('click', () => {
            config.onCancel();
            dialog.remove();
        });

        confirmButton.addEventListener('click', () => {
            config.onConfirm();
            dialog.remove();
        });

        // 组装对话框
        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(confirmButton);
        dialog.appendChild(content);
        dialog.appendChild(buttonContainer);
        document.body.appendChild(dialog);

        // 计算对话框出现位置（鼠标位置，且鼠标在确定按钮上）
        let x = mouseEvent.clientX;
        let y = mouseEvent.clientY;

        // 先让dialog渲染出来，获取宽高
        const dialogRect = dialog.getBoundingClientRect();
        // 让确定按钮在鼠标下方
        const confirmBtnRect = confirmButton.getBoundingClientRect();
        // 计算偏移量，使鼠标在确定按钮中心
        const offsetX = x - (dialogRect.left + dialogRect.width - confirmBtnRect.width / 2);
        const offsetY = y - (dialogRect.top + dialogRect.height - confirmBtnRect.height / 2);

        // 让对话框右下角的确定按钮中心对准鼠标
        dialog.style.left = (x - dialogRect.width + confirmBtnRect.width / 2) + 'px';
        dialog.style.top = (y - dialogRect.height + confirmBtnRect.height / 2) + 'px';

        // 防止超出窗口
        const maxLeft = window.innerWidth - dialogRect.width - 8;
        const maxTop = window.innerHeight - dialogRect.height - 8;
        if (parseInt(dialog.style.left) < 8) dialog.style.left = '8px';
        if (parseInt(dialog.style.top) < 8) dialog.style.top = '8px';
        if (parseInt(dialog.style.left) > maxLeft) dialog.style.left = maxLeft + 'px';
        if (parseInt(dialog.style.top) > maxTop) dialog.style.top = maxTop + 'px';

        // ESC键关闭
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                config.onCancel();
                dialog.remove();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // 失焦关闭
        setTimeout(() => {
            document.addEventListener('mousedown', function onDocClick(e) {
                if (!dialog.contains(e.target)) {
                    config.onCancel();
                    dialog.remove();
                    document.removeEventListener('mousedown', onDocClick);
                    document.removeEventListener('keydown', handleKeyDown);
                }
            });
        }, 0);

        // 自动让鼠标悬停在确定按钮上
        confirmButton.focus();

        return {
            close: () => {
                dialog.remove();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
    }

    // 进入邀请的房间
    function enterRoom(roomName) {
        ChatRoomLeave();
        CommonSetScreen("Online", "ChatSearch");
        ChatSearchLastQueryJoinTime = CommonTime();
        ChatSearchLastQueryJoin = roomName;
        ServerSend("ChatRoomJoin", { Name: roomName });
        ChatRoomPingLeashedPlayers();
    }



    // 创建悬浮消息按钮
    function createFloatingMessageButton() {
        // 如果已经存在，则不重复创建
        if (document.getElementById('floatingMessageButton')) return;

        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'floatingMessageButton';
        // 外观改由 .lc-fab 类（STEP2 注入）提供；仅保留功能性定位相关
        buttonContainer.className = 'lc-fab';
        buttonContainer.style.position = 'fixed';
        buttonContainer.style.zIndex = FloatZindex;

        // 设置初始位置（统一 left/top 定位，与 STEP2 四边吸附一致，避免 right/bottom 冲突导致点击后跳位）
        const initialPosition = getStoredButtonPosition();
        buttonContainer.style.left = initialPosition.left;
        buttonContainer.style.top = initialPosition.top;

        // 更新按钮状态
        updateFloatingButtonState();

        // 添加拖动功能
        let isDraggingButton = false;
        let dragStartX, dragStartY;
        let buttonStartLeft, buttonStartTop; // 拖拽开始时按钮的位置
        let hasMoved = false; // 确保在函数作用域内定义
        let isTouchEvent = false; // 标记是否为触摸事件

        // 获取坐标的辅助函数（支持鼠标和触摸事件）
        function getClientX(e) {
            return e.touches ? e.touches[0].clientX : e.clientX;
        }

        function getClientY(e) {
            return e.touches ? e.touches[0].clientY : e.clientY;
        }

        // 鼠标事件
        buttonContainer.addEventListener('mousedown', function(e) {
            isTouchEvent = false;
            isDraggingButton = true;
            hasMoved = false; // 重置移动标记
            dragStartX = e.clientX;
            dragStartY = e.clientY;

            // 记录拖拽开始时按钮的位置
            const button = document.getElementById('floatingMessageButton');
            if (button) {
                buttonStartLeft = parseFloat(button.style.left) || 0;
                buttonStartTop = parseFloat(button.style.top) || 0;
            }

            this.style.transition = 'none'; // 拖动时禁用过渡效果

            // 添加鼠标移动和释放事件
            document.addEventListener('mousemove', handleButtonDrag);
            document.addEventListener('mouseup', stopButtonDrag);

            e.preventDefault(); // 防止文本选择
        });

        // 触摸事件
        buttonContainer.addEventListener('touchstart', function(e) {
            isTouchEvent = true;
            isDraggingButton = true;
            hasMoved = false; // 重置移动标记
            const touch = e.touches[0];
            dragStartX = touch.clientX;
            dragStartY = touch.clientY;

            // 记录拖拽开始时按钮的位置
            const button = document.getElementById('floatingMessageButton');
            if (button) {
                buttonStartLeft = parseFloat(button.style.left) || 0;
                buttonStartTop = parseFloat(button.style.top) || 0;
            }

            this.style.transition = 'none'; // 拖动时禁用过渡效果

            // 添加触摸移动和释放事件
            document.addEventListener('touchmove', handleButtonDrag, { passive: false });
            document.addEventListener('touchend', stopButtonDrag);
            document.addEventListener('touchcancel', stopButtonDrag);

            e.preventDefault(); // 防止页面滚动
        });

        function handleButtonDrag(e) {
            if (!isDraggingButton) return;

            const clientX = getClientX(e);
            const clientY = getClientY(e);

            // 计算移动距离
            const moveX = Math.abs(clientX - dragStartX);
            const moveY = Math.abs(clientY - dragStartY);

            // 如果移动超过阈值，标记为已移动
            if (moveX > 3 || moveY > 3) {
                hasMoved = true;
            }

            const button = document.getElementById('floatingMessageButton');
            if (!button) return;

            // 获取按钮尺寸
            const rect = button.getBoundingClientRect();
            const buttonWidth = rect.width;
            const buttonHeight = rect.height;

            // 基于初始按钮位置和初始触摸点计算新位置（绝对位置计算，避免累加误差）
            const deltaX = clientX - dragStartX;
            const deltaY = clientY - dragStartY;

            // 计算新位置（基于初始位置）
            const newLeft = buttonStartLeft + deltaX;
            const newTop = buttonStartTop + deltaY;

            // 确保按钮不会超出视口
            const maxX = window.innerWidth - buttonWidth;
            const maxY = window.innerHeight - buttonHeight;

            // 约束到边界内
            const boundedLeft = Math.max(0, Math.min(newLeft, maxX));
            const boundedTop = Math.max(0, Math.min(newTop, maxY));

            // 更新位置（left/top 定位，与 STEP2 四边吸附一致）
            button.style.left = `${boundedLeft}px`;
            button.style.top = `${boundedTop}px`;

            // 触摸事件时防止页面滚动
            if (isTouchEvent) {
                e.preventDefault();
            }
        }

        function stopButtonDrag(e) {
            if (isDraggingButton) {
                isDraggingButton = false;
                const button = document.getElementById('floatingMessageButton');
                if (button) {
                    button.style.transition = 'transform 0.2s'; // 恢复过渡效果

                    const shouldSnap = Player.ExtensionSettings?.LCData?.MessageSetting?.SnapFloatingButtonToEdge !== false;
                    if (hasMoved && shouldSnap && typeof snapFabToNearestEdge === 'function') {
                        snapFabToNearestEdge(button);
                    } else {
                        storeButtonPosition({ left: button.style.left, top: button.style.top });
                    }

                    // 只有在没有移动的情况下才触发点击事件
                    if (!hasMoved) {
                        // 检查点击是否在按钮或其子元素上
                        let targetElement = e.target;
                        if (isTouchEvent && e.changedTouches && e.changedTouches[0]) {
                            // 触摸事件使用 changedTouches
                            const touch = e.changedTouches[0];
                            targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
                        }

                        let isButtonOrChild = false;
                        // 检查点击的元素是否是按钮或其子元素
                        while (targetElement) {
                            if (targetElement === button) {
                                isButtonOrChild = true;
                                break;
                            }
                            targetElement = targetElement.parentElement;
                        }

                        if (isButtonOrChild) {
                            MessageModule.toggleMessageDialog();
                            updateFloatingButtonState();
                        }
                    }
                }

                // 移除事件监听器
                if (isTouchEvent) {
                    document.removeEventListener('touchmove', handleButtonDrag);
                    document.removeEventListener('touchend', stopButtonDrag);
                    document.removeEventListener('touchcancel', stopButtonDrag);
                } else {
                    document.removeEventListener('mousemove', handleButtonDrag);
                    document.removeEventListener('mouseup', stopButtonDrag);
                }
            }
        }

        // 添加到文档
        document.body.appendChild(buttonContainer);
        // Step2：首次创建即套用 .lc-fab 外观（SVG 图标 + 呼吸环 + 入场），观察者负责后续持久化
        try { if (typeof reskinFab === 'function') reskinFab(buttonContainer); } catch (e) {}

        // 添加窗口大小变化监听器，保持相对位置不变
        window.addEventListener('resize', updateButtonPosition);

        // 添加横竖屏切换监听器（移动端）
        window.addEventListener('orientationchange', function() {
            // 延迟执行，等待屏幕方向变化完成
            setTimeout(function() {
                updateButtonPosition();
            }, 100);
        });
    }

    // 更新按钮状态（颜色、图标、未读数）—— Step2：改用 .lc-* 类，零内联色值
    function updateFloatingButtonState() {
        const button = document.getElementById('floatingMessageButton');
        if (!button) return;

        const unreadCount = MessageModule.getTotalUnreadCount();
        // 打开态切换为糖果强调色（由 .lc-fab--open 类提供，零内联）
        button.classList.toggle('lc-fab--open', !!MessageModule.isMessageDialogVisible());
        // 来消息时启用醒目脉冲（呼吸光晕 + 加速光环 + 徽标弹入），零内联
        button.classList.toggle('lc-fab--unread', unreadCount > 0);

        // 清空并重建为 SVG 图标 + 呼吸环 + 未读徽标（.lc-* 类，零内联色值）
        button.innerHTML = '';
        const icon = document.createElement('span');
        icon.className = 'lc-fab-ico lc-ico lc-ico--lg';
        icon.innerHTML = LC_ICONS.chat;
        button.appendChild(icon);
        if (unreadCount > 0) {
            const badge = document.createElement('span');
            badge.className = 'lc-fab-badge';
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount.toString();
            button.appendChild(badge);
        }
        const ring = document.createElement('span');
        ring.className = 'lc-fab-ring';
        button.appendChild(ring);
    }

    // 约束按钮位置到可视区域内
    function constrainButtonToViewport(button) {
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const buttonWidth = rect.width;
        const buttonHeight = rect.height;

        // 获取当前按钮位置（left/top 定位）
        const currentLeft = parseFloat(button.style.left) || 0;
        const currentTop = parseFloat(button.style.top) || 0;

        // 计算边界
        const maxX = window.innerWidth - buttonWidth;
        const maxY = window.innerHeight - buttonHeight;

        // 约束位置
        const boundedLeft = Math.max(0, Math.min(currentLeft, maxX));
        const boundedTop = Math.max(0, Math.min(currentTop, maxY));

        // 如果位置需要调整，更新按钮位置
        if (boundedLeft !== currentLeft || boundedTop !== currentTop) {
            button.style.left = `${boundedLeft}px`;
            button.style.top = `${boundedTop}px`;
            // 重新存储调整后的位置
            storeButtonPosition({
                left: button.style.left,
                top: button.style.top
            });
        }
    }

    // 更新按钮位置（窗口大小变化时）
    function updateButtonPosition() {
        const button = document.getElementById('floatingMessageButton');
        if (!button) return;
        // left/top 定位：窗口变化时仅做视口内约束（防横竖屏/缩放转出屏幕）
        constrainButtonToViewport(button);
    }

    // 存储按钮位置（统一 left/top，与 STEP2 四边吸附共用同一快照键，避免定位模型冲突）
    function storeButtonPosition(position) {
        try {
            localStorage.setItem('floatingMessageButtonPositionSnap', JSON.stringify({
                left: parseFloat(position.left) || 0,
                top: parseFloat(position.top) || 0
            }));
        } catch (e) {}
    }

    // 获取存储的按钮位置（统一 left/top；无记录时默认右下角）
    function getStoredButtonPosition() {
        try {
            const stored = localStorage.getItem('floatingMessageButtonPositionSnap');
            if (stored) {
                const p = JSON.parse(stored);
                if (typeof p.left === 'number' && typeof p.top === 'number') {
                    return { left: p.left + 'px', top: p.top + 'px' };
                }
            }
        } catch (e) {}
        // 默认右下角（58×58 按钮，距边 20px）
        return { left: (window.innerWidth - 78) + 'px', top: (window.innerHeight - 78) + 'px' };
    }

    // 添加一个全局变量来存储定时器ID
    let floatingButtonUpdateInterval = null;

    // 修改 initFloatingMessageButton 函数
    function initFloatingMessageButton() {
        // 检查消息功能是否启用
        if (Player.OnlineSharedSettings.LCData?.MessageSetting?.EnableLianChat !== false) {
            createFloatingMessageButton();

            // 如果定时器不存在，则创建新的定时器
            if (!floatingButtonUpdateInterval) {
                floatingButtonUpdateInterval = setInterval(updateFloatingButtonState, 1000);
            }
        }
    }

    // 添加清理定时器的函数
    function cleanupFloatingButtonInterval() {
        if (floatingButtonUpdateInterval) {
            clearInterval(floatingButtonUpdateInterval);
            floatingButtonUpdateInterval = null;
        }
    }


    function CheckOnlineLCSetting()
    {
        Player.OnlineSharedSettings ??= {};
        Player.OnlineSharedSettings.LCData ??= {};
        Player.OnlineSharedSettings.LCData.MessageSetting ??= {};
        if (Player.OnlineSharedSettings.LCData.MessageSetting.EnableLianChat == null) {
            Player.OnlineSharedSettings.LCData.MessageSetting.EnableLianChat = true;
            ServerAccountUpdate.QueueData({ OnlineSharedSettings: Player.OnlineSharedSettings });
        }

        Player.ExtensionSettings ??= {};

        // 从旧位置 OnlineSettings 迁移数据到 ExtensionSettings
        if (Player.OnlineSettings?.LCData?.MessageSetting && !Player.ExtensionSettings.LCData) {
            Player.ExtensionSettings.LCData = Player.OnlineSettings.LCData;
            delete Player.OnlineSettings.LCData;
            ServerPlayerExtensionSettingsSync('LCData');
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
        }

        // 逐字段补全，避免覆盖已有数据
        Player.ExtensionSettings.LCData ??= {};
        Player.ExtensionSettings.LCData.MessageSetting ??= {};
        Player.ExtensionSettings.LCData.MessageSetting.HidePrivateChat ??= HidePrivateChatEnum.NONE;
        Player.ExtensionSettings.LCData.MessageSetting.NotifyWhenBackground ??= false;
        Player.ExtensionSettings.LCData.MessageSetting.SnapFloatingButtonToEdge ??= true;
        Player.ExtensionSettings.LCData.MessageSetting.PinnedRooms ??= {};
        Player.ExtensionSettings.LCData.MessageSetting.SetRoomSpace ??= 'X';
    }

    function InitAll()
    {
        // 清理旧的定时器
        cleanupFloatingButtonInterval();
        CheckOnlineLCSetting();

        LCDataStorage = LCDataStorageModule("LCDB_" + Player.MemberNumber);
        LCDataStorage.initDB().then(() => {
            // 初始化时加载消息历史
            MessageModule.loadFromLocalAndClean().then(() => {
                // 延迟初始化，确保DOM已完全加载
                setTimeout(initFloatingMessageButton, 1000);
            });
        }).catch(console.error);
    }

    // 游戏已经初始化
    if(CurrentScreen != null
       && CurrentScreen !== 'Login')
    {
        InitAll();
    }
    else
    {
        // 在游戏退出时清理定时器
        mod.hookFunction("LoginResponse", 0, (args, next) => {
            next(args);
            InitAll();
        });
    }

    window.LianChat = MOD_VERSION;
    console.log("[LianChat] Load Success");

})();
