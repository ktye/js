
let solve=(A,b)=>{let P=lup(A);return lupsolve(A,P,b)} //A:complex(n x 2*n) modified
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
