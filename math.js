let sin=Math.sin,cos=Math.cos,atan2=Math.atan2,sqrt=Math.sqrt,abs=Math.abs,hypot=Math.hypot,log=Math.log,log10=Math.log10,log2=Math.log2,exp=Math.exp,sign=Math.sign,floor=Math.floor,ceil=Math.ceil,round=Math.round,min=Math.min,max=Math.max;const pi=Math.PI
let zdiv=(xr,xi,yr,yi)=>{let r=0,d=0,e=0,f=0;if(abs(yr)>=abs(yi)){r=yi/yr;d=yr+r*yi;e=(xr+xi*r)/d;f=(xi-xr*r)/d}else{r=yr/yi;d=yi+r*yr;e=(xr*r+xi)/d;f=(xi*r-xr)/d};return[e,f]}
let norm=z=>{let s=0,r=0,t;for(let i=0;i<z.length;i++){let x=z[i];if(x){x=abs(x);if(s<x){t=s/x;r=1+r*t*t;s=x}else{t=x/s;r+=t*t}}};return s*sqrt(r)} //s*s*r if no sqrt
let norm2=z=>{let s=0,r=0,t;for(let i=0;i<z.length;i++){let x=z[i];if(x){x=abs(x);if(s<x){t=s/x;r=1+r*t*t;s=x}else{t=x/s;r+=t*t}}};return s*s*r}
let eyez=n=>new Array(n).fill(0).map((_,i)=>{let r=new Float64Array(2*n);r[2*i]=1;return r})
let grade=(x, r)=>Array.from(x.keys()).sort((a,b)=>x[a]-x[b])

let solve=(A,b)=>{let P=lup(A);return lupsolve(A,P,b)} //A:list of complex rows: [Float64Array([r,i,r,i,..]), row2, ..]
let lup=(A, P)=>{let n=A.length;P=Array(n).fill(0).map((_,i)=>i)
 for(let i=0;i<n;i++){
  let mx=0,mi=0;for(let k=i;k<n;k++){let a=A[k][2*i]*A[k][2*i]+A[k][2*i+1]*A[k][2*i+1];if(a>mx){mx=a;mi=k}}
  if(mi!=i){let t=P[i];P[i]=P[mi];P[mi]=t;t=A[i];A[i]=A[mi];A[mi]=t}
  let a=A[i][2*i],b=A[i][2*i+1],c=1/(a+b*b/a),d=-1/(b+a*a/b)
  for(let j=1+i;j<n;j++){a=A[j][2*i];b=A[j][2*i+1];A[j][2*i]=a*c-b*d;A[j][2*i+1]=a*d+b*c;a=A[j][2*i];b=A[j][2*i+1]
   for(let k=2+2*i;k<2*n;k+=2){let e=A[i][k],f=A[i][1+k];A[j][k]-=a*e-b*f;A[j][1+k]-=a*f+b*e}}}
 return P} 
let lupsolve=(A,P,b)=>{let n=A.length,x=new Float64Array(2*n)
 for(let i=0;i<n;i++){let xr=b[2*P[i]],xi=b[1+2*P[i]]
  for(let k=0;k<2*i;k+=2){let a=A[i][k],b=A[i][1+k],c=x[k],d=x[1+k];xr-=a*c-b*d;xi-=a*d+b*c}
  x[2*i]=xr;x[2*i+1]=xi}
 for(let i=n-1;i>=0;i--){let xr=x[2*i],xi=x[2*i+1]
  for(let k=2+2*i;k<2*n;k+=2){let a=A[i][k],b=A[i][1+k],c=x[k],d=x[1+k];xr-=a*c-b*d;xi-=a*d+b*c}
  let a=A[i][2*i],b=A[i][2*i+1],c=1/(a+b*b/a),d=-1/(b+a*a/b);x[2*i]=xr*c-xi*d;x[2*i+1]=xr*d+xi*c
 };return x}

