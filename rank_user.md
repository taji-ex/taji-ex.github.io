---
title: user_rank
---

{:.screen_name}
## screen_name

### summary 

{:.table-user-rank}
|date|rank|
|----|----|
|20220101|1|



<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
function isNumber(val){
    var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    return regexp.test(val);
}
$(function() {
    var user_id = $(location).attr('hash').replace('#', '');

    var app_host = 'https://taji-ex-mbot.herokuapp.com/user/';
    var force_remote = false;
    if (force_remote && (location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
        app_host = 'http://127.0.0.1:8000/user/';
    }
    console.dir(app_host);
    if (isNumber(user_id)) {
        console.dir(user_id);

        $.get(app_host + user_id, function(data){
            $('.table-user-rank td').remove();
            $('#screen_name').text(data['user']['screen_name']);
            $(data['data']).each(function(i, v) {
                console.dir([i, v]);
                _d = v['lyric']['timecreated'].split(' ')[0];

                html = '<tr>';
                html += '<td>' + _d + '</td>';
                html += '<td>' + v['rank'] + '</td>';
                html += '</tr>';
                console.dir(html);
                $('.table-user-rank tr:last').after(html);
            });
        });
    }
});
</script>


