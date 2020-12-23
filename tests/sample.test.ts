describe("calculate", function () {
  it("add", function () {
    const result = +5 + +2;
    expect(result).toBe(7);
  });

  it("substract", function () {
    const result = Math.abs(+5 - +2);
    expect(result).toBe(3);
  });
});
