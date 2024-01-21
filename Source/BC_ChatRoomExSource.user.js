// ==UserScript==
// @name         BC 聊天室扩展
// @namespace    https://www.bondageprojects.com/
// @version      0.1.1
// @description  聊天室扩展
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

    const MOD_NAME = "聊天室扩展";
    const MOD_FULL_NAME = "聊天室扩展";
    const MOD_VERSION = "0.1.1";


    const mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });

    // =======================================================================================
    const w = window;
    // =======================================================================================

    mod.hookFunction("ChatRoomMessageDisplay", 4, (args, next) => { 
        //console.log(args);
        var data = args[0];
        var msg = args[1];
        var SenderCharacter = args[2];
        var metadata = args[3];
        ChatRoomMessageDisplayEx(data, msg, SenderCharacter, metadata);
         return next(args);
     });

    w.WaitSpeakQueue = [];
    w.VocalAudio = {};
    w.EnableSpeak = false;
    w.VocalIndex = 0;



    function ChatRoomMessageDisplayEx(data, msg, SenderCharacter, metadata)
    {
        // 朗读消息功能
        HandleSpeakMsg(data, msg, SenderCharacter, metadata);
    }

     function HandleSpeakMsg(data, msg, SenderCharacter, metadata)
     {        
        if(!IsEnableSpeak())
        {
            return;
        }

        // 仅播放以下内容
        if(!(data.Type == "Chat" //聊天
        || data.Type == "Action"  // 消息
        || data.Type == "Activity" // 互动
        || data.Type == "Emote" // 动作
        || data.Type == "Whisper" // 悄悄话
        || data.Type == "LocalMessage"  // 检测Beep
        )
        )
        {
            // 此外消息不读
            return;
        }
        else
        {
            // 除了Beep，自己发出的消息不会朗读
            if(data.Type != "LocalMessage" && Player.MemberNumber == SenderCharacter.MemberNumber)
            {
                return;
            }

        }

        // 如果是角色说话
        var isCharacterSpeak =  IsCharacterSpeak(data);

        // 消息和动作只处理跟自己有关的
        // 不包含自己名字的，跳过
        if(Player.OnlineSettings.CRE.SpeakSetting.SpeakMsgOnlyAboutMe)
        {
            if(data.Type == "Action")
            {
               if(!msg.includes(GetPlayerName(Player)))
               {
                    return;
               }
            }
            // 目标对象不是自己的，跳过
            if(data.Type == "Activity" 
            && metadata?.TargetMemberNumber != Player.MemberNumber)
            {
                return;
            }
        }      


        var senderName  = GetPlayerName(SenderCharacter);
        var text = msg;
        var senderText = "";
        var endText = "";
        if(data.Type == "Chat")
        {
            senderText = senderName + "说：";
        }

        if(data.Type == "Whisper")
        {
            senderText = senderName + "悄悄说：";
        }

       
        if(data.Type == "LocalMessage")
        {
            // 本地消息处理Beep
            if(msg.includes("bce-beep"))
            {
                var beep = /好友私聊来自 (.+)\(\d+\); 以及以下信息:(.+)/.exec(msg);
                if (beep?.length > 0 )
                {          
                    senderText = beep[1] + "私聊说：" ;
                    text = beep[2];
                }
    
                beep = /好友私聊来自 (.+)\(\d+\) 位于房间 \"(.+)\"; 以及以下信息:(.+)/.exec(msg);
                if (beep?.length > 0 )
                {          
                    senderText = beep[1] + "在房间" + beep[2] + "私聊说：";
                    text = beep[3];
                }
            }
            else
            {
                return;
            }
           
        }
        
        // 如果是聊天信息，最多二十个字
        if(Player.OnlineSettings.CRE.SpeakSetting.SpeedLimitLengthChat)
        {
            if(isCharacterSpeak && !text.includes(GetPlayerName(Player)))
            {
                const [t, e] = TruncateAndAppend(text, 20);
                text = t;
                endText = e;
            }
        }


        if(Player.OnlineSettings.CRE.SpeakSetting.TestVocals 
            && SenderCharacter?.OnlineSharedSettings?.CRE?.SpeakSetting?.EnableVocal == true
            && isCharacterSpeak)
        {
            w.VocalIndex ++;
            PrepareVocals(text, SenderCharacter?.OnlineSharedSettings?.CRE?.SpeakSetting.Vocals, w.VocalIndex);

            w.WaitSpeakQueue.push({
                VocalIndex : w.VocalIndex,
                Context: 
                [
                {t:senderText, audio: -1},
                {t:text, audio: w.VocalIndex},
                {t:endText, audio: -1},
                ]}
                );
        }
        else
        {
            w.WaitSpeakQueue.push({
                VocalIndex : -1,
                Context: 
                [
                    {t:senderText, audio: -1},
                    {t:text, audio: -1},
                    {t:endText, audio: -1},
                ]}
                );
        }


        TrySpeakNextItem();
     }

     // 如果是说话的聊天信息
     function IsCharacterSpeak(data)
     {
        return data.Type == "Chat" //聊天
        || data.Type == "Whisper" // 悄悄话
        || data.Type == "LocalMessage"  // 检测Beep
        ;
     }

     // 说话函数
     function SpeakDefault(str){

        str = ReplaceCharacters(str);


        let utterThis = new window.SpeechSynthesisUtterance();
        utterThis.text= str; 
        utterThis.pitch = 2;
        utterThis.rate = Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed;
        utterThis.volume = Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume;
        utterThis.lang = 'zh-CN'; 
        utterThis.onend = function () {
            TrySpeakNextText();
          };
        window.speechSynthesis.speak(utterThis);
    }

    function SpeakVacal(index){

        var audio = w.VocalAudio[index];
        audio.addEventListener('ended', function() {
            TrySpeakNextText();
          });
          audio.playbackRate = Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed;
          audio.volume = Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume * 0.2;
          // 播放音频
          audio.play();
    }

    w.CurrentSpeakItem = [];
    w.CurrentAudio = null;



    // 如果队列不为空，且当前没有文本正在朗读，则取出下一段文本并朗读
    function TrySpeakNextText() {
        if(!IsEnableSpeak())
        {
            return;
        }

        if (w.CurrentSpeakItem.Context.length > 0) {
          var nextText = w.CurrentSpeakItem.Context.shift();
          if(nextText.audio != -1 && nextText.audio in w.VocalAudio)
          {
            SpeakVacal(nextText.audio);
          }else{
            SpeakDefault(nextText.t);
          }
        }
        else
        {
            TrySpeakNextItem();
        }
    }   
      

    function TrySpeakNextItem() {
        if(!IsEnableSpeak())
        {
            return;
        }

        if (w.WaitSpeakQueue.length > 0 
            && !window.speechSynthesis.speaking
            &&!(w.CurrentAudio != null && w.CurrentAudio.paused == false)
            && w.WaitDownloadTimer == null) {
          var nextItem = w.WaitSpeakQueue.shift();
          w.CurrentSpeakItem = nextItem;    
          if(nextItem.VocalIndex == -1)
          {

            TrySpeakNextText();
          }   
          else{
            WaitForAudio(nextItem.VocalIndex, TrySpeakNextText)
          }
          
        }        
    }    

    // 在聊天房间并且打开了开关
    function IsEnableSpeak()
    {
        if(CurrentScreen != 'ChatRoom')
        {
            return false;
        }

        return w.EnableSpeak;
    }


    // 绘制房间按钮
    mod.hookFunction(
        "ChatRoomMenuDraw",
        0,
        (args, next) => {
            next(args);
            if(w.EnableSpeak)
            {               
                // 绘制开
                DrawButton(965, 865, 40, 40, "🎧", "#FFFFFF");
            }
            else
            {                
                // 绘制关
                DrawButton(965, 865, 40, 40, "🎧", "#777777");
            }
        }
    );

    // 点击房间内按钮
    mod.hookFunction(
        "ChatRoomClick",
        0,
        (args, next) => {
            if (MouseIn(965, 865, 40, 40)) {
                
                if(w.EnableSpeak)
                {
                    w.EnableSpeak = false;
                    // 同时停止正在的播放
                    w.WaitSpeakQueue = [];
                    w.speechSynthesis.cancel();
                }
                else
                {
                    w.EnableSpeak = true;                            
                    CheckOnlineCRESetting();
                    SpeakDefault("开启播报");
                }

                return;
            }            
            next(args);
        }
    );

    
    mod.hookFunction("PreferenceRun", 50, (args, next) => {
        next(args);
        if (PreferenceSubscreen === "") {
            DrawButton(920, 50, 400, 90, "        房间朗读设置", "White", "Icons/Audio.png");
        }
        if (PreferenceSubscreen === "ChatRoomExSetting") {

            MainCanvas.textAlign = "left";
            DrawText("- 房间朗读设置 -", 500, 125, "Black", "Gray");
            DrawText("朗读音量", 800, 225, "Black", "Gray");
            MainCanvas.textAlign = "center";
            DrawBackNextButton(500, 193, 250, 64, Math.round(Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume * 100) + "%", "White", "",
                () => "-",
                () => "+");
            MainCanvas.textAlign = "left";
            DrawText("朗读语速", 800, 310, "Black", "Gray");
            MainCanvas.textAlign = "center";
            DrawBackNextButton(500, 272, 250, 64, Math.round(Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed * 100) + "%", "White", "",
                () => "-",
                () => "+");
            
            DrawButton(200, 225, 200, 64, "🎧 试听", "#FFFFFF");

            MainCanvas.textAlign = "left";

            DrawCheckbox(500, 352, 64, 64, "仅播放与自己有关的互动和消息", Player.OnlineSettings.CRE.SpeakSetting.SpeakMsgOnlyAboutMe);
            DrawCheckbox(500, 432, 64, 64, "过长对话省略", Player.OnlineSettings.CRE.SpeakSetting.SpeedLimitLengthChat);
            DrawCheckbox(500, 512, 64, 64, "测试：声线", Player.OnlineSettings.CRE.SpeakSetting.TestVocals);
            //DrawCheckbox(500, 592, 64, 64, TextGet("AudioNotifications"), Player.AudioSettings.Notifications);
            


            DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
        }
    });


    mod.hookFunction("PreferenceClick", 10, (args, next) => {
        next(args);
        // 初始按钮
        if (MouseIn(920, 50, 400, 90) && PreferenceSubscreen === "") {
            PreferenceSubscreen = "ChatRoomExSetting";
            CheckOnlineCRESetting();
        }

        if(PreferenceSubscreen == "ChatRoomExSetting")
        {
            // 窗口退出
            if (MouseIn(1815, 75, 90, 90)) 
            {            
                //保存设置
                ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
                PreferenceSubscreenAudioExit();
            }


            // 音量
            if (MouseIn(500, 193, 250, 64)) {
                if (MouseX <= 625) 
                    Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume  = Math.max(Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume - 0.1, 0.1);
                else 
                    Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume  = Math.min(Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume + 0.1, 1);
            }

            // 语速
            if (MouseIn(500, 272, 250, 64)) {
                if (MouseX <= 625) 
                    Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed  = Math.max(Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed - 0.1, 0.1);
                else 
                    Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed  = Math.min(Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed + 0.1, 2);
            }
            // 试听按钮
            if (MouseIn(200, 225, 200, 64)) {
                w.speechSynthesis.cancel();
                let utterThis = new window.SpeechSynthesisUtterance();
                utterThis.text= "星涟说：这是一段试听，喵";
                utterThis.pitch = 2;
                utterThis.rate = Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed;
                utterThis.volume = Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume;
                utterThis.lang = 'zh-CN';

                window.speechSynthesis.speak(utterThis);
            }

            
            // Individual audio check-boxes
            if (MouseXIn(500, 64)) {
                if (MouseYIn(352, 64)) Player.OnlineSettings.CRE.SpeakSetting.SpeakMsgOnlyAboutMe = !Player.OnlineSettings.CRE.SpeakSetting.SpeakMsgOnlyAboutMe;
                if (MouseYIn(432, 64)) Player.OnlineSettings.CRE.SpeakSetting.SpeedLimitLengthChat = !Player.OnlineSettings.CRE.SpeakSetting.SpeedLimitLengthChat;
                if (MouseYIn(512, 64)) Player.OnlineSettings.CRE.SpeakSetting.TestVocals = !Player.OnlineSettings.CRE.SpeakSetting.TestVocals;
                //if (MouseYIn(592, 64)) Player.AudioSettings.Notifications = !Player.AudioSettings.Notifications;
            }
        }        

    });


    function CheckOnlineCRESetting()
    {

        if(Player.OnlineSettings.CRE?.SpeakSetting == null)
        {
            Player.OnlineSettings.CRE = Player.OnlineSettings.CRE || {};

            Player.OnlineSettings.CRE.SpeakSetting = {
                SpeakVolume:1.0,
                SpeakSpeed:1.0,
                SpeakMsgOnlyAboutMe : true,
                SpeedLimitLengthChat : true,                
                TestVocals : true,
            };
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
        }        

        if(Player.OnlineSharedSettings.CRE?.SpeakSetting == null)
        {
            Player.OnlineSharedSettings.CRE = Player.OnlineSharedSettings.CRE || {};

            Player.OnlineSharedSettings.CRE.SpeakSetting = {
                Vocals:"",
                SpeakSpeed:1.0,
                EnableVocal : false,
            };
            ServerAccountUpdate.QueueData({ OnlineSharedSettings: Player.OnlineSharedSettings });
        }            
    }


    // 过滤无法朗读的字符，TODO暂时无法识别末尾个字符
    function ReplaceCharacters(inputString) {
        // 定义替换映射
        var replaceMap = {
        '𝓪': 'a', '𝓫': 'b', '𝓬': 'c', '𝓭': 'd', '𝓮': 'e',
        '𝓯': 'f', '𝓰': 'g', '𝓱': 'h', '𝓲': 'i', '𝓳': 'j',
        '𝓴': 'k', '𝓵': 'l', '𝓶': 'm', '𝓷': 'n', '𝓸': 'o',
        '𝓹': 'p', '𝓺': 'q', '𝓻': 'r', '𝓼': 's', '𝓽': 't',
        '𝓾': 'u', '𝓿': 'v', '𝔀': 'w', '𝔁': 'x', '𝔂': 'y',
        '𝔃': 'z'
        };
    
        // 逐个遍历replaceMap并替换原始字符串
        Object.keys(replaceMap).forEach(function (key) {
        inputString = inputString.replace(new RegExp(key, 'g'), replaceMap[key]);
        });
    
        return inputString;
    }

      // 截断太长的消息
      function TruncateAndAppend(originalString, maxLength) {
        // 定义正则表达式，匹配中英文字符和数字
        var alphanumeric = /[a-zA-Z0-9\u4e00-\u9fa5]/;

        // 初始化计数器和截断位置
        var count = 0;
        var truncateIndex = 0;

        // 遍历字符串，找到截断位置
        for (var i = 0; i < originalString.length; i++) {
          var char = originalString[i];
          if (char.match(alphanumeric)) {
            count++;
          }

            if (count <= maxLength) {
                truncateIndex = i;
            }

        }

        truncateIndex += 1;
        if(truncateIndex == count)
        {
            return [originalString,""];
        }


        // 截断字符串
        var truncatedString = originalString.slice(0, truncateIndex);

        // 计算被截断的字符数
        var truncatedChars = originalString.length - truncateIndex;

        if(truncatedChars == 0)
        {
            return [originalString, ""];
        }

        // 补充字符串
        var appendString = ', 等' + truncatedChars + '字';

        // 返回结果字符串
        return [truncatedString, appendString];
   }


   function PrepareVocals(text, char, index)
   {
        var url = atob("aHR0cHM6Ly92Mi5nZW5zaGludm9pY2UudG9wLw==");
        fetch(url + 'run/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [text, char, 0.2, 0.6, 0.8, 1, 'ZH', null, '', 'Text prompt', '', 0.7],
                fn_index: 0,
            })
        }).then(response =>response.json()).then(data =>{
            //console.log('POST请求成功', data);
            if (data && data.data && data.data[0] === 'Success') {
                var audioFileName = data.data[1].name;
                //console.log('音频文件名:', audioFileName);
                var audio = new Audio(url + 'file=' + audioFileName);
                // 存入缓存
                w.VocalAudio[index] = audio;
                //audio.play();
            } else {
                console.error('请求返回错误:', data);
            }
        }).
        catch(error =>{
            console.error('POST请求失败', error);
        });
   }

   function WaitForAudio(index, callBack)
   {
        if(index in w.VocalAudio)
        {
            callback();
        }

        QueryDictionary(index, w.VocalAudio, (res)=>{callBack();});

   }

   function QueryDictionary(elementToFind, dictionary, callBack) {
    var elapsedTime = 0;
    var interval = 500; // 0.5秒
    var duration = 5000; // 5秒
    function check() {
        elapsedTime += interval;
        //console.log("查询中");
        if (dictionary.hasOwnProperty(elementToFind)) {
            // 查询成功
            clearTimeout(w.WaitDownloadTimer);
            w.WaitDownloadTimer = null;
            callBack(true);
          } else if (elapsedTime >= duration) {
            // 超过持续时间，查询失败
            w.WaitDownloadTimer = null;
            callBack(false);
          } else {
            // 继续定时查询
            w.WaitDownloadTimer = setTimeout(check, interval);
          }
      }
    w.WaitDownloadTimer = setTimeout(check, interval);
  }


    function GetPlayerName(player)
    {
        return player?.Nickname!=null&&player?.Nickname!=''?player?.Nickname:player?.Name;
    }



    console.log("[ChatRoomEx] Load Success");
})();

