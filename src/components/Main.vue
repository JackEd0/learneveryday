<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-3 pb-3">
        <div class="container">
            <div v-if="post">
                <SinglePost :post="post" />
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
