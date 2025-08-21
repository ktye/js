let bench=_=>{
 let vec=x=>{x=new Float64Array(x);for(let i=0;i<x.length;i++)x[i]=Math.random()-0.5;return x}
 let mat=(n,m)=>Array(n).fill([]).map(x=>vec(m))
 let band=(A,h, B,m,n)=>{B=Array(m=2*h+1).fill([]).map(x=>new Float64Array(n=A[0].length).fill(0));for(let i=0;i<m;i++){for(let j=0;j<n;j++){let k=h+i-(j>>1);if(k>=0&&k<m)B[k][j]=A[i][j]}};return B}
 let A=mat(400,800),b=vec(2*A.length),h=15;
 A=A.map((ai,i)=>ai.map((_,j)=>A[i][j]=h<abs(i-(j>>1))?0:i==(j>>1)?1+A[i][j]:A[i][j]))
 let B=band(A,h),AA=A.map(x=>x.map(y=>y)),X
 let gemv=(A,x, r)=>{r=new Float64Array(x.length).fill(0);for(let i0=0;i0<x.length;i0+=2){let i1=1+i0,a=A[i0>>1]
  for(let j0=0;j0<x.length;j0+=2){let j1=1+j0;r[i0]+=a[j0]*x[j0]-a[j1]*x[j1];r[i1]+=a[j0]*x[j1]+a[j1]*x[j0]}};return r}
 let t={
  lsq:_=>{let q=qr(mat(4,2000)),y,x=vec(2000);for(let i=0;i<1000;i++)y=qrsolve(q,x)},
  fft:_=>{let f=fft(1024),x=vec(1024);for(let i=0;i<1024;i++){x=fft(x,f);for(let j=0;j<1024;j++)x[j]*=0.03125}},
  lup:_=>{let P=lup(A);X=lupsolve(A,P,b)},
  mul:_=>{let r=gemv(AA,X),e=0;for(let i=0;i<r.length;i++)e=max(e,abs(r[i]-b[i]));  if(e>1e-12)throw("lup result")},
  lub:_=>{B=lub(B);let r=lubsolve(B,b),e=0;r.forEach((ri,i)=>e=max(e,abs(ri-X[i])));if(e>1e-12)throw("lub result")},
 }
 let o="";for(let k in t){let t0=performance.now();t[k]();o+=k+" "+(performance.now()-t0)+"\n";};return o
}
