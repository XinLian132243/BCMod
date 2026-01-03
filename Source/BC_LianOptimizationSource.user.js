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
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    // =======================================================================================
    var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

    const MOD_NAME = "性能优化";
    const MOD_FULL_NAME = "BC性能优化";
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
     * 简单消息隐藏管理器
     */
    class SimpleMessageHider {
        constructor() {
            this.maxVisibleMessages = 30; // 最大可见消息数
            this.isEnabled = false;
            this.chatLog = null;
        }

        /**
         * 初始化
         */
        init() {
            this.chatLog = document.getElementById("TextAreaChatLog");
            if (!this.chatLog) {
                return false;
            }
            
            this.isEnabled = true;
            console.log('SimpleMessageHider: 初始化成功');
            return true;
        }

        /**
         * 处理消息显示逻辑
         */
        manageMessages() {
            if (!this.isEnabled || !this.chatLog) {
                return;
            }

            const messages = this.chatLog.children;
            const totalMessages = messages.length;

            // 如果消息数量不多，全部显示
            if (totalMessages <= this.maxVisibleMessages) {
                this.showAllMessages();
                return;
            }

            // 记录当前滚动位置相关信息
            const currentScrollTop = this.chatLog.scrollTop;
            const currentScrollHeight = this.chatLog.scrollHeight;
            const currentClientHeight = this.chatLog.clientHeight;
            
            // 检查是否滚动到底部
            if (this.isScrolledToBottom()) {
                // 滚动到底部：只显示最近的消息
                this.showRecentMessages(messages);
            } else {
                // 不在底部：显示所有消息，并保持滚动位置
                const wasHidden = this.hasHiddenMessages();
                this.showAllMessages();
                
                // 如果之前有隐藏的消息被显示出来，需要调整滚动位置
                if (wasHidden) {
                    // 计算新的滚动高度变化
                    setTimeout(() => {
                        const newScrollHeight = this.chatLog.scrollHeight;
                        const heightDiff = newScrollHeight - currentScrollHeight;
                        
                        // 调整滚动位置，保持用户看到的内容不变
                        if (heightDiff > 0) {
                            this.chatLog.scrollTop = currentScrollTop + heightDiff;
                        }
                    }, 0);
                }
            }
        }

        /**
         * 显示所有消息
         */
        showAllMessages() {
            const messages = this.chatLog.children;
            for (let i = 0; i < messages.length; i++) {
                const msg = messages[i];
                if (msg.style.display === 'none' && msg.getAttribute('data-auto-hidden')) {
                    msg.style.display = '';
                    msg.removeAttribute('data-auto-hidden');
                }
            }
        }

        /**
         * 只显示最近的消息
         */
        showRecentMessages(messages) {
            const totalMessages = messages.length;
            const hideCount = totalMessages - this.maxVisibleMessages;

            // 隐藏旧消息
            for (let i = 0; i < hideCount; i++) {
                const msg = messages[i];
                if (msg && msg.style.display !== 'none' && !this.shouldSkipMessage(msg)) {
                    msg.style.display = 'none';
                    msg.setAttribute('data-auto-hidden', 'true');
                }
            }

            // 显示最近的消息
            for (let i = hideCount; i < totalMessages; i++) {
                const msg = messages[i];
                if (msg && msg.style.display === 'none' && msg.getAttribute('data-auto-hidden')) {
                    msg.style.display = '';
                    msg.removeAttribute('data-auto-hidden');
                }
            }
        }

        /**
         * 判断是否应该跳过隐藏某条消息
         */
        shouldSkipMessage(msg) {
            if (!msg || !msg.classList) return false;
            
            // 跳过房间分隔符
            if (msg.classList.contains('chat-room-sep')) {
                return true;
            }
            
            
            return false;
        }

        /**
         * 检查是否滚动到底部
         */
        isScrolledToBottom() {
            if (!this.chatLog) return false;
            const threshold = 100; // 100px 阈值
            return this.chatLog.scrollTop >= this.chatLog.scrollHeight - this.chatLog.clientHeight - threshold;
        }

        /**
         * 获取状态
         */
        getStatus() {
            if (!this.chatLog) return { isEnabled: false };
            
            const messages = Array.from(this.chatLog.children);
            const hiddenCount = messages.filter(msg => msg.getAttribute('data-auto-hidden')).length;
            
            return {
                isEnabled: this.isEnabled,
                totalMessages: messages.length,
                hiddenMessages: hiddenCount,
                visibleMessages: messages.length - hiddenCount,
                maxVisible: this.maxVisibleMessages,
                isAtBottom: this.isScrolledToBottom()
            };
        }

        /**
         * 检查是否有隐藏的消息
         */
        hasHiddenMessages() {
            if (!this.chatLog) return false;
            const messages = this.chatLog.children;
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].getAttribute('data-auto-hidden')) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 设置是否启用
         */
        setEnabled(enabled) {
            this.isEnabled = enabled;
            if (!enabled) {
                // 关闭时显示所有消息
                this.showAllMessages();
            }
        }

        /**
         * 设置最大可见消息数
         */
        setMaxVisible(num) {
            this.maxVisibleMessages = num;
            this.manageMessages();
        }
    }

    // 创建管理器实例
    const messageHider = new SimpleMessageHider();

    // =======================================================================================
    // 缓存清理模块
    // =======================================================================================

    /**
     * 缓存清理管理器
     */
    class CacheClearManager {
        constructor() {
            this.isEnabled = false;
            this.intervalId = null;
            this.intervalTime = 60 * 60 * 1000; // 1小时
        }

        /**
         * 清理WebGL纹理缓存
         */
        GLDrawClearTextureCache(gl) {
            if (!gl || !gl.textureCache) return;
            
            let count = 0;
            // 1. 遍历并删除所有纹理
            for (const [url, textureInfo] of gl.textureCache) {
                if (textureInfo && textureInfo.texture) {
                    gl.deleteTexture(textureInfo.texture);
                    count++;
                }
            }
            
            // 2. 清空缓存 Map
            gl.textureCache.clear();
            console.log(`CacheClearManager: 清理了 ${count} 个纹理缓存`);
        }

        /**
         * 清理WebGL遮罩缓存
         */
        GLDrawClearMaskCache(gl) {
            if (!gl || !gl.maskCache) return;
            
            let count = 0;
            // 1. 遍历并删除所有遮罩纹理
            for (const [key, maskTexture] of gl.maskCache) {
                if (maskTexture) {
                    gl.deleteTexture(maskTexture);
                    count++;
                }
            }
            
            // 2. 清空缓存 Map
            gl.maskCache.clear();
            console.log(`CacheClearManager: 清理了 ${count} 个遮罩缓存`);
        }

        /**
         * 执行清理缓存
         */
        doClearCaches() {
            console.log('CacheClearManager: 开始清理缓存');
            
            try {
                // 清理GL纹理缓存
                if (typeof GLDrawCanvas !== 'undefined' && GLDrawCanvas && GLDrawCanvas.GL) {
                    const gl = GLDrawCanvas.GL;
                    
                    // 清理纹理缓存
                    this.GLDrawClearTextureCache(gl);
                    
                    // 清理遮罩缓存
                    this.GLDrawClearMaskCache(gl);
                    
                    // 重置画布
                    if (typeof GLDrawResetCanvas === 'function') {
                        GLDrawResetCanvas();
                        console.log('CacheClearManager: 已重置GL画布');
                    }
                }

                // 清理旧角色缓存
                console.log('CacheClearManager: 清理旧角色缓存');
                if (typeof Character !== 'undefined' && typeof ChatRoomCharacter !== 'undefined') {
                    const oldOnlineCharacters = Character.filter(c => 
                        c.IsOnline?.() && !ChatRoomCharacter.some(cc => cc.MemberNumber === c.MemberNumber)
                    );
                    
                    if (oldOnlineCharacters.length > 0) {
                        console.log(`CacheClearManager: 发现 ${oldOnlineCharacters.length} 个旧角色`);
                        oldOnlineCharacters.forEach(c => {
                            if (typeof CharacterDelete === 'function') {
                                CharacterDelete(c);
                            }
                        });
                    }
                    
                    // 刷新在线角色
                    const onlineCharacters = Character.filter(c => c.IsOnline?.());
                    if (onlineCharacters.length > 0) {
                        onlineCharacters.forEach(c => {
                            if (typeof CharacterRefresh === 'function') {
                                CharacterRefresh(c, false, false);
                            }
                        });
                        console.log(`CacheClearManager: 已刷新 ${onlineCharacters.length} 个在线角色`);
                    }
                }
                
                console.log('CacheClearManager: 缓存清理完成');
            } catch (error) {
                console.error('CacheClearManager: 清理缓存时出错', error);
            }
        }

        /**
         * 启动定时清理
         */
        start() {
            if (this.intervalId) {
                return; // 已经启动
            }
            
            this.isEnabled = true;
            this.intervalId = setInterval(() => {
                if (this.isEnabled && CurrentScreen === 'ChatRoom') {
                    this.doClearCaches();
                }
            }, this.intervalTime);
            
            console.log('CacheClearManager: 定时清理已启动，每小时执行一次');
        }

        /**
         * 停止定时清理
         */
        stop() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            this.isEnabled = false;
            console.log('CacheClearManager: 定时清理已停止');
        }

        /**
         * 设置是否启用
         */
        setEnabled(enabled) {
            if (enabled) {
                this.start();
            } else {
                this.stop();
            }
        }

        /**
         * 手动执行一次清理
         */
        manualClear() {
            this.doClearCaches();
        }
    }

    // 创建缓存清理管理器实例
    const cacheClearManager = new CacheClearManager();

    // =======================================================================================
    // 纹理质量管理模块
    // =======================================================================================

    /**
     * 纹理质量管理器
     */
    class TextureQualityManager {
        constructor() {
            this.isEnabled = false;
            this.quality = 0.8; // 纹理质量比例，范围 0.2-0.9，默认 0.8
            this.tempCanvas = null; // 统一的临时画布
            this.originalFunction = null;
        }

        /**
         * 获取纹理缩放比例
         */
        getTextureScale() {
            if (!this.isEnabled) {
                return 1.0;
            }
            return this.quality;
        }
        /**
         * 自定义的纹理绑定函数
         */
        customBindImageToTexture(gl, Img, textureInfo) {
            const scale = this.getTextureScale();
            const targetWidth = Math.floor(Img.width * scale);
            const targetHeight = Math.floor(Img.height * scale);
            
            textureInfo.width = Img.width;
            textureInfo.height = Img.height;
            
            gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
            
            try {
                if (scale < 1.0 && targetWidth > 0 && targetHeight > 0) {
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = targetWidth;
                    tempCanvas.height = targetHeight;
                    const ctx = tempCanvas.getContext('2d');
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = scale >= 0.5 ? 'high' : 'medium';
                    ctx.drawImage(Img, 0, 0, targetWidth, targetHeight);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tempCanvas);
                } else {
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Img);
                }
            } catch (error) {
                if (error instanceof Error && error.name === "SecurityError") {
                    console.error(`Failed to draw image "${Img.src}":`, error);
                } else {
                    throw error;
                }
            }
        }

        /**
         * 设置质量比例
         */
        setQuality(quality) {
            this.quality = quality;
            console.log(`TextureQualityManager: 纹理质量设置为 ${(quality * 100).toFixed(0)}%`);
        }

        /**
         * 设置是否启用
         */
        setEnabled(enabled) {
            this.isEnabled = enabled;
            console.log(`TextureQualityManager: ${enabled ? '启用' : '禁用'}纹理降级`);
        }
    }

    // 创建纹理质量管理器实例
    const textureQualityManager = new TextureQualityManager();

    // =======================================================================================
    // 帧率限制管理模块
    // =======================================================================================

    /**
     * 帧率限制管理器
     */
    class FrameRateLimitManager {
        constructor() {
            this.isEnabled = false;
            this.frameRate = 30; // 默认帧率：2, 3, 5，或取消时回到 30
            this.lowFrameRates = [2, 3, 5]; // 低帧率选项
            this.originalFrameLimitArray = null; // 保存原始的 PreferenceGraphicsFrameLimit 数组
        }

        /**
         * 应用帧率限制设置
         */
        applyFrameRateLimit(enabled, frameRate) {
            // 确保 PreferenceGraphicsFrameLimit 数组存在
            if (typeof PreferenceGraphicsFrameLimit === 'undefined') {
                console.warn('FrameRateLimitManager: PreferenceGraphicsFrameLimit 未定义');
                return;
            }

            // 首次应用时保存原始数组
            if (this.originalFrameLimitArray === null) {
                this.originalFrameLimitArray = [...PreferenceGraphicsFrameLimit];
            }

            if (enabled && this.lowFrameRates.includes(frameRate)) {
                // 启用低帧率：添加低帧率选项到数组
                const newArray = [...this.originalFrameLimitArray];
                
                // 按顺序插入低帧率选项
                for (const lowFps of this.lowFrameRates) {
                    if (!newArray.includes(lowFps)) {
                        // 找到插入位置（保持排序）
                        let insertIndex = newArray.length;
                        for (let i = 0; i < newArray.length; i++) {
                            if (newArray[i] > lowFps) {
                                insertIndex = i;
                                break;
                            }
                        }
                        newArray.splice(insertIndex, 0, lowFps);
                    }
                }
                
                PreferenceGraphicsFrameLimit.length = 0;
                PreferenceGraphicsFrameLimit.push(...newArray);
                
                // 设置当前帧率
                if (Player.GraphicsSettings) {
                    Player.GraphicsSettings.MaxFPS = frameRate;
                }
                
                this.isEnabled = true;
                this.frameRate = frameRate;
                console.log(`FrameRateLimitManager: 启用低帧率，设置为 ${frameRate} FPS`);
            } else {
                // 禁用低帧率：从数组中移除低帧率选项
                if (this.originalFrameLimitArray !== null) {
                    PreferenceGraphicsFrameLimit.length = 0;
                    PreferenceGraphicsFrameLimit.push(...this.originalFrameLimitArray);
                }
                
                // 如果当前帧率是低帧率，则调回 30
                if (Player.GraphicsSettings && this.lowFrameRates.includes(Player.GraphicsSettings.MaxFPS)) {
                    Player.GraphicsSettings.MaxFPS = 30;
                }
                
                this.isEnabled = false;
                console.log('FrameRateLimitManager: 禁用低帧率，恢复默认设置');
            }
        }

        /**
         * 设置帧率
         */
        setFrameRate(frameRate) {
            if (this.isEnabled && this.lowFrameRates.includes(frameRate)) {
                if (Player.GraphicsSettings) {
                    Player.GraphicsSettings.MaxFPS = frameRate;
                }
                this.frameRate = frameRate;
                console.log(`FrameRateLimitManager: 帧率设置为 ${frameRate} FPS`);
            }
        }
    }

    // 创建帧率限制管理器实例
    const frameRateLimitManager = new FrameRateLimitManager();

    // Hook GLDrawBingImageToTextureInfo 函数
    mod.hookFunction("GLDrawBingImageToTextureInfo", 1, (args, next) => {
        const [gl, Img, textureInfo] = args;
        
        // 如果启用了纹理降级，使用自定义函数
        if (Player.OnlineSettings?.LianOpt?.ReduceTextureQuality) {
            textureQualityManager.customBindImageToTexture(gl, Img, textureInfo);
            return;
        }
        
        // 否则使用原函数
        return next(args);
    });

    // Hook ChatRoomAppendChat 函数
    mod.hookFunction("ChatRoomAppendChat", 1, (args, next) => {
        // 先调用原函数
        const result = next(args);
        
        // 如果启用了滚动优化，处理消息隐藏
        if (Player.OnlineSettings?.LianOpt?.ScrollOptimization) {
            setTimeout(() => {
                messageHider.manageMessages();
            }, 0);
        }
        
        return result;
    });

    // Hook ElementScrollToEnd 函数  
    mod.hookFunction("ElementScrollToEnd", 1, (args, next) => {
        const result = next(args);
        const [elementId] = args;
        
        // 如果启用了滚动优化，滚动到底部后处理消息显示
        if (elementId === 'TextAreaChatLog' && Player.OnlineSettings?.LianOpt?.ScrollOptimization) {
            setTimeout(() => {
                messageHider.manageMessages();
            }, 100);
        }
        
        return result;
    });

    // 监听滚动事件
    let scrollTimeout;
    function onScroll() {
        if (!Player.OnlineSettings?.LianOpt?.ScrollOptimization) {
            return;
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            messageHider.manageMessages();
        }, 100);
    }

    // Hook ChatRoomLoad 来初始化
    mod.hookFunction("ChatRoomLoad", 1, (args, next) => {
        const result = next(args);
        
        setTimeout(() => {
            if (messageHider.init()) {
                // 绑定滚动事件
                messageHider.chatLog.addEventListener('scroll', onScroll);
                
                // 根据设置启用/禁用
                if (Player.OnlineSettings?.LianOpt?.ScrollOptimization) {
                    messageHider.setEnabled(true);
                }
            }
        }, 1000);
        
        return result;
    });

    // 暴露调试接口
    window.SimpleMessageHider = {
        getStatus: () => messageHider.getStatus(),
        setMaxVisible: (num) => {
            messageHider.maxVisibleMessages = num;
            messageHider.manageMessages();
        }
    };

    // =======================================================================================
    // 设置界面
    // =======================================================================================

    // 定义设置界面类
    class LianOptimizationSettingScreen {
        constructor() {
            this.settings = {
                ScrollOptimization: false, // 默认关闭
                MaxVisibleMessages: 30,
                AutoClearCache: false, // 定时清理缓存
                ReduceTextureQuality: false, // 降低角色分辨率
                TextureQuality: 0.8, // 纹理质量比例: 0.2-0.9，默认 0.8
                LowFrameRate: false, // 低帧率选项
                LowFrameRateValue: 5 // 低帧率值: 2, 3, 5
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

        Run() {
            // 清除上一帧的悬浮提示
            this.clearHoverText();
            
            MainCanvas.textAlign = "left";
            DrawText("- BC性能优化设置 -", 500, 125, "Black", "Gray");
            
            // 滚动优化开关
            DrawCheckbox(500, 200, 64, 64, 
                "优化聊天记录条数", 
                this.settings.ScrollOptimization
            );
            
            // 最大可见消息数设置 - 在同一行右侧
            if (this.settings.ScrollOptimization) {
                MainCanvas.textAlign = "left";
                DrawText("数量上限", 1000, 232, "Black", "Gray");
                MainCanvas.textAlign = "center";
                DrawBackNextButton(1300, 200, 200, 64, 
                    this.settings.MaxVisibleMessages + " 条", 
                    "White", "", 
                    () => "-", 
                    () => "+"
                );
            }
            
            // 检测鼠标悬停 - 滚动优化
            if (MouseIn(500, 200, 800, 64)) {
                this.setHoverText("滚动到底部时，只显示最近的消息以提高性能\n向上滚动查看历史消息时，会自动显示所有消息");
            }
            
            // 定时清理缓存
            MainCanvas.textAlign = "left";
            DrawCheckbox(500, 300, 64, 64, 
                "定时清理缓存 (每小时)", 
                this.settings.AutoClearCache
            );
            
            // 手动清理按钮
            if (this.settings.AutoClearCache) {
                MainCanvas.textAlign = "center";
                DrawButton(1000, 300, 200, 64, "立即清理", "White");
            }
            
            // 检测鼠标悬停 - 缓存清理
            if (MouseIn(500, 300, 450, 64)) {
                this.setHoverText("定时清理纹理缓存和旧角色数据，减少内存占用\n建议长时间游玩时开启此功能");
            }
            
            // 检测鼠标悬停 - 立即清理按钮
            if (this.settings.AutoClearCache && MouseIn(1000, 300, 200, 64)) {
                this.setHoverText("立即执行一次缓存清理操作");
            }
            
            // 降低角色分辨率
            MainCanvas.textAlign = "left";
            DrawCheckbox(500, 400, 64, 64, 
                "降低角色分辨率", 
                this.settings.ReduceTextureQuality
            );
            
            // 分辨率比例选择 - 在同一行右侧
            if (this.settings.ReduceTextureQuality) {
                MainCanvas.textAlign = "left";
                DrawText("分辨率比例", 1000, 432, "Black", "Gray");
                
                // 八个按钮：20% 30% 40% 50% 60% 70% 80% 90%
                const qualityOptions = [
                    { value: 0.2, label: "20%", x: 1200 },
                    { value: 0.3, label: "30%", x: 1280 },
                    { value: 0.4, label: "40%", x: 1360 },
                    { value: 0.5, label: "50%", x: 1440 },
                    { value: 0.6, label: "60%", x: 1520 },
                    { value: 0.7, label: "70%", x: 1600 },
                    { value: 0.8, label: "80%", x: 1680 },
                    { value: 0.9, label: "90%", x: 1760 }
                ];
                
                MainCanvas.textAlign = "center";
                qualityOptions.forEach(option => {
                    const color = Math.abs(this.settings.TextureQuality - option.value) < 0.01 ? "Cyan" : "White";
                    DrawButton(option.x, 400, 70, 64, option.label, color);
                });
            }
            
            // 检测鼠标悬停 - 降低分辨率
            if (MouseIn(500, 400, 450, 64)) {
                this.setHoverText("降低角色纹理分辨率以提升性能，减少显存占用\n适合配置较低的设备，数值越小性能越好但画质越差");
            }
            
            // 低帧率选项
            MainCanvas.textAlign = "left";
            DrawCheckbox(500, 500, 64, 64, 
                "低帧率", 
                this.settings.LowFrameRate
            );
            
            // 帧率选择按钮 - 在同一行右侧
            if (this.settings.LowFrameRate) {
                MainCanvas.textAlign = "left";
                DrawText("帧率", 1000, 532, "Black", "Gray");
                
                // 三个按钮：2 FPS 3 FPS 5 FPS
                const frameRateOptions = [
                    { value: 2, label: "2 FPS", x: 1200 },
                    { value: 3, label: "3 FPS", x: 1300 },
                    { value: 5, label: "5 FPS", x: 1400 }
                ];
                
                MainCanvas.textAlign = "center";
                frameRateOptions.forEach(option => {
                    const color = this.settings.LowFrameRateValue === option.value ? "Cyan" : "White";
                    DrawButton(option.x, 500, 90, 64, option.label, color);
                });
            }
            
            // 检测鼠标悬停 - 低帧率
            if (MouseIn(500, 500, 450, 64)) {
                this.setHoverText("启用低帧率模式以大幅降低 CPU/GPU 使用率\n适合配置极低的设备或后台运行，数值越小性能越好但流畅度越差");
            }
            
            // 退出按钮
            DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
            
            // 绘制底部统一的悬浮提示区域
            this.drawHoverTextArea();
        }

        Click() {
            // 滚动优化开关
            if (MouseXIn(500, 64) && MouseYIn(200, 64)) {
                this.settings.ScrollOptimization = !this.settings.ScrollOptimization;
                
                // 立即应用设置
                messageHider.setEnabled(this.settings.ScrollOptimization);
            }
            
            // 最大可见消息数调整
            if (this.settings.ScrollOptimization && MouseIn(1300, 200, 200, 64)) {
                if (MouseX <= 1400) {
                    this.settings.MaxVisibleMessages = Math.max(this.settings.MaxVisibleMessages - 5, 25);
                } else {
                    this.settings.MaxVisibleMessages = Math.min(this.settings.MaxVisibleMessages + 5, 50);
                }
                messageHider.setMaxVisible(this.settings.MaxVisibleMessages);
            }

            // 定时清理缓存开关
            if (MouseXIn(500, 64) && MouseYIn(300, 64)) {
                this.settings.AutoClearCache = !this.settings.AutoClearCache;
                
                // 立即应用设置
                cacheClearManager.setEnabled(this.settings.AutoClearCache);
            }
            
            // 立即清理按钮
            if (this.settings.AutoClearCache && MouseIn(1000, 300, 200, 64)) {
                cacheClearManager.manualClear();
            }

            // 降低角色分辨率开关
            if (MouseXIn(500, 64) && MouseYIn(400, 64)) {
                this.settings.ReduceTextureQuality = !this.settings.ReduceTextureQuality;
                
                // 立即应用设置
                textureQualityManager.setEnabled(this.settings.ReduceTextureQuality);
            }
            
            // 分辨率比例按钮
            if (this.settings.ReduceTextureQuality) {
                const qualityOptions = [
                    { value: 0.2, x: 1200 },
                    { value: 0.3, x: 1280 },
                    { value: 0.4, x: 1360 },
                    { value: 0.5, x: 1440 },
                    { value: 0.6, x: 1520 },
                    { value: 0.7, x: 1600 },
                    { value: 0.8, x: 1680 },
                    { value: 0.9, x: 1760 }
                ];
                
                for (const option of qualityOptions) {
                    if (MouseIn(option.x, 400, 70, 64)) {
                        this.settings.TextureQuality = option.value;
                        textureQualityManager.setQuality(option.value);
                        break;
                    }
                }
            }

            // 低帧率开关
            if (MouseXIn(500, 64) && MouseYIn(500, 64)) {
                this.settings.LowFrameRate = !this.settings.LowFrameRate;
                
                // 立即应用设置
                frameRateLimitManager.applyFrameRateLimit(
                    this.settings.LowFrameRate,
                    this.settings.LowFrameRateValue
                );
            }
            
            // 帧率选择按钮
            if (this.settings.LowFrameRate) {
                const frameRateOptions = [
                    { value: 2, x: 1200 },
                    { value: 3, x: 1300 },
                    { value: 5, x: 1400 }
                ];
                
                for (const option of frameRateOptions) {
                    if (MouseIn(option.x, 500, 90, 64)) {
                        this.settings.LowFrameRateValue = option.value;
                        frameRateLimitManager.setFrameRate(option.value);
                        break;
                    }
                }
            }

            // 退出按钮
            if (MouseIn(1815, 75, 90, 90)) {
                this.Exit();
            }
            return false;
        }

        Exit() {
            // 检查纹理质量设置是否有修改
            const textureQualityChanged = 
                this.originalSettings &&
                (this.originalSettings.ReduceTextureQuality !== this.settings.ReduceTextureQuality ||
                 this.originalSettings.TextureQuality !== this.settings.TextureQuality);
            
            // 保存设置
            Player.OnlineSettings.LianOpt = {
                ScrollOptimization: this.settings.ScrollOptimization,
                MaxVisibleMessages: this.settings.MaxVisibleMessages,
                AutoClearCache: this.settings.AutoClearCache,
                ReduceTextureQuality: this.settings.ReduceTextureQuality,
                TextureQuality: this.settings.TextureQuality,
                LowFrameRate: this.settings.LowFrameRate,
                LowFrameRateValue: this.settings.LowFrameRateValue
            };
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
            
            // 应用帧率限制设置
            frameRateLimitManager.applyFrameRateLimit(
                this.settings.LowFrameRate,
                this.settings.LowFrameRateValue
            );
            
            // 如果纹理质量设置有修改，强制清理一次缓存
            if (textureQualityChanged) {
                console.log('纹理质量设置已修改，清理缓存以应用新设置');
                cacheClearManager.doClearCaches();
            }
            
            PreferenceSubscreenExtensionsClear();
            return true;
        }

        Unload() {
            // 清理资源
        }
    }

    // 创建设置界面实例
    const screen = new LianOptimizationSettingScreen();

    PreferenceRegisterExtensionSetting({
        Identifier: "LianOptimization",
        Image: "Icons/Wait.png",
        ButtonText: "性能优化",
        load: () => {
            // 加载设置
            if (Player.OnlineSettings.LianOpt) {
                // 兼容旧版本的字符串格式，转换为数字
                let textureQuality = Player.OnlineSettings.LianOpt.TextureQuality ?? 0.8;
                if (typeof textureQuality === 'string') {
                    const qualityMap = { "low": 0.25, "medium": 0.5, "high": 0.75 };
                    textureQuality = qualityMap[textureQuality] ?? 0.8;
                }
                // 确保值在有效范围内
                if (typeof textureQuality !== 'number' || textureQuality < 0.2 || textureQuality > 0.9) {
                    textureQuality = 0.8;
                }
                
                screen.settings = {
                    ScrollOptimization: Player.OnlineSettings.LianOpt.ScrollOptimization ?? false,
                    MaxVisibleMessages: Player.OnlineSettings.LianOpt.MaxVisibleMessages ?? 25,
                    AutoClearCache: Player.OnlineSettings.LianOpt.AutoClearCache ?? false,
                    ReduceTextureQuality: Player.OnlineSettings.LianOpt.ReduceTextureQuality ?? false,
                    TextureQuality: textureQuality,
                    LowFrameRate: Player.OnlineSettings.LianOpt.LowFrameRate ?? false,
                    LowFrameRateValue: Player.OnlineSettings.LianOpt.LowFrameRateValue ?? 5
                };
                
                // 保存原始设置，用于检测修改
                screen.originalSettings = {
                    ScrollOptimization: screen.settings.ScrollOptimization,
                    MaxVisibleMessages: screen.settings.MaxVisibleMessages,
                    AutoClearCache: screen.settings.AutoClearCache,
                    ReduceTextureQuality: screen.settings.ReduceTextureQuality,
                    TextureQuality: screen.settings.TextureQuality,
                    LowFrameRate: screen.settings.LowFrameRate,
                    LowFrameRateValue: screen.settings.LowFrameRateValue
                };
                
                // 应用设置
                messageHider.setEnabled(screen.settings.ScrollOptimization);
                messageHider.setMaxVisible(screen.settings.MaxVisibleMessages);
                cacheClearManager.setEnabled(screen.settings.AutoClearCache);
                textureQualityManager.setEnabled(screen.settings.ReduceTextureQuality);
                textureQualityManager.setQuality(screen.settings.TextureQuality);
                frameRateLimitManager.applyFrameRateLimit(
                    screen.settings.LowFrameRate,
                    screen.settings.LowFrameRateValue
                );
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
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings, GraphicsSettings: Player.GraphicsSettings});
            screen.Exit();
        }
    });

    // 暴露调试接口
    window.LianOptimization = {
        messageHider: {
            getStatus: () => messageHider.getStatus(),
            setMaxVisible: (num) => messageHider.setMaxVisible(num)
        },
        cacheClear: {
            manualClear: () => cacheClearManager.manualClear(),
            start: () => cacheClearManager.start(),
            stop: () => cacheClearManager.stop()
        },
        textureQuality: {
            setQuality: (quality) => textureQualityManager.setQuality(quality),
            setEnabled: (enabled) => textureQualityManager.setEnabled(enabled),
            getScale: () => textureQualityManager.getTextureScale()
        }
    };

    console.log("[LianOptimization] 加载成功");
})();
