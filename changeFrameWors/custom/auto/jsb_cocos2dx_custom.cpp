#include "jsb_cocos2dx_custom.hpp"
#include "cocos2d_specifics.hpp"
#include "BinaryReadUtil.h"

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedValue initializing(cx);
    bool isNewValid = true;
    JS::RootedObject global(cx, ScriptingCore::getInstance()->getGlobalObject());
    isNewValid = JS_GetProperty(cx, global, "initializing", &initializing) && initializing.toBoolean();
    if (isNewValid)
    {
        TypeTest<T> t;
        js_type_class_t *typeClass = nullptr;
        std::string typeName = t.s_name();
        auto typeMapIter = _js_global_type_map.find(typeName);
        CCASSERT(typeMapIter != _js_global_type_map.end(), "Can't find the class type!");
        typeClass = typeMapIter->second;
        CCASSERT(typeClass, "The value is null.");

        JS::RootedObject proto(cx, typeClass->proto.get());
        JS::RootedObject parent(cx, typeClass->parentProto.get());
        JS::RootedObject _tmp(cx, JS_NewObject(cx, typeClass->jsclass, proto, parent));
        
        args.rval().set(OBJECT_TO_JSVAL(_tmp));
        return true;
    }

    JS_ReportError(cx, "Constructor for the requested class is not available, please refer to the API reference.");
    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    return false;
}

static bool js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    args.rval().setBoolean(true);
    return true;    
}
JSClass  *jsb_BinaryReadUtil_class;
JSObject *jsb_BinaryReadUtil_prototype;

