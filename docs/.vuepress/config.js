module.exports = {
    base: '/blog/',
    title: "前端名狮",
    description: "欢迎关注我的公众号【前端名狮】",
    ga: "UA-121061441-1",
    markdown: {
      lineNumbers: true
    },
    head: [
      ['link', { rel: 'icon', href: '/logo.jpg' }]
    ],
    themeConfig: {
      repo: "fe-toplion/blog",
      nav: [
        {
          text: "精选文章",
          link: "/articles/"
        },
        {
          text: "试题精讲",
          link: "/interview/"
        },
        {
          text: "学习园地",
          link: "/heaven/"
        },
      ],
      sidebar: {
        "/articles/": [
          {
            title: '原创文章',
            collapsable: false,
            children: [
              "activityPlatform",
              "commonPop",
              "time",
              "IntersectionObserver",
              "browser"
            ]
          }
        ],
        "/interview/": [
          {
            title: '面试题',
            collapsable: false,
            children: [
              "question/01",
              "question/02",
              "question/03",
              "question/04",
              "question/05",
              "question/06",
              "question/07",
              "question/08",
              "question/09",
              "question/10",
              "question/11"
            ]
          }
        ],
        "/heaven/": [
          {
            title: '阅读资料',
            collapsable: false,
            children: [
              "books"
            ]
          },
        ],
      },
      lastUpdated: "更新时间",
      docsDir: "docs",
      editLinks: true,
      editLinkText: "本文源码地址"
    },
    plugins: {
      '@vuepress/medium-zoom': {
        selector: 'img',
        options: {
            margin: 16
        }
      },
      '@vuepress/back-to-top':true
    }
  };
  