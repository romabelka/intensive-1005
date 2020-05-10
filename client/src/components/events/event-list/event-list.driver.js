import { mount } from "enzyme";
import { Provider } from "react-redux";
import { initStore } from "../../../redux";
import EventList from "./index";
import React from "react";

export default () => {
  const element = mount(
    <Provider store={initStore()}>
      <EventList />
    </Provider>
  );

  const driver = {
    get: {
      emptyCation: () => element.find('[data-id="empty-list"]'),
      listItems: () => element.find('[data-id="event-list-item"]'),
      form: () => element.find('[data-id="event-form"]').at(0),
    },
    when: {
      formSubmit: () => driver.get.form().simulate("submit"),
    },
    update: () => element.update(),
  };

  return driver;
};
