# Claude Code Setups

8 production-ready Claude Code configurations for Mac mini. Each setup is optimized for a different developer persona.

## Live site

**[adamorad.github.io/claude-code-setups](https://adamorad.github.io/claude-code-setups)**

## The 8 setups

| Setup                   | Username      | Focus               | Install                   |
| ----------------------- | ------------- | ------------------- | ------------------------- |
| The Full Dev Stack      | @adamorad     | All-in-one          | `setups/full-dev/`        |
| The AI Builder          | @aicraft      | AI/ML + LangChain   | `setups/ai-builder/`      |
| The Minimalist          | @tinystack    | Bare essentials     | `setups/minimal/`         |
| The Web Dev             | @webstudio    | Frontend + Supabase | `setups/web-dev/`         |
| The Data Scientist      | @datamind     | Python + Jupyter    | `setups/data-scientist/`  |
| The DevOps Engineer     | @opsforge     | K8s + Terraform     | `setups/devops/`          |
| The Security Researcher | @seclab       | Audit + compliance  | `setups/security/`        |
| The Content Creator     | @contentcraft | Docs + social       | `setups/content-creator/` |

## Install any setup

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/<name>/install.sh)
```

Example:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/adamorad/claude-code-setups/main/setups/minimal/install.sh)
```

## Requirements

- macOS (Apple Silicon recommended)
- Internet connection
- Xcode CLI tools (installer will prompt if missing)
