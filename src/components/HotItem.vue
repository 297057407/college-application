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

    <div class="img"><img v-lazy="`https://p7571184p7.zicp.fun/img/picture/${item.name}.jpeg` || ''" alt="" /></div>
    <div class="p">
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ">{{ item.location }}</p>
      <p> <i style="color: red;" class="iconfont icon-renqiredu"></i> <span style="font-size: 16px;">热度: {{
        item.popularity }}</span> </p>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0 20px 30px;
  text-align: center;
  transition: all .5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  .img {
    width: 64px;
    height: 64px;

    img {
      width: 64px;
      height: 100%;
    }
  }

  .p {
    width: 80px;

    p {
      width: 130px;
      padding: 5px 0px;
    }
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