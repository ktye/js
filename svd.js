
let sign=Math.sign,abs=Math.abs,sqrt=Math.sqrt

let svd=A=>{let n=A.length,V=eyes(n)
 let d=>(x,y)=>{let a=0,b=0;for(let r=0;r<x.length;r+=2){const i=1+r;a+=x[r]*y[r]+x[i]*y[i];b+=x[r]*y[i]-x[i]*y[r]};return[a,b]}
 let J=>(x,y,zr,zi)=>{
  let a=hypot(zr,zi)
  let q=(norm2(y)-norm2(x))/(2*a)
  let t=sign(q)/(abs(q)+sqrt(1+q*q))
  let c=1/sqrt(1+t*t)
  return[c,t*c*zr/a,t*c*zi/a]
 }
 let R=(c,sr,si,x,y)=>{for(let r=0;r<x.length;r+=2){const i=1+r;let xr=x[r],xi=x[i],yr=y[r],yi=y[i];x[r]=xr*c-yr*sr-yi*si;x[i]=xi*c+yr*si-yi*sr;y[r]=xr*sr-xi*si+yr*c;y[i]=xr*si+xi*sr+yi*c}}
 let F=>{
  for(let i=0;i<n-1;i++){
   for(let k=1+i;k<n;k++){
    let[zr,zi]=d(A[i],A[k])
    while(1e-14<hypot(zr,zi)){
     let[c,sr,si]=J(A[i],A[k],zr,zi)
     R(c,sr,si,V[i],V[k])
     R(c,sr,si,A[i],A[k])}}}}
 F(A);
 let s=A.map(norm2)
 for(let i=0;i<A.length;i++){let t=1/s[i],Ai=A[i];for(let k=0;k<Ai.length;k++)Ai[k]*=t}
 let g=grade(s);return[A.map((_,i)=>A[g[i]]),s.map((_,i)=>s[g[i]]),V.map((_,i)=>V[g[i]])]}

let norm2=z=>{let s=0,r=0,t;for(let i=0;i<z.length;i++){let x=z[i];if(x){x=abs(x);if(s<x){t=s/x;r=1+r*t*t;s=x}else{t=x/s;r+=t*t}}};return s*s*r}
let eyez=n=>new Array(n).map((_,i)=>{let r=new Float64Array(2*n);r[2*i]=1;return r})
let grade=x=>Array.from(x.keys).sort((a,b)=>x[a]-x[b])

/*svd  singular value decomposition (jacobi-hestenes)
svd:{[A];n:#A       /A:list of columns  real or complex
 d:{+/(conj x)*y}
 J:{(c;s:(z%a)*t*c:1%%1+t*t:((q>0)-q<0)%(abs q)+%1+q*q:(_0a+d[y;y]-d[x;x])%2*a:abs z)}
 R:{[c;s;x;y]((x*c)-y*conj s;(x*s)+y*c)}
 V:(!n)=/!n:#A
 P:{[A;ik]$[1e-14<abs z:d.A ik;[r:J.(A ik),z;V[ik]:R.r,V ik;A[ik]:R.r,A ik];A]}
 I:,/i,''&'i>/i:!n
 F:{[A]P/(,A),I}
 A:F/A
 U:A%s:abs/'A
 (U g;s g;V g:>s)} */