let lub=A=>{let m=A.length,n2=A[0].length,h=(m-1)/2
 for(let j=0;j<n2;j+=2){let a=A[h][j],b=A[h][1+j]
  for(let k=1+h;k<m;k++){let[p,q]=zdiv(A[k][j],A[k][1+j],a,b)
   for(let i=1;i<m;i++){let i2=2*i;if(h-i>=0&&j+i2<n2){let c=A[h-i][j+i2],d=A[h-i][j+i2+1];A[k-i][j-i2]-=p*c-q*d;A[k-i][j-i2+1]-=p*d+q*c}}
   A[k][j]=p;A[k][j+1]=q}};return A}
let lubsolve=(A,b)=>{let m=A.length,n=A[0].length/2,h=(m-1)/2,x=new Float64Array(2*n)
 for(let i=0;i<n;i++){let i2=2*i,i3=1+i2
  for(let k=i-h;k<i;k++){let j=i-k+h,k2=2*k,k3=1+k2
   if(j>=0&&j<m&&k>=0){let a=A[j];x[i2]-=a[k2]*x[k2]-a[k3]*x[k3];x[i3]-=a[k3]*x[k2]+a[k2]*x[k3]}}}
 for(let i=n-1;i>=0;i--){let i2=2*i,i3=1+i2
  for(let k=1;k<=h;k++){let k2=i2+2*k,k3=1+k2
   if(h+k<m&&i+k<n){let a=A[h-k];x[i2]-=a[k2]*x[k2]-a[k3]*x[k3];x[i3]-=a[k2]*x[k3]+a[k2]*x[k3]}}
  let[p,q]=zdiv(x[i2],x[i3],A[h][i2],A[h][i3]);x[i2]=p;x[i3]=q};return b}
 
let lsq=(A,b)=>qrsolve(qr(A),b)  //A:list of complex columns: [Float64Array([r,i,r,i,..]), col2, ..]
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
 return x.subarray(0,2*A.length)}

let svd=A=>{ //A:list of complex columns (see qr)
 let svq=A=>{let[h,d]=qr(A),n=A.length,m2=A[0].length,r=Array(A.length).fill([]).map(x=>new Float64Array(2*A.length).fill(0));for(let i=1;i<h.length;i++){let ri=r[i],hi=h[i];for(let k=0;k<2*i;k+=2){ri[k]=hi[k];ri[1+k]=hi[1+k]}};for(let i=0;i<h.length;i++){r[i][2*i]=d[2*i];r[i][1+2*i]=d[1+2*i]};
  let Q=x=>{let y=new Float64Array(m2);y.set(x);for(let i=0;i<n;i++){let j=n-1-i,hj=h[j],a=0,b=0;for(let k2=m2-2-2*i;k2<m2;k2+=2){const k3=1+k2;a+=hj[k2]*y[k2]+hj[k3]*y[k3];b+=hj[k2]*y[k3]-hj[k3]*y[k2]};for(let k2=m2-2-2*i;k2<m2;k2+=2){const k3=1+k2;y[k2]-=a*hj[k2]-b*hj[k3];y[k3]-=a*hj[k3]+b*hj[k2]}};return y}
  let[u,s,v]=svd(r);return[u.map(Q),s,v]}
 if(A[0].length>2*A.length)return svq(A) //using qr decomposition for slender input.
 let n=A.length,V=eyez(n)
 let d=(x,y)=>{let a=0,b=0;for(let r=0;r<x.length;r+=2){const i=1+r;a+=x[r]*y[r]+x[i]*y[i];b+=x[r]*y[i]-x[i]*y[r]};return[a,b]}
 let J=(x,y,zr,zi)=>{let a=hypot(zr,zi),q=(norm2(y)-norm2(x))/(2*a),t=sign(q)/(abs(q)+sqrt(1+q*q)),c=1/sqrt(1+t*t);return[c,t*c*zr/a,t*c*zi/a]}
 let R=(c,sr,si,x,y)=>{for(let r=0;r<x.length;r+=2){const i=1+r;let xr=x[r],xi=x[i],yr=y[r],yi=y[i];x[r]=xr*c-yr*sr-yi*si;x[i]=xi*c+yr*si-yi*sr;y[r]=xr*sr-xi*si+yr*c;y[i]=xr*si+xi*sr+yi*c}}
 let F=A=>{let f=true;while(f){for(let i=0;i<n-1;i++){for(let k=1+i;k<n;k++){let[zr,zi]=d(A[i],A[k]);f=1e-14<hypot(zr,zi);if(f){let[c,sr,si]=J(A[i],A[k],zr,zi);R(c,sr,si,V[i],V[k]);R(c,sr,si,A[i],A[k])}}}}}
 F(A);let s=A.map(norm);for(let i=0;i<A.length;i++){let t=1/s[i],Ai=A[i];for(let k=0;k<Ai.length;k++)Ai[k]*=t}
 let g=grade(s);g.reverse();return[A.map((_,i)=>A[g[i]]),s.map((_,i)=>s[g[i]]),V.map((_,i)=>V[g[i]])]}

