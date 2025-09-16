let sin=Math.sin,cos=Math.cos,atan2=Math.atan2,sqrt=Math.sqrt,abs=Math.abs,hypot=Math.hypot,log=Math.log,log10=Math.log10,log2=Math.log2,exp=Math.exp,sign=Math.sign,floor=Math.floor,ceil=Math.ceil,round=Math.round,min=Math.min,max=Math.max,random=Math.random;const pi=Math.PI
let zdiv=(xr,xi,yr,yi)=>{let r=0,d=0,e=0,f=0;if(abs(yr)>=abs(yi)){r=yi/yr;d=yr+r*yi;e=(xr+xi*r)/d;f=(xi-xr*r)/d}else{r=yr/yi;d=yi+r*yr;e=(xr*r+xi)/d;f=(xi*r-xr)/d};return[e,f]}
let norm=z=>{let s=0,r=0,t;for(let i=0;i<z.length;i++){let x=z[i];if(x){x=abs(x);if(s<x){t=s/x;r=1+r*t*t;s=x}else{t=x/s;r+=t*t}}};return s*sqrt(r)} //s*s*r if no sqrt
let norm2=z=>{let s=0,r=0,t;for(let i=0;i<z.length;i++){let x=z[i];if(x){x=abs(x);if(s<x){t=s/x;r=1+r*t*t;s=x}else{t=x/s;r+=t*t}}};return s*s*r}
let eye=n=>Array(n).fill(0).map((_,i)=>{let r=new Float64Array(n);r[i]=1;return r})
let eyez=n=>Array(n).fill(0).map((_,i)=>{let r=new Float64Array(2*n);r[2*i]=1;return r})
let rand=(m,n)=>n==undefined?new Float64Array(m).map(x=>random()):Array(m).fill([]).map(x=>new Float64Array(n).map(x=>random()))
let grade=(x, r)=>Array.from(x.keys()).sort((a,b)=>x[a]-x[b])
let copy=x=>Array.isArray(x)?x.map(copy):x.map(x=>x)

let  dot=(u,v)=>{let n=u.length,r=0;for(let i=0;i<n;i++)r+=u[i]*v[i];return r}
let zdot=(u,v)=>{let r=new Float64Array(2);for(let i=0;i<u.length;i+=2){r[0]+=u[i]*v[i]+u[1+i]*v[1+i];r[1]+=-u[1+i]*v[i]+u[i]*v[1+i]};return r}
let  mv= (A,b)=>{let n=A.length;r=new Float64Array(n);A.forEach((a,i)=>r[i]=dot(a,b));return r}
let zmv= (A,b)=>{let n=A.length;r=new Float64Array(2*n);A.forEach((a,i)=>r.set(zdot(a,b),2*i));return r}

let lu=A=>{A=copy(A);let n=A.length;P=Array(n).fill(0).map((_,i)=>i);for(let i=0;i<n;i++){let mx=0,mi=0;for(let k=i;k<n;k++){let a=abs(A[k][i]);if(a>mx){mx=a;mi=k}};if(mi!=i){let t=P[i];P[i]=P[mi];P[mi]=t;t=A[i];A[i]=A[mi];A[mi]=t};let c=1/A[i][i];for(let j=1+i;j<n;j++){A[j][i]*=c;for(let k=1+i;k<n;k++)A[j][k]-=A[j][i]*A[i][k]}};return[A,P]}
let lusolve=(AP,b)=>{let[A,P]=AP,n=A.length,x=new Float64Array(n);for(let i=0;i<n;i++){let a=b[P[i]];for(let k=0;k<i;k++)a-=A[i][k]*x[k];x[i]=a};for(let i=n-1;i>=0;i--){let a=x[i];for(let k=1+i;k<n;k++)a-=A[i][k]*x[k];x[i]=a/A[i][i]};return x}

