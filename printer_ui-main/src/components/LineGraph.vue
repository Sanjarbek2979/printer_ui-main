<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "LineGraph",
  components: {Bar},
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 210
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object ,
      default: () => {
      }
    },
    plugins: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          data: [40, 20, 12,14,16,24,34,11,7,12,14,7],
          label:'Applications number',
          backgroundColor: '#2199b4'
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>

<style scoped>

</style>
