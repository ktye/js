let sin=Math.sin,cos=Math.cos,atan2=Math.atan2,sqrt=Math.sqrt,abs=Math.abs,hypot=Math.hypot,log=Math.log,log10=Math.log10,log2=Math.log2,exp=Math.exp,sign=Math.sign,floor=Math.floor,ceil=Math.ceil,round=Math.round,min=Math.min,max=Math.max,random=Math.random;const pi=Math.PI
let zdiv=(xr,xi,yr,yi)=>{let r=0,d=0,e=0,f=0;if(abs(yr)>=abs(yi)){r=yi/yr;d=yr+r*yi;e=(xr+xi*r)/d;f=(xi-xr*r)/d}else{r=yr/yi;d=yi+r*yr;e=(xr*r+xi)/d;f=(xi*r-xr)/d};return[e,f]}
let errif=(x,e)=>{if(x)throw new Error(e)}

let copy=A=>{let r=A.slice();r.m=A.m;r.n=A.n;r.z=A.z;return r}
let zeros=(m,n)=>{n=n||1;let r=new Float64Array(  m*n);r.m=m;r.n=n;return r}
let zeroz=(m,n)=>{n=n||1;let r=new Float64Array(2*m*n);r.m=m;r.n=n;r.z=1;return r}
let rand=(m,n)=>{let r=zeros(m,n),i;for(i=0;i<r.length;i++)r[i]=random();return r}
let randz=(m,n)=>{let x=zeroz(m,n),N=x.length,i;for(let i=0;i<N;i+=2){let r=sqrt(min(1489,-2*log(random()))),p=random()*2*pi;x[i]=r*cos(p);x[1+i]=r*sin(p)};return x}
let randn=(m,n)=>{let x=randz(1,((m*n)>>1)+(1&(m*n)));x=x.subarray(0,m*n);x.m=m;x.n=n;x.z=0;return x}
let eye=n=>{let r=zeros(n,n),nn=n*n,n1=1+n;for(let i=0;i<nn;i+=n1)r[i]=1;return r}
let eyez=n=>{let r=zeroz(n,n),nn=2*n*n,n1=2+2*n;for(let i=0;i<nn;i+=n1)r[i]=1;return r}
let ones=(m,n)=>{let r=zeros(m,n);for(let i=0;i<r.length;i++)r[i]=1;return r}
let onez=(m,n)=>{let r=zeroz(m,n);for(let i=0;i<r.length;i+=2)r[i]=1;return r}
let iota=(m,n)=>{let r=zeros(m,n);for(let i=0;i<r.length;i++)r[i]=i;return r}

let trans=x=>{if(x.z)return tranz(x);let r=zeros(x.n,x.m),i,j,n=x.n,m=x.m,k=0;for(i=0;i<m;i++)for(j=0;j<n;j++)r[j*m+i]=x[k++];return r}
let tranz=x=>{let r=zeroz(x.n,x.m),i,j,n=x.n,m=x.m,m2=2*m,k=0;for(i=0;i<m;i++)for(j=0;j<n;j++){r[j*m2+i]=x[k++];r[j*m2+i+1]=x[k++]}return r}

let dotmm=(A,B)=>{errif(A.n!=B.m,"inner dimension");if(A.z)return dotmmz(A,B);let m=A.m,k=A.n,n=B.n,C=zeros(m,n);const S=64;for(let i0=0;i0<m;i0+=S){const ii=Math.min(i0+S,m);for(let j0=0;j0<n;j0+=S){const jj=Math.min(j0+S,n);for(let p0=0;p0<k;p0+=S){const pp=Math.min(p0+S,k);for(let i=i0;i<ii;++i){const aa=i*k,cc=i*n;for(let p=p0;p<pp;++p){const a=A[aa+p],bb=p*n;for(let j=j0;j<jj;++j)C[cc+j]+=a*B[bb+j]}}}}}return C}
let dotmv=(A,x)=>{errif(A.m!=x.length,"inner dimension");if(A.z)return dotmvz(A,x);const m=A.m,n=A.n,y=zeros(m,1),S=64;for(let p0=0;p0<n;p0+=S){const pp=Math.min(p0+S,n);for (let i=0;i<m;++i){const a0=i*n;let s=0;for(let p=p0;p<pp;++p)s+=A[a0+p]*x[p];y[i]+=s}};return y}
let dotmmz=(A,B)=>{const m=A.m,k=A.n,n=B.n,C=zeroz(m,n),S=64;for(let i0=0;i0<m;i0+=S){const ii=Math.min(i0+S,m);for(let p0=0;p0<k;p0+=S){const pp=Math.min(p0+S,k);for(let j0=0;j0<n;j0+=S){const jj=Math.min(j0+S,n);
 for(let i=i0;i<ii;++i){const a0=(i*k)<<1,c0=(i*n)<<1;for(let p=p0;p<pp;++p){const ia=a0+(p<<1),ax=A[ia],ay=A[ia+1],b0=(p*n)<<1;for(let j=j0;j<jj;++j){const ib=b0+(j<<1),bx=B[ib],by=B[ib+1],ic=c0+(j<<1),x=ax*bx-ay*by,y=ax*by+ay*bx;C[ic]+=x;C[ic+1]+=y}}}}}}return C}
