<template>
  <button type="button" @click="handleMock">发送mock请求</button>
</template>

<script setup>
import { getCardList } from "../api/list";


const handleMock = async () => {
   try {
    const { data } = await getCardList();
    console.log(data,'data');
  } catch (e) {
    console.log(e);
  } finally {
    console.log(123);
  }
}
</script>

<style scoped>
</style>
