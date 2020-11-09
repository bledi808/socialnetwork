console.log("test");

const myMockFn = jest.fn((n) => n >= 21);

// [1,2,3].filter();

test("filter calls fn correctly", () => {
    const ages = [22, 14, 34];
    ages.filter(myMockFn);
    console.log("myMockFn.mock", myMockFn.mock);

    //check that filter calls our fn 3 times (i.e. for every element in the array)
    expect(myMockFn.mock.calls.length).toBe(3);

    //check tha the first element passes our filter check
    expect(myMockFn.mock.results[0].value).toBe(true);
    //check tha the second element fails our filter check
    expect(myMockFn.mock.results[1].value).toBe(false);
});
