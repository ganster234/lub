import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Chart: React.FC = () => {
  const pieChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pieChart: echarts.ECharts | null = null;
    let lineChart: echarts.ECharts | null = null;

    // 初始化饼图
    if (pieChartRef.current) {
      pieChart = echarts.init(pieChartRef.current);
      const pieOptions = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "5%",
          left: "center",
        },
        series: [
          {
            name: "订单类型",
            type: "pie",
            radius: ["40%", "70%"], // 内外环半径
            label: {
              formatter: "{b}: {d}%",
              color: "#666",
              fontSize: 14,
            },
            data: [
              { value: 25, name: "拉新订单" },
              { value: 50, name: "领券订单" },
              { value: 25, name: "储值订单" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      pieChart.setOption(pieOptions);
    }

    // 初始化折线图
    if (lineChartRef.current) {
      lineChart = echarts.init(lineChartRef.current);
      const lineOptions = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["6日", "7日", "8日", "9日", "10日", "11日", "12日"],
          axisLabel: {
            fontSize: 12,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
          },
        },
        series: [
          {
            name: "营业额",
            type: "line",
            smooth: true, // 平滑线
            data: [200, 820, 540, 1000, 560, 820, 600],
            areaStyle: {
              color: "rgba(34, 155, 255, 0.3)",
            },
            lineStyle: {
              color: "rgba(34, 155, 255, 1)",
              width: 2,
            },
            symbol: "circle",
            symbolSize: 8,
          },
        ],
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
      };
      lineChart.setOption(lineOptions);
    }

    // 自动适配屏幕大小
    const handleResize = () => {
      pieChart?.resize();
      lineChart?.resize();
    };
    window.addEventListener("resize", handleResize);

    // 清除事件监听器
    return () => {
      window.removeEventListener("resize", handleResize);
      pieChart?.dispose();
      lineChart?.dispose();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
      }}
    >
      {/* 饼图 */}
      <div
        ref={pieChartRef}
        style={{
          width: "100%",
          height: "300px",
        }}
      ></div>

      {/* 折线图 */}
      <div
        ref={lineChartRef}
        style={{
          width: "100%",
          height: "300px",
        }}
      ></div>
    </div>
  );
};

export default Chart;
