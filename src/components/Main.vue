<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-3 pb-3">
        <div class="container">
            <div v-if="$route.params?.slug">
                <!-- Display the content of the current post -->
                <SinglePost :post="fetchCurrentPost($route.params.slug)" />
            </div>
            <div v-else-if="$route.params?.tag" class="row">
                <PostPreview v-for="(post, index) in tagSearch($route.params?.tag)" :key="index" :post="post" :index="index" />
            </div>
            <div v-else class="row row-cols-1 row-cols-md-2 g-4">
                <!-- Display a list of posts based on the current context (home, search, or tag) -->
                <PostPreview v-for="(post, index) in posts" :key="index" :post="post" :index="index" />
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostPreview from './PostPreview.vue';
import SinglePost from './SinglePost.vue';
import { Post } from '../types';

export default defineComponent({
    components: {
        PostPreview,
        SinglePost,
    },
    props: {
        posts: {
            type: Array as () => Post[],
            default: [],
        },
        allPosts: {
            type: Array as () => Post[],
            default: [],
        },
    },
    setup(props) {
        const fetchCurrentPost = (slug: string | string[]) => {
            const posts: Post[] = props.allPosts;
            const slugPosts = posts.filter((post) => post.slug === slug);
            return slugPosts[0] || null;
        };

        const tagSearch = (tag: string) => {
            console.log("tagSearch", tag);
            const posts: Post[] = props.allPosts;
            return posts.filter((post) => post.tags.includes(tag));
        };

        return {
            fetchCurrentPost,
            tagSearch,
        };
    },
});
</script>

<style></style>
