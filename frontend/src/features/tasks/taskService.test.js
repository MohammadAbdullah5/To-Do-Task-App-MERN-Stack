import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import taskService from "./taskService";
const mock = new MockAdapter(axios);

describe("taskService", () => {
  afterEach(() => {
    mock.reset();
  });
  test("fetches tasks successfully", async () => {
    const token = "mock_token";
    const tasks = [
      {
        _id: "649e4e271947362dc297436a",
        text: "Learn Tailwind",
        user: "649023b41935f5557f8e7ca4",
        createdAt: "2023-06-30T03:38:15.287Z",
        updatedAt: "2023-06-30T03:38:15.287Z",
        __v: 0,
      },
    ];
    mock
      .onGet("/api/tasks/", {
        headers: {
          Authorization: `Bearer
    ${token}`,
        },
      })
      .reply(200, tasks);
    const response = await taskService.getTasks(token);
    expect(response).toEqual(tasks);
  });
});
