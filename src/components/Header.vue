<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <router-link to="/" class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">Learn Everyday</router-link>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <input v-model="searchQuery" @input="searchPosts" class="form-control form-control-dark w-100 rounded-0 border-0 visually-hidden-sm" type="text"
            placeholder="Search posts..." aria-label="Search">
        <!-- <div class="navbar-nav">
            <div class="nav-item text-nowrap">
                <a class="nav-link px-3" href="#">Sign out</a>
            </div>
        </div> -->
    </header>
    <!-- <header class="header">
        <img class="banner" :src="banner" alt="Blog banner" />
    </header> -->
</template>

<script lang="ts">
import { ref } from "vue";

export default {
    data() {
        return {
            banner: "/src/assets/banner.jpg",
        };
    },
    setup(_, context) {
        const searchQuery = ref("");
        const searchPosts = () => {
            // Emit search event to the parent component (Main.vue)
            context.emit("search", searchQuery.value);
        };

        return {
            searchQuery,
            searchPosts,
        };
    },
    methods: {
        clearInput() {
            this.searchQuery = "";
        },
    }
};
</script>

<style>
/* .header {
    width: 100%;
}

.banner {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
} */

@media (min-width: 540px) {
    .visually-hidden-sm {
        display: none;
    }
}
</style>
