// ==UserScript==
// @name         BC 涟信
// @namespace    https://www.bondageprojects.com/
// @version      0.1.1
// @description  涟信
// @author       XinLian
// @match https://*.bondageprojects.elementfx.com/R*/*
// @match https://*.bondage-europe.com/R*/*
// @match https://*.bondageprojects.com/R*/*
// @grant        none
// @license      MIT
// ==/UserScript==


(function () {
    'use strict';
    // =======================================================================================
    var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

    const MOD_NAME = "涟信";
    const MOD_FULL_NAME = "涟信";
    const MOD_VERSION = "0.1.1";


    const mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });

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
            if (Player.OnlineSettings.LCData.MessageSetting.HidePrivateChat === HidePrivateChatEnum.HIDE_WHEN_SHOW_DIALOG
                && MessageModule.isMessageDialogVisible())
            {
                return;
            }
            if (Player.OnlineSettings.LCData.MessageSetting.HidePrivateChat === HidePrivateChatEnum.HIDE_ALL_TIME)
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


    // 需要处理键盘事件的函数列表
    const keyDownFunctions = [
        "ChatRoomKeyDown",
        "ChatSearchKeyDown", 
        "ChatRoomMapViewKeyDown"
    ];

    // 为每个函数添加相同的处理逻辑
