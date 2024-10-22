import { useEffect, useRef } from "preact/hooks";
import {
  Chart,
  type ChartDataset,
  type ChartOptions,
  registerables,
} from "chartjs";
import type { PropertyHistory } from "../src/property_history.model.ts";

export default function AssessmentChart(
  props: { histories: PropertyHistory[] },
) {
  const canvas = useRef<HTMLCanvasElement>(null);

  const options: ChartOptions = {
    layout: { autoPadding: true },
    plugins: {
      title: { text: "Historical Assessments", display: true },
      legend: { display: false },
    },
  };

  useEffect(() => {
    if (!canvas.current) return;

    Chart.register(...registerables);
    new Chart(canvas.current, {
      type: "line",
      options: options,
      data: {
        datasets: [
          {
            weight: 100,
            label: "assessment",
            data: props.histories.map(asPoints),
            clip: 20,
            pointRadius: 4,
            cubicInterpolationMode: "monotone",
          } as ChartDataset,
        ],
      },
    });
  }, [props.histories]);

  return <canvas ref={canvas} />;
}

function asPoints(history: PropertyHistory) {
  return {
    x: history.assessment_year,
    y: history.assessed_value,
  };
}
