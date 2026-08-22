// ==UserScript==
// @name         BC 聊天室扩展
// @namespace    https://www.bondageprojects.com/
// @version      0.1.2
// @description  聊天室扩展
// @author       XinLian
// @include      /^https:\/\/(www\.)?bondageprojects\.elementfx\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @include      /^https:\/\/(www\.)?bondage-europe\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @grant        none
// @license      MIT
// ==/UserScript==
// ... existing code ...

(function () {
    'use strict';
    if (window.ChatRoomEx) {
        console.warn('[ChatRoomEx] is loaded, skip duplicate imports...');
        return;
    }
    // =======================================================================================
    var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

    const MOD_NAME = "聊天室扩展";
    const MOD_FULL_NAME = "聊天室扩展";
    const MOD_VERSION = "0.1.2";


    const mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });

    // =======================================================================================
    const w = window;
    // =======================================================================================

    // 语音播报模块
    const SpeakModule = (function() {
        // 私有变量
        let waitSpeakQueue = [];
        let vocalAudio = {};
        let enableSpeak = false;
        let vocalIndex = 0;
        let currentSpeakItem = [];
        let currentAudio = null;
        let waitDownloadTimer = null;
        let cachedVoices = [];

        // 私有方法
        // 刷新可用语音列表
        function refreshVoices() {
            cachedVoices = window.speechSynthesis.getVoices();
        }
        // 按 URI 找语音
        function findVoiceByURI(uri) {
            if (!uri) return null;
            return cachedVoices.find(v => v.voiceURI === uri) || null;
        }

        // 统一构造 utterance,读取设置里的 pitch / voice
        function buildUtterance(text) {
            let utterThis = new window.SpeechSynthesisUtterance();
            utterThis.text = replaceCharacters(text);

            const setting = Player.OnlineSettings?.CRE?.SpeakSetting;
            const voice = findVoiceByURI(setting?.SpeakVoiceURI);

            if (voice) {
                utterThis.voice = voice;
                utterThis.lang = voice.lang;
            } else {
                // 未选择 -> 保持原始默认行为
                utterThis.lang = 'zh-CN';
            }

            utterThis.pitch = setting?.SpeakPitch ?? 2; // 原始默认就是 2
            return utterThis;
        }
        // 过滤无法朗读的字符
        function replaceCharacters(inputString) {
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
        function truncateAndAppend(originalString, maxLength) {
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
            if(truncateIndex == count) {
                return [originalString,""];
            }

            // 截断字符串
            var truncatedString = originalString.slice(0, truncateIndex);

            // 计算被截断的字符数
            var truncatedChars = originalString.length - truncateIndex;

            if(truncatedChars == 0) {
                return [originalString, ""];
            }

            // 补充字符串
            var appendString = ', 等' + truncatedChars + '字';

            // 返回结果字符串
            return [truncatedString, appendString];
        }

        // 准备语音
        function prepareVocals(text, char, index, prompt) {
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
            }).then(response => response.json()).then(data => {
                if (data && data.data && data.data[0] === 'Success') {
                    var audioFileName = data.data[1].name;
                    var audio = new Audio(url + 'file=' + audioFileName);
                    // 存入缓存
                    vocalAudio[index] = audio;
                } else {
                    console.error('请求返回错误:', data);
                }
            }).catch(error => {
                console.error('POST请求失败', error);
            });
        }

        // 等待音频加载
        function waitForAudio(index, callBack) {
            if(index in vocalAudio) {
                callBack();
            }
            queryDictionary(index, vocalAudio, (res) => {callBack();});
        }

        // 查询字典
        function queryDictionary(elementToFind, dictionary, callBack) {
            var elapsedTime = 0;
            var interval = 500; // 0.5秒
            var duration = 5000; // 5秒
            function check() {
                elapsedTime += interval;
                if (dictionary.hasOwnProperty(elementToFind)) {
                    // 查询成功
                    clearTimeout(waitDownloadTimer);
                    waitDownloadTimer = null;
                    callBack(true);
                } else if (elapsedTime >= duration) {
                    // 超过持续时间，查询失败
                    waitDownloadTimer = null;
                    callBack(false);
                } else {
                    // 继续定时查询
                    waitDownloadTimer = setTimeout(check, interval);
                }
            }
            waitDownloadTimer = setTimeout(check, interval);
        }

        // 获取玩家名称
        function getPlayerName(player) {
            return player?.Nickname != null && player?.Nickname != '' ? player?.Nickname : player?.Name;
        }

        // 是否是说话的聊天信息
        function isCharacterSpeak(data) {
            return data.Type == "Chat" //聊天
            || data.Type == "Whisper" // 悄悄话
            || data.Type == "LocalMessage"  // 检测Beep
            ;
        }

        // 在聊天房间并且打开了开关
        function isEnableSpeak() {
            if(CurrentScreen != 'ChatRoom') {
                return false;
            }
            return enableSpeak;
        }

        // 说话函数
        function speakDefault(str) {
            let utterThis = buildUtterance(str);
            utterThis.rate = Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed;
            utterThis.volume = Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume;
            utterThis.onend = function () {
                trySpeakNextText();
            };
            window.speechSynthesis.speak(utterThis);
        }

        // 播放语音
        function speakVacal(index) {
            var audio = vocalAudio[index];
            audio.addEventListener('ended', function() {
                trySpeakNextText();
            });
            audio.playbackRate = Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed;
            audio.volume = Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume * 0.2;
            // 播放音频
            audio.play();
        }

        // 尝试播放下一段文本
        function trySpeakNextText() {
            if(!isEnableSpeak()) {
                return;
            }

            if (currentSpeakItem.Context?.length > 0) {
                var nextText = currentSpeakItem.Context.shift();
                if(nextText.audio != -1 && nextText.audio in vocalAudio) {
                    speakVacal(nextText.audio);
                } else {
                    speakDefault(nextText.t);
                }
            } else {
                trySpeakNextItem();
            }
        }

        // 尝试播放下一个项目
        function trySpeakNextItem() {
            if(!isEnableSpeak()) {
                return;
            }

            if (waitSpeakQueue.length > 0
                && !window.speechSynthesis.speaking
                && !(currentAudio != null && currentAudio.paused == false)
                && waitDownloadTimer == null) {
                var nextItem = waitSpeakQueue.shift();
                currentSpeakItem = nextItem;
                if(nextItem.VocalIndex == -1) {
                    trySpeakNextText();
                } else {
                    waitForAudio(nextItem.VocalIndex, trySpeakNextText);
                }
            }
        }

        // 处理消息朗读
        function handleSpeakMsg(data, msg, senderCharacter, metadata) {
            if(!isEnableSpeak()) {
                return;
            }

            // 仅播放以下内容
            if(!(data.Type == "Chat" //聊天
                 || data.Type == "Action"  // 消息
                 || data.Type == "Activity" // 互动
                 || data.Type == "Emote" // 动作
                 || data.Type == "Whisper" // 悄悄话
                 || data.Type == "LocalMessage"  // 检测Beep
                )) {
                // 此外消息不读
                return;
            } else {
                // 除了Beep，自己发出的消息不会朗读
                if(data.Type != "LocalMessage" && Player.MemberNumber == senderCharacter.MemberNumber) {
                    return;
                }
            }

            // 消息和动作只处理跟自己有关的
            // 不包含自己名字的，跳过
            if(Player.OnlineSettings.CRE.SpeakSetting.SpeakMsgOnlyAboutMe) {
                if(data.Type == "Action") {
                    if(!msg.includes(getPlayerName(Player))) {
                        return;
                    }
                }
                // 目标对象不是自己的，跳过
                if(data.Type == "Activity"
                   && metadata?.TargetMemberNumber != Player.MemberNumber) {
                    return;
                }
            }

            var senderName = getPlayerName(senderCharacter);
            var text = msg;
            var senderText = "";
            var endText = "";

            if(data.Type == "Chat") {
                senderText = senderName + "说：";
            }

            if(data.Type == "Whisper") {
                senderText = senderName + "悄悄说：";
            }

            if(data.Type == "LocalMessage") {
                // 本地消息处理Beep
                if(msg.includes("bce-beep")) {
                    var beep = /好友私聊来自 (.+)\(\d+\); 以及以下信息:(.+)/.exec(msg);
                    if (beep?.length > 0) {
                        senderText = beep[1] + "私聊说：" ;
                        text = beep[2];
                    }

                    beep = /好友私聊来自 (.+)\(\d+\) 位于房间 \"(.+)\"; 以及以下信息:(.+)/.exec(msg);
                    if (beep?.length > 0) {
                        senderText = beep[1] + "在房间" + beep[2] + "私聊说：";
                        text = beep[3];
                    }
                } else {
                    return;
                }
            }

            // 如果是聊天信息，最多二十个字
            if(Player.OnlineSettings.CRE.SpeakSetting.SpeedLimitLengthChat) {
                if(isCharacterSpeak(data) && !text.includes(getPlayerName(Player))) {
                    const [t, e] = truncateAndAppend(text, 20);
                    text = t;
                    endText = e;
                }
            }

            waitSpeakQueue.push({
                VocalIndex: -1,
                Context: [
                    {t: senderText, audio: -1},
                    {t: text, audio: -1},
                    {t: endText, audio: -1},
                ]
            });

            trySpeakNextItem();
        }

        // 公开接口
        return {
            init: function() {
                // 初始化模块
                enableSpeak = false;
                waitSpeakQueue = [];
                vocalAudio = {};
                currentSpeakItem = [];
                currentAudio = null;
                waitDownloadTimer = null;
                refreshVoices();
                window.speechSynthesis.onvoiceschanged = refreshVoices;
            },

            // 获取可选的中文语音列表(给设置页用)
            getSelectableVoices: function() {
                return cachedVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('zh'));
            },

            handleMessage: function(data, msg, senderCharacter, metadata) {
                handleSpeakMsg(data, msg, senderCharacter, metadata);
            },

            toggleSpeak: function() {
                if(enableSpeak) {
                    enableSpeak = false;
                    // 同时停止正在的播放
                    waitSpeakQueue = [];
                    window.speechSynthesis.cancel();
                    return false;
                } else {
                    enableSpeak = true;
                    speakDefault("开启播报");
                    return true;
                }
            },

            isSpeakEnabled: function() {
                return enableSpeak;
            },

            testSpeak: function() {
                window.speechSynthesis.cancel();
                let utterThis = buildUtterance("星涟说：这是一段试听，喵");
                utterThis.rate = Player.OnlineSettings.CRE.SpeakSetting.SpeakSpeed;
                utterThis.volume = Player.OnlineSettings.CRE.SpeakSetting.SpeakVolume;
                window.speechSynthesis.speak(utterThis);
            },
        };
    })();

    // 初始化语音模块
    SpeakModule.init();

    mod.hookFunction("ChatRoomMessageDisplay", 4, (args, next) => {
        var data = args[0];
        var msg = args[1];
        var SenderCharacter = args[2];
        var metadata = args[3];

        // 使用语音模块处理消息
        SpeakModule.handleMessage(data, msg, SenderCharacter, metadata);

        return next(args);
    });

    // 同步顶部菜单按钮（每帧 ChatRoomDraw 都会调用 ChatRoomTopMenuSync）
    mod.hookFunction(
        "ChatRoomTopMenuSync",
        0,
        (args, next) => {
            next(args);

            const bar = document.getElementById("chat-room-top-menu");
            if (!bar || bar.hasAttribute("hidden")) return;

            const btnId = "cre-speak-btn";
            // replaceChildren 会清空菜单，所以每次都要重建
            if (!document.getElementById(btnId)) {
                const enabled = SpeakModule.isSpeakEnabled();
                const btn = ElementButton.Create(
                    btnId,
                    () => {
                        CheckOnlineCRESetting();
                        SpeakModule.toggleSpeak();
                        // 点击后立刻同步颜色状态（Limited=黄色高亮/开启，Default=白色/关闭）
                        const b = document.getElementById(btnId);
                        if (b) b.dataset.color = SpeakModule.isSpeakEnabled() ? "Limited" : "Default";
                    },
                    {
                        tooltip: "语音播报开关",
                        label: "🎧",
                        labelPosition: "center",
                        noStyling: false,
                    },
                    {
                        button: {
                            classList: ["chat-room-top-menu-btn"],
                            dataAttributes: { color: enabled ? "Limited" : "Default" },
                        },
                    }
                );
                bar.appendChild(btn);
            } else {
                // 按钮已存在时，每帧同步颜色状态（防止外部状态变化未反映）
                const existingBtn = document.getElementById(btnId);
                if (existingBtn) {
                    existingBtn.dataset.color = SpeakModule.isSpeakEnabled() ? "Limited" : "Default";
                }
            }
        }
    );

    // 定义设置界面类
