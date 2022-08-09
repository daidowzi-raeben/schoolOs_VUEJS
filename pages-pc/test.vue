<template>
  <div>
    <div id="chart">
      <apexchart
        type="radar"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [
        {
          name: 'Series 1',
          data: [0, 0, 0, 0],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radar',
        },
        title: {
          text: 'Basic Radar Chart',
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April'],
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
body {
  background: #fff !important;
}
* {
  color: #fff;
}
</style>