// ... existing code ...
keyDownFunctions.forEach(funcName => {
    mod.hookFunction(
        funcName,
        99,
        (args, next) => {                
            const event = args[0];
            // 如果消息对话框显示且按下Escape键
            if (MessageModule.isMessageDialogVisible() && event.key === 'Escape') {
                MessageModule.toggleMessageDialog();
                return false;
            }
            // 如果焦点在消息输入框上
            if (document.activeElement?.id?.startsWith("LC-Message")) {
                return false;
            }
            return next(args);
        }
    );
});
    

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
                        store.put(item).onsuccess = putNext;
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

    // 消息对话框模块
    const MessageModule = (function() {
        // 私有变量
        let messageDialog = null;
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
                if (isInCurrentRoom) {
                    if (parseInt(memberNumber) === Player.MemberNumber) {
                        return `位于 ${ChatRoomData?.Name || "当前房间"}`;
                    } else {
                        return "位于 当前房间";
                    }
                }
            }

            // 如果不在房间，则什么也不显示
            if (parseInt(memberNumber) === Player.MemberNumber) {
                return ``;
            }
            
            const friendInfo = onlineFriendsCache.find(f => f.MemberNumber === parseInt(memberNumber));
            if (friendInfo) {
                return "位于 " + getRoomLocationText(friendInfo);
            } else if (isFriend(memberNumber)) {
                // 是好友但不在在线好友列表中
                return "离线";
            } else {
                // 既不是好友也不在同一个房间
                return "已离开";
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
                    location = `[私] ${friendInfo.ChatRoomName}`;
                } else {
                    location = `${friendInfo.ChatRoomName}`;
                }
            } else if (friendInfo.Private) {
                // 无房间名但是私有房间
                location = `[私人房间]`;
            } else {
                // 既无房间名也不是私有房间
                location = `大厅`;
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
                dialog.style.left = '10%';
                dialog.style.top = '5%';
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
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'row';
        this.element.style.padding = '8px 5px';
        this.element.style.cursor = 'pointer';
        this.element.style.borderRadius = '4px';
        this.element.style.gap = '10px';

        // 创建子元素
        this.avatarContainer = null;
        this.contentContainer = document.createElement('div');
        this.firstRow = document.createElement('div');
        this.secondRow = document.createElement('div');
        this.nameContainer = document.createElement('div');
        this.nameSpan = document.createElement('span');
        this.timeContainer = document.createElement('div');
        this.previewContainer = document.createElement('div');
        this.unreadIndicator = document.createElement('div');

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

    update(memberNumber, chatHistory, selectedSenderNum) {
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

        // 更新互动状态样式
        const canInteract = isBeepAvailable(memberNumber) || 
                            isWhisperAvailable(memberNumber);
        
        if (canInteract) {
            this.nameSpan.style.color = '#000000';
            this.nameSpan.style.fontWeight = 'bold';
        } else {
            this.nameSpan.style.color = '#888888';
            this.nameSpan.style.fontWeight = 'normal';
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
                    text: '取消置顶',
                    action: () => {
                        messageHistory[memberNumber].pinnedTime = 0;
                        messageDialog.updateSenderList();
                        LCDataStorage.updateSenderState(memberNumber, messageHistory[memberNumber]);
                    }
                });
            } else {
                options.push({
                    text: '置顶',
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
                text: '不显示',
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
                text: '删除聊天记录',
                action: () => {
                    if (confirm(`确定要删除与 ${getCharacterName(memberNumber)} 的所有聊天记录吗？此操作不可恢复。`)) {
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
                    content: `需要先离开房间`,
                }, e); 
            }
            else
            {
                createMouseConfirmDialog({
                    content: `进入房间 ${this.lastRoomName}？`,
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
            const pinnedRooms = Player.OnlineSettings?.LCData?.MessageSetting?.PinnedRooms || {};
            if (pinnedRooms[this.lastRoomName] !== undefined) {
                delete pinnedRooms[this.lastRoomName];
            } else {
                pinnedRooms[this.lastRoomName] = Date.now();
            }
            messageDialog.updateAddSenderLists();
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
        });
    }

    /**
     * 更新房间项
     * @param {Object} room - 房间对象
     */
    update(room) {
        
        const pinnedRoomsDict = Player.OnlineSettings?.LCData?.MessageSetting?.PinnedRooms || {};

        // 更新内容
        this.memberCountSpan.textContent = `${room.MemberCount}/${room.MemberLimit}`;
        this.nameSpan.textContent = room.Name;
        if (room.Locked) {
            this.nameSpan.textContent = '[锁] ' + room.Name;
        }
        if (room.Private) {
            this.nameSpan.textContent = '[私] ' + room.Name;
        }
        this.creatorSpan.textContent = `- ${room.Creator}`;
        this.descRow.textContent = room.Description || '';

        // 置顶按钮样式和title更新
        const isPinned = pinnedRoomsDict[room.Name] !== undefined;
        const cantJoin = !room.CanJoin || room.MemberCount >= room.MemberLimit;
        this.IsCurrentRoom = room.Name == ChatRoomData?.Name;

        this.pinButton.textContent = isPinned ? '★' : '☆';
        this.pinButton.title = isPinned ? '取消标星' : '标星房间';
        this.pinButton.style.background = isPinned ? '#e6f4ff' : '#f5f5f5';
        this.pinButton.style.color = isPinned ? '#2196f3' : '#888';
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
                messageDialog.updateSenderList();
                messageDialog.updateMessageContent();
                messageDialog.hideAddSenderInterface();
                loadSenderInputState(memberNumber);
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
            
            // 根据设备类型设置不同的大小和位置
            if (!CommonIsMobile) {
                // 桌面设备
                messageDialog.style.width = '45%';
                messageDialog.style.height = '60%';
            } else {
                // 移动设备
                messageDialog.style.width = '80%';
                messageDialog.style.height = '50%';
            }
            
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
            settingsButton.style.display = 'flex-end';
            settingsButton.style.alignItems = 'center';
            settingsButton.style.justifyContent = 'center';
            settingsButton.style.padding = '0';
            settingsButton.style.marginLeft = '0';
            settingsButton.style.marginRight = '10px'; // 与关闭按钮间隔

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
            closeButton.style.marginLeft = '10px';
            
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
            
            // 内容区域容器
            const contentContainer = document.createElement('div');
            contentContainer.style.display = 'flex';
            contentContainer.style.flexGrow = '1';
            contentContainer.style.overflow = 'hidden';
            
            // 左侧发送者列表
            const senderList = document.createElement('div');
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
            searchInput.placeholder = '搜索消息成员';
            searchInput.style.width = '100%';
            searchInput.style.padding = '6px';
            searchInput.style.border = '1px solid #ddd';
            searchInput.style.borderRadius = '4px';
            searchInput.style.boxSizing = 'border-box';
            
            // 添加搜索事件监听
            searchInput.addEventListener('input', function() {
                updateSenderList();
            });

            // 添加加号按钮
            const friendButton = document.createElement('button');
            friendButton.style.width = '32px';
            friendButton.style.height = '32px';
            friendButton.style.border = '1px solid #ddd';
            friendButton.style.borderRadius = '4px';
            friendButton.style.cursor = 'pointer';
            friendButton.style.backgroundColor = '#f5f5f5';
            friendButton.style.display = 'flex';
            friendButton.style.alignItems = 'center';
            friendButton.style.justifyContent = 'center';
            friendButton.style.fontSize = '10px'; // 调小字体
            friendButton.style.gap = '2px'; // 图标和数字间距

            // 创建图标和数字显示
            const iconSpan = document.createElement('span');
            iconSpan.textContent = '👤';
            iconSpan.style.fontSize = '12px';

            const countSpan = document.createElement('span');
            countSpan.style.fontSize = '10px';
            countSpan.style.color = '#666';

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
            headerContainer.style.backgroundColor = 'white';
            headerContainer.style.padding = '10px 15px';
            headerContainer.style.borderBottom = '1px solid #ddd';
            
            const header = document.createElement('h3');
            header.style.margin = '0';
            
            headerContainer.appendChild(header);
            
            // 消息内容区域
            const messageContent = document.createElement('div');
            messageContent.style.flexGrow = '1';
            messageContent.style.padding = '15px';
            messageContent.style.overflowY = 'auto';

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
            inputField.placeholder = '输入消息...';
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

            const whisperText = document.createTextNode('悄悄话');
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

            const beepText = document.createTextNode('私聊');
            beepLabel.appendChild(beepRadio);
            beepLabel.appendChild(beepText);

            messageTypeSelector.appendChild(whisperLabel);
            messageTypeSelector.appendChild(beepLabel);

            // 发送按钮
            const sendButton = document.createElement('button');
            sendButton.textContent = '发送';
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
                    // 更新消息内容
                    updateMessageContent();
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
                    noSenders.textContent = '暂无消息记录';
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
                
                // 创建排序后的发送者列表
                let hasVisibleSenders = false;
                for (const sender of senders) {
                    const memberNumber = parseInt(sender.memberNumber);
                    // 搜索匹配逻辑
                    let isMatch = false;
                    
                    // 如果没有搜索关键词，则默认匹配
                    if (!searchKeyword) {
                        isMatch = true;
                    } else {
                        // 匹配会员编号
                        if (memberNumber.toString().includes(searchKeyword)) {
                            isMatch = true;
                        } else {
                            // 获取角色名称和昵称
                            const senderName = getCharacterName(memberNumber).toLowerCase();
                            if (senderName.includes(searchKeyword)) {
                                isMatch = true;
                            } else {
                                // 检查playerCache中的所有可能匹配项
                                const cachedInfo = getAndUpdateCharacterCache(memberNumber).cache;
                                if (cachedInfo) {
                                    // 检查Name
                                    if (cachedInfo.Name && cachedInfo.Name.toLowerCase().includes(searchKeyword)) {
                                        isMatch = true;
                                    }
                                    // 检查Nickname
                                    else if (cachedInfo.Nickname && cachedInfo.Nickname.toLowerCase().includes(searchKeyword)) {
                                        isMatch = true;
                                    }
                                }
                            }
                        }
                    }
                    
                    // 如果不匹配，跳过此发送者
                    if (!isMatch) {
                        continue;
                    }
                    
                    hasVisibleSenders = true;
                    const chatHistory = messageHistory[memberNumber] || { messages: [], isHidden: false };
        
                    if (!chatHistory.isHidden) {
                        const senderItem = senderItemPool.getItem(memberNumber);
                        senderItem.update(memberNumber, chatHistory, selectedSenderNum);
                        scrollableContainer.appendChild(senderItem.element);
                    }
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
                    tipElement.textContent = '超出显示范围的消息请下载后查看';
                    messageContent.appendChild(tipElement);
                }
                
                // 只显示最近的50条消息
                const recentMessages = chatHistory.messages.slice(-config.maxMessageCount);
                displayMessages(recentMessages);
                
                // 滚动到底部
                setTimeout(() => {
                    messageContent.scrollTop = messageContent.scrollHeight;
                }, 10);
            }

            // 显示"无选择"消息
            function showNoSelectionMessage() {
                const noSelection = document.createElement('div');
                noSelection.textContent = '请选择一个发送者查看消息';
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
                noMessages.textContent = '暂无消息';
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
                addSenderSearchInput.placeholder = '搜索...';
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
                searchContainer.className = 'search-container';

                // 按钮配置数组
                const modeButtons = [
                    { mode: 'friend', text: '好友' },
                    { mode: 'room', text: '房间' },
                    { mode: 'lobby', text: '大厅' }
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
                        if (currentMode === mode) {
                            btn.style.background = '#e6f4ff';
                            btn.style.color = 'black';
                        } else {
                            btn.style.background = 'white';
                            btn.style.color = 'black';
                        }
                    });
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
                : Player.OnlineSettings.LCData.MessageSetting.SetRoomSpace;

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
                    Player.OnlineSettings.LCData.MessageSetting.SetRoomSpace = roomSpaceMap[roomSpaceOptions[roomSpaceIndex]];
                    ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
                    
                }
                roomSpaceLeftBtn.addEventListener('click', () => {
                    roomSpaceIndex = (roomSpaceIndex + roomSpaceOptions.length - 1) % roomSpaceOptions.length;
                    updateroomSpaceDisplay();
                    sendUpdateRoomListOnShow(); 
                });
                roomSpaceRightBtn.addEventListener('click', () => {
                    roomSpaceIndex = (roomSpaceIndex + 1) % roomSpaceOptions.length;
                    updateroomSpaceDisplay();
                    sendUpdateRoomListOnShow();
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

                    createMemberList(allFriendNumbers, container);
                } 
                else if (mode === 'lobby') 
                {
                    createRoomList(searchRoomListResult, container)
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
                    sendQueryOnlineRoomListData(searchInput.value, roomSpace);
                }
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
                panel.style.backgroundColor = 'white';
                panel.style.border = '1px solid #ddd';
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
                numberSpan.style.color = '#888';
                numberSpan.style.fontSize = '14px';
                nameContainer.appendChild(numberSpan);

                // 房间信息
                const roomInfo = document.createElement('div');
                roomInfo.textContent = getCharacterRoomInfo(memberNumber);
                roomInfo.style.color = '#666';
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
                currentSignature.textContent = getCharacterInfo(memberNumber).Signature || '暂无签名';
                currentSignature.style.color = '#666';
                currentSignature.style.fontSize = '14px';
                currentSignature.style.padding = '8px';
                currentSignature.style.backgroundColor = '#f9f9f9';
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
                    divider.style.borderTop = '1px solid #ddd';
                    signatureRow.appendChild(divider);

                    // 签名输入框
                    const signatureInput = document.createElement('textarea');
                    signatureInput.value = getCharacterInfo(memberNumber).Signature || ''; // 设置当前签名
                    signatureInput.placeholder = '输入新的签名...（最多50字）';
                    signatureInput.maxLength = 50; // 限制最大字数
                    signatureInput.style.width = '100%';
                    signatureInput.style.height = '60px';
                    signatureInput.style.padding = '8px';
                    signatureInput.style.border = '1px solid #ddd';
                    signatureInput.style.borderRadius = '4px';
                    signatureInput.style.resize = 'none';
                    signatureInput.style.marginBottom = '10px';
                    signatureRow.appendChild(signatureInput);

                    // 头像URL输入框
                    const avatarUrlInput = document.createElement('input');
                    avatarUrlInput.type = 'text';
                    avatarUrlInput.value = getCharacterInfo(memberNumber).Avatar || ''; // 设置当前头像URL
                    avatarUrlInput.placeholder = '输入头像地址...';
                    signatureInput.maxLength = 100; // 限制最大字数
                    avatarUrlInput.style.width = '100%';
                    avatarUrlInput.style.padding = '8px';
                    avatarUrlInput.style.border = '1px solid #ddd';
                    avatarUrlInput.style.borderRadius = '4px';
                    avatarUrlInput.style.marginBottom = '5px';
                    signatureRow.appendChild(avatarUrlInput);

                    // 添加可用网站提示
                    const websiteTip = document.createElement('div');
                    websiteTip.textContent = '此处查看目前头像可用网站';
                    websiteTip.style.color = '#666';
                    websiteTip.style.fontSize = '12px';
                    websiteTip.style.marginBottom = '10px';
                    websiteTip.style.cursor = 'help';
                    websiteTip.title = config.allowedImageHosts.join('\n');
                    signatureRow.appendChild(websiteTip);
                    
                    // 保存按钮
                    const saveButton = document.createElement('button');
                    saveButton.textContent = '保存';
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
                            alert(`不可用的图片URL，请使用以下网站：\n${config.allowedImageHosts.join('\n')}`);
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
            function createMemberList(memberNumbers, container) {
                memberNumbers.forEach(memberNumber => {
                    // 使用createCharacterSmallInfoPanel创建成员项
                    const memberItem = createCharacterSmallInfoPanel(memberNumber);
                    
                    // 添加按钮样式
                    memberItem.style.cursor = 'pointer';
                    memberItem.style.transition = 'background-color 0.2s';
                    memberItem.style.border = '1px solid #ddd';
                    memberItem.style.borderRadius = '4px';
                    memberItem.style.padding = '8px';
                    memberItem.style.marginBottom = '4px';
                    memberItem.style.backgroundColor = '#fafafa';
                    memberItem.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    // 添加悬停效果
                    memberItem.addEventListener('mouseover', function() {
                        this.style.backgroundColor = '#e6e6e6';
                    });
                    
                    memberItem.addEventListener('mouseout', function() {
                        this.style.backgroundColor = '#fafafa';
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

                const pinnedRoomsDict = Player.OnlineSettings?.LCData?.MessageSetting?.PinnedRooms || {};

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

                // 添加新的发送者
                // 先异步LCDataStorage查询消息数量（回调形式）
                LCDataStorage.getPlayerMessageCount(memberNumber).then(msgCount => {
                    if (msgCount > 0) {
                        // 有历史消息，异步获取并填充
                        LCDataStorage.getPlayerMessages(memberNumber, config.maxMessageCount).then(msgs => {
                            messageHistory[memberNumber] = {
                                messages: msgs,
                                orderTimeStamp: Date.now()
                            };
                            changeSelectedSender(memberNumber);
                            update();
                        });
                    } else {
                        // 没有历史消息，初始化为空
                        messageHistory[memberNumber] = {
                            messages: [],
                            orderTimeStamp: Date.now()
                        };
                        changeSelectedSender(memberNumber);
                        update();
                    }
                });
            }
            
            // 创建单个消息项
            function createMessageItem(msg) {
                const messageItem = document.createElement('div');
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
                const urlRegex = /(https?:\/\/[^\s]+)/g;
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
                            text: '进入 ' + roomName + '',
                            roomName: roomName,
                            enabled : entered,
                            callback: function() {
                                createConfirmDialog({
                                    content: `是否传送至房间 "${roomName}" ？`,
                                    confirmText: '进入',
                                    cancelText: '取消',
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
                    if (processedContent.includes('邀请你成为好友')) {
                        // 判断status和status.addedFriend
                        const addedFriend = message.status && message.status.addedFriend === true;
                        if (!isFriend(selectedSenderNum) && !addedFriend) {
                            result.actions.push({
                                text: '添加好友',
                                enabled : addedFriend,
                                callback: function() {
                                    if (!message.status) message.status = {};
                                    message.status.addedFriend = true;
                                    LCDataStorage.updateMessageById(message.id, message);   
                                    ChatRoomListManipulation(Player.FriendList, true, selectedSenderNum.toString()),
                                    updateMessageContent();
                                    createConfirmDialog({
                                        content: `已成功加${getCharacterName(selectedSenderNum)}为好友，是否立即发送回执消息？`,
                                        confirmText: '发送',
                                        cancelText: '取消',
                                        onConfirm: () => {
                                            sendMessage(`(${getCharacterName(Player.MemberNumber)} 已经成为了你的好友，让我们一起开始愉快的聊天吧)`);
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
                            text: '邀请进入当前房间',
                            action: function() {
                                const currentRoom = getCurrentRoomName();
                                const playerName = getCharacterName(Player.MemberNumber);
                                if (currentRoom) {
                                    sendMessage(`(${playerName} 邀请你进入房间 |${currentRoom}|)`);
                                } else {
                                    alert('无法获取当前房间信息');
                                }
                            }
                        },
                        {
                            text: '发送成员状态列表',
                            action: function() {
                                if (CurrentScreen !== "ChatRoom" || !ChatRoomData) {
                                    alert('您当前不在聊天室中');
                                    return;
                                }
                                
                                let statusMsg = `👥 房间内${ChatRoomCharacter.length}人:\n`;
                                
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
                            text: '邀请成为好友',
                            action: function() {
                                const playerName = getCharacterName(Player.MemberNumber);
                                sendMessage(`(${playerName} 邀请你成为好友)`);
                                if (!Player.FriendList.includes(selectedSenderNum)) { 
                                    ChatRoomListManipulation(Player.FriendList, true, selectedSenderNum.toString());
                                }
                            }
                        });
                    }

                    options.push({
                        text: '发送LianChat安装链接',
                        action: function() {
                            sendMessage(`[涟信] (https://xinlian132243.github.io/BCMod/BC_LianChat.user.js)`);
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
                    alert('请先选择一个聊天对象');
                    return;
                }
                
                // 获取选中发送者的聊天记录
               

                    // 异步获取所有消息
            LCDataStorage.getPlayerMessages(selectedSenderNum, -1).then(function(messages) 
            {
                if (!messages || messages.length === 0) {
                    alert('没有可下载的聊天记录');
                    return;
                }

                // 获取发送者名称
                const senderName = getCharacterName(selectedSenderNum) || selectedSenderNum;
                
                // 生成聊天记录文本
                let chatText = `===== 与 ${senderName} 的聊天记录 =====\n\n`;
                
                // 使用正确的messages数组
                messages.forEach(msg => {
                    const timeStr = msg.time.toLocaleString();
                    const isSelf = msg.sender === Player.MemberNumber;
                    const typeStr = getMessageTypeText(msg.type);
                    
                    // 获取发送者名称
                    let senderName = '';
                    if (isSelf) {
                        senderName = getCharacterName(Player.MemberNumber);
                    } else {
                        senderName = getCharacterName(selectedSenderNum);
                    }
                    
                    // 新格式：[时间] 发送者名称: 内容
                    chatText += `${senderName}: ${msg.content}\n\n`;
                });
                
                // 创建下载链接
                const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                
                // 创建下载元素
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                
                // 生成文件名：聊天记录_对象_日期时间.txt
                const now = new Date();
                const fileName = `聊天记录_${senderName}_${now.getFullYear()}${padZero(now.getMonth()+1)}${padZero(now.getDate())}_${padZero(now.getHours())}${padZero(now.getMinutes())}.txt`;
                
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
            const leftTitle = document.createElement('div');
            leftTitle.textContent = 'LianChat';
            leftTitle.style.fontWeight = 'bold';
            
            const rightBtns = document.createElement('div');
            rightBtns.style.display = 'flex';
            rightBtns.style.alignItems = 'center';
            rightBtns.appendChild(settingsButton);
            rightBtns.appendChild(closeButton);
            
            titleBar.appendChild(leftTitle);
            titleBar.appendChild(rightBtns);

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

            // 公开更新方法
            messageDialog.handleKeyDown = handleKeyDown;

            messageDialog.updateSenderList = updateSenderList;
            messageDialog.updateMessageContent = updateMessageContent;
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
        }
        
        // 显示对话框
        function showMessageDialog() {
            if (!messageDialog) {
                createMessageDialog();
            } else {
                messageDialog.style.display = 'flex';
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
        
        // 隐藏对话框
        function hideMessageDialog() {
            if (messageDialog) {
                if (messageDialog.hideWithSave) {
                    messageDialog.hideWithSave();
                } else {
                    messageDialog.style.display = 'none';
                }
                sendTypingStatus(false);
                // 停止自动刷新
                stopAutoRefresh();
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
            title.textContent = 'LianChat 设置';
            title.style.fontSize = '1.2em';
            title.style.fontWeight = 'bold';
            title.style.marginBottom = '18px';
            dialog.appendChild(title);

            // 公屏隐藏悄悄话和私聊（单选）
            const hideLabel = document.createElement('div');
            hideLabel.textContent = '公屏隐藏收到的悄悄话和私聊：';
            hideLabel.style.marginBottom = '8px';
            dialog.appendChild(hideLabel);

            const hideOptions = [
                { label: '不隐藏', value: 0 },
                { label: '打开时隐藏', value: 1 },
                { label: '一直隐藏', value: 2 }
            ];

            const hideGroup = document.createElement('div');
            hideGroup.style.display = 'flex';
            hideGroup.style.flexDirection = 'column';
            hideGroup.style.marginBottom = '18px';

            // 当前设置
            let currentHide = (Player.OnlineSettings?.LCData?.MessageSetting?.HidePrivateChat) ?? 0;

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
            notifyCheckbox.checked = !!(Player.OnlineSettings?.LCData?.MessageSetting?.NotifyWhenBackground);

            notifyLabel.appendChild(notifyCheckbox);
            notifyLabel.appendChild(document.createTextNode('网页后台时消息通知'));
            dialog.appendChild(notifyLabel);

            // 确定按钮
            const okBtn = document.createElement('button');
            okBtn.textContent = '确定';
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

                // 保存到设置
                Player.OnlineSettings.LCData.MessageSetting.HidePrivateChat = hideValue;
                Player.OnlineSettings.LCData.MessageSetting.NotifyWhenBackground = notifyValue;

                // 同步到服务器
                ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });

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
                LCDataStorage.updateSenderState(memberNumber, messageHistory[memberNumber]);

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

            messageHistory[memberNumber].messages.push(msgObj);

            LCDataStorage.addMessage(memberNumber, msgObj);

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
                    messageDialog.updateMessageContent();
                }
            }
             
            // 保存到本地存储
            LCDataStorage.updateSenderState(memberNumber, messageHistory[memberNumber]);

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

        function sendQueryOnlineRoomListData(query = "", space = "") {
            const SearchData = {Query: query.toUpperCase().trim(), Language: "", Space: space, Game: "", FullRooms: true};
            isReadyRevRoomList = true;
			ServerSend("ChatRoomSearch", SearchData);
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
                typingSpan.textContent = '(正在输入...)';
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
                        popup.style.background = 'white';
                        popup.style.border = '1px solid #ddd';
                        popup.style.borderRadius = '6px';
                        popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
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
                        <div style="color:#666;margin-bottom:6px;">${room.Description || ''}</div>
                        <div>好友：${friendsNames}</div>
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
                sendButton.textContent = "无法发送";
                // 可选：添加视觉提示
                sendButton.style.opacity = "0.5";

            } else {
                sendButton.textContent = "发送";
                sendButton.style.opacity = "1";

                inputField.placeholder = "输入消息...";
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
                // 检查新上线的好友
                data.forEach(friend => {
                    if (friend && friend.MemberNumber) {
                        const oldFriend = onlineFriendsCache?.find(f => f.MemberNumber === friend.MemberNumber);
                        if (!oldFriend) {
                            // 新上线的好友，检查EnableLianChat
                            if (playerCache[friend.MemberNumber]?.EnableLianChat) {
                                syncPlayerInfoToFriend(friend.MemberNumber);
                            }
                        }
                    }
                });
                
                // 更新缓存
                onlineFriendsCache = data;
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

        // 创建清理后的数据副本
        function createCleanedData(keepCount) {
            const cleanedData = {};
            
            for (const memberNumber in messageHistory) {
                // 如果设置了pinnedTime或者有消息，则保留
                if ((messageHistory[memberNumber].pinnedTime && messageHistory[memberNumber].pinnedTime > 0) ||
                    (messageHistory[memberNumber].messages && messageHistory[memberNumber].messages.length > 0)) {
                    // 复制所有属性
                    cleanedData[memberNumber] = {
                        ...messageHistory[memberNumber],
                        messages: messageHistory[memberNumber].messages.slice(-keepCount)
                    };
                }
            }
            
            return cleanedData;
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
                if (messageSetting && data.MemberNumber) {
                    // 更新角色缓存
                    const cacheResult = getAndUpdateCharacterCache(data.MemberNumber);
                    if (cacheResult && cacheResult.cache) {
                        playerCache[data.MemberNumber] = {
                            ...messageSetting,
                            UpdateTime: Date.now()
                        };
                        LCDataStorage.updatePlayerCache(data.MemberNumber, playerCache[data.MemberNumber]);
                    }
                }
            } catch (e) {
                console.error("处理LCPlayerInfo消息时出错:", e);
            }
        }

        // 同步给所有在线好友
        function syncPlayerInfoToAllOnlineFriends() {
            onlineFriendsCache?.forEach(friend => {
                if (friend && friend.MemberNumber && 
                    playerCache[friend.MemberNumber]?.EnableLianChat) {
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
                    Player.OnlineSettings?.LCData?.MessageSetting?.NotifyWhenBackground &&
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
                // 忽略通知异常
            }
        }

            // 获取消息类型的显示文本
        function getMessageTypeText(type) 
        {
            switch(type) {
                case 'Whisper':
                    return '悄悄话';
                case 'Beep':
                    return '私聊';
                default:
                    return type || '消息';
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
                return messageDialog && messageDialog.style.display !== 'none';
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

    
    mod.hookFunction("ChatSearchResultResponse", 100, (args, next) => {
        let data = args[0];
        if (MessageModule.dialogisReadyRevRoomList() || CurrentScreen === 'ChatRoom') {
            MessageModule.updateOnlineRoomListData(data);
            return;
        }
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
        confirmText: '确定',
        cancelText: '取消',
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
        confirmText: '确定',
        cancelText: '取消',
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
    ChatRoomPlayerCanJoin = true;
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
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.zIndex = FloatZindex;
    buttonContainer.style.width = '50px';
    buttonContainer.style.height = '50px';
    buttonContainer.style.borderRadius = '50%';
    buttonContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    buttonContainer.style.cursor = 'pointer';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.alignItems = 'center';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.fontSize = '24px';
    buttonContainer.style.userSelect = 'none';
    buttonContainer.style.transition = 'transform 0.2s';
    
    // 设置初始位置（右下角）
    const initialPosition = getStoredButtonPosition();
    buttonContainer.style.right = initialPosition.right;
    buttonContainer.style.bottom = initialPosition.bottom;
    
    // 更新按钮状态
    updateFloatingButtonState();
    
    // 添加拖动功能
    let isDraggingButton = false;
    let dragStartX, dragStartY;
    let hasMoved = false; // 确保在函数作用域内定义
    
    buttonContainer.addEventListener('mousedown', function(e) {
        isDraggingButton = true;
        hasMoved = false; // 重置移动标记
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        this.style.transition = 'none'; // 拖动时禁用过渡效果
        
        // 添加鼠标移动和释放事件
        document.addEventListener('mousemove', handleButtonDrag);
        document.addEventListener('mouseup', stopButtonDrag);
        
        e.preventDefault(); // 防止文本选择
    });
    
    function handleButtonDrag(e) {
        if (!isDraggingButton) return;
        
        // 计算移动距离
        const moveX = Math.abs(e.clientX - dragStartX);
        const moveY = Math.abs(e.clientY - dragStartY);
        
        // 如果移动超过阈值，标记为已移动
        if (moveX > 3 || moveY > 3) {
            hasMoved = true;
        }
        
        const button = document.getElementById('floatingMessageButton');
        if (!button) return;
        
        // 获取按钮当前位置
        const rect = button.getBoundingClientRect();
        
        // 计算鼠标移动的距离
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        
        // 计算新位置（左上角坐标）
        const newLeft = rect.left + deltaX;
        const newTop = rect.top + deltaY;
        
        // 确保按钮不会超出视口
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        
        const boundedLeft = Math.max(0, Math.min(newLeft, maxX));
        const boundedTop = Math.max(0, Math.min(newTop, maxY));
        
        // 更新位置（转换为right和bottom值）
        button.style.right = `${window.innerWidth - boundedLeft - rect.width}px`;
        button.style.bottom = `${window.innerHeight - boundedTop - rect.height}px`;
        
        // 更新拖动起点
        dragStartX = e.clientX;
        dragStartY = e.clientY;
    }
    
    function stopButtonDrag(e) {
        if (isDraggingButton) {
            isDraggingButton = false;
            const button = document.getElementById('floatingMessageButton');
            if (button) {
                button.style.transition = 'transform 0.2s'; // 恢复过渡效果
                
                // 存储按钮位置
                storeButtonPosition({
                    right: button.style.right,
                    bottom: button.style.bottom
                });
                
                // 只有在没有移动的情况下才触发点击事件
                if (!hasMoved) {
                    // 检查点击是否在按钮或其子元素上
                    let targetElement = e.target;
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
            document.removeEventListener('mousemove', handleButtonDrag);
            document.removeEventListener('mouseup', stopButtonDrag);
        }
    }
    
    // 添加到文档
    document.body.appendChild(buttonContainer);
    
    // 添加窗口大小变化监听器，保持相对位置不变
    window.addEventListener('resize', updateButtonPosition);
}

// 更新按钮状态（颜色、图标、未读数）
function updateFloatingButtonState() {
    const button = document.getElementById('floatingMessageButton');
    if (!button) return;
    
    // 获取未读消息数
    const unreadCount = MessageModule.getTotalUnreadCount();
    
    // 设置基本样式
    if (MessageModule.isMessageDialogVisible()) {
        // 对话框打开状态
        button.style.backgroundColor = '#4fc3f7';
        button.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        // 对话框关闭状态
        button.style.backgroundColor = '#ebebeb';
        button.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }
    
    // 清空按钮内容
    button.innerHTML = '';
    
    // 创建图标元素
    const iconElement = document.createElement('div');
    iconElement.style.width = '100%';
    iconElement.style.height = '100%';
    iconElement.style.backgroundSize = '60%';
    iconElement.style.backgroundPosition = 'center';
    iconElement.style.backgroundRepeat = 'no-repeat';
    
    // 设置图片URL
    iconElement.style.backgroundImage = `url('https://xinlian132243.github.io/BCMod/Assets/LianChatButton.png')`;
    
    button.appendChild(iconElement);
    
    // 如果有未读消息，添加未读消息指示器
    if (unreadCount > 0) {
        const badge = document.createElement('div');
        badge.textContent = unreadCount > 99 ? '99+' : unreadCount.toString();
        badge.style.position = 'absolute';
        badge.style.top = '-8px';
        badge.style.right = '-8px';
        badge.style.backgroundColor = '#ff4d4f';
        badge.style.color = 'white';
        badge.style.borderRadius = '10px';
        badge.style.padding = '0 6px';
        badge.style.fontSize = '12px';
        badge.style.fontWeight = 'bold';
        badge.style.minWidth = '18px';
        badge.style.height = '18px';
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.justifyContent = 'center';
        badge.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        
        button.appendChild(badge);
                // 添加亮红色描边
        button.style.boxShadow = '0 0 0 3px #ff4d4f, 0 2px 10px rgba(0, 0, 0, 0.3)';

        // 添加轻微的动画效果
        button.style.transform = 'scale(1.05)';
    } else {
        button.style.transform = 'scale(1)';
    }
}

// 更新按钮位置（窗口大小变化时）
function updateButtonPosition() {
    const button = document.getElementById('floatingMessageButton');
    if (!button) return;
    
    // 获取MainCanvas的位置和尺寸
    const canvas = document.getElementById('MainCanvas');
    if (!canvas) return;
    
    const canvasRect = canvas.getBoundingClientRect();
    const storedPosition = getStoredButtonPosition();
    
    // 计算相对于MainCanvas的位置
    // 将right和bottom转换为相对于MainCanvas右下角的百分比
    const rightPercent = parseFloat(storedPosition.rightPercent || '5');
    const bottomPercent = parseFloat(storedPosition.bottomPercent || '5');
    
    // 计算实际像素位置
    const rightPx = (rightPercent / 100) * canvasRect.width;
    const bottomPx = (bottomPercent / 100) * canvasRect.height;
    
    // 设置按钮位置，确保不超出MainCanvas
    button.style.right = `${window.innerWidth - (canvasRect.right - rightPx)}px`;
    button.style.bottom = `${window.innerHeight - (canvasRect.bottom - bottomPx)}px`;
}

// 存储按钮位置
function storeButtonPosition(position) {
    // 获取MainCanvas的位置和尺寸
    const canvas = document.getElementById('MainCanvas');
    if (!canvas) {
        localStorage.setItem('floatingMessageButtonPosition', JSON.stringify(position));
        return;
    }
    
    const canvasRect = canvas.getBoundingClientRect();
    
    // 计算按钮位置相对于MainCanvas右下角的百分比
    const rightPx = parseFloat(position.right);
    const bottomPx = parseFloat(position.bottom);
    
    // 计算MainCanvas右下角坐标
    const canvasRight = canvasRect.right;
    const canvasBottom = canvasRect.bottom;
    
    // 计算按钮到MainCanvas右下角的距离
    const distanceToRight = canvasRight - (window.innerWidth - rightPx);
    const distanceToBottom = canvasBottom - (window.innerHeight - bottomPx);
    
    // 转换为百分比
    const rightPercent = (distanceToRight / canvasRect.width) * 100;
    const bottomPercent = (distanceToBottom / canvasRect.height) * 100;
    
    // 存储百分比位置
    localStorage.setItem('floatingMessageButtonPosition', JSON.stringify({
        right: position.right,
        bottom: position.bottom,
        rightPercent: rightPercent.toFixed(2),
        bottomPercent: bottomPercent.toFixed(2)
    }));
}

// 获取存储的按钮位置
function getStoredButtonPosition() {
    const defaultPosition = { right: '20px', bottom: '20px', rightPercent: '5', bottomPercent: '5' };
    const stored = localStorage.getItem('floatingMessageButtonPosition');
    return stored ? JSON.parse(stored) : defaultPosition;
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
    if (!Player.OnlineSharedSettings.LCData || Player.OnlineSharedSettings.LCData.MessageSetting == null)
    {
        Player.OnlineSharedSettings.LCData = {
            MessageSetting: {
                EnableLianChat: true
            }
        };
    }
    if (!Player.OnlineSettings.LCData)
        {
            Player.OnlineSettings.LCData = {
                MessageSetting: {
                    HidePrivateChat: HidePrivateChatEnum.NONE,
                    NotifyWhenBackground: false,
                }
            };
        }

     Player.OnlineSettings.LCData.MessageSetting.PinnedRooms 
     = Player.OnlineSettings.LCData.MessageSetting.PinnedRooms || {};

     Player.OnlineSettings.LCData.MessageSetting.SetRoomSpace =  Player.OnlineSettings.LCData.MessageSetting.SetRoomSpace == undefined? 
     'X' : Player.OnlineSettings.LCData.MessageSetting.SetRoomSpace;
}

// 在游戏退出时清理定时器
mod.hookFunction("LoginResponse", 0, (args, next) => {
    next(args);
    
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
});

console.log("[LianChat] Load Success");
    

})();
