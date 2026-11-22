// ISA v1 stack VM; RET takes no immediate.
import{readFileSync as f,mkdirSync as m,writeFileSync as w}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
function V(p,g){let S=new Int32Array(256),s=0,C=new Int32Array(64),c=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,j=0,t=0,pc=0;
for(;;){if(t==1e6)return[10,o.slice(0,l)];if(pc<0||pc>=p.length)return[9,o.slice(0,l)];let q=p[pc];
if(!(q<8||q>=16&&q<35&&q!=31||q>47&&q<53||q==64||q==65||q>79&&q<84))return[5,o.slice(0,l)];
let n=pc+1+(q==1?1:q==2?4:q>47&&q<52?2:0);if(n>p.length)return[9,o.slice(0,l)];t++;
let a=q==7?3:q==0||q==1||q==2||q==48||q==51||q==52||q==82?0:q==3||q==4||q==23||q==27||q==49||q==50||q==64||q==80||q==81||q==83?1:2;
let b=q==4||q==5?2:q==6||q==7?3:q==1||q==2||q==82||q>15&&q<35||q==64?1:0;
if(s<a)return[2,o.slice(0,l)];if(s-a+b>256)return[3,o.slice(0,l)];pc=n;
if(q==0)return[0,o.slice(0,l)];
if(q==1)S[s++]=(p[n-1]<<24)>>24;else if(q==2)S[s++]=p[n-4]|p[n-3]<<8|p[n-2]<<16|p[n-1]<<24;
else if(q==3)s--;else if(q==4){S[s]=S[s-1];s++}else if(q==5){let z=S[s-1];S[s-1]=S[s-2];S[s-2]=z}
else if(q==6){S[s]=S[s-2];s++}else if(q==7){let z=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=z}
else if(q==23)S[s-1]=-S[s-1]|0;else if(q==27)S[s-1]=~S[s-1];
else if(q>15&&q<35){let A=S[s-2],B=S[s-1],R;if(q>18&&q<23&&B==0)return[4,o.slice(0,l)];
R=q==16?(A+B)|0:q==17?(A-B)|0:q==18?Math.imul(A,B):q==19?A==-2147483648&&B==-1?A:(A/B)|0:q==20?B==-1?0:A%B|0:q==21?Math.floor((A>>>0)/(B>>>0))|0:q==22?(A>>>0)%(B>>>0)|0:q==24?A&B:q==25?A|B:q==26?A^B:q==28?A<<(B&31):q==29?A>>(B&31):q==30?(A>>>(B&31))|0:q==32?A==B?1:0:q==33?A<B?1:0:A>>>0<B>>>0?1:0;S[s-2]=R;s--}
else if(q>47&&q<51){let r=((p[n-2]|p[n-1]<<8)<<16)>>16;if(q==48||(q==49?S[--s]==0:S[--s]!=0))pc=n+r}
else if(q==51){if(c==64)return[7,o.slice(0,l)];C[c++]=n;pc=p[n-2]|p[n-1]<<8}
else if(q==52){if(c==0)return[8,o.slice(0,l)];pc=C[--c]}
else if(q==64){let d=S[s-1];if(d<0||d>255)return[6,o.slice(0,l)];S[s-1]=M[d]}
else if(q==65){let d=S[s-1],v=S[s-2];if(d<0||d>255)return[6,o.slice(0,l)];s-=2;M[d]=v}
else if(q==80){let y=String(S[s-1]);if(l+y.length>65536)return[11,o.slice(0,l)];s--;for(let k=0;k<y.length;k++)o[l++]=y.charCodeAt(k)}
else if(q==81){if(l>=65536)return[11,o.slice(0,l)];o[l++]=S[--s]&255}
else if(q==82)S[s++]=j<g.length?g[j++]:-1;else return[S[--s]&255,o.slice(0,l)];}}
for(let i=1;i<41;i++){let d="i"+("00"+i).slice(-3),z=V(f(I+"/"+d+"/program.bin"),f(I+"/"+d+"/input.bin"));m(O+"/"+d,{recursive:!0});w(O+"/"+d+"/stdout.bin",z[1]);w(O+"/"+d+"/exit.txt",""+z[0])}
