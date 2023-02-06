function button(href,x,y) {
    var button = '<a  style="position:fixed;top:'+y+'px;right:'+x+'px;z-index:10000;text-decoration:none;font-size:40px;" class="download-button" download><span class="" >⬇️</span></a>';
    return button;
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
const arr = []; 


window.setTimeout(function(){

    $(".web").append(button("#",0,0));

    $(".download-button").on("click",function(){

        download("whatsapp-contact.txt", arr.join("\n"));

    });

},1000);




window.setInterval(function(){
    var str = document.getElementById("app").innerHTML;
    if(str !== null) {
        var res = str.split("+");
    
        for(i = 0; i < res.length; i++) {
        
            var x = res[i].slice(0, 16);
            x = x.replace("<","");
            x = x.replace('"',"");
            if(x.startsWith("90")) {
                if(arr.indexOf(x) === -1) {
                    arr.push(x);
                    console.log(x + " eklendi");
                }
            }
        }
    }
    
}, 500);


