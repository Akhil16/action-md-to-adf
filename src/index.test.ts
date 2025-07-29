/* tests/index.test.ts */
import * as core from "@actions/core";
import axios from "axios";
//@ts-ignore
import fnTranslate from "md-to-adf";
import { convertToADF } from "./index";

jest.mock("@actions/core");
jest.mock("axios");
jest.mock("md-to-adf");

// Override the type of fnTranslate to allow mocking return values
const coreMock  = core as jest.Mocked<typeof core>;
const axiosMock = axios as jest.MockedFunction<typeof axios>;
const transMock = fnTranslate as unknown as jest.MockedFunction<(md: string) => any>;

beforeEach(() => jest.clearAllMocks());

test("converts markdown and sets output", async () => {
  coreMock.getInput.mockImplementation((n) => (n === "md-text" ? "# H1" : ""));
  transMock.mockReturnValue({ type: "doc" });

  await convertToADF();

  expect(transMock).toHaveBeenCalledWith("# H1");
  expect(coreMock.setOutput).toHaveBeenCalledWith("adf-output", { body: { type: "doc" } });
  expect(axiosMock).not.toHaveBeenCalled();
});

test("posts to Jira when inputs present", async () => {
  coreMock.getInput.mockImplementation((n) => {
    const map: Record<string, string> = {
      "md-text": "test",
      "jira-base-url": "https://jira.example.com",
      "jira-ticket-id": "PROJ-1",
      "jira-username": "user",
      "jira-api-token": "tok"
    };
    return map[n] || "";
  });
  transMock.mockReturnValue({});

  axiosMock.mockResolvedValue({ data: {} });

  await convertToADF();

  expect(axiosMock).toHaveBeenCalledTimes(1);
});
