new_branch:
	@read -p 'Enter new branch name: ' -e BRANCH; \
    read -p 'Enter commit message: ' -e COMMIT_MESSAGE; \
	git add .; \
	git commit -m "$$COMMIT_MESSAGE"; \
    git config pull.ff only; \
    echo "Pulling from main branch"; \
	git pull origin main; \
	git checkout -b "$$BRANCH"; \
	git push origin "$$BRANCH";

CURRENT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD 2> /dev/null)

.PHONY: current_branch
current_branch:
	@read -p 'Enter commit message: ' -e COMMIT_MESSAGE; \
    echo "$(CURRENT_BRANCH)"; \
	git add .; \
	git commit -m "$$COMMIT_MESSAGE"; \
    git config pull.ff only; \
    echo "Pulling from main branch"; \
	git pull origin main; \
	git push origin "$(CURRENT_BRANCH)";