import React from "react";
import { shallow, mount } from "enzyme";
import eventually from "wix-eventually";
import EventList from "./index";
import { Provider } from "react-redux";
import { initStore } from "../../../redux";
import { act } from "react-dom/test-utils";

describe("EventList", () => {
  it("should display empty list", () => {
    const element = mount(
      <Provider store={initStore()}>
        <EventList />
      </Provider>
    );

    expect(element.find('[data-id="empty-list"]').exists()).toBe(true);
    expect(element.find('[data-id="event-list-item"]').length).toBe(0);
  });

  it("should add event", async () => {
    const element = mount(
      <Provider store={initStore()}>
        <EventList />
      </Provider>
    );

    act(() => {
      /*
            element.find('[data-id="event-form-title"]').at(0).simulate('change', {target: {value: 'some title'}})
            element.find('[data-id="event-form-url"]').at(0).simulate('change', {target: {value: 'some url'}})

            element.update()
*/

      element.find('[data-id="event-form"]').at(0).simulate("submit");
    });

    await eventually(() => {
      element.update();
      expect(element.find('[data-id="event-list-item"]').length).toBe(1);
      expect(element.find('[data-id="empty-list"]').exists()).toBe(false);
    });
  });
});
