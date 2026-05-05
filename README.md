# Cacarina 的个人博客

这是一个使用 GitHub Pages 发布的静态个人博客。

## 本地预览

在项目目录执行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:8000/
```

## 写新文章

1. 在 `posts` 文件夹里新建一个 Markdown 文件，例如 `my-second-post.md`
2. 在 `posts.json` 里添加这篇文章的信息
3. 提交并推送到 GitHub

`posts.json` 示例：

```json
{
  "slug": "my-second-post",
  "title": "我的第二篇文章",
  "date": "2026-05-05",
  "summary": "这是一句话简介。"
}
```

注意：`slug` 要和 Markdown 文件名一致。比如 `slug` 是 `my-second-post`，文件名就要是 `posts/my-second-post.md`。

## 发布方式

推荐在 GitHub 仓库的 `Settings -> Pages` 中选择：

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/(root)`

保存后，GitHub Pages 会发布仓库根目录下的 `index.html`。
