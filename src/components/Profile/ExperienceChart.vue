<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
<script>
import { Line } from 'vue-chartjs';
import { colorsSet, transparentColor, fontColorSet } from './ColorsConfig';
export default {
  name: 'Charts',
  props: {
    skills: {
      type: Array,
      default: () => [],
    },
    start: {
      type: Number,
      default: 0,
    },
    end: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [],
    },
    options: {
      animation: {
        onComplete: function () {
          var ctx = this.chart.ctx;
          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          this.data.datasets.forEach(function (dataset) {
            if (dataset.type == 'bubble') {
              ctx.font = '15px Consolas';
              for (var i = 0; i < dataset.data.length; i++) {
                for (var key in dataset._meta) {
                  var model = dataset._meta[key].data[i]._model;
                  ctx.fillText(dataset.data[i].label, model.x, model.y);
                }
              }
            } else {
              ctx.font = '20px Consolas';
              for (var key in dataset._meta) {
                var model =
                  dataset._meta[key].data[dataset.data.length - 2]._model;
                ctx.fillText(dataset.label, model.x - 70, model.y + 20);
              }
            }
          });
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Experience Time Chart',
        padding: 30,
        fontSize: 20,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              fontSize: 18,
              padding: 20,
              fontColor: fontColorSet,
              textAlign: 'center',
              callback: function (label, index, labels) {
                switch (label) {
                  case 1:
                    label = 'Just started';
                    return label;
                  case 2:
                    label = 'Picking up';
                    return label;
                  case 3:
                    label = 'Average';
                    return label;
                  case 4:
                    label = 'Good';
                    return label;
                  case 5:
                    label = 'Expert';
                    return label;
                }
              },
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              padding: 20,
              fontColor: fontColorSet,
            },
          },
        ],
      },
    },
  }),
  extends: Line,

  mounted() {
    for (let year = this.start; year <= this.end; year++) {
      this.chartdata.labels.push(year);
    }
    this.getDataSet();
    this.getBubbleDataSet();
    this.renderChart(this.chartdata, this.options);
  },
  methods: {
    getDataSet() {
      let dataSet = {};
      let data = [];
      this.skills.map((re, reIndex) => {
        re.timeline.map((time, index) => {
          data.push(time.expertise);
        });

        dataSet['data'] = data;
        dataSet['label'] = re.skill;
        dataSet['borderColor'] = colorsSet[reIndex];
        dataSet['fill'] = false;
        dataSet['type'] = 'line';
        this.chartdata.datasets.push(dataSet);
        data = [];
        dataSet = {};
      });
    },
    getBubbleDataSet() {
      let lab = [];
      let data = [];
      let set = {};
      let dataSet = {};
      this.skills.map((re, reIndex) => {
        re.timeline.map((time, i) => {
          if (time.tags != null) {
            time.tags.map((tag, index) => {
              if (tag != '') {
                if (time.tags.length > 1) {
                  set['y'] = time.expertise + index * 0.6;
                } else {
                  set['y'] = time.expertise;
                }
                set['x'] = time.year;
                set['r'] = 22;
                set['label'] = tag;
                data.push(set);
                set = {};
                dataSet['label'] = tag;
                dataSet['data'] = data;
                dataSet['type'] = 'bubble';
                dataSet['backgroundColor'] = transparentColor[reIndex];
                this.chartdata.datasets.push(dataSet);
                data = [];
                dataSet = {};
              }
            });
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
