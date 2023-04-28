<template>
    <button v-if="!isSidebarVisible" @click="toggleSidebar" class="collapse-btn">Show sidebar</button>
    <div class="sidebar" v-show="isSidebarVisible">
        <div class="header">
            <router-link to="/" class="home-link">Home</router-link>
            <button @click="toggleSidebar" class="collapse-btn">Collapse</button>
        </div>
        <input type="text" v-model="searchQuery" @input="searchPosts" placeholder="Search posts..." class="search-input" />
        <div class="tags">
            <h3>Tags</h3>
            <ul>
                <li v-for="(count, tag) in sortedTags" :key="tag">
                    <!-- <a @click="searchByTag(count[0])">{{ count[0] }} ({{ count[1] }})</a> -->
                    <router-link :to="{ name: 'tags', params: { tag: count[0] } }">{{ count[0] }} ({{ count[1] }})</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import postsData from "../content/posts.json";

export default {
    setup(_, context) {
        const searchQuery = ref("");
        const isSidebarVisible = ref(true);
        const searchPosts = () => {
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
.sidebar {
    /* Add your preferred styles for the sidebar */
    color: rgb(211, 211, 217);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.collapse-btn {
    /* Add your preferred styles for the collapse button */
    background-color: transparent;
    border: none;
    color: inherit;
    font-size: 16px;
    cursor: pointer;
}

.search-input {
    /* Add your preferred styles for the search input */
    width: 100%;
    padding: 6px;
    margin-bottom: 1rem;
    background-color: transparent;
    border: 1px solid rgb(211, 211, 217);
    color: inherit;
}

.tags {
    /* Add your preferred styles for the tags section */
}

.tags h3 {
    margin-bottom: 0.5rem;
}

.tags ul {
    list-style-type: none;
    padding: 0;
}

.tags li a {
    display: inline-block;
    padding: 4px 8px;
    margin-bottom: 4px;
    background-color: rgb(211, 211, 217);
    color: white;
    text-decoration: none;
    border-radius: 4px;
}

.tags li a:hover {
    background-color: rgba(211, 211, 217, 0.8);
}
</style>
