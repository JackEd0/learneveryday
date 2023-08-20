<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <router-link to="/" class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">Learn Everyday</router-link>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <input v-model="searchQuery" @input="$emit('search', searchQuery)"
            class="form-control form-control-dark w-100 rounded-0 border-0 visually-hidden-sm input-search-mobile" type="text"
            placeholder="Search..." aria-label="Search">
    </header>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
    setup() {
        const searchQuery = ref("");

        return {
            searchQuery,
        };
    },
    methods: {
        clearInput() {
            // console.log('Header clearInput');
            this.searchQuery = "";
        },
    }
};
</script>

<style>
.input-search-mobile::placeholder,
.input-search-mobile::-ms-input-placeholder {
    color: #fff;
}

@media (min-width: 540px) {
    .visually-hidden-sm {
        display: none;
    }
}
</style>
