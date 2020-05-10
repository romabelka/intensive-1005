import React from "react";
import eventually from "wix-eventually";
import EventList from "./index";
import createDriver from "./event-list.driver";

describe("EventList", () => {
  let driver = null;

  beforeEach(() => {
    driver = createDriver();
  });

  it("should display empty list", () => {
    expect(driver.get.emptyCation().exists()).toBe(true);
    expect(driver.get.listItems().length).toBe(0);
  });

  it("should add event", async () => {
    driver.when.formSubmit();

    await eventually(() => {
      driver.update();

      expect(driver.get.listItems().length).toBe(1);
      expect(driver.get.emptyCation().exists()).toBe(false);
    });
  });
});
