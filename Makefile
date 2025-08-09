# BBS-GO Makefile

# 默认目标
.PHONY: all
all: build

# 构建所有组件
.PHONY: build
build: clean build-site build-admin
	@mkdir -p dist
	@cd server && go build -v -o bbs-go main.go
	@cp -r server/bbs-go dist/
	@cp -r server/migrations dist/migrations
	@cp -r server/locales dist/locales
	@cp -r site/dist dist/site
	@cp -r admin/dist dist/admin

# 构建所有平台的服务器
.PHONY: build-all-platforms
build-all-platforms: clean build-site build-admin
	@echo "build linux arm64..."
	@cd server && GOOS=linux GOARCH=arm64 go build -v -o bbs-go-linux-arm64 main.go
	@mkdir -p dist/bbs-go-linux-arm64
	@cp -r server/bbs-go-linux-arm64 dist/bbs-go-linux-arm64/bbs-go
	@cp -r server/migrations dist/bbs-go-linux-arm64/migrations
	@cp -r server/locales dist/bbs-go-linux-arm64/locales
	@cp -r site/dist dist/bbs-go-linux-arm64/site
	@cp -r admin/dist dist/bbs-go-linux-arm64/admin
	@zip -r dist/bbs-go-linux-arm64.zip dist/bbs-go-linux-arm64
	@rm -rf dist/bbs-go-linux-arm64
	@echo "build linux arm64 done"

	@echo "all done"

# 构建前端站点
.PHONY: build-site
build-site:
	@echo "build site..."
	@cd site && pnpm install && pnpm generate

# 构建管理后台
.PHONY: build-admin
build-admin:
	@echo "build admin..."
	@cd admin && pnpm install && pnpm build

# 清理构建产物
.PHONY: clean
clean: 
	@echo "clean server..."
	@cd server && rm -f bbs-go bbs-go-* bbs-go-*.exe

	@echo "clean site..."
	@cd site && rm -rf .nuxt .output dist

	@echo "clean admin..."
	@cd admin && rm -rf dist

	@echo "clean dist..."
	@rm -rf dist


# 帮助信息
.PHONY: help
help:
	@echo "BBS-GO Makefile 帮助信息:"
	@echo "  make build               - 构建所有组件"
	@echo "  make build-all-platforms - 构建所有平台的服务器"
	@echo "  make build-site          - 构建前端站点"
	@echo "  make build-admin         - 构建管理后台"
	@echo "  make clean               - 清理所有构建产物"
	@echo "  make help                - 显示帮助信息"