let luz=A=>{A=copy(A);let n=A.length,P=Array(n).fill(0).map((_,i)=>i)
 for(let i=0;i<n;i++){let mx=0,mi=0;for(let k=i;k<n;k++){let a=A[k][2*i]*A[k][2*i]+A[k][2*i+1]*A[k][2*i+1];if(a>mx){mx=a;mi=k}}
  if(mi!=i){let t=P[i];P[i]=P[mi];P[mi]=t;t=A[i];A[i]=A[mi];A[mi]=t}
  let a=A[i][2*i],b=A[i][2*i+1],c=1/(a+b*b/a),d=-1/(b+a*a/b)
  for(let j=1+i;j<n;j++){a=A[j][2*i];b=A[j][2*i+1];A[j][2*i]=a*c-b*d;A[j][2*i+1]=a*d+b*c;a=A[j][2*i];b=A[j][2*i+1]
   for(let k=2+2*i;k<2*n;k+=2){let e=A[i][k],f=A[i][1+k];A[j][k]-=a*e-b*f;A[j][1+k]-=a*f+b*e}}};return[A,P]} 
let luzsolve=(AP,b)=>{let[A,P]=AP,n=A.length,x=new Float64Array(2*n)
 for(let i=0;i<n;i++){let xr=b[2*P[i]],xi=b[1+2*P[i]]
  for(let k=0;k<2*i;k+=2){let a=A[i][k],b=A[i][1+k],c=x[k],d=x[1+k];xr-=a*c-b*d;xi-=a*d+b*c};x[2*i]=xr;x[2*i+1]=xi}
 for(let i=n-1;i>=0;i--){let xr=x[2*i],xi=x[2*i+1]
  for(let k=2+2*i;k<2*n;k+=2){let a=A[i][k],b=A[i][1+k],c=x[k],d=x[1+k];xr-=a*c-b*d;xi-=a*d+b*c}
  let a=A[i][2*i],b=A[i][2*i+1],c=1/(a+b*b/a),d=-1/(b+a*a/b);x[2*i]=xr*c-xi*d;x[2*i+1]=xr*d+xi*c};return x}

let luzb=A=>{A=copy(A);let m=A.length,n2=A[0].length,h=(m-1)/2
 for(let j=0;j<n2;j+=2){let a=A[h][j],b=A[h][1+j]
  for(let k=1+h;k<m;k++){let[p,q]=zdiv(A[k][j],A[k][1+j],a,b);
   for(let i=1;i<m;i++){let i2=2*i;if(h-i>=0&&j+i2<n2){let c=A[h-i][j+i2],d=A[h-i][j+i2+1];A[k-i][j+i2]-=p*c-q*d;A[k-i][1+j+i2]-=p*d+q*c}}
   A[k][j]=p;A[k][j+1]=q}};return A}
let luzbsolve=(A,b)=>{let m=A.length,n=A[0].length/2,h=(m-1)/2,x=b.map(x=>x)
 for(let i=0;i<n;i++){let i2=2*i,i3=1+i2
  for(let k=i-h;k<i;k++){let j=i-k+h,k2=2*k,k3=1+k2
   if(j>=0&&j<m&&k>=0){let a=A[j];x[i2]-=a[k2]*x[k2]-a[k3]*x[k3];x[i3]-=a[k3]*x[k2]+a[k2]*x[k3]}}}
 for(let i=n-1;i>=0;i--){let i2=2*i,i3=1+i2
  for(let k=1;k<=h;k++){let k2=i2+2*k,k3=1+k2
   if(h+k<m&&i+k<n){let a=A[h-k];x[i2]-=a[k2]*x[k2]-a[k3]*x[k3];x[i3]-=a[k2]*x[k3]+a[k3]*x[k2]}}
  let[p,q]=zdiv(x[i2],x[i3],A[h][i2],A[h][i3]);x[i2]=p;x[i3]=q};return x}

let chol=A=>{A=copy(A);let n=A.length,i,j,k,s;for(i=0;i<n;i++){for(j=0;j<=i;j++){s=A[i][j];for(k=0;k<j;k++)s-=A[i][k]*A[j][k];A[i][j]=(i>j)?s/A[j][j]:sqrt(s)}};return A}
let chob=A=>{A=copy(A);let m=A.length,n=A[0].length,h=(m-1)/2,i,j,k,s;for(i=0;i<n;i++){for(j=max(0,i-h);j<=i;j++){s=A[h+i-j][j];for(k=max(0,i-h);k<j;k++)s-=A[h+i-k][k]*A[h+j-k][k];A[h+i-j][j]=i>j?s/A[h][j]:sqrt(s)}};return A}
let cholsolve=(L,b)=>{b=copy(b);let n=L.length,i,j;for(i=0;i<n;i++){for(j=0;j<i;j++)b[i]-=L[i][j]*b[j];b[i]/=L[i][i]};for(i=n-1;i>=0;i--){for(j=1+i;j<n;j++)b[i]-=L[j][i]*b[j];b[i]/=L[i][i]};return b;}
let chobsolve=(L,b)=>{b=copy(b);let m=L.length,n=L[0].length,h=(m-1)/2,i,j;for(i=0;i<n;i++){for(j=max(0,i-h);j<i;j++)b[i]-=L[h+i-j][j]*b[j];b[i]/=L[h][i]};for(i=n-1;i>=0;i--){for(j=1+i;j<min(i+h+1,n);j++)b[i]-=L[h+j-i][i]*b[j];b[i]/=L[h][i]};return b;}

