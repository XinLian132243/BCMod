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

            // 开始持续闪烁：消失0.2s，显示0.8s，交替进行
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

            // 恢复显示
            this.hiddenGroups.clear();
            if (typeof CharacterAppearanceSelection !== 'undefined' && CharacterAppearanceSelection) {
                if (typeof CharacterLoadCanvas === 'function') {
                    CharacterLoadCanvas(CharacterAppearanceSelection);
                }
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
    mod.hookFunction("CharacterAppearanceVisible", 1, (args, next) => {
        // 如果启用了服装提示功能
        if (dressOptimizationManager.itemHighlightEnabled && typeof args !== 'undefined' && args.length >= 2) {
            const C = args[0];
            const assetName = args[1];
            const groupName = args[2];
            
            // 检查部件是否应该被隐藏
            if (dressOptimizationManager.hoveredGroupName &&
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
            this.settings = {
                WheelScrollEnabled: true, // 滚轮翻页功能
                ShowThumbnailEnabled: true, // 显示缩略图功能
                ItemHighlightEnabled: true // 服装提示功能
            };
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
            
            // 滚轮翻页开关
            DrawCheckbox(500, 200, 64, 64, 
                "滚轮翻页", 
                this.settings.WheelScrollEnabled
            );
            
            // 检测鼠标悬停 - 滚轮翻页
            if (MouseIn(500, 200, 450, 64)) {
                this.setHoverText("在换装界面中，使用鼠标滚轮可以快速翻页");
            }
            
            // 显示缩略图开关
            DrawCheckbox(500, 300, 64, 64, 
                "显示服装缩略图", 
                this.settings.ShowThumbnailEnabled
            );
            
            // 检测鼠标悬停 - 显示缩略图
            if (MouseIn(500, 300, 450, 64)) {
                this.setHoverText("在换装界面的分层按钮位置显示所选衣服的缩略图");
            }
            
            // 服装提示开关
            DrawCheckbox(500, 400, 64, 64, 
                "服装提示", 
                this.settings.ItemHighlightEnabled
            );
            
            // 检测鼠标悬停 - 服装提示
            if (MouseIn(500, 400, 450, 64)) {
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
            // 滚轮翻页开关
            if (MouseXIn(500, 64) && MouseYIn(200, 64)) {
                this.settings.WheelScrollEnabled = !this.settings.WheelScrollEnabled;
                
                // 立即应用设置
                dressOptimizationManager.setWheelScrollEnabled(this.settings.WheelScrollEnabled);
            }
            
            // 显示缩略图开关
            if (MouseXIn(500, 64) && MouseYIn(300, 64)) {
                this.settings.ShowThumbnailEnabled = !this.settings.ShowThumbnailEnabled;
                
                // 立即应用设置
                dressOptimizationManager.setShowThumbnailEnabled(this.settings.ShowThumbnailEnabled);
                
                // 如果禁用，清除缓存
                if (!this.settings.ShowThumbnailEnabled) {
                    dressOptimizationManager.clearThumbnailCache();
                }
            }
            
            // 服装提示开关
            if (MouseXIn(500, 64) && MouseYIn(400, 64)) {
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
            // 保存设置
            if (!Player.OnlineSettings) {
                Player.OnlineSettings = {};
            }
            if (!Player.OnlineSettings.LianDressOpt) {
                Player.OnlineSettings.LianDressOpt = {};
            }
            
            Player.OnlineSettings.LianDressOpt = {
                WheelScrollEnabled: this.settings.WheelScrollEnabled,
                ShowThumbnailEnabled: this.settings.ShowThumbnailEnabled,
                ItemHighlightEnabled: this.settings.ItemHighlightEnabled
            };
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
            
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

    // 注册设置界面
    PreferenceRegisterExtensionSetting({
        Identifier: "LianDressOptimization",
        Image: "Icons/Dress.png",
        ButtonText: "Lian 换装优化",
        load: () => {
            // 加载设置
            if (Player.OnlineSettings && Player.OnlineSettings.LianDressOpt) {
                screen.settings = {
                    WheelScrollEnabled: Player.OnlineSettings.LianDressOpt.WheelScrollEnabled !== false, // 默认启用
                    ShowThumbnailEnabled: Player.OnlineSettings.LianDressOpt.ShowThumbnailEnabled !== false, // 默认启用
                    ItemHighlightEnabled: Player.OnlineSettings.LianDressOpt.ItemHighlightEnabled !== false // 默认启用
                };
                
                // 保存原始设置
                screen.originalSettings = {
                    WheelScrollEnabled: screen.settings.WheelScrollEnabled,
                    ShowThumbnailEnabled: screen.settings.ShowThumbnailEnabled,
                    ItemHighlightEnabled: screen.settings.ItemHighlightEnabled
                };
                
                // 应用设置
                dressOptimizationManager.setWheelScrollEnabled(screen.settings.WheelScrollEnabled);
                dressOptimizationManager.setShowThumbnailEnabled(screen.settings.ShowThumbnailEnabled);
                dressOptimizationManager.setItemHighlightEnabled(screen.settings.ItemHighlightEnabled);
            } else {
                // 默认设置
                screen.settings = {
                    WheelScrollEnabled: true,
                    ShowThumbnailEnabled: true,
                    ItemHighlightEnabled: true
                };
                screen.originalSettings = {
                    WheelScrollEnabled: true,
                    ShowThumbnailEnabled: true,
                    ItemHighlightEnabled: true
                };
                dressOptimizationManager.setWheelScrollEnabled(true);
                dressOptimizationManager.setShowThumbnailEnabled(true);
                dressOptimizationManager.setItemHighlightEnabled(true);
            }
        },
        run: () => {
            const origAlign = MainCanvas.textAlign;
            screen.Run();
            MainCanvas.textAlign = origAlign;
        },
        click: () => screen.Click(),
        unload: () => screen.Unload(),
        exit: () => {
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
            screen.Exit();
        }
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
            this.selectedNodeId = null; // 当前选中的节点ID
            this.colorPickerPanel = new ColorPickerPanel(); // 颜色选择器面板实例
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
            if (!layer) return false;
            
            // 检查图层是否有Property.Opacity属性，如果没有，说明是固定不透明度为1的图层
            if (ItemColorItem.Property && ItemColorItem.Property.Opacity) {
                // 如果Property.Opacity数组中该索引不存在或为undefined，说明是固定图层
                if (ItemColorItem.Property.Opacity[layerIndex] === undefined) {
                    return true;
                }
            } else {
                // 如果Property.Opacity不存在，检查ItemColorState.opacity
                // 如果ItemColorState.opacity中该索引不存在或为undefined，且默认值为1，说明是固定图层
                if (ItemColorState && ItemColorState.opacity) {
                    if (ItemColorState.opacity[layerIndex] === undefined) {
                        return true;
                    }
                }
            }
            
            // 检查图层是否隐藏
            if (layer.Hide === true) {
                return true;
            }
            
            return false;
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
                // 使用 ?? 而不是 ||，因为 0 是有效的透明度值
                const opacityValue = ItemColorState.opacity[node.layerIndex];
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
                        const val = ItemColorState.opacity[i];
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


            if (node.type === 'layer') {
                // 单个图层
                ItemColorState.opacity[node.layerIndex] = opacityValue;
                if (ItemColorItem.Property && ItemColorItem.Property.Opacity && Array.isArray(ItemColorItem.Property.Opacity)) {
                    ItemColorItem.Property.Opacity[node.layerIndex] = opacityValue;
                }
            } else {
                // 分组或根节点：设置所有子节点的透明度（排除固定图层）
                const setOpacityRecursive = (n) => {
                    if (n.type === 'layer') {
                        // 检查是否应该排除
                        if (this.shouldExcludeLayer(n.layerIndex)) {
                            return; // 跳过固定图层
                        }
                        ItemColorState.opacity[n.layerIndex] = opacityValue;
                        if (ItemColorItem.Property && ItemColorItem.Property.Opacity && Array.isArray(ItemColorItem.Property.Opacity)) {
                            ItemColorItem.Property.Opacity[n.layerIndex] = opacityValue;
                        }
                    } else if (n.children) {
                        n.children.forEach(setOpacityRecursive);
                    }
                };
                setOpacityRecursive(node);
            }


            // 更新角色渲染
            if (ItemColorCharacter && typeof CharacterLoadCanvas === 'function') {
                CharacterLoadCanvas(ItemColorCharacter);
            }

            // 更新UI
            this.updateWindow();
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
                padding: 10px 20px;
                background: #E0E0E0;
                border-bottom: 1px solid #000;
                display: flex;
                justify-content: space-between;
                align-items: center;
                user-select: none;
            `;
            const title = document.createElement('span');
            title.textContent = '衣服调整';
            title.style.cssText = 'font-weight: bold; font-size: 16px; flex: 1;';
            header.appendChild(title);

            const closeBtn = document.createElement('button');
            closeBtn.textContent = '关闭';
            closeBtn.style.cssText = `
                padding: 5px 15px;
                background: #fff;
                border: 1px solid #000;
                cursor: pointer;
                margin-left: 10px;
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
                padding: 10px;
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
            this.windowElement._resizeHandler = resizeHandler;

            // 添加到body
            document.body.appendChild(this.windowElement);
        }


        /**
         * 更新窗口内容
         */
        updateWindow() {
            if (!this.windowElement || !this.isVisible) return;

            const content = document.getElementById('lian-item-color-adjustment-content');
            if (!content) return;

            content.innerHTML = '';

            // 递归渲染节点
            const renderNode = (node) => {
                const nodeRow = document.createElement('div');
                nodeRow.className = 'lian-tree-node-row';
                nodeRow.dataset.nodeId = node.id;
                nodeRow.style.cssText = `
                    display: flex;
                    align-items: center;
                    padding: 5px;
                    margin-left: ${node.level * 20}px;
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
                    expandIcon.style.cssText = 'margin-right: 5px; width: 15px; display: inline-block;';
                    expandIcon.onclick = (e) => {
                        e.stopPropagation();
                        this.toggleNode(node.id);
                    };
                    nodeRow.appendChild(expandIcon);
                } else {
                    const spacer = document.createElement('span');
                    spacer.style.cssText = 'width: 20px; display: inline-block;';
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
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                `;
                leftContainer.appendChild(nameSpan);
                nodeRow.appendChild(leftContainer);

                // 右侧容器（颜色按钮和透明度控件）
                const rightContainer = document.createElement('div');
                rightContainer.style.cssText = 'display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-right: 20px;';
                
                // 颜色按钮 - 点击后弹出Pickr颜色选择器
                const colorBtn = document.createElement('button');
                const nodeColorInfo = this.getNodeColor(node);
                const displayColor = nodeColorInfo.isMultiple ? '#FFFFFF' : nodeColorInfo.color;
                const displayText = nodeColorInfo.isMultiple ? '复数' : nodeColorInfo.color.toUpperCase();
                colorBtn.textContent = displayText;
                colorBtn.style.cssText = `
                    width: 100px;
                    height: 30px;
                    background: ${displayColor};
                    color: ${this.getContrastColor(displayColor)};
                    border: 1px solid #000;
                    cursor: pointer;
                    font-size: 12px;
                `;
                colorBtn.onclick = (e) => {
                    e.stopPropagation();
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
                opacityContainer.style.cssText = 'display: flex; align-items: center; width: 150px;';
                
                const opacityInfo = this.getNodeOpacity(node);
                
                // 如果子节点透明度不同，显示Reset按钮
                if (opacityInfo.isMultiple) {
                    const resetButton = document.createElement('button');
                    resetButton.textContent = '重置不透明度';
                    resetButton.style.cssText = `
                        width: 100%;
                        height: 30px;
                        background: #4CAF50;
                        color: white;
                        border: 1px solid #000;
                        cursor: pointer;
                        font-size: 12px;
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
                    opacitySlider.style.cssText = 'flex: 1; margin-right: 5px;';
                    
                    // 鼠标按下时开始拖动
                    let isDraggingOpacity = false;
                    let sliderStartX = 0;
                    let sliderStartValue = 0;
                    let sliderWidth = 0;
                    
                    opacitySlider.addEventListener('mousedown', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
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
                    };
                    
                    document.addEventListener('mousemove', opacityMouseMoveHandler);
                    document.addEventListener('mouseup', opacityMouseUpHandler);
                    
                    opacitySlider.addEventListener('input', (e) => {
                        if (!isDraggingOpacity) {
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
                    opacityInput.style.cssText = 'width: 50px; padding: 2px; margin-right: 3px; font-size: 12px; text-align: center;';
                    
                    // 实时生效：使用 input 事件而不是 change 事件
                    opacityInput.addEventListener('input', (e) => {
                        const value = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                        opacityInput.value = value;
                        opacitySlider.value = value;
                        opacitySlider.setAttribute('value', String(value));
                        this.setNodeOpacity(node, value / 100);
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
                    });
                    
                    opacityContainer.appendChild(opacityInput);

                    const opacityPercent = document.createElement('span');
                    opacityPercent.textContent = '%';
                    opacityPercent.style.cssText = 'font-size: 12px;';
                    opacityContainer.appendChild(opacityPercent);
                }

                rightContainer.appendChild(opacityContainer);
                nodeRow.appendChild(rightContainer);

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
                        (resetButton && (e.target === resetButton || resetButton.contains(e.target)));
                    
                    if (!isInteractiveElement) {
                        this.selectedNodeId = node.id;
                        this.updateWindow();
                    }
                };

                content.appendChild(nodeRow);

                // 渲染子节点
                if (node.children && this.expandedNodes.has(node.id)) {
                    node.children.forEach(child => renderNode(child));
                }
            };

            this.treeNodes.forEach(node => renderNode(node));
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
        }

        /**
         * 销毁窗口
         */
        destroy() {
            if (this.windowElement) {
                this.windowElement.remove();
                this.windowElement = null;
            }
        }
    }

    // 创建全局实例
    const itemColorAdjustmentWindow = new ItemColorAdjustmentWindow();

    // Hook ItemColorLoad 函数，在进入Color模式时显示窗口
    mod.hookFunction("ItemColorLoad", 1, (args, next) => {
        const result = next(args);
        // 延迟显示窗口，确保ItemColorState已初始化
        setTimeout(() => {
            itemColorAdjustmentWindow.show();
        }, 100);
        return result;
    });

    // Hook ItemColorFireExit 函数，关闭调整窗口
    mod.hookFunction("ItemColorFireExit", 1, (args, next) => {
        itemColorAdjustmentWindow.hide();
        return next(args);
    });

    // 在屏幕切换时也隐藏窗口
    mod.hookFunction("CommonSetScreen", 1, (args, next) => {
        const result = next(args);
        if (typeof CurrentScreen !== 'undefined' && CurrentScreen !== 'Appearance') {
            itemColorAdjustmentWindow.hide();
        }
        return result;
    });

    console.log("[LianDressOptimization] 加载成功");
})();
