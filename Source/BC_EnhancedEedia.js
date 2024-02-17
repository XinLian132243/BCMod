// ==UserScript==
// @name         BC 增强媒体
// @namespace    https://www.bondageprojects.com/
// @version      0.1.1
// @description  增强媒体
// @author       XinLian
// @include      /^https:\/\/(www\.)?bondageprojects\.elementfx\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @include      /^https:\/\/(www\.)?bondage-europe\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    // =======================================================================================
    var bcModSdk = function () { "use strict"; const e = "1.1.0"; function o(e) { alert("Mod ERROR:\n" + e); const o = new Error(e); throw console.error(o), o } const t = new TextEncoder; function n(e) { return !!e && "object" == typeof e && !Array.isArray(e) } function r(e) { const o = new Set; return e.filter((e => !o.has(e) && o.add(e))) } const i = new Map, a = new Set; function d(e) { a.has(e) || (a.add(e), console.warn(e)) } function s(e) { const o = [], t = new Map, n = new Set; for (const r of p.values()) { const i = r.patching.get(e.name); if (i) { o.push(...i.hooks); for (const [o, a] of i.patches.entries()) t.has(o) && t.get(o) !== a && d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o) || ""}\nPatch2:\n${a}`), t.set(o, a), n.add(r.name) } } o.sort(((e, o) => o.priority - e.priority)); const r = function (e, o) { if (0 === o.size) return e; let t = e.toString().replaceAll("\r\n", "\n"); for (const [n, r] of o.entries()) t.includes(n) || d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`), t = t.replaceAll(n, r); return (0, eval)(`(${t})`) }(e.original, t); let i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookChainExit) || void 0 === i ? void 0 : i.call(t, e.name, n), d = r.apply(this, o); return null == a || a(), d }; for (let t = o.length - 1; t >= 0; t--) { const n = o[t], r = i; i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookEnter) || void 0 === i ? void 0 : i.call(t, e.name, n.mod), d = n.hook.apply(this, [o, e => { if (1 !== arguments.length || !Array.isArray(o)) throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`); return r.call(this, e) }]); return null == a || a(), d } } return { hooks: o, patches: t, patchesSources: n, enter: i, final: r } } function c(e, o = !1) { let r = i.get(e); if (r) o && (r.precomputed = s(r)); else { let o = window; const a = e.split("."); for (let t = 0; t < a.length - 1; t++)if (o = o[a[t]], !n(o)) throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0, t + 1).join(".")} is not object`); const d = o[a[a.length - 1]]; if ("function" != typeof d) throw new Error(`ModSDK: Function ${e} to be patched not found`); const c = function (e) { let o = -1; for (const n of t.encode(e)) { let e = 255 & (o ^ n); for (let o = 0; o < 8; o++)e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1; o = o >>> 8 ^ e } return ((-1 ^ o) >>> 0).toString(16).padStart(8, "0").toUpperCase() }(d.toString().replaceAll("\r\n", "\n")), l = { name: e, original: d, originalHash: c }; r = Object.assign(Object.assign({}, l), { precomputed: s(l), router: () => { }, context: o, contextProperty: a[a.length - 1] }), r.router = function (e) { return function (...o) { return e.precomputed.enter.apply(this, [o]) } }(r), i.set(e, r), o[r.contextProperty] = r.router } return r } function l() { const e = new Set; for (const o of p.values()) for (const t of o.patching.keys()) e.add(t); for (const o of i.keys()) e.add(o); for (const o of e) c(o, !0) } function f() { const e = new Map; for (const [o, t] of i) e.set(o, { name: o, original: t.original, originalHash: t.originalHash, sdkEntrypoint: t.router, currentEntrypoint: t.context[t.contextProperty], hookedByMods: r(t.precomputed.hooks.map((e => e.mod))), patchedByMods: Array.from(t.precomputed.patchesSources) }); return e } const p = new Map; function u(e) { p.get(e.name) !== e && o(`Failed to unload mod '${e.name}': Not registered`), p.delete(e.name), e.loaded = !1, l() } function g(e, t, r) { "string" == typeof e && "string" == typeof t && (alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`), e = { name: e, fullName: e, version: t }, t = { allowReplace: !0 === r }), e && "object" == typeof e || o("Failed to register mod: Expected info object, got " + typeof e), "string" == typeof e.name && e.name || o("Failed to register mod: Expected name to be non-empty string, got " + typeof e.name); let i = `'${e.name}'`; "string" == typeof e.fullName && e.fullName || o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`), i = `'${e.fullName} (${e.name})'`, "string" != typeof e.version && o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`), e.repository || (e.repository = void 0), void 0 !== e.repository && "string" != typeof e.repository && o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`), null == t && (t = {}), t && "object" == typeof t || o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`); const a = !0 === t.allowReplace, d = p.get(e.name); d && (d.allowReplace && a || o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`), u(d)); const s = e => { "string" == typeof e && e || o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`); let t = g.patching.get(e); return t || (t = { hooks: [], patches: new Map }, g.patching.set(e, t)), t }, f = { unload: () => u(g), hookFunction: (e, t, n) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); "number" != typeof t && o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`), "function" != typeof n && o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`); const a = { mod: g.name, priority: t, hook: n }; return r.hooks.push(a), l(), () => { const e = r.hooks.indexOf(a); e >= 0 && (r.hooks.splice(e, 1), l()) } }, patchFunction: (e, t) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); n(t) || o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`); for (const [n, a] of Object.entries(t)) "string" == typeof a ? r.patches.set(n, a) : null === a ? r.patches.delete(n) : o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`); l() }, removePatches: e => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); s(e).patches.clear(), l() }, callOriginal: (e, t, n) => (g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`), "string" == typeof e && e || o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`), Array.isArray(t) || o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`), function (e, o, t = window) { return c(e).original.apply(t, o) }(e, t, n)), getOriginalHash: e => ("string" == typeof e && e || o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`), c(e).originalHash) }, g = { name: e.name, fullName: e.fullName, version: e.version, repository: e.repository, allowReplace: a, api: f, loaded: !0, patching: new Map }; return p.set(e.name, g), Object.freeze(f) } function h() { const e = []; for (const o of p.values()) e.push({ name: o.name, fullName: o.fullName, version: o.version, repository: o.repository }); return e } let m; const y = function () { if (void 0 === window.bcModSdk) return window.bcModSdk = function () { const o = { version: e, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: f, errorReporterHooks: Object.seal({ hookEnter: null, hookChainExit: null }) }; return m = o, Object.freeze(o) }(); if (n(window.bcModSdk) || o("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== e && (alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk.version.startsWith("1.0.") && void 0 === window.bcModSdk._shim10register)) { const e = window.bcModSdk, o = Object.freeze(Object.assign(Object.assign({}, e), { registerMod: (o, t, n) => o && "object" == typeof o && "string" == typeof o.name && "string" == typeof o.version ? e.registerMod(o.name, o.version, "object" == typeof t && !!t && !0 === t.allowReplace) : e.registerMod(o, t, n), _shim10register: !0 })); window.bcModSdk = o } return window.bcModSdk }(); return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = y), y }();

    const MOD_NAME = "增强媒体";
    const MOD_FULL_NAME = "增强媒体";
    const MOD_VERSION = "0.1.1";


    const mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });

    // =======================================================================================
    const w = window;
    // =======================================================================================
    
    w.EnableVideoPlayer = false;

    
    w.videoPlayer = {videoList: [], EnableBullet : true, Watchers :[]};    
    w.videoPlayer.playingId = '';    
    w.videoPlayer.syncListTime = 0;
    w.videoPlayer.syncPlayTime = 0;
    if(w.UpdateCheckerTimer == null)
    {
        w.UpdateCheckerTimer = setInterval(UpdateCheck, 1000);
    }


    // 绘制房间按钮
    mod.hookFunction(
        "ChatRoomMenuDraw",
        0,
        (args, next) => {
            next(args);
            if(w.EnableVideoPlayer)
            {               
                // 绘制开
                DrawButton(965, 825, 40, 40, "🎦", "#FFFFFF");
            }
            else
            {                
                // 绘制关
                DrawButton(965, 825, 40, 40, "🎦", "#777777");
            }
        }
    );

    // 点击房间内按钮
    mod.hookFunction(
        "ChatRoomClick",
        0,
        (args, next) => {
            if (MouseIn(965, 825, 40, 40)) {
                
                if(w.EnableVideoPlayer)
                {
                    ExitVideoPlayer();
                }
                else
                {
                    
                    w.videoPlayer.syncListTime = 0;
                    w.videoPlayer.syncPlayTime = 0;
                    w.videoPlayer.playingId = ''; 
                    createFloatingVideo();
                    w.EnableVideoPlayer = true;
                    SendState(true);
                }

                return;
            }            
            next(args);
        }
    );

    // 当在聊天界面按下键盘时，如果有悬浮窗则不自动跳到输入框
    mod.hookFunction(
        "ChatRoomKeyDown",
        0,
        (args, next) => {
            if(HasFloatingInput())
            {
                return false;
            }
            next(args);
        }
    );


     // 获取消息
     mod.hookFunction(
        "ChatRoomMessage",
        0,
        (args, next) => {

            let data = args[0];
            if (data !== undefined 
                && data.Sender != Player.MemberNumber
                && data.Type === "Hidden"
                 && data.Content == "EEVideo" 
                 && data.Dictionary !== undefined) {
                HandleVideoMsg(data);
            }

            if(w.EnableVideoPlayer)
            {
                if (data.Type === "Action" 
                && data.Content === "ServerEnter"
                && data.Sender != Player.MemberNumber)
                {
                    SendState(true);
                }
            }
           
            next(args);
        }
    );

      // 获取显示在屏幕的消息
      mod.hookFunction(
        "ChatRoomMessageDisplay",
        3,
        (args, next) => {
           
            var data = args[0];
            var msg = args[1];
            var SenderCharacter = args[2];
            var metadata = args[3];
            ChatRoomMessageDisplayEx(data, msg, SenderCharacter, metadata);
            next(args);
        }
    );


    mod.hookFunction(
        "ChatRoomDrawCharacterOverlay",
   3,
   (args, next) => {

    let C = args[0];
    let CharX = args[1];
    let CharY = args[2];
    let Zoom = args[3];

       ChatRoomDrawCharacterOverlayEx(C, CharX, CharY, Zoom);

       next(args);
   }
   );

    // 绘制正在观看的标志
    function ChatRoomDrawCharacterOverlayEx(C, CharX, CharY, Zoom) {

        if (ChatRoomHideIconState == 0) {
             // 当存在
            let selfWaching = w.EnableVideoPlayer &&  C.MemberNumber == Player.MemberNumber;
            let inWatchers = w.videoPlayer.Watchers.findIndex(w=>w.MemberNumber == C.MemberNumber) >= 0;
            if (selfWaching || inWatchers) {
                DrawImageResize("Icons/MovieStudio.png", CharX + 70 * Zoom, CharY + 40, 40 * Zoom, 40 * Zoom);
            }        
        }
    }
    
    
    function ChatRoomMessageDisplayEx(data, msg, SenderCharacter, metadata)
    {
        // 弹幕功能开启的话
        if(w.EnableVideoPlayer === true
            && w.videoPlayer.EnableBullet === true)
        {
            if(data.Type == "Chat")
            {
                SendBullet(`${GetPlayerName(SenderCharacter)} : ${data.Content}`);
            }
        }      
    }

    function HandleVideoMsg(data)
    {
        data.Dictionary.forEach(D => {
            switch (D.Type) {
                case "SyncPlay":
                    OnSyncPlay(D);
                    break;
                case "SyncList":
                    OnSyncList(D);
                    break;
                case "RequstSync":  
                    OnRequstSync(data.Sender);
                    break;
                case "State":  
                    OnRevState(data.Sender, D);
                    break;
            }
        })
        return;    
    }

    function UpdateCheck()
    {
        if(CurrentScreen == "ChatRoom")
        {
            // 仅仅保留在房间内的玩家
            w.videoPlayer.Watchers = w.videoPlayer.Watchers.filter(
                watcher => ChatRoomCharacter.findIndex(c => c.MemberNumber === watcher.MemberNumber) >=0
                );
        }
        else
        {
            // 不在房间则退出
            if(w.EnableVideoPlayer)
            {
                 ExitVideoPlayer();
            }
        }
    }

    function SendSyncPlay(target = null)
    {
        var dic = [
            {
                Type: "SyncPlay",
                Paused:  getCurrentPaused(),
                PlayTime: w.videoPlayer.playTimeBySync,
                PlayingId: w.videoPlayer.playingId,
                syncPlayTime : w.videoPlayer.syncPlayTime,
            }     
        ]
        
        if(target == null)
        {
            SendMsgToAll(dic);
        }else{
            SendMsgTo(target,dic);
        }
    }
     
    function OnSyncPlay(msg)
    {        
        if(!w.EnableVideoPlayer)
        {
            return;
        }

        if(msg.syncPlayTime > w.videoPlayer.syncPlayTime)
        {
            w.videoPlayer.syncPlayTime = msg.syncPlayTime;
        }else{
            return;
        }

        // 修正标题，因为可能显示在同步
        var item = GetPlayItem(msg.PlayingId);
        setTitle(item?.name); 

        if(w.videoPlayer.playingId != msg.PlayingId)
        {
            playId(msg.PlayingId);
        }
        var targetTime = msg.PlayTime;
        // 如果不是暂停状态，则需要计算网络延迟
        if(!msg.Paused)
        {
            targetTime = (new Date().getTime() - msg.syncPlayTime)/1000.0 + msg.PlayTime;
        }
        // 播放误差误差大于五秒重新同步
        if(Math.abs(getCurrentTime() - targetTime) > 5.0 && targetTime< w.videoPlayer.Player.duration)
        {
            setCurrentTime(targetTime);
        }

        if(getCurrentPaused() && !msg.Paused)
        {
            playVideo();
        }else if(!getCurrentPaused() && msg.Paused)
        {
            pauseVideo();
        }        
    }


    function SendSyncList(target = null)
    {
        var dic = [
            {
                Type: "SyncList",                
                List : w.videoPlayer.videoList,
                syncListTime : w.videoPlayer.syncListTime,
            }     
        ]

        if(target == null)
        {
            SendMsgToAll(dic);
        }else{
            SendMsgTo(target,dic);
        }
    }
    function OnSyncList(msg)
    {
        if(!w.EnableVideoPlayer)
        {
            return;
        }

        if(msg.syncListTime > w.videoPlayer.syncListTime)
        {
            w.videoPlayer.syncListTime = msg.syncListTime;
        }else{
            return;
        }

        w.videoPlayer.videoList = msg.List;
        w.videoPlayer.RerenderVideoList();
    }

    function SendRequstSync(force = true)
    {
        // 强制同步会把当前时间往前推一下，这样即使同步过来相同时间戳也会直接覆盖
        if(force)
        {
            w.videoPlayer.syncListTime = 0;
            w.videoPlayer.syncPlayTime = 0;
        }

        var dic = [
            {
                Type: "RequstSync",                
            }     
        ]
        SendMsgToAll(dic);
    }

    function OnRequstSync(sender)
    {
        if(!w.EnableVideoPlayer)
        {
            return;
        }

        SendSyncList(sender);
        SendSyncPlay(sender);
    }

    
    function SendState(active)
    {
        var dic = [
            {
                Type: "State",
                StateTime:  new Date().getTime(),
                Active : active
            }     
        ]
       
        SendMsgToAll(dic);
    }

    function OnRevState(sender, msg)
    {
        var cur = w.videoPlayer.Watchers.find(w=>w.MemberNumber == sender);
        if(cur === undefined && msg.Active === true)
        {
            w.videoPlayer.Watchers.push({
                MemberNumber : sender,
                StateTime : msg.StateTime,
            });
        }  
        // 删除不激活的
        if(cur !== undefined && msg.Active === false)
        {
            w.videoPlayer.Watchers = w.videoPlayer.Watchers.filter(watcher => watcher.MemberNumber !== sender);
        }      

    }


    function SendMsgToAll(dic)
    { 
        ServerSend("ChatRoomChat", { Content: "EEVideo", Type: "Hidden", Dictionary:dic}); 
    }

    function SendMsgTo(target,dic)
    {
        if(target != Player.MemberNumber)
        {
            ServerSend("ChatRoomChat", { Content: "EEVideo", Type: "Hidden", Target:target, Dictionary:dic});
        }   
    }


    function createFloatingVideo() 
        {
            // 创建悬浮视频播放窗口的元素
            w.videoPlayer.FloatingVideoDiv = document.createElement('div');
            w.videoPlayer.FloatingVideoDiv.style.position = 'fixed';
            w.videoPlayer.FloatingVideoDiv.style.border = '1px solid #ccc';
            w.videoPlayer.FloatingVideoDiv.style.overflow = 'hidden';
            w.videoPlayer.FloatingVideoDiv.style.backgroundColor = '#fff';
            w.videoPlayer.FloatingVideoDiv.style.resize = 'both';
            w.videoPlayer.FloatingVideoDiv.style.padding = '0';
            w.videoPlayer.FloatingVideoDiv.style.zIndex = '1000';
            w.videoPlayer.FloatingVideoDiv.style.width = '50%';
            w.videoPlayer.FloatingVideoDiv.style.height = '50%';
            w.videoPlayer.FloatingVideoDiv.style.left = '50%';
            w.videoPlayer.FloatingVideoDiv.style.top = '10%';
          
            // 创建标题栏元素
            const titleBar = document.createElement('div');
            titleBar.style.position = 'relative';
            titleBar.style.backgroundColor = '#172633';
            titleBar.style.padding = '10px';
            titleBar.style.cursor = 'move';
            titleBar.style.color = '#333';
            
            // 创建标题文本元素
            const titleText = document.createElement('span');
            titleText.textContent = '暂无放映中';
            titleText.style.marginLeft = '50px'; // 设置标题文本与按钮之间的间距
            titleText.style.color = 'white';

            w.videoPlayer.TitleText = titleText;

            // 添加到标题栏中
            titleBar.appendChild(titleText);
                          
             // 创建手动同步按钮
             const syncButton = document.createElement('button');
             syncButton.innerHTML = '🔄';
             syncButton.style.position = 'absolute';
             syncButton.style.left = '0';
             syncButton.style.top = '0';
             syncButton.style.bottom = '0';
             syncButton.style.padding = '5px 10px';
             syncButton.style.border = 'none';
             syncButton.style.backgroundColor = 'rgba(1, 1, 1, 0.2)';
             syncButton.style.color = 'white';
             syncButton.style.cursor = 'pointer';
             syncButton.style.fontWeight = 'bold';
             syncButton.style.fontSize = '24px';
           
             // 为同步按钮添加点击事件
             syncButton.addEventListener('click', () => {
                 SendRequstSync();
                 setTitle("手动同步中……");
             });
           
             // 将同步按钮添加到标题栏中
             titleBar.appendChild(syncButton);

            // 创建弹幕开关按钮
            const bulletButton = document.createElement('button');
            bulletButton.innerHTML = '弹';
            bulletButton.style.position = 'absolute';
            bulletButton.style.right = '320px'; // 调整位置
            bulletButton.style.top = '0';
            bulletButton.style.padding = '5px 10px';
            bulletButton.style.border = 'none';
            bulletButton.style.backgroundColor = 'rgba(1, 1, 1, 0.2)';
            bulletButton.style.color = w.videoPlayer.EnableBullet ? 'white' : 'gray'; // 根据状态设置颜色
            bulletButton.style.cursor = 'pointer';
            bulletButton.style.fontWeight = 'bold';
            bulletButton.style.fontSize = '24px';

            // 添加点击事件处理程序
            bulletButton.addEventListener('click', function () {
                // 切换状态
                w.videoPlayer.EnableBullet = !w.videoPlayer.EnableBullet;
                // 根据状态设置颜色
                bulletButton.style.color = w.videoPlayer.EnableBullet ? 'white' : 'gray';
            });

            // 将"弹"字按钮添加到标题栏中
            titleBar.appendChild(bulletButton);
          
            
            // 创建对齐,会直接对齐到下面的输入框
            const alignButton = document.createElement('button');
            alignButton.innerHTML = '⬜';
            alignButton.style.position = 'absolute';
            alignButton.style.right = '60px';
            alignButton.style.top = '0';
            alignButton.style.bottom = '0';
            alignButton.style.padding = '5px 10px';
            alignButton.style.border = 'none';
            alignButton.style.backgroundColor = 'rgba(1, 1, 1, 0.2)';
            alignButton.style.color = 'white';
            alignButton.style.cursor = 'pointer';
            alignButton.style.fontWeight = 'bold';
            alignButton.style.fontSize = '24px';
          
            let isAligned = false;
            let previousPosition = null;

            // 为对齐按钮添加点击事件
            alignButton.addEventListener('click', () => {

                const floatingVideoDiv = w.videoPlayer.FloatingVideoDiv;
                const inputChatElement = document.getElementById('InputChat');
            
                if (!isAligned) {
                    // 获取页面宽度和高度
                    const pageWidth = w.innerWidth;
                    const pageHeight = w.innerHeight;
            
                   // 获取 InputChat 元素相对于视口的位置
                    const inputChatRect = inputChatElement.getBoundingClientRect();
                    const inputChatTopRelativeToViewport = inputChatRect.top;

                    // 存储当前位置
                    previousPosition = {
                        left: floatingVideoDiv.style.left,
                        top: floatingVideoDiv.style.top,
                        width: floatingVideoDiv.style.width,
                        height: floatingVideoDiv.style.height
                    };

                    // 设置 FloatingVideoDiv 的位置和大小
                    floatingVideoDiv.style.position = 'absolute';
                    floatingVideoDiv.style.left = '0';
                    floatingVideoDiv.style.top = '0';
                    floatingVideoDiv.style.width = pageWidth + 'px';
                    floatingVideoDiv.style.height = inputChatTopRelativeToViewport + 'px';
            
                    alignButton.innerHTML = '◻️';
                } else {
                    // 恢复到之前的位置
                    if (previousPosition) {
                        floatingVideoDiv.style.left = previousPosition.left;
                        floatingVideoDiv.style.top = previousPosition.top;
                        floatingVideoDiv.style.width = previousPosition.width;
                        floatingVideoDiv.style.height = previousPosition.height;
                    }
            
                    alignButton.innerHTML = '⬜';
                }
            
                isAligned = !isAligned;
            });        

            // 将关闭按钮添加到标题栏中
            titleBar.appendChild(alignButton);

            // 创建关闭按钮
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '❌';
            closeButton.style.position = 'absolute';
            closeButton.style.right = '0';
            closeButton.style.top = '0';
            closeButton.style.bottom = '0';
            closeButton.style.padding = '5px 10px';
            closeButton.style.border = 'none';
            closeButton.style.backgroundColor = 'rgba(1, 1, 1, 0.2)';
            closeButton.style.color = 'white';
            closeButton.style.cursor = 'pointer';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.fontSize = '24px';
          
            // 为关闭按钮添加点击事件
            closeButton.addEventListener('click', () => {
              ExitVideoPlayer();
            });        

            // 将关闭按钮添加到标题栏中
            titleBar.appendChild(closeButton);

            // 创建左侧视频区域元素
            const leftVideoArea = document.createElement('div');
            leftVideoArea.style.position = 'absolute';
            leftVideoArea.style.width = 'calc(100% - 300px)';
            leftVideoArea.style.height = 'calc(100% - 40px)';
            leftVideoArea.style.bottom = '0';
    
            // 创建视频容器元素
            const videoContainer = document.createElement('div');
            videoContainer.id = "VideoContainer";
            videoContainer.style.position = 'absolute';
            videoContainer.style.width = '100%';
            videoContainer.style.height = '100%';
            videoContainer.style.bottom = '0';
          
            // 创建视频元素
            createVideoElement(videoContainer);
            leftVideoArea.appendChild(videoContainer);
            
            const rightMenu = document.createElement('div');
            rightMenu.style.position = 'absolute';
            rightMenu.style.right = '0';
            rightMenu.style.width = '300px';
            rightMenu.style.height = 'calc(100% - 40px)';
            rightMenu.style.bottom = '0';
            rightMenu.style.backgroundColor = '#0b131a';
    
    
            // 创建顶部栏容器
            const topBar = document.createElement('div');
            topBar.style.display = 'flex';
            topBar.style.justifyContent = 'space-between';
            topBar.style.height = '30px';
            topBar.style.backgroundColor = '#0b131a';
            // 用来提示不可修改
            topBar.style.color = '#2e2e2e';
            // 加入
            const addButton = document.createElement('button');
            addButton.textContent = '➕';
            addButton.style.float = 'right';
            addButton.style.backgroundColor = 'rgba(1, 1, 1, 0.2)';
            // 添加点击事件监听器
            addButton.addEventListener('click', function() {

                if(HasFloatingInput())
                {
                    return;
                }

                FloatingVideoPathInput('', '', function(name, url) {
                    // 验证函数，可以根据需要自定义验证规则
                    return name.trim() !== '' && url.trim() !== '';
                }, function(name, url) {
                    // 确定回调
                    const id = generateGUID(); // 生成 GUID
                    w.videoPlayer.videoList.push({ id: id, name: name, url: url });
                    UpdateSyncTime();
                    SendSyncList();
                    renderVideoList();
                }, function() {
                    // 取消回调
                });
            });
    
            // 创建按钮2
            const inoutButton = document.createElement('button');
            inoutButton.textContent = '⏏️';
            inoutButton.style.float = 'right';
            inoutButton.style.backgroundColor = 'rgba(1, 1, 1, 0.2)';
    
            inoutButton.addEventListener('click', function() {   
                if(HasFloatingInput())
                {
                    return;
                }
       
                FloatingVideoListInput(function(videoList) {
                    w.videoPlayer.videoList = videoList;
                
                    // 播放第一个视频
                    playId(w.videoPlayer.videoList[0].id);

                    UpdateSyncTime();
                    SendSyncList();
                    SendSyncPlay();
                    renderVideoList();
                }, function() {
                    // 取消回调
                });
            });
    
    
            // 添加按钮到顶部栏容器中
            if(HavePermissionToModify())
            {
                topBar.appendChild(addButton);
                topBar.appendChild(inoutButton);
            }else{
                topBar.textContent = '仅房管可控制';
            }
            // 将顶部栏容器添加到右侧菜单中
            rightMenu.appendChild(topBar);
    
            // 创建右侧菜单列表元素
            const rightMenuList = document.createElement('div');
            rightMenuList.style.position = 'absolute';
            rightMenuList.style.right = '0';
            rightMenuList.style.width = '300px';
            rightMenuList.style.height = 'calc(100% - 30px)';
            rightMenuList.style.bottom = '0';
            rightMenuList.style.backgroundColor = '#0b131a';
            rightMenuList.style.overflowY = 'auto';
            
            // 将原来的右侧菜单列表添加到右侧菜单中
            rightMenu.appendChild(rightMenuList);
    
    
            // 创建按钮用于显示/隐藏 rightMenuList
            const toggleButton = document.createElement('button');
            toggleButton.textContent = '>|';
            toggleButton.style.position = 'absolute';
            toggleButton.style.right = '270px';
            toggleButton.style.top = '0';
            toggleButton.style.bottom = '0';
            toggleButton.style.padding = '5px 10px';
            toggleButton.style.border = 'none';
            toggleButton.style.backgroundColor = 'rgba(1, 1, 1, 0.2)';
            toggleButton.style.color = 'white';
            toggleButton.style.cursor = 'pointer';
            toggleButton.style.fontWeight = 'bold';
            toggleButton.style.fontSize = '24px';
    
            // 添加按钮点击事件处理程序
            toggleButton.addEventListener('click', function () {
                if (rightMenu.style.display === 'none') {
                    rightMenu.style.display = 'block';
                    rightMenu.style.width = '300px'; // 显示右侧菜单列表时恢复初始宽度
                    leftVideoArea.style.width = 'calc(100% - 300px)';
                    toggleButton.textContent = '>|';
                } else {
                    rightMenu.style.display = 'none';
                    rightMenu.style.width = '0'; // 隐藏右侧菜单列表时设置宽度为0
                    leftVideoArea.style.width = 'calc(100% - 0px)';
                    toggleButton.textContent = '<|';
                }
            });
    
            // 将显隐添加到标题
            titleBar.appendChild(toggleButton);
    
            const scriptElement = document.createElement('script');
    
            // 设置 script 元素的 src 属性为 Sortable.js 的 CDN 地址
            scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js';
            // 添加 script 元素到文档头部
            document.head.appendChild(scriptElement);
    
            function renderVideoList() {
                // 清空右侧菜单列表的内容
                rightMenuList.innerHTML = '';
    
                w.videoPlayer.videoList.forEach((video, index) => {
                    // 创建视频项容器
                    const videoItem = document.createElement('div');
                    videoItem.classList.add('video-item');
    
                    // 创建视频按钮
                    const videoButton = document.createElement('button');
                    videoButton.textContent = video.name; // 使用索引创建默认文本
                    videoButton.classList.add('video-button'); // 添加类名以便样式定制
                    videoButton.style.display = 'inline-block';
                    videoButton.style.width = 'calc(100% - 70px)'; // 设置宽度为100%减去按钮的宽度
                    videoButton.style.padding = '10px';
                    videoButton.style.border = 'none';
                    videoButton.style.backgroundColor = 'transparent';
                    videoButton.style.textAlign = 'left';
                    videoButton.style.cursor = 'pointer';
                    videoButton.style.color = 'white';
                    if(w.videoPlayer?.playingId == video.id)
                    {
                        videoButton.style.fontWeight = 'bold';
                    }
                    var id = video.id;                                                                 
                    videoButton.addEventListener('click', function () {
                        playId(id);
                        UpdateSyncTime();
                        SendSyncPlay();
                    });

                    // 创建删除按钮
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = '➖';
                    deleteButton.style.float = 'right';
                    deleteButton.style.backgroundColor = 'rgba(1, 1, 1, 0.2)';
                    deleteButton.addEventListener('click', function() {
                        // 删除对应的 w.videoPlayer.videoList 元素
                        w.videoPlayer.videoList.splice(index, 1);
                        UpdateSyncTime();
                        SendSyncList();
                        // 重新渲染列表
                        renderVideoList();
                    });                           
                
    
                    // 将按钮添加到视频项容器中                    
                    videoItem.appendChild(videoButton);
                    if(HavePermissionToModify())
                    {
                        videoItem.appendChild(deleteButton);
                    }
    
                    // 将视频项容器添加到右侧菜单列表中
                    rightMenuList.appendChild(videoItem);
                });
            }
            w.videoPlayer.RerenderVideoList = renderVideoList;
    
            // 当 script 元素加载完成后，创建视频列表和可拖动功能
            scriptElement.onload = function() {          
    
                renderVideoList();
                if(HavePermissionToModify())
                {
                    // 使用Sortable.js来使按钮列表可拖动调整顺序
                    const sortable = new Sortable(rightMenuList, {
                        animation: 150,
                        draggable: '.video-item',
                        onUpdate: function(evt) {
                            // 拖动完成后的操作，你可以在这里更新视频列表的顺序等
                            console.log('拖动完成:', evt.newIndex);
                            // 使用数组的 splice 方法来移动元素位置
                            const movedItem = w.videoPlayer.videoList.splice(evt.oldIndex, 1)[0];
                            w.videoPlayer.videoList.splice(evt.newIndex, 0, movedItem);
                            UpdateSyncTime();
                            SendSyncList();
                            // 重新渲染列表
                            renderVideoList();
                        }
                    });
                }
            };
             
    
    
            // 将标题栏、左侧视频区域和右侧菜单列表添加到悬浮视频播放窗口中
            w.videoPlayer.FloatingVideoDiv.appendChild(titleBar);
            w.videoPlayer.FloatingVideoDiv.appendChild(leftVideoArea);
            w.videoPlayer.FloatingVideoDiv.appendChild(rightMenu);

            // 将悬浮视频播放窗口添加到页面中
            document.body.appendChild(w.videoPlayer.FloatingVideoDiv);
                 
            // 创建弹幕池功能
            CreateBulletScreen();

            // 实现拖动功能
            let isDragging = false;
            let offsetX = w.innerWidth / 2 - w.videoPlayer.FloatingVideoDiv.offsetWidth / 2;
            let offsetY = w.innerHeight / 2 - w.videoPlayer.FloatingVideoDiv.offsetHeight / 2;
          
            titleBar.addEventListener('mousedown', (e) => {
              isDragging = true;
              offsetX = e.clientX - w.videoPlayer.FloatingVideoDiv.offsetLeft;
              offsetY = e.clientY - w.videoPlayer.FloatingVideoDiv.offsetTop;
            });
          
            document.addEventListener('mousemove', (e) => {
              if (!isDragging) return;
              w.videoPlayer.FloatingVideoDiv.style.left = e.clientX - offsetX + 'px';
              w.videoPlayer.FloatingVideoDiv.style.top = e.clientY - offsetY + 'px';
            });
          
            document.addEventListener('mouseup', () => {
              isDragging = false;
            });      

            SendRequstSync();
        }
    
        function createVideoElement(videoContainer) {
            // 创建 link 元素
            const linkElement = document.createElement('link');
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('href', 'https://vjs.zencdn.net/8.10.0/video-js.css');
        
            // 创建 video 元素
            const videoElement = document.createElement('video');
            videoElement.setAttribute('id', 'my-video');
            videoElement.setAttribute('class', 'video-js');
            videoElement.setAttribute('controls', '');
            videoElement.setAttribute('preload', 'auto');
            videoElement.setAttribute('autoplay', ''); // 自动播放
            // 设置背景
            videoElement.setAttribute('poster', "https://xinlian132243.github.io/BCMod/Assets/VideoPlayerBG.jpg");
            videoElement.style.width = '100%'; // 设置视频宽度为100%，以适应父元素大小
            videoElement.style.height = '100%'; // 设置视频高度为100%，以适应父元素大小

            // 初始化静音
            videoElement.muted = true;

            // 暂停和继续播放的回调
            videoElement.addEventListener('pause', function() {
                console.log('Video paused');
                if(!w.videoPlayer.DontCallback)
                {
                    w.videoPlayer.callbacks.OnPause();
                }
            });
    
            videoElement.addEventListener('play', function() {
                console.log('Video playing');
                if(!w.videoPlayer.DontCallback)
                {
                    w.videoPlayer.callbacks.OnPlay();
                }
            });
    
            // 调整播放进度的回调
            videoElement.addEventListener('seeked', function() {
                console.log('Video seeked to', videoElement.currentTime);
                if(!w.videoPlayer.DontCallback)
                {
                    w.videoPlayer.callbacks.OnSeeked();
                }
            });
            // 视频播放结束的回调
            videoElement.addEventListener('ended', function() {
                console.log('Video ended');
                w.videoPlayer.callbacks.OnEnded();
            });
    
    
            // 创建 source 元素
            const sourceElementMp4 = document.createElement('source');
            sourceElementMp4.setAttribute('src', GetPlayingItem()?.url);
            

            sourceElementMp4.setAttribute('type', 'video/mp4');


            // 创建 p 元素
            const pElement = document.createElement('p');
            pElement.setAttribute('class', 'vjs-no-js');
            pElement.textContent =
                "To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video";
        
            const aElement = document.createElement('a');
            aElement.setAttribute('href', 'https://videojs.com/html5-video-support/');
            aElement.setAttribute('target', '_blank');
            aElement.textContent = 'supports HTML5 video';
        
            pElement.appendChild(aElement);
        
            // 创建 script 元素
            const scriptElement = document.createElement('script');
            scriptElement.setAttribute('src', 'https://vjs.zencdn.net/8.10.0/video.min.js');
        
            // 将创建的元素添加到 videoContainer
            videoContainer.appendChild(linkElement);
            videoContainer.appendChild(videoElement);
            videoElement.appendChild(sourceElementMp4);
            videoElement.appendChild(pElement);
            videoContainer.appendChild(scriptElement);
            w.videoPlayer.Player = videoElement;
        }
        
    
        function FloatingVideoPathInput(defaultName, defaulturl, isValid, confirmCallback, cancelCallback) {
            // 创建悬浮窗口容器
            const floatingInputContainer = document.createElement('div');
            floatingInputContainer.id = "FloatingVideoPathInput";
            floatingInputContainer.style.position = 'fixed';
            floatingInputContainer.style.top = '50%';
            floatingInputContainer.style.left = '50%';
            floatingInputContainer.style.transform = 'translate(-50%, -50%)';
            floatingInputContainer.style.backgroundColor = 'white';
            floatingInputContainer.style.padding = '20px';
            floatingInputContainer.style.border = '1px solid black';
            floatingInputContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            floatingInputContainer.style.zIndex = '9999';
            floatingInputContainer.style.width = '500px';
        
            // 创建输入框和按钮
            const nameLabel = document.createElement('label');
            nameLabel.textContent = '名称: ';
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.style.display = 'block';
            nameInput.style.marginBottom = '10px';
            nameInput.style.width = '400px'; 
            nameInput.value = defaultName; // 设置名称输入框的默认值
        
            const urlLabel = document.createElement('label');
            urlLabel.textContent = '地址: ';
            const urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.style.display = 'block';
            urlInput.style.marginBottom = '10px';
            urlInput.style.width = '400px'; 
            urlInput.value = defaulturl; // 设置地址输入框的默认值
        
            const confirmButton = document.createElement('button');
            confirmButton.textContent = '确定';
            confirmButton.style.marginRight = '10px';
            confirmButton.addEventListener('click', function() {
            const name = nameInput.value;
            const url = urlInput.value;
            if (isValid(name, url)) { // 调用验证函数
                confirmCallback(name, url);
                document.body.removeChild(floatingInputContainer); // 确定后移除悬浮窗口
            } else {
                alert('输入不符合要求，请检查后重新输入。');
            }
        });
    
        
            const cancelButton = document.createElement('button');
            cancelButton.textContent = '取消';
            cancelButton.addEventListener('click', function() {
                cancelCallback();
                document.body.removeChild(floatingInputContainer); // 取消后移除悬浮窗口
            });
        
            // 将元素添加到容器中
            floatingInputContainer.appendChild(nameLabel);
            floatingInputContainer.appendChild(nameInput);
            floatingInputContainer.appendChild(urlLabel);
            floatingInputContainer.appendChild(urlInput);
            floatingInputContainer.appendChild(confirmButton);
            floatingInputContainer.appendChild(cancelButton);
        
            // 将容器添加到页面中
            document.body.appendChild(floatingInputContainer);
        }
     
        function FloatingVideoListInput(confirmCallback, cancelCallback) {
    
            // 从 w.videoPlayer.videoList 生成文本
            const text = w.videoPlayer?.videoList.map(video => `${video.name}\n${video.url}`).join('\n');
    
            // 创建悬浮窗口容器
            const floatingInputContainer = document.createElement('div');
            floatingInputContainer.id = "FloatingVideoListInput";

            floatingInputContainer.style.position = 'fixed';
            floatingInputContainer.style.top = '50%';
            floatingInputContainer.style.left = '50%';
            floatingInputContainer.style.transform = 'translate(-50%, -50%)';
            floatingInputContainer.style.backgroundColor = 'white';
            floatingInputContainer.style.padding = '20px';
            floatingInputContainer.style.border = '1px solid black';
            floatingInputContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            floatingInputContainer.style.zIndex = '9999';
            floatingInputContainer.style.width = '500px'; // 设置宽度为500px
        
            // 创建解释介绍
            const explanation = document.createElement('p');
            explanation.textContent = '请在下方输入播放列表信息，格式为：从第一个视频名称开始，名称和视频地址轮流占行。';
            explanation.style.marginBottom = '10px';
    
    
            // 创建输入框和按钮
            const textArea = document.createElement('textarea');
            textArea.style.display = 'block';
            textArea.style.width = '100%';
            textArea.style.height = '400px'; // 设置高度为400px
            textArea.value = text; // 设置输入框的默认值
            textArea.style.whiteSpace = 'nowrap'; // 设置不换行
            textArea.style.overflow = 'auto'; // 设置滚动条
    
            
            const confirmButton = document.createElement('button');
            confirmButton.textContent = '确定';
            confirmButton.style.marginRight = '10px';
            confirmButton.addEventListener('click', function() {
                const lines = trim(textArea.value).split('\n');
                if (lines.length % 2 === 0) { // 检查行数是否为偶数
                    const videoList = [];
                    for (let i = 0; i < lines.length; i += 2) {
                        const name = lines[i].trim();
                        const url = lines[i + 1].trim();
                        const id = generateGUID();
                        videoList.push({ name: name, url: url, id: id });
                    }
                    confirmCallback(videoList);
                    document.body.removeChild(floatingInputContainer); // 确定后移除悬浮窗口
                } else {
                    alert('输入不符合要求，请检查后重新输入。');
                }
            });
        
            const cancelButton = document.createElement('button');
            cancelButton.textContent = '取消';
            cancelButton.addEventListener('click', function() {
                cancelCallback();
                document.body.removeChild(floatingInputContainer); // 取消后移除悬浮窗口
            });
        
            // 将元素添加到容器中
            floatingInputContainer.appendChild(explanation);
            floatingInputContainer.appendChild(textArea);
            floatingInputContainer.appendChild(confirmButton);
            floatingInputContainer.appendChild(cancelButton);
        
            // 将容器添加到页面中
            document.body.appendChild(floatingInputContainer);
        }
           
        function CreateBulletScreen()
        {             
            const targetElement = document.querySelector('#VideoContainer');
            if (targetElement !== null && targetElement !== undefined)
            {
                const scriptElement = document.createElement('script');
    
                // 设置 script 元素的 src 属性为 BulletJs.js 的 CDN 地址
                scriptElement.src = 'https://unpkg.com/js-bullets@latest/dist/BulletJs.min.js';
                // 添加 script 元素到文档头部
                document.head.appendChild(scriptElement);
                // 当 script 元素加载完成后，创建弹幕屏幕
                scriptElement.onload = function() {    
                    // VideoContainer 的 div 必须要有明确的宽高
                    w.videoPlayer.BulletScreen = new BulletJs('#VideoContainer', {
                        trackHeight: 35, // 每条轨道高度
                        speed: null, // 速度 100px/s 根据实际情况去配置
                        pauseOnClick: false, // 点击暂停
                        pauseOnHover: true, // hover 暂停
                        duration: "10s",
                    });
                }  
                
    
    
                // 创建 ResizeObserver 实例让每次大小发生变化时重新创建弹幕池
                // 其中关闭也会触发
                if (targetElement.resizeObserver  === undefined)
                {
                    targetElement.resizeObserver = new ResizeObserver(entries => {
                    for (let entry of entries) {
                        // 获取目标元素的新尺寸
                        const { width, height } = entry.contentRect;
            
                        // 重新创建弹幕池以适配
                        CreateBulletScreen();
                    }
                    });
            
                    // 监听目标元素的大小变化
                    targetElement.resizeObserver.observe(targetElement);
                }
            }
            
        }

        function SendBullet(str)
        {
            str = str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&#39;')
            .replace(/\//g, '&#x2F;');

            w.videoPlayer.BulletScreen.push(`<span style="color: rgba(255, 255, 255, 0.5); text-shadow: 2px 2px 4px rgba(0,0,0,0.5); font-size: 30px;">${str}</span>`)
        }

        function ExitVideoPlayer()
        {
            w.EnableVideoPlayer = false;
            SendState(false);
            w.videoPlayer.DontCallback = true;
            if(w.videoPlayer.FloatingVideoDiv != null)
            {
                document.body.removeChild(w.videoPlayer.FloatingVideoDiv);
                w.videoPlayer.FloatingVideoDiv = null;
            }
        }


        function HasFloatingInput()
        {
            return document.getElementById("FloatingVideoPathInput") != null || document.getElementById("FloatingVideoListInput") != null;

        }

        function UpdateSyncTime()
        {
            if(HavePermissionToModify())
            {
                w.videoPlayer.syncListTime = new Date().getTime();
                w.videoPlayer.syncPlayTime = new Date().getTime();
                w.videoPlayer.playTimeBySync = getCurrentTime();
            }
        }

        // 获取当前播放进度的接口
        function getCurrentTime() {
            return w.videoPlayer.Player.currentTime;
        }
    

        
        // 获取当前播放进度的接口
        function getCurrentPaused() {
            return w.videoPlayer.Player.paused;
        }


        // 播放视频的接口
        function playVideo() {
            w.videoPlayer.DontCallback = true;
            const playPromise = w.videoPlayer.Player.play();
            // 处理播放结果，主要是防止被回调
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // 播放成功
                    w.videoPlayer.DontCallback = false;
                }).catch(error => {
                    // 播放失败
                    console.error('视频播放失败:', error);
                });
                }
        }
    
        // 暂停视频的接口
        function pauseVideo() {
            w.videoPlayer.DontCallback = true;
            w.videoPlayer.Player.pause();
            w.videoPlayer.DontCallback = false;
            
        }
    
        // 调整播放时间的接口（单位：秒）
        function setCurrentTime(time) {
            w.videoPlayer.DontCallback = true;
            w.videoPlayer.Player.currentTime = time;
            w.videoPlayer.DontCallback = false;
        }
    
        function setTitle(str)
        {
            w.videoPlayer.TitleText.textContent = str;
        }


        function playId(id)
        {
            var item = GetPlayItem(id);
            setTitle(item?.name); 

            if(w.videoPlayer.playingId == id)
            {
                return;
            }

            w.videoPlayer.Player.src = item?.url;
            w.videoPlayer.playingId = id;
            playVideo();        

            w.videoPlayer.RerenderVideoList();
        }
    
    
        w.videoPlayer.callbacks = {};
        w.videoPlayer.callbacks.OnPlay =
        function(){   
            UpdateSyncTime();
            SendSyncPlay();
            if(!HavePermissionToModify())
            {
                SendRequstSync();
            }
        };
    
        w.videoPlayer.callbacks.OnPause =
        function(){
            UpdateSyncTime();
            SendSyncPlay(); 
            if(!HavePermissionToModify())
            {
                SendRequstSync();
            }
        };
    
        w.videoPlayer.callbacks.OnSeeked =
        function(){
    
            UpdateSyncTime();
            SendSyncPlay();     
            if(!HavePermissionToModify())
            {
                SendRequstSync();
            }       
        };
    
        w.videoPlayer.callbacks.OnEnded =
        function(){
            var index= w.videoPlayer.videoList.findIndex(item => item.id == w.videoPlayer?.playingId);
            if(index >= 0)
            {
                index = (index +1)% w.videoPlayer.videoList.length;
                playId(w.videoPlayer.videoList[index].id);
                // 更新播放状态，但是不会发送同步，因为可能别人还没放完最后一点
                UpdateSyncTime();
                w.videoPlayer.playTimeBySync = 0;
                console.log("playend try play next");
            }        
        };
    
        // 有修改权限
        function HavePermissionToModify()
        {
            // 是房管
            return ChatRoomPlayerIsAdmin();
        }
    
        // 创建 GUID 生成函数
        function generateGUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        function GetPlayingItem()
        {
            return w.videoPlayer.videoList.find(item => item.id == w.videoPlayer?.playingId);
        }
    
        function GetPlayItem(id)
        {
            return w.videoPlayer.videoList.find(item => item.id == id);
        }
    

        function GetPlayerName(player)
        {
            return player?.Nickname!=null&&player?.Nickname!=''?player?.Nickname:player?.Name;
        }
    
    
        function trim(string) {
            if(string.trim) {
                return string.trim();
            }else {
                let reg = /^\s+|\s+$/g;
                return string.replace(reg,"");
            }
        }

        
    console.log("[BC_EnhancedEedia] Load Success");
})();

