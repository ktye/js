let bench=_=>{
 let vec=x=>{x=new Float64Array(x);for(let i=0;i<x.length;i++)x[i]=Math.random()-0.5;return x}
 let mat=(n,m)=>Array(n).fill([]).map(x=>vec(m))
 let t={
  lsq:_=>{let q=qr(mat(4,2000)),y,x=vec(2000);for(let i=0;i<1000;i++)y=qrsolve(q,x)},
  fft:_=>{let f=fft(1024),x=vec(1024);for(let i=0;i<1024;i++){x=fft(x,f);for(let j=0;j<1024;j++)x[j]*=0.03125}},
 }
 let o="";for(let k in t){let t0=performance.now();t[k]();o+=k+" "+(performance.now()-t0)+"\n";};return o
}
