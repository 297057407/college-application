<script setup>
defineProps({
  item: {
    type: Object,
    default: () => { }
  }
})
</script>
<template>
  <RouterLink to="/" class="item">
    <img src="src/assets/images/140.jpg" alt="" />
    <div class="p">
      <p class="name ellipsis">清华大学</p>
      <p class="desc ellipsis">好学校</p>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.item {
  display: block;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 64px;
    height: 64px;
  }

  p {
    margin: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .see {
    font-size: 20px;
  }
}
</style>