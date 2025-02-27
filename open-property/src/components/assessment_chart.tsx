import { useEffect } from "preact/hooks";
import {
  CategoryScale,
  Chart as ChartJS,
  type ChartDataset,
  type ChartOptions,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { Property } from "../lib/data.edmonton.ca/property.type.ts";

type Props = { histories?: Partial<Property>[] };

export default function AssessmentChart(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvas.current) return;

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
    );

    const options: ChartOptions<"line"> = {
      layout: { autoPadding: true },
      plugins: {
        title: { text: "Historical Assessments", display: true },
        legend: { display: false },
      },
    };

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

  }, [canvas.current, props.histories]);



  return <canvas ref={canvas} />;


  // return (
  //   <>

  //     <Line
  //       onLoad={() => console.log("loaded")}
  //       options={options}
  //       data={{
  //         datasets: [
  //           {
  //             weight: 100,
  //             label: "assessment",
  //             data: props.histories?.map((history) => ({
  //               x: history.assessment_year?.toString(),
  //               y: history.assessed_value,
  //             })),
  //             clip: 20,
  //             pointRadius: 4,
  //             cubicInterpolationMode: "monotone",
  //           } as ChartDataset<"line", { x: string; y: number }[]>,
  //         ],
  //       }}
  //     />
  //   </>
  // );
}