class ChatRoomExSettingScreen {
    constructor() {
        this.settings = {
            SpeakSetting: {
                SpeakVolume: 1.0,
                SpeakSpeed: 1.0,
                SpeakPitch: 2,
                SpeakVoiceURI: "",
                SpeakMsgOnlyAboutMe: true,
                SpeedLimitLengthChat: true
            }
        };

        this.voiceSelectId = "cre-voice-select";
        this.volumeSliderId = "cre-volume-slider";
        this.speedSliderId = "cre-speed-slider";
        this.pitchSliderId = "cre-pitch-slider";
        this.elementsCreated = false;

        // ---- 统一坐标表(全部左上角锚点,自己手动换算,不依赖游戏内置定位函数) ----
        this.LABEL_X = 500;      // 文字左边界
        this.CTRL_X = 720;       // 控件左边界(统一,滑桿和下拉都用这个)
        this.CTRL_W = 300;       // 滑桿宽度
        this.CTRL_H = 48;        // 滑桿/下拉 高度
        this.SELECT_W = 600;     // 下拉菜单宽度(原250的200%再取整)
        this.PCT_GAP = 30;       // 控件右边缘到百分比数字的间距
        this.NOTE_X = this.CTRL_X + this.CTRL_W + this.PCT_GAP + 100; // 百分比数字再往右一些

        this.BTN_Y = 200;        // 试听按钮 Y(不变)
        this.BTN_H = 64;

        this.ROW_GAP = 75;       // 每行间距
        this.ROW_VOICE = this.BTN_Y;                     // 语音角色跟试听同一 Y
        this.ROW_VOLUME = this.ROW_VOICE + this.ROW_GAP;
        this.ROW_SPEED = this.ROW_VOLUME + this.ROW_GAP;
        this.ROW_PITCH = this.ROW_SPEED + this.ROW_GAP;
        this.ROW_CHECKBOX = this.ROW_PITCH + this.ROW_GAP;
    }