bool js_cocos2dx_custom_BinaryReadUtil_readShort(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readShort : Invalid Native Object");
    if (argc == 0) {
        int32_t ret = cobj->readShort();
        jsval jsret = JSVAL_NULL;
        #pragma warning NO CONVERSION FROM NATIVE FOR short;
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_readShort : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_getFileLength(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_getFileLength : Invalid Native Object");
    if (argc == 0) {
        unsigned long ret = cobj->getFileLength();
        jsval jsret = JSVAL_NULL;
        jsret = ulong_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_getFileLength : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_readInt(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readInt : Invalid Native Object");
    if (argc == 0) {
        int ret = cobj->readInt();
        jsval jsret = JSVAL_NULL;
        jsret = int32_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_readInt : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_readBoolean(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readBoolean : Invalid Native Object");
    if (argc == 0) {
        bool ret = cobj->readBoolean();
        jsval jsret = JSVAL_NULL;
        jsret = BOOLEAN_TO_JSVAL(ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_readBoolean : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_readBool(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readBool : Invalid Native Object");
    if (argc == 0) {
        bool ret = cobj->readBool();
        jsval jsret = JSVAL_NULL;
        jsret = BOOLEAN_TO_JSVAL(ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_readBool : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_readLong(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readLong : Invalid Native Object");
    if (argc == 0) {
        long ret = cobj->readLong();
        jsval jsret = JSVAL_NULL;
        jsret = long_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_readLong : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_readBytes(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readBytes : Invalid Native Object");
    if (argc == 2) {
        unsigned char* arg0;
        int arg1;
        #pragma warning NO CONVERSION TO NATIVE FOR unsigned char*
		ok = false;
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readBytes : Error processing arguments");
        cobj->readBytes(arg0, arg1);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_readBytes : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_readByte(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readByte : Invalid Native Object");
    if (argc == 0) {
        int32_t ret = cobj->readByte();
        jsval jsret = JSVAL_NULL;
        #pragma warning NO CONVERSION FROM NATIVE FOR char;
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_readByte : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_readUtf(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;

    JS::RootedObject obj(cx);
    BinaryReadUtil* cobj = NULL;
    obj = args.thisv().toObjectOrNull();
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readUtf : Invalid Native Object");
    do {
        if (argc == 0) {
            std::string ret = cobj->readUtf();
            jsval jsret = JSVAL_NULL;
            jsret = std_string_to_jsval(cx, ret);
            args.rval().set(jsret);
            return true;
        }
    } while(0);

    do {
        if (argc == 1) {
            std::string arg0;
            ok &= jsval_to_std_string(cx, args.get(0), &arg0);
            if (!ok) { ok = true; break; }
            bool ret = cobj->readUtf(arg0);
            jsval jsret = JSVAL_NULL;
            jsret = BOOLEAN_TO_JSVAL(ret);
            args.rval().set(jsret);
            return true;
        }
    } while(0);

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_readUtf : wrong number of arguments");
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_close(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_close : Invalid Native Object");
    if (argc == 0) {
        cobj->close();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_close : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_readFloat(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    BinaryReadUtil* cobj = (BinaryReadUtil *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_custom_BinaryReadUtil_readFloat : Invalid Native Object");
    if (argc == 0) {
        double ret = cobj->readFloat();
        jsval jsret = JSVAL_NULL;
        jsret = DOUBLE_TO_JSVAL(ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_readFloat : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_custom_BinaryReadUtil_create(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 1) {
        const char* arg0;
        std::string arg0_tmp; ok &= jsval_to_std_string(cx, args.get(0), &arg0_tmp); arg0 = arg0_tmp.c_str();
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_custom_BinaryReadUtil_create : Error processing arguments");
        BinaryReadUtil* ret = BinaryReadUtil::create(arg0);
        jsval jsret = JSVAL_NULL;
        do {
        if (ret) {
            js_proxy_t *jsProxy = js_get_or_create_proxy<BinaryReadUtil>(cx, (BinaryReadUtil*)ret);
            jsret = OBJECT_TO_JSVAL(jsProxy->obj);
        } else {
            jsret = JSVAL_NULL;
        }
    } while (0);
        args.rval().set(jsret);
        return true;
    }
    JS_ReportError(cx, "js_cocos2dx_custom_BinaryReadUtil_create : wrong number of arguments");
    return false;
}



void js_BinaryReadUtil_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (BinaryReadUtil)", obj);
}

void js_register_cocos2dx_custom_BinaryReadUtil(JSContext *cx, JS::HandleObject global) {
    jsb_BinaryReadUtil_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_BinaryReadUtil_class->name = "BinaryReadUtil";
    jsb_BinaryReadUtil_class->addProperty = JS_PropertyStub;
    jsb_BinaryReadUtil_class->delProperty = JS_DeletePropertyStub;
    jsb_BinaryReadUtil_class->getProperty = JS_PropertyStub;
    jsb_BinaryReadUtil_class->setProperty = JS_StrictPropertyStub;
    jsb_BinaryReadUtil_class->enumerate = JS_EnumerateStub;
    jsb_BinaryReadUtil_class->resolve = JS_ResolveStub;
    jsb_BinaryReadUtil_class->convert = JS_ConvertStub;
    jsb_BinaryReadUtil_class->finalize = js_BinaryReadUtil_finalize;
    jsb_BinaryReadUtil_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
        JS_PSG("__nativeObj", js_is_native_obj, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_PS_END
    };

    static JSFunctionSpec funcs[] = {
        JS_FN("readShort", js_cocos2dx_custom_BinaryReadUtil_readShort, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getFileLength", js_cocos2dx_custom_BinaryReadUtil_getFileLength, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("readInt", js_cocos2dx_custom_BinaryReadUtil_readInt, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("readBoolean", js_cocos2dx_custom_BinaryReadUtil_readBoolean, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("readBool", js_cocos2dx_custom_BinaryReadUtil_readBool, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("readLong", js_cocos2dx_custom_BinaryReadUtil_readLong, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("readBytes", js_cocos2dx_custom_BinaryReadUtil_readBytes, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("readByte", js_cocos2dx_custom_BinaryReadUtil_readByte, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("readUtf", js_cocos2dx_custom_BinaryReadUtil_readUtf, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("close", js_cocos2dx_custom_BinaryReadUtil_close, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("readFloat", js_cocos2dx_custom_BinaryReadUtil_readFloat, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    static JSFunctionSpec st_funcs[] = {
        JS_FN("create", js_cocos2dx_custom_BinaryReadUtil_create, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    jsb_BinaryReadUtil_prototype = JS_InitClass(
        cx, global,
        JS::NullPtr(), // parent proto
        jsb_BinaryReadUtil_class,
        dummy_constructor<BinaryReadUtil>, 0, // no constructor
        properties,
        funcs,
        NULL, // no static properties
        st_funcs);
    // make the class enumerable in the registered namespace
//  bool found;
//FIXME: Removed in Firefox v27 
//  JS_SetPropertyAttributes(cx, global, "BinaryReadUtil", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

    // add the proto and JSClass to the type->js info hash table
    TypeTest<BinaryReadUtil> t;
    js_type_class_t *p;
    std::string typeName = t.s_name();
    if (_js_global_type_map.find(typeName) == _js_global_type_map.end())
    {
        p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
        p->jsclass = jsb_BinaryReadUtil_class;
        p->proto = jsb_BinaryReadUtil_prototype;
        p->parentProto = NULL;
        _js_global_type_map.insert(std::make_pair(typeName, p));
    }
}

void register_all_cocos2dx_custom(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "cc", &ns);

    js_register_cocos2dx_custom_BinaryReadUtil(cx, ns);
}

