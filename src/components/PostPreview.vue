<template>
    <div class="col" :class="{ 'col-md-12': [0,8].includes(index), 'col-md-4': [5,6,7].includes(index), 'card-triplet': [5,6,7].includes(index) }">
        <div v-if="post" class="card mb-3">
            <div class="row g-0">
                <div class="col-1 card-image" :class="{ 'col-md-4 rounded-start': !([5,6,7].includes(index)), 'col-md-12': [5,6,7].includes(index) }"
                    :style="`background-image: url(${post.image || '/content/banners/placeholder.jpg'})`"
                    :alt=post.title>
                </div>
                <div class="col-11" :class="{ 'col-md-8': !([5,6,7].includes(index)), 'col-md-12': [5,6,7].includes(index) }">
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
            // const response = await fetch(props.post.content);
            // const markdown = await response.text();
            // const markedMarkdown = marked(markdown);
            // content.value = markedMarkdown.slice(0, 100) + '...';

            // content.value = props.post.summary.slice(0, 200) + '...';
            content.value = marked(props.post.summary.slice(0, 200) + '...');
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

.card {
    max-height: 270px;
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

.card-triplet .card-image {
    height: 200px;
}

.card-triplet .card {
    max-height: 470px;
}
</style>