let fft=(x,ini)=>{ //fft([1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0]) or reuse: f=fft(8);fft([1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0],f)
 let init=N=>{let l=log2(N),P=Array(8).fill(0),n=1,S=new Float64Array(N),C=new Float64Array(N);for(let p=0;p<l;p++){for(let i=0;i<n;i++){P[i]<<=1;P[i+n]=1+P[i]};n<<=1};for(let i=0;i<N;i++){const p=-2*pi*i/N;C[i]=cos(p);S[i]=sin(p)};return[l,P,C,S,N]}
 let perm=(x,P)=>{P.forEach((p,i)=>{if(i<p){const a=2*i,b=1+a,c=2*p,d=1+c,A=x[a],B=x[b];x[a]=x[c];x[b]=x[d];x[c]=A;x[d]=B}})}
 if("number"==typeof x)return init(x);let[l,P,C,S,N]=ini?ini:init(x.length/2);perm(x,P);let n=1,s=N
 for(let p=1;p<=l;p++){s>>=1;for(let b=0;b<s;b++){const o=2*b*n;for(let k=0;k<n;k++){const i=(k+o)<<1,j=i+(n<<1),ks=k*s,kn=s*(k+n);let xi0=x[i],xi1=x[1+i],xj0=x[j];x[i]+=C[ks]*x[j]-S[ks]*x[1+j];x[1+i]+=C[ks]*x[1+j]+S[ks]*x[j];x[j]=xi0+C[kn]*x[j]-S[kn]*x[1+j];x[1+j]=xi1+C[kn]*x[1+j]+S[kn]*xj0}};n<<=1}
 return x}

let ravg3=(x,n)=>{let f=(x,n)=>{let a=0,b=0,p=0,s=1/n;for(let i=0;i<n;i++)a+=x[i];b=s*a;for(let i=n;i<x.length;i++){a+=x[i]-x[p];x[p]=x[i];x[i]=s*a;if(n==++p)p=0};x[n-1]=b;return x.subarray(n-1)}
 n=floor((9+n)/10);return(!n)?x:n>x.length?x.subarray(0,0):f(f(f(x,5*n),3*n),2*n)}
let zavg3=(x,n)=>{let f=(x,n)=>{let ar=0,ai=0,br=0,bi=0,p=0,s=1/n;for(let i=0;i<n;i++){ar+=x[i];ai+=x[++i]};br=s*ar;bi=s*ai;
  for(let i=n;i<x.length;i+=2){ar+=x[i]-x[p];ai+=x[1+i]-x[1+p];x[p]=x[i];x[1+p]=x[1+i];x[i]=s*ar;x[1+i]=s*ai;p+=2;if(n==p)p=0}
  x[n-2]=br;x[n-1]=bi;return x.subarray(n-2)}
 n=2*floor((9+n)/10);return(!n)?x:n>x.length?x.subarray(0,0):f(f(f(x,5*n),3*n),2*n)}

