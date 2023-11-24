"use client"

import {ActionIcon, Group, Paper, PaperProps, Text, useMantineTheme} from "@mantine/core";
import dynamic from 'next/dynamic';
import {DataTable} from "mantine-datatable";
import {IconDotsVertical} from "@tabler/icons-react";
import {Surface} from "@/components";
import {useColorScheme} from "@mantine/hooks";
import SalesData from "@/public/mocks/Sales.json";

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

type SalesChartProps = PaperProps

const SalesChart = ({...others}: SalesChartProps) => {
  const theme = useMantineTheme()
  const colorScheme = useColorScheme()
  const series = [44, 55, 41, 17, 15];

  const options = {
    chart: {type: "donut", fontFamily: 'Open Sans, sans-serif'},
    legend: {show: false},
    dataLabels: {enabled: false},
    tooltip: {enabled: false},
    states: {
      hover: {filter: {type: "lighten", value: 0.5}},
      active: {filter: {type: "none", value: 0}}
    },
    stroke: {width: 0},
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '12px',
              fontWeight: '400',
              color: colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
            },
            value: {
              show: true,
              fontSize: '22px',
              fontWeight: '600',
              color: colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
            },
            total: {
              show: true,
              showAlways: true,
              formatter: function (w: any) {
                const totals = w.globals.seriesTotals;

                const result = totals.reduce((a: number, b: number) => a + b, 0);

                return (result / 1000).toFixed(3);
              },
              color: colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
            }
          }
        }
      }
    },
    colors: [theme.colors[theme.primaryColor][9], theme.colors[theme.primaryColor][5], theme.colors[theme.primaryColor][3], theme.colors[theme.primaryColor][2]]
  };

  return (
    <Surface component={Paper} {...others}>
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>Weekly sales</Text>
        <ActionIcon variant="subtle">
          <IconDotsVertical size={16}/>
        </ActionIcon>
      </Group>
      {/*@ts-ignore*/}
      <Chart options={options} series={series} type="donut" height={160} width={"100%"}/>
      <DataTable
        highlightOnHover
        columns={[{accessor: 'source'}, {accessor: 'revenue'}, {accessor: 'value'}]}
        records={SalesData.slice(0, 4)}
        height={200}
      />
    </Surface>
  );
};

export default SalesChart
