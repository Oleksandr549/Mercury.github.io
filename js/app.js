(() => {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    Highcharts.chart("container", {
      xAxis: {
        type: "datetime",
        labels: {
          formatter: function () {
            return Highcharts.dateFormat("%b %e", this.value);
          },
        },
        tickWidth: 0,
        lineWidth: 0,
      },
      chart: {
        zoomType: "x",
        marginBottom: 100,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
      },
      title: { text: null },
      yAxis: {
        gridLineWidth: 0,
        title: { text: null },
        labels: { enabled: !1 },
      },
      legend: { enabled: !1 },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, "#E9FAF8"],
              [1, "#fff"],
            ],
          },
          lineWidth: 1,
          marker: {
            enabled: !1,
            symbol: "circle",
            radius: 4,
            states: {
              hover: { fillColor: "white", lineWidth: 2, lineColor: "#0C897B" },
            },
          },
          states: { hover: { lineWidth: 1 } },
          threshold: null,
        },
        series: {
          events: {
            legendItemClick: function () {
              var t = this.chart,
                e = 0;
              t.series.forEach(function (t) {
                t.visible &&
                  t.data.forEach(function (t) {
                    e += t.y;
                  });
              }),
                t.customText
                  ? t.customText.attr({
                      text:
                        "<p>Cumulative money in </p> $" +
                        Highcharts.numberFormat(e, 2, ".", ","),
                    })
                  : (t.customText = t.renderer
                      .text(
                        "<p>Cumulative money in </p>  $" +
                          Highcharts.numberFormat(e, 2, ".", ","),
                        10,
                        20
                      )
                      .add());
            },
          },
        },
      },
      tooltip: {
        useHTML: !0,
        backgroundColor: "#201f2f",
        borderColor: "#201f2f",
        padding: "20px",
        style: {
          fontSize: "24px",
          fontWeight: "500",
          color: "#e6e6e6",
          padding: "20px",
          borderRadius: "5px",
        },
        formatter: function () {
          return (
            Highcharts.dateFormat("%b %e", this.x) +
            "<br/>$$" +
            Highcharts.numberFormat(this.y, 2, ".", ",")
          );
        },
        shared: !0,
      },
      exporting: { enabled: !1 },
      credits: { enabled: !1 },
      series: [{ type: "area", name: "", data: dataa, lineColor: "#0C897B" }],
      chart: {
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
        spacing: [0, 0, 0, 0],
        events: {
          load: function () {
            var t,
              e,
              i,
              o = this,
              r = o.series[0];
            (t = o.renderer
              .circle(0, 0, 4)
              .attr({
                fill: "white",
                stroke: "#5266eb",
                "stroke-width": 2,
                zIndex: 10,
                visibility: "hidden",
              })
              .add()),
              (e = o.renderer
                .path([
                  "M",
                  -9999,
                  o.plotTop,
                  "L",
                  -9999,
                  o.plotTop + o.plotHeight,
                ])
                .attr({
                  "stroke-width": 2,
                  stroke: "#5266eb",
                  zIndex: 9,
                  visibility: "hidden",
                })
                .add()),
              (i = o.renderer
                .label("", 0, 0, "rect", null, null, !0)
                .attr({
                  fill: "#1f1f30",
                  padding: 5,
                  paddingLeft: 15,
                  paddingRight: 15,
                  r: 5,
                  zIndex: 8,
                  visibility: "hidden",
                })
                .css({ color: "white", fontSize: "14px", lineHeight: "180%" })
                .hide()
                .add()),
              (o.container.onmousemove = function (l) {
                var a = l.clientX - o.plotLeft - o.spacingBox.x - 558,
                  n = i.width,
                  d = r.searchPoint({ chartX: a });
                if (d) {
                  var s = r.yData
                      .slice(0, d.index + 1)
                      .reduce((t, e) => t + e, 0),
                    h = document.querySelector(".sum"),
                    p = document.querySelector(".dollars"),
                    c = document.querySelector(".cents");
                  if (p && c) {
                    var f = Highcharts.numberFormat(1e5, 2, ".", ",").split(
                      "."
                    );
                    (p.textContent = f[0]), (c.textContent = "." + f[1]);
                  }
                  h &&
                    (h.innerHTML =
                      "<p>Cumulative money in </p> $" +
                      Highcharts.numberFormat(s, 2, ".", ","));
                  var u = Highcharts.dateFormat("%b %e", d.x),
                    b = "$" + d.y.toFixed(2),
                    m = d.plotX + o.plotLeft + 10;
                  m + n > o.plotLeft + o.plotWidth &&
                    (m = d.plotX + o.plotLeft - n - 10),
                    t.attr({
                      x: d.plotX + o.plotLeft,
                      y: d.plotY + o.plotTop,
                      visibility: "visible",
                    }),
                    e.attr({
                      d: [
                        "M",
                        d.plotX + o.plotLeft,
                        o.plotTop,
                        "L",
                        d.plotX + o.plotLeft,
                        o.plotTop + o.plotHeight,
                      ],
                      visibility: "visible",
                    }),
                    i
                      .attr({
                        text: u + "<br>" + b,
                        x: m,
                        y: o.plotTop + 20,
                        visibility: "visible",
                      })
                      .show();
                } else
                  t.attr({ visibility: "hidden" }),
                    e.attr({ visibility: "hidden" }),
                    i.hide();
              }),
              (o.container.onmouseout = function () {
                t.attr({ visibility: "hidden" }),
                  e.attr({ visibility: "hidden" }),
                  i.hide();
              }),
              (function (l) {
                var a = r.searchPoint({ chartX: l });
                if (a) {
                  var n = Highcharts.dateFormat("%b %e", a.x),
                    d = "$" + a.y.toFixed(2);
                  t.attr({
                    x: a.plotX + o.plotLeft,
                    y: a.plotY + o.plotTop,
                    visibility: "visible",
                  }),
                    e.attr({
                      d: [
                        "M",
                        a.plotX + o.plotLeft,
                        o.plotTop,
                        "L",
                        a.plotX + o.plotLeft,
                        o.plotTop + o.plotHeight,
                      ],
                      visibility: "visible",
                    }),
                    i
                      .attr({
                        text: n + "<br>" + d,
                        x: a.plotX + o.plotLeft + 10,
                        y: o.plotTop + 20,
                        visibility: "visible",
                      })
                      .show();
                } else
                  t.attr({ visibility: "hidden" }),
                    e.attr({ visibility: "hidden" }),
                    i.hide();
              })(-9999);
          },
        },
      },
    });
  });
})();
