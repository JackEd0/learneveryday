<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse" style="">
        <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column visually-hidden-sx">
                <li class="nav-item">
                    <input type="text" v-model="searchQuery" @input="$emit('search', searchQuery)" placeholder="Search..." class="form-control search-input" />
                </li>
            </ul>

            <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                <span>Tags</span>
            </h6>
            <ul class="nav flex-column mb-2">
                <li v-for="(count, tag) in sortedTags" :key="tag" class="nav-item">
                    <router-link :to="{ name: 'tags', params: { tag: count[0] } }" class="nav-link">{{ count[0] }} <span class="badge text-bg-secondary">{{ count[1] }}</span></router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { Post } from '../types';

export default {
    inheritAttrs: false,
    props: {
        allPosts: {
            type: Array as () => Post[],
            default: [],
        },
    },
    setup(props) {
        const searchQuery = ref("");

        const tagsCount = computed(() => {
            const tagsCounter: Record<string, number> = {};
            props.allPosts.forEach((post) => {
                post.tags.forEach((tag) => {
                    tagsCounter[tag] = (tagsCounter[tag] || 0) + 1;
                });
            });
            return tagsCounter;
        });

        const sortedTags = computed(() => {
            return Object.entries(tagsCount.value).sort((a, b) => b[1] - a[1]);
        });

        return {
            searchQuery,
            sortedTags,
        };
    },
    methods: {
        clearInput() {
            this.searchQuery = "";
            console.log('Sidebar clearInput');
        },
    }
};
</script>

<style>
.search-input {
    border-radius: 0;
}

@media (max-width: 540px) {
    .visually-hidden-sx {
        display: none;
    }
}
</style>
