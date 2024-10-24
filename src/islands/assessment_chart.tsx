import { useEffect, useRef } from "preact/hooks";
import {
  Chart,
  type ChartDataset,
  type ChartOptions,
  registerables,
} from "chartjs";
import type { Property } from "../lib/data.edmonton.ca/property.type.ts";

export default function AssessmentChart(
  props: { histories?: Partial<Property>[] },
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
            data: props.histories?.map((history) => ({
              x: history.assessment_year?.toString(),
              y: history.assessed_value,
            })),
            clip: 20,
            pointRadius: 4,
            cubicInterpolationMode: "monotone",
          } as ChartDataset<"line", { x: string; y: number }[]>,
        ],
      },
    });
  }, [props.histories]);

  return <canvas ref={canvas} />;
}
