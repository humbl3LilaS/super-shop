import { describe, expect, test } from "vitest";

import { roundToDecimal } from "@/features/cart/lib/util";
import { formatDate } from "@/lib/utils";

describe("Test roundToDecimal", () => {
    test("string '200' should be 200", () => {
        expect(roundToDecimal("200")).toBe(200);
    });
    test("string 200.99  should be 200.99", () => {
        expect(roundToDecimal("200.99")).toBe(200.99);
    });
    test("string 200.9921  should be 200.99", () => {
        expect(roundToDecimal("200.9921")).toBe(200.99);
    });
    test("string 200.999  should be 201", () => {
        expect(roundToDecimal("200.999")).toBe(201);
    });
    test("int 200 should be 200", () => {
        expect(roundToDecimal(200)).toBe(200);
    });
    test("int 200.99  should be 200.99", () => {
        expect(roundToDecimal(200.99)).toBe(200.99);
    });
    test("int 200.9921  should be 200.99", () => {
        expect(roundToDecimal(200.9921)).toBe(200.99);
    });
    test("int 200.999  should be 201", () => {
        expect(roundToDecimal(200.999)).toBe(201);
    });
});

describe("Test formatDate", () => {
    test("Full date should parse successfully without additional arguments", () => {
        const date = new Date(2025, 2, 20, 12, 0);
        expect(formatDate(date)).toBe("Mar 20, 2025 12:00 PM");
    });
    test("Full date should parse successfully with additional arguments", () => {
        const date = new Date(2025, 2, 20, 12, 0);
        expect(formatDate(date, "FULL_DATE")).toBe("Mar 20, 2025 12:00 PM");
    });
    test("Only date should be parse successfully with additional arguments", () => {
        const date = new Date(2025, 2, 20, 12, 0);
        expect(formatDate(date, "DATE_ONLY")).toBe("Mar 20, 2025");
    });
    test("Only Hour should be parse successfully with additional arguments", () => {
        const date = new Date(2025, 2, 20, 12, 0);
        expect(formatDate(date, "HOUR_ONLY")).toBe("12:00 PM");
    });
});
