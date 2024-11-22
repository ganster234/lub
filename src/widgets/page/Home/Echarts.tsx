import React, { useEffect, useRef } from "react";
import { Card, CardBody } from "@nextui-org/react";
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
        legend: {},
        series: [
          {
            name: "订单类型",
            type: "pie",
            radius: ["50%", "70%"], // 内外环半径
            label: {
              fontSize: 18,
              position: "center",
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 25, name: "拉新订单" },
              { value: 50, name: "领QB订单" },
              { value: 25, name: "练级订单" },
              
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
          data: ["周一", "周二", "周三", "周四", "周五", "周五", "周六"],
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
            name: "余额",
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
    <Card className=" w-full ">
      <div className="flex echarsbox">
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
    </Card>
  );
};

export default Chart;
