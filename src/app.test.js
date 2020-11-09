import React from "react";
import App from "./App";
import axios from "./axios";
import { render, waitForElement } from "@testing-library/react";

jest.mock("./axios");

axios.get.mockResolvedValue({
    data: {
        // what we res.json back from the server
        first: "",
        last: "",
        url: "",
        id: "",
        bio: "",
    },
});

test("app eventually shows a div", async () => {
    const { container } = render(<App />);
    console.log("container.innerHTML:", container.innerHTML);

    expect(container.innerHTML).toBe("");

    await waitForElement(() => container.querySelector("div"));
    console.log("container.innerHTML:", container.innerHTML);

    expect(container.querySelector("div")).children.length("");
});
