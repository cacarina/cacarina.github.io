# 我的第一篇 GitHub Pages 博客

今天我开始搭建自己的个人博客。第一版先不用复杂框架，只用 HTML 和 CSS，这样最容易理解，也最容易发布到 GitHub Pages。

现在我想把写博客这件事变得更简单：以后文章都用 Markdown 来写。

Markdown 的好处是：

- 写标题很方便
- 写列表很方便
- 写链接和代码也很方便
- 不需要每次都手写完整 HTML

## 下一步可以做什么

以后我写新文章时，只需要：

1. 在 `posts` 文件夹里新建一个 `.md` 文件
2. 在 `posts.json` 里登记文章标题、日期和简介
3. 提交并推送到 GitHub

详细步骤是：
  1. 在 posts/ 里新建一个 Markdown 文件，比如：

  posts/my-second-post.md

  2. 在 posts.json 里添加文章信息：

  {
    "slug": "my-second-post",
    "title": "我的第二篇文章",
    "date": "2026-05-05",
    "summary": "这是一句话简介。"
  }

  3. 然后提交并推送：

  git add .
  git commit -m "Add new post"
  git push

  注意：现在本地比 GitHub 多 1 个提交，所以你要发布到线上时执行：

  cd /Users/bytedance/cacarina_blog
  git push

这样博客就能继续更新了。
