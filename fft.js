/*
let fft8=x=>{const Q=Math.SQRT1_2;let r=new Float64Array([
 x[0]-x[8],x[1]-x[9],x[2]-x[10],x[3]-x[11],x[4]-x[12],x[5]-x[13],x[6]-x[14],x[7]-x[15],
 x[8]+x[0],x[9]+x[1],x[10]+x[2],x[11]+x[3],x[12]+x[4],x[13]+x[5],x[14]+x[6],x[15]+x[7]])
 x[0]=r[8]+r[12];x[1]=r[9]+r[13];x[2]=r[0]+r[5];x[3]=r[1]-r[4];x[4]=r[8]-r[12];x[5]=r[9]-r[13];x[6]=r[0]-r[5];x[7]=r[1]+r[4];
 x[8]=r[10]+r[14];x[9]=r[11]+r[15];x[10]=r[2]+r[7];x[11]=r[3]-r[6];x[12]=r[10]-r[14];x[13]=r[11]-r[15];x[14]=r[2]-r[7];x[15]=r[3]+r[6];
 r[0]=x[0]+x[8];r[1]=x[1]+x[9];r[2]=x[2]+Q*x[10]+Q*x[11];r[3]=x[3]+Q*x[11]-Q*x[10];r[4]=x[4]+x[13];r[5]=x[5]-x[12];r[6]=x[6]-Q*x[14]+Q*x[15];r[7]=x[7]-Q*x[15]-Q*x[14];
 r[8]=x[0]-x[8];r[9]=x[1]-x[9];r[10]=x[2]-Q*x[10]-Q*x[11];r[11]=x[3]-Q*x[11]+Q*x[10];r[12]=x[4]-x[13];r[13]=x[5]+x[12];r[14]=x[6]+Q*x[14]-Q*x[15];r[15]=x[7]+Q*x[15]+Q*x[14];
 return r}
let fft=x=>{const n=x.length/2; if(1==n){return x}  //if(8==n)return fft8(x);
 let o=new Float64Array(n)
 for(let i=0;i<n;i+=2){o[i]=x[  2*i];o[1+i]=x[1+2*i]};let e=fft(o)
 for(let i=0;i<n;i+=2){o[i]=x[2+2*i];o[1+i]=x[3+2*i]};    o=fft(o)
 let dp=Math.PI/(2*n),p=0;for(let i=0;i<n;i+=2){
  let s=Math.cos(p),c=Math.sin(p),a=o[i],b=o[1+i];
  o[i]=a*c+b*s;o[1+i]=b*c-a*s;
  //o[i]=a*c-b*s;o[1+i]=a*s+b*c;
  p+=dp}
 for(let i=0;i<n;i++){x[i]=e[i]+o[i];x[i+n]=e[i]-o[i]}
 return x}


console.log(fft8([1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0]))
console.log(fft ([1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0]))
*/

let fft=(x,ini)=>{ //fft([1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0]) or reuse: f=fft(8);fft([1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0],f)
 let init=N=>{let l=Math.log2(N),P=Array(8).fill(0),n=1,S=new Float64Array(N),C=new Float64Array(N);for(let p=0;p<l;p++){for(let i=0;i<n;i++){P[i]<<=1;P[i+n]=1+P[i]};n<<=1};for(let i=0;i<N;i++){const p=-2*Math.PI*i/N;C[i]=Math.cos(p);S[i]=Math.sin(p)};return[l,P,C,S,N]}
 let perm=(x,P)=>{P.forEach((p,i)=>{if(i<p){const a=2*i,b=1+a,c=2*p,d=1+c,A=x[a],B=x[b];x[a]=x[c];x[b]=x[d];x[c]=A;x[d]=B}})}
 if("number"==typeof x)return init(x)
 let[l,P,C,S,N]=ini?ini:init(x.length/2);perm(x,P);let n=1,s=N
 for(let p=1;p<=l;p++){s>>=1;for(let b=0;b<s;b++){const o=2*b*n;for(let k=0;k<n;k++){const i=(k+o)<<1,j=i+(n<<1),ks=k*s,kn=s*(k+n);let xi0=x[i],xi1=x[1+i],xj0=x[j];x[i]+=C[ks]*x[j]-S[ks]*x[1+j];x[1+i]+=C[ks]*x[1+j]+S[ks]*x[j];x[j]=xi0+C[kn]*x[j]-S[kn]*x[1+j];x[1+j]=xi1+C[kn]*x[1+j]+S[kn]*xj0}};n<<=1}
 return x}
