// ==UserScript==
// @name         BC Lian 换装优化
// @namespace    https://www.bondageprojects.com/
// @version      0.1.0
// @description  BC换装操作流程优化插件
// @author       XinLian
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @match https://*.bondage-asia.com/Club/R*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    // =======================================================================================
    var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

    const MOD_NAME = "换装优化";
    const MOD_FULL_NAME = "BC换装优化";
    const MOD_VERSION = "0.1.0";

    const mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });

    // =======================================================================================
    const w = window;

    /**
     * 取 BC 的顶层全局。
     * 本体有一批全局是用 let / const 声明的（MainCanvas、CanvasUpperOverflow、
     * DrawCacheImage 等），这类声明不会挂到 window 上，只能通过词法作用域访问。
     * 更糟的是 index.html 里有 <canvas id="MainCanvas">，浏览器的命名访问会让
     * window.MainCanvas 返回那个 DOM 元素，静默拿到错误的对象。
     * 这里统一用间接 eval 在全局作用域里求值，var / let / const 都能正确取到。
     * @param {string} name - 全局变量名
     * @returns {any} 取不到时返回 undefined
     */
    function bcGlobal(name) {
        try {
            return (0, eval)(`typeof ${name} !== "undefined" ? ${name} : undefined`);
        } catch {
            return undefined;
        }
    }
    // =======================================================================================

    const SETTINGS_KEY = "LianDressOpt";

    // 图层变换配置。范围与步长对齐本体 Layering.js 的 _GetTabContents
    // 存储位置为 Property.Layer{Prop}[layerName]，绘制侧在 CommonDraw.getTransform 读取：
    // 平移/旋转与物品级值相加，缩放与物品级值相乘
    const TRANSFORM_GROUPS = [
        {
            key: "Translation",
            label: "位移",
            unit: "px",
            props: [
                { prop: "TranslationX", axis: "X" },
                { prop: "TranslationY", axis: "Y" }
            ],
            min: -500, max: 500, step: 1, coarseStep: 10, precision: 1, defaultValue: 0
        },
        {
            key: "Scale",
            // 下限用 0.01：本体 UI 初始 min 是 0.1，但 _UpdateLimits 与
            // CommonDraw 的实际下限都是 0.01，这里放开到真实限制
            label: "缩放",
            props: [
                { prop: "ScaleX", axis: "X" },
                { prop: "ScaleY", axis: "Y" }
            ],
            min: 0.01, max: 3.0, step: 0.01, coarseStep: 0.1, precision: 2, defaultValue: 1.0
        },
        {
            key: "Rotation",
            // 单位为度，GLDraw 按 Rotation * PI / 180 换算。
            // 支点是整幅贴图的中心（tex.width/2, tex.height/2），不是图案自身中心，
            // 所以离画布中心越远的图层，同样角度下被"甩"出的位移越大。
            // 步长压到 0.1 度以便精细控制。
            label: "旋转",
            unit: "°",
            props: [
                { prop: "Rotation", axis: "" }
            ],
            min: -180, max: 180, step: 0.1, coarseStep: 1, precision: 2, defaultValue: 0
        }
    ];

    // 包围框句柄的屏幕半径（主画布坐标，2000x1000 空间）
    const GIZMO_HANDLE_R = 9;
    // 旋转句柄距包围框上边的距离
    const GIZMO_ROTATE_DIST = 46;
    // 八方向缩放句柄。x/y 取值 -1 / 0 / 1，表示所在边角
    const GIZMO_HANDLES = [
        { id: "nw", x: -1, y: -1 }, { id: "n", x: 0, y: -1 }, { id: "ne", x: 1, y: -1 },
        { id: "e", x: 1, y: 0 }, { id: "se", x: 1, y: 1 }, { id: "s", x: 0, y: 1 },
        { id: "sw", x: -1, y: 1 }, { id: "w", x: -1, y: 0 }
    ];

    const DEFAULT_SETTINGS = {
        WheelScrollEnabled: true,
        ShowThumbnailEnabled: true,
        ItemHighlightEnabled: true,
        UseAdjustmentWindow: true
    };

    /**
     * 读取设置。优先 ExtensionSettings，回退到旧的 OnlineSettings 并顺带迁移。
     * @returns {typeof DEFAULT_SETTINGS}
     */
    function loadSettings() {
        const stored = Player?.ExtensionSettings?.[SETTINGS_KEY]
            ?? Player?.OnlineSettings?.[SETTINGS_KEY];
        const result = Object.assign({}, DEFAULT_SETTINGS);
        if (stored && typeof stored === "object") {
            for (const key of Object.keys(DEFAULT_SETTINGS)) {
                if (typeof stored[key] === "boolean") result[key] = stored[key];
            }
        }
        return result;
    }

    /**
     * 写入设置。只同步自己这一个键，避免覆盖其他插件的数据。
     * @param {typeof DEFAULT_SETTINGS} settings
     */
    function saveSettings(settings) {
        if (!Player) return;
        Player.ExtensionSettings ??= {};
        Player.ExtensionSettings[SETTINGS_KEY] = Object.assign({}, settings);
        if (typeof ServerPlayerExtensionSettingsSync === "function") {
            ServerPlayerExtensionSettingsSync(SETTINGS_KEY);
        }
        // 清理旧位置，消除 BC 登录时的 "extra keys in OnlineSettings" 警告
        if (Player.OnlineSettings && SETTINGS_KEY in Player.OnlineSettings) {
            delete Player.OnlineSettings[SETTINGS_KEY];
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
        }
    }

    
    
    // =======================================================================================

    /**
     * 换装优化管理器
     * 用于优化换衣服的操作流程
     */
    class DressOptimizationManager {
        constructor() {
            this.isEnabled = true; // 默认启用滚轮翻页
            this.wheelScrollEnabled = true; // 滚轮翻页功能开关
            this.showThumbnailEnabled = true; // 显示缩略图功能开关
            this.thumbnailCache = new Map(); // 缩略图路径缓存
            this.itemHighlightEnabled = true; // 服装提示功能开关
            this.hoveredGroupName = null; // 当前悬浮的部件组名
            this.highlightTimer = null; // 闪烁定时器
            this.hiddenGroups = new Set(); // 临时隐藏的部件组
        }

        /**
         * 初始化
         */
        init() {
            console.log('DressOptimizationManager: 初始化');
            return true;
        }

        /**
         * 设置是否启用
         */
        setEnabled(enabled) {
            this.isEnabled = enabled;
            console.log(`DressOptimizationManager: ${enabled ? '启用' : '禁用'}`);
        }

        /**
         * 设置滚轮翻页是否启用
         */
        setWheelScrollEnabled(enabled) {
            this.wheelScrollEnabled = enabled;
            console.log(`DressOptimizationManager: 滚轮翻页 ${enabled ? '启用' : '禁用'}`);
        }

        /**
         * 设置显示缩略图是否启用
         */
        setShowThumbnailEnabled(enabled) {
            this.showThumbnailEnabled = enabled;
            console.log(`DressOptimizationManager: 显示缩略图 ${enabled ? '启用' : '禁用'}`);
        }

        /**
         * 获取服装的预览图片路径
         * @param {Item} item - 服装物品
         * @param {Character} C - 角色
         * @returns {string|null} - 预览图片路径，如果无法获取则返回null
         */
        getItemPreviewPath(item, C) {
            if (!item || !item.Asset) {
                return null;
            }

            try {
                // 生成缓存键
                const cacheKey = `${item.Asset.Name}_${item.Asset.Group.Name}_${item.Color || 'default'}`;
                
                // 检查缓存
                if (this.thumbnailCache.has(cacheKey)) {
                    return this.thumbnailCache.get(cacheKey);
                }

                // 获取预览图片路径
                if (typeof AssetGetPreviewPath === 'function' && typeof item.Asset.DynamicPreviewImage === 'function') {
                    const DynamicPreviewImage = C ? item.Asset.DynamicPreviewImage(C) : "";
                    const Path = `${AssetGetPreviewPath(item.Asset)}/${item.Asset.Name}${DynamicPreviewImage}.png`;
                    
                    // 检查是否是隐藏物品
                    if (typeof CharacterAppearanceItemIsHidden === 'function' && 
                        CharacterAppearanceItemIsHidden(item.Asset.Name, item.Asset.DynamicGroupName || item.Asset.Group.Name)) {
                        // 隐藏物品使用隐藏图标
                        this.thumbnailCache.set(cacheKey, "Icons/HiddenItem.png");
                        return "Icons/HiddenItem.png";
                    }
                    
                    // 缓存路径
                    this.thumbnailCache.set(cacheKey, Path);
                    return Path;
                }
            } catch (error) {
                console.warn('DressOptimizationManager: 获取预览图片路径失败', error);
            }
            
            return null;
        }

        /**
         * 检查图片是否存在且可加载
         * @param {string} path - 图片路径
         * @returns {boolean} - 图片是否存在且可加载
         */
        isImageAvailable(path) {
            if (!path) {
                return false;
            }

            try {
                if (typeof DrawGetImage === 'function') {
                    const img = DrawGetImage(path);
                    if (img instanceof HTMLImageElement) {
                        // 检查图片是否加载完成且有有效尺寸
                        return img.complete && img.naturalWidth > 0;
                    }
                }
            } catch (error) {
                // 图片加载失败
                return false;
            }
            
            return false;
        }

        /**
         * 清除缩略图缓存
         */
        clearThumbnailCache() {
            this.thumbnailCache.clear();
        }

        /**
         * 设置服装提示是否启用
         */
        setItemHighlightEnabled(enabled) {
            this.itemHighlightEnabled = enabled;
            console.log(`DressOptimizationManager: 服装提示 ${enabled ? '启用' : '禁用'}`);
            if (!enabled) {
                this.stopHighlight();
            }
        }

        /**
         * 开始闪烁效果（部件）
         * @param {string} groupName - 部件组名
         */
        startHighlight(groupName) {
            // 如果已经在闪烁同一个部件，不重复开始
            if (this.hoveredGroupName === groupName && this.highlightTimer !== null) {
                return;
            }

            // 停止之前的闪烁
            this.stopHighlight();

            // 设置新的悬浮部件
            this.hoveredGroupName = groupName;
            this.hiddenGroups.clear();

            // 持续闪烁：消失0.2s，显示0.8s，交替进行
            let isHidden = false; // 当前是否隐藏状态

            const blink = () => {
                // 检查是否还在悬浮同一个部件（如果部件改变了，停止闪烁）
                if (this.hoveredGroupName !== groupName) {
                    this.hiddenGroups.clear();
                    this.highlightTimer = null;
                    return;
                }

                // 切换显示/隐藏状态
                isHidden = !isHidden;
                
                if (isHidden) {
                    // 隐藏部件
                    this.hiddenGroups.add(groupName);
                } else {
                    // 显示部件
                    this.hiddenGroups.delete(groupName);
                }

                // 重新绘制角色预览
                if (typeof CharacterAppearanceSelection !== 'undefined' && CharacterAppearanceSelection) {
                    if (typeof CharacterLoadCanvas === 'function') {
                        CharacterLoadCanvas(CharacterAppearanceSelection);
                    }
                }

                // 根据当前状态设置下一次切换的时间
                // 隐藏状态持续0.2s，显示状态持续0.8s
                const nextDuration = isHidden ? 200 : 800;
                this.highlightTimer = setTimeout(blink, nextDuration);
            };

            // 开始第一次闪烁（先隐藏）
            isHidden = true;
            this.hiddenGroups.add(groupName);
            if (typeof CharacterAppearanceSelection !== 'undefined' && CharacterAppearanceSelection) {
                if (typeof CharacterLoadCanvas === 'function') {
                    CharacterLoadCanvas(CharacterAppearanceSelection);
                }
            }
            this.highlightTimer = setTimeout(blink, 200); // 0.2s后切换到显示
        }

        /**
         * 停止闪烁效果
         */
        stopHighlight() {
            if (this.highlightTimer !== null) {
                clearTimeout(this.highlightTimer);
                this.highlightTimer = null;
            }

            // 恢复显示。闪烁只走 hiddenGroups + CharacterAppearanceVisible hook，
            // 不碰 Property.Hide —— 后者会被 ServerAppearanceBundle 同步到服务器
            this.hiddenGroups.clear();

            // 刷新角色显示
            if (typeof CharacterAppearanceSelection !== 'undefined' && CharacterAppearanceSelection &&
                typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(CharacterAppearanceSelection);
            }

            this.hoveredGroupName = null;
        }

        /**
         * 检查部件是否应该被隐藏（用于闪烁效果）
         * @param {string} groupName - 部件组名
         * @returns {boolean} - 是否应该隐藏
         */
        isGroupHidden(groupName) {
            return this.hiddenGroups.has(groupName);
        }


        /**
         * 处理换装界面的滚轮翻页
         * @param {WheelEvent} event - 滚轮事件
         */
        handleAppearanceWheelScroll(event) {
            if (!this.isEnabled || !this.wheelScrollEnabled) {
                return false;
            }

            // 检查当前屏幕是否是换装界面
            if (typeof CurrentScreen !== 'undefined' && CurrentScreen === 'Appearance') {
                // 检查 CharacterAppearanceMode 是否存在
                if (typeof CharacterAppearanceMode === 'undefined' || typeof CharacterAppearanceSelection === 'undefined') {
                    return false;
                }

                const C = CharacterAppearanceSelection;

                // 根据不同的模式处理滚轮翻页
                if (CharacterAppearanceMode === '') {
                    // 常规模式：组列表翻页
                    // 组列表区域大约在 1120-1910, 145-900
                    if (MouseIn(1120, 145, 800, 800)) {
                        if (typeof CharacterAppearanceGroups !== 'undefined' &&
                            typeof CharacterAppearanceNumGroupPerPage !== 'undefined') {
                            
                            const totalItems = CharacterAppearanceGroups.length;
                            const itemsPerPage = CharacterAppearanceNumGroupPerPage;
                            
                            if (totalItems > itemsPerPage) {
                                // 调用翻页按钮的逻辑，确保其他插件的hook也能触发
                                if (event.deltaY < 0) {
                                    // 向上滚动，向前翻页（Prev按钮）
                                    if (typeof CharacterAppearanceMoveGroup === 'function') {
                                        CharacterAppearanceMoveGroup(C, -1);
                                        return true;
                                    }
                                } else if (event.deltaY > 0) {
                                    // 向下滚动，向后翻页（Next按钮）
                                    if (typeof CharacterAppearanceMoveGroup === 'function') {
                                        CharacterAppearanceMoveGroup(C, 1);
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                } else if (CharacterAppearanceMode === 'Cloth') {
                    // 服装选择模式：服装预览翻页
                    // 服装预览区域在 1250-1800, 125-725
                    if (MouseIn(1250, 125, 550, 600)) {
                        if (typeof DialogInventory !== 'undefined' &&
                            typeof CharacterAppearanceNumClothPerPage !== 'undefined' &&
                            typeof DialogInventoryOffset !== 'undefined') {
                            
                            const totalItems = DialogInventory.length;
                            const itemsPerPage = CharacterAppearanceNumClothPerPage;
                            
                            if (totalItems > itemsPerPage) {
                                // 检查是否有Prev/Next按钮（确保翻页功能可用）
                                if (typeof AppearanceMenu !== 'undefined' && AppearanceMenu.length > 0) {
                                    const hasPrevNext = AppearanceMenu.includes('Prev') || AppearanceMenu.includes('Next');
                                    
                                    if (hasPrevNext) {
                                        // 使用与AppearanceMenuClick中完全相同的翻页逻辑
                                        // 这样可以确保行为一致，虽然不会触发其他插件的hook
                                        const offset = event.deltaY < 0 ? -itemsPerPage : itemsPerPage;
                                        DialogInventoryOffset = DialogInventoryOffset + offset;
                                        if (DialogInventoryOffset >= DialogInventory.length) DialogInventoryOffset = 0;
                                        if (DialogInventoryOffset < 0) {
                                            DialogInventoryOffset = Math.floor((DialogInventory.length - 1) / itemsPerPage) * itemsPerPage;
                                        }
                                        
                                        // 调用AppearancePreviewBuild来更新预览
                                        if (typeof AppearancePreviewBuild === 'function') {
                                            AppearancePreviewBuild(C, true);
                                        }
                                        
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
                // Wardrobe和Permissions模式不需要滚轮翻页
            }
            
            return false; // 未处理，继续默认行为
        }
    }

    // 创建换装优化管理器实例
    const dressOptimizationManager = new DressOptimizationManager();

    /**
     * 把设置应用到管理器
     * @param {typeof DEFAULT_SETTINGS} settings
     */
    function applySettings(settings) {
        dressOptimizationManager.setWheelScrollEnabled(settings.WheelScrollEnabled);
        dressOptimizationManager.setShowThumbnailEnabled(settings.ShowThumbnailEnabled);
        dressOptimizationManager.setItemHighlightEnabled(settings.ItemHighlightEnabled);
    }

    // =======================================================================================
    // Hook 函数
    // =======================================================================================

    // Hook CommonMouseWheel 函数，实现换装界面的滚轮翻页
    mod.hookFunction("CommonMouseWheel", 1, (args, next) => {
        const [event] = args;
        
        // 尝试处理换装界面的滚轮翻页
        if (dressOptimizationManager.handleAppearanceWheelScroll(event)) {
            // 如果已处理，不调用原函数
            return;
        }
        
        // 否则调用原函数
        return next(args);
    });

    // Hook CharacterAppearanceVisible 函数，在绘制前检查是否需要隐藏部件（用于闪烁效果）
    // 注意：ItemColor界面的闪烁现在使用透明度，不再需要这个hook
    mod.hookFunction("CharacterAppearanceVisible", 1, (args, next) => {
        // 如果启用了服装提示功能
        if (dressOptimizationManager.itemHighlightEnabled && typeof args !== 'undefined' && args.length >= 2) {
            const C = args[0];
            const assetName = args[1];
            const groupName = args[2];
            
            // 检查是否在Appearance界面（ItemColor界面现在使用透明度闪烁，不再需要这个hook）
            const isAppearanceMode = typeof CharacterAppearanceSelection !== 'undefined' && CharacterAppearanceSelection === C;
            
            // 在Appearance界面中，使用hiddenGroups来隐藏
            if (isAppearanceMode &&
                dressOptimizationManager.hoveredGroupName &&
                groupName === dressOptimizationManager.hoveredGroupName &&
                dressOptimizationManager.isGroupHidden(groupName)) {
                // 返回 false 来隐藏部件
                return false;
            }
        }
        
        // 否则调用原函数
        return next(args);
    });


    // Hook AppearanceRun 函数，实现分层按钮显示缩略图和服装提示检测
    mod.hookFunction("AppearanceRun", 1, (args, next) => {
        // 检测鼠标悬浮并触发闪烁（在绘制之前）
        if (dressOptimizationManager.itemHighlightEnabled &&
            typeof CurrentScreen !== 'undefined' && CurrentScreen === 'Appearance' &&
            typeof CharacterAppearanceSelection !== 'undefined') {
            
            // 检查是否在扩展物品界面或其他模式
            const hasDialogFocusItem = typeof DialogFocusItem !== 'undefined' && DialogFocusItem != null;
            const isOtherMode = typeof CharacterAppearanceMode !== 'undefined' && CharacterAppearanceMode !== '';
            
            // 如果进入了其他模式或扩展物品界面，停止之前的闪烁
            if (isOtherMode || hasDialogFocusItem) {
                if (dressOptimizationManager.hoveredGroupName !== null) {
                    dressOptimizationManager.stopHighlight();
                }
            }
            
            // 常规模式：检测鼠标悬浮在哪个部件栏上
            if (typeof CharacterAppearanceMode !== 'undefined' && CharacterAppearanceMode === '' &&
                     typeof CharacterAppearanceGroups !== 'undefined' &&
                     typeof CharacterAppearanceOffset !== 'undefined' &&
                     typeof CharacterAppearanceNumGroupPerPage !== 'undefined' &&
                     !hasDialogFocusItem) {
                
                let hoveredGroupName = null;
                
                // 检测鼠标悬浮在哪个部件栏上（部件栏区域大约在 1120-1975, 145-900）
                if (typeof MouseX !== 'undefined' && typeof MouseY !== 'undefined' &&
                    MouseX >= 1120 && MouseX < 1975 && MouseY >= 145 && MouseY < 900) {
                    
                    // 遍历当前显示的组，检查鼠标是否在某个部件栏上
                    for (let A = CharacterAppearanceOffset; 
                         A < CharacterAppearanceGroups.length && A < CharacterAppearanceOffset + CharacterAppearanceNumGroupPerPage; 
                         A++) {
                        const Group = CharacterAppearanceGroups[A];
                        const itemY = 145 + (A - CharacterAppearanceOffset) * 95;
                        const itemHeight = 65;
                        
                        // 检查鼠标是否在这个部件栏的Y范围内
                        if (MouseY >= itemY && MouseY < itemY + itemHeight) {
                            hoveredGroupName = Group.Name;
                            break;
                        }
                    }
                }
                
                // 如果鼠标悬浮在部件栏上，且还没有开始闪烁或闪烁已完成，开始新的闪烁
                if (hoveredGroupName) {
                    // 只有当悬浮的部件改变，或者之前没有闪烁时，才开始新的闪烁
                    if (dressOptimizationManager.hoveredGroupName !== hoveredGroupName && 
                        dressOptimizationManager.highlightTimer === null) {
                        dressOptimizationManager.startHighlight(hoveredGroupName);
                    }
                } else {
                    // 如果鼠标不在部件栏上，停止闪烁
                    if (dressOptimizationManager.hoveredGroupName !== null) {
                        dressOptimizationManager.stopHighlight();
                    }
                }
            }
        }
        
        // 调用原函数绘制界面
        const result = next(args);
        
        // 如果启用了显示缩略图功能，且当前在常规模式
        // 并且不在层级调整界面或扩展物品界面
        if (dressOptimizationManager.showThumbnailEnabled && 
            typeof CurrentScreen !== 'undefined' && CurrentScreen === 'Appearance' &&
            typeof CharacterAppearanceMode !== 'undefined' && CharacterAppearanceMode === '' &&
            typeof CharacterAppearanceSelection !== 'undefined' &&
            typeof CharacterAppearanceGroups !== 'undefined' &&
            typeof CharacterAppearanceOffset !== 'undefined' &&
            typeof CharacterAppearanceNumGroupPerPage !== 'undefined') {
            
            // 检查是否在层级调整界面或扩展物品界面
            const isLayeringActive = typeof Layering !== 'undefined' && Layering.IsActive && Layering.IsActive();
            const hasDialogFocusItem = typeof DialogFocusItem !== 'undefined' && DialogFocusItem != null;
            
            // 如果不在这些界面中，才绘制缩略图
            if (!isLayeringActive && !hasDialogFocusItem) {
                const C = CharacterAppearanceSelection;
                
                // 遍历当前显示的组
                for (let A = CharacterAppearanceOffset; 
                     A < CharacterAppearanceGroups.length && A < CharacterAppearanceOffset + CharacterAppearanceNumGroupPerPage; 
                     A++) {
                    const Group = CharacterAppearanceGroups[A];
                    
                    // 获取当前组的物品
                    if (typeof InventoryGet === 'function') {
                        const Item = InventoryGet(C, Group.Name);
                        
                        if (Item && Item.Asset) {
                            // 获取预览图片路径
                            const previewPath = dressOptimizationManager.getItemPreviewPath(Item, C);
                            
                            // 计算按钮位置
                            const buttonX = 1635;
                            const buttonY = 145 + (A - CharacterAppearanceOffset) * 95;
                            const buttonWidth = 65;
                            const buttonHeight = 65;
                            
                            // 检查是否启用分层功能
                            const layeringEnabled = Item && !C.IsNpc();
                            
                            // 检查图片是否存在且可加载
                            if (previewPath && dressOptimizationManager.isImageAvailable(previewPath)) {
                                // 在按钮上绘制缩略图（覆盖原图标）
                                if (typeof DrawImageResize === 'function') {
                                    // 保存当前状态
                                    MainCanvas.save();
                                    
                                    // 清除按钮图标区域（覆盖原图标）
                                    const iconAreaX = buttonX + 2;
                                    const iconAreaY = buttonY + 2;
                                    const iconAreaWidth = buttonWidth - 4;
                                    const iconAreaHeight = buttonHeight - 4;
                                    
                                    // 使用按钮背景色清除图标区域
                                    const buttonColor = layeringEnabled ? "#fff" : "#aaa";
                                    MainCanvas.fillStyle = buttonColor;
                                    MainCanvas.fillRect(iconAreaX, iconAreaY, iconAreaWidth, iconAreaHeight);
                                    
                                    // 设置裁剪区域为按钮内部
                                    MainCanvas.beginPath();
                                    MainCanvas.rect(iconAreaX, iconAreaY, iconAreaWidth, iconAreaHeight);
                                    MainCanvas.clip();
                                    
                                    // 绘制预览图片（缩放到按钮大小）
                                    try {
                                        const drawResult = DrawImageResize(previewPath, iconAreaX, iconAreaY, iconAreaWidth, iconAreaHeight);
                                        
                                        // 恢复状态
                                        MainCanvas.restore();
                                        
                                        // 如果绘制成功，绘制边框以区分按钮
                                        if (drawResult !== false && layeringEnabled) {
                                            MainCanvas.strokeStyle = '#000';
                                            MainCanvas.lineWidth = 1;
                                            MainCanvas.strokeRect(iconAreaX, iconAreaY, iconAreaWidth, iconAreaHeight);
                                        }
                                        // 如果绘制失败（返回false），不绘制边框，原图标会显示
                                    } catch (error) {
                                        // 如果绘制失败，恢复状态（不覆盖原图标）
                                        MainCanvas.restore();
                                        console.warn('DressOptimizationManager: 绘制缩略图失败', error);
                                    }
                                }
                            }
                            // 如果图片不存在或不可用，不绘制缩略图，让原图标显示
                        }
                    }
                }
            }
        }
        
        return result;
    });

    // =======================================================================================
    // 设置界面
    // =======================================================================================

    /**
     * 换装优化设置界面类
     */
    class LianDressOptimizationSettingScreen {
        constructor() {
            this.settings = Object.assign({}, DEFAULT_SETTINGS);
            this.hoverText = ""; // 当前悬浮提示文字
            this.originalSettings = null; // 保存原始设置，用于检测修改
        }

        /**
         * 设置悬浮提示文字
         */
        setHoverText(text) {
            this.hoverText = text;
        }

        /**
         * 清除悬浮提示
         */
        clearHoverText() {
            this.hoverText = "";
        }

        /**
         * 绘制底部提示区域
         */
        drawHoverTextArea() {
            if (this.hoverText) {
                // 绘制底部提示背景
                DrawRect(400, 850, 1200, 90, "#F0F0F0");
                DrawEmptyRect(400, 850, 1200, 90, "Gray", 2);
                
                // 绘制提示文字
                MainCanvas.textAlign = "left";
                const lines = this.hoverText.split('\n');
                lines.forEach((line, index) => {
                    DrawText(line, 420, 875 + index * 35, "Gray", "");
                });
            }
        }

        /**
         * 运行界面绘制
         */
        Run() {
            // 清除上一帧的悬浮提示
            this.clearHoverText();
            
            MainCanvas.textAlign = "left";
            DrawText("- BC换装优化设置 -", 500, 125, "Black", "Gray");
            
            // 服装修改窗口开关（最前面）
            DrawCheckbox(500, 200, 64, 64, 
                "新 服装修改窗口", 
                this.settings.UseAdjustmentWindow
            );
            
            // 检测鼠标悬停 - 服装修改窗口
            if (MouseIn(500, 200, 450, 64)) {
                this.setHoverText("在Color模式中显示树状结构的颜色和透明度调整界面");
            }
            
            // 滚轮翻页开关
            DrawCheckbox(500, 300, 64, 64, 
                "滚轮翻页", 
                this.settings.WheelScrollEnabled
            );
            
            // 检测鼠标悬停 - 滚轮翻页
            if (MouseIn(500, 300, 450, 64)) {
                this.setHoverText("在换装界面中，使用鼠标滚轮可以快速翻页");
            }
            
            // 显示缩略图开关
            DrawCheckbox(500, 400, 64, 64, 
                "显示服装缩略图", 
                this.settings.ShowThumbnailEnabled
            );
            
            // 检测鼠标悬停 - 显示缩略图
            if (MouseIn(500, 400, 450, 64)) {
                this.setHoverText("在换装界面的分层按钮位置显示所选衣服的缩略图");
            }
            
            // 服装提示开关
            DrawCheckbox(500, 500, 64, 64, 
                "服装提示", 
                this.settings.ItemHighlightEnabled
            );
            
            // 检测鼠标悬停 - 服装提示
            if (MouseIn(500, 500, 450, 64)) {
                this.setHoverText("鼠标悬浮在部件栏上时，左侧角色身上该部件闪烁提示");
            }
            
            // 退出按钮
            DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
            
            // 绘制底部统一的悬浮提示区域
            this.drawHoverTextArea();
        }

        /**
         * 处理点击事件
         */
        Click() {
            // 服装修改窗口开关（最前面）
            if (MouseXIn(500, 64) && MouseYIn(200, 64)) {
                this.settings.UseAdjustmentWindow = !this.settings.UseAdjustmentWindow;
                
                // 如果禁用，立即销毁窗口
                if (!this.settings.UseAdjustmentWindow) {
                    if (typeof itemColorAdjustmentWindow !== 'undefined') {
                        itemColorAdjustmentWindow.destroy();
                    }
                }
            }
            
            // 滚轮翻页开关
            if (MouseXIn(500, 64) && MouseYIn(300, 64)) {
                this.settings.WheelScrollEnabled = !this.settings.WheelScrollEnabled;
                
                // 立即应用设置
                dressOptimizationManager.setWheelScrollEnabled(this.settings.WheelScrollEnabled);
            }
            
            // 显示缩略图开关
            if (MouseXIn(500, 64) && MouseYIn(400, 64)) {
                this.settings.ShowThumbnailEnabled = !this.settings.ShowThumbnailEnabled;
                
                // 立即应用设置
                dressOptimizationManager.setShowThumbnailEnabled(this.settings.ShowThumbnailEnabled);
                
                // 如果禁用，清除缓存
                if (!this.settings.ShowThumbnailEnabled) {
                    dressOptimizationManager.clearThumbnailCache();
                }
            }
            
            // 服装提示开关
            if (MouseXIn(500, 64) && MouseYIn(500, 64)) {
                this.settings.ItemHighlightEnabled = !this.settings.ItemHighlightEnabled;
                
                // 立即应用设置
                dressOptimizationManager.setItemHighlightEnabled(this.settings.ItemHighlightEnabled);
            }
            
            // 退出按钮
            if (MouseIn(1815, 75, 90, 90)) {
                this.Exit();
            }
            return false;
        }

        /**
         * 退出设置界面
         */
        Exit() {
            saveSettings(this.settings);

            PreferenceSubscreenExtensionsClear();
            return true;
        }

        /**
         * 卸载设置界面
         */
        Unload() {
            // TODO: 清理资源
        }
    }

    // 创建设置界面实例
    const screen = new LianDressOptimizationSettingScreen();

    // 登录完成后立即应用设置，无需等用户打开设置页
    mod.hookFunction("LoginResponse", 0, (args, next) => {
        const result = next(args);
        if (Player && Player.MemberNumber != null) {
            screen.settings = loadSettings();
            screen.originalSettings = Object.assign({}, screen.settings);
            applySettings(screen.settings);
        }
        return result;
    });

    // 注册设置界面
    PreferenceRegisterExtensionSetting({
        Identifier: "LianDressOptimization",
        Image: "Icons/Dress.png",
        ButtonText: "Lian 换装优化",
        load: () => {
            screen.settings = loadSettings();
            screen.originalSettings = Object.assign({}, screen.settings);
            applySettings(screen.settings);
        },
        run: () => {
            const origAlign = MainCanvas.textAlign;
            screen.Run();
            MainCanvas.textAlign = origAlign;
        },
        click: () => screen.Click(),
        unload: () => screen.Unload(),
        exit: () => screen.Exit()
    });

    // 暴露调试接口
    window.LianDressOptimization = {
        manager: {
            setEnabled: (enabled) => dressOptimizationManager.setEnabled(enabled),
            setWheelScrollEnabled: (enabled) => dressOptimizationManager.setWheelScrollEnabled(enabled),
            setShowThumbnailEnabled: (enabled) => dressOptimizationManager.setShowThumbnailEnabled(enabled),
            setItemHighlightEnabled: (enabled) => dressOptimizationManager.setItemHighlightEnabled(enabled),
            clearThumbnailCache: () => dressOptimizationManager.clearThumbnailCache(),
            getStatus: () => ({
                isEnabled: dressOptimizationManager.isEnabled,
                wheelScrollEnabled: dressOptimizationManager.wheelScrollEnabled,
                showThumbnailEnabled: dressOptimizationManager.showThumbnailEnabled,
                itemHighlightEnabled: dressOptimizationManager.itemHighlightEnabled
            })
        }
    };

    // =======================================================================================
    // 可复用的颜色选择器类
    // =======================================================================================

    /**
     * 可复用的颜色选择器类
     * 包含颜色选择器面板、HEX输入框、剪贴板颜色按钮和复制按钮
     */
    class ColorPickerPanel {
        constructor() {
            this.panelElement = null;
            this.currentColor = '#FFFFFF';
            this.onColorChange = null; // 颜色改变回调函数
            this.clipboardColors = []; // 剪贴板颜色队列（FIFO，最多10个）
            this.maxClipboardSize = 10;
            this.iroInstance = null; // iro.js 实例
            this.iroLoaded = false; // iro.js 是否已加载
            this.rgbInputs = null; // RGB输入框引用
            this.onReset = null; // 重置回调函数
        }
        
        /**
         * 将HEX颜色转换为RGB
         */
        hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 255, g: 255, b: 255 };
        }

        /**
         * 显示颜色选择器面板
         * @param {HTMLElement} triggerElement - 触发按钮元素
         * @param {string} initialColor - 初始颜色
         * @param {Function} onColorChange - 颜色改变回调函数
         * @param {Function} onReset - 重置回调函数（可选）
         */
        show(triggerElement, initialColor, onColorChange, onReset) {
            // 如果已有面板打开，先关闭
            if (this.panelElement) {
                this.hide();
            }

            this.currentColor = initialColor || '#FFFFFF';
            this.onColorChange = onColorChange;
            this.onReset = onReset; // 保存重置回调

            // 确保颜色格式正确
            if (!this.currentColor.startsWith('#')) {
                this.currentColor = '#' + this.currentColor;
            }
            if (this.currentColor.length === 4) {
                this.currentColor = '#' + this.currentColor[1] + this.currentColor[1] + 
                                   this.currentColor[2] + this.currentColor[2] + 
                                   this.currentColor[3] + this.currentColor[3];
            }

            // 计算面板位置（在按钮下方）
            const buttonRect = triggerElement.getBoundingClientRect();
            const panelPadding = 15; // 面板内边距
            const panelWidth = 280 + panelPadding * 2; // 面板宽度固定为 280 + 内边距
            const panelHeight = 400; // 估算面板高度
            const margin = 10; // 边距
            let panelX = buttonRect.left;
            let panelY = buttonRect.bottom + 5;
            
            // 检查是否会超出窗口右侧，如果超出则调整位置
            if (panelX + panelWidth + margin > window.innerWidth) {
                // 如果超出右侧，将面板放在按钮左侧
                panelX = buttonRect.left - panelWidth;
                // 如果左侧也超出，则紧贴窗口右边缘
                if (panelX < margin) {
                    panelX = window.innerWidth - panelWidth - margin;
                }
            }
            
            // 检查是否会超出窗口下侧，如果超出则调整位置
            if (panelY + panelHeight + margin > window.innerHeight) {
                // 如果超出下侧，将面板放在按钮上方
                panelY = buttonRect.top - panelHeight - 5;
                // 如果上方也超出，则紧贴窗口下边缘
                if (panelY < margin) {
                    panelY = window.innerHeight - panelHeight - margin;
                }
            }
            
            // 确保不会超出左侧和上侧
            if (panelX < margin) {
                panelX = margin;
            }
            if (panelY < margin) {
                panelY = margin;
            }
            
            const finalPanelX = panelX;
            const finalPanelY = panelY;

            // 创建面板容器（弹出窗口）
            this.panelElement = document.createElement('div');
            this.panelElement.className = 'lian-color-picker-panel';
            this.panelElement.style.cssText = `
                position: fixed;
                left: ${finalPanelX}px;
                top: ${finalPanelY}px;
                width: ${panelWidth}px;
                background: #fff;
                border: 2px solid #000;
                border-radius: 5px;
                padding: 15px;
                z-index: 10001;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
            `;

            // 创建 iro.js 颜色选择器容器（宽度固定为 280）
            const iroContainer = document.createElement('div');
            iroContainer.id = 'lian-iro-color-picker-container';
            iroContainer.style.cssText = 'width: 280px; margin-bottom: 10px; min-height: 200px;';
            this.panelElement.appendChild(iroContainer);

            // 动态加载 iro.js 库
            const self = this; // 保存 this 引用
            if (!this.iroLoaded && typeof window.iro === 'undefined') {
                const scriptElement = document.createElement('script');
                scriptElement.src = 'https://cdn.jsdelivr.net/npm/@jaames/iro@5.5.2/dist/iro.min.js';
                document.head.appendChild(scriptElement);

                // 当 script 元素加载完成后，初始化 iro.js 颜色选择器
                scriptElement.onload = function() {
                    self.iroLoaded = true;
                    self.initIroColorPicker(iroContainer);
                };
            } else {
                // 如果已经加载，直接初始化
                this.iroLoaded = true;
                this.initIroColorPicker(iroContainer);
            }

            // 创建HEX输入框（宽度固定为 280）
            const hexInputContainer = document.createElement('div');
            hexInputContainer.style.cssText = 'display: flex; align-items: center; margin-bottom: 10px; width: 280px;';

            const hexLabel = document.createElement('label');
            hexLabel.textContent = 'HEX: ';
            hexLabel.style.cssText = 'margin-right: 5px; font-size: 12px;';
            hexInputContainer.appendChild(hexLabel);

            this.hexInput = document.createElement('input');
            this.hexInput.type = 'text';
            this.hexInput.value = this.currentColor.toUpperCase();
            this.hexInput.style.cssText = 'flex: 1; padding: 5px; border: 1px solid #000; font-size: 12px;';
            this.hexInput.addEventListener('input', (e) => {
                let newColor = e.target.value.trim();
                if (!newColor.startsWith('#')) {
                    newColor = '#' + newColor;
                }
                if (/^#[0-9A-Fa-f]{3}$/.test(newColor)) {
                    newColor = '#' + newColor[1] + newColor[1] + newColor[2] + newColor[2] + newColor[3] + newColor[3];
                }
                if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
                    this.currentColor = newColor;
                    // 更新 iro.js 颜色选择器
                    if (this.iroInstance) {
                        this.iroInstance.color.hexString = newColor;
                    }
                    // 更新后备 color input
                    const colorInput = this.panelElement.querySelector('input[type="color"]');
                    if (colorInput) {
                        colorInput.value = newColor;
                    }
                    // 更新RGB输入框
                    if (this.rgbInputs) {
                        const rgb = this.hexToRgb(newColor);
                        if (this.rgbInputs.r) this.rgbInputs.r.value = rgb.r;
                        if (this.rgbInputs.g) this.rgbInputs.g.value = rgb.g;
                        if (this.rgbInputs.b) this.rgbInputs.b.value = rgb.b;
                    }
                    if (this.onColorChange) {
                        this.onColorChange(newColor);
                    }
                }
            });
            hexInputContainer.appendChild(this.hexInput);
            this.panelElement.appendChild(hexInputContainer);

            // 创建RGB输入框容器（宽度固定为 280）
            const rgbInputContainer = document.createElement('div');
            rgbInputContainer.style.cssText = 'display: flex; align-items: center; gap: 5px; margin-bottom: 10px; width: 280px;';
            
            const rgbLabel = document.createElement('label');
            rgbLabel.textContent = 'RGB: ';
            rgbLabel.style.cssText = 'margin-right: 5px; font-size: 12px; flex-shrink: 0;';
            rgbInputContainer.appendChild(rgbLabel);
            
            // 将RGB转换为HEX
            const rgbToHex = (r, g, b) => {
                return '#' + [r, g, b].map(x => {
                    const hex = Math.max(0, Math.min(255, x)).toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');
            };
            
            const rgbInputs = { r: null, g: null, b: null };
            ['R', 'G', 'B'].forEach((label) => {
                const labelSpan = document.createElement('span');
                labelSpan.textContent = label + ': ';
                labelSpan.style.cssText = 'font-size: 12px; flex-shrink: 0;';
                rgbInputContainer.appendChild(labelSpan);
                
                const rgbInput = document.createElement('input');
                rgbInput.type = 'number';
                rgbInput.min = '0';
                rgbInput.max = '255';
                const key = label.toLowerCase();
                rgbInputs[key] = rgbInput;
                
                const rgb = this.hexToRgb(this.currentColor);
                rgbInput.value = rgb[key];
                rgbInput.style.cssText = 'width: 60px; padding: 3px; border: 1px solid #000; font-size: 12px; text-align: center;';
                rgbInput.addEventListener('input', (e) => {
                    const r = parseInt(rgbInputs.r.value) || 0;
                    const g = parseInt(rgbInputs.g.value) || 0;
                    const b = parseInt(rgbInputs.b.value) || 0;
                    const newColor = rgbToHex(r, g, b);
                    this.currentColor = newColor;
                    
                    // 更新 iro.js 颜色选择器
                    if (this.iroInstance) {
                        this.iroInstance.color.hexString = newColor;
                    }
                    // 更新后备 color input
                    const colorInput = this.panelElement.querySelector('input[type="color"]');
                    if (colorInput) {
                        colorInput.value = newColor;
                    }
                    // 更新HEX输入框
                    if (this.hexInput) {
                        this.hexInput.value = newColor.toUpperCase();
                    }
                    if (this.onColorChange) {
                        this.onColorChange(newColor);
                    }
                });
                rgbInputContainer.appendChild(rgbInput);
            });
            
            // 保存RGB输入框引用，以便在颜色变化时更新
            this.rgbInputs = rgbInputs;
            this.panelElement.appendChild(rgbInputContainer);

            // 创建剪贴板颜色按钮容器（宽度固定为 280）
            const clipboardContainer = document.createElement('div');
            clipboardContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; width: 280px;';
            this.clipboardButtonsContainer = clipboardContainer;
            this.updateClipboardButtons();
            this.panelElement.appendChild(clipboardContainer);

            // 创建复制按钮（宽度固定为 280）
            const copyButton = document.createElement('button');
            copyButton.textContent = '复制';
            copyButton.style.cssText = `
                width: 280px;
                padding: 8px;
                background: #4CAF50;
                color: white;
                border: 1px solid #000;
                border-radius: 3px;
                cursor: pointer;
                font-size: 14px;
            `;
            copyButton.onclick = () => {
                this.copyToClipboard();
            };
            this.panelElement.appendChild(copyButton);
            
            // 如果有重置回调，创建重置按钮（宽度固定为 280）
            if (this.onReset) {
                const resetButton = document.createElement('button');
                resetButton.textContent = '重置到默认颜色';
                resetButton.style.cssText = `
                    width: 280px;
                    padding: 8px;
                    background: #FF9800;
                    color: white;
                    border: 1px solid #000;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 14px;
                    margin-top: 5px;
                `;
                resetButton.onclick = () => {
                    if (this.onReset) {
                        this.onReset();
                    }
                };
                this.panelElement.appendChild(resetButton);
            }

            // 点击外部关闭
            const clickOutsideHandler = (e) => {
                // 检查元素是否存在，避免null引用错误
                if (!this.panelElement || !triggerElement) {
                    document.removeEventListener('click', clickOutsideHandler);
                    return;
                }
                
                if (!this.panelElement.contains(e.target) && 
                    e.target !== triggerElement && 
                    !triggerElement.contains(e.target)) {
                    this.hide();
                    document.removeEventListener('click', clickOutsideHandler);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', clickOutsideHandler);
            }, 100);

            document.body.appendChild(this.panelElement);
        }

        /**
         * 初始化 iro.js 颜色选择器
         * @param {HTMLElement} container - 容器元素
         */
        initIroColorPicker(container) {
            // 检查 iro 是否可用
            const iro = window.iro;
            if (!iro || !iro.ColorPicker) {
                console.warn('iro.js not available, using fallback color input');
                // 后备方案：使用简单的color input
                const colorInput = document.createElement('input');
                colorInput.type = 'color';
                colorInput.value = this.currentColor;
                colorInput.style.cssText = 'width: 100%; height: 40px; margin-bottom: 10px; cursor: pointer;';
                colorInput.addEventListener('input', (e) => {
                    this.currentColor = e.target.value;
                    if (this.hexInput) {
                        this.hexInput.value = this.currentColor.toUpperCase();
                    }
                    if (this.onColorChange) {
                        this.onColorChange(this.currentColor);
                    }
                });
                container.appendChild(colorInput);
                return;
            }

            try {
                // 初始化 iro.js 颜色选择器，使用 Box & hue slider 布局
                this.iroInstance = new iro.ColorPicker(container, {
                    width: 280,
                    color: this.currentColor,
                    borderWidth: 1,
                    borderColor: '#000',
                    layout: [
                        {
                            component: iro.ui.Box
                        },
                        {
                            component: iro.ui.Slider,
                            options: {
                                id: 'hue-slider',
                                sliderType: 'hue'
                            }
                        }
                    ]
                });

                // 监听颜色变化事件
                this.iroInstance.on('color:change', (color) => {
                    this.currentColor = color.hexString;
                    if (this.hexInput) {
                        this.hexInput.value = this.currentColor.toUpperCase();
                    }
                    // 更新RGB输入框
                    if (this.rgbInputs) {
                        const rgb = this.hexToRgb(this.currentColor);
                        if (this.rgbInputs.r) this.rgbInputs.r.value = rgb.r;
                        if (this.rgbInputs.g) this.rgbInputs.g.value = rgb.g;
                        if (this.rgbInputs.b) this.rgbInputs.b.value = rgb.b;
                    }
                    if (this.onColorChange) {
                        this.onColorChange(this.currentColor);
                    }
                });
            } catch (error) {
                console.warn('Failed to initialize iro.js color picker:', error);
                // 后备方案：使用简单的color input
                const colorInput = document.createElement('input');
                colorInput.type = 'color';
                colorInput.value = this.currentColor;
                colorInput.style.cssText = 'width: 100%; height: 40px; margin-bottom: 10px; cursor: pointer;';
                colorInput.addEventListener('input', (e) => {
                    this.currentColor = e.target.value;
                    if (this.hexInput) {
                        this.hexInput.value = this.currentColor.toUpperCase();
                    }
                    // 更新RGB输入框
                    if (this.rgbInputs) {
                        const rgb = this.hexToRgb(this.currentColor);
                        if (this.rgbInputs.r) this.rgbInputs.r.value = rgb.r;
                        if (this.rgbInputs.g) this.rgbInputs.g.value = rgb.g;
                        if (this.rgbInputs.b) this.rgbInputs.b.value = rgb.b;
                    }
                    if (this.onColorChange) {
                        this.onColorChange(this.currentColor);
                    }
                });
                container.appendChild(colorInput);
            }
        }

        /**
         * 更新剪贴板颜色按钮
         */
        updateClipboardButtons() {
            if (!this.clipboardButtonsContainer) return;

            // 清空现有按钮
            this.clipboardButtonsContainer.innerHTML = '';

            // 创建剪贴板颜色按钮
            this.clipboardColors.forEach((color, index) => {
                const colorBtn = document.createElement('button');
                colorBtn.style.cssText = `
                    width: 30px;
                    height: 30px;
                    background: ${color};
                    border: 1px solid #000;
                    border-radius: 3px;
                    cursor: pointer;
                    flex-shrink: 0;
                `;
                colorBtn.title = color;
                colorBtn.onclick = () => {
                    this.currentColor = color;
                    // 更新 iro.js 颜色选择器
                    if (this.iroInstance) {
                        this.iroInstance.color.hexString = color;
                    }
                    // 更新后备 color input
                    const colorInput = this.panelElement.querySelector('input[type="color"]');
                    if (colorInput) {
                        colorInput.value = color;
                    }
                    if (this.hexInput) {
                        this.hexInput.value = color.toUpperCase();
                    }
                    // 更新RGB输入框
                    if (this.rgbInputs) {
                        const rgb = this.hexToRgb(color);
                        if (this.rgbInputs.r) this.rgbInputs.r.value = rgb.r;
                        if (this.rgbInputs.g) this.rgbInputs.g.value = rgb.g;
                        if (this.rgbInputs.b) this.rgbInputs.b.value = rgb.b;
                    }
                    if (this.onColorChange) {
                        this.onColorChange(color);
                    }
                };
                this.clipboardButtonsContainer.appendChild(colorBtn);
            });
        }

        /**
         * 复制当前颜色到剪贴板（FIFO）
         */
        copyToClipboard() {
            // 如果颜色已存在，先移除
            const existingIndex = this.clipboardColors.indexOf(this.currentColor);
            if (existingIndex !== -1) {
                this.clipboardColors.splice(existingIndex, 1);
            }

            // 添加到队列前端
            this.clipboardColors.unshift(this.currentColor);

            // 如果超过最大数量，移除最旧的（FIFO）
            if (this.clipboardColors.length > this.maxClipboardSize) {
                this.clipboardColors.pop();
            }

            // 更新按钮
            this.updateClipboardButtons();

            // 复制到系统剪贴板
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(this.currentColor).catch(err => {
                    console.warn('Failed to copy to clipboard:', err);
                });
            }
        }

        /**
         * 隐藏颜色选择器面板
         */
        hide() {
            if (this.iroInstance) {
                // 销毁 iro.js 实例
                if (this.iroInstance.el && this.iroInstance.el.parentNode) {
                    this.iroInstance.el.parentNode.removeChild(this.iroInstance.el);
                }
                this.iroInstance = null;
            }
            if (this.panelElement) {
                this.panelElement.remove();
                this.panelElement = null;
            }
            this.hexInput = null;
            this.clipboardButtonsContainer = null;
        }
    }

    // =======================================================================================
    // 衣服调整窗口
    // =======================================================================================

    /**
     * 衣服调整窗口类（基于DOM实现）
     * 在Color模式进入时显示，提供树状结构的颜色和透明度调整界面
     */
    class ItemColorAdjustmentWindow {
        constructor() {
            this.windowElement = null;
            this.isVisible = false;
            this.treeNodes = []; // 树状节点数据
            this.expandedNodes = new Set(); // 展开的节点ID集合
            this.expandedLayeringNodes = new Set(); // 展开层级设置的节点ID集合
            this.selectedNodeId = null; // 当前选中的节点ID
            this.colorPickerPanel = new ColorPickerPanel(); // 颜色选择器面板实例
            this.hoveredNodeId = null; // 当前悬浮的节点ID
            this.hoveredLayeringNodeId = null; // 当前悬浮的层级节点ID
            this.highlightTimer = null; // 闪烁定时器
            this.highlightedNode = null; // 当前闪烁的节点
            this.highlightedLayerIndex = null; // 当前闪烁的图层索引
            this.originalOpacities = new Map(); // 存储原始透明度值（透明度槽位 -> opacity）
            this.resizeHandler = null; // window resize 监听，destroy 时解绑
            this.docListeners = []; // 挂在 document 上的临时监听，重建内容前统一解绑
            this.isInteracting = false; // 是否正在交互（点击/拖动），交互期间禁止闪烁
            this.gizmo = new LayerTransformGizmo(this); // 预览区的变换包围框
            this.deferRefresh = false; // 为 true 时合并角色刷新
            this.refreshPending = false; // 合并期间是否有刷新请求
        }

        /**
         * 计算窗口位置和大小（基于2:1画布）
         */
        calculateWindowLayout() {
            // 获取MainCanvas元素
            const canvas = document.getElementById('MainCanvas');
            if (!canvas) {
                // 如果没有MainCanvas，使用视口尺寸
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                // 假设画布是2:1，居中顶住边缘
                const canvasHeight = Math.min(viewportWidth / 2, viewportHeight);
                const canvasWidth = canvasHeight * 2;
                const canvasLeft = (viewportWidth - canvasWidth) / 2;
                const canvasTop = 0;

                // 窗口距离画布左侧55%，右侧1%，上12.5%，下1%
                const windowLeft = canvasLeft + canvasWidth * 0.55;
                const windowRight = canvasLeft + canvasWidth * (1 - 0.01);
                const windowTop = canvasTop + canvasHeight * 0.125;
                const windowBottom = canvasTop + canvasHeight * (1 - 0.01);

                return {
                    left: windowLeft,
                    top: windowTop,
                    width: windowRight - windowLeft,
                    height: windowBottom - windowTop
                };
            } else {
                const canvasRect = canvas.getBoundingClientRect();
                // 窗口距离画布左侧55%，右侧1%，上12.5%，下1%
                const windowLeft = canvasRect.left + canvasRect.width * 0.55;
                const windowRight = canvasRect.left + canvasRect.width * (1 - 0.01);
                const windowTop = canvasRect.top + canvasRect.height * 0.125;
                const windowBottom = canvasRect.top + canvasRect.height * (1 - 0.01);

                return {
                    left: windowLeft,
                    top: windowTop,
                    width: windowRight - windowLeft,
                    height: windowBottom - windowTop
                };
            }
        }

        /**
         * 构建树状结构
         */
        buildTree() {
            if (!ItemColorState || !ItemColorItem || !ItemColorCharacter) {
                return;
            }

            this.treeNodes = [];
            const asset = ItemColorItem.Asset;
            const colorGroups = ItemColorState.colorGroups;

            // 根节点：物品整体
            const rootNode = {
                id: 'root',
                name: '物品整体',
                type: 'root',
                colorIndices: [],
                layerIndices: [],
                children: [],
                level: 0
            };

            // 遍历所有颜色组，构建树
            colorGroups.forEach((colorGroup, groupIndex) => {
                if (colorGroup.name === null) {
                    // WholeItem - 所有图层的颜色索引
                    const allColorIndices = [];
                    const allLayerIndices = [];
                    asset.Layer.forEach((layer, layerIndex) => {
                        if (layer.ColorIndex !== undefined && layer.ColorIndex !== null) {
                            allColorIndices.push(layer.ColorIndex);
                            allLayerIndices.push(layerIndex);
                        }
                    });
                    rootNode.colorIndices = allColorIndices;
                    rootNode.layerIndices = allLayerIndices;
                    } else {
                        // 分组节点
                        let groupName = colorGroup.name;
                        if (typeof ItemColorGroupNames !== 'undefined' && ItemColorGroupNames) {
                            const translatedName = ItemColorGroupNames.get(asset.DynamicGroupName + asset.Name + colorGroup.name);
                            if (translatedName && !translatedName.startsWith('MISSING TEXT')) {
                                groupName = translatedName;
                            }
                        }
                        
                        // 如果只有一个子节点，直接使用子节点，不创建分组节点
                        if (colorGroup.layers.length === 1) {
                            const layer = colorGroup.layers[0];
                            // 查找所有具有相同ColorIndex的图层（可能有多个图层共享同一个ColorIndex）
                            const allLayerIndices = [];
                            asset.Layer.forEach((l, idx) => {
                                if (l.ColorIndex === layer.ColorIndex) {
                                    allLayerIndices.push(idx);
                                }
                            });
                            
                            let layerName = layer.Name || groupName || 'Layer 1';
                            if (typeof ItemColorLayerNames !== 'undefined' && ItemColorLayerNames) {
                                const translatedName = ItemColorLayerNames.get(asset.DynamicGroupName + asset.Name + (layer.Name || ""));
                                if (translatedName && !translatedName.startsWith('MISSING TEXT')) {
                                    layerName = translatedName;
                                }
                            }
                            
                            // 无论有多少个图层共享同一个ColorIndex，都只创建一个节点
                            // 修改时通过ColorIndex统一修改，所有图层都会更新
                            const layerNode = {
                                id: `layer_${colorGroup.name}_0`,
                                name: layerName,
                                type: 'layer',
                                colorIndex: layer.ColorIndex,
                                layerIndex: allLayerIndices[0], // 保留第一个作为主要索引
                                layerIndices: allLayerIndices, // 包含所有共享该ColorIndex的图层索引
                                level: 1,
                                parent: rootNode
                            };
                            rootNode.children.push(layerNode);
                        } else {
                            // 多个子节点，创建分组节点
                            // 收集所有唯一的ColorIndex（每个ColorIndex可能对应多个图层）
                            const uniqueColorIndices = [];
                            const colorIndexMap = new Map(); // ColorIndex -> layerIndices数组
                            
                            colorGroup.layers.forEach((layer) => {
                                if (!colorIndexMap.has(layer.ColorIndex)) {
                                    uniqueColorIndices.push(layer.ColorIndex);
                                    // 查找所有具有相同ColorIndex的图层
                                    const matchingLayerIndices = [];
                                    asset.Layer.forEach((l, idx) => {
                                        if (l.ColorIndex === layer.ColorIndex) {
                                            matchingLayerIndices.push(idx);
                                        }
                                    });
                                    colorIndexMap.set(layer.ColorIndex, matchingLayerIndices);
                                }
                            });
                            
                            // 收集所有图层的索引
                            const allLayerIndices = [];
                            colorIndexMap.forEach((layerIndices) => {
                                allLayerIndices.push(...layerIndices);
                            });
                            
                            const groupNode = {
                                id: `group_${colorGroup.name}`,
                                name: groupName,
                                type: 'group',
                                colorIndices: uniqueColorIndices,
                                layerIndices: allLayerIndices,
                                children: [],
                                level: 1,
                                parent: rootNode
                            };

                            // 为每个唯一的ColorIndex创建一个图层节点（即使该ColorIndex对应多个图层）
                            colorGroup.layers.forEach((layer, layerIdx) => {
                                // 检查是否已经为这个ColorIndex创建过节点
                                const existingNode = groupNode.children.find(n => n.colorIndex === layer.ColorIndex);
                                if (existingNode) {
                                    return; // 已经创建过，跳过
                                }
                                
                                // 获取该ColorIndex对应的所有图层索引
                                const matchingLayerIndices = colorIndexMap.get(layer.ColorIndex);
                                
                                // 获取图层名称
                                let layerName = layer.Name || `Layer ${layerIdx + 1}`;
                                if (typeof ItemColorLayerNames !== 'undefined' && ItemColorLayerNames) {
                                    const translatedName = ItemColorLayerNames.get(asset.DynamicGroupName + asset.Name + (layer.Name || ""));
                                    if (translatedName && !translatedName.startsWith('MISSING TEXT')) {
                                        layerName = translatedName;
                                    }
                                }
                                
                                // 创建一个节点代表这个ColorIndex（即使有多个图层共享）
                                const layerNode = {
                                    id: `layer_${colorGroup.name}_${layerIdx}`,
                                    name: layerName,
                                    type: 'layer',
                                    colorIndex: layer.ColorIndex,
                                    layerIndex: matchingLayerIndices[0], // 保留第一个作为主要索引
                                    layerIndices: matchingLayerIndices, // 包含所有共享该ColorIndex的图层索引
                                    level: 2,
                                    parent: groupNode
                                };
                                groupNode.children.push(layerNode);
                            });

                            rootNode.children.push(groupNode);
                        }
                    }
            });

            this.treeNodes = [rootNode];
            // 默认展开根节点
            this.expandedNodes.add('root');
        }

        /**
         * 获取节点的颜色值（RGB十六进制）
         * 返回 {color: string, isMultiple: boolean} 对象
         */
        getNodeColor(node) {
            if (!ItemColorState) return { color: '#FFFFFF', isMultiple: false };
            
            if (node.type === 'layer') {
                const color = ItemColorState.colors[node.colorIndex];
                return {
                    color: color && color.startsWith('#') ? color : '#FFFFFF',
                    isMultiple: false
                };
            } else {
                // 对于分组或根节点，检查所有子节点的颜色是否相同
                if (node.colorIndices && node.colorIndices.length > 0) {
                    const colors = node.colorIndices.map(i => ItemColorState.colors[i]);
                    const firstColor = colors[0];
                    const allSame = colors.every(c => c === firstColor);
                    
                    if (allSame) {
                        return {
                            color: firstColor && firstColor.startsWith('#') ? firstColor : '#FFFFFF',
                            isMultiple: false
                        };
                    } else {
                        return {
                            color: '#FFFFFF',
                            isMultiple: true
                        };
                    }
                }
            }
            return { color: '#FFFFFF', isMultiple: false };
        }

        /**
         * 检查图层是否应该被排除（固定不透明度为1且不显示的图层）
         * @param {number} layerIndex - 图层索引
         * @returns {boolean} - 如果应该排除返回true
         */
        shouldExcludeLayer(layerIndex) {
            if (!ItemColorItem || !ItemColorItem.Asset) return false;

            const layer = ItemColorItem.Asset.Layer[layerIndex];
            if (!layer) return true;

            // 整个物品不允许调透明度
            if (ItemColorState && ItemColorState.editOpacity === false) return true;

            // CommonDraw 会把透明度 clamp 到 [MinOpacity, MaxOpacity]，
            // 两者相等意味着这一层的透明度是固定的，调了也不会变
            if (layer.MinOpacity === layer.MaxOpacity) return true;

            if (layer.Hide === true) return true;

            return false;
        }

        /**
         * 求图层索引实际生效的 Property.Opacity 槽位。
         *
         * CommonDraw 读透明度时是按 layer.Name 去 Asset.Layer 里正向查找、且不 break，
         * 因此同名（含多个 Name 为 null）的图层最终都会落到「最后一个同名层」的槽位上。
         * 这里复刻该行为，保证写入的位置和绘制读取的位置一致。
         * @param {number} layerIndex - 图层索引
         * @returns {number} - 实际生效的槽位索引
         */
        getOpacitySlot(layerIndex) {
            const layers = ItemColorItem?.Asset?.Layer;
            if (!Array.isArray(layers)) return layerIndex;
            const layer = layers[layerIndex];
            if (!layer) return layerIndex;

            const limit = Math.min(layers.length, ItemColorState?.opacity?.length ?? layers.length);
            let slot = 0;
            for (let i = 0; i < limit; i++) {
                if (layers[i].Name === layer.Name) slot = i;
            }
            return slot;
        }

        /**
         * 注册一个挂在 document 上的监听，并记录以便统一解绑。
         * updateWindow 会重建全部行 DOM，若不解绑会逐次累积。
         * @param {string} type - 事件类型
         * @param {Function} handler - 处理函数
         */
        addDocListener(type, handler) {
            document.addEventListener(type, handler);
            this.docListeners.push({ type, handler });
        }

        /**
         * 解绑所有由 addDocListener 注册的监听
         */
        clearDocListeners() {
            this.docListeners.forEach(({ type, handler }) => {
                document.removeEventListener(type, handler);
            });
            this.docListeners = [];
        }

        /**
         * 收集节点（含所有后代）覆盖的图层索引，去重
         * @param {Object} node - 节点对象
         * @returns {number[]} - 图层索引数组
         */
        collectLayerIndices(node) {
            const out = new Set();
            const walk = (n) => {
                if (!n) return;
                if (Array.isArray(n.layerIndices) && n.layerIndices.length > 0) {
                    n.layerIndices.forEach(i => out.add(i));
                } else if (n.layerIndex !== undefined) {
                    out.add(n.layerIndex);
                }
                if (Array.isArray(n.children)) n.children.forEach(walk);
            };
            walk(node);
            return Array.from(out);
        }

        /**
         * 写入某个图层的透明度，同时落到 ItemColorState.opacity 与 Property.Opacity。
         * 两者在 R131 中是同一个数组引用，但显式写入以防本体日后改成拷贝。
         * @param {number} layerIndex - 图层索引
         * @param {number} opacityValue - 透明度值 (0-1)
         */
        writeLayerOpacity(layerIndex, opacityValue) {
            if (!ItemColorState || !ItemColorItem) return;
            const slot = this.getOpacitySlot(layerIndex);
            if (Array.isArray(ItemColorState.opacity)) {
                ItemColorState.opacity[slot] = opacityValue;
            }
            const prop = ItemColorItem.Property;
            if (prop && Array.isArray(prop.Opacity)) {
                prop.Opacity[slot] = opacityValue;
            }
        }

        /**
         * 获取节点的透明度值
         * 返回 {opacity: number, isMultiple: boolean} 对象
         */
        getNodeOpacity(node) {
            if (!ItemColorState) return { opacity: 1.0, isMultiple: false };
            
            if (node.type === 'layer') {
                // 检查是否应该排除
                if (this.shouldExcludeLayer(node.layerIndex)) {
                    return { opacity: 1.0, isMultiple: false, excluded: true };
                }
                // 使用显式检查而不是 ||，因为 0 是有效的透明度值
                const opacityValue = ItemColorState.opacity[this.getOpacitySlot(node.layerIndex)];
                return {
                    opacity: opacityValue !== undefined ? opacityValue : 1.0,
                    isMultiple: false
                };
            } else {
                // 对于分组或根节点，检查所有子节点的透明度是否相同
                // 排除固定不透明度为1的图层
                if (node.layerIndices && node.layerIndices.length > 0) {
                    // 过滤掉应该排除的图层
                    const validLayerIndices = node.layerIndices.filter(i => !this.shouldExcludeLayer(i));
                    
                    if (validLayerIndices.length === 0) {
                        // 所有图层都被排除，返回默认值
                        return { opacity: 1.0, isMultiple: false, excluded: true };
                    }
                    
                    // 使用显式检查而不是 ||，因为 0 是有效的透明度值
                    const opacities = validLayerIndices.map(i => {
                        const val = ItemColorState.opacity[this.getOpacitySlot(i)];
                        return val !== undefined ? val : 1.0;
                    });
                    const firstOpacity = opacities[0];
                    const allSame = opacities.every(o => Math.abs(o - firstOpacity) < 0.001);
                    
                    if (allSame) {
                        return {
                            opacity: firstOpacity,
                            isMultiple: false
                        };
                    } else {
                        return {
                            opacity: firstOpacity,
                            isMultiple: true
                        };
                    }
                }
            }
            return { opacity: 1.0, isMultiple: false };
        }

        /**
         * 设置节点颜色
         */
        setNodeColor(node, color) {
            if (!ItemColorState || !ItemColorItem) return;

            // 如果正在闪烁，先停止闪烁并恢复原始值
            if (this.highlightTimer !== null || this.highlightedNode !== null) {
                this.stopNodeHighlight();
            }

            if (node.type === 'layer') {
                // 单个图层节点：设置该ColorIndex对应的所有图层的颜色
                // 如果节点有layerIndices数组，说明可能有多个图层共享同一个ColorIndex
                if (node.layerIndices && node.layerIndices.length > 0) {
                    // 设置所有共享该ColorIndex的图层的颜色
                    const colorIndex = node.colorIndex;
                    ItemColorState.colors[colorIndex] = color;
                    if (ItemColorItem.Color && Array.isArray(ItemColorItem.Color)) {
                        ItemColorItem.Color[colorIndex] = color;
                    }
                } else {
                    // 兼容旧代码：只设置单个图层
                    ItemColorState.colors[node.colorIndex] = color;
                    if (ItemColorItem.Color && Array.isArray(ItemColorItem.Color)) {
                        ItemColorItem.Color[node.colorIndex] = color;
                    }
                }
            } else {
                // 分组或根节点：设置所有子节点的颜色
                const setColorRecursive = (n) => {
                    if (n.type === 'layer') {
                        // 设置该ColorIndex对应的所有图层的颜色
                        const colorIndex = n.colorIndex;
                        ItemColorState.colors[colorIndex] = color;
                        if (ItemColorItem.Color && Array.isArray(ItemColorItem.Color)) {
                            ItemColorItem.Color[colorIndex] = color;
                        }
                    } else if (n.children) {
                        n.children.forEach(setColorRecursive);
                    } else if (n.colorIndices && n.colorIndices.length > 0) {
                        // 如果是分组节点但没有children，直接设置所有colorIndices
                        n.colorIndices.forEach(colorIndex => {
                            ItemColorState.colors[colorIndex] = color;
                            if (ItemColorItem.Color && Array.isArray(ItemColorItem.Color)) {
                                ItemColorItem.Color[colorIndex] = color;
                            }
                        });
                    }
                };
                setColorRecursive(node);
            }

            // 更新角色渲染
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }

            // 更新UI
            this.updateWindow();
        }

        /**
         * 设置节点透明度
         */
        setNodeOpacity(node, opacityValue) {
            if (!ItemColorState || !ItemColorItem) return;

            // 如果正在闪烁，先停止闪烁并恢复原始值
            if (this.highlightTimer !== null || this.highlightedNode !== null) {
                this.stopNodeHighlight();
            }

            this.collectLayerIndices(node)
                .filter(i => !this.shouldExcludeLayer(i))
                .forEach(i => this.writeLayerOpacity(i, opacityValue));


            // 更新角色渲染
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }

            // 更新UI
            this.updateWindow();
        }

        /**
         * 图层变换属性在 Property 中的键名（与 CommonDraw 的读取一致）
         * @param {Object} layer - 图层对象
         * @returns {string}
         */
        getTransformLayerName(layer) {
            return layer.Name ?? ItemColorItem?.Asset?.Name;
        }

        /**
         * 该物品是否允许图层变换。规则对齐本体 Layering._GetTabContents：
         * 非 AllowNone 的组（Pussy 除外）与 DynamicAfterDraw 资产禁止变换
         * @returns {{allowed: boolean, reason: string}}
         */
        getTransformAvailability() {
            const asset = ItemColorItem?.Asset;
            if (!asset) return { allowed: false, reason: "无物品" };

            const group = asset.Group;
            const isPussy = group?.Name === "Pussy";
            if (group && !group.AllowNone && !isPussy) {
                return { allowed: false, reason: "该部位不支持变换" };
            }
            if (asset.DynamicAfterDraw) {
                return { allowed: false, reason: "该物品不支持变换" };
            }
            return { allowed: true, reason: "" };
        }

        /**
         * 取某个变换分组的有效约束。Pussy 组有特殊限制：
         * 位移仅 Y 轴且 ±20、缩放 0.5~1.5 且 X/Y 联动、不支持旋转
         * @param {Object} group - TRANSFORM_GROUPS 中的一项
         * @returns {null | {min: number, max: number, step: number, precision: number, defaultValue: number, props: Object[], uniform: boolean}}
         */
        getTransformConstraint(group) {
            const asset = ItemColorItem?.Asset;
            const isPussy = asset?.Group?.Name === "Pussy";

            if (!isPussy) {
                return {
                    min: group.min, max: group.max,
                    step: group.step, coarseStep: group.coarseStep ?? group.step,
                    precision: group.precision, defaultValue: group.defaultValue,
                    unit: group.unit ?? "",
                    props: group.props, uniform: false
                };
            }

            if (group.key === "Translation") {
                // X 轴锁定为 0，只保留 Y
                return {
                    min: -20, max: 20, step: 1, coarseStep: 5, precision: 1, defaultValue: 0,
                    unit: group.unit ?? "",
                    props: group.props.filter(p => p.prop === "TranslationY"),
                    uniform: false
                };
            }
            if (group.key === "Scale") {
                return {
                    min: 0.5, max: 1.5, step: 0.01, coarseStep: 0.1, precision: 2, defaultValue: 1.0,
                    unit: group.unit ?? "",
                    props: group.props, uniform: true
                };
            }
            return null; // Pussy 不支持旋转
        }

        /**
         * 读取图层的变换值
         * @param {Object} layer - 图层对象
         * @param {string} prop - 属性名，如 TranslationX
         * @param {number} defaultValue - 未设置时的默认值
         * @returns {number}
         */
        getLayerTransform(layer, prop, defaultValue) {
            const store = ItemColorItem?.Property?.[`Layer${prop}`];
            const value = store?.[this.getTransformLayerName(layer)];
            return typeof value === "number" && !Number.isNaN(value) ? value : defaultValue;
        }

        /**
         * 写入图层的变换值。等于默认值时删除该键，避免留下冗余数据
         * @param {Object} layer - 图层对象
         * @param {string} prop - 属性名
         * @param {number} value - 目标值
         * @param {Object} constraint - getTransformConstraint 的返回值
         */
        setLayerTransform(layer, prop, value, constraint) {
            if (!ItemColorItem) return;
            ItemColorItem.Property ??= {};

            const clamped = Math.max(constraint.min, Math.min(constraint.max, value));
            const rounded = this.roundTransformValue(clamped, constraint);

            // 缩放联动时 X/Y 一起写
            const targets = constraint.uniform && prop.startsWith("Scale")
                ? ["ScaleX", "ScaleY"]
                : [prop];

            const layerName = this.getTransformLayerName(layer);
            for (const target of targets) {
                const key = `Layer${target}`;
                if (rounded === constraint.defaultValue) {
                    if (ItemColorItem.Property[key]) {
                        delete ItemColorItem.Property[key][layerName];
                        if (Object.keys(ItemColorItem.Property[key]).length === 0) {
                            delete ItemColorItem.Property[key];
                        }
                    }
                } else {
                    (ItemColorItem.Property[key] ??= {})[layerName] = rounded;
                }
            }

            this.refreshCharacter();
        }

        /**
         * 重置图层某个变换分组的所有属性
         * @param {Object} layer - 图层对象
         * @param {Object} constraint - getTransformConstraint 的返回值
         * @param {Object} group - TRANSFORM_GROUPS 中的一项
         */
        resetLayerTransform(layer, constraint, group) {
            if (!ItemColorItem?.Property) return;
            const layerName = this.getTransformLayerName(layer);

            // 重置时把整组都清掉（含被 Pussy 约束过滤掉的轴）
            for (const { prop } of group.props) {
                const key = `Layer${prop}`;
                const store = ItemColorItem.Property[key];
                if (!store) continue;
                delete store[layerName];
                if (Object.keys(store).length === 0) {
                    delete ItemColorItem.Property[key];
                }
            }

            this.refreshCharacter();
        }

        /**
         * 该图层在某个变换分组下是否有非默认值
         * @param {Object} layer - 图层对象
         * @param {Object} group - TRANSFORM_GROUPS 中的一项
         * @returns {boolean}
         */
        hasCustomTransform(layer, group) {
            const layerName = this.getTransformLayerName(layer);
            return group.props.some(({ prop }) => {
                const value = ItemColorItem?.Property?.[`Layer${prop}`]?.[layerName];
                return typeof value === "number" && !Number.isNaN(value);
            });
        }

        /**
         * 刷新角色渲染
         */
        refreshCharacter() {
            // 拖拽包围框时一帧内会写多个属性，逐次重建 canvas 太重，
            // 这里只打标记，由拖拽逻辑在写完后统一刷一次
            if (this.deferRefresh) {
                this.refreshPending = true;
                return;
            }
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }
        }

        /**
         * 合并一批变换写入产生的角色刷新，避免同一帧重复重建 canvas
         * @param {Function} fn - 执行写入的函数
         */
        batchRefresh(fn) {
            this.deferRefresh = true;
            this.refreshPending = false;
            try {
                fn();
            } finally {
                this.deferRefresh = false;
            }
            if (this.refreshPending) {
                this.refreshPending = false;
                this.refreshCharacter();
            }
        }

        /**
         * 设置图层优先级
         * @param {Object} node - 节点对象
         * @param {number} layerIndex - 图层索引
         * @param {Object} layer - 图层对象
         * @param {number} priority - 优先级值
         */
        setLayerPriority(node, layerIndex, layer, priority) {
            if (!ItemColorItem || !ItemColorItem.Property) return;

            // 如果正在闪烁，先停止闪烁并恢复原始值
            if (this.highlightTimer !== null || this.highlightedNode !== null || this.highlightedLayerIndex !== null) {
                this.stopNodeHighlight();
                this.stopLayerHighlight();
            }
            
            const asset = ItemColorItem.Asset;
            const layerName = layer.Name ?? asset.Name;
            
            // 初始化 OverridePriority 对象（如果不存在或不是对象）
            if (typeof ItemColorItem.Property.OverridePriority !== 'object' || ItemColorItem.Property.OverridePriority === null) {
                ItemColorItem.Property.OverridePriority = {};
            }
            
            const defaultPriority = layer.Priority ?? 0;
            
            // 如果优先级等于默认值，删除覆盖
            if (priority === defaultPriority) {
                delete ItemColorItem.Property.OverridePriority[layerName];
                // 如果对象为空，设置为 undefined
                if (Object.keys(ItemColorItem.Property.OverridePriority).length === 0) {
                    ItemColorItem.Property.OverridePriority = undefined;
                }
            } else {
                // 设置覆盖优先级
                ItemColorItem.Property.OverridePriority[layerName] = Math.max(-99, Math.min(99, Math.round(priority)));
            }
            
            // 刷新角色显示
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }
        }

        /**
         * 获取单个图层的透明度
         * @param {number} layerIndex - 图层索引
         * @returns {number} 透明度值 (0-1)
         */
        getLayerOpacity(layerIndex) {
            if (!ItemColorState || !Array.isArray(ItemColorState.opacity)) return 1.0;
            // 使用显式检查而不是 ||，因为 0 是有效的透明度值
            const opacityValue = ItemColorState.opacity[this.getOpacitySlot(layerIndex)];
            return opacityValue !== undefined ? opacityValue : 1.0;
        }

        /**
         * 设置单个图层的透明度
         * @param {number} layerIndex - 图层索引
         * @param {number} opacityValue - 透明度值 (0-1)
         */
        setLayerOpacity(layerIndex, opacityValue) {
            if (!ItemColorState || !ItemColorItem) return;

            // 如果正在闪烁，先停止闪烁并恢复原始值
            if (this.highlightTimer !== null || this.highlightedLayerIndex !== null) {
                this.stopLayerHighlight();
            }
            
            this.writeLayerOpacity(layerIndex, opacityValue);

            // 刷新角色显示
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }
        }

        /**
         * 重置图层优先级
         * @param {Object} node - 节点对象
         * @param {number} layerIndex - 图层索引
         * @param {Object} layer - 图层对象
         */
        resetLayerPriority(node, layerIndex, layer) {
            if (!ItemColorItem || !ItemColorItem.Property) return;
            
            const asset = ItemColorItem.Asset;
            const layerName = layer.Name ?? asset.Name;
            
            // 如果 OverridePriority 是对象，删除该图层的覆盖
            if (typeof ItemColorItem.Property.OverridePriority === 'object' && ItemColorItem.Property.OverridePriority !== null) {
                delete ItemColorItem.Property.OverridePriority[layerName];
                // 如果对象为空，设置为 undefined
                if (Object.keys(ItemColorItem.Property.OverridePriority).length === 0) {
                    ItemColorItem.Property.OverridePriority = undefined;
                }
            }
            
            // 刷新角色显示
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }
        }

        /**
         * 设置物品整体优先级
         * @param {number} priority - 优先级值
         */
        setAssetPriority(priority) {
            if (!ItemColorItem || !ItemColorItem.Property) return;
            
            const asset = ItemColorItem.Asset;
            const assetPriority = asset.DrawingPriority ?? asset.Group.DrawingPriority ?? 0;
            
            // 如果优先级等于默认值，设置为 undefined
            if (priority === assetPriority) {
                ItemColorItem.Property.OverridePriority = undefined;
            } else {
                // 如果当前是对象，先转换为整数
                if (typeof ItemColorItem.Property.OverridePriority === 'object' && ItemColorItem.Property.OverridePriority !== null) {
                    ItemColorItem.Property.OverridePriority = undefined;
                }
                // 设置整体优先级
                ItemColorItem.Property.OverridePriority = Math.max(-99, Math.min(99, Math.round(priority)));
            }
            
            // 刷新角色显示
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }
        }

        /**
         * 重置物品整体优先级
         */
        resetAssetPriority() {
            if (!ItemColorItem || !ItemColorItem.Property) return;
            
            ItemColorItem.Property.OverridePriority = undefined;
            
            // 刷新角色显示
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }
        }

        /**
         * 查找节点
         */
        findNodeById(nodeId) {
            const find = (nodes) => {
                for (const node of nodes) {
                    if (node.id === nodeId) return node;
                    if (node.children) {
                        const found = find(node.children);
                        if (found) return found;
                    }
                }
                return null;
            };
            return find(this.treeNodes);
        }

        /**
         * 创建窗口DOM元素
         */
        createWindow() {
            if (this.windowElement) {
                return;
            }

            // 计算窗口位置和大小
            const layout = this.calculateWindowLayout();

            // 创建窗口容器
            this.windowElement = document.createElement('div');
            this.windowElement.id = 'lian-item-color-adjustment-window';
            this.windowElement.style.cssText = `
                position: fixed;
                left: ${layout.left}px;
                top: ${layout.top}px;
                width: ${layout.width}px;
                height: ${layout.height}px;
                background: #F5F5F5;
                border: 2px solid #000;
                border-radius: 5px;
                z-index: 10000;
                display: none;
                flex-direction: column;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            `;

            // 创建标题栏（不可拖动）
            const header = document.createElement('div');
            header.className = 'lian-window-header';
            header.style.cssText = `
                padding: 15px 30px;
                background: #E0E0E0;
                border-bottom: 1px solid #000;
                display: flex;
                justify-content: space-between;
                align-items: center;
                user-select: none;
            `;
            const title = document.createElement('span');
            title.id = 'lian-item-color-adjustment-title';
            title.style.cssText = 'font-weight: bold; font-size: 24px; flex: 1;';
            // 标题会在updateWindow中更新
            header.appendChild(title);

            const closeBtn = document.createElement('button');
            closeBtn.textContent = '关闭';
            closeBtn.style.cssText = `
                padding: 7.5px 22.5px;
                background: #fff;
                border: 1px solid #000;
                cursor: pointer;
                margin-left: 15px;
                font-size: 18px;
            `;
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                this.hide();
            };
            header.appendChild(closeBtn);

            this.windowElement.appendChild(header);

            // 创建内容区域
            const content = document.createElement('div');
            content.id = 'lian-item-color-adjustment-content';
            content.style.cssText = `
                flex: 1;
                overflow-y: auto;
                padding: 15px;
                background: #fff;
                min-height: 0;
            `;
            this.windowElement.appendChild(content);

            // 监听窗口大小变化，自动调整窗口位置和大小
            const resizeHandler = () => {
                const newLayout = this.calculateWindowLayout();
                if (this.windowElement) {
                    this.windowElement.style.left = `${newLayout.left}px`;
                    this.windowElement.style.top = `${newLayout.top}px`;
                    this.windowElement.style.width = `${newLayout.width}px`;
                    this.windowElement.style.height = `${newLayout.height}px`;
                }
            };
            window.addEventListener('resize', resizeHandler);
            this.resizeHandler = resizeHandler;

            // 添加到body
            document.body.appendChild(this.windowElement);
        }


        /**
         * 更新窗口内容
         */
        updateWindow() {
            if (!this.windowElement || !this.isVisible) return;

            // 更新标题为当前服饰名称
            const title = document.getElementById('lian-item-color-adjustment-title');
            if (title && ItemColorItem && ItemColorItem.Asset) {
                const assetName = ItemColorItem.Asset.Name || '衣服调整';
                title.textContent = assetName;
            } else if (title) {
                title.textContent = '衣服调整';
            }

            const content = document.getElementById('lian-item-color-adjustment-content');
            if (!content) return;

            // 保存当前焦点元素
            const activeElement = document.activeElement;
            let focusRestoreInfo = null;
            if (activeElement && content.contains(activeElement)) {
                // 变换输入框：靠 data 属性精确定位，优先于下面基于 min/max 的推断
                const transformRow = activeElement.closest?.('[data-transform-node]');
                if (activeElement.dataset?.transformProp && transformRow) {
                    focusRestoreInfo = {
                        transformNode: transformRow.dataset.transformNode,
                        transformProp: activeElement.dataset.transformProp,
                        selectionStart: activeElement.selectionStart,
                        selectionEnd: activeElement.selectionEnd
                    };
                }

                // 尝试保存焦点信息
                if (!focusRestoreInfo && activeElement.type === 'number') {
                    const nodeRow = activeElement.closest('[data-node-id]');
                    const nodeId = nodeRow?.dataset?.nodeId;
                    const isOpacity = activeElement.min === '0' && activeElement.max === '100';
                    const isLayering = activeElement.min === '-99' && activeElement.max === '99';
                    const selectionStart = activeElement.selectionStart;
                    const selectionEnd = activeElement.selectionEnd;
                    
                    // 检查是否是层级节点的透明度输入框（层级节点没有data-node-id）
                    const isLayeringOpacity = !nodeId && isOpacity && 
                                             activeElement.closest('div[style*="background: #e8e8e8"]');
                    
                    if (nodeId && (isOpacity || isLayering)) {
                        focusRestoreInfo = {
                            nodeId: nodeId,
                            inputType: isOpacity ? 'opacity' : 'layering',
                            selectionStart: selectionStart,
                            selectionEnd: selectionEnd,
                            value: activeElement.value
                        };
                    } else if (isLayeringOpacity) {
                        // 层级节点的透明度输入框，通过层级节点名称来定位
                        const layeringNodeRow = activeElement.closest('div[style*="background: #e8e8e8"]');
                        if (layeringNodeRow) {
                            const layeringNameSpan = layeringNodeRow.querySelector('span');
                            if (layeringNameSpan) {
                                focusRestoreInfo = {
                                    layeringName: layeringNameSpan.textContent,
                                    inputType: 'layeringOpacity',
                                    selectionStart: selectionStart,
                                    selectionEnd: selectionEnd,
                                    value: activeElement.value
                                };
                            }
                        }
                    }
                }
            }

            // 行 DOM 即将全部重建，先解绑上一轮挂到 document 的滑条监听
            this.clearDocListeners();
            content.innerHTML = '';

            // 递归渲染节点
            const renderNode = (node) => {
                const nodeRow = document.createElement('div');
                nodeRow.className = 'lian-tree-node-row';
                nodeRow.dataset.nodeId = node.id;
                nodeRow.style.cssText = `
                    display: flex;
                    align-items: center;
                    padding: 7.5px;
                    margin-left: ${node.level * 30}px;
                    cursor: pointer;
                    border-bottom: 1px solid #E0E0E0;
                    background: ${this.selectedNodeId === node.id ? '#E3F2FD' : 'transparent'};
                    justify-content: space-between;
                `;

                // 展开/折叠图标
                let expandIcon = null;
                if (node.children && node.children.length > 0) {
                    expandIcon = document.createElement('span');
                    expandIcon.textContent = this.expandedNodes.has(node.id) ? '▼' : '▶';
                    expandIcon.style.cssText = 'margin-right: 7.5px; width: 22.5px; display: inline-block; font-size: 18px;';
                    expandIcon.onclick = (e) => {
                        e.stopPropagation();
                        this.toggleNode(node.id);
                    };
                    nodeRow.appendChild(expandIcon);
                } else {
                    const spacer = document.createElement('span');
                    spacer.style.cssText = 'width: 30px; display: inline-block;';
                    nodeRow.appendChild(spacer);
                }

                // 左侧容器（名称）
                const leftContainer = document.createElement('div');
                leftContainer.style.cssText = 'flex: 1; min-width: 0; display: flex; align-items: center;';
                
                // 节点名称
                const nameSpan = document.createElement('span');
                nameSpan.textContent = node.name;
                nameSpan.style.cssText = `
                    flex: 0 1 auto;
                    min-width: 0;
                    max-width: 225px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 18px;
                `;
                leftContainer.appendChild(nameSpan);
                nodeRow.appendChild(leftContainer);

                // 右侧容器（颜色按钮和透明度控件）
                const rightContainer = document.createElement('div');
                rightContainer.style.cssText = 'display: flex; align-items: center; gap: 15px; flex-shrink: 0; margin-right: 30px;';
                
                // 颜色按钮 - 点击后弹出Pickr颜色选择器
                const colorBtn = document.createElement('button');
                const nodeColorInfo = this.getNodeColor(node);
                const displayColor = nodeColorInfo.isMultiple ? '#FFFFFF' : nodeColorInfo.color;
                const displayText = nodeColorInfo.isMultiple ? '复数' : nodeColorInfo.color.toUpperCase();
                colorBtn.textContent = displayText;
                colorBtn.style.cssText = `
                    width: 150px;
                    height: 45px;
                    background: ${displayColor};
                    color: ${this.getContrastColor(displayColor)};
                    border: 1px solid #000;
                    cursor: pointer;
                    font-size: 18px;
                `;
                colorBtn.onclick = (e) => {
                    e.stopPropagation();
                    // 如果正在闪烁，先停止闪烁并恢复原始值
                    if (this.highlightTimer !== null || this.highlightedNode !== null) {
                        this.stopNodeHighlight();
                    }
                    // 获取当前颜色
                    const nodeColorInfo = this.getNodeColor(node);
                    const currentColor = nodeColorInfo.isMultiple ? '#FFFFFF' : nodeColorInfo.color;
                    
                    // 获取默认颜色（用于重置）
                    // 参考 ItemColor.js 中的 ItemColorNextColor 函数
                    const canResetToDefault = () => {
                        if (!ItemColorState || !ItemColorItem) return false;
                        if (node.type === 'layer') {
                            // 单个图层节点：检查是否有默认颜色
                            return node.colorIndex !== undefined && 
                                   ItemColorState.defaultColors && 
                                   ItemColorState.defaultColors[node.colorIndex] !== undefined;
                        } else {
                            // 分组或根节点：检查所有子节点是否都有默认颜色
                            if (node.colorIndices && node.colorIndices.length > 0) {
                                return node.colorIndices.every(i => 
                                    ItemColorState.defaultColors && 
                                    ItemColorState.defaultColors[i] !== undefined
                                );
                            }
                        }
                        return false;
                    };
                    
                    const hasDefaultColor = canResetToDefault();
                    
                    // 重置回调函数（参考 ItemColor.js 中的重置逻辑）
                    const onReset = hasDefaultColor ? () => {
                        if (!ItemColorState || !ItemColorItem) return;
                        
                        if (node.type === 'layer') {
                            // 单个图层节点：重置该ColorIndex的默认颜色
                            const colorIndex = node.colorIndex;
                            ItemColorState.colors[colorIndex] = ItemColorState.defaultColors[colorIndex];
                            if (ItemColorItem.Color && Array.isArray(ItemColorItem.Color)) {
                                ItemColorItem.Color[colorIndex] = ItemColorState.defaultColors[colorIndex];
                            }
                        } else {
                            // 分组或根节点：重置所有子节点的默认颜色
                            const resetColorRecursive = (n) => {
                                if (n.type === 'layer') {
                                    const colorIndex = n.colorIndex;
                                    ItemColorState.colors[colorIndex] = ItemColorState.defaultColors[colorIndex];
                                    if (ItemColorItem.Color && Array.isArray(ItemColorItem.Color)) {
                                        ItemColorItem.Color[colorIndex] = ItemColorState.defaultColors[colorIndex];
                                    }
                                } else if (n.children) {
                                    n.children.forEach(child => resetColorRecursive(child));
                                }
                            };
                            resetColorRecursive(node);
                        }
                        
                        // 刷新角色显示（参考 ItemColor.js）
                        if (typeof CharacterLoadCanvas === 'function' && ItemColorCharacter) {
                            CharacterLoadCanvas(ItemColorCharacter);
                        }
                        
                        // 更新按钮显示
                        const updatedColorInfo = this.getNodeColor(node);
                        colorBtn.textContent = updatedColorInfo.isMultiple ? '复数' : updatedColorInfo.color.toUpperCase();
                        colorBtn.style.background = updatedColorInfo.isMultiple ? '#FFFFFF' : updatedColorInfo.color;
                        colorBtn.style.color = this.getContrastColor(updatedColorInfo.isMultiple ? '#FFFFFF' : updatedColorInfo.color);
                        // 关闭颜色选择器面板
                        this.colorPickerPanel.hide();
                    } : null;
                    
                    // 显示颜色选择器面板（弹出窗口，color input 默认展开显示）
                    this.colorPickerPanel.show(colorBtn, currentColor, (newColor) => {
                        this.setNodeColor(node, newColor);
                        // 更新按钮显示
                        const updatedColorInfo = this.getNodeColor(node);
                        colorBtn.textContent = updatedColorInfo.isMultiple ? '复数' : updatedColorInfo.color.toUpperCase();
                        colorBtn.style.background = updatedColorInfo.isMultiple ? '#FFFFFF' : updatedColorInfo.color;
                        colorBtn.style.color = this.getContrastColor(updatedColorInfo.isMultiple ? '#FFFFFF' : updatedColorInfo.color);
                    }, onReset);
                };
                rightContainer.appendChild(colorBtn);

                // 透明度控件容器
                const opacityContainer = document.createElement('div');
                opacityContainer.style.cssText = 'display: flex; align-items: center; width: 225px;';
                
                const opacityInfo = this.getNodeOpacity(node);
                
                // 如果子节点透明度不同，显示Reset按钮
                if (opacityInfo.isMultiple) {
                    const resetButton = document.createElement('button');
                    resetButton.textContent = '重置不透明度';
                    resetButton.style.cssText = `
                        width: 100%;
                        height: 45px;
                        background: #4CAF50;
                        color: white;
                        border: 1px solid #000;
                        cursor: pointer;
                        font-size: 18px;
                    `;
                    resetButton.onclick = (e) => {
                        e.stopPropagation();
                        
                        // 统一设置为100%透明度
                        this.setNodeOpacity(node, 1.0);
                        
                        // 更新窗口以显示控件
                        this.updateWindow();
                    };
                    opacityContainer.appendChild(resetButton);
                } else {
                    // 子节点透明度相同，显示滑条和输入框
                    const opacitySlider = document.createElement('input');
                    opacitySlider.type = 'range';
                    opacitySlider.min = '0';
                    opacitySlider.max = '100';
                    const sliderOpacityPercentValue = Math.round(opacityInfo.opacity * 100);
                    opacitySlider.value = String(sliderOpacityPercentValue);
                    opacitySlider.style.cssText = 'flex: 1; margin-right: 7.5px;';
                    
                    // 鼠标按下时开始拖动
                    let isDraggingOpacity = false;
                    let sliderStartX = 0;
                    let sliderStartValue = 0;
                    let sliderWidth = 0;
                    
                    opacitySlider.addEventListener('mousedown', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // 设置交互标志，禁止闪烁
                        this.isInteracting = true;
                        // 如果正在闪烁，先停止闪烁并恢复原始值
                        if (this.highlightTimer !== null || this.highlightedNode !== null) {
                            this.stopNodeHighlight();
                        }
                        isDraggingOpacity = true;
                        const rect = opacitySlider.getBoundingClientRect();
                        sliderStartX = e.clientX;
                        sliderStartValue = parseFloat(opacitySlider.value) || 0;
                        sliderWidth = rect.width;
                    });
                    
                    // 鼠标移动时持续更新
                    const opacityMouseMoveHandler = (e) => {
                        if (isDraggingOpacity) {
                            const deltaX = e.clientX - sliderStartX;
                            const deltaPercent = (deltaX / sliderWidth) * 100;
                            let newPercent = sliderStartValue + deltaPercent;
                            
                            if (newPercent < 0) {
                                newPercent = 0;
                            } else if (newPercent > 100) {
                                newPercent = 100;
                            }
                            
                            const opacityValue = newPercent / 100;
                            const roundedValue = Math.round(newPercent);
                            const valueString = String(roundedValue);
                            
                            opacitySlider.setAttribute('value', valueString);
                            opacitySlider.value = valueString;
                            this.setNodeOpacity(node, opacityValue);
                            
                            if (opacityInput) {
                                opacityInput.value = valueString;
                            }
                            
                            if (roundedValue === 0) {
                                opacitySlider.value = '0';
                                opacitySlider.setAttribute('value', '0');
                            }
                        }
                    };
                    
                    const opacityMouseUpHandler = () => {
                        isDraggingOpacity = false;
                        // 延迟清除交互标志，防止 mouseup 后立即触发 mouseenter
                        setTimeout(() => {
                            this.isInteracting = false;
                        }, 100);
                    };
                    
                    this.addDocListener('mousemove', opacityMouseMoveHandler);
                    this.addDocListener('mouseup', opacityMouseUpHandler);
                    
                    opacitySlider.addEventListener('input', (e) => {
                        if (!isDraggingOpacity) {
                            // 如果正在闪烁，先停止闪烁并恢复原始值
                            if (this.highlightTimer !== null || this.highlightedNode !== null) {
                                this.stopNodeHighlight();
                            }
                            const value = e.target.value;
                            if (value === '' || isNaN(value)) {
                                return;
                            }
                            const intValue = Math.max(0, Math.min(100, parseInt(value)));
                            const opacityValue = intValue / 100;
                            this.setNodeOpacity(node, opacityValue);
                            opacityInput.value = String(intValue);
                            opacitySlider.value = String(intValue);
                            opacitySlider.setAttribute('value', String(intValue));
                        }
                    });
                    
                    opacityContainer.appendChild(opacitySlider);

                    // 透明度输入框
                    const opacityInput = document.createElement('input');
                    opacityInput.type = 'number';
                    opacityInput.min = '0';
                    opacityInput.max = '100';
                    opacityInput.value = String(sliderOpacityPercentValue);
                    opacityInput.style.cssText = 'width: 75px; padding: 3px; margin-right: 4.5px; font-size: 18px; text-align: center;';
                    
                    // 实时生效：使用 input 事件而不是 change 事件
                    opacityInput.addEventListener('input', (e) => {
                        // 如果正在闪烁，先停止闪烁并恢复原始值
                        if (this.highlightTimer !== null || this.highlightedNode !== null) {
                            this.stopNodeHighlight();
                        }
                        const value = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                        opacityInput.value = value;
                        opacitySlider.value = value;
                        opacitySlider.setAttribute('value', String(value));
                        this.setNodeOpacity(node, value / 100);
                        // 不立即更新窗口，只在失去焦点时更新
                    });
                    
                    opacityInput.addEventListener('blur', (e) => {
                        // 失去焦点时更新窗口
                        this.updateWindow();
                    });
                    
                    // 支持滚轮调整
                    opacityInput.addEventListener('wheel', (e) => {
                        e.preventDefault();
                        const currentValue = parseInt(opacityInput.value) || 0;
                        const delta = e.deltaY > 0 ? -1 : 1;
                        const newValue = Math.max(0, Math.min(100, currentValue + delta));
                        opacityInput.value = String(newValue);
                        opacitySlider.value = String(newValue);
                        opacitySlider.setAttribute('value', String(newValue));
                        this.setNodeOpacity(node, newValue / 100);
                        // 滚轮调整时不更新窗口，保持焦点
                    });
                    
                    opacityContainer.appendChild(opacityInput);

                    const opacityPercent = document.createElement('span');
                    opacityPercent.textContent = '%';
                    opacityPercent.style.cssText = 'font-size: 18px;';
                    opacityContainer.appendChild(opacityPercent);
                }

                rightContainer.appendChild(opacityContainer);
                
                // 层级设置按钮（对 layer 类型节点和 root 节点显示）
                let layeringBtn = null;
                if ((node.type === 'layer' || node.type === 'root') && node.layerIndices && node.layerIndices.length > 0) {
                    const layeringSpacer = document.createElement('div');
                    layeringSpacer.style.cssText = 'width: 30px;'; // 空一段距离
                    rightContainer.appendChild(layeringSpacer);
                    
                    layeringBtn = document.createElement('button');
                    layeringBtn.className = 'layering-expand-btn'; // 添加类名以便查找
                    layeringBtn.style.cssText = `
                        width: 45px;
                        height: 45px;
                        background: transparent;
                        border: 1px solid #000;
                        cursor: pointer;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    `;
                    
                    // 加载图标
                    const layeringIcon = document.createElement('img');
                    layeringIcon.src = 'Icons/Dress.png';
                    layeringIcon.style.cssText = 'width: 30px; height: 30px; object-fit: contain;';
                    layeringIcon.onerror = () => {
                        // 如果图标加载失败，显示文字
                        layeringIcon.style.display = 'none';
                        layeringBtn.textContent = '层';
                        layeringBtn.style.fontSize = '18px';
                    };
                    layeringBtn.appendChild(layeringIcon);
                    
                    const isLayeringExpanded = this.expandedLayeringNodes.has(node.id);
                    layeringBtn.style.background = isLayeringExpanded ? '#e0e0e0' : 'transparent';
                    
                    layeringBtn.onclick = (e) => {
                        e.stopPropagation();
                        if (this.expandedLayeringNodes.has(node.id)) {
                            this.expandedLayeringNodes.delete(node.id);
                        } else {
                            this.expandedLayeringNodes.add(node.id);
                        }
                        this.updateWindow();
                    };
                    
                    rightContainer.appendChild(layeringBtn);
                }
                
                nodeRow.appendChild(rightContainer);

                // 鼠标悬浮效果（背景色变化）
                nodeRow.addEventListener('mouseenter', (e) => {
                    if (this.selectedNodeId !== node.id) {
                        nodeRow.style.background = '#F5F5F5';
                    }
                });
                
                nodeRow.addEventListener('mouseleave', (e) => {
                    if (this.selectedNodeId !== node.id) {
                        nodeRow.style.background = 'transparent';
                    }
                });

                // 鼠标悬浮闪烁（使用透明度闪烁）
                // 使用标志防止点击时触发重复闪烁
                let isMouseInside = false;
                nodeRow.addEventListener('mouseenter', (e) => {
                    // 如果正在交互（点击/拖动），不触发闪烁
                    if (this.isInteracting) return;
                    // 如果鼠标已经在内部（比如点击后鼠标还在元素上），不触发新的闪烁
                    if (isMouseInside) return;
                    isMouseInside = true;
                    this.hoveredNodeId = node.id;
                    this.startNodeHighlight(node);
                });
                
                nodeRow.addEventListener('mouseleave', (e) => {
                    isMouseInside = false;
                    if (this.hoveredNodeId === node.id) {
                        this.hoveredNodeId = null;
                    }
                    this.stopNodeHighlight();
                });
                
                // 在点击/拖动期间禁止闪烁
                nodeRow.addEventListener('mousedown', (e) => {
                    this.isInteracting = true;
                    // 停止当前闪烁
                    this.stopNodeHighlight();
                });
                
                nodeRow.addEventListener('mouseup', (e) => {
                    // 延迟清除交互标志，防止 mouseup 后立即触发 mouseenter
                    setTimeout(() => {
                        this.isInteracting = false;
                    }, 100);
                });
                

                // 点击选中
                nodeRow.onclick = (e) => {
                    // 检查点击的目标是否是交互元素
                    const opacitySlider = opacityContainer.querySelector('input[type="range"]');
                    const opacityInput = opacityContainer.querySelector('input[type="number"]');
                    const opacityPercent = opacityContainer.querySelector('span');
                    const resetButton = opacityContainer.querySelector('button');
                    
                    const isInteractiveElement = 
                        (expandIcon && (e.target === expandIcon || expandIcon.contains(e.target))) ||
                        e.target === colorBtn ||
                        colorBtn.contains(e.target) ||
                        (opacitySlider && (e.target === opacitySlider || opacitySlider.contains(e.target))) ||
                        (opacityInput && (e.target === opacityInput || opacityInput.contains(e.target))) ||
                        (opacityPercent && (e.target === opacityPercent || opacityPercent.contains(e.target))) ||
                        (resetButton && (e.target === resetButton || resetButton.contains(e.target))) ||
                        (layeringBtn && (e.target === layeringBtn || layeringBtn.contains(e.target)));
                    
                    if (!isInteractiveElement) {
                        // 如果有子节点（group类型），点击节点行时展开/收起子节点
                        if (node.children && node.children.length > 0) {
                            if (this.expandedNodes.has(node.id)) {
                                this.expandedNodes.delete(node.id);
                            } else {
                                this.expandedNodes.add(node.id);
                            }
                        }
                        // 如果有层级按钮，点击节点行时展开/收起层级节点
                        if (layeringBtn && (node.type === 'layer' || node.type === 'root') && node.layerIndices && node.layerIndices.length > 0) {
                            if (this.expandedLayeringNodes.has(node.id)) {
                                this.expandedLayeringNodes.delete(node.id);
                            } else {
                                this.expandedLayeringNodes.add(node.id);
                            }
                        }
                        this.selectedNodeId = node.id;
                        this.updateWindow();
                    }
                };

                content.appendChild(nodeRow);

                // root节点特殊处理：在子节点之前渲染层级节点
                if (node.type === 'root' && node.layerIndices && node.layerIndices.length > 0 && this.expandedLayeringNodes.has(node.id)) {
                    const asset = ItemColorItem?.Asset;
                    if (asset && asset.Layer) {
                            // 显示一个整体的层级节点
                            const overridePriority = ItemColorItem?.Property?.OverridePriority;
                            const assetPriority = asset.DrawingPriority ?? asset.Group.DrawingPriority ?? 0;
                            
                            // 如果OverridePriority是整数，使用它；否则使用默认值
                            const currentPriority = Number.isInteger(overridePriority) ? overridePriority : assetPriority;
                            const defaultPriority = assetPriority;
                            const hasCustomPriority = Number.isInteger(overridePriority) && currentPriority !== defaultPriority;
                            
                            const layeringNodeRow = document.createElement('div');
                            layeringNodeRow.style.cssText = `
                                display: flex;
                                align-items: center;
                                padding: 7.5px 15px 7.5px ${(node.level + 1) * 30 + 15}px;
                                border-bottom: 1px solid #ddd;
                                background: #e8e8e8;
                            `;
                            
                            const layeringNameSpan = document.createElement('span');
                            layeringNameSpan.textContent = '物品整体层级';
                            layeringNameSpan.style.cssText = `
                                flex: 0 1 auto;
                                min-width: 0;
                                max-width: 225px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-right: 15px;
                                font-size: 18px;
                            `;
                            layeringNodeRow.appendChild(layeringNameSpan);
                            
                            const layeringRightContainer = document.createElement('div');
                            layeringRightContainer.style.cssText = 'margin-left: auto; display: flex; align-items: center; gap: 7.5px;';
                            
                            // 根据OverridePriority状态显示不同的控件
                            const isOverridePriority = Number.isInteger(overridePriority);
                            let layeringInput = null;
                            let enableAssetPriorityButton = null;
                            
                            if (!isOverridePriority) {
                                // 不是OverridePriority时，显示"启用整体层级"按钮
                                enableAssetPriorityButton = document.createElement('button');
                                enableAssetPriorityButton.textContent = '启用整体层级';
                                enableAssetPriorityButton.style.cssText = `
                                    padding: 6px 12px;
                                    background: #4CAF50;
                                    color: white;
                                    border: 1px solid #000;
                                    cursor: pointer;
                                    font-size: 16.5px;
                                `;
                                enableAssetPriorityButton.onclick = (e) => {
                                    e.stopPropagation();
                                    // 强制设置为整数，启用整体层级（即使等于默认值也要设置）
                                    if (!ItemColorItem || !ItemColorItem.Property) return;
                                    ItemColorItem.Property.OverridePriority = assetPriority;
                                    if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                                        CharacterLoadCanvas(ItemColorCharacter);
                                    }
                                    this.updateWindow();
                                };
                                layeringRightContainer.appendChild(enableAssetPriorityButton);
                            } else {
                                // 是OverridePriority时，显示输入框
                                const layeringInputContainer = document.createElement('div');
                                layeringInputContainer.style.cssText = 'display: flex; align-items: center; gap: 3px;';
                                
                                layeringInput = document.createElement('input');
                                layeringInput.type = 'number';
                                layeringInput.min = '-99';
                                layeringInput.max = '99';
                                layeringInput.value = String(currentPriority);
                                layeringInput.defaultValue = String(defaultPriority);
                                layeringInput.style.cssText = `
                                    width: 90px;
                                    padding: 6px;
                                    border: 1px solid #000;
                                    font-size: 18px;
                                    text-align: center;
                                `;
                                
                                layeringInput.addEventListener('input', (e) => {
                                    const value = e.target.valueAsNumber;
                                    if (!isNaN(value)) {
                                        const clampedValue = Math.max(-99, Math.min(99, Math.round(value)));
                                        this.setAssetPriority(clampedValue);
                                        // 不立即更新窗口，只在失去焦点时更新
                                    }
                                });
                                
                                layeringInput.addEventListener('blur', (e) => {
                                    // 失去焦点时更新窗口
                                    this.updateWindow();
                                });
                                
                                layeringInput.addEventListener('focus', (e) => {
                                    e.target.select();
                                });
                                
                                layeringInput.addEventListener('wheel', (e) => {
                                    e.preventDefault();
                                    const currentValue = parseInt(layeringInput.value) || 0;
                                    const delta = e.deltaY > 0 ? -1 : 1;
                                    const newValue = Math.max(-99, Math.min(99, currentValue + delta));
                                    layeringInput.value = String(newValue);
                                    this.setAssetPriority(newValue);
                                    // 滚轮调整时不更新窗口，保持焦点
                                });
                                
                                layeringInputContainer.appendChild(layeringInput);
                                layeringRightContainer.appendChild(layeringInputContainer);
                            }
                            
                            const resetLayeringButton = document.createElement('button');
                            resetLayeringButton.textContent = '重置层级';
                            resetLayeringButton.style.cssText = `
                                padding: 6px 12px;
                                background: #FF9800;
                                color: white;
                                border: 1px solid #000;
                                cursor: pointer;
                                font-size: 16.5px;
                                margin-left: 7.5px;
                                visibility: ${hasCustomPriority ? 'visible' : 'hidden'};
                            `;
                            resetLayeringButton.onclick = (e) => {
                                e.stopPropagation();
                                this.resetAssetPriority();
                                this.updateWindow();
                            };
                            layeringRightContainer.appendChild(resetLayeringButton);
                            
                            layeringNodeRow.appendChild(layeringRightContainer);
                            
                            // 鼠标悬浮闪烁（物品整体层级节点，使用透明度闪烁）
                            layeringNodeRow.addEventListener('mouseenter', (e) => {
                                // 物品整体层级：闪烁整个物品（root节点）
                                const rootNode = this.treeNodes.find(n => n.type === 'root');
                                if (rootNode) {
                                    this.startNodeHighlight(rootNode);
                                }
                            });
                            
                            layeringNodeRow.addEventListener('mouseleave', (e) => {
                                this.stopNodeHighlight();
                            });
                            
                            layeringNodeRow.onclick = (e) => {
                                const isInteractiveElement = 
                                    (layeringInput && (e.target === layeringInput || layeringInput.contains(e.target))) ||
                                    (enableAssetPriorityButton && (e.target === enableAssetPriorityButton || enableAssetPriorityButton.contains(e.target))) ||
                                    (resetLayeringButton && (e.target === resetLayeringButton || resetLayeringButton.contains(e.target)));
                                
                                if (!isInteractiveElement) {
                                    this.selectedNodeId = `${node.id}_layering_asset`;
                                    this.updateWindow();
                                }
                            };
                            
                            content.appendChild(layeringNodeRow);
                    }
                }

                // 渲染子节点
                if (node.children && this.expandedNodes.has(node.id)) {
                    node.children.forEach(child => renderNode(child));
                }
                
                // 渲染层级子节点（对 layer 类型节点）
                if (node.type === 'layer' && node.layerIndices && node.layerIndices.length > 0 && this.expandedLayeringNodes.has(node.id)) {
                    const asset = ItemColorItem?.Asset;
                    if (asset && asset.Layer) {
                        // 为每个物理图层创建一个层级节点（即使它们共享 ColorIndex）
                        node.layerIndices.forEach((layerIndex) => {
                            const layer = asset.Layer[layerIndex];
                            if (!layer) return;
                            
                            const layerName = layer.Name || `Layer ${layerIndex + 1}`;
                            const layeringNodeId = `${node.id}_layering_${layerIndex}`;
                            
                            // 创建层级节点行
                            const layeringNodeRow = document.createElement('div');
                            layeringNodeRow.style.cssText = `
                                display: flex;
                                align-items: center;
                                padding: 7.5px 15px 7.5px ${(node.level + 1) * 30 + 15}px;
                                border-bottom: 1px solid #ddd;
                                background: #e8e8e8;
                            `;
                            
                            // 节点名称
                            const layeringNameSpan = document.createElement('span');
                            layeringNameSpan.textContent = layerName;
                            layeringNameSpan.style.cssText = `
                                flex: 0 1 auto;
                                min-width: 0;
                                max-width: 225px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-right: 15px;
                                font-size: 18px;
                            `;
                            layeringNodeRow.appendChild(layeringNameSpan);
                            
                            // 右侧控件容器
                            const layeringRightContainer = document.createElement('div');
                            layeringRightContainer.style.cssText = 'margin-left: auto; display: flex; align-items: center; gap: 7.5px;';
                            
                            // 层级值输入框和上下按钮
                            const layeringInputContainer = document.createElement('div');
                            layeringInputContainer.style.cssText = 'display: flex; align-items: center; gap: 3px;';
                            
                            // 检查OverridePriority状态
                            const overridePriority = ItemColorItem?.Property?.OverridePriority;
                            const isOverridePriority = Number.isInteger(overridePriority);
                            
                            // 获取当前层级值
                            const getLayerPriority = () => {
                                if (!ItemColorItem || !ItemColorItem.Property) return layer.Priority ?? 0;
                                if (typeof overridePriority === 'object' && overridePriority !== null) {
                                    const layerName = layer.Name ?? asset.Name;
                                    return overridePriority[layerName] ?? layer.Priority ?? 0;
                                }
                                return layer.Priority ?? 0;
                            };
                            
                            const defaultPriority = layer.Priority ?? 0;
                            const currentPriority = getLayerPriority();
                            const hasCustomPriority = currentPriority !== defaultPriority;
                            
                            let layeringInput = null;
                            let enableDifferentPriorityButton = null;
                            
                            if (isOverridePriority) {
                                // 如果OverridePriority是整数（整体层级），显示"启用不同层级"按钮
                                enableDifferentPriorityButton = document.createElement('button');
                                enableDifferentPriorityButton.textContent = '启用不同层级';
                                enableDifferentPriorityButton.style.cssText = `
                                    padding: 6px 12px;
                                    background: #2196F3;
                                    color: white;
                                    border: 1px solid #000;
                                    cursor: pointer;
                                    font-size: 16.5px;
                                `;
                                enableDifferentPriorityButton.onclick = (e) => {
                                    e.stopPropagation();
                                    // 将OverridePriority从整数转换为对象，并设置当前图层的优先级
                                    if (!ItemColorItem || !ItemColorItem.Property) return;
                                    ItemColorItem.Property.OverridePriority = {};
                                    const layerName = layer.Name ?? asset.Name;
                                    ItemColorItem.Property.OverridePriority[layerName] = defaultPriority;
                                    if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                                        CharacterLoadCanvas(ItemColorCharacter);
                                    }
                                    this.updateWindow();
                                };
                                layeringRightContainer.appendChild(enableDifferentPriorityButton);
                            } else {
                                // 层级值输入框
                                layeringInput = document.createElement('input');
                                layeringInput.type = 'number';
                                layeringInput.min = '-99';
                                layeringInput.max = '99';
                                layeringInput.value = String(currentPriority);
                                layeringInput.defaultValue = String(defaultPriority);
                                layeringInput.style.cssText = `
                                    width: 90px;
                                    padding: 6px;
                                    border: 1px solid #000;
                                    font-size: 18px;
                                    text-align: center;
                                `;
                                
                                // 输入框事件
                                layeringInput.addEventListener('input', (e) => {
                                    const value = e.target.valueAsNumber;
                                    if (!isNaN(value)) {
                                        const clampedValue = Math.max(-99, Math.min(99, Math.round(value)));
                                        this.setLayerPriority(node, layerIndex, layer, clampedValue);
                                        // 不立即更新窗口，只在失去焦点时更新
                                    }
                                });
                                
                                layeringInput.addEventListener('blur', (e) => {
                                    // 失去焦点时更新窗口
                                    this.updateWindow();
                                });
                                
                                layeringInput.addEventListener('focus', (e) => {
                                    e.target.select();
                                });
                                
                                layeringInput.addEventListener('wheel', (e) => {
                                    e.preventDefault();
                                    const currentValue = parseInt(layeringInput.value) || 0;
                                    const delta = e.deltaY > 0 ? -1 : 1;
                                    const newValue = Math.max(-99, Math.min(99, currentValue + delta));
                                    layeringInput.value = String(newValue);
                                    this.setLayerPriority(node, layerIndex, layer, newValue);
                                    // 滚轮调整时不更新窗口，保持焦点
                                });
                                
                                layeringInputContainer.appendChild(layeringInput);
                                
                                layeringRightContainer.appendChild(layeringInputContainer);
                            }
                            
                            // 透明度控件容器
                            const layeringOpacityContainer = document.createElement('div');
                            layeringOpacityContainer.style.cssText = 'display: flex; align-items: center; width: 225px; margin-left: 15px;';
                            
                            // 获取当前图层的透明度
                            const currentLayerOpacity = this.getLayerOpacity(layerIndex);
                            const opacityPercentValue = Math.round(currentLayerOpacity * 100);
                            
                            // 透明度滑条
                            const layeringOpacitySlider = document.createElement('input');
                            layeringOpacitySlider.type = 'range';
                            layeringOpacitySlider.min = '0';
                            layeringOpacitySlider.max = '100';
                            layeringOpacitySlider.value = String(opacityPercentValue);
                            layeringOpacitySlider.style.cssText = 'flex: 1; margin-right: 7.5px;';
                            
                            // 鼠标按下时开始拖动
                            let isDraggingLayeringOpacity = false;
                            let layeringSliderStartX = 0;
                            let layeringSliderStartValue = 0;
                            let layeringSliderWidth = 0;
                            
                            layeringOpacitySlider.addEventListener('mousedown', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // 设置交互标志，禁止闪烁
                                this.isInteracting = true;
                                // 如果正在闪烁，先停止闪烁并恢复原始值
                                if (this.highlightTimer !== null || this.highlightedLayerIndex !== null) {
                                    this.stopLayerHighlight();
                                }
                                isDraggingLayeringOpacity = true;
                                const rect = layeringOpacitySlider.getBoundingClientRect();
                                layeringSliderStartX = e.clientX;
                                layeringSliderStartValue = parseFloat(layeringOpacitySlider.value) || 0;
                                layeringSliderWidth = rect.width;
                            });
                            
                            // 鼠标移动时持续更新
                            const layeringOpacityMouseMoveHandler = (e) => {
                                if (isDraggingLayeringOpacity) {
                                    const deltaX = e.clientX - layeringSliderStartX;
                                    const deltaPercent = (deltaX / layeringSliderWidth) * 100;
                                    let newPercent = layeringSliderStartValue + deltaPercent;
                                    
                                    if (newPercent < 0) {
                                        newPercent = 0;
                                    } else if (newPercent > 100) {
                                        newPercent = 100;
                                    }
                                    
                                    const opacityValue = newPercent / 100;
                                    const roundedValue = Math.round(newPercent);
                                    const valueString = String(roundedValue);
                                    
                                    layeringOpacitySlider.setAttribute('value', valueString);
                                    layeringOpacitySlider.value = valueString;
                                    this.setLayerOpacity(layerIndex, opacityValue);
                                    
                                    if (layeringOpacityInput) {
                                        layeringOpacityInput.value = valueString;
                                    }
                                    
                                    if (roundedValue === 0) {
                                        layeringOpacitySlider.value = '0';
                                        layeringOpacitySlider.setAttribute('value', '0');
                                    }
                                }
                            };
                            
                            const layeringOpacityMouseUpHandler = () => {
                                isDraggingLayeringOpacity = false;
                                // 延迟清除交互标志，防止 mouseup 后立即触发 mouseenter
                                setTimeout(() => {
                                    this.isInteracting = false;
                                }, 100);
                            };
                            
                            this.addDocListener('mousemove', layeringOpacityMouseMoveHandler);
                            this.addDocListener('mouseup', layeringOpacityMouseUpHandler);
                            
                            layeringOpacitySlider.addEventListener('input', (e) => {
                                if (!isDraggingLayeringOpacity) {
                                    // 如果正在闪烁，先停止闪烁并恢复原始值
                                    if (this.highlightTimer !== null || this.highlightedLayerIndex !== null) {
                                        this.stopLayerHighlight();
                                    }
                                    const value = e.target.value;
                                    if (value === '' || isNaN(value)) {
                                        return;
                                    }
                                    const intValue = Math.max(0, Math.min(100, parseInt(value)));
                                    const opacityValue = intValue / 100;
                                    this.setLayerOpacity(layerIndex, opacityValue);
                                    layeringOpacityInput.value = String(intValue);
                                    layeringOpacitySlider.value = String(intValue);
                                    layeringOpacitySlider.setAttribute('value', String(intValue));
                                }
                            });
                            
                            layeringOpacityContainer.appendChild(layeringOpacitySlider);
                            
                            // 透明度输入框
                            const layeringOpacityInput = document.createElement('input');
                            layeringOpacityInput.type = 'number';
                            layeringOpacityInput.min = '0';
                            layeringOpacityInput.max = '100';
                            layeringOpacityInput.value = String(opacityPercentValue);
                            layeringOpacityInput.style.cssText = 'width: 75px; padding: 3px; margin-right: 4.5px; font-size: 18px; text-align: center;';
                            
                            // 实时生效：使用 input 事件而不是 change 事件
                            layeringOpacityInput.addEventListener('input', (e) => {
                                const value = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                                layeringOpacityInput.value = value;
                                layeringOpacitySlider.value = value;
                                layeringOpacitySlider.setAttribute('value', String(value));
                                this.setLayerOpacity(layerIndex, value / 100);
                                // 不立即更新窗口，只在失去焦点时更新
                            });
                            
                            layeringOpacityInput.addEventListener('blur', (e) => {
                                // 失去焦点时更新窗口
                                this.updateWindow();
                            });
                            
                            // 支持滚轮调整
                            layeringOpacityInput.addEventListener('wheel', (e) => {
                                e.preventDefault();
                                // 如果正在闪烁，先停止闪烁并恢复原始值
                                if (this.highlightTimer !== null || this.highlightedLayerIndex !== null) {
                                    this.stopLayerHighlight();
                                }
                                const currentValue = parseInt(layeringOpacityInput.value) || 0;
                                const delta = e.deltaY > 0 ? -1 : 1;
                                const newValue = Math.max(0, Math.min(100, currentValue + delta));
                                layeringOpacityInput.value = String(newValue);
                                layeringOpacitySlider.value = String(newValue);
                                layeringOpacitySlider.setAttribute('value', String(newValue));
                                this.setLayerOpacity(layerIndex, newValue / 100);
                                // 滚轮调整时不更新窗口，保持焦点
                            });
                            
                            layeringOpacityContainer.appendChild(layeringOpacityInput);
                            
                            const layeringOpacityPercent = document.createElement('span');
                            layeringOpacityPercent.textContent = '%';
                            layeringOpacityPercent.style.cssText = 'font-size: 18px;';
                            layeringOpacityContainer.appendChild(layeringOpacityPercent);
                            
                            layeringRightContainer.appendChild(layeringOpacityContainer);
                            
                            // 重置按钮（始终占位，通过visibility控制显示/隐藏）
                            const resetLayeringButton = document.createElement('button');
                            resetLayeringButton.textContent = '重置层级';
                            resetLayeringButton.style.cssText = `
                                padding: 6px 12px;
                                background: #FF9800;
                                color: white;
                                border: 1px solid #000;
                                cursor: pointer;
                                font-size: 16.5px;
                                margin-left: 7.5px;
                                visibility: ${hasCustomPriority ? 'visible' : 'hidden'};
                            `;
                            resetLayeringButton.onclick = (e) => {
                                e.stopPropagation();
                                this.resetLayerPriority(node, layerIndex, layer);
                                this.updateWindow();
                            };
                            layeringRightContainer.appendChild(resetLayeringButton);
                            
                            layeringNodeRow.appendChild(layeringRightContainer);
                            
                            // 鼠标悬浮效果（背景色变化）
                            layeringNodeRow.addEventListener('mouseenter', (e) => {
                                layeringNodeRow.style.background = '#D8D8D8';
                            });
                            
                            layeringNodeRow.addEventListener('mouseleave', (e) => {
                                layeringNodeRow.style.background = '#e8e8e8';
                            });
                            
                            // 鼠标悬浮闪烁（层级节点，使用透明度闪烁）
                            let isLayerMouseInside = false;
                            layeringNodeRow.addEventListener('mouseenter', (e) => {
                                // 如果正在交互（点击/拖动），不触发闪烁
                                if (this.isInteracting) return;
                                // 如果鼠标已经在内部（比如点击后），不触发新的闪烁
                                if (isLayerMouseInside) return;
                                isLayerMouseInside = true;
                                // 背景色变化
                                layeringNodeRow.style.background = '#D8D8D8';
                                // 透明度闪烁
                                this.hoveredLayerIndex = layerIndex;
                                this.startLayerHighlight(layerIndex);
                            });
                            
                            layeringNodeRow.addEventListener('mouseleave', (e) => {
                                isLayerMouseInside = false;
                                // 背景色恢复
                                layeringNodeRow.style.background = '#e8e8e8';
                                // 停止透明度闪烁
                                if (this.hoveredLayerIndex === layerIndex) {
                                    this.hoveredLayerIndex = null;
                                }
                                this.stopLayerHighlight();
                            });
                            
                            // 在点击/拖动期间禁止闪烁
                            layeringNodeRow.addEventListener('mousedown', (e) => {
                                this.isInteracting = true;
                                // 停止当前闪烁
                                this.stopLayerHighlight();
                            });
                            
                            layeringNodeRow.addEventListener('mouseup', (e) => {
                                // 延迟清除交互标志，防止 mouseup 后立即触发 mouseenter
                                setTimeout(() => {
                                    this.isInteracting = false;
                                }, 100);
                            });
                            
                            // 点击事件
                            layeringNodeRow.onclick = (e) => {
                                const isInteractiveElement = 
                                    (layeringInput && (e.target === layeringInput || layeringInput.contains(e.target))) ||
                                    (enableDifferentPriorityButton && (e.target === enableDifferentPriorityButton || enableDifferentPriorityButton.contains(e.target))) ||
                                    (layeringOpacitySlider && (e.target === layeringOpacitySlider || layeringOpacitySlider.contains(e.target))) ||
                                    (layeringOpacityInput && (e.target === layeringOpacityInput || layeringOpacityInput.contains(e.target))) ||
                                    (layeringOpacityPercent && (e.target === layeringOpacityPercent || layeringOpacityPercent.contains(e.target))) ||
                                    (resetLayeringButton && (e.target === resetLayeringButton || resetLayeringButton.contains(e.target)));
                                
                                if (!isInteractiveElement) {
                                    this.selectedNodeId = layeringNodeId;
                                    this.updateWindow();
                                }
                            };
                            
                            content.appendChild(layeringNodeRow);

                            // 变换行：位移 / 缩放 / 旋转
                            const transformRow = this.buildTransformRow(layer, layerIndex, node, layeringNodeId);
                            if (transformRow) content.appendChild(transformRow);
                        });
                    }
                }
            };

            this.treeNodes.forEach(node => renderNode(node));
            
            // 恢复焦点
            if (focusRestoreInfo) {
                setTimeout(() => {
                    let targetElement = null;
                    if (focusRestoreInfo.transformNode) {
                        const row = content.querySelector(
                            `[data-transform-node="${focusRestoreInfo.transformNode}"]`
                        );
                        targetElement = row?.querySelector(
                            `input[data-transform-prop="${focusRestoreInfo.transformProp}"]`
                        );
                    } else if (focusRestoreInfo.nodeId) {
                        const nodeRow = content.querySelector(`[data-node-id="${focusRestoreInfo.nodeId}"]`);
                        if (nodeRow) {
                            if (focusRestoreInfo.inputType === 'opacity') {
                                targetElement = nodeRow.querySelector('input[type="number"][min="0"][max="100"]');
                            } else if (focusRestoreInfo.inputType === 'layering') {
                                targetElement = nodeRow.querySelector('input[type="number"][min="-99"][max="99"]');
                            }
                        }
                    } else if (focusRestoreInfo.layeringName) {
                        // 恢复层级节点的透明度输入框焦点
                        const allLayeringRows = content.querySelectorAll('div[style*="background: #e8e8e8"]');
                        for (const row of allLayeringRows) {
                            const nameSpan = row.querySelector('span');
                            if (nameSpan && nameSpan.textContent === focusRestoreInfo.layeringName) {
                                targetElement = row.querySelector('input[type="number"][min="0"][max="100"]');
                                break;
                            }
                        }
                    }
                    if (targetElement) {
                        targetElement.focus();
                        if (focusRestoreInfo.selectionStart != null && focusRestoreInfo.selectionEnd != null) {
                            // number 类型输入框在部分浏览器上不支持选区操作
                            try {
                                targetElement.setSelectionRange(focusRestoreInfo.selectionStart, focusRestoreInfo.selectionEnd);
                            } catch { /* 忽略 */ }
                        }
                    }
                }, 0);
            }
        }

        /**
         * 构建图层的变换行（位移 / 缩放 / 旋转）
         * @param {Object} layer - 图层对象
         * @param {number} layerIndex - 图层索引
         * @param {Object} node - 所属的树节点
         * @param {string} layeringNodeId - 对应层级行的节点ID
         * @returns {HTMLElement|null}
         */
        buildTransformRow(layer, layerIndex, node, layeringNodeId) {
            const row = document.createElement('div');
            row.dataset.transformLayer = String(layerIndex);
            row.dataset.transformNode = layeringNodeId;
            row.style.cssText = `
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 6px 12px;
                padding: 6px 15px 8px ${(node.level + 2) * 30 + 15}px;
                border-bottom: 1px solid #ddd;
                background: #f0f0f0;
            `;

            const availability = this.getTransformAvailability();
            if (!availability.allowed) {
                const note = document.createElement('span');
                note.textContent = availability.reason;
                note.style.cssText = 'font-size: 15px; color: #888;';
                row.appendChild(note);
                return row;
            }

            row.appendChild(this.buildGizmoToggle(layerIndex));

            let rendered = 0;
            for (const group of TRANSFORM_GROUPS) {
                const constraint = this.getTransformConstraint(group);
                if (!constraint || constraint.props.length === 0) continue;
                row.appendChild(this.buildTransformGroup(layer, group, constraint));
                rendered++;
            }

            if (rendered === 0) return null;

            // 悬浮高亮对应图层，与层级行行为一致
            row.addEventListener('mouseenter', () => {
                row.style.background = '#e4e4e4';
                if (this.isInteracting) return;
                this.startLayerHighlight(layerIndex);
            });
            row.addEventListener('mouseleave', () => {
                row.style.background = '#f0f0f0';
                this.stopLayerHighlight();
            });
            row.addEventListener('mousedown', () => {
                this.isInteracting = true;
                this.stopLayerHighlight();
            });
            row.addEventListener('mouseup', () => {
                setTimeout(() => { this.isInteracting = false; }, 100);
            });

            return row;
        }

        /**
         * 构建变换行最左侧的选中按钮。选中后在左侧角色预览上叠加包围框，
         * 可直接拖拽进行平移、缩放、旋转
         * @param {number} layerIndex - 图层索引
         * @returns {HTMLElement}
         */
        buildGizmoToggle(layerIndex) {
            const selected = this.gizmo.layerIndex === layerIndex;
            const btn = document.createElement('button');
            btn.textContent = selected ? '◉' : '○';
            btn.title = selected
                ? '取消选中，隐藏预览包围框'
                : '选中该图层，在左侧预览上显示包围框\n框内拖动平移，句柄缩放，顶部句柄旋转';
            btn.style.cssText = `
                width: 26px;
                padding: 2px 0;
                background: ${selected ? '#4FC3F7' : '#fff'};
                color: ${selected ? '#fff' : '#555'};
                border: 1px solid #000;
                cursor: pointer;
                font-size: 15px;
                line-height: 1.1;
                flex-shrink: 0;
            `;
            btn.onclick = (e) => {
                e.stopPropagation();
                this.stopAllHighlight();
                this.gizmo.toggle(layerIndex);
                // 贴图 URL 与绘制原点是在渲染过程中捕获的，选中后主动重建一次
                // 角色 canvas，让包围框当帧就能定位
                if (this.gizmo.isActive()) this.refreshCharacter();
                this.updateWindow();
            };
            return btn;
        }

        /**
         * 构建单个变换分组的控件块
         * @param {Object} layer - 图层对象
         * @param {Object} group - TRANSFORM_GROUPS 中的一项
         * @param {Object} constraint - getTransformConstraint 的返回值
         * @returns {HTMLElement}
         */
        buildTransformGroup(layer, group, constraint) {
            const block = document.createElement('div');
            block.style.cssText = 'display: flex; align-items: center; gap: 4px;';

            const label = document.createElement('span');
            label.textContent = constraint.unit ? `${group.label}(${constraint.unit})` : group.label;
            label.title = `范围 ${constraint.min} ~ ${constraint.max}，滚轮 ${constraint.step}`
                + (constraint.coarseStep !== constraint.step ? `，Shift+滚轮 ${constraint.coarseStep}` : '')
                + (group.key === "Rotation"
                    ? '\n支点为贴图中心，图层离中心越远，同角度下移动越明显'
                    : '');
            label.style.cssText = 'font-size: 15px; color: #555; margin-right: 2px;';
            block.appendChild(label);

            const inputs = [];
            for (const { prop, axis } of constraint.props) {
                if (axis) {
                    const axisLabel = document.createElement('span');
                    axisLabel.textContent = axis;
                    axisLabel.style.cssText = 'font-size: 14px; color: #888;';
                    block.appendChild(axisLabel);
                }
                const input = this.buildTransformInput(layer, group, constraint, prop, inputs);
                inputs.push({ prop, input });
                block.appendChild(input);
            }

            // 重置按钮，仅在该组存在自定义值时可见
            const reset = document.createElement('button');
            reset.textContent = '↺';
            reset.title = `重置${group.label}`;
            reset.style.cssText = `
                padding: 2px 7px;
                background: #FF9800;
                color: white;
                border: 1px solid #000;
                cursor: pointer;
                font-size: 15px;
                visibility: ${this.hasCustomTransform(layer, group) ? 'visible' : 'hidden'};
            `;
            reset.onclick = (e) => {
                e.stopPropagation();
                this.resetLayerTransform(layer, constraint, group);
                this.updateWindow();
            };
            block.appendChild(reset);

            return block;
        }

        /**
         * 构建一个变换数值输入框
         * @param {Object} layer - 图层对象
         * @param {Object} group - TRANSFORM_GROUPS 中的一项
         * @param {Object} constraint - getTransformConstraint 的返回值
         * @param {string} prop - 属性名
         * @param {Object[]} siblings - 同组内已创建的输入框，用于缩放联动同步显示
         * @returns {HTMLInputElement}
         */
        buildTransformInput(layer, group, constraint, prop, siblings) {
            const input = document.createElement('input');
            input.type = 'number';
            input.dataset.transformProp = prop;
            input.min = String(constraint.min);
            input.max = String(constraint.max);
            input.step = String(constraint.step);
            input.value = this.formatTransformValue(
                this.getLayerTransform(layer, prop, constraint.defaultValue), constraint
            );
            input.title = `范围 ${constraint.min} ~ ${constraint.max}`;
            input.style.cssText = `
                width: 68px;
                padding: 4px;
                border: 1px solid #000;
                font-size: 16px;
                text-align: center;
            `;

            const apply = (raw) => {
                if (raw === '' || Number.isNaN(raw)) return;
                this.setLayerTransform(layer, prop, raw, constraint);
                // 缩放联动时同步另一个轴的显示
                if (constraint.uniform && prop.startsWith('Scale')) {
                    const shown = this.formatTransformValue(
                        this.getLayerTransform(layer, prop, constraint.defaultValue), constraint
                    );
                    siblings.forEach(s => {
                        if (s.prop !== prop) s.input.value = shown;
                    });
                }
            };

            input.addEventListener('input', (e) => {
                this.stopAllHighlight();
                apply(e.target.valueAsNumber);
            });

            input.addEventListener('focus', (e) => e.target.select());

            input.addEventListener('blur', () => this.updateWindow());

            // 滚轮默认走细步长，按住 Shift 走粗步长
            input.addEventListener('wheel', (e) => {
                e.preventDefault();
                this.stopAllHighlight();
                const current = parseFloat(input.value);
                const base = Number.isNaN(current) ? constraint.defaultValue : current;
                const stepSize = e.shiftKey ? constraint.coarseStep : constraint.step;
                const raw = base + (e.deltaY > 0 ? -stepSize : stepSize);
                const next = Math.max(constraint.min,
                    Math.min(constraint.max, this.roundTransformValue(raw, constraint)));
                input.value = this.formatTransformValue(next, constraint);
                apply(next);
            });

            return input;
        }

        /**
         * 按精度格式化变换值，避免浮点误差显示成 0.30000000000000004
         * @param {number} value - 数值
         * @param {Object} constraint - getTransformConstraint 的返回值
         * @returns {string}
         */
        formatTransformValue(value, constraint) {
            return String(this.roundTransformValue(value, constraint));
        }

        /**
         * 按精度取整，消除浮点误差（如 0.1+0.2 = 0.30000000000000004）
         * @param {number} value - 数值
         * @param {Object} constraint - getTransformConstraint 的返回值
         * @returns {number}
         */
        roundTransformValue(value, constraint) {
            const factor = Math.pow(10, constraint.precision ?? 0);
            return Math.round(value * factor) / factor;
        }

        /**
         * 停止所有闪烁（变换控件交互时调用）
         */
        stopAllHighlight() {
            if (this.highlightTimer !== null || this.highlightedNode !== null) {
                this.stopNodeHighlight();
            }
            if (this.highlightedLayerIndex !== null) {
                this.stopLayerHighlight();
            }
        }

        /**
         * 获取对比色（用于文字颜色）
         */
        getContrastColor(hexColor) {
            const r = parseInt(hexColor.substr(1, 2), 16);
            const g = parseInt(hexColor.substr(3, 2), 16);
            const b = parseInt(hexColor.substr(5, 2), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness > 128 ? '#000' : '#FFF';
        }

        /**
         * 切换节点展开/折叠
         */
        toggleNode(nodeId) {
            if (this.expandedNodes.has(nodeId)) {
                this.expandedNodes.delete(nodeId);
            } else {
                this.expandedNodes.add(nodeId);
            }
            this.updateWindow();
        }


        /**
         * 显示窗口
         */
        show() {
            if (!ItemColorState || !ItemColorItem) {
                return;
            }
            // 换了物品后图层索引不再对应同一张贴图，清掉旧的选中态
            this.gizmo.clear();
            this.createWindow();
            this.buildTree();
            this.isVisible = true;
            if (this.windowElement) {
                this.windowElement.style.display = 'flex';
                this.updateWindow();
            }
        }

        /**
         * 隐藏窗口
         */
        hide() {
            this.isVisible = false;
            if (this.windowElement) {
                this.windowElement.style.display = 'none';
            }
            this.colorPickerPanel.hide();
            this.gizmo.endDrag();
        }

        /**
         * 销毁窗口
         */
        destroy() {
            this.stopNodeHighlight();
            this.stopLayerHighlight();
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
                this.resizeHandler = null;
            }
            this.clearDocListeners();
            if (this.windowElement) {
                this.windowElement.remove();
                this.windowElement = null;
            }
            this.colorPickerPanel.hide();
            this.gizmo.clear();
            this.isVisible = false;
            this.treeNodes = [];
            this.selectedNodeId = null;
            this.hoveredNodeId = null;
            this.hoveredLayeringNodeId = null;
            this.originalOpacities.clear();
        }

        /**
         * 开始节点闪烁（使用透明度）
         * @param {Object} node - 要闪烁的节点
         */
        startNodeHighlight(node) {
            // 如果正在交互（点击/拖动），不触发闪烁
            if (this.isInteracting) {
                return;
            }
            // 如果已经在闪烁同一个节点，不重复闪烁
            if (this.highlightedNode && this.highlightedNode.id === node.id && this.highlightTimer !== null) {
                return;
            }

            // 停止之前的闪烁
            this.stopNodeHighlight();

            if (!ItemColorState || !ItemColorItem) return;

            this.highlightedNode = node;
            this.originalOpacities.clear();

            const layerIndices = this.collectLayerIndices(node)
                .filter(i => !this.shouldExcludeLayer(i));

            if (layerIndices.length === 0) return;

            // 获取第一个图层的当前透明度（用于判断闪烁方向）
            const currentOpacity = this.getLayerOpacity(layerIndices[0]);

            // 确定闪烁目标透明度
            const targetOpacity = currentOpacity > 0.5 ? 0.25 : 0.75;

            // originalOpacities 以槽位为键，保证恢复时写回的位置与读取一致
            layerIndices.forEach(layerIndex => {
                const slot = this.getOpacitySlot(layerIndex);
                if (!this.originalOpacities.has(slot)) {
                    this.originalOpacities.set(slot, this.getLayerOpacity(layerIndex));
                }
                this.writeLayerOpacity(layerIndex, targetOpacity);
            });

            // 刷新角色显示
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }

            // 0.2s后恢复
            this.highlightTimer = setTimeout(() => {
                this.restoreNodeHighlight();
                this.highlightTimer = null;
            }, 200);
        }

        /**
         * 开始图层闪烁（使用透明度）
         * @param {number} layerIndex - 要闪烁的图层索引
         */
        startLayerHighlight(layerIndex) {
            // 如果正在交互（点击/拖动），不触发闪烁
            if (this.isInteracting) {
                return;
            }
            // 如果已经在闪烁同一个图层，不重复闪烁
            if (this.highlightedLayerIndex === layerIndex && this.highlightTimer !== null) {
                return;
            }

            // 停止之前的闪烁
            this.stopLayerHighlight();

            if (!ItemColorState || !ItemColorItem) return;

            // 检查是否应该排除
            if (this.shouldExcludeLayer(layerIndex)) return;

            this.highlightedLayerIndex = layerIndex;
            this.originalOpacities.clear();

            // 获取当前透明度
            const currentOpacity = this.getLayerOpacity(layerIndex);

            // 确定闪烁目标透明度
            const targetOpacity = currentOpacity > 0.5 ? 0.25 : 0.75;

            this.originalOpacities.set(this.getOpacitySlot(layerIndex), currentOpacity);
            this.writeLayerOpacity(layerIndex, targetOpacity);

            // 刷新角色显示
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }

            // 0.2s后恢复
            this.highlightTimer = setTimeout(() => {
                this.restoreLayerHighlight();
                this.highlightTimer = null;
            }, 200);
        }

        /**
         * 把 originalOpacities 里记录的槽位原值写回
         */
        restoreOpacitySlots() {
            if (!ItemColorState) return;
            const prop = ItemColorItem?.Property;
            this.originalOpacities.forEach((originalOpacity, slot) => {
                if (Array.isArray(ItemColorState.opacity)) {
                    ItemColorState.opacity[slot] = originalOpacity;
                }
                if (prop && Array.isArray(prop.Opacity)) {
                    prop.Opacity[slot] = originalOpacity;
                }
            });
        }

        /**
         * 恢复节点闪烁
         */
        restoreNodeHighlight() {
            if (!ItemColorState || this.originalOpacities.size === 0) return;

            this.restoreOpacitySlots();
            this.originalOpacities.clear();
            this.highlightedNode = null;

            // 刷新角色显示
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }
        }

        /**
         * 恢复图层闪烁
         */
        restoreLayerHighlight() {
            if (!ItemColorState || this.originalOpacities.size === 0) return;

            this.restoreOpacitySlots();
            this.originalOpacities.clear();
            this.highlightedLayerIndex = null;

            // 刷新角色显示
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }
        }

        /**
         * 停止节点闪烁
         */
        stopNodeHighlight() {
            if (this.highlightTimer !== null) {
                clearTimeout(this.highlightTimer);
                this.highlightTimer = null;
            }
            this.restoreNodeHighlight();
        }

        /**
         * 停止图层闪烁
         */
        stopLayerHighlight() {
            if (this.highlightTimer !== null) {
                clearTimeout(this.highlightTimer);
                this.highlightTimer = null;
            }
            this.restoreLayerHighlight();
        }
    }

    /**
     * 图层变换包围框。在换装界面的角色预览上叠加绘制一个可拖拽的选框，
     * 提供八向缩放句柄、顶部旋转句柄，框内拖动为平移。
     *
     * 坐标系有三层，需要逐级换算：
     *   贴图坐标   图层在 CommonDraw 里的绘制空间，原点是角色 canvas 左上（Y 已含 CanvasUpperOverflow）
     *   canvas     角色离屏画布 500 x CanvasDrawHeight
     *   主画布     游戏统一的 2000 x 1000 逻辑坐标，也是 MouseX / MouseY 所在的空间
     */
    class LayerTransformGizmo {
        constructor(window) {
            this.win = window;
            this.layerIndex = null;   // 选中的图层索引，null 表示未选中
            this.drag = null;         // 拖拽会话
            this.hoverHandle = null;  // 当前悬浮的句柄 id
            this.captureUrl = null;   // 渲染时捕获到的贴图 URL
            this.captureBase = null;  // 渲染时捕获到的绘制原点（已剔除位移）
            this.shiftKey = false;    // 最近一次鼠标事件的 Shift 状态，用于角度吸附
            this.drawAt = null;       // 角色本帧的绘制位置与缩放，来自 DrawCharacter
            this.frameDrawAt = null;  // 本帧收集中的候选，帧末提交到 drawAt
        }

        /**
         * 记录角色在主画布上的绘制参数。各界面位置不同（换装 660,90；
         * 道具调色 500,0；制作与商店另有其值），所以不能写死。
         *
         * 同一帧可能画多个副本：换装界面有一个放大 4 倍的和一个正常的，
         * Dialog 给自己上道具时 Player 会被画两次（0,0 与 500,0）。
         * 取本帧最后一次绘制，因为各界面都是先画背景副本、后画主预览。
         * @param {number} x - DrawCharacter 的 X
         * @param {number} y - DrawCharacter 的 Y
         * @param {number} zoom - 缩放
         * @param {boolean|undefined} heightResize - IsHeightResizeAllowed
         */
        captureDraw(x, y, zoom, heightResize) {
            this.frameDrawAt = {
                x, y,
                zoom: typeof zoom === "number" ? zoom : 1,
                heightResize
            };
        }

        /** 一帧绘制结束，把本帧收集到的角色位置提交为当前值 */
        commitDraw() {
            if (this.frameDrawAt) {
                this.drawAt = this.frameDrawAt;
                this.frameDrawAt = null;
            }
        }

        /**
         * 由 CommonDraw 的绘制回调调用，记录选中图层的真实 URL 与绘制原点。
         * 直接取渲染管线的实参，省去复现一遍 URL 拼接和坐标偏移的逻辑，
         * 也自动跟随本体后续改动。
         * @param {string} url - 贴图完整 URL
         * @param {number} x - drawX，已含 TranslationX
         * @param {number} y - drawY，已含 TranslationY
         * @param {Object} opts - 绘制选项，含 Translation / Scale / Rotation
         */
        capture(url, x, y, opts) {
            this.captureUrl = url;
            // 反推未位移时的原点，后续换算不受当前位移值干扰
            this.captureBase = {
                x: x - (opts?.TranslationX || 0),
                y: y - (opts?.TranslationY || 0),
                mirror: !!opts?.Mirror,
                invert: !!opts?.Invert
            };
        }
        /** 当前是否有选中的图层 */
        isActive() {
            return this.layerIndex !== null;
        }

        /** 是否正在拖拽 */
        isDragging() {
            return this.drag !== null;
        }

        /**
         * 切换某个图层的选中态
         * @param {number} layerIndex
         */
        toggle(layerIndex) {
            this.layerIndex = this.layerIndex === layerIndex ? null : layerIndex;
            this.drag = null;
            // 捕获数据属于上一个图层，换选后必须等新图层重新渲染一帧
            this.captureUrl = null;
            this.captureBase = null;
        }

        /** 清除选中态 */
        clear() {
            this.layerIndex = null;
            this.drag = null;
            this.hoverHandle = null;
            this.captureUrl = null;
            this.captureBase = null;
            this.drawAt = null;
            this.frameDrawAt = null;
        }
        /** 取选中的 AssetLayer，失效时返回 null */
        getLayer() {
            if (this.layerIndex === null) return null;
            const layers = ItemColorItem?.Asset?.Layer;
            return Array.isArray(layers) ? layers[this.layerIndex] ?? null : null;
        }

        /**
         * 取图层贴图的原始像素尺寸。缩放与旋转的支点都是贴图中心，
         * 所以必须拿到真实宽高，不能用组的名义尺寸。
         * URL 由 captureUrl 在渲染时捕获，这里只负责查缓存。
         * 两条渲染路径的缓存不同：WebGL 走 GLDrawImageCache，2D 回退走 DrawCacheImage。
         * @returns {{width: number, height: number}|null}
         */
        getTextureSize() {
            if (!this.captureUrl) return null;

            const fromCache = (img) => {
                if (!img) return null;
                const wpx = img.naturalWidth || img.width;
                const hpx = img.naturalHeight || img.height;
                // 宽高为 1 说明纹理还是 GLDrawLoadImage 塞的 1x1 占位像素
                return (wpx > 1 && hpx > 1) ? { width: wpx, height: hpx } : null;
            };

            return fromCache(bcGlobal("GLDrawImageCache")?.get(this.captureUrl))
                ?? fromCache(bcGlobal("DrawCacheImage")?.get(this.captureUrl))
                ?? null;
        }
        /**
         * 位移倍率。WebGL 路径下 dstX 已含一份 TranslationX，
         * GLDrawImage 的矩阵里又叠加了一次，实际位移是设定值的两倍；
         * 2D 回退路径只生效一次。拖动换算必须按当前路径取倍率。
         * @returns {number}
         */
        getTranslationFactor() {
            const gl = bcGlobal("GLDrawCanvas");
            const usingGL = bcGlobal("GLVersion") !== "No WebGL" && gl && gl.GL && !gl.GL.isContextLost();
            return usingGL ? 2 : 1;
        }

        /**
         * 计算包围框在贴图空间的四个角（顺序 nw, ne, se, sw）。
         * 复现 GLDrawImage 的矩阵链：先按中心缩放，再按中心旋转，最后整体平移。
         * @returns {{corners: number[][], center: number[], tex: Object}|null}
         */
        getLocalQuad() {
            const layer = this.getLayer();
            const tex = this.getTextureSize();
            if (!layer || !tex || !this.captureBase) return null;

            const t = this.readTransforms(layer);
            const f = this.getTranslationFactor();
            const { width: tw, height: th } = tex;
            const cx = this.captureBase.x + tw / 2 + t.TranslationX * f;
            const cy = this.captureBase.y + th / 2 + t.TranslationY * f;

            const hw = tw / 2 * t.ScaleX;
            const hh = th / 2 * t.ScaleY;
            const a = t.Rotation * Math.PI / 180;
            const cos = Math.cos(a), sin = Math.sin(a);

            const corners = [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]].map(([dx, dy]) => [
                cx + dx * cos - dy * sin,
                cy + dx * sin + dy * cos
            ]);
            return { corners, center: [cx, cy], tex };
        }
        /**
         * 读取图层当前的合成变换值，规则与 CommonDraw 的 getTransform 一致：
         * 位移与旋转是图层值加物品值，缩放是相乘。
         * @returns {{TranslationX: number, TranslationY: number, ScaleX: number, ScaleY: number, Rotation: number}}
         */
        readTransforms(layer) {
            const props = ItemColorItem?.Property ?? {};
            const name = this.win.getTransformLayerName(layer);
            const safe = (v) => (typeof v === "number" && !Number.isNaN(v)) ? v : undefined;

            const read = (prop) => {
                const layerVal = safe(props[`Layer${prop}`]?.[name]);
                const assetVal = safe(props[prop]);
                if (prop === "ScaleX" || prop === "ScaleY") {
                    let v = assetVal ?? 1;
                    if (layerVal !== undefined) v *= layerVal;
                    return Math.max(0.01, Math.min(3.0, v));
                }
                const sum = (layerVal ?? 0) + (assetVal ?? 0);
                return prop === "Rotation" ? Math.max(-180, Math.min(180, sum)) : sum;
            };

            return {
                TranslationX: read("TranslationX"), TranslationY: read("TranslationY"),
                ScaleX: read("ScaleX"), ScaleY: read("ScaleY"), Rotation: read("Rotation")
            };
        }
        /**
         * 求角色 canvas 到主画布的线性映射，复现 DrawCharacter 的贴图参数。
         * 绘制位置不能写死：换装界面在 (660, 90)，道具调色（Dialog）在 (500, 0)，
         * 制作与商店又各不相同，所以位置与缩放取自 captureDraw 记录的实参。
         * @returns {{ox: number, oy: number, sx: number, sy: number, yStart: number}|null}
         */
        getCanvasToScreen() {
            const C = ItemColorCharacter;
            if (!C || !this.drawAt) return null;

            const { x: X, y: Y, zoom, heightResize } = this.drawAt;

            // 只有 IsHeightResizeAllowed 明确为 false 时才忽略身高比例
            const hr = heightResize === false ? 1 : (C.HeightRatio ?? 1);
            const xOffset = w.CharacterAppearanceXOffset?.(C, hr) ?? 0;
            const yOffset = w.CharacterAppearanceYOffset?.(C, hr) ?? 0;

            // CanvasUpperOverflow 是 const 声明，不在 window 上
            const upper = bcGlobal("CanvasUpperOverflow") ?? 700;
            const yCutOff = yOffset >= 0 || (w.ServerPlayerIsInChatRoom?.() ?? false);
            const yStart = upper + (yCutOff ? -yOffset / hr : 0);
            const srcH = 1000 / hr + (yCutOff ? 0 : -yOffset / hr);
            const destY = yCutOff ? 0 : yOffset;

            const destW = 500 * hr * zoom;
            const destH = (1000 - destY) * zoom;

            return {
                ox: X + xOffset * zoom,
                oy: Y + destY * zoom,
                sx: destW / 500,
                sy: destH / srcH,
                yStart
            };
        }
        /**
         * 包围框在主画布上的几何信息，绘制与命中判定都基于它
         * @returns {{corners: number[][], center: number[], rotateAt: number[], map: Object}|null}
         */
        getScreenQuad() {
            const local = this.getLocalQuad();
            const map = this.getCanvasToScreen();
            if (!local || !map) return null;

            const toScreen = ([x, y]) => [
                map.ox + x * map.sx,
                map.oy + (y - map.yStart) * map.sy
            ];

            const corners = local.corners.map(toScreen);
            const center = toScreen(local.center);

            // 旋转句柄挂在上边中点的外侧，沿框自身的"上"方向偏移
            const [nw, ne] = corners;
            const topMid = [(nw[0] + ne[0]) / 2, (nw[1] + ne[1]) / 2];
            let ux = topMid[0] - center[0], uy = topMid[1] - center[1];
            const len = Math.hypot(ux, uy) || 1;
            // 同样夹进画布，否则框顶超出上边界时旋转柄不可见也不可点
            const rr = GIZMO_HANDLE_R + 4;
            const rotateAt = [
                Math.max(rr, Math.min(2000 - rr, topMid[0] + ux / len * GIZMO_ROTATE_DIST)),
                Math.max(rr, Math.min(1000 - rr, topMid[1] + uy / len * GIZMO_ROTATE_DIST))
            ];

            return { corners, center, rotateAt, topMid, map };
        }
        /**
         * 八向句柄在主画布上的位置。句柄挂在旋转后的框上，所以要按框的
         * 两条边向量插值，而不是简单取轴对齐的包围盒。
         * @returns {{id: string, x: number, y: number, hx: number, hy: number}[]}
         */
        getHandlePoints(quad) {
            const [nw, ne, se, sw] = quad.corners;
            // 框自身的半轴向量
            const ax = [(ne[0] - nw[0]) / 2, (ne[1] - nw[1]) / 2];
            const ay = [(sw[0] - nw[0]) / 2, (sw[1] - nw[1]) / 2];
            const c = quad.center;

            // 图层放大后句柄会跑到画布外，那里既画不出也点不到。
            // 夹到边缘内侧，保证始终可操作；缩放语义不受影响，因为
            // applyScale 用的是拖动位移增量，与句柄绘制位置无关
            const r = GIZMO_HANDLE_R + 1;
            const clamp = (v, max) => Math.max(r, Math.min(max - r, v));

            return GIZMO_HANDLES.map(h => {
                const x = c[0] + ax[0] * h.x + ay[0] * h.y;
                const y = c[1] + ax[1] * h.x + ay[1] * h.y;
                return {
                    id: h.id, hx: h.x, hy: h.y,
                    x: clamp(x, 2000), y: clamp(y, 1000),
                    clamped: x !== clamp(x, 2000) || y !== clamp(y, 1000)
                };
            });
        }

        /**
         * 判断主画布坐标命中了哪个部分
         * @returns {string|null} 句柄 id、"rotate"、"move" 或 null
         */
        hitTest(mx, my) {
            const quad = this.getScreenQuad();
            if (!quad) return null;

            const near = (px, py, r) => Math.hypot(mx - px, my - py) <= r;

            if (near(quad.rotateAt[0], quad.rotateAt[1], GIZMO_HANDLE_R + 3)) return "rotate";
            for (const h of this.getHandlePoints(quad)) {
                if (near(h.x, h.y, GIZMO_HANDLE_R + 2)) return h.id;
            }
            return this.pointInQuad(mx, my, quad.corners) ? "move" : null;
        }

        /** 点是否在（可能旋转的）四边形内，用叉积同号判定 */
        pointInQuad(px, py, corners) {
            let sign = 0;
            for (let i = 0; i < 4; i++) {
                const [x1, y1] = corners[i];
                const [x2, y2] = corners[(i + 1) % 4];
                const cross = (x2 - x1) * (py - y1) - (y2 - y1) * (px - x1);
                if (cross === 0) continue;
                const s = cross > 0 ? 1 : -1;
                if (sign === 0) sign = s;
                else if (s !== sign) return false;
            }
            return true;
        }
        /**
         * 开始拖拽。记录起始变换值，后续移动都以它为基准做增量，
         * 避免逐帧累加带来的漂移。
         * @returns {boolean} 是否接管了本次点击
         */
        startDrag(mx, my) {
            const mode = this.hitTest(mx, my);
            if (!mode) return false;

            const layer = this.getLayer();
            const quad = this.getScreenQuad();
            if (!layer || !quad) return false;

            this.drag = {
                mode, layer,
                startX: mx, startY: my,
                origin: this.readTransforms(layer),
                center: quad.center,
                map: quad.map,
                startAngle: Math.atan2(my - quad.center[1], mx - quad.center[0])
            };
            return true;
        }

        /** 拖拽中，按模式分派。一帧内可能写两个轴，合并成一次角色刷新 */
        moveDrag(mx, my) {
            if (!this.drag) return;
            const { mode } = this.drag;
            this.win.batchRefresh(() => {
                if (mode === "move") this.applyMove(mx, my);
                else if (mode === "rotate") this.applyRotate(mx, my);
                else this.applyScale(mx, my, mode);
            });
        }

        /** 结束拖拽 */
        endDrag() {
            this.drag = null;
        }
        /** 框内拖动：平移。屏幕位移换算回贴图空间，再除以位移倍率 */
        applyMove(mx, my) {
            const d = this.drag;
            const f = this.getTranslationFactor();
            const dx = (mx - d.startX) / d.map.sx / f;
            const dy = (my - d.startY) / d.map.sy / f;

            this.write("TranslationX", d.origin.TranslationX + dx);
            this.write("TranslationY", d.origin.TranslationY + dy);
        }

        /** 旋转句柄：按鼠标绕框心转过的角度增量写入。按住 Shift 吸附到 15 度 */
        applyRotate(mx, my) {
            const d = this.drag;
            const now = Math.atan2(my - d.center[1], mx - d.center[0]);
            let deg = d.origin.Rotation + (now - d.startAngle) * 180 / Math.PI;
            if (this.shiftKey) deg = Math.round(deg / 15) * 15;
            this.write("Rotation", ((deg + 180) % 360 + 360) % 360 - 180);
        }
        /**
         * 八向句柄：缩放。鼠标位移先投影到框自身的两个轴上，
         * 再换算成缩放比例，这样旋转后拖动方向依然符合直觉。
         * 缩放支点是贴图中心，与本体渲染一致，对边不会固定。
         */
        applyScale(mx, my, mode) {
            const d = this.drag;
            const handle = GIZMO_HANDLES.find(h => h.id === mode);
            const tex = this.getTextureSize();
            if (!handle || !tex) return;

            // 把屏幕位移转到贴图空间，再按框的旋转角反投影到局部轴
            const dx = (mx - d.startX) / d.map.sx;
            const dy = (my - d.startY) / d.map.sy;
            const a = -d.origin.Rotation * Math.PI / 180;
            const lx = dx * Math.cos(a) - dy * Math.sin(a);
            const ly = dx * Math.sin(a) + dy * Math.cos(a);

            // 支点在中心，拖动边只贡献一半尺寸变化，故比例分母用半宽半高
            const uniform = this.shiftKey;
            let sx = d.origin.ScaleX, sy = d.origin.ScaleY;
            if (handle.x !== 0) sx = d.origin.ScaleX + handle.x * lx / (tex.width / 2);
            if (handle.y !== 0) sy = d.origin.ScaleY + handle.y * ly / (tex.height / 2);

            if (uniform && handle.x !== 0 && handle.y !== 0) {
                // 角句柄配合 Shift 等比缩放，取变化幅度较大的轴
                const rx = sx / (d.origin.ScaleX || 1);
                const ry = sy / (d.origin.ScaleY || 1);
                const r = Math.abs(rx - 1) > Math.abs(ry - 1) ? rx : ry;
                sx = d.origin.ScaleX * r;
                sy = d.origin.ScaleY * r;
            }

            if (handle.x !== 0 || uniform) this.write("ScaleX", sx);
            if (handle.y !== 0 || uniform) this.write("ScaleY", sy);
        }
        /**
         * 写入单个变换属性。复用窗口的写入逻辑，保证约束、取整、
         * 默认值清理与输入框那条路径完全一致。
         * 拖拽时一帧可能写两个轴，这里先压住刷新，由 moveDrag 统一触发一次。
         * @param {string} prop - 属性名，如 TranslationX
         * @param {number} value - 目标值
         */
        write(prop, value) {
            const layer = this.drag?.layer ?? this.getLayer();
            if (!layer) return;

            const group = TRANSFORM_GROUPS.find(g => g.props.some(p => p.prop === prop));
            if (!group) return;
            const constraint = this.win.getTransformConstraint(group);
            // 该部位不支持这个变换（如 Pussy 不支持旋转），或该轴被约束过滤掉
            if (!constraint || !constraint.props.some(p => p.prop === prop)) return;

            this.win.setLayerTransform(layer, prop, value, constraint);
        }
        /**
         * 把包围框叠画到主画布。在 AppearanceRun 之后调用，
         * 所以会盖在角色之上但不会污染角色的离屏 canvas。
         */
        draw() {
            // 不能用 window.MainCanvas：那会拿到同名的 canvas DOM 元素
            const ctx = bcGlobal("MainCanvas");
            if (!ctx || typeof ctx.save !== "function" || !this.isActive()) return;

            const quad = this.getScreenQuad();
            if (!quad) {
                // 贴图还没加载完，下一帧会自动补上
                return;
            }

            const hover = this.drag ? this.drag.mode : this.hoverHandle;
            ctx.save();
            this.drawFrame(ctx, quad);
            this.drawRotateHandle(ctx, quad, hover === "rotate");
            for (const h of this.getHandlePoints(quad)) {
                this.drawHandle(ctx, h.x, h.y, hover === h.id);
            }
            ctx.restore();
        }
        /** 框线。画双色描边，保证在浅色和深色贴图上都看得清 */
        drawFrame(ctx, quad) {
            const [nw, ne, se, sw] = quad.corners;
            const path = () => {
                ctx.beginPath();
                ctx.moveTo(nw[0], nw[1]);
                ctx.lineTo(ne[0], ne[1]);
                ctx.lineTo(se[0], se[1]);
                ctx.lineTo(sw[0], sw[1]);
                ctx.closePath();
            };

            path();
            ctx.strokeStyle = "rgba(0,0,0,0.75)";
            ctx.lineWidth = 4;
            ctx.stroke();

            path();
            ctx.strokeStyle = "#4FC3F7";
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        /** 旋转句柄，含一条连到框上边的引线 */
        drawRotateHandle(ctx, quad, active) {
            ctx.beginPath();
            ctx.moveTo(quad.topMid[0], quad.topMid[1]);
            ctx.lineTo(quad.rotateAt[0], quad.rotateAt[1]);
            ctx.strokeStyle = "rgba(0,0,0,0.75)";
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.strokeStyle = "#4FC3F7";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(quad.rotateAt[0], quad.rotateAt[1], GIZMO_HANDLE_R, 0, Math.PI * 2);
            ctx.fillStyle = active ? "#FFB300" : "#4FC3F7";
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        /** 单个方形缩放句柄 */
        drawHandle(ctx, x, y, active) {
            const r = GIZMO_HANDLE_R;
            ctx.beginPath();
            ctx.rect(x - r, y - r, r * 2, r * 2);
            ctx.fillStyle = active ? "#FFB300" : "#FFFFFF";
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // 创建全局实例
    const itemColorAdjustmentWindow = new ItemColorAdjustmentWindow();

    // 捕获选中图层的贴图 URL 与绘制原点。
    // GLDrawImage / DrawImageCanvas 是两条渲染路径的共同末端，参数里带着
    // CommonDraw 算好的 drawX/drawY 和全部变换值，比在模组里复现一遍
    // URL 拼接和坐标偏移更可靠，也能跟随本体改动。
    const gizmo = itemColorAdjustmentWindow.gizmo;

    /**
     * 判断这次绘制是否属于当前选中的图层。
     * 用图层名做后缀匹配：CommonDraw 的 URL 末段固定是 layer.Name
     * @param {string} url
     * @returns {boolean}
     */
    function isSelectedLayerDraw(url) {
        if (!gizmo.isActive() || typeof url !== "string") return false;
        const layer = gizmo.getLayer();
        const asset = ItemColorItem?.Asset;
        if (!layer || !asset) return false;
        // 只认当前物品的贴图，避免同名图层误匹配
        if (!url.includes(`/${asset.Group.Name}/`)) return false;

        const file = url.slice(url.lastIndexOf("/") + 1).replace(/\.png$/i, "");
        return layer.Name
            ? file.endsWith(`_${layer.Name}`) || file === layer.Name
            : file.startsWith(asset.Name);
    }

    for (const fn of ["GLDrawImage", "DrawImageCanvas"]) {
        if (typeof w[fn] !== "function") continue;
        mod.hookFunction(fn, 1, (args, next) => {
            // GLDrawImage(url, gl, x, y, opts) / DrawImageCanvas(src, canvas, x, y, opts)
            const [src, , x, y, opts] = args;
            if (opts && isSelectedLayerDraw(src)) gizmo.capture(src, x, y, opts);
            return next(args);
        });
    }

    // Hook ItemColorLoad 函数，在进入Color模式时显示窗口
    // ItemColorLoad 是 async 且内部 await 了多个 TextCache，必须等 Promise 落地
    // 才能保证 ItemColorState / ItemColorLayerNames 已就绪
    mod.hookFunction("ItemColorLoad", 1, (args, next) => {
        const result = next(args);
        if (!screen.settings.UseAdjustmentWindow) return result;

        const show = () => {
            // 期间可能已经退出了颜色界面
            if (ItemColorState && ItemColorItem) itemColorAdjustmentWindow.show();
        };
        if (result && typeof result.then === "function") {
            return result.then((value) => { show(); return value; });
        }
        show();
        return result;
    });

    // 记录目标角色的绘制位置。调色界面不止换装一处：道具走 Dialog 的
    // colorItem 模式、还有制作与商店，各自的角色位置都不同
    mod.hookFunction("DrawCharacter", 0, (args, next) => {
        const [C, x, y, zoom, heightResize] = args;
        if (gizmo.isActive() && C && C === ItemColorCharacter) {
            gizmo.captureDraw(x, y, zoom, heightResize);
        }
        return next(args);
    });

    /**
     * 包围框当前是否应该响应交互。
     * 覆盖两条调色入口：换装界面的 Color 模式，以及 Dialog 的
     * colorItem / colorExpression 模式（道具调色走这里）
     */
    function gizmoInteractive() {
        if (!gizmo.isActive() || !itemColorAdjustmentWindow.isVisible) return false;
        // ItemColorState 存在即说明调色界面处于活动状态
        return !!(typeof ItemColorState !== 'undefined' && ItemColorState && ItemColorItem);
    }

    // 在角色绘制完成后叠画包围框，盖在角色上方且不写进角色的离屏 canvas。
    // 挂在各调色界面的 Run 上，覆盖换装 / 聊天室道具 / 制作 / 商店
    for (const runFn of ["AppearanceRun", "ChatRoomRun", "DialogDraw", "CraftingRun", "Shop2Run"]) {
        if (typeof w[runFn] !== "function") continue;
        mod.hookFunction(runFn, 0, (args, next) => {
            const result = next(args);
            if (gizmoInteractive()) {
                gizmo.commitDraw();
                gizmo.draw();
            }
            return result;
        });
    }

    /**
     * 把 DOM 事件坐标换算成游戏的 2000x1000 逻辑坐标。
     * 复现 GamePointerMove 的算法：mousedown 时本体还没更新 MouseX，
     * 触屏上也不保证按下前先有 move，所以自己算更稳
     * @param {MouseEvent} e
     * @returns {{x: number, y: number}|null}
     */
    function toGameCoords(e) {
        // 直接取 DOM 元素，避免依赖 MainCanvas 这个 2D context 全局
        const canvas = document.getElementById("MainCanvas");
        if (!canvas || !canvas.clientWidth || !e || typeof e.clientX !== "number") return null;
        return {
            x: (e.clientX - canvas.offsetLeft) * 2000 / canvas.clientWidth,
            y: (e.clientY - canvas.offsetTop) * 1000 / canvas.clientHeight
        };
    }

    // 拖拽刚结束时抑制一次 click：松手位置可能已经移出包围框，
    // 单靠命中判定会让这次点击穿透到底层按钮
    let gizmoSuppressClick = false;

    /**
     * 拖拽期间把移动与松手挂到 document 上。
     * BC 的指针事件绑在 canvas 元素而非 document（见 GameStart），
     * 因此指针一旦移出画布、或移到模组面板（z-index 10000）上方，
     * CommonMouseMove / CommonMouseUp 就再也不会触发，拖拽会中途卡死。
     * 图层放大后句柄常常正好落在这些区域，所以必须自己接管。
     */
    function beginDocDrag() {
        const onMove = (e) => {
            if (!gizmo.isDragging()) return;
            const p = toGameCoords(e);
            if (!p) return;
            gizmo.shiftKey = !!e.shiftKey;
            gizmo.moveDrag(p.x, p.y);
            // 拖拽时不让浏览器选中页面文字
            e.preventDefault();
        };
        const onUp = () => {
            document.removeEventListener('pointermove', onMove, true);
            document.removeEventListener('pointerup', onUp, true);
            document.removeEventListener('pointercancel', onUp, true);
            if (!gizmo.isDragging()) return;
            gizmo.endDrag();
            // 拖拽期间面板上的数值没跟着变，松手后同步一次
            itemColorAdjustmentWindow.updateWindow();
        };
        // 用捕获阶段，避免被其他元素的 stopPropagation 截断
        document.addEventListener('pointermove', onMove, true);
        document.addEventListener('pointerup', onUp, true);
        document.addEventListener('pointercancel', onUp, true);
    }

    // 拖拽的唯一起点。不挂 CommonMouseDown，因为 BC 的 pointerdown 绑在
    // canvas 上，落在模组面板（z-index 10000）下方的句柄收不到事件。
    // 这里用 document 捕获阶段，画布内外一视同仁。
    // 监听随脚本常驻：内部用 gizmoInteractive 把作用域限制在调色界面
    document.addEventListener('pointerdown', (e) => {
        if (gizmo.isDragging() || !gizmoInteractive()) return;

        // 面板内的可交互元素优先，避免抢掉输入框与按钮的点击
        if (e.target instanceof Element &&
            e.target.closest('input, button, select, textarea, label, .lian-color-picker-panel')) {
            return;
        }

        const p = toGameCoords(e);
        if (!p) return;

        const hit = gizmo.hitTest(p.x, p.y);
        if (!hit) return;

        // 框内平移的命中区域很大，若整片都抢过来，面板空白处就没法点了。
        // 所以平移只在画布上生效；句柄和旋转柄面积小，可以越过面板接管
        if (hit === "move" && e.target instanceof Element &&
            e.target.closest('#lian-item-color-adjustment-window')) {
            return;
        }

        gizmo.shiftKey = !!e.shiftKey;
        if (gizmo.startDrag(p.x, p.y)) {
            itemColorAdjustmentWindow.stopAllHighlight();
            gizmoSuppressClick = true;
            beginDocDrag();
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    mod.hookFunction("CommonMouseMove", 0, (args, next) => {
        // 拖拽中的移动由 document 监听接管，这里只负责悬浮高亮
        if (gizmoInteractive() && !gizmo.isDragging()) {
            const p = toGameCoords(args[0]);
            if (p) {
                gizmo.shiftKey = !!args[0].shiftKey;
                gizmo.hoverHandle = gizmo.hitTest(p.x, p.y);
            }
        }
        return next(args);
    });

    // 吞掉落在包围框上的点击，避免误触底层的颜色界面按钮。
    // 挂在 CommonClick 这个统一入口上，换装与道具（Dialog）两条路径都能覆盖
    mod.hookFunction("CommonClick", 0, (args, next) => {
        if (gizmoSuppressClick) {
            gizmoSuppressClick = false;
            return;
        }
        if (gizmoInteractive()) {
            const p = toGameCoords(args[0]);
            if (p && gizmo.hitTest(p.x, p.y)) return;
        }
        return next(args);
    });

    // Hook ItemColorFireExit 函数，销毁调整窗口
    // 必须在 next 之前销毁：ItemColorFireExit 会调 ItemColorReset() 清空
    // ItemColorState / ItemColorItem，之后闪烁就没法恢复原始透明度了
    mod.hookFunction("ItemColorFireExit", 1, (args, next) => {
        itemColorAdjustmentWindow.destroy();
        return next(args);
    });

    // 在屏幕切换时也销毁窗口
    mod.hookFunction("CommonSetScreen", 1, (args, next) => {
        const result = next(args);
        if (typeof CurrentScreen !== 'undefined' && CurrentScreen !== 'Appearance') {
            itemColorAdjustmentWindow.destroy();
        }
        return result;
    });

    console.log("[LianDressOptimization] 加载成功");
})();