    // 行中心文字 Y(让文字和同一行的控件垂直居中对齐)
    rowCenterY(rowY, height) {
        return rowY + height / 2;
    }

    // 定位工具:不用游戏内置函数,自己按画布缩放比例换算,保证所有控件锚点一致(左上角)
    positionOverCanvas(id, x, y, width, height) {
        const canvas = document.getElementById("MainCanvas") || document.querySelector("canvas");
        const el = document.getElementById(id);
        if (!canvas || !el) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = rect.width / 2000;
        const scaleY = rect.height / 1000;
        el.style.position = "fixed";
        el.style.left = (rect.left + x * scaleX) + "px";
        el.style.top = (rect.top + y * scaleY) + "px";
        el.style.width = (width * scaleX) + "px";
        el.style.height = (height * scaleY) + "px";
        el.style.margin = "0";
        el.style.boxSizing = "border-box"; // 保证 width/height 已包含边框,不同控件左边缘才会真正对齐
        el.style.zIndex = 100;
    }

    createElements() {
        if (this.elementsCreated) return;

        const select = document.createElement("select");
        select.id = this.voiceSelectId;
        select.addEventListener("change", () => {
            this.settings.SpeakSetting.SpeakVoiceURI = select.value;
        });
        document.body.appendChild(select);
        this.populateVoiceOptions();
        window.speechSynthesis.onvoiceschanged = () => this.populateVoiceOptions();

        const volumeSlider = document.createElement("input");
        volumeSlider.type = "range";
        volumeSlider.id = this.volumeSliderId;
        volumeSlider.min = "10";
        volumeSlider.max = "100";
        volumeSlider.step = "1";
        volumeSlider.value = String(Math.round(this.settings.SpeakSetting.SpeakVolume * 100));
        volumeSlider.addEventListener("input", () => {
            this.settings.SpeakSetting.SpeakVolume = Number(volumeSlider.value) / 100;
        });
        document.body.appendChild(volumeSlider);

        const speedSlider = document.createElement("input");
        speedSlider.type = "range";
        speedSlider.id = this.speedSliderId;
        speedSlider.min = "10";
        speedSlider.max = "200";
        speedSlider.step = "1";
        speedSlider.value = String(Math.round(this.settings.SpeakSetting.SpeakSpeed * 100));
        speedSlider.addEventListener("input", () => {
            this.settings.SpeakSetting.SpeakSpeed = Number(speedSlider.value) / 100;
        });
        document.body.appendChild(speedSlider);

        const pitchSlider = document.createElement("input");
        pitchSlider.type = "range";
        pitchSlider.id = this.pitchSliderId;
        pitchSlider.min = "10";
        pitchSlider.max = "100";
        pitchSlider.step = "1";
        pitchSlider.value = String(Math.round(this.settings.SpeakSetting.SpeakPitch / 2 * 100));
        pitchSlider.addEventListener("input", () => {
            this.settings.SpeakSetting.SpeakPitch = (Number(pitchSlider.value) / 100) * 2;
        });
        document.body.appendChild(pitchSlider);

        this.elementsCreated = true;
    }