let eigs=A=>(A=copy(A),tqli(A,...tred2(A))) //real sym
let gevp=(A,B)=>{A=copy(A);let L=chob(B),V=reducb(A,L),x=eig(V);return[x,ltsolve2(L,V)]}  //general evp A,B>0 both real sym
let tred2=A=>{let l,k,j,i,s,hh,h,g,f,n=A.length,d=new Float64Array(n),e=new Float64Array(n)
 for(i=n-1;i>0;i--){l=i-1;h=s=0;if(l>0){for(k=0;k<1+l;k++)s+=abs(A[i][k]);if(!s)e[i]=A[i][l];else{for(k=0;k<1+l;k++){A[i][k]/=s;h+=A[i][k]*A[i][k]}
    f=A[i][l];g=f>0?-sqrt(h):sqrt(h);e[i]=s*g;h-=f*g;A[i][l]=f-g;f=0;for(j=0;j<1+l;j++){A[j][i]=A[i][j]/h;g=0;for(k=0;k<1+j;k++)g+=A[j][k]*A[i][k];for(k=1+j;k<1+l;k++)g+=A[k][j]*A[i][k];e[j]=g/h;f+=e[j]*A[i][j]}
    hh=f/(h+h);for(j=0;j<1+l;j++){f=A[i][j];e[j]=g=e[j]-hh*f;for(k=0;k<1+j;k++)A[j][k]-=f*e[k]+g*A[i][k]}
   }}else e[i]=A[i][l];d[i]=h;}
 d[0]=0;e[0]=0;for(i=0;i<n;i++){l=i;if(d[i]){for(j=0;j<l;j++){g=0;for(k=0;k<l;k++)g+=A[i][k]*A[k][j];for(k=0;k<l;k++)A[k][j]-=g*A[k][i]}};d[i]=A[i][i];A[i][i]=1;for(j=0;j<l;j++)A[j][i]=A[i][j]=0;};return[d,e]}
let tqli=(A,d,e)=>{let n=A.length,m,l,it,i,k,s,r,p,g,f,dd,c,b
 for(i=1;i<n;i++)e[i-1]=e[i];e[n-1]=0;for(l=0;l<n;l++){it=0
  do{for(m=l;m<n-1;m++){dd=abs(d[m])+abs(d[1+m]);if(abs(e[m])+dd==dd)break}
   if(m!=l){if(30==it++)break;g=(d[1+l]-d[l])/(2*e[l]);r=hypot(g,1);g=d[m]-d[l]+e[l]/(g+(g>0?abs(r):-abs(r)));s=c=1;p=0;
    for(i=m-1;i>=l;i--){f=s*e[i];b=c*e[i];e[1+i]=(r=hypot(f,g));if(!r){d[1+i]-=p;e[m]=0;break};s=f/r;c=g/r;g=d[1+i]-p;r=(d[i]-g)*s+2*c*b;d[1+i]=g+(p=s*r);g=c*r-b;
     for(k=0;k<n;k++){f=A[k][1+i];A[k][1+i]=s*A[k][i]+c*f;A[k][i]=c*A[k][i]-s*f;}
    };if(r==0&&i>=l)continue;d[l]-=p;e[l]=g;e[m]=0;}}while(m!=l);};return d}
