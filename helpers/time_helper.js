var util = require('util');
var moment = require('moment');




function convert_to_24h(time_str) {
  console.log("time_str", time_str);
  var time = time_str.match(/(\d+):(\d+) (\w)/);
  var hours = Number(time[1]);
  var minutes = Number(time[2]);
  var meridian = time[3].toLowerCase();

  if (meridian.toLowerCase() == 'p' && hours < 12) {
    hours = hours + 12;
  }
  else if (meridian.toLowerCase() == 'a' && hours == 12) {
    hours = hours - 12;
  }
  return [hours, minutes];
}


function  get_cron_time(teamConf)
{
  var time = convert_to_24h(teamConf.time_to_ask);
  console.log("24 Hour Time", time);
  
  var cronTime = util.format("%d %d * * %s", time[1], time[0], teamConf.week_days.toString());
  return cronTime;
}


module.exports.get_cron_time = get_cron_time;