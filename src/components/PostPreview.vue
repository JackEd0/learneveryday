<template>
    <!-- <div v-if="post" class="post-preview">
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
    </div> -->
    <div v-if="post" class="card mb-3" style="max-width: 540px; max-height: 260px;">
        <div class="row g-0">
            <div class="col-md-4 col-1">
                <img :src="post.image || '/src/content/banners/placeholder.jpg'" class="img-fluid rounded-start post-img" :alt=post.title>
            </div>
            <div class="col-md-8 col-11">
                <div class="card-body">
                    <router-link :to="{ name: 'posts', params: { slug: post.slug } }">
                        <h5 class="card-title">{{ post.title }}</h5>
                    </router-link>
                    <p class="card-text" v-html="content"></p>
                    <p class="card-text"><small class="text-body-secondary">{{ formatDate(post.created_at) }}</small>
                    </p>
                    <!-- <p class="card-text"><small class="text-body-secondary">
                            <router-link v-for="(tag, index) in post.tags" :key="index" class="me-2"
                                :to="{ name: 'tags', params: { tag: tag } }">
                                {{ tag }}
                            </router-link>
                        </small></p> -->
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
.post-img {
    height: 259px;
    width: 200px;
    object-fit: cover;
}

.card-body {
    min-height: 200px;
}

.card-footer {
    min-height: 59px;
}
</style>
