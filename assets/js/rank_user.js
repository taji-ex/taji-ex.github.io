function isNumber(val) {
    var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    return regexp.test(val);
}
// https://zukucode.com/2017/04/javascript-date-format.html
function formatDate(date, format) {
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

    var h = $(window).height();
    $("#overlay").height(h);
    $("#overlay").fadeIn(300);

    $('.table-rank-history td').remove();
    var user = $(location).attr('hash').replace('#', '');

    var app_host = 'https://taji-ex-mbot.herokuapp.com/user/';
    var force_remote = false;
    if (!force_remote && (location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
        app_host = 'http://127.0.0.1:8000/user/';
    }
    //console.dir(app_host);
    $.get(app_host + user, function (data) {
        //console.dir(data);
        setTimeout(function () { $("#overlay").fadeOut(300); }, 500);

        var header = '<a href="https://twitter.com/' + data['user']['user_name'] + '">' + data['user']['screen_name'] + '</a>';
        $('#screen_name').html(header);

        //console.log(data['data'].length);
        _d = new Date(data['data'][data['data'].length - 1]['lyric']['timecreated']);
        $($('.dl-summary dd')[0]).html(formatDate(_d, 'yyyy-MM-dd'));
        $($('.dl-summary dd')[1]).html(data['data'].length);

        $(data['data']).each(function (i, v) {
            //console.dir([i, v]);
            _d = new Date(v['lyric']['timecreated']);

            html = '<tr>';
            html += '<td>' + formatDate(_d, 'yyyy-MM-dd') + '</td>';
            html += '<td>' + v['rank'] + '</td>';
            html += '</tr>';
            //console.dir(html);
            $('.table-rank-history tr:last').after(html);
        });

        var current_streaks = 0;
        var streaks_period = null;
        var previewDate = null;
        //console.dir([data['data'].length, data['tweets'].length]);
        for (var i = 0; data['data'].length > i; i++) {
            var _data = data['data'][i]['lyric'];
            var _tweet = data['tweets'][i];
            previewDate = _data['timecreated'];
            //console.dir([_data, _tweet]);
            //console.dir([_data['tweet_id'], _tweet['tweet_id']]);
            if (_data['tweet_id'] == _tweet['tweet_id']) {
                current_streaks++;
            } else {
                var _today = new Date();
                var _d = new Date(previewDate);
                var diff = _today - _d;
                streaks_period = parseInt(diff / 1000 / 60 / 60 / 24);

                //console.dir([streaks_period, _today, _data, _tweet]);

                break;
            }
        }
        $($('.dl-summary dd')[2]).html(current_streaks + '/' + streaks_period);
    });
});
