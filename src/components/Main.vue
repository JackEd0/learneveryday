<template>
    <div class="main-container">
        <div v-if="$route.params?.slug">
            <!-- Display the content of the current post -->
            <!-- <SinglePost :post="currentPost" /> -->
            <SinglePost :post="fetchCurrentPost($route.params.slug)" />
        </div>
        <div v-else-if="$route.params?.tag">
            <PostPreview v-for="(post, index) in tagSearch($route.params?.tag)" :key="index" :post="post" />
        </div>
        <div v-else>
            <!-- Display a list of posts based on the current context (home, search, or tag) -->
            <!-- <PostPreview v-for="(post, index) in displayedPosts" :key="index" :post="post" /> -->
            <PostPreview v-for="(post, index) in posts" :key="index" :post="post" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import PostPreview from './PostPreview.vue';
import SinglePost from './SinglePost.vue';
import { Post } from '../types';
// import postsData from "../content/posts.json";

export default defineComponent({
    components: {
        PostPreview,
        SinglePost,
    },
    props: {
        currentPost: {
            type: Object as () => Post,
            // default: { slug: '', title: '', content: '', tags: [], created_at: '' },
            default: null,
        },
        posts: {
            type: Array as () => Post[],
            default: [],
        },
        allPosts: {
            type: Array as () => Post[],
            default: [],
        },
        tag: {
            type: String,
            default: null,
        },
        slug: {
            type: String,
            default: null,
        },
    },
    setup(props, context) {

        // console.log("route", $route);
        const singlePostMode = ref(props.currentPost !== null);
        // const displayedPosts = ref<Post[]>([]);

        // A function to filter the posts based on search input or selected tag
        // const filterPosts = (query: string, byTag: boolean = false) => {
        //     // Fetch the posts data (replace this with the actual method to fetch the posts data)
        //     const allPosts: Post[] = postsData; // Replace with the actual data

        //     if (query.trim() === '') {
        //         displayedPosts.value = allPosts.slice(0, 10); // Show 10 most recent posts
        //     } else {
        //         displayedPosts.value = allPosts.filter((post) => {
        //             if (byTag) {
        //                 return post.tags.includes(query);
        //             } else {
        //                 return (
        //                     post.title.toLowerCase().includes(query.toLowerCase()) ||
        //                     post.tags.map(tag => tag.toLowerCase()).includes(query.toLowerCase()) ||
        //                     post.content.toLowerCase().includes(query.toLowerCase())
        //                 );
        //             }
        //         });
        //     }
        // };

        const fetchCurrentPost = (slug: string|string[]) => {
            // import postsData from './content/posts.json';
            const posts: Post[] = props.allPosts;
            const slugPosts = posts.filter((post) => post.slug === slug);
            return slugPosts[0] || null;
            // filteredPosts.value = slugPosts;
            // console.log("slugSearch", props.slug);
            // return
        };

        const tagSearch = (tag: string) => {
            console.log("tagSearch", tag);
            const posts: Post[] = props.allPosts;
            return posts.filter((post) => post.tags.includes(tag));
        };

        // Watch for changes in the currentPost prop to enable single post mode
        watch(
            () => props.currentPost,
            () => {
                singlePostMode.value = props.currentPost !== null;
            }
        );

        // // Listen to search and searchByTag events from the Sidebar component
        // const onSearch = (query: string) => {
        //     filterPosts(query);
        // };
        // const onSearchByTag = (tag: string) => {
        //     filterPosts(tag, true);
        // };

        // // Initial setup (display 10 most recent posts)
        // filterPosts('');

        if (props.tag) {
            context.emit("tagSearch", props.tag);
        }

        if (props.slug) {
            console.log("slugSearch", props.slug);

            context.emit("slugSearch", props.slug);
        }
        // console.log("props", props);
        // console.log("slug", props.slug);
        // console.log("posts",  props.posts);

        const selectSlugPost = computed(() => {
            if (props.slug) {
                console.log("selectSlugPost", props.slug);

                context.emit("slugSearch", props.slug);
            }
        });


        return {
            selectSlugPost,
            singlePostMode,
            fetchCurrentPost,
            tagSearch,
            // displayedPosts,
            // onSearch,
            // onSearchByTag,
        };
    },
});
</script>

<style>
.main-container {
    /* Add your preferred styles for the main container */
}
</style>
