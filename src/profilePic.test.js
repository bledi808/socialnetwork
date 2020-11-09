import React from "react";
import ProfilePic from "./ProfilePic";
import axios from "./axios";
import { render, fireEvent } from "@testing-library/react";

test("when no url, default image is used", () => {
    const { container } = render(<ProfilePic />);
    console.log(
        "container.querySelector('img'):",
        container.querySelector("img").src
    );

    expect(container.querySelector("img").src.endsWith("default.jpg")).toBe(
        true
    );
});

test("when a url is passed a prop, that url is used as src of image", () => {
    const { container } = render(<ProfilePic url={"url"} />);

    expect(container.querySelector("img").src).toBe("url");
});

test("onClick prop runs when image is clicked", () => {
    const onClick = jest.fn(() => console.log("clicked"));
    const { container } = render(<ProfilePic onClick={onClick} />);
    console.log("onClick.mock", onClick);

    fireEvent.click(container.querySelector("img"));
    console.log("onClick.mock", onClick);

    expect(onClick.mock.calls.length).toBe(1);
});
