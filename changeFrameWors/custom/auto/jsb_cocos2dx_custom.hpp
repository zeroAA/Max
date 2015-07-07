#ifndef __cocos2dx_custom_h__
#define __cocos2dx_custom_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_BinaryReadUtil_class;
extern JSObject *jsb_BinaryReadUtil_prototype;

bool js_cocos2dx_custom_BinaryReadUtil_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_cocos2dx_custom_BinaryReadUtil_finalize(JSContext *cx, JSObject *obj);
void js_register_cocos2dx_custom_BinaryReadUtil(JSContext *cx, JS::HandleObject global);
void register_all_cocos2dx_custom(JSContext* cx, JS::HandleObject obj);
bool js_cocos2dx_custom_BinaryReadUtil_readShort(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_getFileLength(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_readInt(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_readBoolean(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_readBool(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_readLong(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_readBytes(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_readByte(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_readUtf(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_close(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_readFloat(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_custom_BinaryReadUtil_create(JSContext *cx, uint32_t argc, jsval *vp);
#endif

