<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import CashBookStatistics from './components/CashBookStatistics.vue';
import { getCashbookCategories, getCashbookData } from '@/apis/cashbook';

getCashbookCategories()
  .then((res) => {
    console.log('success: ', res);
  })
  .catch((err) => {
    console.log(err);
  });
getCashbookData()
  .then((res) => {
    console.log('success: ', res);
  })
  .catch((err) => {
    console.log(err);
  });
</script>

<template>
  <!-- 开启顶部安全区适配 -->
  <van-nav-bar safe-area-inset-top />
  <div class="cashbook">
    <header class="cashbook-header">
      账单类型
      <img alt="Vue logo" src="./assets/xmind-logo-dark.svg" />
      统计
    </header>
    <main class="cashbook-body"></main>
    <footer class="cashbook-footer"></footer>
  </div>
  <!-- 开启底部安全区适配 -->
  <van-number-keyboard safe-area-inset-bottom />
</template>

<style lang="scss" scoped>
.cashbook {
  .cashbook-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $theme-color;
    text-decoration: dashed;
  }
}
</style>
