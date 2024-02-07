// ==UserScript==
// @name         BC 鱼尾拓展
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  鱼尾
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

    const MOD_NAME = "BC 鱼尾拓展";
    const MOD_FULL_NAME = "鱼尾拓展";
    const MOD_VERSION = "0.1.1";


    const mod = bcModSdk.registerMod({
        name: MOD_NAME,
        fullName: MOD_FULL_NAME,
        version: MOD_VERSION
    });
    // =======================================================================================
    const w = window;
    // =======================================================================================

    // =======================================================================================


    mod.hookFunction("ServerSend", 5, (args, next) => { 
        if (args[0] == "ChatRoomChat" && args[1]?.Type == "Activity" && IsMermaidTail()) {
            let data = args[1];
            let actName = data.Dictionary[3]?.ActivityName ?? "";

            if(actName != "")
            {
                if (actName.indexOf("ActM_") == 0) { // 这个条件表示只有当消息中包含以 "ActM_" 开头的自定义活动时,才会执行下面的操作
                    // 拦截自定义活动的发送并执行自定义操作
                    let { metadata, substitutions } = ChatRoomMessageRunExtractors(data, Player)
                    let msg = ActivityDictionaryText(data.Content);
                    msg = CommonStringSubstitute(msg, substitutions ?? [])
                    data.Dictionary.push({
                        Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + data.Content,
                        Text: msg
                    });
                }
                else
                {
                    // 足换鱼尾
                    let { metadata, substitutions } = ChatRoomMessageRunExtractors(data, Player)
                    let msg = ActivityDictionaryText(data.Content);     
                    let newMsg = GetNewMermaidTailMsg(msg);
                   
                    if (newMsg != msg) { 
                        msg = newMsg;
                        msg = CommonStringSubstitute(msg, substitutions ?? [])
                        data.Content += "ByMermaidTail";
                        data.Dictionary[3].ActivityName += "ByMermaidTail";
                        data.Dictionary.push({
                            Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + data.Content,
                            Text: msg
                        });
                    }                
                }
            }            
        }

        return next(args);
    });

    
    mod.hookFunction("ChatRoomMessage", 0, (args, next) => {
        let data = args[0];
        if (data.Content === 'ServerEnter') {
           // 修改鱼尾可以慢速出门，可以换装
            let mermaidTail = AssetMap.get("ItemLegs/MermaidTail");
            mermaidTail.Effect = [
                "Slow",
                "FillVulva",
                "UseRemote"
            ];
        }
        next(args);
    });

    
    // 如果当前是装备鱼尾，则替换所有产生互动改变的图片
    mod.hookFunction("DialogDrawActivityMenu", 0, (args, next) => {
        let C = args[0];

        next(args);

        // 第二次绘制，如果跟鱼尾无关的不会重绘制
        CommonGenerateGrid(DialogActivity, DialogInventoryOffset, DialogInventoryGrid, (item, x, y, width, height) => {
            const Act = item.Activity;
            let group = ActivityGetGroupOrMirror(CharacterGetCurrent().AssetFamily, CharacterGetCurrent().FocusGroup.Name);
            let label = ActivityBuildChatTag(CharacterGetCurrent(), group, Act, true);
            let image = "Assets/" + C.AssetFamily + "/Activity/" + Act.Name + ".png";

            let msg = ActivityDictionaryText(label.replace("Label-",""));     
            let newMsg = GetNewMermaidTailMsg(msg);
            let text = ActivityDictionaryText(label);
            if(msg != newMsg || label.includes("鱼尾"))
            {
                image = "Assets/Female3DCG/ItemLegs/Preview/MermaidTail.png";   
            }
            else
            {
                return false;
            }

            /** @type {InventoryIcon[]} */
            let icons = [];
            if (item.Blocked === "limited") {
                icons.push("AllowedLimited");
            }
    
            if (item.Item) {
                image = `${AssetGetPreviewPath(item.Item.Asset)}/${item.Item.Asset.Name}.png`;
                icons.push("Handheld");
            }
    
            const colors = {
                "blocked": "red",
                "unavail": "grey",
            };
            const background = colors[item.Blocked] || "white";
    
            DrawPreviewBox(x, y, image, text , { Hover: true, Icons: icons, Background: background, Width: width, Height: height });
            return false;
        });
    });

    // 鱼尾替换所有脚部动作句子
    function GetNewMermaidTailMsg(msg)
    {
        if(!IsMermaidTail())
        {
            return msg;
        }

        let newMsg = msg;
        var legs = [
            "双脚","双脚","小腿","大腿","脚踝","脚部","腿部","脚趾","脚","腿"  
        ]

        // 把所有尾巴相关消息都进行原词替换
        for (let index = 0; index < legs.length; index++) {
            const word = legs[index];
            newMsg = newMsg.replace("PronounObject的" + word,"PronounObject的鱼尾");
            newMsg = newMsg.replace("PronounPossessive的" + word,"PronounPossessive的鱼尾");
            newMsg = newMsg.replace("SourceCharacter的" + word,"SourceCharacter的鱼尾");
            newMsg = newMsg.replace("自己的" + word, "自己的鱼尾");
            newMsg = newMsg.replace("把" + word, "把鱼尾");
            newMsg = newMsg.replace("用" + word, "用鱼尾");
        }
        newMsg = newMsg.replace("踢了一脚","用鱼尾拍了一下");
        return newMsg;
    }
    // Image 暂默认为鱼尾
    var activityAdd = [
        {
            Name:"鱼尾揉脸", Group:"ItemMouth",
            Self:"SourceCharacter用鱼尾揉了揉PronounPossessive自己的脸.", Other:"SourceCharacter用鱼尾揉了揉TargetCharacter的脸.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"鱼尾戳脸", Group:"ItemMouth",
            Self:"SourceCharacter用鱼尾戳了戳PronounPossessive自己的脸.", Other:"SourceCharacter用鱼尾戳了戳TargetCharacter的脸.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"鱼尾抚脸", Group:"ItemMouth",
            Self:"SourceCharacter用鱼尾轻抚PronounPossessive自己的脸颊.", Other:"SourceCharacter用鱼尾轻抚TargetCharacter的脸颊.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"鱼尾担膝盖", Group:"ItemLegs",
            Other:"SourceCharacter将鱼尾担在了TargetCharacter的膝盖上.",
            Prerequisite: ["HasMermaidTail", "IsKneeling"],
        },
        {
            Name:"鱼尾揉乳房", Group:"ItemBreast",
            Self:"SourceCharacter用鱼尾揉了揉PronounPossessive自己的乳房.", Other:"SourceCharacter用鱼尾揉了揉TargetCharacter的乳房.",
            Prerequisite: ["HasMermaidTail"],
        }, 
        {
            Name:"鱼尾扇风", Group:"ItemMouth",
            Self:"SourceCharacter用鱼尾给自己扇了扇风.", Other:"SourceCharacter用鱼尾给TargetCharacter的脸扇了扇风.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"鱼尾戳乳头", Group:"ItemNipples",
            Self:"SourceCharacter用鱼尾戳了戳自己的乳头.", Other:"SourceCharacter用鱼尾戳了戳TargetCharacter的乳头.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"鱼尾碰手", Group:"ItemHands",
            Other:"SourceCharacter将鱼尾踝搭在了TargetCharacter的手心上.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"舔牵绳手", Group:"ItemHands",
            Other:"SourceCharacter舔了舔TargetCharacter握着牵绳的手.",
            Prerequisite: ["HasMermaidTail","LeashedByItemNeckRestraints","LeashedByTarget"],
        },
        {
            Name:"鱼尾抚弄大腿", Group:"ItemLegs",
            Other:"SourceCharacter用鱼尾抚弄TargetCharacter的大腿.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"鱼尾缠绕", Group:"ItemArms",
            Other:"SourceCharacter的鱼尾紧紧地缠绕住TargetCharacter的手臂.",
            Prerequisite: ["HasMermaidTail","NoBind","NoUseMermaidTailBinded"],
        },
        {
            Name:"鱼尾松绑", Group:"ItemArms",
            Other:"SourceCharacter的鱼尾松开TargetCharacter的手臂.",
            Prerequisite: ["HasMermaidTail","MermaidTailBinded"],
        },
        {
            Name:"叼牵绳", Group:"ItemMouth",
            Self:"SourceCharacter叼起自己的牵绳.", Other:"SourceCharacter叼起牵绳向TargetCharacter的手边晃了晃.",
            Prerequisite: ["HasMermaidTail","LeashedByItemNeckRestraints"],
        },
        {
            Name:"耳朵哈气", Group:"ItemEars",
            Other:"SourceCharacter在TargetCharacter的耳边轻轻哈气.",
            Prerequisite: [],
        },
        {
            Name:"乳头哈气", Group:"ItemNipples",
            Other:"SourceCharacter在TargetCharacter的乳头轻轻哈气.",
            Prerequisite: [],
        },
        {
            Name:"鱼尾挠肋", Group:"ItemTorso",
            Other:"SourceCharacter用鱼尾挠了挠TargetCharacter的肋部.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"尾鳍骚挠鼻子", Group:"ItemNose",
            Other:"SourceCharacter用鱼尾鳍轻轻骚挠TargetCharacter的鼻尖.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"挣脱牵绳", Group:"ItemHands",
            Other:"SourceCharacter奋力将牵绳从TargetCharacter手中挣脱.",
            Prerequisite: ["HasMermaidTail","LeashedByItemNeckRestraints","LeashedByTarget"],
        },
        {
            Name:"鱼尾抓手", Group:"ItemHands",
            Other:"SourceCharacter的鱼尾绕上了TargetCharacter的手.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"鱼尾松手", Group:"ItemHands",
            Other:"SourceCharacter的鱼尾松开了TargetCharacter的手.",
            Prerequisite: ["HasMermaidTail"],
        },
        {
            Name:"口塞亲吻嘴唇", Group:"ItemMouth",
            Other:"SourceCharacter带着口塞亲吻TargetCharacter的嘴唇.",
            Prerequisite: ['IsGagged'],
        },
    ];


    /**
     * 创建活动对象的函数
     * @param {string} name - 活动的名称
     * @param {string} target - 活动的目标
     * @param {string} targetSelf - 活动的自身目标
     * @param {number} maxProgress - 活动的最大进度
     * @param {number} maxProgressSelf - 活动自身的最大进度
     * @param {Array} activityExpression - 活动表达式,包含一系列的动作
     * @returns {object} - 包含创建的活动信息的对象
     */
    function CreateActivity(name, target, self, other, maxProgress, maxProgressSelf, prerequisite, activityExpression) {
        const activity = {
            Name: `ActM_${name}`,
            Target: [other!=null?target:""],
            TargetSelf: [self!=null?target:""],
            MaxProgress: maxProgress,
            MaxProgressSelf: maxProgressSelf,
            Prerequisite: prerequisite,
            ActivityExpression: activityExpression,
        };
        ActivityFemale3DCG.push(activity);
        ActivityFemale3DCGOrdering.push(activity.Name);

        const actName = activity.Name;

        ActivityDictionary.push([`ActivityActM_${name}`, `${name}`]);
        if (other != null) {
            ActivityDictionary.push([`Label-ChatOther-${target}-${actName}`, `${name}`]);
            ActivityDictionary.push([`ChatOther-${target}-${actName}`,other]);
        }
        if (self != null) {
            ActivityDictionary.push([`Label-ChatSelf-${target}-${actName}`, `${name}`]);
            ActivityDictionary.push([`ChatSelf-${target}-${actName}`, self]);
        }
    }
    w.LoginSuccess = false;
    mod.hookFunction("LoginResponse", 10, (args, next) => {

        next(args);

        if(w.LoginSuccess == false)
        {
            for (const item of activityAdd) {
                CreateActivity(item.Name, item.Group, item.Self, item.Other, 50, 50, item.Prerequisite, []);           
            }
            w.LoginSuccess = true;
        }
        
    })



    //============================================================
    const CustomPrerequisiteFuncs = new Map(Object.entries({
        "HasMermaidTail": (acting, acted, group) => !!InventoryIsItemInList(acting, "ItemLegs", "MermaidTail"), // 鱼尾
        "IsKneeling": (acting, acted, group) => acted.IsKneeling(), // 跪姿
        "MermaidTailBinded": (acting, acted, group) => InventoryGet(acted, group.Name)?.Craft?.Name?.includes("鱼尾") 
            && InventoryGet(acted,group.Name)?.Craft?.MemberNumber == Player.MemberNumber, // 是自己制作的鱼尾
        "NoBind": (acting, acted, group) => InventoryGet(acted, group.Name) == null, // 没有道具槽位

        "NoUseMermaidTailBinded": (acting, acted, group) => {
            for(var i = 0; i < ChatRoomCharacter.length ; i ++)
            {
                var c = ChatRoomCharacter[i];
                if(InventoryGet(c, group.Name)?.Craft?.Name?.includes("鱼尾") 
                && InventoryGet(c, group.Name)?.Craft?.MemberNumber == Player.MemberNumber) // 是自己制作的鱼尾)
                {
                    return false;
                }
            }            
            return true;
        }, // 没有在其他地方使用

        // 脖子上挂着牵绳
        "LeashedByItemNeckRestraints": (acting, acted, group) => LeashedByItemNeckRestraints(acting),

        // 正在被对方牵
        "LeashedByTarget": (acting, acted, group) => LeashedByTarget(acted),
        

    }));


    mod.hookFunction("ChatRoomMessage", 0, (args, next) => {
        const data = args[0];
        ProcessActivity(data);
  
        next(args);
    });

    function ProcessActivity(data)
    {      
        const targetCharacter = data?.Dictionary?.find(entry => entry.TargetCharacter !== undefined)?.TargetCharacter;
        const target = ChatRoomCharacter?.find(player => player.MemberNumber === targetCharacter);

        // 处理鱼尾
        ProcessItemActivity(data, "ItemArms", "ActM_鱼尾缠绕", "SmoothLeatherArmbinder1",
        {
            "TypeRecord": {
                "b": 1,
                "s": 0
            },
            "Difficulty": 100,
            "Block": [
                "ItemHands"
            ],
            "Effect": [
                "Block",
                "BlockWardrobe"
            ],
        },
        {
            "Item": "SmoothLeatherArmbinder1",
            "Property": "Secure",
            "Name": "缠绕的鱼尾",
            "Description": "紧紧缠绕的鱼尾，怎样挣扎都无法逃脱",
            "Color": "#323232,#565656,#323232,#252525,#252525",
            "TypeRecord": {
                "b": 1,
                "s": 0
            },
            "MemberNumber": Player.MemberNumber,
            "MemberName": GetPlayerName(Player),
        }
        
        
        );
        ProcessItemActivity(data, "ItemArms", "ActM_鱼尾松绑", null);
        // 发送者需要是自己
        if (data.Sender === Player.MemberNumber && target != null) 
        {
            // 处理挣脱动作
            if(data.Content.includes("挣脱牵绳"))
            {
                ChatRoomDoStopHoldLeash(target);                
            }

            // 处理牵手
            if(data.Content.includes("鱼尾抓手"))
            {
                ServerSend("ChatRoomChat",{
                    "Sender": Player.MemberNumber,
                    "Content": "ChatOther-ItemArms-Grope",
                    "Type": "Activity",
                    "Dictionary": [
                        {
                            "SourceCharacter": Player.MemberNumber
                        },
                        {
                            "TargetCharacter": target.MemberNumber
                        },
                        {
                            "Tag": "FocusAssetGroup",
                            "FocusGroupName": "ItemArms"
                        },
                        {
                            "ActivityName": "Grope"
                        }
                    ]
                } );             
            }

            // 处理松手
            if(data.Content.includes("鱼尾松手"))
            {
                ServerSend("ChatRoomChat",{
                    "Sender": Player.MemberNumber,
                    "Content": "ChatOther-ItemArms-LSCG_Release",
                    "Type": "Activity",
                    "Dictionary": [
                        {
                            "SourceCharacter": Player.MemberNumber
                        },
                        {
                            "TargetCharacter": target.MemberNumber
                        },
                        {
                            "Tag": "FocusAssetGroup",
                            "FocusGroupName": "ItemArms"
                        },
                        {
                            "ActivityName": "LSCG_Release"
                        }
                    ]
                }
                 );         
            }

        }
    }

    function ProcessItemActivity(data, groupName, activity, assetName, property, craft) {
        if (data.Sender === Player.MemberNumber && (data.Content.includes(`Self-${groupName}-${activity}`) || data.Content.includes(`Other-${groupName}-${activity}`))) {

            const targetCharacter = data.Dictionary.find(entry => entry.TargetCharacter !== undefined)?.TargetCharacter;
            const playerIndex = ChatRoomCharacter.findIndex(player => player.MemberNumber === targetCharacter);
            if (playerIndex !== -1) {
                const targetMember = ChatRoomCharacter[playerIndex];

                // 检测对方有没有道具
                if (assetName != null && InventoryGet(targetMember, groupName) == null) {
                    // 应用
                    WearItem(targetMember,groupName, assetName, property, craft);
                    ChatRoomCharacterUpdate(targetMember);
                }else if(assetName == null && InventoryGet(targetMember,groupName)?.Craft?.MemberNumber == Player.MemberNumber)
                {
                    InventoryRemove(targetMember,groupName);
                    ChatRoomCharacterUpdate(targetMember);
                }
            }
        }
    }

    function WearItem(target, groupName, itemName, property, craft)
    {
        var item = InventoryGet(target, groupName);
      
        if (item != null)
        {
            InventoryRemove(target, groupName);
        }

        InventoryWear(target, itemName, groupName);
        InventoryGet(target, groupName).Difficulty = 100;
        if(property != null)
        {            
            if(property.LockedBy != null && property.LockMemberNumber == null)
            {
                property.LockMemberNumber = target.MemberNumber;
            }
            InventoryGet(target, groupName).Property = property;
        }
        if(craft != null)
        {   
            InventoryGet(target, groupName).Craft = craft;
        }
        
    }

    mod.hookFunction("ActivityCheckPrerequisite", 500, (args, next) => {
        var prereqName = args[0];
        if (CustomPrerequisiteFuncs.has(prereqName)) {
            var acting = args[1];
            var acted = args[2];
            var targetGrp = args[3];
            var customPrereqFunc = CustomPrerequisiteFuncs.get(prereqName);
            if (!customPrereqFunc)
                return next(args);
            else {
                return customPrereqFunc(acting, acted, targetGrp);
            }
        }
        else
            return next(args);
    });




    // =======================================================================================
    // 正在装备鱼尾
    function IsMermaidTail()
    {
        return InventoryGet(Player,"ItemLegs")?.Asset?.Name == 'MermaidTail';
    }

    function GetPlayerName(player)
    {
        return player?.Nickname!=null&&player?.Nickname!=''?player?.Nickname:player?.Name;
    }


    // 脖子上有牵绳
    function LeashedByItemNeckRestraints(C)
    {
        for (let A = 0; A < C.Appearance.length; A++)
        if ((C.Appearance[A].Asset != null) && (C.Appearance[A].Asset.Group.Family == C.AssetFamily)) {
            if (InventoryItemHasEffect(C.Appearance[A], "Leash", true)) {
                if (C.Appearance[A].Asset.Group.Name == "ItemNeckRestraints")
                {
                    return true;
                }
            }
        }
        return false;
    }


    //被牵
    function LeashedByTarget(C)
    {       
        return C.MemberNumber == ChatRoomLeashPlayer;
    }
    console.log("[BC_ActivityMermaidTai] Load Success");
})();

