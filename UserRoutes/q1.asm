org ox100
jmp start 
start 
push word[_segment]
push word[offset]
call printaddr

print aadr:
push bp
mov bp,sp
pusha

mov ax,0x8800
mov es ax
mov ax,[bp+6]
mov bx, 0x10

mul bc 
add ax,[bp+4]
adc dx, 0

mov di,0
mov bh 0x07

print 
cmp bl, 9
jle Decimel; convert decimel
jg Hex; if greater convert hex

mov ax, [bp+6]
mov bx, 0x10

mul bx
add ax, [bp+4]
adc dx,0

mov di,0
mov bh,0x07

print:
cmp bl,9
jle Decimel : convert decimel
jg Hex;

print1st:
mov bl, 00001111b
and bl, ah
shr bl, ah
call print

print2nd:
mov bl,11110000b
and bl, ah
shr bl,4
call print

Hex:
add bl,55
jmp l1
Decimel:
add bl,0x30
jmp l1
l1:
mov word [es:di], bx
add di, 2

return:
popa
pop bp
ret 4
 
 end:

 mov ax,0x4c00
 int 21h

 _segment: dw 0xF8AB
 offset: dw 0xFFFF


;MG-0330