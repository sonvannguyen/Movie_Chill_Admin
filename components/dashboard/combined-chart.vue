<template>
  <div>
    <canvas id="combined-chart" height="300" width="500"></canvas>
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
  const ctx: ChartItem = document.getElementById('combined-chart') as ChartItem

  chart.value = new Chart(ctx, {
    data: {
      labels: props.data.map((item: any) => item.stats_time.slice(0, -5)),
      datasets: [
        {
          type: 'line',
          order: 1,
          data: props.data.map((item: any) => item.total_view),
          label: 'Views',
          borderColor: '#3cba9f',
          fill: false,
        },
        {
          type: 'bar',
          order: 2,
          data: props.data.map((item: any) => item.total_comment),
          label: 'Comments',
          backgroundColor: '#3cba9f48',
        },
      ],
    },
    options: {
      interaction: {
        intersect: false,
        mode: 'index',
      },
    },
    plugins: [crosshair],
  })
})
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
