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

    // alpha 紧包围盒：扫描贴图剔除全透明边缘，得到贴合内容的框。
    // 实测衣物贴图内容只占全幅的 1%~8%（同组共用 500x1000 画布，其余是留白），
    // 不剔除的话框大得几乎等于整个角色轮廓，句柄也离图案很远。
    const ALPHA_BBOX = {
        enabled: true,
        threshold: 8,   // alpha 低于此值视为透明，略高于 0 以容忍抗锯齿杂边
        maxPixels: 4e6, // 超过这个像素量就跳过，避免同步扫描卡顿
        // 遮罩降采样倍率（每轴）。点击命中不需要逐像素精度，
        // 4 倍下每轴 ÷4、占用降到 1/16：500x1000 的贴图从 500KB 变成 31KB
        maskScale: 4
    };

    // 每张贴图的 alpha 信息，键为 URL。值为 null（读不到/全透明）或
    // { bounds, mask, mw, mh, scale }：bounds 供包围盒用，mask 供命中判定用
    //
    // 上限之外按 LRU 淘汰：一次换装会话可能翻过成百上千件衣服，
    // 无上限缓存会一直涨。Map 的插入顺序天然是 LRU 队列，
    // 命中时删掉再塞回去就是"移到队尾"。
    const ALPHA_CACHE_MAX = 500;
    const alphaDataCache = new Map();

    /** 读缓存并把该项移到队尾（标记为最近使用） */
    function touchAlphaCache(url) {
        const v = alphaDataCache.get(url);
        alphaDataCache.delete(url);
        alphaDataCache.set(url, v);
        return v;
    }

    /** 写缓存，超出上限时淘汰最久未使用的那些 */
    function putAlphaCache(url, value) {
        alphaDataCache.delete(url);
        alphaDataCache.set(url, value);
        while (alphaDataCache.size > ALPHA_CACHE_MAX) {
            // Map 迭代按插入顺序，第一个就是最久未使用的
            const oldest = alphaDataCache.keys().next();
            if (oldest.done) break;
            alphaDataCache.delete(oldest.value);
        }
    }

    /**
     * 求角色 canvas 到主画布的线性映射，复现 DrawCharacter 的贴图参数。
     *
     * 绘制位置不能写死：换装界面全身图在 (660, 90)，道具调色（Dialog）在 (500, 0)，
     * 制作与商店又各不相同，所以位置与缩放取自钩子记录的实参。
     *
     * @param {Object} C - 角色
     * @param {{x: number, y: number, zoom: number, heightResize: boolean|undefined}|null} drawAt
     * @returns {{ox: number, oy: number, sx: number, sy: number, yStart: number}|null}
     */
    function computeCanvasToScreen(C, drawAt) {
        if (!C || !drawAt) return null;

        const { x: X, y: Y, zoom, heightResize } = drawAt;

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

    /** 角色画布坐标 -> 主画布坐标 */
    function canvasToScreenPoint([x, y], map) {
        return [map.ox + x * map.sx, map.oy + (y - map.yStart) * map.sy];
    }

    /** 主画布坐标 -> 角色画布坐标 */
    function screenToCanvasPoint([x, y], map) {
        return [(x - map.ox) / map.sx, (y - map.oy) / map.sy + map.yStart];
    }

    // 轮廓描边用的离屏画布。每帧复用同一块，避免反复分配显存
    let outlineCanvas = null;

    /**
     * 取轮廓合成用的离屏画布，尺寸不足时才重新分配。
     * @param {number} w
     * @param {number} h
     * @returns {{cv: HTMLCanvasElement, ctx: CanvasRenderingContext2D}|null}
     */
    function getOutlineCanvas(w, h) {
        const W = Math.max(1, Math.ceil(w));
        const H = Math.max(1, Math.ceil(h));
        if (!outlineCanvas) outlineCanvas = document.createElement("canvas");
        const cv = outlineCanvas;
        if (cv.width < W || cv.height < H) {
            // 只增不减，尺寸变化频繁时省掉重新分配
            cv.width = Math.max(cv.width, W);
            cv.height = Math.max(cv.height, H);
        }
        const ctx = cv.getContext("2d");
        if (!ctx) return null;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.filter = "none";
        ctx.clearRect(0, 0, W, H);
        return { cv, ctx };
    }

    /**
     * 求贴图中非透明像素的边界框，返回贴图局部坐标下的矩形。
     *
     * 为什么需要：同组贴图共用画布尺寸，实际图案往往只占其中一小块，
     * 剩下全是透明留白。直接用 naturalWidth/Height 画框会明显偏大，
     * 框住一片空白，句柄也离图案很远。
     *
     * 代价：需要把图画到离屏 canvas 再 getImageData，属于同步像素读取。
     * 所以按 URL 缓存，且对超大图直接放弃。
     *
     * @param {string} url - 贴图 URL
     * @param {HTMLImageElement} img - 已加载的图片
     * @returns {{x: number, y: number, w: number, h: number}|null}
     */
    function getAlphaData(url, img) {
        if (!ALPHA_BBOX.enabled || !url || !img) return null;
        if (alphaDataCache.has(url)) return touchAlphaCache(url);

        const W = img.naturalWidth || img.width;
        const H = img.naturalHeight || img.height;
        // 宽高为 1 是 GLDrawLoadImage 的占位纹理，等下一帧真正加载完再算
        if (!(W > 1 && H > 1)) return null;

        let result = null;
        if (W * H <= ALPHA_BBOX.maxPixels) {
            try {
                const cv = document.createElement("canvas");
                cv.width = W;
                cv.height = H;
                const c = cv.getContext("2d", { willReadFrequently: true });
                c.drawImage(img, 0, 0);
                // 跨域贴图会在这里抛 SecurityError，交给下面兜底
                const data = c.getImageData(0, 0, W, H).data;

                const th = ALPHA_BBOX.threshold;
                const s = ALPHA_BBOX.maskScale;
                const mw = Math.ceil(W / s), mh = Math.ceil(H / s);
                // 每个格子 1 字节，够表达"这块有没有像素"。
                // 用 OR 归约（有一个不透明就算有），避免细线条被降采样抹掉
                const mask = new Uint8Array(mw * mh);

                let minX = W, minY = H, maxX = -1, maxY = -1;
                for (let y = 0; y < H; y++) {
                    const row = y * W * 4;
                    const mrow = (y / s | 0) * mw;
                    for (let x = 0; x < W; x++) {
                        if (data[row + x * 4 + 3] > th) {
                            mask[mrow + (x / s | 0)] = 1;
                            if (x < minX) minX = x;
                            if (x > maxX) maxX = x;
                            if (y < minY) minY = y;
                            if (y > maxY) maxY = y;
                        }
                    }
                }
                if (maxX >= minX && maxY >= minY) {
                    result = {
                        bounds: { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 },
                        mask, mw, mh, scale: s
                    };
                }
            } catch {
                // 读像素失败（多为跨域），退回整幅尺寸
                result = null;
            }
        }

        putAlphaCache(url, result);
        return result;
    }

    /**
     * 查询贴图某点是否为不透明像素，坐标为贴图局部像素坐标。
     * 走降采样遮罩，所以精度是 maskScale 个像素，对点击命中足够。
     *
     * @param {Object|null} alpha - getAlphaData 的结果
     * @param {number} px
     * @param {number} py
     * @returns {boolean} 遮罩不可用时返回 true，退化成纯包围盒判定
     */
    function isOpaqueAt(alpha, px, py) {
        if (!alpha?.mask) return true;
        const mx = px / alpha.scale | 0;
        const my = py / alpha.scale | 0;
        if (mx < 0 || my < 0 || mx >= alpha.mw || my >= alpha.mh) return false;
        return alpha.mask[my * alpha.mw + mx] === 1;
    }

    /**
     * 查某个 AssetLayer 在角色身上的层叠次序。
     *
     * C.AppearanceLayers 是本体按 Priority 升序排好的绘制序列（见
     * AssetLayerSort），下标越大越靠上，且已经把 OverridePriority 算进去了。
     * 资产自己的 Asset.Layer 数组下标不是层叠序，不能拿来比。
     *
     * 层级已按 {...layer} 浅拷贝过，比不了引用，只能按资产 + 图层名配对。
     *
     * @param {Object} C
     * @param {Object} asset
     * @param {string|undefined} layerName - 省略则取该资产最靠上的那层
     * @returns {number} 找不到时返回 -1
     */
    function layerStackOrder(C, asset, layerName) {
        const layers = C?.AppearanceLayers;
        if (!Array.isArray(layers) || !asset) return -1;
        let found = -1;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i]?.Asset !== asset) continue;
            if (layerName !== undefined && (layers[i].Name ?? "") !== layerName) continue;
            found = i;
        }
        return found;
    }

    /**
     * 放开资产的透明度下限。
     *
     * 本体只有声明了 EditOpacity 的资产才有可调透明度，其余（大部分道具）
     * 在 AssetMapLayer 里被写成 MinOpacity = MaxOpacity = 1，而 CommonDraw
     * 无条件执行 clamp(opacity, MinOpacity, MaxOpacity)，于是恒为 1，
     * 写进 Property.Opacity 也不生效。
     *
     * 这里把下限放到 0。改的是 Asset 上的共享定义，属于全局生效，
     * 所以每个资产只处理一次；不做还原，否则已调低的值会在下次进界面时被夹回。
     * @param {Object} asset - Asset 对象
     * @returns {boolean} 是否发生了修改
     */
    const opacityUnlocked = new WeakSet();
    function unlockAssetOpacity(asset) {
        if (!asset || !Array.isArray(asset.Layer) || opacityUnlocked.has(asset)) return false;
        opacityUnlocked.add(asset);

        // 只处理"被默认锁死"的情况。EditOpacity 为 true 时，Min/MaxOpacity
        // 是资产自己写的值，相等就是刻意固定该层（如某些渐变层恒为 0.5），
        // 不该动；为 false 时整套值都是 AssetMapLayer 填的 1，才是要放开的
        if (asset.EditOpacity !== false) return false;

        // Layer 在类型上是 readonly，运行时仍可写
        for (const layer of asset.Layer) layer.MinOpacity = 0;
        // EditOpacity 影响本体多处透明度 UI 的可用性，一并放开
        try { asset.EditOpacity = true; } catch { /* 只读则忽略，绘制侧已够用 */ }
        return true;
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
            // 行内用单字标签省宽度，完整名称保留在 tooltip
            short: "移",
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
            short: "缩",
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
            short: "转",
            unit: "°",
            props: [
                { prop: "Rotation", axis: "" }
            ],
            min: -180, max: 180, step: 0.1, coarseStep: 1, precision: 2, defaultValue: 0
        }
    ];

    // 界面尺寸。集中在一处便于整体调整密度
    const UI = {
        fontLg: 15,     // 节点名称
        fontMd: 14,     // 输入框
        fontSm: 13,     // 次要标签
        fontXs: 12,     // 轴标记等
        rowPadY: 4,     // 行垂直内边距
        padX: 12,       // 行水平内边距
        indent: 20,     // 每级缩进
        gapX: 9,        // 控件横向间隔
        gapY: 4,        // 换行时的纵向间隔
        inputW: 46,     // 变换数值输入框宽度，三组统一以便对齐（含原生步进箭头）
        sliderW: 165    // 透明度控件容器宽度（滑条 + 输入框 + %）
    };

    // 包围框的视觉样式，集中在一处便于统一调整
    const GIZMO_STYLE = {
        outline: "rgba(0,0,0,0.75)",  // 外描边，保证浅色贴图上也看得清
        layer: "#4FC3F7",             // 单图层：实线蓝
        item: "#7CB342",              // 物品整体：虚线绿（各图层并集）
        active: "#FFB300",            // 句柄悬浮 / 拖拽中
        handleFill: "#FFFFFF",
        outlineW: 4,
        strokeW: 2,
        itemDash: [12, 8],
        // 悬浮高亮的轮廓描边色与文字色
        hlStroke: "rgba(255,179,0,0.95)",
        hlLabelBg: "rgba(0,0,0,0.6)",
        hlFont: 26,
        // 画布上鼠标划过时的预览。比点击后的提示更淡，
        // 因为它跟着光标持续出现，太显眼会干扰对贴图本身的观察
        hoverStroke: "rgba(255,179,0,0.62)",
        hoverLabelBg: "rgba(0,0,0,0.38)"
    };

    // 轮廓描边：沿图案本身的 alpha 边缘外扩若干像素，比矩形框精确得多。
    // 用 Canvas2D 的合成操作实现（drawImage + source-in 染色 + lighter 叠加），
    // 全程走 GPU 合成，不做逐像素读取。
    const OUTLINE = {
        width: 2,    // 外扩宽度，主画布像素
        // 环向采样数。相邻采样点的弦长要小于 1px 才不会在斜边上漏出缺口，
        // 弦长 = 2 * width * sin(pi / samples)，width=2 时 16 个方向约 0.78px
        samples: 16
    };

    // 换装界面右侧部件列表最左侧按钮的 X。有扩展物品时 Strip 会左移到 1030
    // （见 AppearanceClick），全身图右缘与它有十几像素重叠，拾取要让在它之前
    const APPEARANCE_MENU_X = 1030;
    // Cloth 模式下 3x3 物品预览网格的左边界，全身图完全在它左侧
    const APPEARANCE_CLOTH_GRID_X = 1250;
    // 顶部菜单按钮行的下边界（本体 MouseYIn(25, 90)）
    const APPEARANCE_MENU_BOTTOM = 25 + 90;

    // 透明度闪烁的时长。短促一下即可，太长会挡住对颜色的判断
    const HIGHLIGHT_DURATION = 200;
    // 高亮框的时长。比闪烁久一些，闪烁过去后还能再看清一会儿范围
    const HIGHLIGHT_BOX_DURATION = 500;

    // 包围框句柄的屏幕半径（主画布坐标，2000x1000 空间）
    const GIZMO_HANDLE_R = 9;
    // 旋转句柄距包围框上边的距离
    const GIZMO_ROTATE_DIST = 46;
    // 包围框在屏幕上的最小边长。小图案（几十像素的贴花、铭牌之类）算出来的框
    // 只有十几像素宽，八个句柄会挤成一团分不开也点不准。
    // 不足时把框沿自身两轴对称撑到这个尺寸，只影响显示与命中，
    // 缩放换算仍用真实的 edges，所以拖动比例不变。
    const GIZMO_MIN_BOX = GIZMO_HANDLE_R * 2 * 3 + 6;  // 三个句柄并排的宽度
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
            this.highlightTimer = null; // 透明度闪烁定时器
            // 高亮框的定时器。框比闪烁多留一会儿，所以要独立计时
            this.highlightBoxTimer = null;
            this.highlightedNode = null; // 当前闪烁的节点
            this.highlightedLayerIndex = null; // 当前闪烁的图层索引
            this.originalOpacities = new Map(); // 存储原始透明度值（透明度槽位 -> opacity）
            this.resizeHandler = null; // window resize 监听，destroy 时解绑
            this.docListeners = []; // 挂在 document 上的临时监听，重建内容前统一解绑
            this.isInteracting = false; // 是否正在交互（点击/拖动），交互期间禁止闪烁
            this.selectedLayeringId = null; // 当前选中的层级行，选中后才展开变换行
            // 画布点击定位到的层级行。只做视觉标记，不像 selectedLayeringId
            // 那样展开变换行、拉起操作句柄
            this.pickedLayeringId = null;
            this.gizmo = new LayerTransformGizmo(this); // 预览区的变换包围框
            this.deferRefresh = false; // 为 true 时合并角色刷新
            this.refreshPending = false; // 合并期间是否有刷新请求
            // 画布拾取的上一次记录，用于重叠图层的轮换选中
            // { x, y, key, layerIndex } 或 null
            this.lastPick = null;
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

            // 只看 Min/MaxOpacity，不看 ItemColorState.editOpacity。
            // 后者是 Asset.EditOpacity 的快照，而放开与否最终由绘制侧的
            // clamp 决定，直接判断 clamp 的边界更贴近实际效果。
            //
            // CommonDraw 执行 clamp(opacity, MinOpacity, MaxOpacity)，
            // 两者相等意味着这一层透明度固定，调了也不会变。
            // unlockAssetOpacity 已把默认锁死的资产下限放到 0，
            // 走到这里还相等的是资产自己刻意固定的层，仍旧排除
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
            
            // 根 / 分组 / 图层节点走同一套：收集该节点覆盖的全部图层再比较。
            //
            // 必须用 collectLayerIndices 递归收集，与 setNodeOpacity 的写入范围
            // 对齐。之前分组与根节点直接读 node.layerIndices，而根节点的这个字段
            // 只在资产存在 WholeItem 颜色组时才被填充，缺失时就是空数组，
            // 于是滑条恒显示 100%、isMultiple 恒为 false，"重置不透明度"也不出现。
            // 图层节点同理：一个节点可能代表多个共享 ColorIndex 的图层，
            // 它们的透明度未必一致。
            const collected = this.collectLayerIndices(node);
            if (collected.length === 0) return { opacity: 1.0, isMultiple: false };

            // 过滤掉排除的图层（渲染侧透明度被夹死，调了也不生效）
            const validLayerIndices = collected.filter(i => !this.shouldExcludeLayer(i));
            if (validLayerIndices.length === 0) {
                return { opacity: 1.0, isMultiple: false, excluded: true };
            }

            // 同名图层共用一个槽位，先去重再比较，
            // 否则同一个值被数多次，不影响结果但白做功
            const slots = new Set(validLayerIndices.map(i => this.getOpacitySlot(i)));
            // 使用显式检查而不是 ||，因为 0 是有效的透明度值
            const opacities = Array.from(slots, s => {
                const val = ItemColorState.opacity[s];
                return val !== undefined ? val : 1.0;
            });
            const firstOpacity = opacities[0];

            return {
                opacity: firstOpacity,
                isMultiple: !opacities.every(o => Math.abs(o - firstOpacity) < 0.001)
            };
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
         * 设置节点（根 / 分组 / 图层）下所有图层的透明度。
         *
         * 这里刻意不调 updateWindow：那会重建整棵 DOM 树，把正在拖动的
         * 滑条元素一起销毁，拖动闭包随之失效，结果是刚拖一帧就断。
         * 与 setLayerOpacity 保持一致，刷新时机交给调用方，
         * 拖动过程中只刷角色，松手后再统一刷 UI。
         * @param {Object} node - 树节点
         * @param {number} opacityValue - 透明度值 (0-1)
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
            // layer 为 null 表示物品级：存在 Property[prop]，对所有图层生效。
            // 绘制侧 CommonDraw.getTransform 会把它与图层级的值合成
            const value = layer === null
                ? ItemColorItem?.Property?.[prop]
                : ItemColorItem?.Property?.[`Layer${prop}`]?.[this.getTransformLayerName(layer)];
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

            // 物品级直接写 Property[prop]，图层级写 Property[Layer+prop][layerName]
            if (layer === null) {
                for (const target of targets) {
                    if (rounded === constraint.defaultValue) {
                        delete ItemColorItem.Property[target];
                    } else {
                        ItemColorItem.Property[target] = rounded;
                    }
                }
            } else {
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

            // 重置时把整组都清掉（含被 Pussy 约束过滤掉的轴）
            if (layer === null) {
                for (const { prop } of group.props) {
                    delete ItemColorItem.Property[prop];
                }
                this.refreshCharacter();
                return;
            }

            const layerName = this.getTransformLayerName(layer);
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
            const layerName = layer === null ? null : this.getTransformLayerName(layer);
            return group.props.some(({ prop }) => {
                const value = layer === null
                    ? ItemColorItem?.Property?.[prop]
                    : ItemColorItem?.Property?.[`Layer${prop}`]?.[layerName];
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
                // 重建是同步的，捕获会在这次调用里重新填好。先清掉旧数据，
                // 否则图层被隐藏后残留的旧框会让物品级并集算大
                this.gizmo.invalidateCaptures();
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
                padding: 7px ${UI.padX}px;
                background: #E0E0E0;
                border-bottom: 1px solid #000;
                display: flex;
                justify-content: space-between;
                align-items: center;
                user-select: none;
            `;
            const title = document.createElement('span');
            title.id = 'lian-item-color-adjustment-title';
            title.style.cssText = 'font-weight: bold; font-size: 18px; flex: 1;';
            // 标题会在updateWindow中更新
            header.appendChild(title);

            const closeBtn = document.createElement('button');
            closeBtn.textContent = '关闭';
            closeBtn.style.cssText = `
                padding: 4px 14px;
                background: #fff;
                border: 1px solid #000;
                cursor: pointer;
                margin-left: ${UI.gapX}px;
                font-size: ${UI.fontLg}px;
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
                // 变换输入框：靠 data 属性精确定位，优先于下面基于 min/max 的推断。
                // 变换控件已内联进层级行，故按所在层级行的 id 定位
                const transformOwner = activeElement.closest?.('[data-layering-id]');
                if (activeElement.dataset?.transformProp && transformOwner) {
                    focusRestoreInfo = {
                        transformNode: transformOwner.dataset.layeringId,
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
                    
                    // 层级行改用 data-layering-id 定位：选中态会改变背景色，
                    // 原先按 background 匹配的做法在选中行上会失效
                    const layeringRow = activeElement.closest('[data-layering-id]');

                    if (nodeId && (isOpacity || isLayering)) {
                        focusRestoreInfo = {
                            nodeId: nodeId,
                            inputType: isOpacity ? 'opacity' : 'layering',
                            selectionStart: selectionStart,
                            selectionEnd: selectionEnd,
                            value: activeElement.value
                        };
                    } else if (layeringRow && (isOpacity || isLayering)) {
                        focusRestoreInfo = {
                            layeringId: layeringRow.dataset.layeringId,
                            inputType: isOpacity ? 'layeringOpacity' : 'layeringPriority',
                            selectionStart: selectionStart,
                            selectionEnd: selectionEnd,
                            value: activeElement.value
                        };
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
                    padding: ${UI.rowPadY}px ${UI.padX}px;
                    margin-left: ${node.level * UI.indent}px;
                    cursor: pointer;
                    border-bottom: 1px solid #E0E0E0;
                    background: ${this.selectedNodeId === node.id ? '#E3F2FD' : 'transparent'};
                `;

                // 展开/折叠图标
                let expandIcon = null;
                if (node.children && node.children.length > 0) {
                    expandIcon = document.createElement('span');
                    expandIcon.textContent = this.expandedNodes.has(node.id) ? '▼' : '▶';
                    expandIcon.style.cssText = `margin-right: 4px; width: 15px; display: inline-block; font-size: ${UI.fontSm}px;`;
                    expandIcon.onclick = (e) => {
                        e.stopPropagation();
                        this.toggleNode(node.id);
                    };
                    nodeRow.appendChild(expandIcon);
                } else {
                    const spacer = document.createElement('span');
                    spacer.style.cssText = 'width: 19px; display: inline-block;';
                    nodeRow.appendChild(spacer);
                }

                // 左侧容器（名称）。flex: 1 撑开剩余空间，把右侧控件推到最右
                const leftContainer = document.createElement('div');
                leftContainer.style.cssText = 'flex: 1 1 auto; min-width: 0; overflow: hidden; display: flex; align-items: center;';
                
                // 节点名称
                const nameSpan = document.createElement('span');
                nameSpan.textContent = node.name;
                // 截断时看全名
                nameSpan.title = node.name;
                nameSpan.style.cssText = `
                    flex: 0 1 auto;
                    min-width: 0;
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: ${UI.fontSm}px;
                `;
                leftContainer.appendChild(nameSpan);
                nodeRow.appendChild(leftContainer);

                // 右侧容器（颜色按钮、透明度控件、层级按钮）。
                // 整块不参与压缩，靠 gap 而非 margin/spacer 控制间距
                const rightContainer = document.createElement('div');
                rightContainer.style.cssText = `display: flex; align-items: center; gap: ${UI.gapY + 1}px; flex-shrink: 0;`;
                
                // 颜色按钮 - 点击后弹出Pickr颜色选择器
                const colorBtn = document.createElement('button');
                const nodeColorInfo = this.getNodeColor(node);
                const displayColor = nodeColorInfo.isMultiple ? '#FFFFFF' : nodeColorInfo.color;
                const displayText = nodeColorInfo.isMultiple ? '复数' : nodeColorInfo.color.toUpperCase();
                colorBtn.textContent = displayText;
                colorBtn.style.cssText = `
                    width: 96px;
                    height: 26px;
                    flex-shrink: 0;
                    background: ${displayColor};
                    color: ${this.getContrastColor(displayColor)};
                    border: 1px solid #000;
                    cursor: pointer;
                    font-size: ${UI.fontSm}px;
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

                // 透明度控件容器。flex: 0 0 <宽> 锁死尺寸，既不被右侧的层级按钮
                // 压扁，也不因内部 range 的固有宽度而胀大
                const opacityContainer = document.createElement('div');
                opacityContainer.style.cssText = `display: flex; align-items: center; flex: 0 0 ${UI.sliderW}px; overflow: hidden;`;
                
                const opacityInfo = this.getNodeOpacity(node);
                
                // 如果子节点透明度不同，显示Reset按钮
                if (opacityInfo.isMultiple) {
                    const resetButton = document.createElement('button');
                    resetButton.textContent = '重置不透明度';
                    resetButton.style.cssText = `
                        width: 100%;
                        height: 26px;
                        background: #4CAF50;
                        color: white;
                        border: 1px solid #000;
                        cursor: pointer;
                        font-size: ${UI.fontSm}px;
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
                    // min-width: 0 是必需的：range 有约 129px 的固有宽度，
                    // 只写 flex: 1 时它不会缩到容器宽度以下，会把后面的
                    // 输入框和层级按钮顶出去
                    opacitySlider.style.cssText = 'flex: 1 1 0; min-width: 0; margin-right: 5px;';
                    
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
                        // 拖动期间没刷 UI（会销毁滑条），松手后补一次，
                        // 让父级节点的显示值与"重置不透明度"按钮同步
                        if (isDraggingOpacity) {
                            isDraggingOpacity = false;
                            this.updateWindow();
                        }
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
                    opacityInput.style.cssText = `width: 46px; flex-shrink: 0; padding: 2px; margin-right: 3px; font-size: ${UI.fontMd}px; text-align: center;`;
                    
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
                    opacityPercent.style.cssText = `font-size: ${UI.fontSm}px;`;
                    opacityContainer.appendChild(opacityPercent);
                }

                rightContainer.appendChild(opacityContainer);
                
                // 层级设置按钮（对 layer 类型节点和 root 节点显示）。
                // 同样用递归收集判断，root 的 layerIndices 可能为空
                let layeringBtn = null;
                if ((node.type === 'layer' || node.type === 'root')
                    && this.collectLayerIndices(node).length > 0) {
                    // 不再插 spacer：rightContainer 已有 gap，额外的 14px
                    // 会把这一行挤宽，反过来压缩前面的透明度控件
                    layeringBtn = document.createElement('button');
                    layeringBtn.className = 'layering-expand-btn'; // 添加类名以便查找
                    layeringBtn.style.cssText = `
                        width: 26px;
                        height: 26px;
                        flex-shrink: 0;
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
                    layeringIcon.style.cssText = 'width: 18px; height: 18px; object-fit: contain;';
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
                } else {
                    // 没有层级按钮的行补等宽占位，让各行右边缘对齐
                    const btnSpacer = document.createElement('div');
                    btnSpacer.style.cssText = 'width: 26px; flex-shrink: 0;';
                    rightContainer.appendChild(btnSpacer);
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
                        // 有层级按钮才能展开/收起。layeringBtn 只在
                        // layer / root 节点上创建，故无需再判类型
                        if (layeringBtn && (node.type === 'layer' || node.type === 'root')) {
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

                // root节点特殊处理：在子节点之前渲染层级节点。
                // 条件与层级按钮的显示判据保持一致，否则按钮点了没反应
                if (node.type === 'root' && this.expandedLayeringNodes.has(node.id)
                    && this.collectLayerIndices(node).length > 0) {
                    const asset = ItemColorItem?.Asset;
                    if (asset && asset.Layer) {
                            // 显示一个整体的层级节点
                            const overridePriority = ItemColorItem?.Property?.OverridePriority;
                            const assetPriority = asset.DrawingPriority ?? asset.Group.DrawingPriority ?? 0;
                            
                            // 如果OverridePriority是整数，使用它；否则使用默认值
                            const currentPriority = Number.isInteger(overridePriority) ? overridePriority : assetPriority;
                            const defaultPriority = assetPriority;
                            const hasCustomPriority = Number.isInteger(overridePriority) && currentPriority !== defaultPriority;
                            
                            const itemLayeringId = `${node.id}_layering_item`;
                            const itemSelected = this.selectedLayeringId === itemLayeringId;

                            const layeringNodeRow = document.createElement('div');
                            layeringNodeRow.dataset.layeringId = itemLayeringId;
                            layeringNodeRow.style.cssText = `
                                display: flex;
                                align-items: center;
                                padding: ${UI.rowPadY}px ${UI.padX}px ${UI.rowPadY}px ${(node.level + 1) * UI.indent + UI.padX}px;
                                border-bottom: 1px solid #ddd;
                                background: ${itemSelected ? '#D6E8F5' : '#e8e8e8'};
                                cursor: pointer;
                            `;

                            // 选中按钮放在名称之前。物品级作用于所有图层，无包围框
                            layeringNodeRow.appendChild(
                                this.buildTransformToggle(itemLayeringId, -1)
                            );

                            const layeringNameSpan = document.createElement('span');
                            layeringNameSpan.textContent = '物品整体层级';
                            layeringNameSpan.style.cssText = `
                                flex: 0 1 auto;
                                min-width: 0;
                                max-width: 110px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-right: ${UI.gapY}px;
                                font-size: ${UI.fontSm}px;
                            `;
                            layeringNodeRow.appendChild(layeringNameSpan);
                            
                            const layeringRightContainer = document.createElement('div');
                            layeringRightContainer.style.cssText = `margin-left: auto; display: flex; align-items: center; flex-wrap: wrap; justify-content: flex-end; gap: ${UI.gapY + 1}px;`;

                            // 物品级变换控件，位于层级输入框之前。
                            // layer 传 null 表示写 Property[prop]，对所有图层统一生效
                            const itemTransformBox = this.buildTransformControls(null);
                            if (itemTransformBox) layeringRightContainer.appendChild(itemTransformBox);

                            // 根据OverridePriority状态显示不同的控件
                            const isOverridePriority = Number.isInteger(overridePriority);
                            let layeringInput = null;
                            let enableAssetPriorityButton = null;
                            
                            if (!isOverridePriority) {
                                // 不是OverridePriority时，显示"启用整体层级"按钮
                                enableAssetPriorityButton = document.createElement('button');
                                enableAssetPriorityButton.textContent = '启用整体层级';
                                enableAssetPriorityButton.style.cssText = `
                                    padding: 3px 8px;
                                    background: #4CAF50;
                                    color: white;
                                    border: 1px solid #000;
                                    cursor: pointer;
                                    font-size: 13px;
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
                                    width: 54px;
                                    padding: 2px;
                                    border: 1px solid #000;
                                    font-size: 14px;
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
                                padding: 3px 8px;
                                background: #FF9800;
                                color: white;
                                border: 1px solid #000;
                                cursor: pointer;
                                font-size: 13px;
                                margin-left: 5px;
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
                                    // 变换控件区整块排除，避免改数值时误触选中
                                    (e.target instanceof Element && e.target.closest('[data-transform-box]')) ||
                                    (layeringInput && (e.target === layeringInput || layeringInput.contains(e.target))) ||
                                    (enableAssetPriorityButton && (e.target === enableAssetPriorityButton || enableAssetPriorityButton.contains(e.target))) ||
                                    (resetLayeringButton && (e.target === resetLayeringButton || resetLayeringButton.contains(e.target)));
                                
                                if (!isInteractiveElement) {
                                    // 点击整行与点击选中按钮等效。
                                    // selectedNodeId 匹配 node.id，写父节点才有效果
                                    this.selectedNodeId = node.id;
                                    this.toggleLayeringSelection(itemLayeringId, -1);
                                }
                            };
                            
                            content.appendChild(layeringNodeRow);
                    }
                }

                // 渲染子节点
                if (node.children && this.expandedNodes.has(node.id)) {
                    node.children.forEach(child => renderNode(child));
                }
                
                // 渲染层级子节点（对 layer 类型节点）。
                // 条件与层级按钮的显示判据保持一致，否则按钮点了没反应，
                // 层级行不渲染也就没有包围框的选中按钮。
                // 用节点自身的 layerIndices 优先，保持与原来相同的顺序与去重语义
                const layeringIndices = node.type !== 'layer' ? []
                    : (node.layerIndices?.length ? node.layerIndices : this.collectLayerIndices(node));
                if (layeringIndices.length > 0 && this.expandedLayeringNodes.has(node.id)) {
                    const asset = ItemColorItem?.Asset;
                    if (asset && asset.Layer) {
                        // 为每个物理图层创建一个层级节点（即使它们共享 ColorIndex）
                        layeringIndices.forEach((layerIndex) => {
                            const layer = asset.Layer[layerIndex];
                            if (!layer) return;
                            
                            const layerName = layer.Name || `Layer ${layerIndex + 1}`;
                            const layeringNodeId = `${node.id}_layering_${layerIndex}`;
                            
                            // 两种选中：点选中按钮（会展开变换行）或画布点击定位。
                            // 后者只上色，不展开
                            const layerSelected = this.selectedLayeringId === layeringNodeId
                                || this.pickedLayeringId === layeringNodeId;

                            // 创建层级节点行
                            const layeringNodeRow = document.createElement('div');
                            layeringNodeRow.dataset.layeringId = layeringNodeId;
                            layeringNodeRow.style.cssText = `
                                display: flex;
                                align-items: center;
                                padding: ${UI.rowPadY}px ${UI.padX}px ${UI.rowPadY}px ${(node.level + 1) * UI.indent + UI.padX}px;
                                border-bottom: 1px solid #ddd;
                                background: ${layerSelected ? '#D6E8F5' : '#e8e8e8'};
                                cursor: pointer;
                            `;

                            // 选中按钮放在名称之前，选中即在预览上显示包围框
                            layeringNodeRow.appendChild(
                                this.buildTransformToggle(layeringNodeId, layerIndex)
                            );

                            // 节点名称
                            const layeringNameSpan = document.createElement('span');
                            layeringNameSpan.textContent = layerName;
                            // 宽度收窄后长名会被截断，悬浮可看全名
                            layeringNameSpan.title = layerName;
                            layeringNameSpan.style.cssText = `
                                flex: 0 1 auto;
                                min-width: 0;
                                max-width: 110px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-right: ${UI.gapY}px;
                                font-size: ${UI.fontSm}px;
                            `;
                            layeringNodeRow.appendChild(layeringNameSpan);
                            
                            // 右侧控件容器
                            const layeringRightContainer = document.createElement('div');
                            layeringRightContainer.style.cssText = `margin-left: auto; display: flex; align-items: center; flex-wrap: wrap; justify-content: flex-end; gap: ${UI.gapY + 1}px;`;

                            // 图层变换控件，位于层级输入框之前
                            const layerTransformBox = this.buildTransformControls(layer);
                            if (layerTransformBox) layeringRightContainer.appendChild(layerTransformBox);

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
                                    padding: 3px 8px;
                                    background: #2196F3;
                                    color: white;
                                    border: 1px solid #000;
                                    cursor: pointer;
                                    font-size: 13px;
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
                                    width: 54px;
                                    padding: 2px;
                                    border: 1px solid #000;
                                    font-size: 14px;
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
                            layeringOpacityContainer.style.cssText = `display: flex; align-items: center; flex: 0 0 ${UI.sliderW}px; overflow: hidden; margin-left: ${UI.gapY}px;`;
                            
                            // 获取当前图层的透明度
                            const currentLayerOpacity = this.getLayerOpacity(layerIndex);
                            const opacityPercentValue = Math.round(currentLayerOpacity * 100);
                            
                            // 透明度滑条
                            const layeringOpacitySlider = document.createElement('input');
                            layeringOpacitySlider.type = 'range';
                            layeringOpacitySlider.min = '0';
                            layeringOpacitySlider.max = '100';
                            layeringOpacitySlider.value = String(opacityPercentValue);
                            // 同上，range 需要 min-width: 0 才能缩进容器宽度内
                            layeringOpacitySlider.style.cssText = 'flex: 1 1 0; min-width: 0; margin-right: 5px;';
                            
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
                            layeringOpacityInput.style.cssText = `width: 46px; flex-shrink: 0; padding: 2px; margin-right: 3px; font-size: ${UI.fontMd}px; text-align: center;`;
                            
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
                            layeringOpacityPercent.style.cssText = `font-size: ${UI.fontSm}px;`;
                            layeringOpacityContainer.appendChild(layeringOpacityPercent);
                            
                            layeringRightContainer.appendChild(layeringOpacityContainer);
                            
                            // 重置按钮（始终占位，通过visibility控制显示/隐藏）
                            const resetLayeringButton = document.createElement('button');
                            resetLayeringButton.textContent = '重置层级';
                            resetLayeringButton.style.cssText = `
                                padding: 3px 8px;
                                background: #FF9800;
                                color: white;
                                border: 1px solid #000;
                                cursor: pointer;
                                font-size: 13px;
                                margin-left: 5px;
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
                                    // 变换控件区整块排除，避免改数值时误触选中
                                    (e.target instanceof Element && e.target.closest('[data-transform-box]')) ||
                                    (layeringInput && (e.target === layeringInput || layeringInput.contains(e.target))) ||
                                    (enableDifferentPriorityButton && (e.target === enableDifferentPriorityButton || enableDifferentPriorityButton.contains(e.target))) ||
                                    (layeringOpacitySlider && (e.target === layeringOpacitySlider || layeringOpacitySlider.contains(e.target))) ||
                                    (layeringOpacityInput && (e.target === layeringOpacityInput || layeringOpacityInput.contains(e.target))) ||
                                    (layeringOpacityPercent && (e.target === layeringOpacityPercent || layeringOpacityPercent.contains(e.target))) ||
                                    (resetLayeringButton && (e.target === resetLayeringButton || resetLayeringButton.contains(e.target)));
                                
                                if (!isInteractiveElement) {
                                    // 点击整行与点击选中按钮等效。
                                    // selectedNodeId 匹配的是 node.id，要写父节点，
                                    // 写分层行的 id 对不上任何节点，等于没生效
                                    this.selectedNodeId = node.id;
                                    this.toggleLayeringSelection(layeringNodeId, layerIndex);
                                }
                            };
                            
                            content.appendChild(layeringNodeRow);
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
                            `[data-layering-id="${focusRestoreInfo.transformNode}"]`
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
                    } else if (focusRestoreInfo.layeringId) {
                        // 层级行按 data-layering-id 定位，不受选中态背景色变化影响
                        const row = content.querySelector(
                            `[data-layering-id="${focusRestoreInfo.layeringId}"]`
                        );
                        if (row) {
                            targetElement = focusRestoreInfo.inputType === 'layeringOpacity'
                                ? row.querySelector('input[type="number"][min="0"][max="100"]')
                                : row.querySelector('input[type="number"][min="-99"][max="99"]');
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
         * 构建变换行（位移 / 缩放 / 旋转）
         * @param {Object|null} layer - 图层对象；传 null 表示物品级，
         *   写入 Property[prop] 对所有图层生效，绘制侧会与图层级的值合成
         * @param {number} layerIndex - 图层索引，物品级传 -1
         * @param {Object} node - 所属的树节点
         * @param {string} layeringNodeId - 对应层级行的节点ID
         * @param {number} [indentLevel] - 缩进层级，默认 node.level + 2
         * @returns {HTMLElement|null}
         */
        buildTransformControls(layer) {
            const box = document.createElement('div');
            box.dataset.transformBox = '1';
            box.style.cssText =
                `display: flex; align-items: center; gap: ${UI.gapX}px; flex-shrink: 0;`;

            const availability = this.getTransformAvailability();
            if (!availability.allowed) {
                const note = document.createElement('span');
                note.textContent = availability.reason;
                note.style.cssText = `font-size: ${UI.fontSm}px; color: #888;`;
                box.appendChild(note);
                return box;
            }

            let rendered = 0;
            for (const group of TRANSFORM_GROUPS) {
                const constraint = this.getTransformConstraint(group);
                if (!constraint || constraint.props.length === 0) continue;
                box.appendChild(this.buildTransformGroup(layer, group, constraint));
                rendered++;
            }

            return rendered === 0 ? null : box;
        }

        /**
         * 构建层级行的选中按钮，位于名称之前。
         * 选中后在左侧角色预览上叠加包围框，可直接拖拽平移 / 缩放 / 旋转。
         * 与点击整行等效。
         * @param {string} layeringId - 层级行的唯一标识
         * @param {number} layerIndex - 图层索引；物品级传 -1，此时不提供包围框
         * @returns {HTMLElement}
         */
        buildTransformToggle(layeringId, layerIndex) {
            const selected = this.selectedLayeringId === layeringId;
            const isItem = layerIndex < 0;
            const btn = document.createElement('button');
            btn.textContent = selected ? '◉' : '○';
            btn.title = selected
                ? '取消选中，隐藏预览包围框'
                : (isItem
                    ? '选中物品整体，包围框覆盖全部图层\n拖拽写入物品级变换，对所有图层一起生效'
                        + '\n注意旋转支点仍是各图层自己的贴图中心，不是框心'
                    : '选中该图层，在左侧预览上显示包围框')
                    + '\n框内拖动平移，句柄缩放，顶部句柄旋转';
            btn.style.cssText = `
                width: 20px;
                padding: 0;
                margin-right: 5px;
                background: ${selected ? '#4FC3F7' : '#fff'};
                color: ${selected ? '#fff' : '#666'};
                border: 1px solid #999;
                border-radius: 2px;
                cursor: pointer;
                font-size: ${UI.fontXs}px;
                line-height: 1.6;
                flex-shrink: 0;
            `;
            btn.onclick = (e) => {
                e.stopPropagation();
                this.toggleLayeringSelection(layeringId, layerIndex);
            };
            return btn;
        }

        /**
         * 切换层级行的选中态，并同步预览包围框。同一行再次点击则取消选中
         * @param {string} layeringId - 层级行的唯一标识
         * @param {number} layerIndex - 图层索引；小于 0 表示物品级，不显示包围框
         */
        toggleLayeringSelection(layeringId, layerIndex) {
            this.stopAllHighlight();
            // 面板上手动选过之后，画布轮换的基准已经不作数了
            this.resetPickCycle();
            // 手动选中接管高亮，画布定位的标记让位，避免两处同时上色
            this.pickedLayeringId = null;
            const willSelect = this.selectedLayeringId !== layeringId;
            this.selectedLayeringId = willSelect ? layeringId : null;

            // 同步预览包围框：图层级框住该图层，物品级框住全部图层的并集
            if (willSelect) {
                if (layerIndex >= 0) this.gizmo.select(layerIndex);
                else this.gizmo.selectItem();
                // 贴图 URL 与绘制原点在渲染过程中捕获，主动重建一次角色 canvas
                this.refreshCharacter();
            } else {
                this.gizmo.clear();
            }

            this.updateWindow();
        }

        /**
         * 递归遍历树节点
         * @param {Function} fn - 对每个节点调用，返回 true 时中止遍历
         * @returns {boolean} 是否被中止
         */
        walkNodes(fn, nodes = this.treeNodes) {
            for (const node of nodes) {
                if (fn(node)) return true;
                if (node.children?.length && this.walkNodes(fn, node.children)) return true;
            }
            return false;
        }

        /**
         * 找出承载某个图层的树节点。层级行挂在 layer 类型节点下，
         * 没有对应 layer 节点时（如无颜色分组的资产）退回到 root。
         * @param {number} layerIndex
         * @returns {Object|null}
         */
        findNodeForLayer(layerIndex) {
            let found = null;
            this.walkNodes((node) => {
                if (node.type !== 'layer') return false;
                const list = node.layerIndices?.length ? node.layerIndices : this.collectLayerIndices(node);
                if (list.includes(layerIndex)) { found = node; return true; }
                return false;
            });
            if (found) return found;
            const root = this.treeNodes.find(n => n.type === 'root');
            return root && this.collectLayerIndices(root).includes(layerIndex) ? root : null;
        }

        /**
         * 画布点击拾取：在右侧展开并定位到光标下图层对应的层级行。
         * 只做展开定位，不进入句柄操作状态。
         *
         * 多个图层的包围盒重叠时，在同一位置重复点击会依次轮换到下一个，
         * 循环到底再回到第一个。位置一变就从最上层（面积最小的）重新开始。
         *
         * @param {number} mx - 主画布坐标
         * @param {number} my
         * @returns {boolean} 是否命中并定位到了某个图层
         */
        pickLayerAt(mx, my) {
            const hits = this.gizmo.pickLayersAt(mx, my);
            if (hits.length === 0) return false;

            const layerIndex = hits[this.cycleIndex(hits, mx, my)];
            this.lastPick = { x: mx, y: my, key: hits.join(","), layerIndex };
            this.selectLayerRow(layerIndex);
            return true;
        }

        /** 光标离开或状态变化时重置轮换，下次点击从最上层重新开始 */
        resetPickCycle() {
            this.lastPick = null;
        }

        /**
         * 鼠标在画布上移动时，预览光标下会被选中的那个图层。
         *
         * 预览的目标与 pickLayerAt 完全一致（含轮换位置），
         * 这样看到的框就是点下去会选中的东西。
         *
         * 面板侧的行悬浮闪烁优先：那是用户正在操作列表，
         * 此时画布预览会互相打断。
         *
         * @param {number} mx - 主画布坐标
         * @param {number} my
         */
        previewPickAt(mx, my) {
            // 已进入句柄操作状态时不预览，避免和选中框叠在一起分不清
            if (this.gizmo.isActive() || this.gizmo.isDragging()) return;
            // 面板侧正在闪烁，让它占用高亮框
            if (this.highlightBoxTimer !== null || this.highlightTimer !== null) return;

            const layerIndex = this.peekPickTarget(mx, my);
            if (layerIndex === null) {
                this.clearHoverPreview();
                return;
            }

            this.gizmo.setHighlight([layerIndex], this.getLayerHighlightLabel(layerIndex), true);
        }

        /** 收掉画布悬浮预览框。只清 hover 态的，不影响面板闪烁的提示框 */
        clearHoverPreview() {
            if (this.gizmo.highlight?.hover) this.gizmo.clearHighlight();
        }

        /**
         * 算出此刻点击会选中哪个图层，但不改变轮换状态。
         * 供悬浮预览使用，所以必须是只读的。
         * @returns {number|null}
         */
        peekPickTarget(mx, my) {
            const hits = this.gizmo.pickLayersAt(mx, my);
            if (hits.length === 0) return null;
            return hits[this.cycleIndex(hits, mx, my)];
        }

        /**
         * 轮换下标：同一位置连续点击时依次后移，位置或命中集合一变就归零。
         * @param {number[]} hits - 命中的图层，已按面积升序
         * @returns {number}
         */
        cycleIndex(hits, mx, my) {
            // 光标挪动超过这个距离就视为新的一次拾取，不再延续轮换。
            // 取句柄直径量级，容忍点击时的轻微手抖
            const SAME_SPOT = GIZMO_HANDLE_R * 2;
            const last = this.lastPick;
            const sameSpot = last
                && Math.hypot(mx - last.x, my - last.y) <= SAME_SPOT
                && last.key === hits.join(",");
            return sameSpot ? (hits.indexOf(last.layerIndex) + 1) % hits.length : 0;
        }

        /**
         * 定位到某图层的层级行：展开祖先链、滚动到可见处、闪一下确认。
         * 不写选中态，所以不会展开变换行、也不出现操作句柄。
         * @param {number} layerIndex
         */
        selectLayerRow(layerIndex) {
            const node = this.findNodeForLayer(layerIndex);
            if (!node) return;

            this.stopAllHighlight();

            // 层级行只在父节点展开后才存在，先把整条祖先链打开
            for (let p = node.parent; p; p = p.parent) this.expandedNodes.add(p.id);
            this.expandedLayeringNodes.add(node.id);

            const layeringId = `${node.id}_layering_${layerIndex}`;
            // 拾取到别的图层时，退出旧目标的句柄模式。
            // 否则句柄还框在上一个图层上，而列表已经跳到新的那一行，
            // 拖动句柄改的是看不见的那个，很容易误操作
            if (this.gizmo.isActive() && this.selectedLayeringId !== layeringId) {
                this.gizmo.clear();
                this.selectedLayeringId = null;
            }

            // 上选中态：父节点（部件行）和分层行都要高亮。
            // selectedNodeId 只匹配 node.id，之前误写成分层行的 id，
            // 两边都对不上，所以看起来完全没有选中效果。
            //
            // 分层行走 pickedLayeringId 而不是 selectedLayeringId：
            // 后者会展开变换行并拉起操作句柄。画布点击的意图是"找到这一层"，
            // 要不要改变换由用户再点该行的选中按钮决定
            this.selectedNodeId = node.id;
            this.pickedLayeringId = layeringId;

            this.updateWindow();
            this.scrollLayeringIntoView(layeringId);
            // 和悬浮列表行一样闪一次：透明度闪 0.2s、框留 0.5s，
            // 让人确认点中的确实是这一层
            this.startLayerHighlight(layerIndex);
        }

        /** 把指定层级行滚动到面板可见区域 */
        scrollLayeringIntoView(layeringId) {
            if (!this.windowElement) return;
            const row = this.windowElement.querySelector(
                `[data-layering-id="${CSS.escape(layeringId)}"]`);
            row?.scrollIntoView({ block: 'nearest' });
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
            block.style.cssText = 'display: flex; align-items: center; gap: 3px;';

            const tip = `范围 ${constraint.min} ~ ${constraint.max}，滚轮 ${constraint.step}`
                + (constraint.coarseStep !== constraint.step ? `，Shift+滚轮 ${constraint.coarseStep}` : '')
                + (layer === null
                    ? '\n物品级：与各图层自身的值合成（位移旋转相加、缩放相乘）'
                    : '')
                + (group.key === "Rotation"
                    ? '\n支点为贴图中心，图层离中心越远，同角度下移动越明显'
                    : '');

            const label = document.createElement('span');
            label.textContent = group.short ?? group.label;
            label.title = group.label + (constraint.unit ? `（${constraint.unit}）` : '') + '\n' + tip;
            label.style.cssText = `font-size: ${UI.fontSm}px; color: #555; margin-right: 1px;`;
            block.appendChild(label);

            // 输入框顺序即 X、Y，靠位置区分，不再单独标注轴名
            const inputs = [];
            for (const { prop, axis } of constraint.props) {
                const input = this.buildTransformInput(layer, group, constraint, prop, inputs);
                // 轴名与单位移到 tooltip，保持行内紧凑
                input.title = (axis ? `${group.label} ${axis}` : group.label)
                    + (constraint.unit ? `（${constraint.unit}）` : '') + '\n' + tip;
                inputs.push({ prop, input });
                block.appendChild(input);
            }

            // 重置按钮，仅在该组存在自定义值时可见
            const reset = document.createElement('button');
            reset.textContent = '↺';
            reset.title = `重置${group.label}`;
            reset.style.cssText = `
                width: 17px;
                padding: 0;
                background: #FF9800;
                color: white;
                border: 1px solid #000;
                cursor: pointer;
                font-size: ${UI.fontXs}px;
                line-height: 1.5;
                flex-shrink: 0;
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
            // title 由 buildTransformGroup 统一设置（含轴名与单位）
            // 三组输入框共用同一宽度，视觉上对齐。保留原生步进箭头，
            // 故左侧留一点内边距，避免数字与箭头贴太近
            input.style.cssText = `
                width: ${UI.inputW}px;
                padding: 1px 0 1px 3px;
                border: 1px solid #000;
                font-size: ${UI.fontMd}px;
                text-align: center;
                flex-shrink: 0;
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
            // 上面两条都没进时框可能还挂着（透明度全被排除的节点），兜一下
            this.hideHighlightBox();
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
            this.selectedLayeringId = null;
            this.pickedLayeringId = null;
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
            this.hideHighlightBox();
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
            this.gizmo.reset();
            this.isVisible = false;
            this.treeNodes = [];
            this.selectedNodeId = null;
            this.selectedLayeringId = null;
            this.pickedLayeringId = null;
            this.hoveredNodeId = null;
            this.hoveredLayeringNodeId = null;
            this.originalOpacities.clear();
            this.resetPickCycle();
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

            // 同时在角色上画个半透明框标出范围。图层小或被遮挡时，
            // 单看透明度变化很难定位到底是哪一块
            this.showHighlightBox(layerIndices, this.getHighlightLabel(node));

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

            this.highlightTimer = setTimeout(() => {
                this.restoreNodeHighlight();
                this.highlightTimer = null;
            }, HIGHLIGHT_DURATION);
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

            // 框先显示：透明度不可调的图层（MinOpacity 等于 MaxOpacity）
            // 闪不动，但位置提示照样有用，不该跟着一起被跳过
            this.showHighlightBox([layerIndex], this.getLayerHighlightLabel(layerIndex));

            // 该图层透明度被锁死，闪烁没有视觉效果，到此为止
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

            this.highlightTimer = setTimeout(() => {
                this.restoreLayerHighlight();
                this.highlightTimer = null;
            }, HIGHLIGHT_DURATION);
        }

        /**
         * 显示高亮框并起独立计时。框比透明度闪烁留得久，
         * 闪烁过去后还能再看清一会儿范围。
         * @param {number[]} layerIndices
         * @param {string} label
         */
        showHighlightBox(layerIndices, label) {
            this.clearHighlightBoxTimer();
            this.gizmo.setHighlight(layerIndices, label);
            this.highlightBoxTimer = setTimeout(() => {
                this.highlightBoxTimer = null;
                this.gizmo.clearHighlight();
            }, HIGHLIGHT_BOX_DURATION);
        }

        /** 只停掉框的计时，不动框本身 */
        clearHighlightBoxTimer() {
            if (this.highlightBoxTimer !== null) {
                clearTimeout(this.highlightBoxTimer);
                this.highlightBoxTimer = null;
            }
        }

        /** 立即收掉高亮框，连计时一起清。鼠标离开或开始交互时用 */
        hideHighlightBox() {
            this.clearHighlightBoxTimer();
            this.gizmo.clearHighlight();
        }

        /** 道具名，父节点找不到时的兜底 */
        getAssetName() {
            return ItemColorItem?.Asset?.Description || ItemColorItem?.Asset?.Name || "";
        }

        /**
         * 某个图层所属的部件名，即树里承载它的那个节点的名字。
         *
         * 这个名字是 buildTree 从颜色分组算出来的，经过
         * ItemColorGroupNames / ItemColorLayerNames 翻译，
         * 比道具名更贴近用户在列表里看到的层级结构。
         *
         * @param {number} layerIndex
         * @returns {string}
         */
        getPartName(layerIndex) {
            const node = this.findNodeForLayer(layerIndex);
            // root 节点的名字是"物品整体"，那是占位不是部件名，退回道具名
            if (!node || node.type === 'root') return this.getAssetName();
            return node.name || this.getAssetName();
        }

        /**
         * 拼「父类名 - 子名」。子名缺失或与父名相同时只显示父名，
         * 避免出现「敞夹克 - 敞夹克」这种重复
         * @param {string} parent
         * @param {string} [child]
         * @returns {string}
         */
        formatHighlightLabel(parent, child) {
            if (!child || child === parent) return parent;
            if (!parent) return child;
            return `${parent} - ${child}`;
        }

        /**
         * 高亮框上方显示的文字，格式为「部件名 - 层级名」。
         * 物品整体只显示部件名，分组与图层各自附上自己的名字。
         * @param {Object} node
         * @returns {string}
         */
        getHighlightLabel(node) {
            if (!node || node.type === 'root') return this.getAssetName();
            // 分组节点自己就是部件层，父级取道具名
            if (node.type === 'group') return this.formatHighlightLabel(this.getAssetName(), node.name);
            // 图层节点：父节点名 - 自己的名字
            const parent = node.parent && node.parent.type !== 'root'
                ? node.parent.name : this.getAssetName();
            return this.formatHighlightLabel(parent, node.name);
        }

        /**
         * 单个图层的高亮标签，格式为「部件名 - 层级名」。
         * 部件名取树里承载它的节点名，层级名取贴图图层自己的名字。
         * @param {number} layerIndex
         * @returns {string}
         */
        getLayerHighlightLabel(layerIndex) {
            const layer = ItemColorItem?.Asset?.Layer?.[layerIndex];
            return this.formatHighlightLabel(this.getPartName(layerIndex), layer?.Name);
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
            // 框不在这里清：它有自己更长的计时，由 highlightBoxTimer 负责
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
            this.hideHighlightBox();
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
            this.hideHighlightBox();
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
            // true 表示选中的是物品整体：框住全部图层的并集，写 Property[prop]
            this.itemLevel = false;
            this.drag = null;         // 拖拽会话
            this.hoverHandle = null;  // 当前悬浮的句柄 id
            // 渲染时捕获的绘制信息，键为图层索引，值含贴图 URL 与已剔除位移的原点。
            // 物品级需要全部图层来求并集，所以用 Map 而不是单条记录
            this.captures = new Map();
            this.shiftKey = false;    // 最近一次鼠标事件的 Shift 状态，用于角度吸附
            this.drawAt = null;       // 角色本帧的绘制位置与缩放，来自 DrawCharacter
            this.frameDrawAt = null;  // 本帧收集中的候选，帧末提交到 drawAt
            // 悬浮高亮：闪烁期间用半透明框标出目标图层的范围。
            // { indices: number[], label: string } 或 null
            this.highlight = null;
        }

        /**
         * 是否需要收集绘制数据。
         *
         * 面板可见时一律收集：画布点击拾取要对所有图层做命中判定，
         * 而用户可能在任何时候点击，没法预先知道要哪一个。
         * 单次收集就是几十个字符串比对，代价远小于漏掉数据导致点不中。
         */
        isCapturing() {
            return this.win?.isVisible || this.isActive() || this.highlight !== null;
        }

        /**
         * 是否需要全部图层的捕获数据。物品级要求并集、高亮可能覆盖多个图层、
         * 点击拾取要遍历所有图层，三者都不能只收集选中的那一个。
         */
        needsAllCaptures() {
            return this.highlight !== null || !!this.win?.isVisible;
        }

        /**
         * 设置高亮范围。只记图层索引，几何在绘制时按当前捕获数据实时算，
         * 所以闪烁期间图层被改透明度也不影响框的位置。
         * @param {number[]} indices - 要框住的图层索引
         * @param {string} [label] - 框上方的文字标注
         */
        setHighlight(indices, label, hover = false) {
            const list = Array.isArray(indices) ? indices.filter(i => Number.isInteger(i)) : [];
            if (list.length === 0) {
                this.clearHighlight();
                return;
            }
            const key = list.join(",");
            // 同一批图层重复设置时保留原对象，避免每帧触发无谓的状态变化
            if (this.highlight && this.highlight.key === key
                && this.highlight.label === label && this.highlight.hover === hover) return;
            this.highlight = { indices: list, label: label || "", key, hover };
        }

        /** 清除高亮范围 */
        clearHighlight() {
            this.highlight = null;
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
         * 丢弃已捕获的绘制数据，下一次角色重建时重新收集。
         * 图层被隐藏或换了贴图后，旧数据会让物品级并集算错，
         * 所以在触发角色重建前调用。
         */
        invalidateCaptures() {
            this.captures.clear();
        }

        /**
         * 由 CommonDraw 的绘制回调调用，记录选中图层的真实 URL 与绘制原点。
         * 直接取渲染管线的实参，省去复现一遍 URL 拼接和坐标偏移的逻辑，
         * 也自动跟随本体后续改动。
         * @param {number} layerIndex - 该次绘制对应的图层索引
         * @param {string} url - 贴图完整 URL
         * @param {number} x - drawX，已含 TranslationX
         * @param {number} y - drawY，已含 TranslationY
         * @param {Object} opts - 绘制选项，含 Translation / Scale / Rotation
         */
        capture(layerIndex, url, x, y, opts) {
            // 反推未位移时的原点，后续换算不受当前位移值干扰
            this.captures.set(layerIndex, {
                url,
                x: x - (opts?.TranslationX || 0),
                y: y - (opts?.TranslationY || 0)
            });
        }
        /** 当前是否有选中目标（单个图层或物品整体） */
        isActive() {
            return this.layerIndex !== null || this.itemLevel;
        }

        /** 是否正在拖拽 */
        isDragging() {
            return this.drag !== null;
        }

        /**
         * 选中某个图层。已选中同一图层时不做处理，避免丢掉已捕获的渲染数据
         * @param {number} layerIndex
         */
        select(layerIndex) {
            if (!this.itemLevel && this.layerIndex === layerIndex) return;
            this.layerIndex = layerIndex;
            this.itemLevel = false;
            this.drag = null;
            // 捕获数据属于上一个目标，换选后必须等新目标重新渲染一帧
            this.captures.clear();
        }

        /**
         * 选中物品整体。包围框取该物品全部图层的并集，
         * 拖拽写 Property[prop]，与本体的 Item translation 语义一致
         */
        selectItem() {
            if (this.itemLevel) return;
            this.itemLevel = true;
            this.layerIndex = null;
            this.drag = null;
            this.captures.clear();
        }

        /** 清除选中态。高亮是独立状态，由闪烁流程自己管，这里不动 */
        clear() {
            this.layerIndex = null;
            this.itemLevel = false;
            this.drag = null;
            this.hoverHandle = null;
            this.captures.clear();
            this.drawAt = null;
            this.frameDrawAt = null;
        }

        /** 面板关闭时的完全复位，选中与高亮一起清掉 */
        reset() {
            this.clear();
            this.highlight = null;
        }
        /**
         * 取选中的 AssetLayer。物品级返回 null，正好对应
         * setLayerTransform / readTransforms 里"null 即物品级"的约定
         * @returns {Object|null}
         */
        getLayer() {
            if (this.itemLevel || this.layerIndex === null) return null;
            const layers = ItemColorItem?.Asset?.Layer;
            return Array.isArray(layers) ? layers[this.layerIndex] ?? null : null;
        }

        /**
         * 取图层贴图的原始像素尺寸。缩放与旋转的支点都是贴图中心，
         * 所以必须拿到真实宽高，不能用组的名义尺寸。
         * URL 由 capture 在渲染时记录，这里只负责查缓存。
         * 两条渲染路径的缓存不同：WebGL 走 GLDrawImageCache，2D 回退走 DrawCacheImage。
         * @param {string} url
         * @returns {{width: number, height: number}|null}
         */
        getTextureSize(url) {
            if (!url) return null;

            const fromCache = (img) => {
                if (!img) return null;
                const wpx = img.naturalWidth || img.width;
                const hpx = img.naturalHeight || img.height;
                // 宽高为 1 说明纹理还是 GLDrawLoadImage 塞的 1x1 占位像素
                return (wpx > 1 && hpx > 1) ? { width: wpx, height: hpx } : null;
            };

            return fromCache(bcGlobal("GLDrawImageCache")?.get(url))
                ?? fromCache(bcGlobal("DrawCacheImage")?.get(url))
                ?? null;
        }

        /**
         * 贴图的内容矩形：优先取非透明像素的边界，拿不到则退回整幅贴图。
         *
         * tw/th 始终是整幅尺寸，因为渲染的旋转与缩放支点固定在整幅贴图中心
         * （见 GLDrawImage 里的 tex.width/2），换算时不能用内容中心代替。
         *
         * @param {string} url
         * @returns {{tw: number, th: number, x: number, y: number, w: number, h: number}|null}
         */
        getContentRect(url) {
            const size = this.getTextureSize(url);
            if (!size) return null;
            const { width: tw, height: th } = size;

            const alpha = this.getAlpha(url);
            const ab = alpha?.bounds;
            return ab
                ? { tw, th, x: ab.x, y: ab.y, w: ab.w, h: ab.h, alpha }
                : { tw, th, x: 0, y: 0, w: tw, h: th, alpha: null };
        }

        /** 取贴图的 alpha 信息（边界 + 降采样遮罩），两条渲染路径的缓存都查 */
        getAlpha(url) {
            const img = bcGlobal("GLDrawImageCache")?.get(url) ?? bcGlobal("DrawCacheImage")?.get(url);
            return getAlphaData(url, img);
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
            return this.itemLevel ? this.getItemLocalQuad() : this.getLayerLocalQuad();
        }

        /**
         * 单个图层的包围框：跟随该图层自身的旋转，所以是个可斜置的矩形
         * @returns {{corners: number[][], center: number[], tex: Object}|null}
         */
        getLayerLocalQuad() {
            const layer = this.getLayer();
            const cap = this.captures.get(this.layerIndex);
            const rect = this.getContentRect(cap?.url);
            if (!layer || !rect || !cap) return null;

            const t = this.readTransforms(layer);
            const q = this.transformRect(cap, rect, t);

            return {
                corners: q.corners,
                center: q.center,
                pivot: q.pivot,
                edges: q.edges,
                // 缩放换算的参考尺寸取画面上框的实际大小（已含当前缩放）
                tex: { width: rect.w * t.ScaleX, height: rect.h * t.ScaleY }
            };
        }

        /**
         * 把贴图内容矩形按图层变换映射到角色画布坐标。
         *
         * 复现 GLDrawImage 的矩阵链：缩放与旋转的支点都是整幅贴图中心
         * （tex.width/2, tex.height/2），不是内容矩形的中心。所以内容矩形
         * 偏离画布中心时，缩放会同时把它推离支点，这与本体渲染一致。
         *
         * @param {{x: number, y: number}} cap - 该图层的绘制原点
         * @param {{tw: number, th: number, x: number, y: number, w: number, h: number}} rect
         * @param {{TranslationX: number, TranslationY: number, ScaleX: number, ScaleY: number, Rotation: number}} t
         * @returns {{corners: number[][], center: number[], pivot: number[]}}
         */
        transformRect(cap, rect, t) {
            const f = this.getTranslationFactor();
            // 支点：整幅贴图中心，加上位移
            const px = cap.x + rect.tw / 2 + t.TranslationX * f;
            const py = cap.y + rect.th / 2 + t.TranslationY * f;

            const a = t.Rotation * Math.PI / 180;
            const cos = Math.cos(a), sin = Math.sin(a);
            // 内容矩形四角相对支点的偏移，先缩放再旋转
            const map = (ux, uy) => {
                const dx = (ux - rect.tw / 2) * t.ScaleX;
                const dy = (uy - rect.th / 2) * t.ScaleY;
                return [px + dx * cos - dy * sin, py + dx * sin + dy * cos];
            };

            const x2 = rect.x + rect.w, y2 = rect.y + rect.h;
            const corners = [map(rect.x, rect.y), map(x2, rect.y), map(x2, y2), map(rect.x, y2)];
            return {
                corners,
                center: map(rect.x + rect.w / 2, rect.y + rect.h / 2),
                pivot: [px, py],
                // 四条边到支点的带符号距离（局部轴、含当前缩放），缩放拖拽据此
                // 换算比例，保证被拖的那条边跟着鼠标走
                edges: {
                    x: [(rect.x - rect.tw / 2) * t.ScaleX, (x2 - rect.tw / 2) * t.ScaleX],
                    y: [(rect.y - rect.th / 2) * t.ScaleY, (y2 - rect.th / 2) * t.ScaleY]
                }
            };
        }

        /**
         * 物品整体的包围框：各图层可能有各自的旋转，合起来没有统一朝向，
         * 所以取所有图层四角的轴对齐外接矩形。
         * tex 用外接矩形自身的尺寸，缩放拖拽据此换算比例。
         * @returns {{corners: number[][], center: number[], tex: Object}|null}
         */
        getItemLocalQuad() {
            return this.getUnionLocalQuad(null);
        }

        /**
         * 若干图层的轴对齐并集包围框。各图层可能有各自的旋转，合起来没有
         * 统一朝向，所以取所有角点的外接矩形。物品级选中与悬浮高亮共用此逻辑。
         *
         * @param {number[]|null} indices - 参与计算的图层索引，null 表示全部已捕获的
         * @returns {{corners: number[][], center: number[], tex: Object}|null}
         */
        getUnionLocalQuad(indices) {
            const layers = ItemColorItem?.Asset?.Layer;
            if (!Array.isArray(layers) || this.captures.size === 0) return null;

            const wanted = indices ? new Set(indices) : null;
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

            for (const [idx, cap] of this.captures) {
                if (wanted && !wanted.has(idx)) continue;
                const layer = layers[idx];
                const rect = this.getContentRect(cap.url);
                if (!layer || !rect) continue;

                const { corners } = this.transformRect(cap, rect, this.readTransforms(layer));
                for (const [px, py] of corners) {
                    if (px < minX) minX = px;
                    if (px > maxX) maxX = px;
                    if (py < minY) minY = py;
                    if (py > maxY) maxY = py;
                }
            }

            if (!Number.isFinite(minX) || maxX <= minX || maxY <= minY) return null;

            return {
                corners: [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]],
                center: [(minX + maxX) / 2, (minY + maxY) / 2],
                tex: { width: maxX - minX, height: maxY - minY }
            };
        }
        /**
         * 读取图层当前的合成变换值，规则与 CommonDraw 的 getTransform 一致：
         * 位移与旋转是图层值加物品值，缩放是相乘。
         * @returns {{TranslationX: number, TranslationY: number, ScaleX: number, ScaleY: number, Rotation: number}}
         */
        /**
         * 读取"将被写入的那个槽位"的当前值，作为拖拽增量的基准。
         *
         * 不能用 readTransforms：它返回的是图层级与物品级的合成结果，
         * 而 write 只写其中一个槽位。物品级有值时，用合成值当基准会把
         * 物品级那一份重复写进图层槽位，松手瞬间发生跳变。
         *
         * @param {Object|null} layer - null 表示物品级
         * @returns {{TranslationX: number, TranslationY: number, ScaleX: number, ScaleY: number, Rotation: number}}
         */
        readWriteSlot(layer) {
            const props = ItemColorItem?.Property ?? {};
            const safe = (v, dft) => (typeof v === "number" && !Number.isNaN(v)) ? v : dft;

            const read = (prop, dft) => safe(
                layer === null ? props[prop] : props[`Layer${prop}`]?.[this.win.getTransformLayerName(layer)],
                dft
            );

            return {
                TranslationX: read("TranslationX", 0), TranslationY: read("TranslationY", 0),
                ScaleX: read("ScaleX", 1), ScaleY: read("ScaleY", 1),
                Rotation: read("Rotation", 0)
            };
        }

        readTransforms(layer) {
            const props = ItemColorItem?.Property ?? {};
            // layer 为 null 表示只看物品级的值（拖动物品整体时的基准）
            const name = layer ? this.win.getTransformLayerName(layer) : null;
            const safe = (v) => (typeof v === "number" && !Number.isNaN(v)) ? v : undefined;

            const read = (prop) => {
                const layerVal = name === null ? undefined : safe(props[`Layer${prop}`]?.[name]);
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
        /** 角色 canvas 到主画布的线性映射，见 computeCanvasToScreen */
        getCanvasToScreen() {
            return computeCanvasToScreen(ItemColorCharacter, this.drawAt);
        }
        /**
         * 包围框在主画布上的几何信息，绘制与命中判定都基于它
         * @returns {{corners: number[][], center: number[], rotateAt: number[], map: Object}|null}
         */
        getScreenQuad() {
            const local = this.getLocalQuad();
            const map = this.getCanvasToScreen();
            if (!local || !map) return null;

            const toScreen = (p) => this.toScreenPoint(p, map);

            const center = toScreen(local.center);
            // 小图案的框会小到句柄叠在一起，撑到最小可操作尺寸。
            // 只改这里的显示与命中几何，local.edges 保持原值，
            // 所以 applyScale 的换算比例不受影响
            const corners = this.padCorners(local.corners.map(toScreen), center);
            // 渲染的旋转支点是整幅贴图中心，剔除透明边后它与框心不再重合，
            // 旋转拖拽必须绕支点算角度，否则鼠标与图案转动会不同步
            const pivot = local.pivot ? toScreen(local.pivot) : center;

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

            return { corners, center, pivot, rotateAt, topMid, map, tex: local.tex, edges: local.edges };
        }

        /**
         * 角色画布坐标 -> 主画布坐标
         * @param {number[]} p - [x, y]
         * @param {Object} map - getCanvasToScreen 的结果
         * @returns {number[]}
         */
        toScreenPoint(p, map) {
            return canvasToScreenPoint(p, map);
        }

        /**
         * 主画布坐标 -> 角色画布坐标，toScreenPoint 的逆运算
         * @param {number[]} p - [x, y]
         * @param {Object} map - getCanvasToScreen 的结果
         * @returns {number[]}
         */
        toCanvasPoint(p, map) {
            return screenToCanvasPoint(p, map);
        }

        /**
         * 把角色画布上的点逆变换回贴图的像素坐标。
         *
         * transformRect 的正向链是：以整幅贴图中心为支点，先缩放、再旋转、
         * 最后整体平移。这里按相反顺序各做一次逆运算。
         *
         * @param {number[]} p - 角色画布坐标
         * @param {{x: number, y: number}} cap - 该图层的绘制原点
         * @param {{tw: number, th: number}} rect
         * @param {Object} t - readTransforms 的结果
         * @returns {number[]|null} 贴图局部像素坐标，缩放为 0 时无法求逆返回 null
         */
        toTexturePoint([x, y], cap, rect, t) {
            if (!t.ScaleX || !t.ScaleY) return null;

            const f = this.getTranslationFactor();
            const px = cap.x + rect.tw / 2 + t.TranslationX * f;
            const py = cap.y + rect.th / 2 + t.TranslationY * f;

            // 逆平移：转成相对支点的偏移
            const dx = x - px, dy = y - py;
            // 逆旋转
            const a = -t.Rotation * Math.PI / 180;
            const cos = Math.cos(a), sin = Math.sin(a);
            const rx = dx * cos - dy * sin;
            const ry = dx * sin + dy * cos;
            // 逆缩放，再换回以贴图左上为原点
            return [rx / t.ScaleX + rect.tw / 2, ry / t.ScaleY + rect.th / 2];
        }

        /**
         * 框太小时沿自身两轴对称撑到最小尺寸，纯显示层调整。
         *
         * 小贴花的框只有十几像素，八个句柄会重叠在一起，既看不清也点不准。
         * 沿框自身的边向量撑（而不是轴对齐），旋转后的框才不会被拉歪。
         * 中心保持不动，所以支点、旋转角度、缩放换算都不受影响。
         *
         * @param {number[][]} corners - 屏幕坐标四角，顺序 nw, ne, se, sw
         * @param {number[]} center - 屏幕坐标框心
         * @returns {number[][]} 撑大后的四角，够大时原样返回
         */
        padCorners(corners, center) {
            const [nw, ne, , sw] = corners;
            // 框自身的半轴向量：ax 沿上边，ay 沿左边
            let ax = [(ne[0] - nw[0]) / 2, (ne[1] - nw[1]) / 2];
            let ay = [(sw[0] - nw[0]) / 2, (sw[1] - nw[1]) / 2];
            const lx = Math.hypot(ax[0], ax[1]);
            const ly = Math.hypot(ay[0], ay[1]);
            const half = GIZMO_MIN_BOX / 2;

            if (lx >= half && ly >= half) return corners;

            // 长度为 0 时没有方向可依，借另一轴的垂线补一个
            const fix = (v, len, other) => {
                if (len >= half) return v;
                if (len > 1e-6) return [v[0] / len * half, v[1] / len * half];
                const ol = Math.hypot(other[0], other[1]);
                return ol > 1e-6
                    ? [-other[1] / ol * half, other[0] / ol * half]
                    : [half, 0];
            };
            const nax = fix(ax, lx, ay);
            const nay = fix(ay, ly, ax);

            // 按 nw, ne, se, sw 的顺序重建，与 GIZMO_HANDLES 的方向约定一致
            return [
                [center[0] - nax[0] - nay[0], center[1] - nax[1] - nay[1]],
                [center[0] + nax[0] - nay[0], center[1] + nax[1] - nay[1]],
                [center[0] + nax[0] + nay[0], center[1] + nax[1] + nay[1]],
                [center[0] - nax[0] + nay[0], center[1] - nax[1] + nay[1]]
            ];
        }

        /**
         * 找出主画布坐标命中的所有图层，按 BC 的层叠顺序自上而下排序。
         *
         * 上层优先与所见一致：点下去先拿到视觉上盖在最外面的那层。
         * 层叠序取自 C.AppearanceLayers（本体按 Priority 排好的绘制序列），
         * 而不是 Asset.Layer 的下标 —— 后者与层叠无关。
         *
         * @param {number} mx
         * @param {number} my
         * @returns {number[]} 命中的图层索引
         */
        pickLayersAt(mx, my) {
            const layers = ItemColorItem?.Asset?.Layer;
            const map = this.getCanvasToScreen();
            if (!Array.isArray(layers) || !map || this.captures.size === 0) return [];

            const hits = [];
            for (const [idx, cap] of this.captures) {
                const layer = layers[idx];
                const rect = this.getContentRect(cap.url);
                if (!layer || !rect) continue;

                const t = this.readTransforms(layer);
                const q = this.transformRect(cap, rect, t);
                const screen = q.corners.map(p => this.toScreenPoint(p, map));
                // 极小的图层撑一下再判定，否则贴花之类几乎点不中
                const center = this.toScreenPoint(q.center, map);
                const corners = this.padCorners(screen, center);
                if (!this.pointInQuad(mx, my, corners)) continue;

                // 撑大过的框跳过 alpha 精筛：撑出来的那一圈本来就没有像素，
                // 检查了小图层就又变回点不中，与撑大的初衷相悖
                const padded = corners !== screen;

                // 鞋带式的面积：叉积法适用于任意凸四边形
                let area = 0;
                for (let i = 0; i < 4; i++) {
                    const [x1, y1] = corners[i];
                    const [x2, y2] = corners[(i + 1) % 4];
                    area += x1 * y2 - x2 * y1;
                }
                // 二次筛选：光标处是不是真有像素。包围盒是矩形，而衣服
                // 大多是不规则形状（袖子之间、裙摆缺口都是空的），
                // 只靠矩形会把一大片空白也算成命中
                const opaque = padded || this.isLayerOpaqueAt(mx, my, cap, rect, t, map);
                const order = layerStackOrder(ItemColorCharacter, ItemColorItem?.Asset, layer.Name ?? "");
                hits.push({ idx, area: Math.abs(area) / 2, opaque, order });
            }

            // 有像素的排在前面 —— 不直接丢掉空白命中：贴图跨域读不到像素、
            // 或用户想选的正好是完全透明的遮罩层时，还得靠包围盒兜底。
            //
            // 其次按层叠顺序自上而下，与视觉一致：盖在最外面的先被选中。
            // 面积只作同层兜底（拿不到层叠序时 order 都是 -1）
            hits.sort((a, b) =>
                (b.opaque - a.opaque) || (b.order - a.order) || (a.area - b.area) || (a.idx - b.idx));
            return hits.map(h => h.idx);
        }

        /**
         * 判断光标是否落在某图层的不透明像素上。
         * 把主画布坐标逆变换回贴图坐标，再查降采样的 alpha 遮罩。
         *
         * @returns {boolean} 遮罩不可用时返回 true，退化成纯包围盒判定
         */
        isLayerOpaqueAt(mx, my, cap, rect, t, map) {
            if (!rect.alpha?.mask) return true;
            const canvasPt = this.toCanvasPoint([mx, my], map);
            const texPt = this.toTexturePoint(canvasPt, cap, rect, t);
            if (!texPt) return true;
            return isOpaqueAt(rect.alpha, texPt[0], texPt[1]);
        }

        /**
         * 高亮框在主画布上的角点。走并集包围盒，不带句柄，
         * 因为高亮只是提示范围，不参与交互。
         * @returns {{corners: number[][], center: number[]}|null}
         */
        getHighlightQuad() {
            if (!this.highlight) return null;
            const local = this.getUnionLocalQuad(this.highlight.indices);
            const map = this.getCanvasToScreen();
            if (!local || !map) return null;
            const center = this.toScreenPoint(local.center, map);
            // 小图层的框只有几像素，撑一下才看得见
            return {
                corners: this.padCorners(local.corners.map(p => this.toScreenPoint(p, map)), center),
                center
            };
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

            // 物品级的 layer 为 null，写入端据此走 Property[prop]
            const layer = this.getLayer();
            if (!layer && !this.itemLevel) return false;

            const quad = this.getScreenQuad();
            if (!quad) return false;

            this.drag = {
                mode, layer,
                startX: mx, startY: my,
                // 增量基准必须是被写入的那个槽位，否则物品级有值时会被重复叠加
                origin: this.readWriteSlot(layer),
                // 合成值代表画面当前状态，用于换算屏幕位移与框的朝向
                shown: this.readTransforms(layer),
                // 缩放换算要用包围框自身尺寸，物品级是并集外接矩形
                tex: quad.tex,
                center: quad.center,
                pivot: quad.pivot,
                edges: quad.edges,
                map: quad.map,
                // 角度基准取渲染支点，与 applyRotate 保持一致
                startAngle: Math.atan2(my - quad.pivot[1], mx - quad.pivot[0])
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

            // 位移是相加合成，增量直接加在槽位原值上即可
            this.write("TranslationX", d.origin.TranslationX + dx);
            this.write("TranslationY", d.origin.TranslationY + dy);
        }

        /** 旋转句柄：按鼠标绕框心转过的角度增量写入。按住 Shift 吸附到 15 度 */
        applyRotate(mx, my) {
            const d = this.drag;
            const now = Math.atan2(my - d.pivot[1], mx - d.pivot[0]);
            const delta = (now - d.startAngle) * 180 / Math.PI;

            // 吸附要按画面上看到的角度对齐，再换算回槽位应写的值
            let deg = d.origin.Rotation + delta;
            if (this.shiftKey) {
                const snapped = Math.round((d.shown.Rotation + delta) / 15) * 15;
                deg = d.origin.Rotation + (snapped - d.shown.Rotation);
            }
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
            // 尺寸取拖拽开始时框在画面上的实际大小（已含当前缩放），
            // 这样拖动距离与框的尺寸变化是 1:1，不受已有缩放影响
            const tex = d.tex;
            if (!handle || !tex?.width || !tex?.height) return;

            // 把屏幕位移转到贴图空间，再按框的旋转角反投影到局部轴。
            // 反投影用画面上的角度（合成值），物品级的并集框不倾斜故为 0
            const dx = (mx - d.startX) / d.map.sx;
            const dy = (my - d.startY) / d.map.sy;
            const a = this.itemLevel ? 0 : -d.shown.Rotation * Math.PI / 180;
            const lx = dx * Math.cos(a) - dy * Math.sin(a);
            const ly = dx * Math.sin(a) + dy * Math.cos(a);

            // 缩放比例的分母是被拖那条边到渲染支点的距离，不是框的半宽。
            // 支点固定在整幅贴图中心，剔除透明边后它与框心不重合，
            // 用半宽会让边跑得比鼠标快（偏离越远越明显）。
            // 没有 edges 时（物品级并集框）退回半宽，此时支点就是框心。
            const uniform = this.shiftKey;
            // 取被拖那条边的带符号臂长，缩放后该边位移恰好等于鼠标位移。
            //
            // 臂长要按屏幕上撑大后的框取下限：小图案的真实臂长只有几像素，
            // 直接除会让比例暴涨（拖 25px 就放大四倍，一下撞上 3.0 上限）。
            // 框已被 padCorners 撑到 GIZMO_MIN_BOX，换算也跟着用那个尺度，
            // 手感才和框的视觉大小一致
            // 只放大绝对值、保留原符号：符号编码了这条边在支点的哪一侧，
            // 支点可能落在内容矩形之外，不能用句柄方向反推
            const minArm = (axisScale) => GIZMO_MIN_BOX / 2 / (axisScale || 1);
            const growArm = (v, min) => {
                if (Math.abs(v) >= min) return v;
                if (Math.abs(v) > 1e-6) return Math.sign(v) * min;
                return 0;  // 边压在支点上，交给下面的零臂长分支跳过该轴
            };
            const armX = growArm(
                d.edges ? d.edges.x[handle.x > 0 ? 1 : 0] : handle.x * tex.width / 2,
                minArm(d.map.sx));
            const armY = growArm(
                d.edges ? d.edges.y[handle.y > 0 ? 1 : 0] : handle.y * tex.height / 2,
                minArm(d.map.sy));

            let rx = 1, ry = 1;
            // 边正好压在支点上时臂长为 0，比例无从换算，跳过该轴
            if (handle.x !== 0 && Math.abs(armX) > 1e-6) rx = 1 + lx / armX;
            if (handle.y !== 0 && Math.abs(armY) > 1e-6) ry = 1 + ly / armY;

            if (uniform && handle.x !== 0 && handle.y !== 0) {
                // 角句柄配合 Shift 等比缩放，取变化幅度较大的轴
                const r = Math.abs(rx - 1) > Math.abs(ry - 1) ? rx : ry;
                rx = r; ry = r;
            }

            // 缩放是相乘合成，增量必须按比例作用在槽位值上，
            // 不能像位移那样直接加，否则另一侧有值时步长会失真
            if (handle.x !== 0 || uniform) this.write("ScaleX", d.origin.ScaleX * rx);
            if (handle.y !== 0 || uniform) this.write("ScaleY", d.origin.ScaleY * ry);
        }
        /**
         * 写入单个变换属性。复用窗口的写入逻辑，保证约束、取整、
         * 默认值清理与输入框那条路径完全一致。
         * 拖拽时一帧可能写两个轴，这里先压住刷新，由 moveDrag 统一触发一次。
         * @param {string} prop - 属性名，如 TranslationX
         * @param {number} value - 目标值
         */
        write(prop, value) {
            // null 是物品级的合法取值（写 Property[prop]），不能当成失败
            const layer = this.drag ? this.drag.layer : this.getLayer();
            if (!layer && !this.itemLevel) return;

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

            // 先沿图案轮廓描边，标出选中的到底是哪一块。
            // 句柄仍挂在包围盒上，因为缩放旋转本来就是按矩形定义的
            const targets = this.itemLevel
                ? [...this.captures.keys()]
                : (this.layerIndex !== null ? [this.layerIndex] : []);
            this.drawOutline(ctx, targets, this.getAccent());

            const hover = this.drag ? this.drag.mode : this.hoverHandle;
            ctx.save();
            this.drawFrame(ctx, quad);
            this.drawPivot(ctx, quad);
            this.drawRotateHandle(ctx, quad, hover === "rotate");
            for (const h of this.getHandlePoints(quad)) {
                this.drawHandle(ctx, h.x, h.y, hover === h.id);
            }
            ctx.restore();
        }
        /**
         * 当前模式的主色。物品级是各图层的并集外框，用另一种颜色区别于
         * 单图层；都不用 active 色，那是句柄的悬浮/拖拽色。
         */
        getAccent() {
            return this.itemLevel ? GIZMO_STYLE.item : GIZMO_STYLE.layer;
        }

        /**
         * 描两遍：先粗黑再细彩，保证在浅色和深色贴图上都看得清。
         * @param {() => void} path - 构建路径的回调，会被调用两次
         * @param {number[]} [dash]
         */
        strokeTwice(ctx, path, dash) {
            path();
            ctx.setLineDash([]);
            ctx.strokeStyle = GIZMO_STYLE.outline;
            ctx.lineWidth = GIZMO_STYLE.outlineW;
            ctx.stroke();

            path();
            if (dash) ctx.setLineDash(dash);
            ctx.strokeStyle = this.getAccent();
            ctx.lineWidth = GIZMO_STYLE.strokeW;
            ctx.stroke();
            ctx.setLineDash([]);
        }

        /**
         * 句柄所在的矩形参照线。轮廓描边已经标明了图案范围，
         * 这条线只是交代句柄挂在哪儿，所以画成淡虚线不抢视觉。
         */
        drawFrame(ctx, quad) {
            const path = () => {
                ctx.beginPath();
                quad.corners.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
                ctx.closePath();
            };
            path();
            ctx.setLineDash(GIZMO_STYLE.itemDash);
            ctx.strokeStyle = GIZMO_STYLE.outline;
            ctx.lineWidth = GIZMO_STYLE.strokeW + 1;
            ctx.stroke();
            path();
            ctx.strokeStyle = this.getAccent();
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);
        }

        /** 旋转句柄，含一条连到框上边的引线 */
        drawRotateHandle(ctx, quad, active) {
            this.strokeTwice(ctx, () => {
                ctx.beginPath();
                ctx.moveTo(quad.topMid[0], quad.topMid[1]);
                ctx.lineTo(quad.rotateAt[0], quad.rotateAt[1]);
            });
            this.fillShape(ctx, () => {
                ctx.beginPath();
                ctx.arc(quad.rotateAt[0], quad.rotateAt[1], GIZMO_HANDLE_R, 0, Math.PI * 2);
            }, active ? GIZMO_STYLE.active : this.getAccent());
        }

        /** 单个方形缩放句柄 */
        drawHandle(ctx, x, y, active) {
            const r = GIZMO_HANDLE_R;
            this.fillShape(ctx, () => {
                ctx.beginPath();
                ctx.rect(x - r, y - r, r * 2, r * 2);
            }, active ? GIZMO_STYLE.active : GIZMO_STYLE.handleFill);
        }

        /** 实心填充加黑描边，句柄共用 */
        fillShape(ctx, path, fill) {
            path();
            ctx.fillStyle = fill;
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = GIZMO_STYLE.strokeW;
            ctx.stroke();
        }

        /**
         * 画悬浮高亮框。闪烁期间在角色上标出目标范围，
         * 比只靠透明度变化更容易定位小图层。
         * 与选中框独立，两者可以同时显示。
         */
        drawHighlight() {
            const ctx = bcGlobal("MainCanvas");
            if (!ctx || typeof ctx.save !== "function" || !this.highlight) return;

            const drawn = this.drawOutline(ctx, this.highlight.indices,
                this.highlight.hover ? GIZMO_STYLE.hoverStroke : GIZMO_STYLE.hlStroke);
            // 轮廓画不出来（贴图跨域、还没加载完）时不退回矩形框：
            // 那个框大得没有参考意义，不如只留文字标注
            if (!drawn) return;

            if (this.highlight.label) {
                const quad = this.getHighlightQuad();
                if (quad) {
                    ctx.save();
                    this.drawHighlightLabel(ctx, quad);
                    ctx.restore();
                }
            }
        }

        /**
         * 沿图案自身的 alpha 边缘画一圈外扩描边，替代矩形包围框。
         *
         * 做法全部落在 Canvas2D 的合成操作上，由 GPU 执行，不读像素：
         *   1. 把图层贴图按它当前的变换，向 samples 个环向方向各偏移
         *      OUTLINE.width 画一次，用 lighter 叠加 —— 并集就是图案
         *      向外膨胀一圈后的形状
         *   2. destination-out 扣掉未偏移的原图，只剩外面那一圈
         *   3. source-in 整体染色
         *
         * @param {CanvasRenderingContext2D} ctx - 主画布
         * @param {number[]} indices - 要描边的图层
         * @param {string} color
         * @returns {boolean} 是否成功画出
         */
        drawOutline(ctx, indices, color) {
            const layers = ItemColorItem?.Asset?.Layer;
            const map = this.getCanvasToScreen();
            if (!Array.isArray(layers) || !map || this.captures.size === 0) return false;

            // 只处理有贴图可用的图层，顺带算出需要多大的离屏区域
            const items = [];
            for (const idx of indices) {
                const cap = this.captures.get(idx);
                const layer = layers[idx];
                const rect = cap && this.getContentRect(cap.url);
                const img = cap && this.getImage(cap.url);
                if (!layer || !rect || !img) continue;
                items.push({ cap, rect, img, t: this.readTransforms(layer) });
            }
            if (items.length === 0) return false;

            const pad = OUTLINE.width + 2;
            const bbox = this.outlineBBox(items, map, pad);
            if (!bbox) return false;

            const off = getOutlineCanvas(bbox.w, bbox.h);
            if (!off) return false;
            const octx = off.ctx;

            // 第一步：环向偏移叠加，得到膨胀形状。
            // lighter 让 alpha 累加，重叠处不会因为半透明相乘而变淡
            octx.globalCompositeOperation = "lighter";
            for (let i = 0; i < OUTLINE.samples; i++) {
                const a = i / OUTLINE.samples * Math.PI * 2;
                const dx = Math.cos(a) * OUTLINE.width;
                const dy = Math.sin(a) * OUTLINE.width;
                for (const it of items) {
                    this.blitLayer(octx, it, map, bbox, dx, dy);
                }
            }

            // 第二步：扣掉原图，留下外面那一圈
            octx.globalCompositeOperation = "destination-out";
            for (const it of items) {
                this.blitLayer(octx, it, map, bbox, 0, 0);
            }

            // 第三步：染色。用 source-in 保留刚才的形状、替换颜色
            octx.globalCompositeOperation = "source-in";
            octx.fillStyle = color;
            octx.fillRect(0, 0, bbox.w, bbox.h);
            octx.globalCompositeOperation = "source-over";

            ctx.save();
            // 贴图边缘的抗锯齿会让描边外沿拖出一层很淡的雾，
            // 压一下整体不透明度反而更干脆
            ctx.globalAlpha = 1;
            ctx.drawImage(off.cv, 0, 0, bbox.w, bbox.h, bbox.x, bbox.y, bbox.w, bbox.h);
            ctx.restore();
            return true;
        }

        /** 取贴图 Image 对象，两条渲染路径的缓存都查 */
        getImage(url) {
            const img = bcGlobal("GLDrawImageCache")?.get(url)
                ?? bcGlobal("DrawCacheImage")?.get(url);
            // 宽高为 1 是还没加载完的占位纹理
            return (img && (img.naturalWidth || img.width) > 1) ? img : null;
        }

        /**
         * 求这批图层描边所需的主画布区域，已含外扩留白并夹进画布内
         * @returns {{x: number, y: number, w: number, h: number}|null}
         */
        outlineBBox(items, map, pad) {
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            for (const it of items) {
                const q = this.transformRect(it.cap, it.rect, it.t);
                for (const p of q.corners) {
                    const [sx, sy] = this.toScreenPoint(p, map);
                    if (sx < minX) minX = sx;
                    if (sx > maxX) maxX = sx;
                    if (sy < minY) minY = sy;
                    if (sy > maxY) maxY = sy;
                }
            }
            if (!Number.isFinite(minX)) return null;

            const x = Math.max(0, Math.floor(minX - pad));
            const y = Math.max(0, Math.floor(minY - pad));
            const w = Math.min(2000, Math.ceil(maxX + pad)) - x;
            const h = Math.min(1000, Math.ceil(maxY + pad)) - y;
            return (w > 0 && h > 0) ? { x, y, w, h } : null;
        }

        /**
         * 把一个图层按它的变换画到离屏画布上，可附加一个屏幕空间的偏移。
         *
         * 变换链与 transformRect 一致：支点是整幅贴图中心，先缩放再旋转，
         * 最后平移。这里用 ctx 的矩阵表达，省去逐点换算。
         *
         * @param {number} dx - 屏幕空间的额外偏移，用于生成膨胀轮廓
         * @param {number} dy
         */
        blitLayer(octx, it, map, bbox, dx, dy) {
            const { cap, rect, img, t } = it;
            const f = this.getTranslationFactor();
            // 支点在角色画布坐标下的位置
            const px = cap.x + rect.tw / 2 + t.TranslationX * f;
            const py = cap.y + rect.th / 2 + t.TranslationY * f;
            const [sx, sy] = this.toScreenPoint([px, py], map);

            octx.save();
            // 平移到支点（减去 bbox 原点转成离屏坐标），再加膨胀偏移
            octx.translate(sx - bbox.x + dx, sy - bbox.y + dy);
            // 顺序必须是 预览缩放 -> 旋转 -> 图层缩放，与正向链一致：
            // 图层的缩放旋转发生在贴图空间，预览缩放作用在其结果之上。
            // 把 map.sx/sy 并进旋转内侧的话，非等比预览下会整体错位
            octx.scale(map.sx, map.sy);
            octx.rotate(t.Rotation * Math.PI / 180);
            octx.scale(t.ScaleX, t.ScaleY);
            // 以支点为原点绘制，所以左上角在 -tw/2, -th/2
            octx.drawImage(img, -rect.tw / 2, -rect.th / 2);
            octx.restore();
        }

        /** 高亮框上方的文字标注，贴着框顶外侧，超出上边界时改画在框内 */
        drawHighlightLabel(ctx, quad) {
            const text = this.highlight.label;
            ctx.font = `${GIZMO_STYLE.hlFont}px Arial`;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";

            const padX = 8, h = GIZMO_STYLE.hlFont + 8;
            const w = ctx.measureText(text).width + padX * 2;
            const top = Math.min(...quad.corners.map(c => c[1]));
            const cx = quad.center[0];
            // 框顶太靠上时标签会跑出画布，改放到框内侧
            const cy = top - h / 2 - 4 < h ? top + h / 2 + 4 : top - h / 2 - 4;

            const hover = this.highlight.hover;
            ctx.fillStyle = hover ? GIZMO_STYLE.hoverLabelBg : GIZMO_STYLE.hlLabelBg;
            ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
            ctx.fillStyle = hover ? GIZMO_STYLE.hoverStroke : GIZMO_STYLE.hlStroke;
            ctx.fillText(text, cx, cy);
        }

        /**
         * 渲染支点标记。剔除透明边后支点与框心不重合，画个十字提示
         * 旋转和缩放实际绕哪里发生，否则拖动结果看起来像是错的。
         */
        drawPivot(ctx, quad) {
            const [px, py] = quad.pivot;
            // 与框心几乎重合时不画，避免和中心区域的视觉噪音叠在一起
            if (Math.hypot(px - quad.center[0], py - quad.center[1]) < GIZMO_HANDLE_R) return;
            const r = GIZMO_HANDLE_R;
            this.strokeTwice(ctx, () => {
                ctx.beginPath();
                ctx.moveTo(px - r, py);
                ctx.lineTo(px + r, py);
                ctx.moveTo(px, py - r);
                ctx.lineTo(px, py + r);
            });
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
     * 找出这次绘制对应当前物品的哪个图层，返回图层索引，不匹配则 -1。
     * 用图层名做后缀匹配：CommonDraw 的 URL 末段固定是 layer.Name。
     * 物品级需要全部图层来求并集，所以不能只认选中的那一个。
     * @param {string} url
     * @returns {number}
     */
    function matchDrawLayerIndex(url) {
        if (!gizmo.isCapturing() || typeof url !== "string") return -1;
        const asset = ItemColorItem?.Asset;
        const layers = asset?.Layer;
        if (!Array.isArray(layers)) return -1;

        // 只认当前物品的贴图。判据放在文件名上而不是目录上：
        // CommonDraw 拼 URL 用的目录是 asset.DynamicGroupName，很多衣服资产
        // 会把它指到别的组（如 ClothOuter 的资产贴图放在 Cloth/），
        // 再加上 BodyStyle 换肤时会插入 Override/<style>/ 一段，
        // 按 Group.Name 匹配目录会整个落空 —— 道具因两者多数相同才没暴露。
        // 文件名首段固定是 asset.Name（见 CommonDraw 的 urlParts），足够唯一。
        const file = url.slice(url.lastIndexOf("/") + 1).replace(/\.png$/i, "");
        if (!file.startsWith(asset.Name)) return -1;

        // 选中单个图层时只需比对那一个，省掉整轮遍历。
        // 高亮框要框住任意节点（可能是多个图层），此时必须全量收集
        const only = (gizmo.itemLevel || gizmo.needsAllCaptures()) ? null : gizmo.layerIndex;

        // 末段由 [asset.Name, parentAssetName, layerType, colorSegment, layerSegment]
        // 用下划线拼成，layerSegment 即 layer.Name；无名图层没有这一段。
        // 有名图层按后缀认；无名图层排除掉所有属于有名图层的文件即可
        const named = layers.filter(l => l.Name).map(l => l.Name);
        const hit = (layer) => {
            if (!layer) return false;
            if (layer.Name) return file.endsWith(`_${layer.Name}`) || file === layer.Name;
            return !named.some(n => file.endsWith(`_${n}`) || file === n);
        };

        if (only !== null) return hit(layers[only]) ? only : -1;
        return layers.findIndex(hit);
    }

    for (const fn of ["GLDrawImage", "DrawImageCanvas"]) {
        if (typeof w[fn] !== "function") continue;
        mod.hookFunction(fn, 1, (args, next) => {
            // GLDrawImage(url, gl, x, y, opts) / DrawImageCanvas(src, canvas, x, y, opts)
            const [src, , x, y, opts] = args;
            if (opts) {
                const idx = matchDrawLayerIndex(src);
                if (idx >= 0) gizmo.capture(idx, src, x, y, opts);
            }
            return next(args);
        });
    }

    // Hook ItemColorLoad 函数，在进入Color模式时显示窗口
    // ItemColorLoad 是 async 且内部 await 了多个 TextCache，必须等 Promise 落地
    // 才能保证 ItemColorState / ItemColorLayerNames 已就绪
    mod.hookFunction("ItemColorLoad", 1, (args, next) => {
        // 必须在 next 之前放开：ItemColorSanitizeProperty 会按
        // MinOpacity/MaxOpacity 夹取已存的值，晚了就被夹回 1
        if (screen.settings.UseAdjustmentWindow) unlockAssetOpacity(args[1]?.Asset);

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
        if (gizmo.isCapturing() && C && C === ItemColorCharacter) {
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
        return gizmo.isActive() && inColorScreen();
    }

    /** 调色界面是否处于活动状态。ItemColorState 存在即可判定 */
    function inColorScreen() {
        if (!itemColorAdjustmentWindow.isVisible) return false;
        return !!(typeof ItemColorState !== 'undefined' && ItemColorState && ItemColorItem);
    }

    // 在角色绘制完成后叠画包围框，盖在角色上方且不写进角色的离屏 canvas。
    // 挂在各调色界面的 Run 上，覆盖换装 / 聊天室道具 / 制作 / 商店
    for (const runFn of ["AppearanceRun", "ChatRoomRun", "DialogDraw", "CraftingRun", "Shop2Run"]) {
        if (typeof w[runFn] !== "function") continue;
        mod.hookFunction(runFn, 0, (args, next) => {
            const result = next(args);
            if (inColorScreen()) {
                gizmo.commitDraw();
                // 高亮先画，选中框盖在上面，避免半透明填充糊住句柄
                gizmo.drawHighlight();
                if (gizmo.isActive()) gizmo.draw();
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
            // 真正产生了拖动，松手后那次 click 要吞掉
            gizmoSuppressClick = true;
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

    // 拖拽起点分两条路，都尽量少干扰其他元素。
    //
    // 早先只有一条：document 捕获阶段 + stopPropagation。那样任何一次命中
    // 都会吞掉事件，原生按钮跟着受影响。现在主路径挂在 canvas 的冒泡阶段，
    // 不 stopPropagation，让 BC 自己的 pointerdown 照常收到事件；
    // 误触改由 CommonClick 钩子按命中判定精确拦截。
    function onCanvasPointerDown(e) {
        if (gizmo.isDragging() || !inColorScreen()) return;

        const p = toGameCoords(e);
        if (!p) return;

        // 已有选中框时，句柄与平移区优先，拖拽不能被拾取抢走
        if (gizmo.isActive() && gizmo.hitTest(p.x, p.y)) {
            gizmo.shiftKey = !!e.shiftKey;
            if (gizmo.startDrag(p.x, p.y)) {
                itemColorAdjustmentWindow.stopAllHighlight();
                beginDocDrag();
                // 只阻默认行为（文字选中、触屏滚动），不阻断传播
                e.preventDefault();
            }
            return;
        }

        // 没落在当前包围框上：按点击位置拾取图层。
        // 命中即接管这次点击，否则会同时触发本体的换装按钮
        if (itemColorAdjustmentWindow.pickLayerAt(p.x, p.y)) {
            gizmoSuppressClick = true;
            e.preventDefault();
        }
    }

    // canvas 可能还没插进 DOM，重试到拿到为止
    (function bindCanvas(retry = 0) {
        const canvas = document.getElementById("MainCanvas");
        if (canvas) {
            canvas.addEventListener('pointerdown', onCanvasPointerDown);
        } else if (retry < 40) {
            setTimeout(() => bindCanvas(retry + 1), 250);
        }
    })();

    // 兜底路径：面板浮在 canvas 上方，图层放大后句柄可能正好落在它下面，
    // 那时 canvas 收不到 pointerdown。这里从 document 捕获阶段补上，
    // 但范围收得很紧，只认落在小句柄上、且不在面板可交互控件上的按下：
    //   - 平移区不走这条路（面积大，会挡住面板空白处的点击）
    //   - 命中后才 stopPropagation，避免面板误响应这次按下
    document.addEventListener('pointerdown', (e) => {
        if (gizmo.isDragging() || !gizmoInteractive()) return;
        if (!(e.target instanceof Element)) return;
        // 事件已经落在 canvas 上时交给上面那条路径，别重复处理
        if (e.target.id === "MainCanvas") return;
        // 只处理被模组面板遮挡的情况
        if (!e.target.closest('#lian-item-color-adjustment-window, .lian-color-picker-panel')) return;
        // 面板自己的控件优先
        if (e.target.closest('input, button, select, textarea, label')) return;

        const p = toGameCoords(e);
        if (!p) return;
        const hit = gizmo.hitTest(p.x, p.y);
        if (!hit || hit === "move") return;

        gizmo.shiftKey = !!e.shiftKey;
        if (gizmo.startDrag(p.x, p.y)) {
            itemColorAdjustmentWindow.stopAllHighlight();
            beginDocDrag();
            e.preventDefault();
            // 这次按下确实是给句柄的，不该再传给面板
            e.stopPropagation();
        }
    }, true);

    mod.hookFunction("CommonMouseMove", 0, (args, next) => {
        if (inColorScreen() && !gizmo.isDragging()) {
            const p = toGameCoords(args[0]);
            if (p) {
                gizmo.shiftKey = !!args[0].shiftKey;
                // 拖拽中的移动由 document 监听接管，这里只负责句柄悬浮态
                gizmo.hoverHandle = gizmo.isActive() ? gizmo.hitTest(p.x, p.y) : null;
                // 未进入句柄状态时预览光标下的图层，让点击前就能看清目标
                itemColorAdjustmentWindow.previewPickAt(p.x, p.y);
            }
        }
        return next(args);
    });

    // 鼠标移出画布后重新点击应当从最上层开始，而不是接着上次的轮换
    document.addEventListener('pointerdown', (e) => {
        if (e.target instanceof Element && e.target.id !== "MainCanvas") {
            itemColorAdjustmentWindow.resetPickCycle();
        }
    }, true);

    // CommonMouseMove 只在指针位于画布上时触发，移出后要主动收掉预览框，
    // 否则它会停在最后一次的位置上不消失
    document.addEventListener('pointermove', (e) => {
        if (!(e.target instanceof Element) || e.target.id === "MainCanvas") return;
        itemColorAdjustmentWindow.clearHoverPreview();
    }, true);

    // 拦掉因拖拽产生的那次 click，避免松手位置正好落在底层按钮上时误触。
    //
    // 只拦两种情况，其余一律放行给本体：
    //   1. 本次按下确实拖动过（gizmoSuppressClick）
    //   2. 点在句柄或旋转柄上——这些是模组自己的控件
    // 框内平移区面积很大，常常整片盖住本体按钮，所以单纯点一下不拦，
    // 否则包围框会把下面的原生按钮全挡死。
    mod.hookFunction("CommonClick", 0, (args, next) => {
        if (gizmoSuppressClick) {
            gizmoSuppressClick = false;
            return;
        }
        if (gizmoInteractive()) {
            const p = toGameCoords(args[0]);
            const hit = p && gizmo.hitTest(p.x, p.y);
            if (hit && hit !== "move") return;
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

    // ===================================================================================
    // 换装界面的整件拾取
    //
    // 与调色界面的 LayerTransformGizmo 是两套：那边的目标是单个物品内部的图层，
    // 这边的目标是身上穿的整件装备。共用的是 alpha 遮罩、轮廓描边和坐标换算，
    // 差别在于捕获按 Asset 归组、拾取结果是 AssetGroup 而不是图层索引。
    // ===================================================================================

    /**
     * 换装界面里在角色身上悬浮/点击拾取整件装备。
     *
     * 渲染管线的末端（GLDrawImage / DrawImageCanvas）拿不到 Item 上下文，
     * 只有 URL。所以先从 C.AppearanceLayers 建一张 URL 前缀到 Asset 的索引，
     * 再按文件名反查 —— 与调色界面里 matchDrawLayerIndex 同一思路。
     */
    class AppearancePicker {
        constructor() {
            // 本帧捕获的绘制信息，键为 Asset，值为该资产各图层的 {url, x, y}
            this.captures = new Map();
            this.frame = new Map();   // 收集中的本帧数据，帧末提交
            this.archive = new Map(); // groupName -> { asset, list }，跨帧留存

            this.drawAt = null;       // 全身图的绘制参数
            this.frameDrawAt = null;
            this.hover = null;        // 画布悬浮 { asset, group, label } 或 null
            this.listHover = null;    // 右侧列表悬浮，另带 snapshot
            this.lastPick = null;     // 轮换状态 { x, y, key, groupName }
            this.suppressClick = false;
        }

        /**
         * 拾取在默认模式与物品选择模式（Cloth）下都可用。
         *
         * Cloth 模式里左侧角色仍然完整显示，允许直接点身上别的部位跳过去，
         * 省掉先退回列表再找的来回。Color / Wardrobe 有自己的交互，不介入。
         */
        isEnabled() {
            if (typeof CurrentScreen === 'undefined' || CurrentScreen !== 'Appearance') return false;
            const mode = typeof CharacterAppearanceMode !== 'undefined' ? CharacterAppearanceMode : "";
            if (mode !== "" && mode !== "Cloth") return false;
            // 扩展物品与层级编辑界面覆盖在上面，别抢它们的点击
            if (typeof DialogFocusItem !== 'undefined' && DialogFocusItem != null) return false;
            if (w.Layering?.IsActive?.()) return false;
            return !!(typeof CharacterAppearanceSelection !== 'undefined' && CharacterAppearanceSelection);
        }

        /** 当前是否处于物品选择模式 */
        inClothMode() {
            return typeof CharacterAppearanceMode !== 'undefined' && CharacterAppearanceMode === "Cloth";
        }

        /**
         * 记录全身图的绘制参数。AppearanceRun 同一帧画两次角色：
         * 先是 zoom=4 的上半身大图，再是全身图。取 zoom 较小的那次。
         */
        captureDraw(x, y, zoom, heightResize) {
            const z = typeof zoom === "number" ? zoom : 1;
            // 放大预览的 zoom 是 4，全身图是 0.95 或 1
            if (z > 2) return;
            this.frameDrawAt = { x, y, zoom: z, heightResize };
        }

        /** 帧末提交本帧收集到的数据 */
        commit() {
            if (this.frameDrawAt) {
                this.drawAt = this.frameDrawAt;
                this.frameDrawAt = null;
            }
            if (this.frame.size > 0) {
                this.captures = this.frame;
                this.frame = new Map();
                // 按组名存档一份。右侧列表悬浮时该部件正在闪烁，
                // 隐藏帧的捕获里没有它，靠存档继续描边
                for (const [asset, list] of this.captures) {
                    const name = asset?.Group?.Name;
                    if (name) this.archive.set(name, { asset, list });
                }
            }
        }

        /** 丢弃捕获，角色重建前调用 */
        invalidate() {
            this.captures.clear();
            this.frame.clear();

            // 存档本该一起清（换衣服后旧记录对不上贴图），但闪烁提示自己
            // 每 0.2s 就重建一次角色，那只是切显隐、贴图没变。若跟着清掉，
            // 隐藏帧重建的存档里缺这件装备，描边会跟着闪。
            if (dressOptimizationManager.highlightTimer !== null) return;
            this.archive.clear();
            this.listHover = null;
        }

        /**
         * 由绘制钩子调用，记录某次图层绘制归属哪个 Asset
         * @param {Object} asset
         * @param {string} url
         * @param {number} x - drawX，已含 TranslationX
         * @param {number} y
         * @param {Object} opts
         */
        capture(asset, url, x, y, opts) {
            // 透明度为 0 的层级看不见，不该参与拾取，也不该被描边圈进去。
            // 用户把某层调成全透明就是想让它消失，拾取还认它会很意外。
            // 两条渲染路径的字段名都是 Alpha（GLDrawImage 与 DrawImageEx）
            if (opts?.Alpha === 0) return;

            let list = this.frame.get(asset);
            if (!list) {
                list = [];
                this.frame.set(asset, list);
            }
            // 反推未位移时的原点，与 LayerTransformGizmo.capture 一致
            list.push({
                url,
                x: x - (opts?.TranslationX || 0),
                y: y - (opts?.TranslationY || 0),
                opts
            });
        }

        /** 清除画布悬浮态。列表悬浮独立存放，不受影响 */
        clearHover() {
            this.hover = null;
        }

        /** 当前该画哪个轮廓：画布悬浮优先于右侧列表悬浮 */
        activeHover() {
            return this.hover ?? this.listHover;
        }

        /** 重置轮换，下次点击从最上层开始 */
        resetCycle() {
            this.lastPick = null;
        }

        /** 全身图的坐标映射 */
        getMap() {
            return computeCanvasToScreen(CharacterAppearanceSelection, this.drawAt);
        }

        /**
         * 这个资产是否属于可拾取范围。
         * 取换装界面自己筛出来的那份可编辑列表，保证与右侧列表一致。
         * @param {Object} asset
         * @returns {Object|null} 对应的 AssetGroup，不可拾取则 null
         */
        pickableGroup(asset) {
            const group = asset?.Group;
            if (!group) return null;
            const groups = w.CharacterAppearanceGroups;
            if (Array.isArray(groups)) {
                if (!groups.some(g => g.Name === group.Name)) return null;
            } else if (group.Category !== "Appearance" || group.AllowCustomize === false) {
                // 列表还没建好时按同样的条件自行判断
                return null;
            }
            // 主人规则可能禁掉某些部位，那些点了也进不去
            if (w.AppearanceGroupAllowed?.(CharacterAppearanceSelection, group.Name) === false) return null;
            return group;
        }

        /**
         * 找出光标下的所有装备，按 BC 的层叠顺序自上而下排序。
         * 上层优先与所见一致：点外衣覆盖的位置先拿到外衣，再点才轮换到里层。
         * @returns {{asset: Object, group: Object}[]}
         */
        pickAt(mx, my) {
            if (!this.isEnabled()) return [];
            const map = this.getMap();
            if (!map || this.captures.size === 0) return [];

            // 只认全身图所在的横向范围。左边还有一张 zoom=4 的放大预览，
            // 右边是列表或预览网格，都不该被这套拾取接管。
            //
            // 默认模式下本体的 Use / Strip 按钮从 1030 起，与全身图右缘有
            // 十几像素重叠，让按钮优先；Cloth 模式的预览网格从 1250 起，
            // 全身图完全在它左边，不必收窄
            const bodyW = 500 * map.sx;
            const limit = this.inClothMode() ? APPEARANCE_CLOTH_GRID_X : APPEARANCE_MENU_X;
            const right = Math.min(map.ox + bodyW, limit - 4);
            if (mx < map.ox || mx > right) return [];
            // 顶部是本体的菜单按钮行（AppearanceClick 的 MouseYIn(25, 90)），
            // 全身图上缘会伸进去，让按钮优先
            if (my < APPEARANCE_MENU_BOTTOM) return [];

            const canvasPt = screenToCanvasPoint([mx, my], map);
            const hits = [];

            for (const [asset, list] of this.captures) {
                const group = this.pickableGroup(asset);
                if (!group) continue;

                let area = 0;
                let opaque = false;
                for (const cap of list) {
                    const alpha = getAlphaData(cap.url, pickImage(cap.url));
                    const b = alpha?.bounds;
                    // 拿不到 alpha 就用整幅贴图的范围兜底
                    const size = alpha ? null : textureSize(cap.url);
                    const rect = b
                        ? { x: cap.x + b.x, y: cap.y + b.y, w: b.w, h: b.h }
                        : (size ? { x: cap.x, y: cap.y, w: size.width, h: size.height } : null);
                    if (!rect) continue;

                    area += rect.w * rect.h;
                    if (canvasPt[0] < rect.x || canvasPt[0] >= rect.x + rect.w) continue;
                    if (canvasPt[1] < rect.y || canvasPt[1] >= rect.y + rect.h) continue;
                    // 包围盒之内再查像素，衣服大多不规则，矩形会把空隙也算进去
                    if (isOpaqueAt(alpha, canvasPt[0] - cap.x, canvasPt[1] - cap.y)) {
                        opaque = true;
                    }
                }
                if (opaque) {
                    hits.push({
                        asset, group, area,
                        // 该资产最靠上的那层的层叠序，代表整件的可见高度
                        order: layerStackOrder(CharacterAppearanceSelection, asset)
                    });
                }
            }

            // 按层叠顺序自上而下：视觉上盖在最外面的先被选中，与所见一致。
            // 面积只作同层时的兜底，此时两件的前后本来就没有客观答案
            hits.sort((a, b) => (b.order - a.order) || (a.area - b.area));
            return hits;
        }

        /**
         * 算出此刻点击会选中哪一件，不改变轮换状态。供悬浮预览使用
         * @returns {{asset: Object, group: Object}|null}
         */
        peek(mx, my) {
            const hits = this.pickAt(mx, my);
            if (hits.length === 0) return null;
            return hits[this.cycleIndex(hits, mx, my)];
        }

        /** 轮换下标，规则与调色界面一致：同一位置连点依次后移 */
        cycleIndex(hits, mx, my) {
            const SAME_SPOT = GIZMO_HANDLE_R * 2;
            const key = hits.map(h => h.group.Name).join(",");
            const last = this.lastPick;
            const sameSpot = last
                && Math.hypot(mx - last.x, my - last.y) <= SAME_SPOT
                && last.key === key;
            if (!sameSpot) return 0;
            const at = hits.findIndex(h => h.group.Name === last.groupName);
            return (at + 1) % hits.length;
        }

        /**
         * 按部件组名设置悬浮态，供右侧列表的悬浮提示复用。
         * 从本帧捕获里找出属于该组的资产。
         * @param {string} groupName
         * @returns {boolean} 是否找到了对应装备
         */
        hoverByGroup(groupName) {
            if (!groupName) {
                this.listHover = null;
                return false;
            }
            if (this.listHover?.group?.Name === groupName) return true;

            // 查存档而非当前帧：悬浮期间该部件正在闪烁，隐藏帧里查不到
            const rec = this.archive.get(groupName);
            if (!rec) {
                this.listHover = null;
                return false;
            }
            this.listHover = {
                asset: rec.asset,
                group: rec.asset.Group,
                label: pickLabel({ asset: rec.asset, group: rec.asset.Group }),
                snapshot: rec.list
            };
            return true;
        }

        /** 悬浮时记下目标，供绘制使用 */
        updateHover(mx, my) {
            if (!this.isEnabled()) {
                this.clearHover();
                return;
            }
            const hit = this.peek(mx, my);
            if (!hit) {
                this.clearHover();
                return;
            }
            // 同一件重复设置时保留原对象，避免每帧产生垃圾
            if (this.hover?.group === hit.group) return;
            this.hover = { asset: hit.asset, group: hit.group, label: pickLabel(hit) };
        }

        /**
         * 点击拾取：跳转到该部位的服装编辑界面
         * @returns {boolean} 是否接管了这次点击
         */
        click(mx, my) {
            const hits = this.pickAt(mx, my);
            if (hits.length === 0) return false;

            const hit = hits[this.cycleIndex(hits, mx, my)];
            this.lastPick = {
                x: mx, y: my,
                key: hits.map(h => h.group.Name).join(","),
                groupName: hit.group.Name
            };
            this.clearHover();

            // 已经在编辑这个部位了，重建一遍会把翻页位置也重置掉，
            // 但仍要算作接管，否则这次点击会漏给本体
            const C = CharacterAppearanceSelection;
            if (this.inClothMode() && C?.FocusGroup === hit.group) return true;

            return openClothScreen(hit.group);
        }
    }

    /** 取贴图 Image，两条渲染路径的缓存都查。未加载完的占位纹理返回 null */
    function pickImage(url) {
        const img = bcGlobal("GLDrawImageCache")?.get(url)
            ?? bcGlobal("DrawCacheImage")?.get(url);
        return (img && (img.naturalWidth || img.width) > 1) ? img : null;
    }

    /** 贴图的原始像素尺寸 */
    function textureSize(url) {
        const img = pickImage(url);
        if (!img) return null;
        return { width: img.naturalWidth || img.width, height: img.naturalHeight || img.height };
    }

    /**
     * 换装界面的高亮标签，格式为「分组名 - 服装名」。
     * 分组名取 AssetGroup.Description（本体已按语言翻译过）。
     * @param {{asset: Object, group: Object}} hit
     * @returns {string}
     */
    function pickLabel(hit) {
        const groupName = hit.group?.Description || hit.group?.Name || "";
        const assetName = hit.asset?.Description || hit.asset?.Name || "";
        if (!assetName || assetName === groupName) return groupName;
        if (!groupName) return assetName;
        return `${groupName} - ${assetName}`;
    }

    /**
     * 跳转到某部位的服装编辑界面（Cloth 模式）。
     *
     * 本体没有现成的入口函数，这五步是照 AppearanceClick 里点击部位名那段
     * 抄下来的，缺一步都不行：FocusGroup 决定 DialogInventoryBuild 的目标，
     * CharacterAppearanceCloth 是取消时的回滚依据。
     *
     * @param {Object} group - AssetGroup
     * @returns {boolean} 是否成功跳转
     */
    function openClothScreen(group) {
        const C = CharacterAppearanceSelection;
        if (!C || !group) return false;
        if (typeof w.DialogInventoryBuild !== "function") return false;

        try {
            C.FocusGroup = group;
            w.DialogInventoryBuild(C, true, false);
            w.AppearancePreviewBuild?.(C, true);
            w.CharacterAppearanceCloth = w.InventoryGet?.(C, group.Name) ?? null;
            w.CharacterAppearanceMode = "Cloth";
            // 从一个部位直接切到另一个部位时要重建菜单：可用按钮随部位而变
            w.AppearanceMenuBuild?.(C);
            return true;
        } catch (e) {
            console.error("[LianDressOptimization] 跳转服装编辑失败", e);
            // 半途失败会让界面卡在不一致的状态，退回默认模式
            C.FocusGroup = null;
            w.CharacterAppearanceMode = "";
            return false;
        }
    }

    const appearancePicker = new AppearancePicker();

    /**
     * 沿悬浮装备的 alpha 边缘画轮廓描边，做法与调色界面的 drawOutline 相同：
     * 环向偏移叠加得到膨胀形状、扣掉原图留下外圈、再染色。全走 GPU 合成。
     */
    function drawAppearanceHover() {
        const picker = appearancePicker;
        const hover = picker.activeHover();
        if (!hover || !picker.isEnabled()) return;

        const ctx = bcGlobal("MainCanvas");
        if (!ctx || typeof ctx.save !== "function") return;

        const map = picker.getMap();
        // 快照用于列表悬浮：闪烁的隐藏帧里当前捕获没有这件装备
        const list = picker.captures.get(hover.asset) ?? hover.snapshot;
        if (!map || !list?.length) return;

        // 收集可画的图层，同时求出需要多大的离屏区域
        const items = [];
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const cap of list) {
            const img = pickImage(cap.url);
            if (!img) continue;
            const tw = img.naturalWidth || img.width;
            const th = img.naturalHeight || img.height;
            items.push({ cap, img, tw, th });
            const [x1, y1] = canvasToScreenPoint([cap.x, cap.y], map);
            const [x2, y2] = canvasToScreenPoint([cap.x + tw, cap.y + th], map);
            minX = Math.min(minX, x1); maxX = Math.max(maxX, x2);
            minY = Math.min(minY, y1); maxY = Math.max(maxY, y2);
        }
        if (items.length === 0 || !Number.isFinite(minX)) return;

        const pad = OUTLINE.width + 2;
        const bx = Math.max(0, Math.floor(minX - pad));
        const by = Math.max(0, Math.floor(minY - pad));
        const bw = Math.min(2000, Math.ceil(maxX + pad)) - bx;
        const bh = Math.min(1000, Math.ceil(maxY + pad)) - by;
        if (bw <= 0 || bh <= 0) return;

        const off = getOutlineCanvas(bw, bh);
        if (!off) return;
        const octx = off.ctx;

        // 换装界面的图层没有额外变换，直接按预览缩放贴图
        const blit = (dx, dy) => {
            for (const it of items) {
                const [sx, sy] = canvasToScreenPoint([it.cap.x, it.cap.y], map);
                octx.save();
                octx.translate(sx - bx + dx, sy - by + dy);
                octx.scale(map.sx, map.sy);
                octx.drawImage(it.img, 0, 0);
                octx.restore();
            }
        };

        octx.globalCompositeOperation = "lighter";
        for (let i = 0; i < OUTLINE.samples; i++) {
            const a = i / OUTLINE.samples * Math.PI * 2;
            blit(Math.cos(a) * OUTLINE.width, Math.sin(a) * OUTLINE.width);
        }
        octx.globalCompositeOperation = "destination-out";
        blit(0, 0);
        octx.globalCompositeOperation = "source-in";
        octx.fillStyle = GIZMO_STYLE.hoverStroke;
        octx.fillRect(0, 0, bw, bh);
        octx.globalCompositeOperation = "source-over";

        ctx.save();
        ctx.drawImage(off.cv, 0, 0, bw, bh, bx, by, bw, bh);

        // 名称标注放在轮廓上方
        if (hover.label) {
            ctx.font = `${GIZMO_STYLE.hlFont}px Arial`;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            const h = GIZMO_STYLE.hlFont + 8;
            const tw = ctx.measureText(hover.label).width + 16;
            const cx = Math.max(tw / 2, Math.min(2000 - tw / 2, (minX + maxX) / 2));
            const cy = minY - h / 2 - 4 < h ? minY + h / 2 + 4 : minY - h / 2 - 4;
            ctx.fillStyle = GIZMO_STYLE.hoverLabelBg;
            ctx.fillRect(cx - tw / 2, cy - h / 2, tw, h);
            ctx.fillStyle = GIZMO_STYLE.hoverStroke;
            ctx.fillText(hover.label, cx, cy);
        }
        ctx.restore();
    }

    /**
     * 从贴图 URL 反查它属于哪个 Asset。
     *
     * 渲染末端只有 URL，但 C.AppearanceLayers 每项都带 .Asset 反向引用，
     * 而 CommonDraw 拼 URL 时文件名首段固定是 asset.Name，据此匹配。
     * 与调色界面的 matchDrawLayerIndex 同一思路。
     *
     * @param {string} url
     * @returns {Object|null}
     */
    function matchAppearanceAsset(url) {
        const C = CharacterAppearanceSelection;
        const layers = C?.AppearanceLayers;
        if (!Array.isArray(layers) || typeof url !== "string") return null;

        const file = url.slice(url.lastIndexOf("/") + 1).replace(/\.png$/i, "");
        // 同名前缀可能匹配多个资产（如 Cloth1 与 Cloth10），取最长的那个
        let best = null;
        for (const layer of layers) {
            const asset = layer?.Asset;
            if (!asset?.Name || !file.startsWith(asset.Name)) continue;
            if (!best || asset.Name.length > best.Name.length) best = asset;
        }
        return best;
    }

    // 记录全身图的绘制参数
    mod.hookFunction("DrawCharacter", 0, (args, next) => {
        const [C, x, y, zoom, heightResize] = args;
        if (appearancePicker.isEnabled() && C && C === CharacterAppearanceSelection) {
            appearancePicker.captureDraw(x, y, zoom, heightResize);
        }
        return next(args);
    });

    // 捕获每个图层的贴图与绘制原点
    for (const fn of ["GLDrawImage", "DrawImageCanvas"]) {
        if (typeof w[fn] !== "function") continue;
        mod.hookFunction(fn, 1, (args, next) => {
            const [src, , x, y, opts] = args;
            if (opts && appearancePicker.isEnabled()) {
                const asset = matchAppearanceAsset(src);
                if (asset) appearancePicker.capture(asset, src, x, y, opts);
            }
            return next(args);
        });
    }

    // 在换装界面绘制完成后叠画轮廓
    mod.hookFunction("AppearanceRun", 0, (args, next) => {
        const result = next(args);
        if (appearancePicker.isEnabled()) {
            appearancePicker.commit();
            // 右侧列表的悬浮提示原本只有闪烁，这里补上同一套描边
            appearancePicker.hoverByGroup(dressOptimizationManager.hoveredGroupName);
            drawAppearanceHover();
        }
        return result;
    });

    // 悬浮检测
    mod.hookFunction("CommonMouseMove", 0, (args, next) => {
        if (appearancePicker.isEnabled()) {
            const p = toGameCoords(args[0]);
            if (p) appearancePicker.updateHover(p.x, p.y);
        }
        return next(args);
    });

    // 点击拾取。挂在 AppearanceClick 之前：命中就接管，不调用本体，
    // 因为角色区域在换装界面本来没有其他可点内容
    mod.hookFunction("AppearanceClick", 1, (args, next) => {
        if (appearancePicker.isEnabled()) {
            // 优先用事件坐标；AppearanceClick 的实参未必带 event（触屏路径），
            // 那就退回本体维护的 MouseX / MouseY
            const p = toGameCoords(args[0])
                ?? (typeof MouseX === "number" ? { x: MouseX, y: MouseY } : null);
            if (p && appearancePicker.click(p.x, p.y)) return;
        }
        return next(args);
    });

    // 角色重建后旧的捕获不再对应当前贴图
    mod.hookFunction("CharacterLoadCanvas", 0, (args, next) => {
        if (args[0] === CharacterAppearanceSelection) appearancePicker.invalidate();
        return next(args);
    });

    console.log("[LianDressOptimization] 加载成功");
})();
