import { toast } from "react-toastify";
import moment from "moment";

export const notify = (msg, type = "success") =>
  toast[type](msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const formatCurrency = (val) => {
  return `$${parseFloat(val / 100).toFixed(2)}`;
};

export const total = (items) => {
  let total = 0;

  items.forEach((item) => {
    if (item.qty > 1) {
      total += parseFloat(item.price) * parseFloat(item.qty);
    } else {
      total += parseFloat(item.price);
    }
  });

  return parseFloat(total).toFixed(2);
};

export const formatDate = (val, format = "MM.DD.YYYY") => {
  if (val) return moment(val).format(format);

  return "";
};

export const dashboardGraph = () => {
  (function () {
    var MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var COLORS = [
      "#4dc9f6",
      "#f67019",
      "#f53794",
      "#537bc4",
      "#acc236",
      "#166a8f",
      "#00a950",
      "#58595b",
      "#8549ba",
    ];

    var Samples = window.Samples || (window.Samples = {});
    var Color = window.Color;

    Samples.utils = {
      // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
      srand: function (seed) {
        this._seed = seed;
      },

      rand: function (min, max) {
        var seed = this._seed;
        min = min === undefined ? 0 : min;
        max = max === undefined ? 1 : max;
        this._seed = (seed * 9301 + 49297) % 233280;
        return min + (this._seed / 233280) * (max - min);
      },

      numbers: function (config) {
        var cfg = config || {};
        var min = cfg.min || 0;
        var max = cfg.max || 1;
        var from = cfg.from || [];
        var count = cfg.count || 8;
        var decimals = cfg.decimals || 8;
        var continuity = cfg.continuity || 1;
        var dfactor = Math.pow(10, decimals) || 0;
        var data = [];
        var i, value;

        for (i = 0; i < count; ++i) {
          value = (from[i] || 0) + this.rand(min, max);
          if (this.rand() <= continuity) {
            data.push(Math.round(dfactor * value) / dfactor);
          } else {
            data.push(null);
          }
        }

        return data;
      },

      labels: function (config) {
        var cfg = config || {};
        var min = cfg.min || 0;
        var max = cfg.max || 100;
        var count = cfg.count || 8;
        var step = (max - min) / count;
        var decimals = cfg.decimals || 8;
        var dfactor = Math.pow(10, decimals) || 0;
        var prefix = cfg.prefix || "";
        var values = [];
        var i;

        for (i = min; i < max; i += step) {
          values.push(prefix + Math.round(dfactor * i) / dfactor);
        }

        return values;
      },

      months: function (config) {
        var cfg = config || {};
        var count = cfg.count || 12;
        var section = cfg.section;
        var values = [];
        var i, value;

        for (i = 0; i < count; ++i) {
          value = MONTHS[Math.ceil(i) % 12];
          values.push(value.substring(0, section));
        }

        return values;
      },

      color: function (index) {
        return COLORS[index % COLORS.length];
      },

      transparentize: function (color, opacity) {
        var alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return Color(color).alpha(alpha).rgbString();
      },
    };

    // DEPRECATED
    window.randomScalingFactor = function () {
      return Math.round(Samples.utils.rand(-100, 100));
    };

    // INITIALIZATION

    Samples.utils.srand(Date.now());

    // Google Analytics
    /* eslint-disable */
    if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
      (function (i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r;
        (i[r] =
          i[r] ||
          function () {
            (i[r].q = i[r].q || []).push(arguments);
          }),
          (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(
        window,
        document,
        "script",
        "//www.google-analytics.com/analytics.js",
        "ga"
      );
      ga("create", "UA-28909194-3", "auto");
      ga("send", "pageview");
    }
    /* eslint-enable */
  })(this);
};

export const getFullName = (user) => `${user.first_name} ${user.last_name}`;