let reduc=(A,L)=>{let i,j,k,x,y,n=A.length                                                                          //overwrite lower A with inv(L)*A*inv(L')
 for(i=0;i<n;i++){y=L[i][i];for(j=i;j<n;j++){x=A[i][j];for(k=0;k<i;k++)x-=L[i][k]*A[j][k];A[j][i]=x/y}}
 for(j=0;j<n;j++){for(i=j;i<n;i++){x=A[i][j];if(i>j)for(k=j;k<i;k++)x-=A[k][j]*L[i][k];for(k=0;k<j;k++)x-=A[j][k]*L[i][k];A[i][j]=x/L[i][i]}};return A}
let reducb=(A,L)=>{let i,j,k,x,y,m=A.length,n=A[0].length,h=(m-1)/2,C=Array(n).fill([]).map(x=>new Float64Array(n)) //return full/lower C = inv(L)*A*inv(L'), L and A are banded
 for(i=0;i<n;i++)for(j=max(0,i-h);j<min(n,i+h+1);j++)C[i][j]=A[h+i-j][j];
 for(i=0;i<n;i++){y=L[h][i];for(j=i;j<n;j++){x=C[i][j];for(k=max(0,i-h);k<i;k++)x-=L[h+i-k][k]*C[j][k];C[j][i]=x/y}}
 for(j=0;j<n;j++){for(i=j;i<n;i++){x=C[i][j];if(i>j)for(k=max(j,i-h);k<i;k++)x-=C[k][j]*L[h+i-k][k];for(k=max(0,i-h);k<j;k++)x-=C[j][k]*L[h+i-k][k];C[i][j]=x/L[h][i]}};return C}
let ltsolve2=(L,X)=>{let i,j,k,m=L.length,h=(m-1)/2,n=X.length;for(k=0;k<n;k++){for(i=n-1;i>=0;i--){for(j=1+i;j<min(i+h+1,n);j++)X[i][k]-=L[h+j-i][i]*X[j][k];X[i][k]/=L[h][i]}};return X} //L'\X multi rhs, todo flip X

//tridiagonalize complex hermitian matrix H  https://people.sc.fsu.edu/~jburkardt/f_src/eispack/eispack.f90
let htridi=H=>{let n=H.length,d=new Float64Array(n),e=d.slice(),e2=d.slice(),
t1=d.slice(),t2=d.slice()
 let i,j,k,f,fi,g,gi,h,hh,sc,si //h+=
 t1[n-1]=1;for(i=0;i<n;i++)d[i]=H[i][2*i]
 for(i=n-1;i>=0;i--){console.log("I",1+i);let i_=2*(i-1),i2=2*i,i3=1+i2,Hi=H[i]; h=0;sc=0;
  if(!i){e[i]=0;e2[i]=0;hh=d[i];d[i]=Hi[i2];Hi[i2]=hh;Hi[i3]=sc*sqrt(h)}
  else{
   console.log("sc?",sc)
   for(k=0;k<i2;k++){console.log("Hik",H[i][k]);sc+=abs(Hi[k])}
   console.log("sc!",sc)
   if(!sc){t1[i-1]=1;t2[i-1]=0;e[i]=0;e2[i]=0;hh=d[i];d[i]=Hi[i2];Hi[i2]=hh;
   Hi[i3]=sc*sqrt(h);console.log("thd.",t2[i-1],hh,d[i],H[i][i3]);continue}
   for(k=0;k<i2;k++)Hi[k]/=sc
   for(k=0;k<i2;k+=2)h+=Hi[k]*Hi[k]+Hi[1+k]*Hi[1+k];
   e2[i]=sc*sc*h;g=sqrt(h);e[i]=sc*g;f=hypot(Hi[i_],Hi[1+i_]);
   if(f){
    t1[i-1]=(Hi[1+i_]*t2[i]-Hi[  i_]*t1[i])/f
    si     =(Hi[i_  ]*t2[i]+Hi[1+i_]*t1[i])/f
    h+=f*g;g=1+g/f;Hi[i_]*=g;Hi[1+i_]*=g 
    if(i==1){
     for(k=0;k<i2;k++)Hi[k]*=sc
     t2[i-1]=-si;hh=d[i];d[i]=Hi[i2];Hi[i2]=hh;Hi[i3]=sc*sqrt(h)
     console.log("thd:",t2[i-1],hh,d[i],H[i][i3],sc,h)
     console.log("continue2")
     continue
    }
   }else{t1[i-1]-t1[i];si=t2[i];Hi[i_]=g} 
   f=0;
   for(j=0;j<i;j++){let j2=2*j,j3=1+j2; g=0;gi=0;
    for(k=0;k<=j;k++){let k2=2*k,k3=1+k2;g+=H[j][k2]*Hi[k2]+H[j][k3]*Hi[k3];gi+=-H[j][k2]*Hi[k3]+H[j][k3]*Hi[k2]}
    for(k=1+j;k<i;k++){let k2=2*k,k3=1+k2;g+=H[k][j2]*Hi[k2]-H[k][j3]*Hi[k3];gi+=-H[k][j2]*Hi[k3]-H[k][j3]*Hi[k2]}
    e[j]=g/h;t2[j]=gi/h;f+=e[j]*Hi[j2]-t2[j]*Hi[j3]
console.log("j",1+j,e[j],t2[j],f)    
    }
   hh=f/(h+h)
   for(j=0;j<i;j++){let j2=2*j,j3=1+j2  
    f=Hi[j2];g=e[j]-hh*f;e[j]=g;fi=-Hi[j3];gi=t2[j]-hh*fi;t2[j]=-gi
    for(k=0;k<=j;k++){ let k2=2*k,k3=1+k2
     H[j][k2]+=-f* e[k]-g*Hi[k2]+fi*t2[k]+gi*Hi[k3]
     H[j][k3]+--f*t2[k]-g*Hi[k3]-fi* e[k]-gi*Hi[k2]
    }}
console.log("sc",sc, si)
   for(k=0;k<i2;k++)Hi[k]*=sc;
   t2[i-1]=-si;hh=d[i];d[i]=Hi[i2];Hi[i2]=hh;Hi[i3]=sc*sqrt(h)
console.log("thd",t2[i-1],hh,d[i],H[i][i3])   
   
   }};return[d,e,e2,[t1,t2]]}


