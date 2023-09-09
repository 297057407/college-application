<script setup>
import { onMounted, ref } from 'vue'
import { useNewsStore } from '@/stores/news';
import { useRoute } from 'vue-router';
const newsStore = useNewsStore()

const route = useRoute()
const pdiv = ref(null)
onMounted(() => {
    const ps = pdiv.value.querySelectorAll('p')
    ps.forEach(p => {
        p.style.textIndent = '2em';
        p.style.fontSize = '20px';
        p.style.lineHeight = '2';
    });
})
</script>
<template>
    <div class="container">
        <h1>{{ newsStore.articles[route.query.id].head }}</h1>
        <hr>
        <div ref="pdiv" v-html="newsStore.articles[route.query.id].body">
        </div>
        <br>
    </div>
</template>
<style scoped lang="scss">
.container {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 100px;

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

}
</style>