import { expect, it, describe } from 'vitest'
import { JewishMonth } from "../src/interfaces";
import { formatJewishDate, getIndexByJewishMonth, getJewishMonthByIndex, getJewishMonthsInOrder, isLeapYear, toGregorianDate, toJewishDate } from "../src/jewishDate";
import { toLength } from "../src/utils/numberUtils";

const formatDate = (date: Date) =>
  `${toLength(date.getFullYear(), 4)}-${toLength(
    date.getMonth() + 1,
    2
  )}-${toLength(date.getDate(), 2)}`;

describe("jewishDate", () => {

  it("Get index by jewish month", () => {
    const jewishDate = getIndexByJewishMonth(JewishMonth.Cheshvan);
    expect(jewishDate).toStrictEqual(8);
  });

  
  it("5782 is a leap year", async () => {
    expect(isLeapYear(5782)).toBeTruthy();
  });

  it("5781 is not a leap year", async () => {
    expect(isLeapYear(5781)).toBeFalsy();
  });

  it("12 month 5781 is Elul", async () => {
    expect(getJewishMonthsInOrder(5781)[12]).toEqual(JewishMonth.Elul);
  });
  it("12 month 5782 is Av", async () => {
    expect(getJewishMonthsInOrder(5782)[12]).toEqual(JewishMonth.Av);
  });

  it("Format jewish date", async () => {
    const date = new Date("2022-09-26");
    const jewishDate = toJewishDate(date);
    expect(formatJewishDate(jewishDate)).toEqual(`1 Tishri 5783`);
  });
  
  it("Get index by jewish month with invalid value", () => {
    const jewishDate = getIndexByJewishMonth("invalid" as any);
    expect(jewishDate).toStrictEqual(0);
  });

  it("Get jewish month by index", () => {
    const jewishDate = getJewishMonthByIndex (8);
    expect(jewishDate).toStrictEqual(JewishMonth.Cheshvan);
  });

  it("Get jewish month by index with invalid value", () => {
    const jewishDate = getJewishMonthByIndex (15);
    expect(jewishDate).toStrictEqual(JewishMonth.None);
  });
 

  it("Convert 2022-09-26 to Jewish date", () => {
    const date = new Date("2022-09-26");
    const jewishDate = toJewishDate(date);
    expect(jewishDate).toStrictEqual({
      year: 5783,
      month: 1,
      monthName: JewishMonth.Tishri,
      day: 1,
    });
  });

  it("Convert 2023-03-23 to Jewish date", () => {
    const date = new Date("2023-03-23");
    const jewishDate = toJewishDate(date);
    expect(jewishDate).toStrictEqual({
      year: 5783,
      month: 7,
      monthName: JewishMonth.Nisan,
      day: 1,
    });
  });

  it("Convert 1835-09-24 to Jewish date", () => {
    const date = new Date("1835-09-24");
    const jewishDate = toJewishDate(date);
    expect(jewishDate).toStrictEqual({
      year: 5596,
      month: 1,
      monthName: JewishMonth.Tishri,
      day: 1,
    });
  });

  it("Convert 1901-01-01 to Jewish date", () => {
    const date = new Date("1901-01-01");
    const jewishDate = toJewishDate(date);
    expect(jewishDate).toStrictEqual({
      year: 5661,
      month: 4,
      monthName: JewishMonth.Tevet,
      day: 10,
    });
  });
  it("Convert 0001-01-01 to Jewish date", () => {
    const date = new Date("0001-01-01");
    const jewishDate = toJewishDate(date);
    expect(jewishDate).toStrictEqual({
      year: 3761,
      month: 4,
      monthName: JewishMonth.Tevet,
      day: 18,
    });
  });

  it("Convert 0000-01-01 to Jewish date", () => {
    const date = new Date("0000-01-01");
    const jewishDate = toJewishDate(date);
    expect(jewishDate).toStrictEqual({
      year: 3760,
      month: 5,
      monthName: JewishMonth.Shevat,
      day: 8,
    });
  });

  it("Convert 5761-Tevet-18 to Gregorian date", () => {
    const gregorianDate = toGregorianDate({
      year: 5761,
      monthName: JewishMonth.Tevet,
      day: 18,
    });
    // console.log(gregorianDate);
    expect(gregorianDate.toLocaleDateString("en-CA")).toStrictEqual(
      "2001-01-13"
    );
  });

  it("Convert 3761-Tevet-18 to Gregorian date", () => {
    const gregorianDate = toGregorianDate({
      year: 3761,
      monthName: JewishMonth.Tevet,
      day: 18,
    });
    // console.log(gregorianDate);
    expect(formatDate(gregorianDate)).toStrictEqual("0001-01-01");
  });

  it("Convert 3761-Tevet-18 to Gregorian date", () => {
    const gregorianDate = toGregorianDate({
      year: 3760,
      monthName: JewishMonth.Shevat,
      day: 8,
    });
    // console.log(gregorianDate);
    expect(formatDate(gregorianDate)).toEqual("0000-01-01");
  });
});
