<template>
    <!-- <div id="app"> -->
        <Header @search="searchPosts" />
        <div class="container-fluid">
            <div class="row">
                <!-- <Sidebar @search="searchPosts" @tagClick="tagPosts" /> -->
                <Sidebar @search="searchPosts" />
                <!-- <Sidebar onSearch="searchPosts" /> -->
                <!-- <Main @tagSearch="tagPosts" @slugSearch="slugPost" :posts="filteredPosts" :post="currentPost"/> -->
                <Main @tagSearch="tagPosts" @slugSearch="slugPost" :posts="filteredPosts" :allPosts="posts"/>
            </div>
        </div>
    <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Main from './components/Main.vue';
import { Post } from './types';
import postsData from './content/posts.json';

export default defineComponent({
    components: {
        Header,
        Sidebar,
        Main,
    },
    // props: {
    //     tag: {
    //         type: String,
    //         default: null,
    //     },
    //     slug: {
    //         type: String,
    //         default: null,
    //     },
    // },
    setup() {
        // console.log("props", props);
        const posts: Post[] = postsData;
        const filteredPosts = ref(posts.slice(0, 10));
        const currentPost = ref(null as Post | null);
        const route = useRoute();
        const router = useRouter();

        const searchPosts = (searchTerm: string) => {
            if (router.currentRoute.value.path !== "/") {
                console.log("router changed");

                router.push("/");
            }

            const searchResults = posts.filter((post) =>
                // post.title.includes(searchTerm) ||
                // post.tags.some((tag) => tag.includes(searchTerm)) ||
                // post.content.includes(searchTerm)
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.map(tag => tag.toLowerCase()).includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            filteredPosts.value = searchResults;
        };

        const tagPosts = (tag: string) => {
            const taggedPosts = posts.filter((post) => post.tags.includes(tag));
            filteredPosts.value = taggedPosts;
        };

        const slugPost = (slug: string) => {
            const slugPosts = posts.filter((post) => post.slug === slug);
            currentPost.value = slugPosts[0] || null;
            // filteredPosts.value = slugPosts;
        };

        return {
            filteredPosts,
            currentPost,
            searchPosts,
            tagPosts,
            slugPost,
            posts,
        };
    },
});
</script>

<style>
/* #app {
}

.app-container {
    display: flex;
}


.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>

