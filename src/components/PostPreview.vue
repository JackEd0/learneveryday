<template>
    <div v-if="post" class="post-preview">
        <div class="post-title">
            <router-link :to="{ name: 'posts', params: { slug: post.slug } }">{{ post.title }}</router-link>
        </div>
        <div class="post-meta">
            <span class="post-date">{{ formatDate(post.created_at) }}</span>
            <span class="post-tags">
                <router-link v-for="(tag, index) in post.tags" :key="index" class="post-tag"
                    :to="{ name: 'tags', params: { tag: tag } }">
                    {{ tag }}
                </router-link>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Post } from '../types';

export default defineComponent({
    props: {
        post: {
            type: Object as () => Post | null,
            required: true,
        },
    },
    methods: {
        formatDate(dateString: string) {
            const date = new Date(dateString);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        },
    },
});
</script>

<style>
.post-preview {
    /* Add your preferred styles for the post preview container */
}

.post-title {
    /* Add your preferred styles for the post title */
}

.post-title a {
    /* Add your preferred styles for the post title link */
    text-decoration: none;
}

.post-meta {
    /* Add your preferred styles for the post meta container */
}

.post-date {
    /* Add your preferred styles for the post date */
}

.post-tags {
    /* Add your preferred styles for the post tags container */
}

.post-tag {
    /* Add your preferred styles for each tag link */
    margin-right: 8px;
    text-decoration: none;
}
</style>
