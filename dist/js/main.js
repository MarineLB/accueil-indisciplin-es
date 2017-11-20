var titre = $('#titre'),
    couches = $('.couche');

$( window ).scroll(function() {
    var scrollTop = $(this).scrollTop(),
        opaScroll = (scrollTop/100);
    titre.css("transform", 'translateZ('+(scrollTop+'px')+')');
    //checkIfRemove(titre);

    couches.each(function (index){
        var current = $(this);
        var translateIndex = index*1000+1000;
        var rotate = opaScroll;

        current.css("transform", 'translateZ('+(scrollTop-translateIndex+'px')+') rotate('+(rotate+'deg')+')');
        //checkIfRemove(current);
    });
});

/* supprimer la couche une fois qu'elle a dépassée le viewport
function checkIfRemove(element){
    var matrix = element.css("transform");
    var translate_val = matrix.match(/-?[\d\.]+/g);
    var translateZ_val = translate_val[15];
    if(translateZ_val > 1000){
        element.remove();
    }
}*/