    populateVoiceOptions() {
        const select = document.getElementById(this.voiceSelectId);
        if (!select) return;
        const currentValue = this.settings.SpeakSetting.SpeakVoiceURI;
        select.innerHTML = "";

        const autoOpt = document.createElement("option");
        autoOpt.value = "";
        autoOpt.text = "自动(默认)";
        select.appendChild(autoOpt);

        SpeakModule.getSelectableVoices().forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.voiceURI;
            opt.text = v.name.replace("Microsoft ", "").split(" - ")[0] + (v.localService ? "" : "(需要联网)");
            select.appendChild(opt);
        });

        select.value = currentValue;
        if (select.value !== currentValue) {
            this.settings.SpeakSetting.SpeakVoiceURI = "";
        }
    }

    positionElements() {
        this.positionOverCanvas(this.voiceSelectId, this.CTRL_X, this.ROW_VOICE, this.SELECT_W, this.CTRL_H);
        this.positionOverCanvas(this.volumeSliderId, this.CTRL_X, this.ROW_VOLUME, this.CTRL_W, this.CTRL_H);
        this.positionOverCanvas(this.speedSliderId, this.CTRL_X, this.ROW_SPEED, this.CTRL_W, this.CTRL_H);
        this.positionOverCanvas(this.pitchSliderId, this.CTRL_X, this.ROW_PITCH, this.CTRL_W, this.CTRL_H);

        [this.voiceSelectId, this.volumeSliderId, this.speedSliderId, this.pitchSliderId].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "";
        });

        const volumeSlider = document.getElementById(this.volumeSliderId);
        if (volumeSlider && document.activeElement !== volumeSlider) {
            volumeSlider.value = String(Math.round(this.settings.SpeakSetting.SpeakVolume * 100));
        }
        const speedSlider = document.getElementById(this.speedSliderId);
        if (speedSlider && document.activeElement !== speedSlider) {
            speedSlider.value = String(Math.round(this.settings.SpeakSetting.SpeakSpeed * 100));
        }
        const pitchSlider = document.getElementById(this.pitchSliderId);
        if (pitchSlider && document.activeElement !== pitchSlider) {
            pitchSlider.value = String(Math.round(this.settings.SpeakSetting.SpeakPitch / 2 * 100));
        }
    }

    removeElements() {
        [this.voiceSelectId, this.volumeSliderId, this.speedSliderId, this.pitchSliderId].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });
    }

    Run() {
        this.createElements();
        this.positionElements();

        MainCanvas.textAlign = "left";
        DrawText("- 房间朗读设置 -", 500, 125, "Black", "Gray");

        // 试听按钮 文字另外繪製
        DrawButton(200, this.BTN_Y, 200, this.BTN_H, "", "#FFFFFF");
        DrawText("🎧 试听", 240, this.rowCenterY(this.BTN_Y, this.BTN_H), "Black", "White");

        // 语音角色
        DrawText("语音角色", this.LABEL_X, this.rowCenterY(this.ROW_VOICE, this.CTRL_H), "Black", "Gray");

        // 朗读音量
        DrawText("朗读音量", this.LABEL_X, this.rowCenterY(this.ROW_VOLUME, this.CTRL_H), "Black", "Gray");
        DrawText(
            Math.round(this.settings.SpeakSetting.SpeakVolume * 100) + "%",
            this.CTRL_X + this.CTRL_W + this.PCT_GAP,
            this.rowCenterY(this.ROW_VOLUME, this.CTRL_H),
            "Black", "White"
        );

        // 朗读语速
        DrawText("朗读语速", this.LABEL_X, this.rowCenterY(this.ROW_SPEED, this.CTRL_H), "Black", "Gray");
        DrawText(
            Math.round(this.settings.SpeakSetting.SpeakSpeed * 100) + "%",
            this.CTRL_X + this.CTRL_W + this.PCT_GAP,
            this.rowCenterY(this.ROW_SPEED, this.CTRL_H),
            "Black", "White"
        );

        // 朗读语调
        DrawText("朗读语调", this.LABEL_X, this.rowCenterY(this.ROW_PITCH, this.CTRL_H), "Black", "Gray");
        DrawText(
            Math.round(this.settings.SpeakSetting.SpeakPitch / 2 * 100) + "%",
            this.CTRL_X + this.CTRL_W + this.PCT_GAP,
            this.rowCenterY(this.ROW_PITCH, this.CTRL_H),
            "Black", "White"
        );
        DrawText(
            "(部分语音引擎不支持音调调整)",
            this.NOTE_X,
            this.rowCenterY(this.ROW_PITCH, this.CTRL_H),
            "Gray", "Gray"
        );

        // 复选框
        DrawCheckbox(this.LABEL_X, this.ROW_CHECKBOX, 64, 64,
            "过长对话省略",
            this.settings.SpeakSetting.SpeedLimitLengthChat
        );
        DrawCheckbox(1000, this.ROW_CHECKBOX, 64, 64,
            "仅播放与自己有关的互动和消息",
            this.settings.SpeakSetting.SpeakMsgOnlyAboutMe
        );

        MainCanvas.textAlign = "center";
        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
    }

    Click() {
        if (MouseIn(200, this.BTN_Y, 200, this.BTN_H)) {
            Player.OnlineSettings.CRE.SpeakSetting = this.settings.SpeakSetting;
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
            SpeakModule.testSpeak();
        }

        if (MouseXIn(this.LABEL_X, 64) && MouseYIn(this.ROW_CHECKBOX, 64)) {
            this.settings.SpeakSetting.SpeedLimitLengthChat = !this.settings.SpeakSetting.SpeedLimitLengthChat;
        }
        if (MouseXIn(1000, 64) && MouseYIn(this.ROW_CHECKBOX, 64)) {
            this.settings.SpeakSetting.SpeakMsgOnlyAboutMe = !this.settings.SpeakSetting.SpeakMsgOnlyAboutMe;
        }

        if (MouseIn(1815, 75, 90, 90)) {
            this.Exit();
        }
        return false;
    }

    Exit() {
        Player.OnlineSettings.CRE = {
            SpeakSetting: this.settings.SpeakSetting,
        };
        ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
        this.removeElements();
        PreferenceSubscreenExtensionsClear();
        return true;
    }

    Unload() {
        this.removeElements();
    }
}


    // 创建设置界面实例
    const screen = new ChatRoomExSettingScreen();

    PreferenceRegisterExtensionSetting({
        Identifier: "ChatRoomEx",
        Image: "Icons/Audio.png",
        ButtonText: "语音朗读扩展",
        load: () => {
            if (Player.OnlineSettings.CRE) {
                screen.settings = {
                    SpeakSetting: {
                        SpeakVolume: Player.OnlineSettings.CRE.SpeakSetting?.SpeakVolume ?? 1.0,
                        SpeakSpeed: Player.OnlineSettings.CRE.SpeakSetting?.SpeakSpeed ?? 1.0,
                        SpeakPitch: Player.OnlineSettings.CRE.SpeakSetting?.SpeakPitch ?? 2,
                        SpeakVoiceURI: Player.OnlineSettings.CRE.SpeakSetting?.SpeakVoiceURI ?? "",
                        SpeakMsgOnlyAboutMe: Player.OnlineSettings.CRE.SpeakSetting?.SpeakMsgOnlyAboutMe ?? true,
                        SpeedLimitLengthChat: Player.OnlineSettings.CRE.SpeakSetting?.SpeedLimitLengthChat ?? true
                    }
                };
            }
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

    function CheckOnlineCRESetting() {
        if(Player.OnlineSettings.CRE?.SpeakSetting == null) {
            Player.OnlineSettings.CRE = Player.OnlineSettings.CRE || {};
            Player.OnlineSettings.CRE.SpeakSetting = {
                SpeakVolume: 1.0,
                SpeakSpeed: 1.0,
                SpeakPitch: 2,
                SpeakVoiceURI: "",
                SpeakMsgOnlyAboutMe: true,
                SpeedLimitLengthChat: true
            };
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
        }
    }

    window.ChatRoomEx = MOD_VERSION;
    console.log("[ChatRoomEx] Load Success");
})();
