<template>
    <header class="header">
        <img class="banner" :src="banner" alt="Blog banner" />
    </header>
</template>

<script lang="ts">
export default {
    data() {
        return {
            banner: "/src/assets/banner.jpg",
        };
    },
};
</script>

<style>
.header {
    width: 100%;
}

.banner {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
}
</style>
