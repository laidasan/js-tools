$ = function(selector) {
    return document.querySelector(selector);
}, $$ = function(selector) {
    return document.querySelectorAll(selector);
};

// 显示图片
var htmlPic = '', arrayPic = [1, 8, 3, 4, 6, 7, 10, 13, 15], rotate = 360 / arrayPic.length;
                
arrayPic.forEach(function(i) {
    htmlPic = htmlPic + '<img id="piece'+ i +'" class="piece" src="https://fakeimg.pl/128x90/" />';	
});
    
// 元素
var eleStage = $("#stage"), eleContainer = $("#container"), indexPiece = 0;
// 元素
var elePics = $$(".piece"), transZ = 64 / Math.tan((rotate / 2 / 180) * Math.PI);

eleContainer.innerHTML = htmlPic;
eleContainer.addEventListener("click", function() {
    transform(this, "rotateY("+ (-1 * rotate * ++indexPiece) +"deg)");	
});




arrayPic.forEach(function(i, j) {
    transform($("#piece" + i), "rotateY("+ j * rotate +"deg) translateZ("+ (transZ + 20) +"px)");	
});	