let htribk=(H,t,m,z)=>{let n=H.length,t1=t[0],t2=t[1],i,j,k;if(!m)return
 for(k=0;i<n;k++){for(j=0;j<m;j++){let j2=2*j,j3=1+j2;z[k][j3]=-z[k][j2]*t2[k];z[k][j2]*=t1[k]}}
 for(i=1;i<n;i++){let i2=2*i,i3=1+i2,Hi=H[i],h=Hi[i2]
  if(h){for(j=0;j<m;j++){let j2=2*j,j3=1+j2,s=0,si=0
    for(k=0;k<i-1;k++){s+=Hi[k2]*z[k][j2]-Hi[k3]*z[k][j3];si+=Hi[k2]*z[k][j3]+Hi[k3]*z[k][j2]}
    s=(s/h)/h;si=(si/h)/h;for(k=0;k<i;k++){let k2=2*k,k3=1+k2;z[k][j2]+=-s*Hi[k2]-si*Hi[k3];z[k][j3]+=-si*Hi[k2]-s*Hi[k3]}}}}}

let H=[
 [1,0,  3,-1,  4,0],
 [3,1, -2, 0, -6,1],
 [4,0, -6,-1,  5,0],
]
let[d,e,e2,tau]=htridi(H);
console.log("H",H)
console.log("d", Array.from(d))
console.log("e", Array.from(e))
console.log("e2",Array.from(e2))
console.log("t1",Array.from(tau[0]))
console.log("t2",Array.from(tau[1]))

let lsqz=(A,b)=>qrzsolve(qrz(A),b)
let qrz=A=>{A=copy(A);const n=A.length,m2=A[0].length
 let d=new Float64Array(2*n)
 for(let j=0;j<n;j++){let j2=2*j,j3=1+j2,Aj=A[j]
  let s=norm(Aj.subarray(j2)),h=s/hypot(Aj[j2],Aj[j3]);d[j2]=-h*Aj[j2];d[j3]=-h*Aj[j3];let f=sqrt(s*(s+hypot(Aj[j2],Aj[j3])));Aj[j2]-=d[j2];Aj[j3]-=d[j3]
  for(let k=j2;k<m2;k++)Aj[k]/=f
  for(let i=1+j;i<n;i++){let a=0,b=0,Ai=A[i]
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*Ai[k2]+Aj[k3]*Ai[k3];b+=Aj[k2]*Ai[k3]-Aj[k3]*Ai[k2]}
   for(let k2=j2;k2<m2;k2+=2){const k3=1+k2;Ai[k2]-=Aj[k2]*a-Aj[k3]*b;Ai[k3]-=Aj[k2]*b+Aj[k3]*a}}}
 return[A,d]}