let dotmvz=(A,x)=>{const m=A.m,n=A.n,y=zeroz(m,1),S=64;for(let p0=0; p0<n;p0+=S){const pp=Math.min(p0+BS,n);for(let i=0;i<m;++i){const a0=(i*n)<<1;let sx=0,sy=0;for(let p=p0;p<pp;++p){const ia=a0+(p<<1),ax=A[ia],ay=A[ia+1],ix=p<<1,re=x[ix],im=x[ix+1];sx+=ax*re-ay*im;sy+=ax*im+ay*re};const iy=i<<1;y[iy]+=sx;y[iy+1]+=sy}};return y}


let time=(f,n)=>{let t0=performance.now();if(n)while(n--)f();else f();return performance.now()-t0}


let snum=x=>{let a=abs(x)>1000||abs(x)<0.0001?x.toPrecision(6):x.toFixed(6),b=String(x);return b.length<a.length?b:a}
let znum=(x,y)=>{let r=hypot(x,y),a=atan2(y,x)/pi*180;if(a<0)a+=360;return snum(r)+"a"+a.toFixed(0).padStart(3,"0")}
let smat=x=>{if(x.constructor!=Float64Array)return String(x);let colpad=(x,j)=>{let l=max(...x.map(x=>x[j].length));x.forEach(x=>x[j]=x[j].padStart(l," "));return x}
 if(x.m&&x.n){let m=min(20,x.m),n=min(20,x.n),z=x.z||0,r=[],i,j;for(i=0;i<m;i++){r[i]=[];for(j=0;j<n;j++)r[i][j]=z?znum(x[i*2*x.n+2*j],x[i*2*x.n+2*j+1]):snum(x[i*x.n+j])};for(j=0;j<n;j++)colpad(r,j);r=r.map(x=>x.join(" "));for(i=0;i<m;i++)r[i]+=x.n>20?"..\n":"\n";return r.join("")+(x.m>20?"..\n":"")}
 else return Array.from(x.subarray(0,min(x.length,20))).map(snum).join(" ")+(x.length>20?"..":"")}
 

let qr=A=>{A=copy(A);const m=A.m,n=A.n,r=new Float64Array(n);
 for(let c=0;c<n;c++){let n2=0;for(let i=c;i<m;i++){const v=A[i*n+c];n2+=v*v;}
  if(n2==0){r[c]=0;continue;};const x0=A[c*n+c],n1=Math.sqrt(n2),s=x0>=0?1:-1,a=-s*n1,v0=x0-a;
  r[c]=v0/a;A[c*n+c]=a;for(let i=c+1;i<m;i++){A[i*n+c]/=v0}
  for(let j=c+1;j<n;j++){let w=A[c*n+j];for(let i=c+1;i<m;i++)w+=A[i*n+c]*A[i*n+j];
   const sc=r[c]*w;A[c*n+j]-=sc;for(let i=c+1;i<m;i++){A[i*n+j]-=sc*A[i*n+c];}}};return[A,r]}
let qrsolve=(Q,B)=>{
 const QtB(A,T,B){const m=A.m,n=A.n,nr=B.n,Y=copy(B);
  for(let c=n-1;c>=0;c--){const t=T[c];if(t==0)continue;
   for(let r=0;r<nr;r++){let w=Y[c*nr+r];for(let i=c+1;i<m;i++)w+=A[i*n+c]*Y[i*nr+r];
    const sc=t*w;Y[c*nr+r]-=sc;for(let i=c+1;i<m;i++)Y[i*nr+r]-=sc*A[i*n+c]}}
  Y.m=n;Y=Y.subarray(0,n*nr);Y.m=n;Y.n=n;return Y}
 const[A,t]=Q,Y=QtB(A,t,B),n=A.n,nr=B.n,X=zeros(n,nr);
 for(let r=0;r<nr;r++){for(let i=n-1;i>=0;i--){let s=Y[i*nr+r];for(let j=i+1;j<n;j++)s-=A[i*n+j]*X[j*nr+r];X[i*nrhs+r]=s/A[i*n+i]}}
 return X}

