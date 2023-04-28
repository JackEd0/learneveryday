<template>
    <div v-if="post" class="single-post">
        <div class="post-header">
            <h1>{{ post.title }}</h1>
            <div class="post-meta">
                <span class="post-date">{{ formatDate(post.created_at) }}</span>
            </div>
        </div>
        <div class="post-tags">
            <router-link v-for="(tag, index) in post.tags" :key="index" class="post-tag"
                :to="{ name: 'tags', params: { tag: tag } }">
                {{ tag }}
            </router-link>
        </div>
        <div class="post-content" v-html="content"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Post } from '../types';
import { marked } from 'marked';

export default defineComponent({
    props: {
        post: {
            type: Object as () => Post,
            required: true,
        },
    },
    setup(props) {
        const content = ref('');

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        };

        const loadMarkdownContent = async () => {
            const response = await fetch(props.post.content);
            const markdown = await response.text();
            content.value = marked(markdown);
        };

        onMounted(() => {
            loadMarkdownContent();
        });

        return {
            content,
            formatDate,
        };
    },
});
</script>

<style>
.single-post {
    /* Add your preferred styles for the single post container */
}

.post-header {
    /* Add your preferred styles for the post header */
}

.post-title {
    /* Add your preferred styles for the post title */
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

.post-content {
    /* Add your preferred styles for the post content */
}
</style>
