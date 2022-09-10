function isNumber(val) {
    var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    return regexp.test(val);
}
// https://zukucode.com/2017/04/javascript-date-format.html
function formatDate (date, format) {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
  };

$(function () {
    $('.table-user-rank td').remove();
    var user_id = $(location).attr('hash').replace('#', '');

    var app_host = 'https://taji-ex-mbot.herokuapp.com/user/';
    var force_remote = false;
    if (force_remote && (location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
        app_host = 'http://127.0.0.1:8000/user/';
    }
    //console.dir(app_host);
    if (isNumber(user_id)) {
        //console.dir(user_id);

        $.get(app_host + user_id, function (data) {
            //console.dir(data);
            var header = '<a href="https://twitter.com/' + data['user']['user_name'] + '">' + data['user']['screen_name'] + '</a>';
            $('#screen_name').html(header);
            $(data['data']).each(function (i, v) {
                //console.dir([i, v]);
                _d = new Date(v['lyric']['timecreated']);

                html = '<tr>';
                html += '<td>' + formatDate(_d, 'yyyy-MM-dd') + '</td>';
                html += '<td>' + v['rank'] + '</td>';
                html += '</tr>';
                //console.dir(html);
                $('.table-user-rank tr:last').after(html);
            });
        });
    }
});
