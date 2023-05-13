<template>
    <div class="col" :class="{ 'col-md-12': index === 0 }">
        <div v-if="post" class="card mb-3" style="max-height: 270px;">
            <div class="row g-0">
                <div class="col-md-4 col-1 rounded-start card-image"
                    :style="`background-image: url(${post.image || '/src/content/banners/placeholder.jpg'})`"
                    :alt=post.title>
                </div>
                <div class="col-md-8 col-11">
                    <div class="card-body">
                        <router-link :to="{ name: 'posts', params: { slug: post.slug } }">
                            <h5 class="card-title">{{ post.title }}</h5>
                        </router-link>
                        <p class="card-text" v-html="content"></p>
                        <p class="card-text"><small class="text-body-secondary">{{ formatDate(post.created_at) }}</small>
                        </p>
                    </div>
                    <div class="card-footer text-body-secondary">
                        <router-link v-for="(tag, index) in post.tags" :key="index" class="me-2"
                            :to="{ name: 'tags', params: { tag: tag } }">
                            {{ tag }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Post } from '../types';
import { marked } from 'marked';

export default defineComponent({
    props: {
        post: {
            type: Object as () => Post | null,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    methods: {
        formatDate(dateString: string) {
            const date = new Date(dateString);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        },
    },
    setup(props) {
        const content = ref('');

        const loadMarkdownContent = async () => {
            if (!props.post) {
                return;
            }
            const response = await fetch(props.post.content);
            const markdown = await response.text();
            const markedMarkdown = marked(markdown);
            content.value = markedMarkdown.slice(0, 100) + '...';
        };

        onMounted(() => {
            loadMarkdownContent();
        });

        return {
            content,
        };
    },
});
</script>

<style>
h1 {
    font-size: 1.5rem;
}

.post-img {
    height: 269px;
    width: 200px;
    object-fit: cover;
}

.card-image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.card-body {
    min-height: 210px;
}

.card-footer {
    min-height: 59px;
}
</style>
