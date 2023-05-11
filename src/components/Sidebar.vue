<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse" style="">
        <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <input type="text" v-model="searchQuery" @input="searchPosts" placeholder="Search posts..." class="form-control search-input" />
                </li>
            </ul>

            <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                <span>Tags</span>
            </h6>
            <ul class="nav flex-column mb-2">
                <li v-for="(count, tag) in sortedTags" :key="tag" class="nav-item">
                    <!-- <a @click="searchByTag(count[0])">{{ count[0] }} ({{ count[1] }})</a> -->
                    <router-link :to="{ name: 'tags', params: { tag: count[0] } }" class="nav-link">{{ count[0] }} ({{ count[1]
                    }})</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import postsData from "../content/posts.json";

export default {
    inheritAttrs: false,
    setup(_, context) {
        const searchQuery = ref("");
        const isSidebarVisible = ref(true);
        const searchPosts = () => {
            console.log("searchPosts", searchQuery.value);

            // Emit search event to the parent component (Main.vue)
            context.emit("search", searchQuery.value);
        };

        // const searchByTag = (tag: string) => {
        //     // Emit searchByTag event to the parent component (Main.vue)
        //     // context.emit("searchByTag", tag);
        //     context.emit("tagClick", tag);
        // };

        const toggleSidebar = () => {
            // Add logic to collapse the sidebar for mobile
            isSidebarVisible.value = !isSidebarVisible.value;
        };

        const tagsCount = computed(() => {
            const tagsCounter: Record<string, number> = {};
            postsData.forEach((post) => {
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
            searchPosts,
            // searchByTag,
            toggleSidebar,
            isSidebarVisible,
            sortedTags,
        };
    },
};
</script>

<style>
.search-input {
    border-radius: 0;
}
</style>
