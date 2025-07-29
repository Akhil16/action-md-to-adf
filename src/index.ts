import * as core from "@actions/core";
import axios from "axios";
// @ts-ignore
import fnTranslate from "md-to-adf";

// Exported for testing purposes
export async function convertToADF(): Promise<void> {
  try {
    const markdown: string = core.getInput("md-text", { required: true });
    const adf = fnTranslate(markdown);
    core.setOutput("adf-output", { body: adf });

    // Gather Jira inputs
    const jiraBaseUrl = core.getInput("jira-base-url");
    const jiraTicketId = core.getInput("jira-ticket-id");
    const jiraUser = core.getInput("jira-username");
    const jiraToken = core.getInput("jira-api-token");
    const jiraComment = core.getInput("jira-comment"); // optional

    if (jiraBaseUrl && jiraTicketId && jiraUser && jiraToken) {
      const commentBody = jiraComment || JSON.stringify({ body: adf });
      await commentOnJira(jiraBaseUrl, jiraTicketId, jiraUser, jiraToken, commentBody);
    } else {
      core.info("Jira inputs missing; skipping Jira comment.");
    }
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
    else core.setFailed("Unknown error");
  }
}

// Run only if not imported (e.g., in tests)
if (require.main === module) {
  convertToADF();
}

// Helper for Jira comment
async function commentOnJira(
  baseUrl: string,
  ticketId: string,
  user: string,
  token: string,
  comment: string
): Promise<void> {
  const url = `${baseUrl.replace(/\/$/, "")}/rest/api/3/issue/${ticketId}/comment`;
  const authHeader = `Basic ${Buffer.from(`${user}:${token}`).toString("base64")}`;
  await axios.post(url, { body: comment }, {
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
  });
  core.info(`Posted Jira comment to ${ticketId}`);
}
