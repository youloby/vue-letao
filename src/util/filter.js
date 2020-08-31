import Vue from 'vue';
import moment from 'moment';
Vue.filter('formatDate', function(date, format){
    return moment(date).format(format);
});
