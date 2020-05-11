import { call, put } from "redux-saga/effects";
import { ADD_EVENT, ADD_EVENT_REQUEST, addEventSaga } from "./events";
import { v4 as uuid } from "uuid";

describe("Events Duck", () => {
  describe("Saga", () => {
    it("should add event", () => {
      const event = {
        title: "event title",
        url: "https://url.com",
      };
      const action = {
        type: ADD_EVENT_REQUEST,
        payload: event,
      };

      const process = addEventSaga(action);

      const step1 = process.next();

      expect(step1.done).toBe(false);
      expect(step1.value).toEqual(call(uuid));

      //const id = await uuid()
      const id = "42";

      const step2 = process.next(id);

      expect(step2.done).toBe(false);
      expect(step2.value).toEqual(
        put({
          type: ADD_EVENT,
          payload: {
            id,
            ...event,
          },
        })
      );

      //dispatch(action)

      const step3 = process.next();

      expect(step3.done).toBe(true);

      /*
            if (step1.value.type === 'CALL') {
                const res = step1.value.payload.fn(...step1.value.payload.args)
                process.next(res)
            }
            if (step1.done) return;
*/
    });
  });

  /*
    describe('Reducer', () => {

    });

    describe('Selectors', () => {

    });
*/
});
