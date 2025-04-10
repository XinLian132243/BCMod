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
    var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

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
            if(IsCharacterSpeak(data) && !text.includes(GetPlayerName(Player)))
            {
                const [t, e] = TruncateAndAppend(text, 20);
                text = t;
                endText = e;
            }
        }


        w.WaitSpeakQueue.push({
            VocalIndex : -1,
            Context: 
            [
                {t:senderText, audio: -1},
                {t:text, audio: -1},
                {t:endText, audio: -1},
            ]}
        );

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

        if (w.CurrentSpeakItem.Context?.length > 0) {
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
                DrawButton(965, 785, 40, 40, "🎧", "#FFFFFF");
            }
            else
            {                
                // 绘制关
                DrawButton(965, 785, 40, 40, "🎧", "#444444");
            }
        }
    );

    // 点击房间内按钮
    mod.hookFunction(
        "ChatRoomClick",
        0,
        (args, next) => {
            if (MouseIn(965, 785, 40, 40)) {
                
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
                SpeedLimitLengthChat : true
            };
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
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


   function PrepareVocals(text, char, index, prompt)
   {
        var url = atob("aHR0cHM6Ly92Mi5nZW5zaGludm9pY2UudG9wLw==");
        fetch(url + 'run/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [text, char, 0.2, 0.6, 0.8, 1, 'ZH', null, prompt, 'Text prompt', '', 0.7],
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

