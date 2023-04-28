# learneveryday

A blog about learning something new every day.

## Commands

```
npm init
npm create vite@latest my-vue-app -- --template vue
npm install
npm install vue-router
npm install marked

npm run dev
```

<https://slugify.online/>
https://www.pexels.com/search/banner%20internet%20blog/?orientation=landscape

## Details

### Global

I am creating a blog in typescript with the vue framework using vite.
The blog needs to be mobile friendly.
The blog will contains posts.
Each post will have a title, content, a list of tags, the creation date

The blog will have a home page, a tag page, a single post page.
The home page has a header banner image on top.
There is a sidebar on the left with a link to the home page, a search input, a list of tags.
The sidebar can be collapse when on mobile.
There is a main container with 6 of the most recent posts.
The tag page has the same template as the home page. In the main container, there will be a list of all post with the current tag.
The single post page has the same template as the home page. In the main container, there will be the content of the post.

I will store my content in json files.

Help me create this project. For now don't give me the code for the blog, we will do it later.
give me a file structure.

I created a blog with typescript but i dont want to store my content in a database, can you give me alternatives? the content is always static and won't be changed often.

### Header

Give me the code for the header vue.
The header will only show a banner image that will take the full width of the site.
the height should not be too much.
Consider it for mobile also.

### Sidebar

Give me the code for the sidebar vue. the sidebar need to be responsive for mobile.
First in the sidebar is the link to the home page, with a button to collapse the sidebar.
second is an input text to search all posts. you need to be able to search the title, the tags and the content. the search happen at every input.
the result of the search will be shown on the main container which inside "components/Main.vue".
third is a list of all tags, sorted by most used. there need to be the number of occurences for each tag near to it.
if you click on a tag you will get all posts that use that tag, the result will be shown inside "components/Main.vue".
Don't write the code for "components/Main.vue" yet.

Here is a sample of my 'posts.json' where i store all the posts content data.
[
    {
        "title": "Post 1",
        "image": "/banners/post1.png",
        "tags": "tag1, tag2, tag3",
        "content": "path to your markdown file.md",
        "created_at": "2023-04-27 10:00:00"
    },
    {
        "title": "Post 2",
        "image": "/banners/post2.png",
        "tags": "tag1, tag2, tag3",
        "content": "path to your markdown file.md",
        "created_at": "2023-04-27 10:00:00"
    }
]

### Main

Give me the code for the Main.vue
It is a component that contain the main content of the post. if the home page is using it, then it show the list of 10 most recents posts.
if the user make a search input in the sidebar then the Main.vue will display the results of the search as a list of posts.
if the user click on a tag on the sidebar then the vue show the list of all posts using that tag.
if the Main vue is used in SinglePost.vue then it show the content of the current post.

### Home

Give me the code for the Home.vue page.
The home
