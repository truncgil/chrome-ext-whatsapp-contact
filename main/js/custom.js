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

window.setTimeout(function(){

    $(".web").append(button("#",0,0));

    $(".download-button").on("click",function(){
        //alert("ok");

        var text = [];
        $("._7T_0D").each(function() {
            var bu = $(this);
            
            text.push(bu.text());
            
            
        });
        download("whatsapp-contact.txt", text.join("\n"));

    });

},1000);

const arr = []; 
var str = document.getElementById("app").innerHTML;

const res = str.split("+");

for(i = 0; i < res.length; i++) {

    const x = res[i].slice(0, 16);
    if(x.startsWith("90")) {
        arr.indexOf(x) === -1 ? arr.push(x) : ""; 
    }
}

console.log(arr);


/*
$("div div div span span").each(function(e,i) {
    console.log(i);

});
*/