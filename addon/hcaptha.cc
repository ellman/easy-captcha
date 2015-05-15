
#include <node.h>
#include "cap.h"



using namespace v8;

void Init(Handle<Object> target) {

//hcap

  Isolate* isolate = /* ... */;

  target->Set(String::NewFromUtf8(isolate, "create", v8::String::kInternalizedString),
           FunctionTemplate::New(cap::create)->GetFunction());

}

NODE_MODULE(hcaptha, Init)