<template>
    <Header @search="searchPosts" ref="headerRef" />
    <div class="container-fluid">
        <div class="row">
            <Sidebar @search="searchPosts" :allPosts="posts" ref="sidebarRef" />
            <Main :post="currentPost" :posts="filteredPosts" :allPosts="posts" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
    setup() {
        const posts: Post[] = postsData;
        const filteredPosts = ref(posts.slice(0, 9));
        const currentPost = ref(null as Post | null);

        const route = useRoute();
        const router = useRouter();

        const headerRef = ref<InstanceType<typeof Header> | null>(null);
        const sidebarRef = ref<InstanceType<typeof Sidebar> | null>(null);

        const searchPosts = (searchTerm: string) => {
            console.log("searchPosts", searchTerm);
            if (router.currentRoute.value.name !== "search") {
                console.log("router changed");
                router.push({
                    name: "search",
                    params: {
                        search: searchTerm,
                    },
                });
            }

            const searchResults = posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.map(tag => tag.toLowerCase()).includes(searchTerm.toLowerCase())
            );
            currentPost.value = null;
            filteredPosts.value = searchResults;
        };

        const clearInput = () => {
            headerRef.value?.clearInput();
            sidebarRef.value?.clearInput();
        };

        onMounted(() => {
            clearInput();
        });

        const fetchCurrentPost = (slug: string | string[]) => {
            console.log("fetchCurrentPost", slug);
            const slugPosts = posts.filter((post) => post.slug === slug);
            return slugPosts[0] || null;
        };

        const tagSearch = (tag: string) => {
            console.log("tagSearch", tag);
            return posts.filter((post) => post.tags.includes(tag));
        };

        watch(
            () => route.params,
            (params) => {
                console.log("watch params", params);
                currentPost.value = null;
                filteredPosts.value = posts.slice(0, 9);
                if (params.slug) {
                    currentPost.value = fetchCurrentPost(params.slug);
                    clearInput();
                }
                if (params.tag) {
                    filteredPosts.value = tagSearch(Array.isArray(params.tag) ? params.tag[0] : params.tag);
                    clearInput();
                }
                if (params.search) {
                    const searchTerm = Array.isArray(params.search) ? params.search[0] : params.search;
                    filteredPosts.value = posts.filter((post) =>
                        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.tags.map(tag => tag.toLowerCase()).includes(searchTerm.toLowerCase())
                    );
                }
                sidebarRef.value?.collapse();
            }
        );

        return {
            filteredPosts,
            currentPost,
            searchPosts,
            posts,
            clearInput,
            headerRef,
            sidebarRef,
        };
    },
});
</script>

<style></style>