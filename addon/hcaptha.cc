
#include <node.h>
#include "cap.h"



using namespace v8;

void Init(Handle<Object> target) {

//hcap

  Isolate* isolate = Isolate::New();

  target->Set(String::NewFromUtf8(isolate, "create", v8::String::kInternalizedString),
           FunctionTemplate::New(isolate, cap::create)->GetFunction());

}

NODE_MODULE(hcaptha, Init)