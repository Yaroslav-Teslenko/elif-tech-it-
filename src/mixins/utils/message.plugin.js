export default {
  install(Vue, options) {
    /*
https://materializecss.com/toasts.html
Materialize предоставляет вам простой способ рассылать ненавязчивые предупреждения вашим пользователям в виде тостов. Эти тосты также размещаются и изменяются по размеру. Попробуйте, нажав кнопку ниже, на устройствах разных размеров.
*/
    Vue.prototype.$message = function(html) {
      // M.toast({ html: "I am a toast!" });
      // ecma6=>
      M.toast({ html });
    };
    Vue.prototype.$error = function(html) {
      M.toast({ html: `Error : ${html}` });
    };
  },
};
