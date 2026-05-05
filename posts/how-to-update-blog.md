# 如何更新我的博客

这份说明用于每次重新打开电脑后，进入博客目录、预览博客、提交修改并推送到 GitHub。

## 1. 打开 Terminal

打开 macOS 的 Terminal App。

## 2. 进入博客目录

输入：

```bash
cd /Users/bytedance/cacarina_blog
```

检查是否进入了正确目录：

```bash
pwd
```

如果看到下面这行，说明位置正确：

```text
/Users/bytedance/cacarina_blog
```

## 3. 本地预览博客

在博客目录里执行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

然后打开浏览器访问：

```text
http://127.0.0.1:8000/
```

如果要停止本地预览服务器，在 Terminal 里按：

```text
Ctrl + C
```

## 4. 查看有哪些修改

```bash
git status
```

这个命令会告诉你哪些文件被修改、新增或删除。

## 5. 提交修改

先把所有修改加入提交：

```bash
git add .
```

再创建一次提交：

```bash
git commit -m "Update blog"
```

`Update blog` 是提交说明，可以换成更具体的内容，例如：

```bash
git commit -m "Add second post"
```

## 6. 推送到 GitHub

```bash
git push
```

推送成功后，GitHub Pages 会自动更新线上博客。

你的博客地址是：

```text
https://cacarina.github.io
```

## 7. 写一篇新文章

在 `posts` 文件夹里新建一个 Markdown 文件，例如：

```text
posts/my-second-post.md
```

然后在 `posts.json` 里添加文章信息：

```json
{
  "slug": "my-second-post",
  "title": "我的第二篇文章",
  "date": "2026-05-05",
  "summary": "这是一句话简介。"
}
```

注意：`slug` 要和 Markdown 文件名一致。比如 `slug` 是 `my-second-post`，文件名就要是 `posts/my-second-post.md`。
