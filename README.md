
# Convert Markdown to ADF GitHub Action

  

This Action converts Markdown text to Atlassian Document Format (ADF) via [`md-to-adf`](https://github.com/b-yond-infinite-network/md-to-adf) and can optionally post the result as a comment on a Jira issue.

  

## Inputs

  

| Name | Required | Description |

|------|----------|-------------|

| `md-text` | ✅ | Markdown text to convert |

| `jira-base-url` | | Jira base URL (`https://example.atlassian.net`) |

| `jira-ticket-id` | | Issue key (`PROJ-123`) |

| `jira-username` | | Jira user/email |

| `jira-api-token` | | Jira API token |

| `jira-comment` | | Custom comment (defaults to ADF JSON) |

  

## Outputs

  

| Name | Description |

|------|-------------|

| `adf-output` | The generated ADF JSON |

  

## Example Workflow

  

```

name: Convert markdown to ADF

  

on: [push]

  

jobs:

convert:

runs-on: ubuntu-latest

steps:

- uses: actions/checkout@v4

  

text

- uses: Akhil16/action-md-to-adf@v1.0.0

id: convert

with:

md-text: |

# Heading ## h2

### h3

jira-base-url: ${{ secrets.JIRA_BASE_URL }}

jira-ticket-id: ${{ secrets.JIRA_TICKET_ID }}

jira-username: ${{ secrets.JIRA_USERNAME }}

jira-api-token: ${{ secrets.JIRA_API_TOKEN }}

  

- run: echo "${{ steps.convert.outputs.adf-output }}"

```

## License

MIT