let sqrt=Math.sqrt,abs=Math.abs,hypot=Math.hypot

let lsq=(A,b)=>qrsolve(qr(A),b)  //A:list of columns(complex): [ Float64Array([r,i,r,i,..]), .. ]
let qr=A=>{const n=A.length,m2=A[0].length
 let d=new Float64Array(2*n)
 for(let j=0;j<n;j++){let j2=2*j,j3=1+j2,Aj=A[j]
  let s=norm(Aj.subarray(j2)),h=s/hypot(Aj[j2],Aj[j3]);d[j2]=-h*Aj[j2];d[j3]=-h*Aj[j3];let f=sqrt(s*(s+hypot(Aj[j2],Aj[j3])));Aj[j2]-=d[j2];Aj[j3]-=d[j3]
  for(let k=j2;k<m2;k++)Aj[k]/=f
  for(let i=1+j;i<n;i++){let a=0,b=0,Ai=A[i]
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*Ai[k2]+Aj[k3]*Ai[k3];b+=Aj[k2]*Ai[k3]-Aj[k3]*Ai[k2]}
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;Ai[k2]-=Aj[k2]*a-Aj[k3]*b;Ai[k3]-=Aj[k2]*b+Aj[k3]*a}}}
 return[A,d]}
let qrsolve=(Q,x)=>{let[A,d]=Q,m2=A[0].length
 for(let j=0;j<A.length;j++){let Aj=A[j],a=0,b=0
  for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*x[k2]+Aj[k3]*x[k3];b+=Aj[k2]*x[k3]-Aj[k3]*x[k2]}
  for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;x[k2]-=Aj[k2]*a-Aj[k3]*b;x[k3]-=Aj[k2]*b+Aj[k3]*a}}
 for(let i=A.length-1;i>=0;i--){const i2=2*i,i3=1+i2
  for(let j=1+i;j<A.length;j++){const j2=2*j,j3=1+j2;x[i2]-=A[j][i2]*x[j2]-A[j][i3]*x[j3];x[i3]-=A[j][i2]*x[j3]+A[j][i3]*x[j2]}
  let[a,b]=zdiv(x[i2],x[i3],d[i2],d[i3]);x[i2]=a;x[i3]=b}
 return b.subarray(0,2*A.length)}

let zdiv=(xr,xi,yr,yi)=>{let r=0,d=0,e=0,f=0;if(abs(yr)>=abs(yi)){r=yi/yr;d=yr+r*yi;e=(xr+xi*r)/d;f=(xi-xr*r)/d}else{r=yr/yi;d=yi+r*yr;e=(xr*r+xi)/d;f=(xi*r-xr)/d};return[e,f]}
let norm=z=>{let s=0,r=0,t;for(let i=0;i<z.length;i++){let x=z[i];if(x){x=abs(x);if(s<x){t=s/x;r=1+r*t*t;s=x}else{t=x/s;r+=t*t}}};return s*sqrt(r)} //s*s*r if no sqrt


let A=[new Float64Array([1,2,3,4,5,6]), new Float64Array([-2,5,-3,-5,2,3])]
let b=new Float64Array([3,2,-5,2,1,2])
console.log(lsq(A,b))