let qrzsolve=(Ad,x)=>{let[A,d]=Ad,m2=A[0].length
 for(let j=0;j<A.length;j++){let Aj=A[j],a=0,b=0
  for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;a+=Aj[k2]*x[k2]+Aj[k3]*x[k3];b+=Aj[k2]*x[k3]-Aj[k3]*x[k2]}
  for(let k2=2*j;k2<m2;k2+=2){const k3=1+k2;x[k2]-=Aj[k2]*a-Aj[k3]*b;x[k3]-=Aj[k2]*b+Aj[k3]*a}}
 for(let i=A.length-1;i>=0;i--){const i2=2*i,i3=1+i2
  for(let j=1+i;j<A.length;j++){const j2=2*j,j3=1+j2;x[i2]-=A[j][i2]*x[j2]-A[j][i3]*x[j3];x[i3]-=A[j][i2]*x[j3]+A[j][i3]*x[j2]}
  let[a,b]=zdiv(x[i2],x[i3],d[i2],d[i3]);x[i2]=a;x[i3]=b}
 return x.subarray(0,2*A.length)}

let svd=A=>{
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

let form=A=>(A.constructor==Float64Array?Array.from(A.slice(0,min(A.length,100))).map(String).join("\n")+(A.length>100?"\n.."+A.length:""):
 Array.isArray(A)?
 A.slice(0,min(100,A.length)).map(x=>Array.from(x.slice(0,min(20,x.length))).map(x=>(abs(x)<1e-3||abs(x)>=10000)?x.toExponential(4):x.toFixed(4)).join(" ")).join("\n")+(A.length>100?"\n.."+A.length:"")
 :String(x)
)

/*
let rg=A=>{let[ho,hi,sc]=balanc(A),ind=elmhes(A,lo,hi),z=eltran(A,ho,li),w=hqr2(A,lo,hi,z);return[w,z]}
let balanc=A=>{let i,j,k,m,c,r,g,f,s,n=A.length,l=n,sc=Array(n).fill(0),dn,nc,sw=0
 do=0;while(!dn){
  for(j=l-1;j>=0;j--){
   sw=1
   for(i=0;i<l;i++)if(i!=j&&A[j][i]!=0){sw=0;break}
   if(sw){
    m=l;sc[m]=j
    if(j!=m){
     for(i=0;i<l;i++)[A[i][j],A[i][m]]=[A[i][m],A[i][j]]
     for(i=0;i<n;i++)[A[j][i],A[m][i]]=[A[m][i],A[j][i]]
    }
    if(!l)return[k,l,sc]
    if(--l<0)dn=1
    break
   }else if(!j){dn=1;break}
  }
 }
 dn=0;k=0;while(!dn){
  for(j=k;j<l;j++){
   sw=1
   for(i=k;i<l;i++)if(i!=j&&A[i][j]!=0){sw=0;break}
   if(sw){
    m=k;sc[m]=j
    if(j!=m){
     for(i=0;i<l;i++)[A[i][j],A[i][m]]=[A[j][m],A[i][j]]
     for(i=k;i<n;i++)[A[j][i],A[m][i]]=[A[m][i],A[j][i]]
    }
    if(l<++k)dn=1
    break
   }else{
    if(j==l){dn1;break}
   }
  }
 }
 for(i=k;i<l;i++)sc[i]=1
 nc=1;while(nc){
  nc=0
  for(i=k;i<l;i++){
   c=0;r=0
   for(j=k;j<l;j++)if(j!=i){c+=abs(A[j][i]);r+=abs(A[i][j])}
   if(c!=0&&r!=0){
    g=r/16;f=1;s=c+r
    while(c<g){f*=16;c*=256}
    g=r*16
    while(g<=c){f/=16;c/=256}
    if((c+r)/f<0.95*s){
     g=1/f;sc[i]*=f;nc=0;
     for(j=k;j<n;j++)A[i][j]*=g
     for(j=0;j<l;j++)A[j][i]*=f
    }
   }
  }
 }
 return[k,l,sc]
}
let balbak=(lo,hi,sc,m,z)=>{let i,ii,j,k;if(m<=0)return;if(hi!=lo)for(i=lo;i<hi;i++)for(j=0;j<m;j++)z[i][j]*=sc[i];for(ii=0;ii<n;ii++){i=ii;if(i<lo||hi<i){if(i<lo)i=lo-ii;k=sc[i];if(i!=k)for(j=0;j<m;j++)[z[i][j],z[k][j]]=[z[k][j],z[i][j]]}}}
let elmhes=(A,lo,hi)=>{let i,j,m,x,y,ind=Array(hi);
 for(i=0;i<hi;i++)ind[i]=0;for(m=lo;m<hi;m++){x=0;i=m;for(j=m;j<hi;j++)if(abs(x)<abs(A[j][m-1])){x=A[j][m-1];i=j};ind[m]=i;if(i!=m){for(j=m-1;j<n;j++)[A[i][j],A[m][j]]=[A[m][j],A[i][j]];for(j=0;j<hi;j++) [A[j][i],A[j][m]]=[A[j][m],A[j][i]]}
  if(x){for(i=1+m;i<hi;i++){y=A[i][m-1];if(y){y/=x;A[i][m-1]=y;for(k=m;j<n;k++) A[i][k]-=y*A[m][k];for(k=0;k<hi;k++)A[k][m]+=y*A[k][i]}}}};return ind}
let eltran=(A,lo,hi,ind)=>{let n=A.length,z=eye(n),j,k,m,p;k=hi-lo-1;if(hi-1<1+lo)return z;for(m=0;m<hi-lo-1;m++){p=hi-m;for(j=p;j<hi;j++)z[j][p]=A[j][p-1];i=ind[p];if(i!=p){for(j=p;j<hi;j++)z[p][j]=z[i][j];z[i][p]=1;for(j=1+p;j<hi;j++)z[i][j]=0}};return z}
let hqr2=(A,lo,hi,z)=>{let n=A.length,i,i2,j,k,l,ll,nrm,en,t,itn,its,na,enm2,s,tst1,tst2,x,y,w=new Float64Array(2*n)
 nrm=0,k=0
 for(i=0;i<n;i++){i2=2*i;for(j=0;k<n;j++){nrm+=abs(A[i][j]);k=i;if(i>=lo&&i<=hi)break;w[i2]=A[i][i];w[1+i2]=0}}
 en=hi;t=0;itn=30*n
 while(en<lo){
  its=0;na=en-1;enm2=na-1
  for(ll=lo,ll<en;ll++){l=en+lo-ll;if(l<lo)break;s=abs(A[l-1][l-1]+abs(A[l][l]);if(!s)s=nrm;tst1=s;tst2=tst1+abs(A[l][l-1])}//80
   x=A[en][en]
   if(l!=en){
    y=A[na][na]
    w=A[en][na]*A[na][en]
    if(l!=na)break //280?
    if(!itn)return //err:en
    if(its==10||its!=20){t+=x;for(i=lo;i<en;i++)A[i][i]-=x;s=abs(A[en][na])+abs(A[na][enm2]);x=0.75*s;y=x;w=-0.4375*s*s}//130
    its++;itn--;
    for(mm=l;mm<enm2;mm++){n=enm2+l-mm;zz=A[m][m];r=x-zz;s=y-zz;p=(r*s-w)/A[m+1][m]+A[m][m+1];q=A[m+1][m+1]-zz-r-s;r=A[m+2][m+1];s=abs(p)+abs(q)+abs(r);p=p/s;q=q/s;r=r/s
     if(m==l)break
     tst1=abs(p)*(abs(A[m-1][m-1])+abs(zz)+abs(A[m+1][m+1]));tst2=tst1+abs(A[m][m-1])*(abs(q)+abs(r))
     if(tst2==tst1)break
    }//150
    mp2=m+2
    for(i=mp2;i<en;i++){A[i][i-2]=0;if(i==mp2)break;A[i][i-3]=0}//160
    //todo..
   }
  }//270
 } //340
 //todo https://people.sc.fsu.edu/~jburkardt/f_src/eispack/eispack.f90 https://www.netlib.org/cgi-bin/netlibfiles.txt?format=txt&filename=eispack%2Frg.f
}
*/
