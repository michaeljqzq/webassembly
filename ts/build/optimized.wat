(module
 (type $ii (func (param i32) (result i32)))
 (type $iiii (func (param i32 i32 i32) (result i32)))
 (memory $0 0)
 (export "memory" (memory $0))
 (export "fibts" (func $assembly/index/fibts))
 (func $assembly/index/fibonacci (; 0 ;) (; has Stack IR ;) (type $iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  ;;@ assembly/index.ts:4:2
  (if
   ;;@ assembly/index.ts:4:6
   (i32.le_s
    (get_local $0)
    ;;@ assembly/index.ts:4:11
    (i32.const 2)
   )
   ;;@ assembly/index.ts:4:14
   (return
    ;;@ assembly/index.ts:5:11
    (get_local $2)
   )
  )
  ;;@ assembly/index.ts:7:34
  (call $assembly/index/fibonacci
   ;;@ assembly/index.ts:7:19
   (i32.sub
    (get_local $0)
    ;;@ assembly/index.ts:7:23
    (i32.const 1)
   )
   ;;@ assembly/index.ts:7:26
   (get_local $2)
   ;;@ assembly/index.ts:7:29
   (i32.add
    (get_local $1)
    ;;@ assembly/index.ts:7:33
    (get_local $2)
   )
  )
 )
 (func $assembly/index/fibts (; 1 ;) (; has Stack IR ;) (type $ii) (param $0 i32) (result i32)
  ;;@ assembly/index.ts:11:26
  (call $assembly/index/fibonacci
   ;;@ assembly/index.ts:11:19
   (get_local $0)
   ;;@ assembly/index.ts:11:22
   (i32.const 1)
   ;;@ assembly/index.ts:11:25
   (i32.const 1)
  )
 )
)
