<template>
    <!-- <div id="app"> -->
        <Header @search="searchPosts" ref="headerRef" />
        <div class="container-fluid">
            <div class="row">
                <!-- <Sidebar @search="searchPosts" @tagClick="tagPosts" /> -->
                <Sidebar @search="searchPosts" :allPosts="posts" ref="sidebarRef" />
                <!-- <Sidebar onSearch="searchPosts" /> -->
                <!-- <Main @tagSearch="tagPosts" @slugSearch="slugPost" :posts="filteredPosts" :post="currentPost"/> -->
                <!-- <Main @clearInput="clearInput" @tagSearch="tagPosts" @slugSearch="slugPost" :posts="filteredPosts" :allPosts="posts"/> -->
                <!-- <Main @clearInput="clearInput" :posts="filteredPosts" :allPosts="posts"/> -->
                <Main :post="currentPost" :posts="filteredPosts" :allPosts="posts"/>
            </div>
        </div>
    <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
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
    // computed: {
    //     routeTag() {
    //         return this.$route.params?.tag;
    //     },
    //     routeSlug() {
    //         return this.$route.params?.slug;
    //     },
    // },
    setup() {
        // console.log("props", props);
        const posts: Post[] = postsData;
        const filteredPosts = ref(posts.slice(0, 9));
        const currentPost = ref(null as Post | null);
        const route = useRoute();
        const router = useRouter();
        const headerRef = ref<InstanceType<typeof Header> | null>(null);
        const sidebarRef = ref<InstanceType<typeof Sidebar> | null>(null);
        // let mainPosts = posts.slice(0, 9);
        // let mainPost = null as Post | null;

        // console.log(route.params);
        // console.log(router.currentRoute);


        const searchPosts = (searchTerm: string) => {
            // if (router.currentRoute.value.path !== "/") {
            //     console.log("router changed");

            //     router.push("/");
            // }
            console.log("searchPosts", searchTerm);

            const searchResults = posts.filter((post) =>
                // post.title.includes(searchTerm) ||
                // post.tags.some((tag) => tag.includes(searchTerm)) ||
                // post.content.includes(searchTerm)
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.map(tag => tag.toLowerCase()).includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            currentPost.value = null;
            filteredPosts.value = searchResults;
            // mainPosts = searchResults;
        };

        const clearInput = () => {
            headerRef.value?.clearInput();
            sidebarRef.value?.clearInput();
        };

        // const tagPosts = (tag: string) => {
        //     const taggedPosts = posts.filter((post) => post.tags.includes(tag));
        //     filteredPosts.value = taggedPosts;
        // };

        // const slugPost = (slug: string) => {
        //     const slugPosts = posts.filter((post) => post.slug === slug);
        //     currentPost.value = slugPosts[0] || null;
        //     // filteredPosts.value = slugPosts;
        // };

        onMounted(() => {
            clearInput();
        });

        const fetchCurrentPost = (slug: string | string[]) => {
            console.log("fetchCurrentPost", slug);
            // context.emit('clearInput');
            // const posts: Post[] = props.allPosts;
            // clearInput();
            const slugPosts = posts.filter((post) => post.slug === slug);
            return slugPosts[0] || null;
        };

        const tagSearch = (tag: string) => {
            console.log("tagSearch", tag);
            // context.emit('clearInput');
            // const posts: Post[] = props.allPosts;
            // clearInput();
            return posts.filter((post) => post.tags.includes(tag));
        };

        // const routeTag = computed(() => {
        //     return route.params?.tag;
        // });

        // const routeSlug = computed(() => {
        //     return route.params?.slug;
        // });
        // console.log(route.params);
        // console.log(router.currentRoute.value.params);

        // // if (route.params.tag) {
        // if (router.currentRoute.value.params.tag) {
        //     // mainPosts = tagSearch(route.params.tag);
        //     // filteredPosts.value = tagSearch(route.params.tag);
        //     filteredPosts.value = tagSearch(router.currentRoute.value.params.tag);
        // }

        // if (router.currentRoute.value.params.slug) {
        //     currentPost.value = fetchCurrentPost(router.currentRoute.value.params.slug);
        // }

        // watch(() => router.currentRoute.value.params.tag, (tag) => {
        //     console.log("watch tag", tag);
        //     // mainPosts = tagSearch(tag);
        //     filteredPosts.value = tagSearch(tag);
        // });
        watch(() => route.params, (params) => {
            console.log("watch params", params);
            currentPost.value = null;
            filteredPosts.value = posts.slice(0, 9);
            if (params.slug) {
                currentPost.value = fetchCurrentPost(params.slug);
            }
            if (params.tag) {
                filteredPosts.value = tagSearch(params.tag);
            }
            clearInput();
            // mainPosts = tagSearch(tag);
            // filteredPosts.value = tagSearch(tag);
        });

        return {
            filteredPosts,
            currentPost,
            searchPosts,
            // tagPosts,
            // slugPost,
            posts,
            clearInput,
            headerRef,
            sidebarRef,
            // fetchCurrentPost,
            // tagSearch,

            // mainPosts,
            // mainPost,
        };
    },
});
</script>

<style>
</style>
