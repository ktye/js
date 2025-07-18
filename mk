j="lu.js qr.js fft.js"
m="sin cos atan2 sqrt abs hypot log log10 log2 exp min max"

cat << EOF
<!DOCTYPE html>
<head><meta charset="utf-8">
<link rel=icon href="../kelas16.png">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1">
<title>js</title>
<style>*{font-family:monospace;margin:0;border:none;padding:0;}
body{overflow:hidden;height:100dvh;display:grid;grid-template-rows:auto 1fr}
[contenteditable="true"]{background-color:#000;color:#fff;border:none;outline:none}
#i{flex-grow:1;min-height:4em;width:100vw;top:0;overflow:auto;resize:vertical}
#o{flex-grow:1;min-height:4em;background-color:#fff;width:100vw;bottom:0;overflow:auto}
.b:hover{cursor:pointer}
.w{background:white;color:black}
@media(orientation:portrait){*{font-size:x-large}}
</style>
<script>
EOF

echo -n "let pi=Math.PI"
for x in $m; do
 echo -n ",$x=Math.$x"
done
for f in $j; do
 awk '/^$/{++x}{if(1==x)print}' $f
done

cat << EOF 
</script>
<script>

let cols=()=>Math.floor(document.body.getBoundingClientRect().width/cw),
_jdo=s=>{s=i.innerText.trim();
 if(s){
  o.textContent=String(eval(s));
}}

window.init=()=>{_jdo()
 let f=window.location.hash;if(f)i.innerText=decodeURIComponent(f.slice(1))
 i.onblur=e=>{if(!o.textContent)_jdo()}
 i.oninput=e=>o.textContent=""
}
window.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();let s=window.getSelection();
 if(s.toString().length)lastsel=s.getRangeAt(0) //rightclick sometimes clears the current selection
 else{s.removeAllRanges();if(lastsel)s.addRange(lastsel)}
 window.find(s.toString(),false,false,true);lastsel=window.getSelection().getRangeAt(0)}
window.onerror=(m,s,l,c,e)=>{o.textContent+="\n"+s+m}
window.onunhandledrejection=e=>{o.textContent+="\n"+e.reason+"\n";console.log(e.reason)}

</script>
</head>

<body onload="window.init()">
<pre id="i" contenteditable="true" spellcheck="false" autofocus></pre>
<pre id="o">
EOF

for f in $j; do 
 awk '/^$/{++x}{if(1==x)print}' $f | sed -n 's/^let \([a-z][a-z0-9]*\)=.*/\1/p' | tr '\n' ' '
done

cat << EOF
</pre></pre>
<span id="measure" style="position:absolute;top:0;z-index:-1">0123456789</span>
</body></html>
EOF
