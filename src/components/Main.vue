<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-3 pb-3">
        <div class="container">
            <div v-if="post">
                <SinglePost :post="post" />
            </div>
            <div v-else-if="!post && posts.length === 0" class="text-center p-4">
                <h2 class="text-center mb-3">No posts found</h2>
                <div class="col-lg-6 mx-auto">
                    <p class="lead mb-4">
                        We couldn't find any posts matching your specific search criteria at the moment.
                        <br>
                        Why not head over to our vibrant home page with captivating articles and engaging topics that will surely pique your interest?
                    </p>
                    <p class="lead mb-4">
                        Enjoy your journey through our enriching content!
                    </p>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <router-link to="/" class="btn btn-outline-primary btn-lg px-4">Home</router-link>
                    </div>
                </div>
            </div>
            <div v-else class="row row-cols-1 row-cols-md-2 g-4">
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
        post: {
            type: Object as () => Post | null,
        },
        posts: {
            type: Array as () => Post[],
            default: [],
        },
        allPosts: {
            type: Array as () => Post[],
            default: [],
        },
    },
});
</script>

<style></style>
