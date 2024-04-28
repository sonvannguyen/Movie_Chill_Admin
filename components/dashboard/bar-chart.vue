<template>
  <div>
    <canvas id="bar-chart" height="300" width="500"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart, type ChartItem } from 'chart.js/auto'

const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true,
  },
})

const chart = ref<Chart>()

const crosshair = {
  id: 'crosshair',
  defaults: {
    width: 0.5,
    color: '#666666',
    dash: [5, 5],
  },
  afterDatasetsDraw: (chart: any, _: any, opts: any) => {
    const { ctx, tooltip } = chart
    const { top, bottom } = chart.chartArea
    const { x } = chart.scales

    if (tooltip._active?.length > 0) {
      // Draw vertical line
      const xCoor = x?.getPixelForValue(tooltip.dataPoints[0].dataIndex)
      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = opts.width
      ctx.strokeStyle = opts.color
      ctx.setLineDash(opts.dash)
      ctx.moveTo(xCoor, top)
      ctx.lineTo(xCoor, bottom)
      ctx.stroke()
      ctx.closePath()
    }
  },
}

onMounted(() => {
  const ctx: ChartItem = document.getElementById('bar-chart') as ChartItem

  chart.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.data.map((item: any) => item.stats_time),
      datasets: [
        {
          data: props.data.map((item: any) => item.total_user),
          label: 'Users',
          backgroundColor: '#3cba9f',
        },
      ],
    },
    options: {},
    plugins: [crosshair],
  })
})
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
