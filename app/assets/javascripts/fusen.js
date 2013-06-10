$(document).ready(function(){
    $(".fusen").draggable({
        helper: "clone",
        stop: function(event, ui) {
            var pos = ui.position;
            var obj = $("#container").addFusen(pos);
            var token = $("meta[name='csrf-token']").attr("content");
            $.post(
                "/stickies.json",
                {
                    //authenticity_token: token,
                    "sticky[top]": pos.top,
                    "sticky[left]": pos.left
                },
                function (data) {
                    obj.attr("id", "sticky_" + data.id);
                }
            );
        }
    });
});

$.fn.extend({
    addFusen: function() {
        var pos = arguments[0];
        var txt = arguments[1] || "";

        var containerObj = $(this);
        var obj = $("<div>");

        obj.addClass("fusen");
        obj.css(pos);
        obj.draggable({
            stop: function(event, ui) {
                var id = obj.attr("id");
                id = id.replace(/^[a-z0-9]+_/i, "");
                $.post(
                    "/stickies/" + id + ".json",
                    {
                        _method: "put",
                        //authenticity_token: token,
                        "sticky[top]": ui.position.top,
                        "sticky[left]": ui.position.left
                    },
                    function (data) {
                    }
                );
            }
        });
        obj.text(txt);
        obj.click(function() {
            if (!$(this).hasClass("on")) {
                $(this).addClass("on");
                var textbox = $("<textarea>");
                textbox.val($(this).text());
                $(this).html(textbox);
                textbox.focus().blur(function() {
                    var text = $(this).val();
                    $(this).parent().removeClass("on").text(text);
                    var id = obj.attr("id");
                    id = id.replace(/^[a-z0-9]+_/i, "");
                    $.post(
                        "/stickies/" + id + ".json",
                        {
                            _method: "put",
                            //authenticity_token: token,
                            "sticky[comment]": text
                        },
                        function (data) {
                        }
                    );
                });
            };
        });
        containerObj.append(obj);

        return obj;
    }
});
