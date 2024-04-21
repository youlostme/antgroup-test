/**
 * 实现 TimeFilters 组件
 * 要求，展示3个时间筛选的交集时间
 * 例如 03-01~03-30、03-02~03-05、03-03~03-03，则展示03-03~03-03
 *
 * 并实现，当选择无交集时间时，给出提示
 * 例如筛选器1选择了 03-01~03-30，当筛选器2选择 04-01~04-30 时，给出错误提示
 */
import React, { useState, useEffect } from "react";
import { Form, DatePicker, message } from "antd";
import moment, { Moment } from "moment";

const RangePicker = DatePicker.RangePicker;

export const TimeFilters: React.FC = () => {
  // init status
  const [dateRanges, setDateRanges] = useState<Moment[][]>([[], [], []]);
  const [intersectionValue, setIntersectionValue] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // update status
  const handleDateChange = (index: number, dates: Moment[]) => {
    const newDateRanges = [...dateRanges];
    newDateRanges[index] = dates || []; // RangePicker 清空时会为 null
    setDateRanges(newDateRanges);
  };

  // date format

  const getFormattedDateRange = (date: Moment[]): string => {
    if (date) {
      const display = `${date[0].format("MM-DD")}~${date[1].format("MM-DD")}`;
      setIntersectionValue(display);
    }
  };
  // calc intersection
  const calcIntersection = (): Moment[] | null => {
    // check that all filters have selected a date range
    // Array.prototype.some();
    // or
    for (let i = 0; i < dateRanges.length; i++) {
      if (dateRanges[i].length === 0) {
        message.error(`筛选器${i + 1}未选择日期范围！`);
        return null;
      }
    }
    // get intersection
    let maxStartDate = moment.max(dateRanges.map((dates) => dates[0]));
    let minEndDate = moment.min(dateRanges.map((dates) => dates[1]));
    if (maxStartDate.isAfter(minEndDate, "day")) {
      message.error(`选择的日期范围没有交集！`);
      return null;
    }
    getFormattedDateRange([maxStartDate, minEndDate]);
  };
  useEffect(() => {
    setIsMounted(true);
    return () => {};
  }, []);
  useEffect(() => {
    if (isMounted) {
      calcIntersection();
    }
  }, [dateRanges, isMounted]);

  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item name="date1" label="筛选器1">
        <RangePicker onChange={(dates) => handleDateChange(0, dates)} />
      </Form.Item>
      <Form.Item name="date2" label="筛选器2">
        <RangePicker onChange={(dates) => handleDateChange(1, dates)} />
      </Form.Item>
      <Form.Item name="date3" label="筛选器3">
        <RangePicker onChange={(dates) => handleDateChange(2, dates)} />
      </Form.Item>
      {/* 展示筛选器的交集时间 */}
      <Form.Item label="交集时间">
        <span>{intersectionValue || "null"}</span>
      </Form.Item>
    </Form>
  );
};
