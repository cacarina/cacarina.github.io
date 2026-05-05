const postList = document.querySelector("#post-list");
const postContent = document.querySelector("#post-content");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inList = false;
  let listType = "";
  let inCodeBlock = false;
  let codeBlockLines = [];

  function closeList() {
    if (inList) {
      html.push(`</${listType}>`);
      inList = false;
      listType = "";
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      closeList();

      if (inCodeBlock) {
        html.push(`<pre><code>${escapeHtml(codeBlockLines.join("\n"))}</code></pre>`);
        inCodeBlock = false;
        codeBlockLines = [];
      } else {
        inCodeBlock = true;
      }

      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      closeList();
      html.push(`<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      closeList();
      html.push(`<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList || listType !== "ul") {
        closeList();
        html.push("<ul>");
        inList = true;
        listType = "ul";
      }
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || listType !== "ol") {
        closeList();
        html.push("<ol>");
        inList = true;
        listType = "ol";
      }
      html.push(`<li>${inlineMarkdown(trimmed.replace(/^\d+\.\s/, ""))}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
  }

  closeList();
  if (inCodeBlock) {
    html.push(`<pre><code>${escapeHtml(codeBlockLines.join("\n"))}</code></pre>`);
  }

  return html.join("\n");
}

async function loadPosts() {
  if (!postList) {
    return;
  }

  const response = await fetch("./posts.json");
  const posts = await response.json();

  postList.innerHTML = posts
    .map((post) => `
      <article class="post-item">
        <time datetime="${post.date}">${post.date}</time>
        <h3><a href="./post.html?slug=${post.slug}">${escapeHtml(post.title)}</a></h3>
        <p>${escapeHtml(post.summary)}</p>
      </article>
    `)
    .join("");
}

async function loadPost() {
  if (!postContent) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    postContent.innerHTML = "<h1>文章不存在</h1><p>没有找到对应的文章。</p>";
    return;
  }

  try {
    const response = await fetch(`./posts/${slug}.md`);

    if (!response.ok) {
      throw new Error("Post not found");
    }

    const markdown = await response.text();
    postContent.innerHTML = markdownToHtml(markdown);
  } catch {
    postContent.innerHTML = "<h1>文章加载失败</h1><p>请检查 Markdown 文件是否存在。</p>";
  }
}

loadPosts();
loadPost();
